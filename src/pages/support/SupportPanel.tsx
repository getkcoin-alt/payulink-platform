import React, { useState } from 'react';
import { 
  LifeBuoy, 
  Search, 
  RotateCw, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  User, 
  ExternalLink, 
  Send, 
  ShieldCheck, 
  MessageSquare,
  FileCheck2,
  XCircle
} from 'lucide-react';

interface SupportTicket {
  id: string;
  ticketNo: string;
  category: 'UTR_MISMATCH' | 'EXPIRED_CHUNK' | 'BANK_TIMEOUT' | 'KYC_REQUEST';
  merchantCode: string;
  merchantName: string;
  orderId: string;
  amount: number;
  submittedUtr: string;
  bankStatus: string;
  openedAt: string;
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED' | 'REJECTED';
}

export const SupportPanel: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'tic_01',
      ticketNo: 'TKT-2026-9012',
      category: 'UTR_MISMATCH',
      merchantCode: 'M-FD055F93',
      merchantName: 'Mazer Infotech Pvt Ltd',
      orderId: 'ORD-PL-100293',
      amount: 101,
      submittedUtr: '625410982343',
      bankStatus: 'Credit Confirmed (₹101 on ICICI Pool)',
      openedAt: '10 mins ago',
      status: 'OPEN'
    },
    {
      id: 'tic_02',
      ticketNo: 'TKT-2026-9013',
      category: 'EXPIRED_CHUNK',
      merchantCode: 'M_DELTAPAY',
      merchantName: 'DeltaPay FinTech Pvt Ltd',
      orderId: 'ORD-PL-100244',
      amount: 2500,
      submittedUtr: '625410982991',
      bankStatus: 'Soft Expired in matching queue',
      openedAt: '25 mins ago',
      status: 'INVESTIGATING'
    },
    {
      id: 'tic_03',
      ticketNo: 'TKT-2026-9014',
      category: 'BANK_TIMEOUT',
      merchantCode: 'M_CRYPTOHUB',
      merchantName: 'Bharat Web3 Collections',
      orderId: 'ORD-PL-100188',
      amount: 15000,
      submittedUtr: 'PENDING_BANK_ACK',
      bankStatus: 'HDFC IMPS Gateway Delayed',
      openedAt: '1 hour ago',
      status: 'OPEN'
    }
  ]);

  const handleResolveTicket = (id: string) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: 'RESOLVED' } : t));
    alert(`Ticket ${id} resolved! Balance credited to merchant and UTR verified.`);
    setSelectedTicket(null);
  };

  const handleRejectTicket = (id: string) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: 'REJECTED' } : t));
    alert(`Ticket ${id} marked rejected. Fraud flag registered.`);
    setSelectedTicket(null);
  };

  const filtered = tickets.filter(t => {
    const matchesCat = filterCategory === 'ALL' || t.category === filterCategory;
    const matchesQuery = 
      t.ticketNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.merchantCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.submittedUtr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#070b12] text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#070b12]/90 backdrop-blur-xl px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg shadow-sky-500/20"
            style={{ background: 'linear-gradient(135deg, #38BDF8, #0EA5E9)' }}
          >
            <LifeBuoy className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight text-white">PayuLink Support</h1>
            <p className="text-[10px] text-gray-500 leading-tight">Support & Settlement Arbitration Desk</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Agent: <strong>Support Specialist #44</strong></span>
          </div>
          <a
            href="/merchant/dashboard"
            className="px-3 py-1.5 rounded-lg text-xs bg-white/[0.05] border border-white/10 text-gray-300 hover:bg-white/[0.1] transition-colors"
          >
            Switch to Merchant
          </a>
        </div>
      </header>

      {/* Main Support Area */}
      <main className="max-w-7xl mx-auto p-6 pb-28 space-y-6">
        {/* Metric Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] shadow-lg">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Open Tickets</span>
            <span className="text-2xl font-bold font-mono text-sky-400 mt-1 block">
              {tickets.filter(t => t.status === 'OPEN').length}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] shadow-lg">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Investigating</span>
            <span className="text-2xl font-bold font-mono text-amber-400 mt-1 block">
              {tickets.filter(t => t.status === 'INVESTIGATING').length}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] shadow-lg">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Resolved Today</span>
            <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
              42
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] shadow-lg">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Avg Resolution</span>
            <span className="text-2xl font-bold font-mono text-white mt-1 block">
              4.2 mins
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {['ALL', 'UTR_MISMATCH', 'EXPIRED_CHUNK', 'BANK_TIMEOUT'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  filterCategory === cat
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20 font-semibold'
                    : 'bg-white/[0.02] text-gray-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Ticket, Order, or UTR..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Tickets Queue Table */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-lg overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.02] border-b border-white/[0.06] font-mono text-[10px] text-gray-400 uppercase">
              <tr>
                <th className="py-3 px-4">TICKET NO</th>
                <th className="py-3 px-4">CATEGORY</th>
                <th className="py-3 px-4">MERCHANT</th>
                <th className="py-3 px-4">ORDER ID</th>
                <th className="py-3 px-4">AMOUNT</th>
                <th className="py-3 px-4">SUBMITTED UTR</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-white/[0.01] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-sky-400">{ticket.ticketNo}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-gray-300">
                      {ticket.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-white block">{ticket.merchantName}</span>
                    <span className="font-mono text-[10px] text-orange-400">{ticket.merchantCode}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-gray-300">{ticket.orderId}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-white">₹{ticket.amount}</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400">{ticket.submittedUtr}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      ticket.status === 'RESOLVED'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : ticket.status === 'REJECTED'
                        ? 'bg-red-500/10 text-red-400 border-red-500/20'
                        : 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      className="px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 text-sky-400 font-semibold text-xs transition-colors"
                    >
                      Arbitrate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Arbitration Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#0b101c] border border-white/[0.1] shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div>
                <h3 className="text-sm font-bold text-white">Arbitration: {selectedTicket.ticketNo}</h3>
                <span className="text-[11px] font-mono text-gray-400">Order: {selectedTicket.orderId}</span>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 font-mono">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <span className="text-[10px] text-gray-400 block font-sans">MERCHANT DETAILS</span>
                <span className="text-white font-bold block">{selectedTicket.merchantName} ({selectedTicket.merchantCode})</span>
                <span className="text-emerald-400 text-sm font-bold block">Disputed Amount: ₹{selectedTicket.amount}</span>
              </div>

              <div className="p-3 rounded-xl bg-sky-500/5 border border-sky-500/20 space-y-1">
                <span className="text-[10px] text-sky-400 block font-sans font-bold">BANK LEDGER VERIFICATION</span>
                <p className="text-white text-xs">{selectedTicket.bankStatus}</p>
                <p className="text-gray-400 text-[11px]">UTR: {selectedTicket.submittedUtr}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
              <button
                onClick={() => handleResolveTicket(selectedTicket.id)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20"
              >
                Force Credit & Resolve
              </button>
              <button
                onClick={() => handleRejectTicket(selectedTicket.id)}
                className="py-2.5 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 font-bold text-xs"
              >
                Reject Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
