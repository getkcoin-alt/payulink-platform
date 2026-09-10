import React, { useState } from 'react';
import { Scale, CheckCircle2, Clock, Check, X, Coins, Building2 } from 'lucide-react';
import { SettlementRecord } from '../../types';
import { mockSettlements } from '../../services/mockData';

export const AdminSettlementsHub: React.FC = () => {
  const [settlements, setSettlements] = useState<SettlementRecord[]>(mockSettlements);

  const handleApprove = (id: string) => {
    setSettlements(settlements.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: 'processed',
          processedAt: new Date().toISOString().slice(0, 16)
        };
      }
      return s;
    }));
    alert('Settlement marked as processed and funds dispatched.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-display text-white">Settlement Clearance Queue</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Audit and approve pending merchant liquidity settlements to registered bank accounts and USDT wallets.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-bp-card border border-bp-border text-xs flex items-center gap-3">
          <div>
            <span className="text-gray-400 text-[10px] block">Pending Clearance</span>
            <span className="font-mono font-bold text-amber-400 text-sm">
              {settlements.filter(s => s.status !== 'processed').length} Requests
            </span>
          </div>
        </div>
      </div>

      {/* Settlements Table */}
      <div className="rounded-2xl bg-bp-card border border-bp-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-white/[0.02] border-b border-bp-border font-medium text-white uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Settlement No</th>
                <th className="py-3.5 px-4">Merchant</th>
                <th className="py-3.5 px-4">Channel</th>
                <th className="py-3.5 px-4">Amount (INR)</th>
                <th className="py-3.5 px-4">Disbursement Target</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Clearance Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bp-border">
              {settlements.map((s) => (
                <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-white">{s.settlementNo}</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">{s.merchantCode}</td>
                  <td className="py-3.5 px-4 font-semibold text-white">
                    {s.method}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    ₹{s.amountInr.toLocaleString('en-IN')}
                    {s.usdtAmount && (
                      <span className="block text-[10px] text-violet-300 font-normal">({s.usdtAmount} USDT)</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] truncate max-w-xs">{s.destination}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      s.status === 'processed' 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {s.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {s.status !== 'processed' ? (
                      <button
                        onClick={() => handleApprove(s.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md transition-all"
                      >
                        Approve & Release
                      </button>
                    ) : (
                      <span className="text-[11px] text-gray-500 font-mono">Dispatched</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
