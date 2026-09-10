import React, { useState } from 'react';
import { Percent, TrendingUp, DollarSign, Check, Sliders } from 'lucide-react';

export const AdminRatesHub: React.FC = () => {
  const [baseRate, setBaseRate] = useState('89.45');
  const [spreadMargin, setSpreadMargin] = useState('0.25');
  const [buyBonus, setBuyBonus] = useState('0.50');
  const [maxDailyWithdraw, setMaxDailyWithdraw] = useState('5000000');

  const handleSaveRates = (e: React.FormEvent) => {
    e.preventDefault();
    alert('System economic rates and spread updated across all merchant nodes.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold font-display text-white">Rates, Spreads & Bonusing Configuration</h1>
        <p className="text-xs text-gray-400 mt-0.5">
          Real-time USDT to INR conversion pricing, liquidity maker incentives, and systemic limit thresholds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rate Settings Card */}
        <div className="p-6 rounded-2xl bg-bp-card border border-bp-border space-y-4">
          <h2 className="font-semibold text-sm text-white flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            Global Base Price & Margins
          </h2>

          <form onSubmit={handleSaveRates} className="space-y-4 text-xs">
            <div>
              <label className="text-gray-400 block mb-1">Base USDT/INR Index Price (₹)</label>
              <input
                type="number"
                step="0.01"
                required
                value={baseRate}
                onChange={(e) => setBaseRate(e.target.value)}
                className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-white font-mono font-bold text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-400 block mb-1">Spread Markup (%)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={spreadMargin}
                  onChange={(e) => setSpreadMargin(e.target.value)}
                  className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Liquidity Buy Bonus (%)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={buyBonus}
                  onChange={(e) => setBuyBonus(e.target.value)}
                  className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-400 block mb-1">Max Daily Automated Payout Ceiling (INR)</label>
              <input
                type="number"
                required
                value={maxDailyWithdraw}
                onChange={(e) => setMaxDailyWithdraw(e.target.value)}
                className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-500/20 transition-all mt-2"
            >
              Broadcast Rate Changes
            </button>
          </form>
        </div>

        {/* Live Calculation Preview */}
        <div className="p-6 rounded-2xl bg-bp-card border border-bp-border space-y-4 text-xs">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            Pricing Matrix Preview
          </h3>

          <div className="space-y-3 font-mono">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-bp-border flex justify-between items-center">
              <span className="text-gray-400">Customer Purchase Rate:</span>
              <span className="font-bold text-emerald-400 text-sm">
                ₹{(parseFloat(baseRate) * (1 + parseFloat(spreadMargin)/100)).toFixed(2)}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-bp-border flex justify-between items-center">
              <span className="text-gray-400">Merchant Payout Clear Rate:</span>
              <span className="font-bold text-white text-sm">
                ₹{parseFloat(baseRate).toFixed(2)}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-bp-border flex justify-between items-center">
              <span className="text-gray-400">Platform Spread Yield:</span>
              <span className="font-bold text-purple-400 text-sm">
                ₹{(parseFloat(baseRate) * (parseFloat(spreadMargin)/100)).toFixed(2)} / USDT
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
