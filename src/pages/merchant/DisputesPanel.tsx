import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Search, 
  FileText, 
  Upload, 
  CheckCircle2, 
  Clock, 
  Plus, 
  X 
} from 'lucide-react';
import { DisputeRecord } from '../../types';
import { mockDisputes } from '../../services/mockData';

export const DisputesPanel: React.FC = () => {
  const [disputes, setDisputes] = useState<DisputeRecord[]>(mockDisputes);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State
  const [orderId, setOrderId] = useState('');
  const [amount, setAmount] = useState('');
  const [customerUtr, setCustomerUtr] = useState('');
  const [reason, setReason] = useState<'UTR_MISMATCH' | 'PAYER_NOT_CREDITED' | 'FRAUD_SUSPECT' | 'DUPLICATE_PAYMENT'>('UTR_MISMATCH');

  const handleCreateDispute = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: DisputeRecord = {
      id: `dsp_${Date.now()}`,
      ticketNo: `TICK-${Math.floor(100 + Math.random() * 900)}`,
      orderId,
      merchantCode: 'M_DELTAPAY',
      amount: parseFloat(amount),
      reason,
      customerUtr,
      status: 'open',
      openedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    setDisputes([newRecord, ...disputes]);
    setShowCreateModal(false);
    setOrderId('');
    setAmount('');
    setCustomerUtr('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-display text-bp-text">Disputes & Claims Desk</h1>
          <p className="text-xs text-bp-muted mt-0.5">
            Resolve customer UTR mismatches, chargeback tickets, and double credit inquiries.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-bp-accent text-white hover:bg-bp-accent-hover text-xs font-semibold shadow-lg shadow-orange-500/20 transition-all self-start"
        >
          <Plus className="w-3.5 h-3.5" />
          Open Dispute Ticket
        </button>
      </div>

      {/* Disputes Table */}
      <div className="rounded-2xl bg-bp-card border border-bp-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-bp-muted">
            <thead className="bg-white/[0.02] border-b border-bp-border font-medium text-bp-text uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Ticket No</th>
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-4">Claimed Reason</th>
                <th className="py-3 px-4">Disputed Amount</th>
                <th className="py-3 px-4">Customer UTR vs Bank UTR</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Opened Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bp-border">
              {disputes.map((d) => (
                <tr key={d.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-bp-text">{d.ticketNo}</td>
                  <td className="py-3.5 px-4 font-mono text-bp-accent">{d.orderId}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-400 font-semibold">
                      {d.reason.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-bp-text">
                    ₹{d.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px]">
                    <div>Cust: {d.customerUtr || 'N/A'}</div>
                    <div className="text-bp-muted">Bank: {d.bankUtr || 'Awaiting bank feed'}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400">
                      {d.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-bp-muted">{d.openedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-bp-bg border border-bp-border rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-bp-border pb-3">
              <h3 className="font-bold text-base text-bp-text">Raise Dispute Ticket</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-bp-muted hover:text-bp-text">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDispute} className="space-y-4 text-xs">
              <div>
                <label className="block text-bp-muted mb-1 font-medium">Order Number / Reference</label>
                <input
                  type="text"
                  required
                  placeholder="ORD-OUT-9916"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-bp-text font-mono focus:outline-none focus:border-bp-accent"
                />
              </div>

              <div>
                <label className="block text-bp-muted mb-1 font-medium">Claim Reason</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value as any)}
                  className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-bp-text focus:outline-none focus:border-bp-accent"
                >
                  <option value="UTR_MISMATCH">Customer UTR Mismatch</option>
                  <option value="PAYER_NOT_CREDITED">Payer Not Credited by Beneficiary Bank</option>
                  <option value="DUPLICATE_PAYMENT">Duplicate Debit on Payer Account</option>
                  <option value="FRAUD_SUSPECT">Suspected Fraudulent Attempt</option>
                </select>
              </div>

              <div>
                <label className="block text-bp-muted mb-1 font-medium">Disputed Amount (INR)</label>
                <input
                  type="number"
                  required
                  placeholder="5000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-bp-text font-mono focus:outline-none focus:border-bp-accent"
                />
              </div>

              <div>
                <label className="block text-bp-muted mb-1 font-medium">Customer Reported UTR</label>
                <input
                  type="text"
                  placeholder="e.g. 625391029412"
                  value={customerUtr}
                  onChange={(e) => setCustomerUtr(e.target.value)}
                  className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-bp-text font-mono focus:outline-none focus:border-bp-accent"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-bp-accent text-white font-semibold hover:bg-bp-accent-hover transition-all shadow-lg shadow-orange-500/20 mt-2"
              >
                Submit Ticket to Compliance
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
