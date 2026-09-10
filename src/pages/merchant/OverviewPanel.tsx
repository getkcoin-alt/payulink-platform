import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  TrendingUp, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Zap, 
  Layers, 
  Coins, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Plus,
  Send,
  Link2,
  RefreshCw
} from 'lucide-react';
import { mockPayoutOrders, mockReceiveOrders } from '../../services/mockData';
import { useNavigate } from 'react-router-dom';

export const OverviewPanel: React.FC = () => {
  const { currentMerchant } = useAuth();
  const navigate = useNavigate();

  const totalPayoutVolume = mockPayoutOrders.reduce((acc, curr) => acc + curr.amount, 0);
  const totalReceiveVolume = mockReceiveOrders.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-transparent p-6 rounded-2xl border border-bp-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold font-display text-bp-text">
              Welcome back, {currentMerchant.merchantName}
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              KYC VERIFIED
            </span>
          </div>
          <p className="text-xs text-bp-muted mt-1">
            Merchant Code: <span className="font-mono text-bp-accent font-semibold">{currentMerchant.merchantCode}</span> • Payouts active with instant IMPS/UPI routing.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => navigate('/merchant/dashboard/payToUpi')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-bp-accent text-white hover:bg-bp-accent-hover text-xs font-semibold shadow-lg shadow-orange-500/20 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            Send Payout
          </button>
          <button
            onClick={() => navigate('/merchant/dashboard/paymentLinksGenerate')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-bp-card border border-bp-border hover:bg-white/[0.08] text-bp-text text-xs font-medium transition-all"
          >
            <Link2 className="w-3.5 h-3.5" />
            Create Link
          </button>
          <button
            onClick={() => navigate('/merchant/dashboard/settlementOnDemand')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-bp-card border border-bp-border hover:bg-white/[0.08] text-bp-text text-xs font-medium transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Instant Settle
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-bp-card border border-bp-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-bp-muted">24h Payout Volume</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-bp-text">₹{totalPayoutVolume.toLocaleString('en-IN')}</div>
            <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +14.2% vs yesterday
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-bp-card border border-bp-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-bp-muted">24h Collections (PayIn)</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-bp-text">₹{totalReceiveVolume.toLocaleString('en-IN')}</div>
            <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +8.5% vs yesterday
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-bp-card border border-bp-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-bp-muted">Success Rate (UPI/IMPS)</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-emerald-400">99.4%</div>
            <p className="text-[11px] text-bp-muted mt-1">
              Avg fulfillment: <span className="text-bp-text font-semibold font-mono">18 seconds</span>
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-bp-card border border-bp-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-bp-muted">Active Bridge Liquidity</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-bp-text">{currentMerchant.balanceUsdt.toLocaleString()} USDT</div>
            <p className="text-[11px] text-bp-muted mt-1">
              Equivalent to <span className="text-bp-text font-semibold font-mono">₹{(currentMerchant.balanceUsdt * 89.45).toLocaleString('en-IN')}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Payouts */}
        <div className="p-5 rounded-2xl bg-bp-card border border-bp-border space-y-4">
          <div className="flex items-center justify-between border-b border-bp-border pb-3">
            <h2 className="font-semibold text-sm text-bp-text flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-purple-400" />
              Recent Payout Orders
            </h2>
            <button
              onClick={() => navigate('/merchant/dashboard/payouts')}
              className="text-xs text-bp-accent hover:underline"
            >
              View all
            </button>
          </div>

          <div className="space-y-2.5">
            {mockPayoutOrders.slice(0, 4).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-bp-border hover:bg-white/[0.04] transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-bp-text">{order.merchantOrderNo}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-bp-muted">
                      {order.transferMethod}
                    </span>
                  </div>
                  <p className="text-[11px] text-bp-muted mt-0.5">{order.beneficiaryName} • {order.upiId || order.accountNumber}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-bp-text">₹{order.amount.toLocaleString('en-IN')}</span>
                  <div className="mt-0.5">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      order.status === 'completed'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : order.status === 'processing'
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Collections (Receive) */}
        <div className="p-5 rounded-2xl bg-bp-card border border-bp-border space-y-4">
          <div className="flex items-center justify-between border-b border-bp-border pb-3">
            <h2 className="font-semibold text-sm text-bp-text flex items-center gap-2">
              <ArrowDownLeft className="w-4 h-4 text-blue-400" />
              Recent Inward Collections
            </h2>
            <button
              onClick={() => navigate('/merchant/dashboard/receiveOrders')}
              className="text-xs text-bp-accent hover:underline"
            >
              View all
            </button>
          </div>

          <div className="space-y-2.5">
            {mockReceiveOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-bp-border hover:bg-white/[0.04] transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-bp-text">{order.merchantOrderNo}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-bp-muted">
                      {order.paymentMethod}
                    </span>
                  </div>
                  <p className="text-[11px] text-bp-muted mt-0.5">{order.customerName} • UTR: {order.utr || 'Pending'}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-emerald-400">+₹{order.amount.toLocaleString('en-IN')}</span>
                  <div className="mt-0.5">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      order.status === 'completed'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
