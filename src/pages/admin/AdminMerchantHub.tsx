import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  CheckCircle2, 
  Ban, 
  Sliders, 
  Coins, 
  Wallet, 
  Plus, 
  X, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { MerchantUser } from '../../types';
import { mockMerchants } from '../../services/mockData';

export const AdminMerchantHub: React.FC = () => {
  const [merchants, setMerchants] = useState<MerchantUser[]>(mockMerchants);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMerchant, setSelectedMerchant] = useState<MerchantUser | null>(null);
  const [showAdjustModal, setShowAdjustModal] = useState(false);

  // Balance adjustment state
  const [adjustType, setAdjustType] = useState<'CREDIT' | 'DEBIT'>('CREDIT');
  const [currency, setCurrency] = useState<'INR' | 'USDT'>('INR');
  const [adjustAmount, setAdjustAmount] = useState('');
  const [reason, setReason] = useState('');

  const toggleStatus = (id: string) => {
    setMerchants(merchants.map(m => {
      if (m.id === id) {
        const nextStatus = m.status === 'active' ? 'suspended' : 'active';
        return { ...m, status: nextStatus };
      }
      return m;
    }));
  };

  const handleAdjustBalance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMerchant || !adjustAmount) return;

    const amt = parseFloat(adjustAmount);
    setMerchants(merchants.map(m => {
      if (m.id === selectedMerchant.id) {
        if (currency === 'INR') {
          const newBal = adjustType === 'CREDIT' ? m.balanceInr + amt : Math.max(0, m.balanceInr - amt);
          return { ...m, balanceInr: newBal };
        } else {
          const newBal = adjustType === 'CREDIT' ? m.balanceUsdt + amt : Math.max(0, m.balanceUsdt - amt);
          return { ...m, balanceUsdt: newBal };
        }
      }
      return m;
    }));

    setShowAdjustModal(false);
    setAdjustAmount('');
    setReason('');
    alert(`Manual ${adjustType} of ${amt} ${currency} applied with audit log.`);
  };

  const filteredMerchants = merchants.filter(m => 
    m.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.merchantCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-display text-white">Merchant & Client Management</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Audit live merchant activity, manage fee tiers, adjust ledger balances, and enforce compliance suspensions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search merchants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bp-input border border-bp-border text-white placeholder-gray-500 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Merchants Table */}
      <div className="rounded-2xl bg-bp-card border border-bp-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-white/[0.02] border-b border-bp-border font-medium text-white uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Merchant Entity</th>
                <th className="py-3.5 px-4">Role & Mode</th>
                <th className="py-3.5 px-4">INR / Token Balance</th>
                <th className="py-3.5 px-4">Credibility</th>
                <th className="py-3.5 px-4">Success Rate</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bp-border">
              {filteredMerchants.map((m) => (
                <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-white block">{m.merchantName}</span>
                    <span className="font-mono text-[10px] text-orange-400">{m.merchantCode}</span>
                    <span className="text-[10px] text-gray-500 block">{m.email}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-gray-200 font-semibold uppercase">
                        {m.merchantType}
                      </span>
                      {m.bridgeEnabled && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-orange-500/20 text-orange-300 font-bold border border-orange-500/30">
                          BRIDGE
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    <div>₹{m.balanceInr.toLocaleString('en-IN')}</div>
                    <div className="text-[10px] text-orange-400 font-normal">{m.bridgeTokenBalance} TKN</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400 font-semibold">
                    {m.credibilityScore ?? 100} / 100
                  </td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400 font-semibold">
                    {(m.successRate ?? 100).toFixed(1)}%
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      m.status === 'active' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {m.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedMerchant(m);
                          setShowAdjustModal(true);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white text-[11px] font-medium transition-colors"
                      >
                        Adjust Balance
                      </button>
                      <button
                        onClick={() => toggleStatus(m.id)}
                        className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                          m.status === 'active'
                            ? 'text-red-400 hover:bg-red-500/10'
                            : 'text-emerald-400 hover:bg-emerald-500/10'
                        }`}
                      >
                        {m.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Balance Adjustment Modal */}
      {showAdjustModal && selectedMerchant && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1022] border border-white/10 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-base text-white">Manual Balance Adjustment</h3>
              <button onClick={() => setShowAdjustModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <p className="text-gray-400">
                Merchant: <strong className="text-white">{selectedMerchant.merchantName}</strong> ({selectedMerchant.merchantCode})
              </p>
            </div>

            <form onSubmit={handleAdjustBalance} className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAdjustType('CREDIT')}
                  className={`py-2 rounded-xl font-semibold border ${
                    adjustType === 'CREDIT' 
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' 
                      : 'border-white/10 bg-white/5 text-gray-400'
                  }`}
                >
                  Manual Credit (+)
                </button>
                <button
                  type="button"
                  onClick={() => setAdjustType('DEBIT')}
                  className={`py-2 rounded-xl font-semibold border ${
                    adjustType === 'DEBIT' 
                      ? 'border-red-500 bg-red-500/10 text-red-400' 
                      : 'border-white/10 bg-white/5 text-gray-400'
                  }`}
                >
                  Manual Debit (-)
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-gray-400 block mb-1">Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as any)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USDT">USDT (TKN)</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Amount</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={adjustAmount}
                    onChange={(e) => setAdjustAmount(e.target.value)}
                    placeholder="10000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Audit Log Justification / Reason</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Bank reconciliation discrepancy resolution or credit bonus"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-500/20 transition-all mt-2"
              >
                Commit Adjustment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
