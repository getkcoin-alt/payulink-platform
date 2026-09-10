import React, { useState } from 'react';
import { 
  QrCode, 
  Building2, 
  Download, 
  CheckCircle2, 
  Clock, 
  Copy, 
  Check, 
  Search, 
  Zap, 
  Share2,
  RefreshCw
} from 'lucide-react';
import { ReceiveOrder } from '../../types';
import { mockReceiveOrders } from '../../services/mockData';
import { useAuth } from '../../context/AuthContext';

interface ReceivePanelProps {
  paymentMethod?: 'UPI' | 'BANK';
  title?: string;
}

export const ReceivePanel: React.FC<ReceivePanelProps> = ({
  paymentMethod = 'UPI',
  title = 'Collections & PayIn'
}) => {
  const { currentMerchant, updateMerchant } = useAuth();
  const [orders, setOrders] = useState<ReceiveOrder[]>(mockReceiveOrders);
  const [activeTab, setActiveTab] = useState<'UPI' | 'BANK'>(paymentMethod);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Dynamic QR simulation
  const [simAmount, setSimAmount] = useState('2500');
  const [simCustomer, setSimCustomer] = useState('Kavita Verma');

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSimulatePayment = () => {
    const amt = parseFloat(simAmount) || 1000;
    const newOrder: ReceiveOrder = {
      id: `ro_${Date.now()}`,
      merchantOrderNo: `REC-IN-${Math.floor(1000 + Math.random() * 9000)}`,
      amount: amt,
      paymentMethod: activeTab,
      customerName: simCustomer,
      payerUpiId: activeTab === 'UPI' ? `${simCustomer.toLowerCase().replace(' ', '')}@okaxis` : undefined,
      targetVpa: activeTab === 'UPI' ? 'payu.deltapay@icici' : 'VA-DELTAPAY-091',
      utr: `625390${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'completed',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      expiryTime: new Date(Date.now() + 15 * 60000).toISOString().replace('T', ' ').slice(0, 16)
    };

    setOrders([newOrder, ...orders]);
    // update merchant balance
    updateMerchant({ balanceInr: currentMerchant.balanceInr + amt });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-display text-bp-text">{title}</h1>
          <p className="text-xs text-bp-muted mt-0.5">
            Accept instant payments from customers via dynamic UPI QR codes and dedicated virtual bank accounts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('UPI')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'UPI' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'bg-bp-card border border-bp-border text-bp-muted hover:text-bp-text'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            UPI Dynamic QR
          </button>
          <button
            onClick={() => setActiveTab('BANK')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'BANK' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'bg-bp-card border border-bp-border text-bp-muted hover:text-bp-text'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Virtual Bank Account
          </button>
        </div>
      </div>

      {/* Collection Generator Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Details / Live Simulator */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-bp-card border border-bp-border space-y-4">
          <h2 className="font-semibold text-sm text-bp-text flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-400" />
            {activeTab === 'UPI' ? 'Live Dynamic UPI QR Collection' : 'Virtual Bank Account Details'}
          </h2>

          {activeTab === 'UPI' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-bp-muted block mb-1">Target Merchant VPA</label>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-bp-input border border-bp-border font-mono text-bp-text">
                    <span>payu.deltapay@icici</span>
                    <button
                      onClick={() => copyToClipboard('payu.deltapay@icici', 'vpa')}
                      className="text-bp-muted hover:text-bp-text"
                    >
                      {copiedField === 'vpa' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-bp-muted block mb-1">Collection Amount (INR)</label>
                  <input
                    type="number"
                    value={simAmount}
                    onChange={(e) => setSimAmount(e.target.value)}
                    className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-bp-text font-mono font-semibold text-sm focus:outline-none focus:border-bp-accent"
                  />
                </div>

                <div>
                  <label className="text-bp-muted block mb-1">Customer Name / Reference</label>
                  <input
                    type="text"
                    value={simCustomer}
                    onChange={(e) => setSimCustomer(e.target.value)}
                    className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-bp-text focus:outline-none focus:border-bp-accent"
                  />
                </div>

                <button
                  onClick={handleSimulatePayment}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  <Zap className="w-3.5 h-3.5" />
                  Simulate Inward Customer Payment
                </button>
              </div>

              {/* QR Display */}
              <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-bp-border space-y-3">
                <div className="p-3 bg-white rounded-2xl shadow-xl">
                  {/* Stylized QR representation */}
                  <div className="w-40 h-40 bg-gray-950 rounded-xl p-3 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div className="w-10 h-10 border-4 border-orange-500 rounded-lg" />
                      <div className="w-10 h-10 border-4 border-orange-500 rounded-lg" />
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="font-bold text-[10px] tracking-wider text-orange-400 font-mono">PAYULINK</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-10 h-10 border-4 border-orange-500 rounded-lg" />
                      <div className="w-4 h-4 bg-orange-500 rounded-sm self-end" />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <span className="font-mono font-bold text-base text-bp-text">₹{parseFloat(simAmount || '0').toLocaleString('en-IN')}</span>
                  <p className="text-[10px] text-bp-muted">Scan with GPay, PhonePe, Paytm, BHIM</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-bp-input border border-bp-border">
                  <span className="text-bp-muted text-[10px] block">Virtual Account Number</span>
                  <span className="font-mono font-bold text-bp-text text-sm">VA99102837465012</span>
                </div>
                <div className="p-3 rounded-xl bg-bp-input border border-bp-border">
                  <span className="text-bp-muted text-[10px] block">Bank Name & IFSC</span>
                  <span className="font-mono font-bold text-bp-text text-sm">ICICI Bank • ICIC0000104</span>
                </div>
                <div className="p-3 rounded-xl bg-bp-input border border-bp-border">
                  <span className="text-bp-muted text-[10px] block">Account Holder Name</span>
                  <span className="font-mono font-bold text-bp-text text-sm">PAYULINK / {currentMerchant.merchantName}</span>
                </div>
                <div className="p-3 rounded-xl bg-bp-input border border-bp-border">
                  <span className="text-bp-muted text-[10px] block">Transfer Types Supported</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">IMPS, NEFT, RTGS (24x7)</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSimulatePayment}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-lg shadow-blue-500/20"
                >
                  Simulate Inward Bank Transfer
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Instant Stats */}
        <div className="p-6 rounded-2xl bg-bp-card border border-bp-border space-y-4 text-xs">
          <h3 className="font-semibold text-bp-text">Collections Health</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-bp-border">
              <span className="text-bp-muted">Total Collections Today</span>
              <span className="font-mono font-bold text-bp-text">
                ₹{orders.reduce((a, b) => a + b.amount, 0).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-bp-border">
              <span className="text-bp-muted">Total Completed</span>
              <span className="font-mono font-semibold text-emerald-400">
                {orders.filter(o => o.status === 'completed').length} Orders
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-bp-border">
              <span className="text-bp-muted">Instant Auto-Pooling</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400">
                ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-bp-card border border-bp-border overflow-hidden">
        <div className="p-4 border-b border-bp-border flex items-center justify-between">
          <h3 className="font-semibold text-xs text-bp-text">Inward Transactions Journal</h3>
          <span className="text-[11px] text-bp-muted font-mono">{orders.length} transactions recorded</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-bp-muted">
            <thead className="bg-white/[0.02] border-b border-bp-border font-medium text-bp-text uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">UTR</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bp-border">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-bp-text">{o.merchantOrderNo}</td>
                  <td className="py-3 px-4 text-bp-text">{o.customerName}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 font-semibold">
                      {o.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400">+₹{o.amount.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4 font-mono text-[11px]">{o.utr || 'Pending verification'}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400">
                      {o.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-bp-muted">{o.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
