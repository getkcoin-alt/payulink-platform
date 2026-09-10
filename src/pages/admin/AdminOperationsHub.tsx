import React, { useState } from 'react';
import { 
  ArrowUpCircle, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Search, 
  Zap, 
  CheckSquare, 
  AlertCircle 
} from 'lucide-react';
import { PayoutOrder } from '../../types';
import { mockPayoutOrders } from '../../services/mockData';

export const AdminOperationsHub: React.FC = () => {
  const [orders, setOrders] = useState<PayoutOrder[]>(mockPayoutOrders);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const handleBatchApprove = () => {
    if (selectedOrders.length === 0) return;
    setOrders(orders.map(o => {
      if (selectedOrders.includes(o.id)) {
        return {
          ...o,
          status: 'completed',
          utr: o.utr || `62539${Math.floor(1000000 + Math.random() * 9000000)}`,
          completedAt: new Date().toISOString().slice(0, 16)
        };
      }
      return o;
    }));
    setSelectedOrders([]);
    alert('Selected payouts approved and dispatched.');
  };

  const toggleSelectOrder = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter(i => i !== id));
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-display text-white">Payout Operations & Routing Queue</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Monitor real-time IMPS/UPI banking queues, approve pending bulk orders, and re-route failed orders.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleBatchApprove}
            disabled={selectedOrders.length === 0}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedOrders.length > 0 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20' 
                : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            Batch Approve ({selectedOrders.length})
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-bp-card border border-bp-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-white/[0.02] border-b border-bp-border font-medium text-white uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === orders.length}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedOrders(orders.map(o => o.id));
                      else setSelectedOrders([]);
                    }}
                    className="rounded accent-emerald-500 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-4">Channel & Destination</th>
                <th className="py-3 px-4">Beneficiary</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">UTR</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bp-border">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(o.id)}
                      onChange={() => toggleSelectOrder(o.id)}
                      className="rounded accent-emerald-500 cursor-pointer"
                    />
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-white">
                    {o.merchantOrderNo}
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-emerald-400 font-bold mr-1">
                      {o.transferMethod}
                    </span>
                    {o.upiId || o.accountNumber}
                  </td>
                  <td className="py-3 px-4 text-white font-medium">{o.beneficiaryName}</td>
                  <td className="py-3 px-4 font-mono font-bold text-white">₹{o.amount.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-gray-400">{o.utr || 'Queued in IMPS'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      o.status === 'completed' 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : o.status === 'processing' 
                        ? 'bg-blue-500/10 text-blue-400' 
                        : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {o.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {o.status !== 'completed' && (
                      <button
                        onClick={() => {
                          setOrders(orders.map(item => item.id === o.id ? { ...item, status: 'completed', utr: `62539${Math.floor(1000000 + Math.random() * 9000000)}` } : item));
                        }}
                        className="text-xs text-emerald-400 hover:underline font-semibold"
                      >
                        Force Complete
                      </button>
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
