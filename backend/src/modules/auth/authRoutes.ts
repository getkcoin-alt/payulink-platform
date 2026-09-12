import crypto from 'crypto';
import { FastifyInstance } from 'fastify';
import { db } from '../../db/database.js';
import { authenticate } from '../../middleware/auth.js';

function hashSecret(secret: string): string {
  return crypto.createHash('sha256').update(secret).digest('hex');
}

/**
 * Registers authentication and RBAC management routes.
 */
export async function authRoutes(fastify: FastifyInstance): Promise<void> {
  // 1. Admin / Staff Login
  fastify.post('/login', async (request, reply) => {
    const { username, password } = request.body as any || {};

    if (!username || !password) {
      return reply.status(400).send({ code: -1, msg: 'Username and password are required' });
    }

    const passHash = hashSecret(password);
    const user = db.prepare(`
      SELECT id, username, email, full_name, role, status, two_factor_enabled 
      FROM admin_users 
      WHERE username = ? AND password_hash = ?
    `).get(username, passHash) as any;

    if (!user) {
      return reply.status(200).send({ code: -1, msg: 'Invalid username or password' });
    }

    if (user.status !== 'ACTIVE') {
      return reply.status(403).send({ code: -1, msg: 'Admin account has been suspended' });
    }

    // Update last login
    db.prepare('UPDATE admin_users SET last_login_at = ? WHERE id = ?').run(new Date().toISOString(), user.id);

    const token = fastify.jwt.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    });

    return {
      code: 200,
      msg: 'success',
      data: {
        token,
        user: {
          id: user.id,
          userName: user.username,
          nickName: user.full_name,
          email: user.email,
          role: user.role,
          twoFactor: user.two_factor_enabled === 1
        }
      }
    };
  });

  // 2. Merchant Login
  fastify.post('/merchant/login', async (request, reply) => {
    const { username, password, email } = request.body as any || {};
    const identifier = email || username;

    if (!identifier || !password) {
      return reply.status(400).send({ code: -1, msg: 'Email/Username and password required' });
    }

    const passHash = hashSecret(password);
    const merchant = db.prepare(`
      SELECT id, merchant_code, merchant_name, email, role, credibility_score, success_rate,
             working_balance_paisa, token_balance, api_key, webhook_url, status
      FROM merchants
      WHERE (email = ? OR merchant_code = ?) AND password_hash = ?
    `).get(identifier, identifier, passHash) as any;

    if (!merchant) {
      return reply.status(200).send({ code: -1, msg: 'Invalid credentials' });
    }

    const token = fastify.jwt.sign({
      id: merchant.id,
      merchantCode: merchant.merchant_code,
      role: merchant.role,
      email: merchant.email
    });

    return {
      code: 200,
      msg: 'success',
      data: {
        token,
        merchant: {
          id: merchant.id,
          code: merchant.merchant_code,
          name: merchant.merchant_name,
          email: merchant.email,
          role: merchant.role,
          credibilityScore: merchant.credibility_score,
          successRate: merchant.success_rate,
          balance: merchant.working_balance_paisa / 100,
          tokens: merchant.token_balance
        }
      }
    };
  });

  // 3. RBAC My Permissions
  fastify.get('/admin/rbac/my-permissions', { preHandler: [authenticate] }, async (request) => {
    const user = request.user as any;
    return {
      code: 200,
      msg: 'success',
      data: user?.role === 'SUPER_ADMIN' ? ['*'] : ['upi:view', 'suborders:view']
    };
  });

  // 4. List Staff Users
  fastify.get('/admin/rbac/staff', { preHandler: [authenticate] }, async () => {
    const staff = db.prepare(`
      SELECT id, username, email, full_name, role, department, two_factor_enabled, status, created_at, last_login_at 
      FROM admin_users 
      ORDER BY created_at DESC
    `).all();

    return {
      code: 200,
      msg: 'success',
      data: {
        total: staff.length,
        list: staff
      }
    };
  });

  // 5. Create Staff User
  fastify.post('/admin/rbac/staff', { preHandler: [authenticate] }, async (request, reply) => {
    const body = request.body as any || {};
    if (!body.username || !body.password || !body.email) {
      return reply.status(400).send({ code: -1, msg: 'Missing mandatory fields' });
    }

    const id = `adm_${Date.now().toString().slice(-6)}`;
    const passHash = hashSecret(body.password);
    const now = new Date().toISOString();

    try {
      db.prepare(`
        INSERT INTO admin_users 
        (id, username, password_hash, email, full_name, role, department, two_factor_enabled, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id,
        body.username.trim().toLowerCase(),
        passHash,
        body.email.trim(),
        body.fullName || body.username,
        body.role || 'OPS_ADMIN',
        body.department || 'Operations',
        body.requireTwoFactor ? 1 : 0,
        'ACTIVE',
        now
      );

      return {
        code: 200,
        msg: 'Staff user created successfully',
        data: { id, username: body.username, role: body.role }
      };
    } catch (err: any) {
      return reply.status(400).send({ code: -1, msg: err.message || 'Failed to create user' });
    }
  });
}
