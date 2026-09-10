export type MerchantType = 'receive' | 'send' | 'both';

export type UserRole = 'merchant_receiver' | 'merchant_sender' | 'merchant_full' | 'merchant_bridge' | 'admin';

export type ThemePreset = 'dark' | 'light' | 'ocean' | 'forest' | 'royal' | 'sunset' | 'cream';

export interface MerchantUser {
  id: string;
  merchantCode: string;
  merchantName: string;
  email: string;
  contactPhone: string;
  merchantType: MerchantType;
  bridgeEnabled: boolean;
  apiKey: string;
  apiSecret: string;
  webhookUrl?: string;
  webhookSecret?: string;
  telegramBound: boolean;
  telegramChatId?: string;
  kycStatus: 'verified' | 'pending' | 'rejected';
  balanceInr: number;
  balanceUsdt: number;
  bridgeTokenBalance: number;
  commissionRate: number; // percentage
  credibilityScore?: number;
  successRate?: number;
  status: 'active' | 'suspended';
  createdAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'super_admin' | 'ops_manager' | 'compliance_officer' | 'support_lead';
  permissions: string[];
}

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'rejected' | 'disputed';

export interface PayoutOrder {
  id: string;
  merchantOrderNo: string;
  orderRef: string;
  amount: number;
  fee: number;
  transferMethod: 'UPI' | 'BANK' | 'SPECIAL';
  beneficiaryName: string;
  upiId?: string;
  accountNumber?: string;
  ifscCode?: string;
  bankName?: string;
  status: OrderStatus;
  utr?: string;
  createdAt: string;
  completedAt?: string;
}

export interface ReceiveOrder {
  id: string;
  merchantOrderNo: string;
  amount: number;
  paymentMethod: 'UPI' | 'BANK';
  payerUpiId?: string;
  targetVpa?: string;
  utr?: string;
  status: OrderStatus;
  createdAt: string;
  expiryTime: string;
  customerName: string;
}

export interface PaymentLink {
  id: string;
  linkToken: string;
  url: string;
  title: string;
  description: string;
  amount: number;
  customerEmail?: string;
  customerMobile?: string;
  status: 'active' | 'completed' | 'expired';
  createdAt: string;
  expiresAt: string;
}

export interface BridgePool {
  id: string;
  poolCode: string;
  name: string;
  tokenType: 'USDT' | 'INR';
  totalLiquidity: number;
  availableLiquidity: number;
  lockedLiquidity: number;
  rate: number; // USDT to INR
  status: 'open' | 'matching' | 'closed';
  minOrderSize: number;
  maxOrderSize: number;
  participantsCount: number;
  completionRate: number;
}

export interface SettlementRecord {
  id: string;
  settlementNo: string;
  merchantCode: string;
  type: 'standard' | 'on_demand';
  method: 'BANK' | 'USDT_TRC20' | 'USDT_ERC20';
  amountPaisa: number;
  amountInr: number;
  usdtAmount?: number;
  usdtRate?: number;
  feeInr: number;
  destination: string;
  status: 'pending' | 'approved' | 'processed' | 'rejected';
  createdAt: string;
  processedAt?: string;
}

export interface DisputeRecord {
  id: string;
  ticketNo: string;
  orderId: string;
  merchantCode: string;
  amount: number;
  reason: 'UTR_MISMATCH' | 'PAYER_NOT_CREDITED' | 'FRAUD_SUSPECT' | 'DUPLICATE_PAYMENT';
  proofUrl?: string;
  customerUtr?: string;
  bankUtr?: string;
  status: 'open' | 'investigating' | 'resolved' | 'rejected';
  openedAt: string;
}
