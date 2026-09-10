import React, { useState } from 'react';
import { 
  Scale, 
  Clock, 
  CheckCircle2, 
  Building2, 
  Coins, 
  ArrowRight, 
  AlertCircle,
  Zap,
  Plus
} from 'lucide-react';
import { SettlementRecord } from '../../types';
import { mockSettlements } from '../../services/mockData';
import { useAuth } from '../../context/AuthContext';

export const SettlementsPanel: React.FC<{ initialMode?: 'standard' | 'on_demand' }> = ({
  initialMode = 'on_demand'
}) => {
  const { currentMerchant, updateMerchant } = useAuth();
  const [settlements, setSettlements] = useState<SettlementRecord[]>(mockSettlements);
  const [method, setMethod] = useState<'BANK' | 'USDT_TRC20'>('USDT_TRC20');
  const [amountInr, setAmountInr] = useState('100000');
  const [destination, setDestination] = useState('TK8xY92mQz7v1PnL4dRtWb3sKpEm6cYuHa');

  const liveUsdtRate = 89.45;
  const numInr = parseFloat(amountInr) || 0;
  const calculatedUsdt = (numInr / liveUsdtRate).toFixed(2);
  const feeInr = method === 'BANK' ? 0 : numInr * 0.005; // 0.5% for crypto

  const handleRequestSettlement = (e: React.FormEvent) => {
    e.preventDefault();
    if (numInr <= 0 || numInr > currentMerchant.balanceInr) {
      alert('Invalid settlement amount or exceeds available INR balance!');
      return;
    }

    const newRecord: SettlementRecord = {
      id: `set_${Date.now()}`,
      settlementNo: `SET-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(10 + Math.random() * 90)}`,
      merchantCode: currentMerchant.merchantCode,
      type: 'on_demand',
      method,
      amountPaisa: numInr * 100,
      amountInr: numInr,
      usdtAmount: method === 'USDT_TRC20' ? parseFloat(calculatedUsdt) : undefined,
      usdtRate: liveUsdtRate,
      feeInr,
      destination,
      status: 'approved',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    setSettlements([newRecord, ...settlements]);
    updateMerchant({ balanceInr: currentMerchant.balanceInr - numInr });
    alert('Instant On-Demand settlement request submitted successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-display text-bp-text">Settlements & Liquidity Off-Ramp</h1>
          <p className="text-xs text-bp-muted mt-0.5">
            Liquidate your merchant earnings to your registered Indian Bank Account or USDT (TRC-20/ERC-20) wallet.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-bp-card border border-bp-border text-xs flex items-center gap-3">
          <div>
            <span className="text-bp-muted text-[10px] block">Available For Settlement</span>
            <span className="font-mono font-bold text-emerald-400 text-sm">
              ₹{currentMerchant.balanceInr.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* On Demand Settlement Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-bp-card border border-bp-border space-y-4">
          <h2 className="font-semibold text-sm text-bp-text flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            Request Instant On-Demand Settlement
          </h2>

          <form onSubmit={handleRequestSettlement} className="space-y-4 text-xs">
            <div>
              <label className="block text-bp-muted mb-1 font-medium">Settlement Channel</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMethod('USDT_TRC20');
                    setDestination('TK8xY92mQz7v1PnL4dRtWb3sKpEm6cYuHa');
                  }}
                  className={`py-3 px-4 rounded-xl border text-left transition-all ${
                    method === 'USDT_TRC20' 
                      ? 'border-violet-500 bg-violet-500/10 text-violet-300' 
                      : 'border-bp-border bg-bp-input text-bp-muted'
                  }`}
                >
                  <div className="flex items-center gap-2 font-semibold">
                    <Coins className="w-4 h-4" />
                    USDT (TRC-20) Instant
                  </div>
                  <span className="text-[10px] text-bp-muted mt-1 block">Live Rate: ₹89.45 • 0.5% network fee</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMethod('BANK');
                    setDestination('HDFC Bank - 50100239182736 (IFSC: HDFC0000128)');
                  }}
                  className={`py-3 px-4 rounded-xl border text-left transition-all ${
                    method === 'BANK' 
                      ? 'border-blue-500 bg-blue-500/10 text-blue-300' 
                      : 'border-bp-border bg-bp-input text-bp-muted'
                  }`}
                >
                  <div className="flex items-center gap-2 font-semibold">
                    <Building2 className="w-4 h-4" />
                    Bank Account (IMPS/RTGS)
                  </div>
                  <span className="text-[10px] text-bp-muted mt-1 block">Zero fees • Direct bank credit</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-bp-muted mb-1 font-medium">Amount to Settle (INR)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-bp-muted font-mono">₹</span>
                <input
                  type="number"
                  min="1000"
                  max={currentMerchant.balanceInr}
                  required
                  value={amountInr}
                  onChange={(e) => setAmountInr(e.target.value)}
                  className="w-full bg-bp-input border border-bp-border rounded-xl pl-8 pr-4 py-2 text-bp-text font-mono font-semibold text-sm focus:outline-none focus:border-bp-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-bp-muted mb-1 font-medium">Destination Details</label>
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-bp-text font-mono text-xs focus:outline-none focus:border-bp-accent"
              />
            </div>

            {/* Calculations Summary */}
            <div className="p-3 rounded-xl bg-white/5 border border-bp-border space-y-2 font-mono">
              <div className="flex justify-between text-bp-muted">
                <span>Requested Amount:</span>
                <span>₹{numInr.toLocaleString('en-IN')}</span>
              </div>
              {method === 'USDT_TRC20' && (
                <div className="flex justify-between text-bp-muted">
                  <span>USDT Conversion Rate:</span>
                  <span>₹{liveUsdtRate}</span>
                </div>
              )}
              <div className="flex justify-between text-bp-muted">
                <span>Estimated Processing Fee:</span>
                <span>₹{feeInr.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-400 text-sm pt-2 border-t border-white/5">
                <span>Net Disbursement Expected:</span>
                <span>
                  {method === 'USDT_TRC20' ? `${calculatedUsdt} USDT` : `₹${(numInr - feeInr).toLocaleString('en-IN')}`}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-bp-accent text-white font-semibold shadow-lg shadow-orange-500/20 hover:bg-bp-accent-hover transition-all"
            >
              Dispatch Settlement Request
            </button>
          </form>
        </div>

        {/* Right Col: Standard Cycle Info */}
        <div className="p-6 rounded-2xl bg-bp-card border border-bp-border space-y-4 text-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-bp-accent" />
            <h3 className="font-semibold text-bp-text">Standard Settlement Cycle</h3>
          </div>

          <p className="text-bp-muted">
            All merchant collections undergo standard automatic batch clearance on a <strong>T+1 schedule</strong> at 11:00 AM IST directly to your default verified bank account.
          </p>

          <div className="p-3 rounded-xl bg-bp-input border border-bp-border space-y-2">
            <span className="text-[10px] text-bp-muted block">Next Automated Cycle</span>
            <span className="font-mono font-bold text-bp-text text-sm block">Tomorrow at 11:00 AM IST</span>
            <span className="text-[11px] text-emerald-400 font-semibold">Status: Scheduled</span>
          </div>

          <div className="pt-2 border-t border-bp-border">
            <span className="text-bp-muted block mb-1 font-medium">Default Bank Account:</span>
            <span className="font-mono text-bp-text font-semibold block">HDFC Bank ••••••2736</span>
            <span className="text-bp-muted text-[10px] font-mono">IFSC: HDFC0000128</span>
          </div>
        </div>
      </div>

      {/* Settlement History Table */}
      <div className="rounded-2xl bg-bp-card border border-bp-border overflow-hidden">
        <div className="p-4 border-b border-bp-border">
          <h3 className="font-semibold text-xs text-bp-text">Settlement Log & Records</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-bp-muted">
            <thead className="bg-white/[0.02] border-b border-bp-border font-medium text-bp-text uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Settlement ID</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">INR Amount</th>
                <th className="py-3 px-4">Net Payout</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bp-border">
              {settlements.map((s) => (
                <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-bp-text">{s.settlementNo}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-bp-text uppercase">
                      {s.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-bp-text">{s.method}</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-bp-text">
                    ₹{s.amountInr.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-semibold">
                    {s.usdtAmount ? `${s.usdtAmount.toLocaleString()} USDT` : `₹${(s.amountInr - s.feeInr).toLocaleString('en-IN')}`}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] truncate max-w-xs">{s.destination}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      s.status === 'processed' 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-blue-500/10 text-blue-400'
                    }`}>
                      {s.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-bp-muted">{s.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
