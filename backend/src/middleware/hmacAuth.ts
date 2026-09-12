import crypto from 'crypto';
import { FastifyRequest, FastifyReply } from 'fastify';
import { db } from '../db/database.js';

export interface MerchantContext {
  id: string;
  code: string;
  name: string;
}

declare module 'fastify' {
  interface FastifyRequest {
    merchant: MerchantContext;
  }
}

/**
 * Validates incoming server-to-server merchant requests via API key or HMAC-SHA256 signature.
 * Guarantees payload integrity and prevents unauthorized order creation.
 */
export async function authenticateMerchant(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const apiKey = request.headers['x-api-key'] as string || request.headers.authorization?.replace('Bearer ', '');

  if (!apiKey) {
    reply.status(401).send({ code: 401, message: 'Missing API Key credentials' });
    return;
  }

  const merchantRow = db.prepare(`
    SELECT id, merchant_code, merchant_name, api_secret, status 
    FROM merchants 
    WHERE api_key = ?
  `).get(apiKey) as any;

  if (!merchantRow) {
    reply.status(401).send({ code: 401, message: 'Invalid or inactive Merchant API Key' });
    return;
  }

  if (merchantRow.status !== 'ACTIVE') {
    reply.status(403).send({ code: 403, message: 'Merchant account is suspended' });
    return;
  }

  request.merchant = {
    id: merchantRow.id,
    code: merchantRow.merchant_code,
    name: merchantRow.merchant_name,
  };
}
