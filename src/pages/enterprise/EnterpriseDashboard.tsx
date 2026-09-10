import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  Coins, 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownLeft, 
  QrCode, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  RefreshCw,
  Wallet,
  Scale,
  Sparkles,
  Award,
  Lock
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';

export const EnterpriseDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pools' | 'assigned' | 'bonds' | 'settlements' | 'upis'>('pools');

  const enterpriseInfo = {
    name: 'Apex Institutional Capital Ltd',
    code: 'ENT-APEX-9901',
    tier: 'Tier 1 White-Label Partner',
    allocatedTokens: 5000000, // 5M Tokens
    collateralUsdt: 50000,
    dailyPayoutVolume: 8420000, // ₹84.2 Lakhs
    commissionEarned: 126300, // ₹1.26 Lakhs (1.5%)
    status: 'ACTIVE'
  };

  const assignedOrders = [
    {
      id: 'ENT-ORD-8819',
      merchantCode: 'M-FD055F93',
      amount: 50000,
      beneficiary: 'Mazer Operations Pool',
      vpa: 'mazer.ops@okhdfcbank',
      status: 'Ready to Fulfill',
      timer: '12m remaining'
    },
    {
      id: 'ENT-ORD-8820',
      merchantCode: 'M_DELTAPAY',
      amount: 100000,
      beneficiary: 'DeltaPay Escrow',
      vpa: 'deltapay.escrow@icici',
      status: 'Fulfilling',
      timer: '8m remaining'
    },
    {
      id: 'ENT-ORD-8821',
      merchantCode: 'M_CRYPTOHUB',
      amount: 75000,
      beneficiary: 'Bharat Web3 Reserve',
      vpa: 'bharatweb3@kotak',
      status: 'Completed',
      utr: '625910293812'
    }
  ];

  const digitalBonds = [
    {
      id: 'BOND-30D-01',
      title: '30-Day Liquidity Yield Bond',
      stakedAmount: '25,000 USDT',
      apr: '9.2% APR',
      maturityDate: '2026-10-10',
      accumulatedYield: '191.6 USDT',
      status: 'Active'
    },
    {
      id: 'BOND-90D-02',
      title: '90-Day P2P Reserve Bond',
      stakedAmount: '50,000 USDT',
      apr: '11.8% APR',
      maturityDate: '2026-12-10',
      accumulatedYield: '491.7 USDT',
      status: 'Active'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050614] text-white">
      {/* Top Banner Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#07091e]/90 backdrop-blur-xl px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-bold text-sm">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm tracking-tight text-white">{enterpriseInfo.name}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                ENTERPRISE
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-mono">{enterpriseInfo.code} · {enterpriseInfo.tier}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono">
            <span className="text-gray-400">Total Collateral:</span>
            <span className="font-bold text-emerald-400">{enterpriseInfo.collateralUsdt.toLocaleString()} USDT</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">Tokens:</span>
            <span className="font-bold text-orange-400">{enterpriseInfo.allocatedTokens.toLocaleString()} TKN</span>
          </div>

          <a
            href="/merchant/dashboard"
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-300 transition-colors"
          >
            Switch to Merchant
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto p-6 pb-28 space-y-6">
        {/* KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-lg space-y-2">
            <span className="text-xs text-gray-400">24h Payout Volume Cleared</span>
            <div className="text-2xl font-bold font-mono text-white">
              ₹{enterpriseInfo.dailyPayoutVolume.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +14.2% daily throughput
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-lg space-y-2">
            <span className="text-xs text-gray-400">Accrued Commission (1.5%)</span>
            <div className="text-2xl font-bold font-mono text-emerald-400">
              ₹{enterpriseInfo.commissionEarned.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-gray-400">Settled daily in USDT</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-lg space-y-2">
            <span className="text-xs text-gray-400">Active High-Limit VPAs</span>
            <div className="text-2xl font-bold font-mono text-blue-400">
              12 Bound Handles
            </div>
            <p className="text-[11px] text-emerald-400">99.8% Straight-through health</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-lg space-y-2">
            <span className="text-xs text-gray-400">Digital Bonds Collateral</span>
            <div className="text-2xl font-bold font-mono text-violet-300">
              75,000 USDT
            </div>
            <p className="text-[11px] text-violet-400">Average 10.5% APR yield</p>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('pools')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'pools'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            <Layers className="w-4 h-4" />
            Dedicated Pools
          </button>

          <button
            onClick={() => setActiveTab('assigned')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'assigned'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Assigned Priority Orders
            <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px]">2</span>
          </button>

          <button
            onClick={() => setActiveTab('bonds')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'bonds'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            <Award className="w-4 h-4" />
            Digital Bonds (FD)
          </button>

          <button
            onClick={() => setActiveTab('settlements')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'settlements'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            <Scale className="w-4 h-4" />
            Instant Off-Ramps
          </button>
        </div>

        {/* Tab 1: Dedicated Pools */}
        {activeTab === 'pools' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <h3 className="text-sm font-bold text-white">Enterprise Liquidity Pool Monitor</h3>
                <span className="text-xs font-mono text-emerald-400">₹89.45 / USDT Auto-Peg</span>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">High-Ticket IMPS Batch Pool (₹50k - ₹2L)</span>
                    <span className="text-[11px] text-gray-400">Matched with verified tier-1 merchant payouts</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-sm font-bold text-emerald-400 block">₹45,00,000 Liquidity</span>
                    <span className="text-[10px] text-gray-500">100% Filled</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Instant UPI Micro-Disbursement Pool</span>
                    <span className="text-[11px] text-gray-400">Continuous sub-second chunk matching for high-velocity collections</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-sm font-bold text-blue-400 block">₹25,00,000 Liquidity</span>
                    <span className="text-[10px] text-gray-500">82% Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Collateral & Yield Overview */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent border border-white/[0.08] shadow-lg space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Institutional Custody
              </div>
              <p className="text-xs text-gray-400">
                All collateral is held in multi-sig cold storage on TRON & Ethereum networks with 1:1 automated reserve verification.
              </p>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-400">Reserved for Payouts:</span>
                  <span className="text-white font-bold">40,000 USDT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Available Buffer:</span>
                  <span className="text-emerald-400 font-bold">10,000 USDT</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Assigned Priority Orders */}
        {activeTab === 'assigned' && (
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-lg overflow-hidden">
            <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Assigned Priority Payouts</h3>
                <p className="text-[11px] text-gray-400">Exclusive institutional orders assigned to your handles</p>
              </div>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.02] border-b border-white/[0.06] font-mono text-[10px] text-gray-400 uppercase">
                <tr>
                  <th className="py-3 px-4">ORDER ID</th>
                  <th className="py-3 px-4">MERCHANT CODE</th>
                  <th className="py-3 px-4">BENEFICIARY & UPI</th>
                  <th className="py-3 px-4">AMOUNT</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {assignedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.01]">
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">{order.id}</td>
                    <td className="py-3.5 px-4 font-mono text-gray-300">{order.merchantCode}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-white block">{order.beneficiary}</span>
                      <span className="font-mono text-[11px] text-gray-400">{order.vpa}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-white text-sm">₹{order.amount.toLocaleString()}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                        order.status === 'Completed'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {order.utr ? (
                        <span className="font-mono text-[11px] text-emerald-400">UTR: {order.utr}</span>
                      ) : (
                        <button
                          onClick={() => alert(`Fulfill ${order.id} from enterprise bank terminal.`)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20"
                        >
                          Fulfill Payout
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Digital Bonds (FD) */}
        {activeTab === 'bonds' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Digital Yield Bonds (FD)</h3>
                <p className="text-[11px] text-gray-400">Lock USDT collateral to earn high-yield staking returns from transaction fees</p>
              </div>
              <button
                onClick={() => alert('New Institutional Digital Bond subscription opened.')}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-lg shadow-violet-600/20"
              >
                Stake New Bond
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {digitalBonds.map((bond) => (
                <div key={bond.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{bond.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-violet-500/15 text-violet-300 border border-violet-500/30">
                      {bond.apr}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono p-3 rounded-xl bg-black/30 border border-white/[0.05]">
                    <div>
                      <span className="text-gray-400 block text-[10px]">STAKED PRINCIPAL</span>
                      <span className="font-bold text-white text-sm">{bond.stakedAmount}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">ACCUMULATED YIELD</span>
                      <span className="font-bold text-emerald-400 text-sm">+{bond.accumulatedYield}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                    <span>Maturity: <strong className="text-white font-mono">{bond.maturityDate}</strong></span>
                    <span className="text-emerald-400 font-semibold">Automated Roll-over</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Settlements */}
        {activeTab === 'settlements' && (
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-lg space-y-4">
            <h3 className="text-sm font-bold text-white">Enterprise Instant Settlement Desk</h3>
            <p className="text-xs text-gray-400">
              Institutional off-ramps with direct TRON multi-sig and automated bank RTGS.
            </p>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gray-400 block">Available Commission to Withdraw</span>
                <span className="text-2xl font-bold font-mono text-emerald-400">₹1,26,300.00</span>
                <span className="text-[11px] font-mono text-gray-400 block mt-0.5">Approx. 1,412.00 USDT</span>
              </div>

              <button
                onClick={() => alert('Enterprise off-ramp of 1,412 USDT requested.')}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20"
              >
                Withdraw to TRC-20 Wallet
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
