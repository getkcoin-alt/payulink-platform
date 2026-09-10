import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Coins, 
  TrendingUp, 
  RefreshCw, 
  AlertTriangle, 
  ArrowRightLeft, 
  Plus, 
  CheckCircle2,
  Lock,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockBridgePools } from '../../services/mockData';

export const BridgePanel: React.FC = () => {
  const { currentMerchant, updateMerchant } = useAuth();
  const [pools, setPools] = useState(mockBridgePools);
  const [showBuyModal, setShowBuyModal] = useState(false);

  // Buy token form
  const [buyAmountUsdt, setBuyAmountUsdt] = useState('1000');
  const liveRate = 89.45;
  const inrCost = (parseFloat(buyAmountUsdt || '0') * liveRate).toFixed(2);

  const handleBuyTokens = (e: React.FormEvent) => {
    e.preventDefault();
    const usdt = parseFloat(buyAmountUsdt);
    if (!usdt || usdt <= 0) return;

    updateMerchant({
      balanceUsdt: currentMerchant.balanceUsdt + usdt,
      bridgeTokenBalance: currentMerchant.bridgeTokenBalance + usdt
    });
    setShowBuyModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold font-display text-bp-text">P2P USDT / INR Liquidity Bridge</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20">
              BRIDGE ACTIVE
            </span>
          </div>
          <p className="text-xs text-bp-muted mt-0.5">
            Automated P2P order matching between USDT crypto deposits and INR instant UPI/IMPS payouts.
          </p>
        </div>

        <button
          onClick={() => setShowBuyModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:opacity-95 text-xs font-semibold shadow-lg shadow-violet-500/20 transition-all self-start"
        >
          <Coins className="w-3.5 h-3.5" />
          Buy Bridge Tokens
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-bp-card border border-bp-border space-y-2">
          <span className="text-xs text-bp-muted">Your Token Holdings</span>
          <div className="text-2xl font-bold font-mono text-violet-300">
            {currentMerchant.bridgeTokenBalance.toLocaleString()} TKN
          </div>
          <p className="text-[11px] text-bp-muted font-mono">
            Value: ₹{(currentMerchant.bridgeTokenBalance * liveRate).toLocaleString('en-IN')}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-bp-card border border-bp-border space-y-2">
          <span className="text-xs text-bp-muted">USDT/INR Bridge Index</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            ₹{liveRate}
          </div>
          <p className="text-[11px] text-emerald-400 font-mono">+0.18% Premium</p>
        </div>

        <div className="p-5 rounded-2xl bg-bp-card border border-bp-border space-y-2">
          <span className="text-xs text-bp-muted">Match Completion Rate</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            99.2%
          </div>
          <p className="text-[11px] text-bp-muted">Zero stranded chunks</p>
        </div>

        <div className="p-5 rounded-2xl bg-bp-card border border-bp-border space-y-2">
          <span className="text-xs text-bp-muted">Active P2P Pools</span>
          <div className="text-2xl font-bold font-mono text-bp-text">
            {pools.length} Open
          </div>
          <p className="text-[11px] text-bp-muted">130 participants matching</p>
        </div>
      </div>

      {/* Pools Table */}
      <div className="rounded-2xl bg-bp-card border border-bp-border overflow-hidden">
        <div className="p-4 border-b border-bp-border flex items-center justify-between">
          <h3 className="font-semibold text-xs text-bp-text flex items-center gap-2">
            <Layers className="w-4 h-4 text-violet-400" />
            Active Liquidity Pools
          </h3>
          <span className="text-[11px] text-bp-muted font-mono">Real-time matching engine</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-bp-muted">
            <thead className="bg-white/[0.02] border-b border-bp-border font-medium text-bp-text uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Pool Identifier</th>
                <th className="py-3.5 px-4">Token Type</th>
                <th className="py-3.5 px-4">Total Liquidity</th>
                <th className="py-3.5 px-4">Available Depth</th>
                <th className="py-3.5 px-4">Exchange Rate</th>
                <th className="py-3.5 px-4">Min - Max Order</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bp-border">
              {pools.map((pool) => (
                <tr key={pool.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-bp-text block">{pool.poolCode}</span>
                    <span className="text-[10px] text-bp-muted">{pool.name}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-violet-500/10 text-violet-400 font-semibold">
                      {pool.tokenType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-bp-text">
                    {pool.totalLiquidity.toLocaleString()} {pool.tokenType}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400">
                    {pool.availableLiquidity.toLocaleString()} {pool.tokenType}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-bp-text">
                    ₹{pool.rate}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px]">
                    {pool.minOrderSize.toLocaleString()} - {pool.maxOrderSize.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400">
                      {pool.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Buy Tokens Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-bp-bg border border-bp-border rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-bp-border pb-3">
              <h3 className="font-bold text-base text-bp-text flex items-center gap-2">
                <Coins className="w-5 h-5 text-violet-400" />
                Purchase Bridge Tokens
              </h3>
              <button onClick={() => setShowBuyModal(false)} className="text-bp-muted hover:text-bp-text">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleBuyTokens} className="space-y-4 text-xs">
              <div>
                <label className="block text-bp-muted mb-1 font-medium">Quantity (USDT / Token)</label>
                <input
                  type="number"
                  min="10"
                  step="any"
                  required
                  value={buyAmountUsdt}
                  onChange={(e) => setBuyAmountUsdt(e.target.value)}
                  className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-bp-text font-mono font-semibold text-sm focus:outline-none focus:border-bp-accent"
                />
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-bp-border space-y-2">
                <div className="flex justify-between text-bp-muted">
                  <span>Current USDT Price:</span>
                  <span className="font-mono text-bp-text">₹{liveRate}</span>
                </div>
                <div className="flex justify-between font-semibold text-bp-text pt-1 border-t border-white/5">
                  <span>Estimated Total INR:</span>
                  <span className="font-mono text-emerald-400 text-sm">₹{parseFloat(inrCost).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-lg shadow-violet-500/20 hover:opacity-95 transition-all mt-2"
              >
                Confirm Purchase & Mint Tokens
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
