import { 
  MerchantUser, 
  PayoutOrder, 
  ReceiveOrder, 
  PaymentLink, 
  BridgePool, 
  SettlementRecord, 
  DisputeRecord 
} from '../types';

export const mockMerchants: MerchantUser[] = [
  {
    id: '54',
    merchantCode: 'M-FD055F93',
    merchantName: 'Mazer Infotech Pvt Ltd',
    email: 'admin@mazer.in',
    contactPhone: '8005681625',
    merchantType: 'both',
    bridgeEnabled: true,
    apiKey: 'mock_pk_mazer_fd055f93',
    apiSecret: '1291aa79b2fa454a92531d19b307c622',
    webhookUrl: 'https://api.mazer.in/webhooks/payulink',
    webhookSecret: 'mock_whsec_mazer_8005',
    telegramBound: false,
    kycStatus: 'verified',
    balanceInr: 206,
    balanceUsdt: 2.3,
    bridgeTokenBalance: 206,
    commissionRate: 1.0,
    credibilityScore: 100,
    successRate: 100,
    status: 'active',
    createdAt: '2026-08-01'
  },
  {
    id: 'm-102',
    merchantCode: 'M_QUICKREMIT',
    merchantName: 'QuickRemit Global Services',
    email: 'finance@quickremit.in',
    contactPhone: '+91 98111 22334',
    merchantType: 'send',
    bridgeEnabled: false,
    apiKey: 'mock_pk_7c4f1e9b2a5d836017',
    apiSecret: 'mock_sk_1234567890abcdef12345678',
    webhookUrl: 'https://gateway.quickremit.in/webhooks',
    telegramBound: false,
    kycStatus: 'verified',
    balanceInr: 650000,
    balanceUsdt: 0,
    bridgeTokenBalance: 0,
    commissionRate: 1.5,
    status: 'active',
    createdAt: '2026-03-20'
  },
  {
    id: 'm-103',
    merchantCode: 'M_CRYPTOHUB',
    merchantName: 'Bharat Web3 Collections',
    email: 'settle@bharatweb3.com',
    contactPhone: '+91 97777 88990',
    merchantType: 'receive',
    bridgeEnabled: true,
    apiKey: 'mock_pk_5a1b3c7d9e2f408163',
    apiSecret: 'mock_sk_aabbccddeeff001122334455',
    telegramBound: true,
    telegramChatId: '77219934',
    kycStatus: 'verified',
    balanceInr: 3200000,
    balanceUsdt: 38200,
    bridgeTokenBalance: 28900,
    commissionRate: 1.1,
    status: 'active',
    createdAt: '2026-02-10'
  }
];

export const mockPayoutOrders: PayoutOrder[] = [
  {
    id: 'po_001',
    merchantOrderNo: 'ORD-OUT-9912',
    orderRef: 'REF_9918231',
    amount: 14500,
    fee: 14.5,
    transferMethod: 'UPI',
    beneficiaryName: 'Aarav Sharma',
    upiId: 'aarav.sharma@okaxis',
    status: 'completed',
    utr: '625391029384',
    createdAt: '2026-09-10 17:45',
    completedAt: '2026-09-10 17:46'
  },
  {
    id: 'po_002',
    merchantOrderNo: 'ORD-OUT-9913',
    orderRef: 'REF_9918232',
    amount: 85000,
    fee: 85.0,
    transferMethod: 'BANK',
    beneficiaryName: 'Priya Patel',
    accountNumber: '50100239182736',
    ifscCode: 'HDFC0000128',
    bankName: 'HDFC Bank',
    status: 'completed',
    utr: '625391029399',
    createdAt: '2026-09-10 17:30',
    completedAt: '2026-09-10 17:32'
  },
  {
    id: 'po_003',
    merchantOrderNo: 'ORD-OUT-9914',
    orderRef: 'REF_9918233',
    amount: 22000,
    fee: 22.0,
    transferMethod: 'UPI',
    beneficiaryName: 'Rohan Verma',
    upiId: 'rohan.v@icici',
    status: 'processing',
    createdAt: '2026-09-10 17:58'
  },
  {
    id: 'po_004',
    merchantOrderNo: 'ORD-OUT-9915',
    orderRef: 'REF_9918234',
    amount: 5000,
    fee: 5.0,
    transferMethod: 'SPECIAL',
    beneficiaryName: 'Neha Sen',
    accountNumber: '918273645012',
    ifscCode: 'SBIN0004521',
    bankName: 'State Bank of India',
    status: 'pending',
    createdAt: '2026-09-10 18:02'
  },
  {
    id: 'po_005',
    merchantOrderNo: 'ORD-OUT-9916',
    orderRef: 'REF_9918235',
    amount: 120000,
    fee: 120.0,
    transferMethod: 'BANK',
    beneficiaryName: 'Vikas Kumar',
    accountNumber: '1092837465',
    ifscCode: 'ICIC0000005',
    bankName: 'ICICI Bank',
    status: 'disputed',
    utr: '625391029412',
    createdAt: '2026-09-10 16:15'
  }
];

