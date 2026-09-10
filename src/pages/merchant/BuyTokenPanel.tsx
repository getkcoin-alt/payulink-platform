import React, { useState } from 'react';
import { 
  Coins, 
  QrCode, 
  Copy, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  ShieldCheck, 
  ExternalLink,
  Wallet
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const BuyTokenPanel: React.FC = () => {
  const { currentMerchant, updateMerchant } = useAuth();
  const [method, setMethod] = useState<'USDT' | 'INR'>('USDT');
  const [usdtAmount, setUsdtAmount] = useState('1000');
  const [network, setNetwork] = useState<'TRC20' | 'ERC20' | 'BEP20'>('TRC20');
  const [copied, setCopied] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<any | null>(null);

  const ratePerUsdt = 100; // 1 USDT = 100 tokens
  const tokenQuantity = parseFloat(usdtAmount || '0') * ratePerUsdt;

  const presets = [
    { label: '100,000 tokens', usdt: 1000 },
    { label: '500,000 tokens', usdt: 5000 },
    { label: '1,000,000 tokens', usdt: 10000 },
    { label: '2,000,000 tokens', usdt: 20000 }
  ];

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const usdt = parseFloat(usdtAmount);
    if (!usdt || usdt <= 0) return;

    const order = {
      orderId: `TKN-${Math.floor(100000 + Math.random() * 900000)}`,
      tokens: usdt * ratePerUsdt,
      usdtAmount: usdt,
      network,
      depositAddress: network === 'TRC20' 
        ? 'TYDzsYUEpvnYmQk4zGP9s2T9bXpQ3n5TRC' 
        : '0x71C8364736b479B37E4aBc77839351aE47481234',
      expiresInMinutes: 30
    };
    setCreatedOrder(order);
  };

  const handleSimulatePayment = () => {
    if (!createdOrder) return;
    updateMerchant({
      bridgeTokenBalance: currentMerchant.bridgeTokenBalance + createdOrder.tokens,
      balanceUsdt: currentMerchant.balanceUsdt + createdOrder.usdtAmount
    });
    alert(`Payment simulated! Credited ${createdOrder.tokens.toLocaleString()} tokens to Mazer Infotech.`);
    setCreatedOrder(null);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold font-display text-bp-text">Buy Token</h1>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20">
            LIQUIDITY MINT
          </span>
        </div>
        <p className="text-xs text-bp-muted mt-0.5">
          Purchase bridge tokens via USDT or INR to fulfill payouts and bridge operations.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
        <button
          onClick={() => setMethod('USDT')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            method === 'USDT'
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
              : 'bg-white/[0.02] text-bp-muted hover:text-bp-text hover:bg-white/[0.05]'
          }`}
        >
          <Coins className="w-4 h-4" />
          Buy via USDT
        </button>

        <button
          onClick={() => setMethod('INR')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            method === 'INR'
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
              : 'bg-white/[0.02] text-bp-muted hover:text-bp-text hover:bg-white/[0.05]'
          }`}
        >
          <Wallet className="w-4 h-4" />
          Buy via INR
        </button>
      </div>

      {/* Main Buy Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6 rounded-2xl bg-bp-card border border-white/[0.08] shadow-lg space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div>
              <h2 className="text-sm font-bold text-bp-text">Buy Tokens via {method}</h2>
              <p className="text-[11px] text-bp-muted">Rate is pegged at live USDT conversion</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-bp-muted font-mono block">CURRENT RATE</span>
              <span className="text-xs font-bold font-mono text-emerald-400">1 USDT = 100 tokens</span>
            </div>
          </div>

          <form onSubmit={handleCreateOrder} className="space-y-4">
            <div>
              <label className="text-[11px] font-mono text-bp-muted block uppercase tracking-wider mb-1.5">
                USDT Amount (in dollars)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="10"
                  step="1"
                  value={usdtAmount}
                  onChange={(e) => setUsdtAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-bp-input border border-bp-border text-sm font-mono text-bp-text focus:outline-none focus:border-orange-500"
                  placeholder="Enter USDT amount..."
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-bp-muted">
                  USDT
                </span>
              </div>
            </div>

            {/* Quick Presets */}
            <div>
              <label className="text-[11px] font-mono text-bp-muted block uppercase tracking-wider mb-1.5">
                Preset Allocations
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {presets.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setUsdtAmount(p.usdt.toString())}
                    className={`p-2 rounded-xl text-center border text-xs font-mono transition-all ${
                      usdtAmount === p.usdt.toString()
                        ? 'bg-orange-500/10 text-orange-400 border-orange-500/40'
                        : 'bg-white/[0.02] border-white/[0.06] text-bp-muted hover:text-bp-text hover:bg-white/[0.04]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Network Selector */}
            <div>
              <label className="text-[11px] font-mono text-bp-muted block uppercase tracking-wider mb-1.5">
                Select Network
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['TRC20', 'ERC20', 'BEP20'] as const).map((net) => (
                  <button
                    key={net}
                    type="button"
                    onClick={() => setNetwork(net)}
                    className={`py-2.5 rounded-xl text-center border text-xs font-mono font-bold transition-all ${
                      network === net
                        ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20'
                        : 'bg-white/[0.02] border-white/[0.06] text-bp-muted hover:text-bp-text'
                    }`}
                  >
                    {net}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Box */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-bp-muted">Tokens to Receive:</span>
                <span className="font-mono font-bold text-orange-400 text-sm">
                  {tokenQuantity.toLocaleString()} TKN
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-bp-muted">Effective INR Value:</span>
                <span className="font-mono text-bp-text">
                  ₹{(parseFloat(usdtAmount || '0') * 89.45).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 hover:brightness-110 transition-all"
            >
              Create USDT Purchase Order
            </button>
          </form>
        </div>

        {/* Current Balances & Instructions */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-bp-card border border-white/[0.08] shadow-lg space-y-3">
            <span className="text-[10px] font-mono text-bp-muted uppercase tracking-wider block">
              CURRENT TOKEN HOLDINGS
            </span>
            <div className="text-3xl font-extrabold font-mono text-orange-400">
              {currentMerchant.bridgeTokenBalance.toLocaleString()} TKN
            </div>
            <p className="text-xs text-bp-muted">
              Working Balance: <strong className="text-bp-text">₹206.00</strong>
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-bp-muted space-y-2.5">
            <div className="flex items-center gap-2 text-bp-text font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Automated Minting
            </div>
            <p>
              Once your blockchain transaction has 3 confirmations on the Tron / Ethereum / BNB network, tokens are automatically credited to your working balance.
            </p>
          </div>
        </div>
      </div>

      {/* Active Deposit Modal */}
      {createdOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl bg-bp-card border border-white/[0.1] shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div>
                <h3 className="text-base font-bold text-bp-text">USDT Deposit Order</h3>
                <span className="text-[11px] font-mono text-orange-400">{createdOrder.orderId}</span>
              </div>
              <button
                onClick={() => setCreatedOrder(null)}
                className="text-bp-muted hover:text-bp-text"
              >
                ✕
              </button>
            </div>

            <div className="text-center space-y-3">
              <div className="w-36 h-36 mx-auto p-2 bg-white rounded-xl shadow-lg flex items-center justify-center">
                <QrCode className="w-28 h-28 text-black" />
              </div>

              <div>
                <span className="text-xs text-bp-muted block">Send exactly</span>
                <span className="text-2xl font-extrabold font-mono text-emerald-400">
                  {createdOrder.usdtAmount} USDT
                </span>
                <span className="text-[11px] font-mono text-bp-muted block mt-0.5">
                  Network: <strong className="text-bp-text">{createdOrder.network}</strong>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-left">
                <span className="text-[10px] font-mono text-bp-muted block">DEPOSIT ADDRESS</span>
                <div className="flex items-center justify-between gap-2 mt-1">
                  <span className="font-mono text-xs text-bp-text truncate">{createdOrder.depositAddress}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(createdOrder.depositAddress);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    }}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-bp-muted hover:text-bp-text"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSimulatePayment}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20"
              >
                Simulate Payment Receipt
              </button>
              <button
                onClick={() => setCreatedOrder(null)}
                className="px-4 py-2.5 rounded-xl bg-white/5 text-bp-muted hover:text-bp-text text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
