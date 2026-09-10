import React from 'react';
import { 
  Activity, 
  TrendingUp, 
  ShieldAlert, 
  Server, 
  Zap, 
  Users, 
  Clock, 
  CheckCircle2, 
  Coins, 
  AlertTriangle 
} from 'lucide-react';

export const AdminCommandCenter: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent border border-emerald-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold font-display text-white">Master Command Center</h1>
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              SYSTEM OPTIMAL
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Global payment gateway health, high-frequency settlement throughput, and transaction risk sentinel.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 font-mono text-xs">
            <span className="text-gray-400 text-[10px] block">Global TPS</span>
            <span className="text-emerald-400 font-bold text-sm">48.2 tx/sec</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 font-mono text-xs">
            <span className="text-gray-400 text-[10px] block">Avg Settlement</span>
            <span className="text-white font-bold text-sm">16.4 sec</span>
          </div>
        </div>
      </div>

      {/* Main KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-bp-card border border-bp-border space-y-2">
          <span className="text-xs text-bp-muted">Total 24h Volume (INR)</span>
          <div className="text-2xl font-bold font-mono text-white">₹4,82,50,000</div>
          <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +21.4% week-on-week
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-bp-card border border-bp-border space-y-2">
          <span className="text-xs text-bp-muted">Total Successful Orders</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">34,180</div>
          <p className="text-[11px] text-bp-muted">99.6% straight-through rate</p>
        </div>

        <div className="p-5 rounded-2xl bg-bp-card border border-bp-border space-y-2">
          <span className="text-xs text-bp-muted">Active P2P Bridge Depth</span>
          <div className="text-2xl font-bold font-mono text-violet-300">1,240,500 USDT</div>
          <p className="text-[11px] text-bp-muted font-mono">₹11.09 Cr allocated</p>
        </div>

        <div className="p-5 rounded-2xl bg-bp-card border border-bp-border space-y-2">
          <span className="text-xs text-bp-muted">Active Merchants Online</span>
          <div className="text-2xl font-bold font-mono text-blue-400">54 / 54</div>
          <p className="text-[11px] text-emerald-400 font-medium">100% Active · Mazer Featured</p>
        </div>
      </div>

      {/* Quick Ops Control Ribbon */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider font-semibold">
          Quick Control Hub:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/admin/dashboard/merchantsList"
            className="px-3 py-1.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 text-orange-400 text-xs font-semibold transition-all"
          >
            Live Merchants (54)
          </a>
          <a
            href="/admin/dashboard/upiHealthCalculator"
            className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs font-semibold transition-all"
          >
            UPI Health Calculator
          </a>
          <a
            href="/admin/dashboard/settlementManagement"
            className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 text-xs font-semibold transition-all"
          >
            Settlement Clearance
          </a>
          <a
            href="/admin/dashboard/usdtTokenRate"
            className="px-3 py-1.5 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 text-violet-300 text-xs font-semibold transition-all"
          >
            Rates & Spread
          </a>
        </div>
      </div>

      {/* Core Infrastructure Nodes Status */}
      <div className="p-5 rounded-2xl bg-bp-card border border-bp-border space-y-4">
        <h2 className="font-semibold text-sm text-white flex items-center gap-2">
          <Server className="w-4 h-4 text-emerald-400" />
          Gateway Infrastructure Health
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-bp-border flex items-center justify-between">
            <div>
              <span className="font-semibold text-xs text-white block">Banking IMPS Host</span>
              <span className="text-[10px] text-gray-400">Latency: 42ms</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400">
              OPERATIONAL
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-bp-border flex items-center justify-between">
            <div>
              <span className="font-semibold text-xs text-white block">UPI 2.0 Switch</span>
              <span className="text-[10px] text-gray-400">Latency: 28ms</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400">
              OPERATIONAL
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-bp-border flex items-center justify-between">
            <div>
              <span className="font-semibold text-xs text-white block">TRON TRC-20 RPC</span>
              <span className="text-[10px] text-gray-400">Block height: 69281923</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400">
              SYNCHRONIZED
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-bp-border flex items-center justify-between">
            <div>
              <span className="font-semibold text-xs text-white block">Telegram Notification Bot</span>
              <span className="text-[10px] text-gray-400">Queue: 0 pending</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400">
              CONNECTED
            </span>
          </div>
        </div>
      </div>

      {/* Sentinel High-Priority Activity Feed */}
      <div className="p-5 rounded-2xl bg-bp-card border border-bp-border space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-bp-border">
          <h3 className="font-semibold text-xs text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            Security & Risk Sentinel Alerts
          </h3>
          <span className="text-[10px] text-gray-400 font-mono">Real-time fraud audit</span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="font-semibold text-white">Rapid Micro-Withdrawal Threshold</span>
                <p className="text-gray-400 text-[11px]">Merchant M_CRYPTOHUB triggered velocity rule: 18 payouts within 60 seconds.</p>
              </div>
            </div>
            <span className="text-amber-400 font-mono text-[10px] font-semibold">FLAGGED (AUTO-APPROVED)</span>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-bp-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="font-semibold text-white">Batch Settlement Cleared</span>
                <p className="text-gray-400 text-[11px]">SET-2026-0910-01 for 10,000 USDT settled to Tron wallet.</p>
              </div>
            </div>
            <span className="text-gray-400 font-mono text-[10px]">15:35 IST</span>
          </div>
        </div>
      </div>
    </div>
  );
};
