import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  ThumbsUp, 
  Cpu, 
  ShieldCheck, 
  Network, 
  Database, 
  Layers, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Filter,
  Sparkles
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';

interface DiscussionComment {
  id: string;
  author: string;
  role: 'Core Architect' | 'Liquidity Partner' | 'Merchant Integrator' | 'Security Auditor';
  avatarColor: string;
  topic: 'Matching Engine' | 'Token Economics' | 'UPI Health' | 'Dispute SLA';
  timestamp: string;
  content: string;
  likes: number;
  hasLiked?: boolean;
}

export const DiscussPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rfc' | 'architecture' | 'database' | 'comments'>('rfc');
  const [selectedTopic, setSelectedTopic] = useState<string>('ALL');
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('Mazer Infotech Lead');
  const [userRole, setUserRole] = useState<'Core Architect' | 'Liquidity Partner' | 'Merchant Integrator' | 'Security Auditor'>('Merchant Integrator');

  const [comments, setComments] = useState<DiscussionComment[]>([
    {
      id: 'c1',
      author: 'Aria Chen',
      role: 'Core Architect',
      avatarColor: 'from-blue-500 to-indigo-600',
      topic: 'Matching Engine',
      timestamp: '2 hours ago',
      content: 'In v2.4, we reduced chunk matching latency from 1.2s to 180ms by sharding UPI pool locks by bank IFSC prefixes. Large withdrawal requests (> ₹100,000) are now chunked concurrently across top-tier merchants like Mazer Infotech.',
      likes: 18,
      hasLiked: true
    },
    {
      id: 'c2',
      author: 'Vikram Malhotra',
      role: 'Liquidity Partner',
      avatarColor: 'from-amber-500 to-orange-600',
      topic: 'Token Economics',
      timestamp: '5 hours ago',
      content: 'The 1 USDT = 100 TKN fixed peg provides great certainty for settlement on demand. Can we explore dynamic 0.25% liquidity bonuses during peak banking hours (14:00 - 18:00 IST) to accelerate sub-order clearances?',
      likes: 12,
      hasLiked: false
    },
    {
      id: 'c3',
      author: 'DevOps Security Team',
      role: 'Security Auditor',
      avatarColor: 'from-emerald-500 to-teal-600',
      topic: 'UPI Health',
      timestamp: 'Yesterday',
      content: 'Automated 12-digit UTR regex validation with deduplication has prevented 99.8% of fraudulent double-submissions. Any VPA exceeding 3 sequential failed verification cycles is now auto-isolated from the live pool within 60s.',
      likes: 24,
      hasLiked: true
    }
  ]);

  const handleLike = (id: string) => {
    setComments(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          likes: c.hasLiked ? c.likes - 1 : c.likes + 1,
          hasLiked: !c.hasLiked
        };
      }
      return c;
    }));
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newEntry: DiscussionComment = {
      id: `c_${Date.now()}`,
      author: authorName.trim() || 'Anonymous Merchant',
      role: userRole,
      avatarColor: 'from-purple-500 to-pink-600',
      topic: 'Matching Engine',
      timestamp: 'Just now',
      content: newComment.trim(),
      likes: 1,
      hasLiked: true
    };

    setComments([newEntry, ...comments]);
    setNewComment('');
  };

  const filteredComments = selectedTopic === 'ALL' 
    ? comments 
    : comments.filter(c => c.topic === selectedTopic);

  return (
    <div className="min-h-screen bg-[#050510] text-gray-100 flex flex-col font-sans selection:bg-orange-500/30">
      <Navbar />

      {/* Header Banner */}
      <header className="border-b border-white/5 bg-[#090918]/80 backdrop-blur-md px-6 py-5 sticky top-14 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">Engine Architecture & Peer RFC</h1>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  RFC-PAYULINK-2026
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Technical specifications, matching engine protocols & ecosystem discussions
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 bg-[#121226] p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('rfc')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'rfc' ? 'bg-violet-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Core RFC
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'architecture' ? 'bg-violet-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              P2P Bridge Engine
            </button>
            <button
              onClick={() => setActiveTab('database')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'database' ? 'bg-violet-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              Schema & Models
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'comments' ? 'bg-violet-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Discussion ({comments.length})
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {activeTab === 'rfc' && (
          <div className="space-y-6">
            {/* Core Principle Card */}
            <div className="bg-[#0b0b1c] border border-violet-500/20 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-lg font-bold text-white">1. Core Protocol Principle</h2>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    PayuLink operates as a decentralized, non-custodial financial matching engine serving two synchronized rails:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="bg-[#12122b] p-4 rounded-xl border border-white/5 space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">System A — USDT Liquidity Rail</span>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        Merchants and institutional partners deposit USDT via TRC20/ERC20/BEP20 on auto-rotating smart addresses, receiving Bharat Tokens at a guaranteed peg of <strong>1 USDT = 100 TKN</strong>.
                      </p>
                    </div>
                    <div className="bg-[#12122b] p-4 rounded-xl border border-white/5 space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">System B — INR P2P Bridge Rail</span>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        <strong>The platform never holds INR funds.</strong> INR flows directly between users via their bank UPI VPAs. The engine coordinates smart locking, chunking, and instant settlement arbitration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lifecycle Stages */}
            <div className="bg-[#0b0b1c] border border-white/5 rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-violet-400" />
                2. Complete P2P Settlement Lifecycle
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
                {[
                  { step: '01', title: 'Phase 1: Setup', desc: 'Withdrawer binds Receive UPI and creates order' },
                  { step: '02', title: 'Phase 2: Match', desc: 'System matches optimal VPA from active health pool' },
                  { step: '03', title: 'Phase 3: Pay', desc: 'Depositor sees Dynamic QR & submits 12-digit UTR' },
                  { step: '04', title: 'Phase 4: Confirm', desc: 'Admin / Webhook confirms bank credit ledger' },
                  { step: '05', title: 'Phase 5: Settle', desc: 'Instant token credit + fulfillment on both ends' }
                ].map((s, idx) => (
                  <div key={idx} className="bg-[#12122b] p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                    <div>
                      <span className="text-2xl font-black text-violet-500/40">{s.step}</span>
                      <h4 className="text-xs font-semibold text-white mt-1">{s.title}</h4>
                      <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{s.desc}</p>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-3 self-end" />
                  </div>
                ))}
              </div>
            </div>

            {/* Chunking & Daily Limit Protection */}
            <div className="bg-[#0b0b1c] border border-white/5 rounded-2xl p-6 space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-400" />
                3. Intelligent Chunking Algorithm
              </h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                To comply with Indian banking NPCI limits (daily maximum ₹100,000 per UPI ID and ₹2,000–₹50,000 per single transaction), large withdrawal orders are automatically fragmented into parallel sub-orders:
              </p>
              <div className="bg-[#14142e] p-4 rounded-xl border border-white/10 font-mono text-xs text-gray-300 overflow-x-auto">
                <pre>{`// Example: A withdrawal order of ₹150,000 is partitioned:
Order #ORD-7729 (Total: ₹150,000)
 ├── Chunk 1: ₹50,000 -> Matched with Payer A (VPA: payerA@okhdfc) -> Status: CONFIRMED
 ├── Chunk 2: ₹50,000 -> Matched with Payer B (VPA: payerB@icici)   -> Status: PROCESSING
 └── Chunk 3: ₹50,000 -> Matched with Payer C (VPA: payerC@axl)     -> Status: WAITING_MATCH`}</pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <div className="bg-[#0b0b1c] border border-white/5 rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Network className="w-4 h-4 text-violet-400" />
                Order Matching Engine Rules
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#12122b] p-4 rounded-xl border border-white/5 space-y-2">
                  <h4 className="text-xs font-semibold text-violet-300">Matching Criteria</h4>
                  <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                    <li>VPA Success Rate {'>'} 95.0% over last 50 transactions</li>
                    <li>Current VPA Daily Volume {'<'} ₹85,000 (Safety Buffer)</li>
                    <li>Merchant Credibility Score weighted routing</li>
                    <li>Sub-order expiration: strict 15-minute countdown window</li>
                  </ul>
                </div>
                <div className="bg-[#12122b] p-4 rounded-xl border border-white/5 space-y-2">
                  <h4 className="text-xs font-semibold text-emerald-300">Confirmation SLA</h4>
                  <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                    <li>Webhook automatic confirmation via Bank API integration</li>
                    <li>Manual Admin 1-click ledger audit with UTR cross-check</li>
                    <li>Timeout failover: Unmatched chunks re-enter pool instantly</li>
                    <li>Auto-escalation to Support Desk if dispute raised within 60m</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'database' && (
          <div className="space-y-6">
            <div className="bg-[#0b0b1c] border border-white/5 rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-400" />
                Database Entities & Table Schemas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#12122b] p-4 rounded-xl border border-white/5 space-y-2">
                  <span className="font-mono text-xs text-violet-400 font-bold">app_upi_pool</span>
                  <pre className="text-[11px] font-mono text-gray-300 bg-[#090918] p-3 rounded-lg overflow-x-auto">{`id: UUID PRIMARY KEY
vpa: VARCHAR(100) NOT NULL
holder_name: VARCHAR(100)
bank_name: VARCHAR(50)
daily_limit: BIGINT DEFAULT 10000000
current_daily_volume: BIGINT DEFAULT 0
health_score: INT DEFAULT 100
is_active: BOOLEAN DEFAULT true
last_tested_at: TIMESTAMP`}</pre>
                </div>

                <div className="bg-[#12122b] p-4 rounded-xl border border-white/5 space-y-2">
                  <span className="font-mono text-xs text-emerald-400 font-bold">app_payment_match</span>
                  <pre className="text-[11px] font-mono text-gray-300 bg-[#090918] p-3 rounded-lg overflow-x-auto">{`id: UUID PRIMARY KEY
order_id: VARCHAR(64) UNIQUE
merchant_code: VARCHAR(32)
amount_paisa: BIGINT NOT NULL
matched_upi: VARCHAR(100) NOT NULL
utr_number: VARCHAR(20)
proof_url: TEXT
status: ENUM('MATCHED','SUBMITTED','CONFIRMED')
created_at: TIMESTAMP`}</pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="space-y-6">
            {/* Post a Comment */}
            <form onSubmit={handlePostComment} className="bg-[#0b0b1c] border border-white/10 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-violet-400" />
                Add to Discussion / Suggest Protocol RFC Change
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Your Name / Organization"
                  className="bg-[#12122b] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"
                />
                <select
                  value={userRole}
                  onChange={(e: any) => setUserRole(e.target.value)}
                  className="bg-[#12122b] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="Merchant Integrator">Merchant Integrator</option>
                  <option value="Liquidity Partner">Liquidity Partner</option>
                  <option value="Core Architect">Core Architect</option>
                  <option value="Security Auditor">Security Auditor</option>
                </select>
              </div>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share technical proposals, feedback on matching engine, liquidity routing, or settlement SLAs..."
                rows={3}
                className="w-full bg-[#12122b] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-lg shadow-violet-600/30"
                >
                  <Send className="w-3.5 h-3.5" />
                  Post Proposal
                </button>
              </div>
            </form>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                Filter by Topic:
              </span>
              {['ALL', 'Matching Engine', 'Token Economics', 'UPI Health', 'Dispute SLA'].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTopic(t)}
                  className={`px-3 py-1 rounded-lg transition-all font-medium ${
                    selectedTopic === t ? 'bg-white/10 text-white border border-white/20' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {filteredComments.map((item) => (
                <div key={item.id} className="bg-[#0b0b1c] border border-white/5 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${item.avatarColor} flex items-center justify-center text-xs font-bold text-white shadow-md`}>
                        {item.author[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{item.author}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/5">
                            {item.role}
                          </span>
                        </div>
                        <span className="text-[11px] text-gray-500">{item.timestamp}</span>
                      </div>
                    </div>
                    <span className="text-[11px] px-2.5 py-1 rounded-lg bg-violet-500/10 text-violet-300 font-medium border border-violet-500/20">
                      {item.topic}
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed pl-11">
                    {item.content}
                  </p>

                  <div className="flex items-center gap-4 pl-11 pt-1">
                    <button
                      onClick={() => handleLike(item.id)}
                      className={`flex items-center gap-1.5 text-xs transition-all ${
                        item.hasLiked ? 'text-violet-400 font-semibold' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{item.likes} Agree</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
