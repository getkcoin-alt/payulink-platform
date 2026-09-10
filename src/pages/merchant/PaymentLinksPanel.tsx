import React, { useState } from 'react';
import { 
  Link2, 
  Plus, 
  Copy, 
  Check, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  X,
  Share2
} from 'lucide-react';
import { PaymentLink } from '../../types';
import { mockPaymentLinks } from '../../services/mockData';

export const PaymentLinksPanel: React.FC<{ mode?: 'active' | 'all' | 'generate' }> = ({ mode = 'all' }) => {
  const [links, setLinks] = useState<PaymentLink[]>(mockPaymentLinks);
  const [showCreateModal, setShowCreateModal] = useState(mode === 'generate');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');

  const handleCreateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !title) return;

    const token = `pl_${Math.random().toString(36).substring(2, 10)}`;
    const newLink: PaymentLink = {
      id: `pl_${Date.now()}`,
      linkToken: token,
      url: `https://payulink.io/pay/${token}`,
      title,
      description,
      amount: parseFloat(amount),
      customerEmail: customerEmail || undefined,
      customerMobile: customerMobile || undefined,
      status: 'active',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      expiresAt: new Date(Date.now() + 48 * 3600000).toISOString().replace('T', ' ').slice(0, 16)
    };

    setLinks([newLink, ...links]);
    setShowCreateModal(false);
    setTitle('');
    setDescription('');
    setAmount('');
    setCustomerEmail('');
    setCustomerMobile('');
  };

  const copyToClipboard = (url: string, token: string) => {
    navigator.clipboard.writeText(url);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const filteredLinks = mode === 'active' 
    ? links.filter(l => l.status === 'active')
    : links;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-display text-bp-text">Payment Links Engine</h1>
          <p className="text-xs text-bp-muted mt-0.5">
            Create branded checkout links with instant UPI and NetBanking payment collection.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-bp-accent text-white hover:bg-bp-accent-hover text-xs font-semibold shadow-lg shadow-orange-500/20 transition-all self-start"
        >
          <Plus className="w-3.5 h-3.5" />
          Create Payment Link
        </button>
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLinks.map((link) => (
          <div key={link.id} className="p-5 rounded-2xl bg-bp-card border border-bp-border space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="font-semibold text-sm text-bp-text block">{link.title}</span>
                <p className="text-xs text-bp-muted mt-0.5">{link.description || 'No description provided'}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                link.status === 'active' 
                  ? 'bg-emerald-500/10 text-emerald-400' 
                  : 'bg-white/5 text-bp-muted'
              }`}>
                {link.status.toUpperCase()}
              </span>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold font-mono text-bp-text">₹{link.amount.toLocaleString('en-IN')}</span>
              <span className="text-xs text-bp-muted font-mono">INR</span>
            </div>

            <div className="p-2.5 rounded-xl bg-bp-input border border-bp-border flex items-center justify-between gap-2 text-xs font-mono">
              <span className="truncate text-bp-muted">{link.url}</span>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => copyToClipboard(link.url, link.linkToken)}
                  className="p-1 rounded-lg hover:bg-white/5 text-bp-muted hover:text-bp-text"
                  title="Copy link"
                >
                  {copiedToken === link.linkToken ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 rounded-lg hover:bg-white/5 text-bp-muted hover:text-bp-text"
                  title="Open checkout page"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-bp-muted pt-2 border-t border-bp-border">
              <span>Created: {link.createdAt}</span>
              <span>Expires: {link.expiresAt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-bp-bg border border-bp-border rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-bp-border pb-3">
              <h3 className="font-bold text-base text-bp-text">Create Payment Link</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-bp-muted hover:text-bp-text">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateLink} className="space-y-4 text-xs">
              <div>
                <label className="block text-bp-muted mb-1 font-medium">Link Title / Purpose</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Invoice #1024 or Retainer Fee"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-bp-text focus:outline-none focus:border-bp-accent"
                />
              </div>

              <div>
                <label className="block text-bp-muted mb-1 font-medium">Description (Optional)</label>
                <input
                  type="text"
                  placeholder="Brief note for customer"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-bp-text focus:outline-none focus:border-bp-accent"
                />
              </div>

              <div>
                <label className="block text-bp-muted mb-1 font-medium">Amount (INR)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-bp-muted font-mono">₹</span>
                  <input
                    type="number"
                    min="1"
                    required
                    placeholder="1000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-bp-input border border-bp-border rounded-xl pl-8 pr-4 py-2 text-bp-text font-mono font-semibold text-sm focus:outline-none focus:border-bp-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-bp-muted mb-1 font-medium">Customer Email</label>
                  <input
                    type="email"
                    placeholder="client@mail.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-bp-text focus:outline-none focus:border-bp-accent"
                  />
                </div>
                <div>
                  <label className="block text-bp-muted mb-1 font-medium">Customer Mobile</label>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={customerMobile}
                    onChange={(e) => setCustomerMobile(e.target.value)}
                    className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-bp-text focus:outline-none focus:border-bp-accent"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-bp-accent text-white font-semibold hover:bg-bp-accent-hover transition-all shadow-lg shadow-orange-500/20 mt-2"
              >
                Generate & Copy Link
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
