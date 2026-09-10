import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Ban, 
  Search, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Activity 
} from 'lucide-react';
import { mockBridgePools } from '../../services/mockData';

export const AdminBridgeHub: React.FC = () => {
  const [pools, setPools] = useState(mockBridgePools);
  const [blockedUpis, setBlockedUpis] = useState<string[]>([
    'fraud.scam12@paytm',
    'blacklisted.vpa@ybl',
    'disputed.merchant@okaxis'
  ]);
  const [newBlockedUpi, setNewBlockedUpi] = useState('');

  // UPI Health Calculator
  const [calcVpa, setCalcVpa] = useState('payu.deltapay@icici');
  const [calcResult, setCalcResult] = useState<{ score: number; status: string; rec: string } | null>({
    score: 98.6,
    status: 'OPTIMAL',
    rec: 'Reliable handle. No bank throttling detected.'
  });

  const handleAddBlocked = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlockedUpi.trim()) return;
    setBlockedUpis([...blockedUpis, newBlockedUpi.trim()]);
    setNewBlockedUpi('');
  };

  const handleRemoveBlocked = (upi: string) => {
    setBlockedUpis(blockedUpis.filter(u => u !== upi));
  };

  const calculateHealth = () => {
    if (!calcVpa) return;
    const isRisky = calcVpa.toLowerCase().includes('scam') || blockedUpis.includes(calcVpa);
    if (isRisky) {
      setCalcResult({
        score: 12.4,
        status: 'CRITICAL RISK',
        rec: 'Blacklisted or high dispute velocity. Reject automated settlement.'
      });
    } else {
      setCalcResult({
        score: 97.8,
        status: 'OPTIMAL',
        rec: 'High success probability (>99.4%) with low latency routing.'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold font-display text-white">Bridge & Liquidity Strategy Hub</h1>
        <p className="text-xs text-gray-400 mt-0.5">
          Configure P2P liquidity depth, inspect UPI handle health scores, and enforce global anti-fraud blacklists.
        </p>
      </div>

      {/* UPI Health Calculator */}
      <div className="p-6 rounded-2xl bg-bp-card border border-bp-border space-y-4">
        <h2 className="font-semibold text-sm text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          UPI Health & Success Probability Calculator
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2 flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter UPI VPA (e.g. merchant@icici)"
              value={calcVpa}
              onChange={(e) => setCalcVpa(e.target.value)}
              className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={calculateHealth}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-md shrink-0"
            >
              Analyze Health
            </button>
          </div>

          {calcResult && (
            <div className="p-3 rounded-xl bg-white/[0.02] border border-bp-border flex items-center justify-between text-xs">
              <div>
                <span className="text-gray-400 text-[10px] block">Health Score</span>
                <span className={`font-mono font-bold text-sm ${calcResult.score > 80 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {calcResult.score}% ({calcResult.status})
                </span>
              </div>
              <span className="text-[10px] text-gray-400 max-w-[120px] text-right">{calcResult.rec}</span>
            </div>
          )}
        </div>
      </div>

      {/* Blocked UPI Blacklist */}
      <div className="p-6 rounded-2xl bg-bp-card border border-bp-border space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-sm text-white flex items-center gap-2">
            <Ban className="w-4 h-4 text-red-400" />
            Global Blocked UPI Blacklist
          </h2>
          <span className="text-xs text-gray-400 font-mono">{blockedUpis.length} VPAs blocked</span>
        </div>

        <form onSubmit={handleAddBlocked} className="flex gap-2">
          <input
            type="text"
            required
            placeholder="Add fraudulent UPI ID to blacklist..."
            value={newBlockedUpi}
            onChange={(e) => setNewBlockedUpi(e.target.value)}
            className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-red-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition-all shrink-0"
          >
            Block VPA
          </button>
        </form>

        <div className="space-y-2 pt-2">
          {blockedUpis.map((upi) => (
            <div key={upi} className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-bp-border text-xs font-mono">
              <span className="text-gray-300">{upi}</span>
              <button
                onClick={() => handleRemoveBlocked(upi)}
                className="text-gray-500 hover:text-red-400 p-1"
                title="Remove from blacklist"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
