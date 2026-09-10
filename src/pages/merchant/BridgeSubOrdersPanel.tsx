import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  RotateCcw, 
  ExternalLink, 
  Copy, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  UploadCloud,
  FileCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface BridgeSubOrder {
  id: string;
  chunkPaymentId: string;
  orderId: string;
  merchantOrderId: string;
  payerUpi: string;
  receiverUpi: string;
  amount: number;
  status: 'Completed' | 'Soft Expired' | 'Verified' | 'Created' | 'On Hold' | 'Processing';
  utr?: string;
  createdAt: string;
}

export const BridgeSubOrdersPanel: React.FC = () => {
  const { currentMerchant } = useAuth();
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const subOrders: BridgeSubOrder[] = [
    {
      id: 'sub_01',
      chunkPaymentId: 'CHK-9912-A1',
      orderId: 'ORD-PL-100291',
      merchantOrderId: 'MZ-DEP-8819',
      payerUpi: 'payer.kumar@okhdfcbank',
      receiverUpi: 'payulink.pool@icici',
      amount: 103,
      status: 'Completed',
      utr: '625410982341',
      createdAt: '2026-09-09 18:24:10'
    },
    {
      id: 'sub_02',
      chunkPaymentId: 'CHK-9912-A2',
      orderId: 'ORD-PL-100292',
      merchantOrderId: 'MZ-DEP-8820',
      payerUpi: 'rahul.s@axisbank',
      receiverUpi: 'payulink.pool@icici',
      amount: 103,
      status: 'Completed',
      utr: '625410982342',
      createdAt: '2026-09-09 19:10:04'
    },
    {
      id: 'sub_03',
      chunkPaymentId: 'CHK-9913-B1',
      orderId: 'ORD-PL-100293',
      merchantOrderId: 'MZ-DEP-8821',
      payerUpi: 'vikram.v@paytm',
      receiverUpi: 'payulink.pool@icici',
      amount: 101,
      status: 'Soft Expired',
      createdAt: '2026-09-10 11:15:30'
    },
    {
      id: 'sub_04',
      chunkPaymentId: 'CHK-9913-B2',
      orderId: 'ORD-PL-100294',
      merchantOrderId: 'MZ-DEP-8822',
      payerUpi: 'ananya.p@sbi',
      receiverUpi: 'payulink.pool@icici',
      amount: 250,
      status: 'Soft Expired',
      createdAt: '2026-09-09 14:02:18'
    },
    {
      id: 'sub_05',
      chunkPaymentId: 'CHK-9914-C1',
      orderId: 'ORD-PL-100295',
      merchantOrderId: 'MZ-DEP-8823',
      payerUpi: 'priya.sharma@kotak',
      receiverUpi: 'payulink.pool@icici',
      amount: 500,
      status: 'Soft Expired',
      createdAt: '2026-09-09 15:30:22'
    },
    {
      id: 'sub_06',
      chunkPaymentId: 'CHK-9914-C2',
      orderId: 'ORD-PL-100296',
      merchantOrderId: 'MZ-DEP-8824',
      payerUpi: 'dev.k@ybl',
      receiverUpi: 'payulink.pool@icici',
      amount: 400,
      status: 'Soft Expired',
      createdAt: '2026-09-09 16:45:00'
    },
    {
      id: 'sub_07',
      chunkPaymentId: 'CHK-9915-D1',
      orderId: 'ORD-PL-100297',
      merchantOrderId: 'MZ-DEP-8825',
      payerUpi: 'manish.t@idbi',
      receiverUpi: 'payulink.pool@icici',
      amount: 150,
      status: 'Soft Expired',
      createdAt: '2026-09-09 17:12:44'
    },
    {
      id: 'sub_08',
      chunkPaymentId: 'CHK-9915-D2',
      orderId: 'ORD-PL-100298',
      merchantOrderId: 'MZ-DEP-8826',
      payerUpi: 'deepak.c@pnb',
      receiverUpi: 'payulink.pool@icici',
      amount: 100,
      status: 'Soft Expired',
      createdAt: '2026-09-09 18:05:11'
    },
    {
      id: 'sub_09',
      chunkPaymentId: 'CHK-9916-E1',
      orderId: 'ORD-PL-100299',
      merchantOrderId: 'MZ-DEP-8827',
      payerUpi: 'sunita.g@barodampay',
      receiverUpi: 'payulink.pool@icici',
      amount: 110,
      status: 'Soft Expired',
      createdAt: '2026-09-09 19:33:55'
    },
    {
      id: 'sub_10',
      chunkPaymentId: 'CHK-9916-E2',
      orderId: 'ORD-PL-100300',
      merchantOrderId: 'MZ-DEP-8828',
      payerUpi: 'karan.m@indus',
      receiverUpi: 'payulink.pool@icici',
      amount: 100,
      status: 'Soft Expired',
      createdAt: '2026-09-09 20:10:14'
    },
    {
      id: 'sub_11',
      chunkPaymentId: 'CHK-9917-F1',
      orderId: 'ORD-PL-100301',
      merchantOrderId: 'MZ-DEP-8829',
      payerUpi: 'rohit.b@okicici',
      receiverUpi: 'payulink.pool@icici',
      amount: 100,
      status: 'Soft Expired',
      createdAt: '2026-09-09 21:00:00'
    }
  ];

  const statuses = [
    'All',
    'Created',
    'Link Released',
    'Amount Mismatch',
    'Verified',
    'Completed',
    'On Hold',
    'Soft Expired',
    'Frozen',
    'Failed',
    'Cancelled'
  ];

  const filteredOrders = subOrders.filter(order => {
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    const matchesSearch = 
      order.chunkPaymentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.merchantOrderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.payerUpi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold font-display text-bp-text">Pay UPI Orders</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
              BRIDGE POOL
            </span>
          </div>
          <p className="text-xs text-bp-muted mt-0.5">
            Track your claimed bridge pool chunks and submit payment proof
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => { setStatusFilter('All'); setSearchQuery(''); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-bp-muted hover:text-bp-text text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            onClick={() => alert('Exporting sub-orders CSV...')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs shadow-lg shadow-orange-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* Merchant Identifier Bar */}
      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-bp-muted font-sans text-xs">MERCHANT:</span>
          <span className="font-bold text-bp-text">{currentMerchant.merchantName}</span>
          <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 font-mono text-[11px] border border-orange-500/20">
            {currentMerchant.merchantCode}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div>
            <span className="text-bp-muted block text-[10px]">TOTAL CHUNKS</span>
            <span className="font-bold text-bp-text">11</span>
          </div>
          <div>
            <span className="text-bp-muted block text-[10px]">COMPLETED</span>
            <span className="font-bold text-emerald-400">2 (₹206)</span>
          </div>
          <div>
            <span className="text-bp-muted block text-[10px]">CLAIMED VOLUME</span>
            <span className="font-bold text-orange-400">₹1,917</span>
          </div>
          <div>
            <span className="text-bp-muted block text-[10px]">AVAILABLE BALANCE</span>
            <span className="font-bold text-emerald-400">₹206</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              statusFilter === status
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'bg-white/[0.02] hover:bg-white/[0.05] text-bp-muted hover:text-bp-text border border-white/[0.06]'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-bp-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Chunk ID, Order ID, Merchant Order ID, or UPI ID..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bp-card border border-bp-border text-xs text-bp-text placeholder-bp-muted focus:outline-none focus:border-orange-500"
        />
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-bp-card border border-white/[0.08] shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.03] border-b border-white/[0.06] text-[11px] font-mono text-bp-muted uppercase">
              <tr>
                <th className="py-3 px-4">CHUNK PAYMENT ID</th>
                <th className="py-3 px-4">ORDER ID</th>
                <th className="py-3 px-4">MERCHANT ORDER ID</th>
                <th className="py-3 px-4">PAYER UPI</th>
                <th className="py-3 px-4">RECEIVER UPI</th>
                <th className="py-3 px-4">AMOUNT</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">UTR & ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-bp-muted">
                    No sub-orders found matching the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-orange-400">
                      <div className="flex items-center gap-1.5">
                        <span>{order.chunkPaymentId}</span>
                        <button
                          onClick={() => handleCopy(order.chunkPaymentId, order.id + '-chunk')}
                          className="text-bp-muted hover:text-bp-text"
                          title="Copy Chunk ID"
                        >
                          {copiedId === order.id + '-chunk' ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-bp-text">
                      {order.orderId}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-bp-muted">
                      {order.merchantOrderId}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-bp-text">
                      {order.payerUpi}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-bp-muted">
                      {order.receiverUpi}
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-bp-text">
                      ₹{order.amount}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                          order.status === 'Completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : order.status === 'Soft Expired'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {order.utr ? (
                        <div className="flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>UTR: {order.utr}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => alert(`Submit payment UTR for ${order.chunkPaymentId}`)}
                          className="px-2.5 py-1 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 text-orange-400 text-[11px] font-semibold transition-colors"
                        >
                          Submit UTR
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