export const mockReceiveOrders: ReceiveOrder[] = [
  {
    id: 'ro_101',
    merchantOrderNo: 'REC-IN-4421',
    amount: 5000,
    paymentMethod: 'UPI',
    customerName: 'Kunal Malhotra',
    payerUpiId: 'kunalm@paytm',
    targetVpa: 'payu.deltapay@icici',
    utr: '625390918231',
    status: 'completed',
    createdAt: '2026-09-10 17:50',
    expiryTime: '2026-09-10 18:05'
  },
  {
    id: 'ro_102',
    merchantOrderNo: 'REC-IN-4422',
    amount: 18500,
    paymentMethod: 'UPI',
    customerName: 'Sunita Rao',
    targetVpa: 'payu.deltapay@icici',
    status: 'pending',
    createdAt: '2026-09-10 18:01',
    expiryTime: '2026-09-10 18:16'
  },
  {
    id: 'ro_103',
    merchantOrderNo: 'REC-IN-4423',
    amount: 50000,
    paymentMethod: 'BANK',
    customerName: 'Manoj Gupta',
    targetVpa: 'VA-DELTAPAY-091',
    utr: '625390918250',
    status: 'completed',
    createdAt: '2026-09-10 16:40',
    expiryTime: '2026-09-10 17:40'
  }
];

export const mockPaymentLinks: PaymentLink[] = [
  {
    id: 'pl_01',
    linkToken: 'pl_k9x2m8q4',
    url: 'https://payulink.io/pay/pl_k9x2m8q4',
    title: 'Consultancy Retainer Invoice #402',
    description: 'Instant settlement via UPI / QR / Net Banking',
    amount: 25000,
    customerEmail: 'client@techcorp.in',
    customerMobile: '+91 99887 76655',
    status: 'active',
    createdAt: '2026-09-10 14:00',
    expiresAt: '2026-09-12 23:59'
  },
  {
    id: 'pl_02',
    linkToken: 'pl_b3f7w1p9',
    url: 'https://payulink.io/pay/pl_b3f7w1p9',
    title: 'USDT Liquid Conversion Lot #12',
    description: 'Direct conversion to INR bank account',
    amount: 88500,
    status: 'completed',
    createdAt: '2026-09-10 11:20',
    expiresAt: '2026-09-10 12:20'
  }
];

export const mockBridgePools: BridgePool[] = [
  {
    id: 'bp_1',
    poolCode: 'POOL-USDT-INR-01',
    name: 'Primary High-Velocity USDT/INR Pool',
    tokenType: 'USDT',
    totalLiquidity: 250000,
    availableLiquidity: 184200,
    lockedLiquidity: 65800,
    rate: 89.45,
    status: 'open',
    minOrderSize: 500,
    maxOrderSize: 50000,
    participantsCount: 42,
    completionRate: 99.2
  },
  {
    id: 'bp_2',
    poolCode: 'POOL-FAST-UPI-02',
    name: 'Express Instant UPI Settlement Pool',
    tokenType: 'INR',
    totalLiquidity: 5000000,
    availableLiquidity: 3450000,
    lockedLiquidity: 1550000,
    rate: 89.30,
    status: 'open',
    minOrderSize: 100,
    maxOrderSize: 100000,
    participantsCount: 88,
    completionRate: 98.7
  }
];

export const mockSettlements: SettlementRecord[] = [
  {
    id: 'set_1',
    settlementNo: 'SET-2026-0910-01',
    merchantCode: 'M_DELTAPAY',
    type: 'on_demand',
    method: 'USDT_TRC20',
    amountPaisa: 89450000,
    amountInr: 894500,
    usdtAmount: 10000,
    usdtRate: 89.45,
    feeInr: 894.5,
    destination: 'TK8xY92mQz7v1PnL4dRtWb3sKpEm6cYuHa',
    status: 'processed',
    createdAt: '2026-09-10 15:30',
    processedAt: '2026-09-10 15:35'
  },
  {
    id: 'set_2',
    settlementNo: 'SET-2026-0910-02',
    merchantCode: 'M_DELTAPAY',
    type: 'standard',
    method: 'BANK',
    amountPaisa: 50000000,
    amountInr: 500000,
    feeInr: 0,
    destination: 'HDFC Bank - 50100239182736 (IFSC: HDFC0000128)',
    status: 'approved',
    createdAt: '2026-09-10 17:00'
  }
];

export const mockDisputes: DisputeRecord[] = [
  {
    id: 'dsp_1',
    ticketNo: 'TICK-901',
    orderId: 'ORD-OUT-9916',
    merchantCode: 'M_DELTAPAY',
    amount: 120000,
    reason: 'UTR_MISMATCH',
    customerUtr: '625391029412',
    bankUtr: '625391029400',
    status: 'investigating',
    openedAt: '2026-09-10 16:30'
  }
];
