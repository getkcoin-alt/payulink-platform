-- PayuLink Production Database Schema

CREATE TABLE IF NOT EXISTS admin_users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'OPS_ADMIN',
    department TEXT NOT NULL DEFAULT 'Operations',
    two_factor_secret TEXT,
    two_factor_enabled INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    created_at TEXT NOT NULL,
    last_login_at TEXT
);

CREATE TABLE IF NOT EXISTS merchants (
    id TEXT PRIMARY KEY,
    merchant_code TEXT UNIQUE NOT NULL,
    merchant_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'merchant_full',
    credibility_score INTEGER NOT NULL DEFAULT 100,
    success_rate REAL NOT NULL DEFAULT 100.0,
    working_balance_paisa INTEGER NOT NULL DEFAULT 0,
    token_balance INTEGER NOT NULL DEFAULT 0,
    total_requested_paisa INTEGER NOT NULL DEFAULT 0,
    api_key TEXT UNIQUE NOT NULL,
    api_secret TEXT NOT NULL,
    webhook_url TEXT,
    telegram_bot_id TEXT,
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS app_upi_pool (
    id TEXT PRIMARY KEY,
    vpa TEXT UNIQUE NOT NULL,
    holder_name TEXT NOT NULL,
    bank_name TEXT NOT NULL,
    daily_limit_paisa INTEGER NOT NULL DEFAULT 10000000,
    current_daily_paisa INTEGER NOT NULL DEFAULT 0,
    health_score INTEGER NOT NULL DEFAULT 100,
    is_active INTEGER NOT NULL DEFAULT 1,
    last_tested_at TEXT,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS app_payment_match (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL,
    chunk_id TEXT UNIQUE NOT NULL,
    merchant_code TEXT NOT NULL,
    amount_paisa INTEGER NOT NULL,
    matched_upi TEXT NOT NULL,
    matched_holder TEXT,
    utr_number TEXT,
    proof_url TEXT,
    status TEXT NOT NULL DEFAULT 'MATCHED', -- MATCHED, SUBMITTED, CONFIRMED, REJECTED, EXPIRED
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL,
    confirmed_at TEXT
);

CREATE TABLE IF NOT EXISTS app_inr_withdrawal_request (
    id TEXT PRIMARY KEY,
    request_no TEXT UNIQUE NOT NULL,
    merchant_code TEXT NOT NULL,
    total_amount_paisa INTEGER NOT NULL,
    fulfilled_paisa INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'PENDING',
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS app_inr_deposit_order (
    id TEXT PRIMARY KEY,
    order_no TEXT UNIQUE NOT NULL,
    user_id TEXT NOT NULL,
    amount_paisa INTEGER NOT NULL,
    matched_upi TEXT NOT NULL,
    utr_number TEXT,
    bonus_tokens INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'PENDING',
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS app_token_ledger (
    id TEXT PRIMARY KEY,
    entity_type TEXT NOT NULL, -- 'merchant', 'user', 'enterprise'
    entity_id TEXT NOT NULL,
    type TEXT NOT NULL, -- 'CREDIT', 'DEBIT', 'MINT', 'BURN', 'BONUS', 'YIELD'
    amount INTEGER NOT NULL,
    balance_after INTEGER NOT NULL,
    description TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS digital_bonds (
    id TEXT PRIMARY KEY,
    bond_no TEXT UNIQUE NOT NULL,
    enterprise_id TEXT NOT NULL,
    principal_paisa INTEGER NOT NULL,
    yield_apr REAL NOT NULL,
    tenure_days INTEGER NOT NULL,
    interest_earned_paisa INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    matures_at TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS support_tickets (
    id TEXT PRIMARY KEY,
    ticket_no TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    merchant_code TEXT NOT NULL,
    order_id TEXT NOT NULL,
    amount_paisa INTEGER NOT NULL,
    submitted_utr TEXT,
    bank_status TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'OPEN',
    created_at TEXT NOT NULL,
    resolved_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_match_order_id ON app_payment_match(order_id);
CREATE INDEX IF NOT EXISTS idx_match_merchant ON app_payment_match(merchant_code);
CREATE INDEX IF NOT EXISTS idx_match_status ON app_payment_match(status);
CREATE INDEX IF NOT EXISTS idx_upi_active ON app_upi_pool(is_active);
CREATE INDEX IF NOT EXISTS idx_ledger_entity ON app_token_ledger(entity_id);
