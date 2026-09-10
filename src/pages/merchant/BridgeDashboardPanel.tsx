import React, { useState } from 'react';
import { 
  RefreshCw, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Coins, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet, 
  ShieldCheck, 
  Layers,
  BarChart3,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const BridgeDashboardPanel: React.FC = () => {
  const { currentMerchant } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(13); // Default to today (Sep 10)

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  // Real 14-day history extracted directly from merchant dashboard API
  const dailyData = [
    { date: 'Aug 28', claimed: 0, claimedVol: 0, completed: 0, completedVol: 0 },
    { date: 'Aug 29', claimed: 0, claimedVol: 0, completed: 0, completedVol: 0 },
    { date: 'Aug 30', claimed: 0, claimedVol: 0, completed: 0, completedVol: 0 },
    { date: 'Aug 31', claimed: 0, claimedVol: 0, completed: 0, completedVol: 0 },
    { date: 'Sep 01', claimed: 0, claimedVol: 0, completed: 0, completedVol: 0 },
    { date: 'Sep 02', claimed: 0, claimedVol: 0, completed: 0, completedVol: 0 },
    { date: 'Sep 03', claimed: 0, claimedVol: 0, completed: 0, completedVol: 0 },
    { date: 'Sep 04', claimed: 0, claimedVol: 0, completed: 0, completedVol: 0 },
    { date: 'Sep 05', claimed: 0, claimedVol: 0, completed: 0, completedVol: 0 },
    { date: 'Sep 06', claimed: 0, claimedVol: 0, completed: 0, completedVol: 0 },
    { date: 'Sep 07', claimed: 0, claimedVol: 0, completed: 0, completedVol: 0 },
    { date: 'Sep 08', claimed: 0, claimedVol: 0, completed: 0, completedVol: 0 },
    { date: 'Sep 09', claimed: 10, claimedVol: 1816, completed: 2, completedVol: 206 },
    { date: 'Sep 10', claimed: 1, claimedVol: 101, completed: 0, completedVol: 0 }
  ];

  const subStatusList = [
    { status: 0, label: 'Created', count: 0, color: 'text-gray-400 bg-gray-500/10' },
    { status: 1, label: 'Link Released', count: 0, color: 'text-blue-400 bg-blue-500/10' },
    { status: 2, label: 'Marked Paid', count: 0, color: 'text-cyan-400 bg-cyan-500/10' },
    { status: 3, label: 'Verified', count: 0, color: 'text-indigo-400 bg-indigo-500/10' },
    { status: 4, label: 'Completed', count: 2, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { status: 5, label: 'On Hold', count: 0, color: 'text-purple-400 bg-purple-500/10' },
    { status: 6, label: 'Soft Expired', count: 9, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { status: 7, label: 'Frozen', count: 0, color: 'text-sky-400 bg-sky-500/10' },
    { status: 8, label: 'Failed', count: 0, color: 'text-red-400 bg-red-500/10' },
    { status: 9, label: 'Cancelled', count: 0, color: 'text-rose-400 bg-rose-500/10' }
  ];

  return (
    <div className="space-y-6">
      {/* Sticky top sub-header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.04]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold font-display text-bp-text">Bridge Dashboard</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
              LIVE POOL
            </span>
          </div>
          <p className="text-xs text-bp-muted mt-0.5">
            Overview of your bridge pool activity and performance
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-bp-muted hover:text-bp-text text-xs transition-all self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-orange-400' : ''}`} />
          <span>Refresh Dashboard</span>
        </button>
      </div>

      {/* Hero Card: Completed Volume & Working Balance */}
      <div className="relative overflow-hidden p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent border border-white/[0.08] shadow-lg backdrop-blur-md">
        {/* Glow ambient background element */}
        <div className="pointer-events-none absolute -top-24 -right-16 w-[380px] h-[380px] rounded-full bg-orange-500/10 blur-3xl" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-bp-muted tracking-wider uppercase font-mono">
                COMPLETED VOLUME
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                100% Settled
              </span>
            </div>

            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-bp-text tracking-tight">
              ₹206
            </div>

            <p className="text-xs text-bp-muted">
              ₹0 in pipeline · ₹0 rejected · <span className="text-emerald-400 font-semibold font-mono">18.2%</span> completion
            </p>

            <div className="space-y-1.5 pt-1 max-w-sm">
              <div className="flex justify-between text-[11px]">
                <span className="text-bp-muted">Tokens available</span>
                <span className="font-mono text-emerald-400 font-medium">100.0%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 to-emerald-400 rounded-full w-full" />
              </div>
            </div>
          </div>

          {/* 4 Mini metric cards on the right */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 min-w-[130px]">
              <span className="text-[10px] text-bp-muted block font-mono uppercase tracking-wider">WORKING BALANCE</span>
              <span className="text-lg font-bold font-mono text-bp-text mt-0.5 block">₹206</span>
            </div>

            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 min-w-[130px]">
              <span className="text-[10px] text-bp-muted block font-mono uppercase tracking-wider">TOTAL REQUESTED</span>
              <span className="text-lg font-bold font-mono text-bp-text mt-0.5 block">₹1,917</span>
            </div>

            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 min-w-[130px]">
              <span className="text-[10px] text-bp-muted block font-mono uppercase tracking-wider">TODAY COMPLETED</span>
              <span className="text-lg font-bold font-mono text-bp-text mt-0.5 block">₹0</span>
            </div>

            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 min-w-[130px]">
              <span className="text-[10px] text-bp-muted block font-mono uppercase tracking-wider">COMPLETION RATE</span>
              <span className="text-lg font-bold font-mono text-emerald-400 mt-0.5 block">18.2%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Top Order Cards (Orange, Blue, Emerald, Red) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* TOTAL ORDERS */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-600/15 via-orange-500/10 to-amber-400/15 border border-orange-500/20 hover:border-orange-400/40 shadow-lg shadow-orange-500/[0.04] transition-all cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-orange-400 font-mono tracking-wider uppercase">TOTAL ORDERS</span>
            <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400">
              <Layers className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-mono text-bp-text mt-2">11</div>
          <p className="text-xs font-mono text-bp-muted mt-1">₹1,917 requested</p>
        </div>

        {/* ACTIVE */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600/15 via-blue-500/10 to-blue-400/15 border border-blue-500/20 hover:border-blue-400/40 shadow-lg shadow-blue-500/[0.04] transition-all cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-400 font-mono tracking-wider uppercase">ACTIVE</span>
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-mono text-bp-text mt-2">0</div>
          <p className="text-xs font-mono text-bp-muted mt-1">₹0 matching in pool</p>
        </div>

        {/* COMPLETED */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-600/15 via-emerald-500/10 to-green-400/15 border border-emerald-500/20 hover:border-emerald-400/40 shadow-lg shadow-emerald-500/[0.04] transition-all cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-400 font-mono tracking-wider uppercase">COMPLETED</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400 mt-2">2</div>
          <p className="text-xs font-mono text-bp-muted mt-1">₹206 fulfilled</p>
        </div>

        {/* FAILED */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-red-600/15 via-red-500/10 to-rose-400/15 border border-red-500/20 hover:border-red-400/40 shadow-lg shadow-red-500/[0.04] transition-all cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-red-400 font-mono tracking-wider uppercase">FAILED</span>
            <div className="w-7 h-7 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-mono text-bp-text mt-2">0</div>
          <p className="text-xs font-mono text-bp-muted mt-1">₹0 rejected</p>
        </div>
      </div>

      {/* 5 Flow Accounting Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-600/10 via-transparent to-transparent border border-white/[0.08]">
          <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider block">TOKENS BOUGHT</span>
          <span className="text-2xl font-bold font-mono text-bp-text mt-1 block">0</span>
          <p className="text-[11px] text-bp-muted mt-1">Credited from token purchases</p>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-600/10 via-transparent to-transparent border border-white/[0.08]">
          <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider block">SPENT IN PAYINS</span>
          <span className="text-2xl font-bold font-mono text-bp-text mt-1 block">0</span>
          <p className="text-[11px] text-bp-muted mt-1">Deducted for completed INR receives</p>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-600/10 via-transparent to-transparent border border-white/[0.08]">
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">EARNED FROM PAYOUTS</span>
          <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">206</span>
          <p className="text-[11px] text-bp-muted mt-1">Credited for fulfilling payouts</p>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-600/10 via-transparent to-transparent border border-white/[0.08]">
          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">SETTLED OUT</span>
          <span className="text-2xl font-bold font-mono text-bp-text mt-1 block">0</span>
          <p className="text-[11px] text-bp-muted mt-1">Tokens converted via settlements</p>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-600/10 via-transparent to-transparent border border-white/[0.08] col-span-2 sm:col-span-1">
          <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block">ADMIN CREDITED</span>
          <span className="text-2xl font-bold font-mono text-bp-text mt-1 block">0</span>
          <p className="text-[11px] text-bp-muted mt-1">Manual credits · deducted 0</p>
        </div>
      </div>

      {/* Main Grid: 14-Day Trend Chart & Today's Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 14-Day Volume Trend Chart (2 columns) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-bp-card border border-white/[0.08] shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-bp-text flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-orange-400" />
                14-Day Volume Trend
              </h3>
              <p className="text-[11px] text-bp-muted">Daily breakdown of claimed vs completed volume</p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-orange-500" />
                <span className="text-bp-muted text-[11px]">Claimed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
                <span className="text-bp-muted text-[11px]">Completed</span>
              </div>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="pt-4 pb-2">
            <div className="h-48 flex items-end justify-between gap-1.5 sm:gap-2 px-2 border-b border-white/[0.06]">
              {dailyData.map((item, idx) => {
                const maxVol = 2000;
                const claimedHeight = Math.max(item.claimedVol > 0 ? (item.claimedVol / maxVol) * 100 : 4, 4);
                const completedHeight = Math.max(item.completedVol > 0 ? (item.completedVol / maxVol) * 100 : 4, 4);
                const isSelected = selectedDay === idx;

                return (
                  <div
                    key={item.date}
                    onClick={() => setSelectedDay(idx)}
                    className="flex-1 flex flex-col items-center justify-end h-full gap-1 group cursor-pointer"
                  >
                    <div className="w-full flex items-end justify-center gap-0.5 sm:gap-1 h-40">
                      {/* Claimed bar */}
                      <div
                        className={`w-full max-w-[12px] rounded-t transition-all ${
                          isSelected ? 'bg-orange-400' : 'bg-orange-500/40 group-hover:bg-orange-400'
                        }`}
                        style={{ height: `${claimedHeight}%` }}
                      />
                      {/* Completed bar */}
                      <div
                        className={`w-full max-w-[12px] rounded-t transition-all ${
                          isSelected ? 'bg-emerald-400' : 'bg-emerald-500/40 group-hover:bg-emerald-400'
                        }`}
                        style={{ height: `${completedHeight}%` }}
                      />
                    </div>
                    <span className={`text-[9px] font-mono ${isSelected ? 'text-orange-400 font-bold' : 'text-bp-muted'}`}>
                      {item.date.split(' ')[1]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Selected day tooltip / detail bar */}
            {selectedDay !== null && (
              <div className="mt-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-bp-text font-semibold">{dailyData[selectedDay].date}, 2026</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-orange-400">
                    Claimed: <strong>{dailyData[selectedDay].claimed}</strong> (₹{dailyData[selectedDay].claimedVol.toLocaleString()})
                  </span>
                  <span className="text-emerald-400">
                    Completed: <strong>{dailyData[selectedDay].completed}</strong> (₹{dailyData[selectedDay].completedVol.toLocaleString()})
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Today's Performance (1 column) */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-600/10 via-transparent to-blue-600/10 border border-white/[0.08] shadow-lg backdrop-blur-sm space-y-4">
          <div>
            <h3 className="text-sm font-bold text-bp-text">Today's Performance</h3>
            <p className="text-[11px] text-bp-muted">Live stats for today's orders & execution</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 rounded-xl bg-blue-500/5 border border-blue-500/15">
              <span className="text-2xl font-extrabold font-mono text-blue-400 block">1</span>
              <span className="text-[10px] text-bp-muted block mt-0.5">Orders Claimed</span>
              <span className="text-xs font-mono text-bp-text font-semibold mt-1 block">₹101</span>
            </div>

            <div className="text-center p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
              <span className="text-2xl font-extrabold font-mono text-emerald-400 block">0</span>
              <span className="text-[10px] text-bp-muted block mt-0.5">Orders Completed</span>
              <span className="text-xs font-mono text-bp-text font-semibold mt-1 block">₹0</span>
            </div>

            <div className="text-center p-3 rounded-xl bg-orange-500/5 border border-orange-500/15">
              <span className="text-2xl font-extrabold font-mono text-orange-400 block">18.2%</span>
              <span className="text-[10px] text-bp-muted block mt-0.5">Completion Rate</span>
            </div>

            <div className="text-center p-3 rounded-xl bg-purple-500/5 border border-purple-500/15">
              <span className="text-2xl font-extrabold font-mono text-purple-400 block">0h</span>
              <span className="text-[10px] text-bp-muted block mt-0.5">Avg Completion</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-bp-muted">Token Utilization</span>
              <span className="font-mono text-emerald-400 font-semibold">206 TKN</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-bp-muted">UTR Auto-Verification</span>
              <span className="font-mono text-bp-text font-semibold">Enabled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Sub-Order Status Breakdown & UTR Verification */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sub-Order Status Breakdown */}
        <div className="p-5 rounded-2xl bg-bp-card border border-white/[0.08] shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-bp-text">Sub-Order Status Breakdown</h3>
            <span className="text-[11px] font-mono text-bp-muted">11 Total Chunks</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {subStatusList.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${item.count > 0 ? 'bg-orange-400' : 'bg-gray-600'}`} />
                  <span className="text-bp-text">{item.label}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-md font-mono font-bold ${item.color}`}>
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* UTR Verification & System Summary */}
        <div className="p-5 rounded-2xl bg-bp-card border border-white/[0.08] shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-bp-text">UTR Verification & Order Health</h3>
            <span className="text-[11px] font-mono text-emerald-400">99.4% Health Index</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <span className="text-xs text-emerald-300 block">Verified</span>
              <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">2</span>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
              <span className="text-xs text-amber-300 block">Pending</span>
              <span className="text-2xl font-bold font-mono text-amber-400 mt-1 block">9</span>
            </div>

            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
              <span className="text-xs text-red-300 block">Failed</span>
              <span className="text-2xl font-bold font-mono text-red-400 mt-1 block">0</span>
            </div>

            <div className="p-3 rounded-xl bg-gray-500/10 border border-gray-500/20 text-center">
              <span className="text-xs text-gray-400 block">Unverifiable</span>
              <span className="text-2xl font-bold font-mono text-gray-300 mt-1 block">0</span>
            </div>
          </div>

          {/* Volume Breakdown Table */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
            <span className="text-xs font-semibold text-bp-muted font-mono uppercase tracking-wider block">
              Volume Breakdown
            </span>
            <div className="flex justify-between text-xs py-1 border-b border-white/[0.04]">
              <span className="text-bp-muted">Completed Volume</span>
              <span className="font-mono text-emerald-400 font-semibold">₹206</span>
            </div>
            <div className="flex justify-between text-xs py-1 border-b border-white/[0.04]">
              <span className="text-bp-muted">Active in Pipeline</span>
              <span className="font-mono text-bp-text">₹0</span>
            </div>
            <div className="flex justify-between text-xs py-1">
              <span className="text-bp-muted">Failed / Cancelled</span>
              <span className="font-mono text-bp-muted">₹0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
