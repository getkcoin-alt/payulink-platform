import crypto from 'crypto';
import { db, initSchema } from './database.js';
import { logger } from '../utils/logger.js';

/**
 * Helper to compute sha256 hash for default seeded passwords.
 * Ensures consistent verification across auth modules.
 */
function hashSecret(secret: string): string {
  return crypto.createHash('sha256').update(secret).digest('hex');
}

/**
 * Seeds the database with production baseline entities:
 * Superadmin, Mazer Infotech Pvt Ltd merchant, UPI liquidity pool, and initial sub-orders.
 */
export function seedDatabase(): void {
  initSchema();
  logger.info('Starting database seeding...');

  const now = new Date().toISOString();

  // 1. Seed Admin Users
  const insertAdmin = db.prepare(`
    INSERT OR REPLACE INTO admin_users 
    (id, username, password_hash, email, full_name, role, department, two_factor_enabled, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertAdmin.run(
    'adm_01',
    'admin',
    hashSecret('PayuLink@2026!'),
    'security@payulink.io',
    'Chief Superadmin',
    'SUPER_ADMIN',
    'Executive Operations',
    1,
    'ACTIVE',
    now
  );

  insertAdmin.run(
    'adm_02',
    'ops_admin',
    hashSecret('PayuLink@2026!'),
    'ops@payulink.io',
    'Bridge Operations Lead',
    'OPS_ADMIN',
    'UPI Operations',
    1,
    'ACTIVE',
    now
  );

  // 2. Seed Verified Live Merchant: Mazer Infotech Pvt Ltd
  const insertMerchant = db.prepare(`
    INSERT OR REPLACE INTO merchants
    (id, merchant_code, merchant_name, email, password_hash, role, credibility_score, success_rate, working_balance_paisa, token_balance, total_requested_paisa, api_key, api_secret, webhook_url, telegram_bot_id, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertMerchant.run(
    'mer_01',
    'M-FD055F93',
    'Mazer Infotech Pvt Ltd',
    'admin@mazer.in',
    hashSecret('Mazer@321'),
    'merchant_full',
    100,
    100.0,
    20600, // ₹206.00
    206,   // 206 Tokens
    191700, // ₹1,917.00
    'sec_live_99f0a1b2c3d4e5f67890',
    'whsec_9941a8b7c6d5e4f3a2b1c0d9',
    'https://api.mazer.in/webhook/payulink',
    '@payulink_merchant_bot',
    'ACTIVE',
    now
  );

  // 3. Seed UPI Liquidity Pool
  const insertUpi = db.prepare(`
    INSERT OR REPLACE INTO app_upi_pool
    (id, vpa, holder_name, bank_name, daily_limit_paisa, current_daily_paisa, health_score, is_active, last_tested_at, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertUpi.run('upi_01', 'payulink.pool88@icici', 'PayuLink Liquidity Pool 88', 'ICICI Bank', 10000000, 4200000, 99, 1, now, now);
  insertUpi.run('upi_02', 'mazer.ops@okhdfcbank', 'Mazer Treasury Ops', 'HDFC Bank', 10000000, 1500000, 98, 1, now, now);
  insertUpi.run('upi_03', 'gateway.settle@axl', 'Axis Settlement Node', 'Axis Bank', 10000000, 8500000, 96, 1, now, now);

  // 4. Seed Initial Active Sub-Orders
  const insertMatch = db.prepare(`
    INSERT OR REPLACE INTO app_payment_match
    (id, order_id, chunk_id, merchant_code, amount_paisa, matched_upi, matched_holder, utr_number, status, expires_at, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  insertMatch.run('chk_01', 'ORD-PL-100291', 'CHK-8819', 'M-FD055F93', 5000000, 'payulink.pool88@icici', 'PayuLink Pool', null, 'MATCHED', expiresAt, now);
  insertMatch.run('chk_02', 'ORD-PL-100292', 'CHK-8820', 'M-FD055F93', 10000000, 'mazer.ops@okhdfcbank', 'Mazer Treasury', '625410982343', 'SUBMITTED', expiresAt, now);
  insertMatch.run('chk_03', 'ORD-PL-100293', 'CHK-8821', 'M-FD055F93', 10100, 'gateway.settle@axl', 'Axis Node', '625410982991', 'CONFIRMED', expiresAt, now);

  // 5. Seed Support Tickets
  const insertTicket = db.prepare(`
    INSERT OR REPLACE INTO support_tickets
    (id, ticket_no, category, merchant_code, order_id, amount_paisa, submitted_utr, bank_status, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertTicket.run('tic_01', 'TKT-2026-9012', 'UTR_MISMATCH', 'M-FD055F93', 'ORD-PL-100293', 10100, '625410982343', 'Credit Confirmed (₹101 on ICICI Pool)', 'OPEN', now);
  insertTicket.run('tic_02', 'TKT-2026-9013', 'EXPIRED_CHUNK', 'M-FD055F93', 'ORD-PL-100291', 250000, '625410982991', 'Soft Expired in matching queue', 'RESOLVED', now);

  logger.info('Database seeded successfully with verified entities!');
}

// Run immediately if executed directly
if (process.argv[1]?.endsWith('seed.ts') || process.argv[1]?.endsWith('seed.js')) {
  seedDatabase();
}
