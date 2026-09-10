import React, { useState } from 'react';
import { 
  Scale, 
  Wallet, 
  Building2, 
  QrCode, 
  Coins, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SettlementOnDemandPanel: React.FC = () => {
  const { currentMerchant, updateMerchant } = useAuth();
  const [receiveIn, setReceiveIn] = useState<'INR' | 'USDT'>('INR');
  const [payoutMethod, setPayoutMethod] = useState<'BANK' | 'UPI' | 'CASH'>('BANK');
  const [amount, setAmount] = useState('200');
  const [selectedAccount, setSelectedAccount] = useState('acc_01');
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableBalance = 206.00;
  const lockedBalance = 0.00;
  const frozenBalance = 0.00;
  const totalBalance = availableBalance + lockedBalance + frozenBalance;

  const savedAccounts = [
    { id: 'acc_01', type: 'BANK', title: 'HDFC Bank - Current A/C', details: 'A/C: •••• 9102 · HDFC0001234', status: 'Verified' },
    { id: 'acc_02', type: 'UPI', title: 'Mazer Operations VPA', details: 'mazer.ops@okhdfcbank', status: 'Verified' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!amt || amt <= 0 || amt > availableBalance) {
      alert('Invalid settlement amount');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Settlement request for ₹${amt} submitted successfully to compliance queue.`);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold font-display text-bp-text">On-Demand Settlement</h1>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            T+0 INSTANT
          </span>
        </div>
        <p className="text-xs text-bp-muted mt-0.5">
          Request an immediate payout outside the standard cycle.
        </p>
      </div>

      {/* 4 Summary Balance Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-bp-card border border-white/[0.08] shadow-lg">
          <span className="text-[10px] font-mono text-bp-muted uppercase tracking-wider block">AVAILABLE</span>
          <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
            ₹{availableBalance.toFixed(2)}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-bp-card border border-white/[0.08] shadow-lg">
          <span className="text-[10px] font-mono text-bp-muted uppercase tracking-wider block">LOCKED</span>
          <span className="text-2xl font-bold font-mono text-bp-text mt-1 block">
            ₹{lockedBalance.toFixed(2)}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-bp-card border border-white/[0.08] shadow-lg">
          <span className="text-[10px] font-mono text-bp-muted uppercase tracking-wider block">FROZEN</span>
          <span className="text-2xl font-bold font-mono text-bp-muted mt-1 block">
            ₹{frozenBalance.toFixed(2)}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-bp-card border border-white/[0.08] shadow-lg">
          <span className="text-[10px] font-mono text-bp-muted uppercase tracking-wider block">TOTAL</span>
          <span className="text-2xl font-bold font-mono text-bp-text mt-1 block">
            ₹{totalBalance.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Form & Saved Accounts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Request Form */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-bp-card border border-white/[0.08] shadow-lg space-y-5">
          <h2 className="text-sm font-bold text-bp-text pb-3 border-b border-white/[0.06]">
            New Settlement Request
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Receive in: INR | USDT */}
            <div>
              <label className="text-[11px] font-mono text-bp-muted block uppercase tracking-wider mb-2">
                Receive in
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setReceiveIn('INR')}
                  className={`py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    receiveIn === 'INR'
                      ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20'
                      : 'bg-white/[0.02] border-white/[0.06] text-bp-muted hover:text-bp-text'
                  }`}
                >
                  <Wallet className="w-4 h-4" />
                  INR
                </button>

                <button
                  type="button"
                  onClick={() => setReceiveIn('USDT')}
                  className={`py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    receiveIn === 'USDT'
                      ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20'
                      : 'bg-white/[0.02] border-white/[0.06] text-bp-muted hover:text-bp-text'
                  }`}
                >
                  <Coins className="w-4 h-4" />
                  USDT
                </button>
              </div>
            </div>

            {/* Payout method: BANK | UPI | CASH */}
            {receiveIn === 'INR' && (
              <div>
                <label className="text-[11px] font-mono text-bp-muted block uppercase tracking-wider mb-2">
                  Payout method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['BANK', 'UPI', 'CASH'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setPayoutMethod(m)}
                      className={`py-2 rounded-xl border text-xs font-mono font-semibold transition-all ${
                        payoutMethod === m
                          ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                          : 'bg-white/[0.02] border-white/[0.06] text-bp-muted hover:text-bp-text'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Destination account */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-mono text-bp-muted uppercase tracking-wider">
                  Payout account
                </label>
                <button
                  type="button"
                  onClick={() => setShowAddAccountModal(true)}
                  className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add
                </button>
              </div>

              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-bp-input border border-bp-border text-xs text-bp-text focus:outline-none focus:border-orange-500"
              >
                {savedAccounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.title} ({acc.details})
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-mono text-bp-muted uppercase tracking-wider">
                  Amount ({receiveIn})
                </label>
                <button
                  type="button"
                  onClick={() => setAmount(availableBalance.toString())}
                  className="text-[11px] text-orange-400 hover:underline font-mono"
                >
                  Use Max (₹{availableBalance})
                </button>
              </div>

              <div className="relative">
                <input
                  type="number"
                  min="10"
                  max={availableBalance}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-bp-input border border-bp-border text-sm font-mono text-bp-text focus:outline-none focus:border-orange-500"
                  placeholder="Enter settlement amount..."
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-bp-muted">
                  {receiveIn}
                </span>
              </div>
            </div>

            {/* Fee estimation */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono space-y-1.5">
              <div className="flex justify-between text-bp-muted">
                <span>Requested:</span>
                <span className="text-bp-text font-bold">₹{amount}</span>
              </div>
              <div className="flex justify-between text-bp-muted">
                <span>Disbursement Fee (0%):</span>
                <span className="text-emerald-400">₹0.00</span>
              </div>
              <div className="flex justify-between text-bp-text font-bold pt-1 border-t border-white/[0.04]">
                <span>Net Credited:</span>
                <span className="text-emerald-400">₹{amount}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 hover:brightness-110 transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Processing Request...' : 'Submit Settlement Request'}
            </button>
          </form>
        </div>

        {/* Saved Payout Accounts */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-bp-card border border-white/[0.08] shadow-lg space-y-3">
            <h3 className="text-xs font-bold text-bp-text uppercase tracking-wider font-mono">
              Saved Payout Accounts
            </h3>

            <div className="space-y-2.5">
              {savedAccounts.map((acc) => (
                <div
                  key={acc.id}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-bp-text">{acc.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {acc.status}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-bp-muted">{acc.details}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-bp-muted space-y-2">
            <div className="flex items-center gap-2 text-bp-text font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Automated IMPS / TRC-20
            </div>
            <p>
              On-demand requests below ₹2,00,000 are processed instantly through direct banking APIs without manual intervention.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
