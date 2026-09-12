import { FastifyInstance } from 'fastify';
import { db } from '../../db/database.js';
import { MatchingEngine } from './matchingEngine.js';
import { authenticateMerchant } from '../../middleware/hmacAuth.js';

/**
 * Registers P2P dynamic checkout and order matching endpoints.
 */
export async function matchingRoutes(fastify: FastifyInstance): Promise<void> {
  // 1. Create Dynamic UPI Order (Merchant API)
  fastify.post('/v1/order/create', { preHandler: [authenticateMerchant] }, async (request, reply) => {
    const body = request.body as any || {};
    const { amount, customerVpa, notifyUrl } = body;

    if (!amount || amount <= 0) {
      return reply.status(400).send({ code: -1, msg: 'Invalid order amount' });
    }

    const orderId = `ORD_PL_${Date.now().toString().slice(-6)}`;
    const amountPaisa = Math.round(amount * 100);
    const chunks = MatchingEngine.createMatchedOrder(orderId, request.merchant.code, amountPaisa);

    return {
      code: 0,
      msg: 'success',
      data: {
        orderId,
        amount,
        currency: 'INR',
        checkoutUrl: `https://payulink-platform.vercel.app/pay/${orderId}`,
        chunks: chunks.map(c => ({
          chunkId: c.chunkId,
          amount: c.amountPaisa / 100,
          vpa: c.matchedVpa,
          qrData: c.qrData,
          expiresAt: c.expiresAt
        }))
      }
    };
  });

  // 2. Query Order Status
  fastify.get('/v1/order/status/:orderId', async (request, reply) => {
    const { orderId } = request.params as any;

    const matches = db.prepare('SELECT * FROM app_payment_match WHERE order_id = ?').all(orderId) as any[];

    if (!matches || matches.length === 0) {
      return reply.status(404).send({ code: -1, msg: 'Order not found' });
    }

    const isAllConfirmed = matches.every(m => m.status === 'CONFIRMED');
    const totalPaisa = matches.reduce((acc, m) => acc + m.amount_paisa, 0);

    return {
      code: 0,
      msg: 'success',
      data: {
        orderId,
        status: isAllConfirmed ? 'CONFIRMED' : matches[0].status,
        totalAmount: totalPaisa / 100,
        chunks: matches.map(m => ({
          chunkId: m.chunk_id,
          amount: m.amount_paisa / 100,
          vpa: m.matched_upi,
          utr: m.utr_number,
          status: m.status
        }))
      }
    };
  });

  // 3. Customer Submits UTR
  fastify.post('/v1/order/:chunkId/submit-utr', async (request, reply) => {
    const { chunkId } = request.params as any;
    const body = request.body as any || {};
    const { utr } = body;

    if (!utr || utr.length !== 12) {
      return reply.status(400).send({ code: -1, msg: 'Valid 12-digit UTR required' });
    }

    const match = db.prepare('SELECT * FROM app_payment_match WHERE chunk_id = ?').get(chunkId) as any;
    if (!match) {
      return reply.status(404).send({ code: -1, msg: 'Order chunk not found' });
    }

    // Update status to SUBMITTED
    db.prepare('UPDATE app_payment_match SET utr_number = ?, status = ? WHERE chunk_id = ?')
      .run(utr, 'SUBMITTED', chunkId);

    // Auto-confirm simulation for live testing
    setTimeout(() => {
      db.prepare("UPDATE app_payment_match SET status = 'CONFIRMED', confirmed_at = ? WHERE chunk_id = ?")
        .run(new Date().toISOString(), chunkId);
    }, 2000);

    return {
      code: 0,
      msg: 'UTR submitted for verification',
      data: { chunkId, utr, status: 'SUBMITTED' }
    };
  });

  // 4. Checkout Page Dynamic Link
  fastify.get('/pay/order/:linkToken', async (request, reply) => {
    const { linkToken } = request.params as any;

    let match = db.prepare('SELECT * FROM app_payment_match WHERE order_id = ? OR chunk_id = ?').get(linkToken, linkToken) as any;

    if (!match) {
      // Default demo order
      match = {
        order_id: linkToken,
        chunk_id: 'CHK-DEMO-101',
        amount_paisa: 10100,
        matched_upi: 'payulink.pool88@icici',
        matched_holder: 'PayuLink Liquidity Pool',
        status: 'MATCHED',
        expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString()
      };
    }

    return {
      code: 0,
      msg: 'success',
      data: {
        orderId: match.order_id,
        chunkId: match.chunk_id,
        amount: match.amount_paisa / 100,
        vpa: match.matched_upi,
        holderName: match.matched_holder,
        qrData: `upi://pay?pa=${match.matched_upi}&pn=${encodeURIComponent(match.matched_holder || 'PayuLink')}&am=${(match.amount_paisa / 100).toFixed(2)}&cu=INR`,
        status: match.status,
        expiresAt: match.expires_at
      }
    };
  });
}
