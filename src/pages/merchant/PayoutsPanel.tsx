import React, { useState } from 'react';
import { 
  Send, 
  Building2, 
  Upload, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Download, 
  FileSpreadsheet,
  X,
  Copy,
  Check
} from 'lucide-react';
import { PayoutOrder } from '../../types';
import { mockPayoutOrders } from '../../services/mockData';

interface PayoutsPanelProps {
  initialMethod?: 'UPI' | 'BANK' | 'SPECIAL';
  title?: string;
}

export const PayoutsPanel: React.FC<PayoutsPanelProps> = ({ 
  initialMethod = 'UPI',
  title = 'Payouts & Disbursements'
}) => {
  const [orders, setOrders] = useState<PayoutOrder[]>(mockPayoutOrders);
  const [method, setMethod] = useState<'UPI' | 'BANK' | 'SPECIAL'>(initialMethod);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Single Form State
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [amount, setAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [copiedUtr, setCopiedUtr] = useState<string | null>(null);

  // Bulk CSV sample input
  const [csvText, setCsvText] = useState(
`ORD-BATCH-101,Rohan Kumar,15000,rohan@okhdfcbank,,
ORD-BATCH-102,Deepa Nair,45000,,5010099887766,HDFC0000050
ORD-BATCH-103,Amit Shah,8200,amit.shah@paytm,,`
  );

  const handleCreateSingle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !beneficiaryName) return;

    const newOrder: PayoutOrder = {
      id: `po_${Date.now()}`,
      merchantOrderNo: `ORD-OUT-${Math.floor(1000 + Math.random() * 9000)}`,
      orderRef: `REF_${Math.floor(1000000 + Math.random() * 9000000)}`,
      amount: parseFloat(amount),
      fee: parseFloat(amount) * 0.001,
      transferMethod: method,
      beneficiaryName,
      upiId: method === 'UPI' ? upiId : undefined,
      accountNumber: method === 'BANK' ? accountNumber : undefined,
      ifscCode: method === 'BANK' ? ifscCode : undefined,
      status: 'completed',
      utr: `62539${Math.floor(1000000 + Math.random() * 9000000)}`,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      completedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    setOrders([newOrder, ...orders]);
    setShowCreateModal(false);
    // Reset form
    setBeneficiaryName('');
    setAmount('');
    setUpiId('');
    setAccountNumber('');
    setIfscCode('');
  };

  const handleBulkUpload = () => {
    const lines = csvText.trim().split('\n');
    const newOrders: PayoutOrder[] = lines.map((line, idx) => {
      const [ordNo, name, amt, upi, acc, ifsc] = line.split(',');
      const isBank = Boolean(acc && acc.trim());
      return {
        id: `po_bulk_${Date.now()}_${idx}`,
        merchantOrderNo: ordNo.trim(),
        orderRef: `REF_${Math.floor(1000000 + Math.random() * 9000000)}`,
        amount: parseFloat(amt.trim()),
        fee: parseFloat(amt.trim()) * 0.001,
        transferMethod: isBank ? 'BANK' : 'UPI',
        beneficiaryName: name.trim(),
        upiId: !isBank ? upi.trim() : undefined,
        accountNumber: isBank ? acc.trim() : undefined,
        ifscCode: isBank ? ifsc.trim() : undefined,
        status: 'completed',
        utr: `62539${Math.floor(1000000 + Math.random() * 9000000)}`,
        createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        completedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
      };
    });

    setOrders([...newOrders, ...orders]);
    setShowBulkModal(false);
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      o.merchantOrderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.beneficiaryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.utr && o.utr.includes(searchQuery));
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUtr(text);
    setTimeout(() => setCopiedUtr(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-display text-bp-text">{title}</h1>
          <p className="text-xs text-bp-muted mt-0.5">
            Execute single or bulk disbursements directly to customer UPI VPAs and Bank Accounts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowBulkModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-bp-card border border-bp-border hover:bg-white/[0.08] text-bp-text text-xs font-medium transition-all"
          >
            <Upload className="w-3.5 h-3.5 text-purple-400" />
            Bulk CSV Upload
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-bp-accent text-white hover:bg-bp-accent-hover text-xs font-semibold shadow-lg shadow-orange-500/20 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            New Payout
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-bp-card border border-bp-border flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bp-muted" />
          <input
            type="text"
            placeholder="Search by Order No, Name, UTR..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bp-input border border-bp-border text-bp-text placeholder-bp-muted rounded-xl pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:border-bp-accent"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-bp-input border border-bp-border text-bp-text rounded-xl px-3 py-1.5 text-xs focus:outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="pending">Pending</option>
            <option value="disputed">Disputed</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-bp-card border border-bp-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-bp-muted">
            <thead className="bg-white/[0.02] border-b border-bp-border font-medium text-bp-text uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Order Details</th>
                <th className="py-3.5 px-4">Method & Destination</th>
                <th className="py-3.5 px-4">Beneficiary</th>
                <th className="py-3.5 px-4">Amount & Fee</th>
                <th className="py-3.5 px-4">Status & UTR</th>
                <th className="py-3.5 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bp-border">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-semibold text-bp-text block">{order.merchantOrderNo}</span>
                    <span className="text-[10px] text-bp-muted font-mono">{order.orderRef}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                      order.transferMethod === 'UPI' 
                        ? 'bg-blue-500/10 text-blue-400' 
                        : 'bg-purple-500/10 text-purple-400'
                    }`}>
                      {order.transferMethod}
                    </span>
                    <span className="text-bp-text block text-[11px] mt-0.5 font-mono">
                      {order.upiId || `${order.accountNumber} (${order.ifscCode})`}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-bp-text font-medium">
                    {order.beneficiaryName}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-bp-text text-sm block">₹{order.amount.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-bp-muted font-mono">Fee: ₹{order.fee.toFixed(2)}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      order.status === 'completed'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : order.status === 'processing'
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {order.status.toUpperCase()}
                    </span>
                    {order.utr && (
                      <div className="flex items-center gap-1 mt-1 text-[11px] font-mono text-bp-muted">
                        <span>UTR: {order.utr}</span>
                        <button 
                          onClick={() => copyToClipboard(order.utr!)}
                          className="hover:text-bp-text"
                          title="Copy UTR"
                        >
                          {copiedUtr === order.utr ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-bp-muted">
                    {order.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Single Payout Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-bp-bg border border-bp-border rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-bp-border pb-3">
              <h3 className="font-bold text-base text-bp-text">Initiate Single Payout</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-bp-muted hover:text-bp-text">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSingle} className="space-y-4 text-xs">
              <div>
                <label className="block text-bp-muted mb-1 font-medium">Transfer Channel</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMethod('UPI')}
                    className={`py-2 rounded-xl font-medium border ${
                      method === 'UPI' 
                        ? 'border-bp-accent bg-bp-accent/10 text-bp-accent' 
                        : 'border-bp-border bg-bp-input text-bp-muted'
                    }`}
                  >
                    UPI Transfer (Instant)
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod('BANK')}
                    className={`py-2 rounded-xl font-medium border ${
                      method === 'BANK' 
                        ? 'border-bp-accent bg-bp-accent/10 text-bp-accent' 
                        : 'border-bp-border bg-bp-input text-bp-muted'
                    }`}
                  >
                    Bank IMPS / NEFT
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-bp-muted mb-1 font-medium">Beneficiary Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={beneficiaryName}
                  onChange={(e) => setBeneficiaryName(e.target.value)}
                  className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-bp-text focus:outline-none focus:border-bp-accent"
                />
              </div>

              {method === 'UPI' ? (
                <div>
                  <label className="block text-bp-muted mb-1 font-medium">UPI VPA Address</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. rahul@okaxis"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-bp-text focus:outline-none focus:border-bp-accent font-mono"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-bp-muted mb-1 font-medium">Bank Account Number</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 50100239182736"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-bp-text focus:outline-none focus:border-bp-accent font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-bp-muted mb-1 font-medium">IFSC Code</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. HDFC0000128"
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value)}
                      className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-bp-text focus:outline-none focus:border-bp-accent font-mono uppercase"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-bp-muted mb-1 font-medium">Disbursement Amount (INR)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-bp-muted font-mono">₹</span>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    required
                    placeholder="5000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-bp-input border border-bp-border rounded-xl pl-8 pr-4 py-2 text-bp-text focus:outline-none focus:border-bp-accent font-mono font-semibold"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-bp-accent text-white font-semibold shadow-lg shadow-orange-500/20 hover:bg-bp-accent-hover transition-all mt-4"
              >
                Confirm & Dispatch Payout
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Bulk CSV Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-bp-bg border border-bp-border rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-bp-border pb-3">
              <h3 className="font-bold text-base text-bp-text flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-purple-400" />
                Batch CSV Payout Dispatch
              </h3>
              <button onClick={() => setShowBulkModal(false)} className="text-bp-muted hover:text-bp-text">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-bp-muted">
                Format: <code className="bg-white/5 px-1 py-0.5 rounded font-mono text-bp-accent">orderNo, name, amount, upiId, accNo, ifsc</code>
              </p>

              <textarea
                rows={6}
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                className="w-full bg-bp-input border border-bp-border rounded-xl p-3 text-bp-text font-mono text-xs focus:outline-none focus:border-bp-accent"
              />

              <div className="flex items-center justify-between pt-2">
                <span className="text-bp-muted font-mono">
                  {csvText.trim().split('\n').length} orders detected
                </span>
                <button
                  onClick={handleBulkUpload}
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/20"
                >
                  Process Bulk Batch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
