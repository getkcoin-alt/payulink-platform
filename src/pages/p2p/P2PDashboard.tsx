import React, { useState, useEffect } from 'react';
import { 
  Coins, 
  ArrowDownLeft, 
  ArrowUpRight, 
  QrCode, 
  Copy, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Share2, 
  Users, 
  Building, 
  CreditCard, 
  Plus, 
  History, 
  HelpCircle,
  Sparkles,
  RefreshCw,
  Wallet
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';

export const P2PDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'deposit' | 'withdraw' | 'usdt' | 'history' | 'referral' | 'upis'>('overview');
  
  // State
  const [tokenBalance, setTokenBalance] = useState(2500); // 2,500 Bharat Tokens
  const [depositAmount, setDepositAmount] = useState('5000');
  const [depositStep, setDepositStep] = useState<'amount' | 'pay' | 'submitted' | 'confirmed'>('amount');
  const [utrNumber, setUtrNumber] = useState('');
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins = 900s
  const [copiedVpa, setCopiedVpa] = useState(false);

  // Bank accounts
  const [bankAccounts, setBankAccounts] = useState([
    { id: 'b1', holder: 'Ramesh Patel', accNo: '•••• •••• 9812', ifsc: 'HDFC0001234', bank: 'HDFC Bank', isDefault: true },
    { id: 'b2', holder: 'Ramesh Patel', accNo: '•••• •••• 4421', ifsc: 'ICIC0000492', bank: 'ICICI Bank', isDefault: false }
  ]);

  // UPI Bindings
  const [boundUpis, setBoundUpis] = useState([
    { id: 'u1', vpa: 'ramesh.liquidity@okhdfcbank', status: 'ACTIVE', dailyUsed: 42000, limit: 100000 },
    { id: 'u2', vpa: 'patel.pay@icici', status: 'ACTIVE', dailyUsed: 15000, limit: 100000 }
  ]);

  // Countdown timer for active deposit
  useEffect(() => {
    let interval: any;
    if (depositStep === 'pay' && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [depositStep, timeLeft]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedVpa(true);
    setTimeout(() => setCopiedVpa(false), 2000);
  };

  const handleSubmitUtr = (e: React.FormEvent) => {
    e.preventDefault();
    if (utrNumber.length !== 12) {
      alert('Please enter a valid 12-digit UPI UTR number');
      return;
    }
    setDepositStep('submitted');
    setTimeout(() => {
      setDepositStep('confirmed');
      setTokenBalance(prev => prev + parseInt(depositAmount) + Math.round(parseInt(depositAmount) * 0.01));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#050510] text-gray-100 flex flex-col font-sans selection:bg-orange-500/30">
      <Navbar />

      {/* Header Bar */}
      <header className="border-b border-white/5 bg-[#090918]/80 backdrop-blur-md px-6 py-5 sticky top-14 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">Bharat Token P2P Portal</h1>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  1 TKN = ₹1.00 Pegged
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Peer-to-peer liquidity matching, UPI bridge deposits & instant off-ramps
              </p>
            </div>
          </div>

          {/* Navigation Pills */}
          <div className="flex items-center gap-1 bg-[#121226] p-1 rounded-xl border border-white/10 text-xs overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: Wallet },
              { id: 'deposit', label: 'Deposit INR', icon: ArrowDownLeft },
              { id: 'withdraw', label: 'Withdraw INR', icon: ArrowUpRight },
              { id: 'usdt', label: 'Sell USDT', icon: Coins },
              { id: 'upis', label: 'Bind UPI', icon: QrCode },
              { id: 'referral', label: 'Refer & Earn', icon: Users },
              { id: 'history', label: 'Ledger', icon: History }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === tab.id ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Balance Hero Card */}
            <div className="bg-gradient-to-br from-[#0e1628] via-[#0b1020] to-[#070914] border border-emerald-500/30 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Available Token Balance
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <h2 className="text-4xl font-black text-white tracking-tight">
                      {tokenBalance.toLocaleString()} <span className="text-emerald-400 text-2xl font-bold">TKN</span>
                    </h2>
                    <span className="text-sm font-medium text-gray-400">
                      ≈ ₹{tokenBalance.toLocaleString()}.00 INR
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Guaranteed 1:1 redeemable via UPI & IMPS Instant Bank Transfers
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab('deposit')}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-1.5"
                  >
                    <ArrowDownLeft className="w-4 h-4" />
                    Deposit INR
                  </button>
                  <button
                    onClick={() => setActiveTab('withdraw')}
                    className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all border border-white/10 flex items-center gap-1.5"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    Withdraw INR
                  </button>
                  <button
                    onClick={() => setActiveTab('usdt')}
                    className="px-5 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Coins className="w-4 h-4" />
                    Sell USDT
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#0b0b1c] border border-white/5 rounded-2xl p-4">
                <span className="text-xs text-gray-400">Peg Status</span>
                <div className="text-lg font-bold text-white mt-1">1 USDT = 100 TKN</div>
                <div className="text-[11px] text-emerald-400 mt-0.5">Fixed Settlement Rate</div>
              </div>
              <div className="bg-[#0b0b1c] border border-white/5 rounded-2xl p-4">
                <span className="text-xs text-gray-400">Referral Tier</span>
                <div className="text-lg font-bold text-white mt-1">Level 1 (0.5%)</div>
                <div className="text-[11px] text-violet-400 mt-0.5">14 Active Downlines</div>
              </div>
              <div className="bg-[#0b0b1c] border border-white/5 rounded-2xl p-4">
                <span className="text-xs text-gray-400">Bound UPIs</span>
                <div className="text-lg font-bold text-white mt-1">2 VPAs Active</div>
                <div className="text-[11px] text-emerald-400 mt-0.5">Pool Health: 99.4%</div>
              </div>
              <div className="bg-[#0b0b1c] border border-white/5 rounded-2xl p-4">
                <span className="text-xs text-gray-400">Pending Settlements</span>
                <div className="text-lg font-bold text-white mt-1">₹0.00</div>
                <div className="text-[11px] text-gray-400 mt-0.5">All Orders Settled</div>
              </div>
            </div>
          </div>
        )}

        {/* Deposit INR */}
        {activeTab === 'deposit' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-[#0b0b1c] border border-white/10 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Deposit INR via UPI Bridge</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Instant matching with guaranteed 1% Bharat Token deposit bonus</p>
                </div>
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  +1.0% Token Bonus
                </span>
              </div>

              {depositStep === 'amount' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-300 block mb-1.5">Enter Deposit Amount (₹)</label>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      min="500"
                      max="100000"
                      className="w-full bg-[#12122b] border border-white/10 rounded-xl px-4 py-3 text-lg font-bold text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex gap-2">
                    {['1000', '2500', '5000', '10000', '25000'].map(val => (
                      <button
                        key={val}
                        onClick={() => setDepositAmount(val)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          depositAmount === val ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300' : 'bg-[#12122b] border-white/5 text-gray-400 hover:text-white'
                        }`}
                      >
                        ₹{val}
                      </button>
                    ))}
                  </div>

                  <div className="bg-[#12122b] p-3.5 rounded-xl border border-white/5 flex items-center justify-between text-xs">
                    <span className="text-gray-400">Tokens to Receive:</span>
                    <span className="font-bold text-emerald-400 text-sm">
                      {parseInt(depositAmount || '0') + Math.round(parseInt(depositAmount || '0') * 0.01)} TKN
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setTimeLeft(900);
                      setDepositStep('pay');
                    }}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all"
                  >
                    Match UPI Pool & Proceed
                  </button>
                </div>
              )}

              {depositStep === 'pay' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-xs">
                    <div className="flex items-center gap-2 text-amber-300">
                      <Clock className="w-4 h-4" />
                      <span>Expires in: <strong>{formatTimer(timeLeft)}</strong></span>
                    </div>
                    <span className="text-gray-400">Order #DEP-{Date.now().toString().slice(-6)}</span>
                  </div>

                  <div className="bg-[#12122b] p-4 rounded-xl border border-white/5 space-y-3">
                    <span className="text-xs text-gray-400">Assigned UPI ID (VPA):</span>
                    <div className="flex items-center justify-between bg-[#0b0b1c] p-3 rounded-lg border border-white/10">
                      <span className="font-mono text-sm font-bold text-white">payulink.pool88@icici</span>
                      <button
                        onClick={() => handleCopy('payulink.pool88@icici')}
                        className="text-xs px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-gray-200 flex items-center gap-1"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        {copiedVpa ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div className="text-[11px] text-gray-400">
                      Amount to Transfer: <strong className="text-white">₹{depositAmount}.00</strong>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitUtr} className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-gray-300 block mb-1.5">
                        Submit 12-Digit Bank UTR / Ref No *
                      </label>
                      <input
                        type="text"
                        maxLength={12}
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="e.g. 625410982343"
                        className="w-full bg-[#12122b] border border-white/10 rounded-xl px-4 py-2.5 font-mono text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={utrNumber.length !== 12}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-600/30"
                    >
                      Confirm Payment & Credit Tokens
                    </button>
                  </form>
                </div>
              )}

              {depositStep === 'submitted' && (
                <div className="text-center py-8 space-y-3">
                  <RefreshCw className="w-10 h-10 text-emerald-400 animate-spin mx-auto" />
                  <h4 className="text-base font-bold text-white">Verifying UTR with Banking Rail...</h4>
                  <p className="text-xs text-gray-400">Automated ledger cross-check in progress.</p>
                </div>
              )}

              {depositStep === 'confirmed' && (
                <div className="text-center py-8 space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <div>
                    <h4 className="text-lg font-bold text-white">Deposit Successful!</h4>
                    <p className="text-xs text-emerald-300 mt-1">
                      {parseInt(depositAmount) + Math.round(parseInt(depositAmount) * 0.01)} Bharat Tokens credited to your wallet.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setDepositStep('amount');
                      setActiveTab('overview');
                    }}
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-500"
                  >
                    View Wallet Balance
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Withdraw INR */}
        {activeTab === 'withdraw' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-[#0b0b1c] border border-white/10 rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Instant INR Withdrawal</h3>
                  <p className="text-xs text-gray-400 mt-0.5">T+0 direct settlement via IMPS or UPI</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-gray-400 block">Available Balance</span>
                  <span className="text-xs font-bold text-emerald-400">₹{tokenBalance.toLocaleString()}.00</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-medium text-gray-300 block">Select Saved Bank Account</label>
                <div className="space-y-2">
                  {bankAccounts.map(b => (
                    <div key={b.id} className="bg-[#12122b] p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Building className="w-5 h-5 text-emerald-400" />
                        <div>
                          <div className="text-xs font-bold text-white">{b.bank} - {b.accNo}</div>
                          <div className="text-[11px] text-gray-400">{b.holder} ({b.ifsc})</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-300">
                        VERIFIED
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-300 block mb-1.5">Amount to Withdraw (₹)</label>
                <input
                  type="number"
                  defaultValue="2000"
                  max={tokenBalance}
                  className="w-full bg-[#12122b] border border-white/10 rounded-xl px-4 py-2.5 font-bold text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                onClick={() => {
                  alert('Withdrawal request queued! T+0 IMPS dispatch in progress.');
                  setTokenBalance(prev => Math.max(0, prev - 2000));
                  setActiveTab('overview');
                }}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all"
              >
                Initiate Instant Withdrawal
              </button>
            </div>
          </div>
        )}

        {/* Sell USDT */}
        {activeTab === 'usdt' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-[#0b0b1c] border border-white/10 rounded-2xl p-6 space-y-5">
              <div>
                <h3 className="text-base font-bold text-white">Sell USDT for Bharat Tokens</h3>
                <p className="text-xs text-gray-400 mt-0.5">Fixed exchange rate: 1 USDT = 100 Bharat Tokens (₹100)</p>
              </div>

              <div className="bg-[#12122b] p-4 rounded-xl border border-white/5 space-y-3">
                <span className="text-xs text-gray-400">TRC-20 Deposit Address:</span>
                <div className="flex items-center justify-between bg-[#0b0b1c] p-3 rounded-lg border border-white/10">
                  <span className="font-mono text-xs text-emerald-300 break-all">TJX9bWkPqQ9j8mY1r4xZgUeLpt54318zVn</span>
                  <button
                    onClick={() => handleCopy('TJX9bWkPqQ9j8mY1r4xZgUeLpt54318zVn')}
                    className="text-xs px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-gray-200 shrink-0 ml-2"
                  >
                    Copy
                  </button>
                </div>
                <div className="text-[11px] text-gray-400">
                  Deposited USDT is automatically credited to your token balance after 1 block confirmation.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Referral */}
        {activeTab === 'referral' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-[#0b0b1c] border border-white/10 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">2-Tier Affiliate & Referral Engine</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Earn perpetual commission on all downline deposits and bridge orders</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-gray-400 block">Total Referral Earnings</span>
                  <span className="text-xs font-bold text-emerald-400">₹8,420.00</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#12122b] p-4 rounded-xl border border-white/5 space-y-2">
                  <span className="text-xs font-semibold text-emerald-400">Level 1 (Direct Referrals)</span>
                  <div className="text-2xl font-black text-white">0.50%</div>
                  <p className="text-[11px] text-gray-400">Earned whenever your direct invitee deposits INR or trades tokens.</p>
                </div>
                <div className="bg-[#12122b] p-4 rounded-xl border border-white/5 space-y-2">
                  <span className="text-xs font-semibold text-violet-400">Level 2 (Secondary Referrals)</span>
                  <div className="text-2xl font-black text-white">0.20%</div>
                  <p className="text-[11px] text-gray-400">Earned whenever users invited by your downlines deposit or trade.</p>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-medium text-gray-300">Your Exclusive Invitation Link</span>
                <div className="flex items-center justify-between bg-[#12122b] p-3 rounded-xl border border-white/10">
                  <span className="font-mono text-xs text-gray-300">https://payulink-platform.vercel.app/join/BHARAT778</span>
                  <button
                    onClick={() => handleCopy('https://payulink-platform.vercel.app/join/BHARAT778')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Share Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bound UPIs */}
        {activeTab === 'upis' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-[#0b0b1c] border border-white/10 rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Bound UPI VPAs</h3>
                  <p className="text-xs text-gray-400 mt-0.5">VPAs active for receiving and depositing peer funds</p>
                </div>
                <button
                  onClick={() => alert('Enter your UPI VPA to bind')}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Bind New UPI
                </button>
              </div>

              <div className="space-y-3">
                {boundUpis.map(u => (
                  <div key={u.id} className="bg-[#12122b] p-4 rounded-xl border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-white">{u.vpa}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-300">
                        {u.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-gray-400">
                      <span>Daily Limit: ₹{u.limit.toLocaleString()}</span>
                      <span>Volume Used: ₹{u.dailyUsed.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-400 h-full rounded-full"
                        style={{ width: `${(u.dailyUsed / u.limit) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* History / Ledger */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <div className="bg-[#0b0b1c] border border-white/5 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white mb-4">Bharat Token Transaction History</h3>
              <div className="divide-y divide-white/5">
                {[
                  { id: 'tx_1', type: 'UPI Deposit', amount: '+₹5,000', tokens: '+5,050 TKN', time: 'Today, 14:20', status: 'CONFIRMED' },
                  { id: 'tx_2', type: 'Level 1 Referral Bonus', amount: '+₹25', tokens: '+25 TKN', time: 'Yesterday, 19:45', status: 'CONFIRMED' },
                  { id: 'tx_3', type: 'IMPS Bank Withdrawal', amount: '-₹2,500', tokens: '-2,500 TKN', time: 'Sep 08, 11:12', status: 'COMPLETED' },
                  { id: 'tx_4', type: 'Sell USDT Swap (50 USDT)', amount: '+₹5,000', tokens: '+5,000 TKN', time: 'Sep 06, 16:30', status: 'CONFIRMED' }
                ].map(tx => (
                  <div key={tx.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{tx.type}</div>
                      <div className="text-gray-500 text-[11px]">{tx.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-emerald-400">{tx.tokens}</div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-300">
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
