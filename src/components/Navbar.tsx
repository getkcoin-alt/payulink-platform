import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Search, 
  Bell, 
  Wallet, 
  Coins, 
  Send, 
  ShieldCheck, 
  MessageSquare, 
  ChevronDown,
  ExternalLink,
  Sun,
  Moon
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC<{ isAdmin?: boolean }> = ({ isAdmin = false }) => {
  const { currentMerchant, currentAdmin } = useAuth();
  const { theme, setTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-bp-border bg-bp-bg/90 backdrop-blur-md px-6 flex items-center justify-between transition-colors">
      {/* Left section: Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bp-muted" />
          <input
            type="text"
            placeholder={isAdmin ? "Search merchants, orders, UTR, addresses..." : "Search orders, UTR, payment links, customers..."}
            className="w-full bg-bp-input border border-bp-border text-bp-text placeholder-bp-muted rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-bp-accent transition-all"
          />
        </div>
      </div>

      {/* Center / Right stats: USDT ticker & Balances */}
      <div className="flex items-center gap-6">
        {/* Live USDT rate pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-bp-card border border-bp-border text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-bp-muted font-mono">USDT/INR:</span>
          <span className="font-semibold text-emerald-400 font-mono">₹89.45</span>
          <span className="text-[10px] text-emerald-500/80 font-mono">+0.18%</span>
        </div>

        {!isAdmin ? (
          /* Merchant Balances */
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-bp-card border border-bp-border text-xs">
              <Wallet className="w-3.5 h-3.5 text-bp-accent" />
              <div>
                <span className="text-[10px] text-bp-muted block leading-none">INR Balance</span>
                <span className="font-semibold font-mono text-bp-text">₹{currentMerchant.balanceInr.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {currentMerchant.bridgeEnabled && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-xs">
                <Coins className="w-3.5 h-3.5 text-violet-400" />
                <div>
                  <span className="text-[10px] text-violet-300/70 block leading-none">Bridge Tokens</span>
                  <span className="font-semibold font-mono text-violet-200">{currentMerchant.bridgeTokenBalance.toLocaleString()} TKN</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Admin Quick Metrics */
          <div className="hidden sm:flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
              <span className="text-[10px] text-emerald-300 block leading-none">System Volume 24h</span>
              <span className="font-semibold font-mono text-emerald-400">₹4.82 Cr</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs">
              <span className="text-[10px] text-blue-300 block leading-none">Active Merchants</span>
              <span className="font-semibold font-mono text-blue-400">148 Online</span>
            </div>
          </div>
        )}

        {/* Telegram Bot status pill */}
        {!isAdmin && currentMerchant.telegramBound && (
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[11px]">
            <Send className="w-3 h-3" />
            <span>@PayULink_Bot</span>
          </div>
        )}

        {/* Notifications & Theme */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-bp-card border border-bp-border text-bp-muted hover:text-bp-text transition-colors"
            title="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl bg-bp-card border border-bp-border text-bp-muted hover:text-bp-text transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-bp-accent" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-bp-card border border-bp-border shadow-2xl rounded-2xl p-4 text-xs z-50">
                <div className="flex items-center justify-between pb-2 border-b border-bp-border mb-2">
                  <span className="font-semibold text-bp-text">Recent Alerts</span>
                  <span className="text-[10px] text-bp-muted">All marked read</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2 rounded-lg bg-white/[0.02] border border-bp-border">
                    <p className="font-medium text-emerald-400">Payout Batch Completed</p>
                    <p className="text-bp-muted text-[11px]">ORD-OUT-9912 processed via UPI for ₹14,500.</p>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.02] border border-bp-border">
                    <p className="font-medium text-blue-400">Incoming Collection Confirmed</p>
                    <p className="text-bp-muted text-[11px]">₹5,000 received via dynamic UPI QR.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile avatar pill */}
          <div className="flex items-center gap-2.5 pl-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-bp-accent to-orange-400 flex items-center justify-center text-white font-bold text-xs shadow-md">
              {isAdmin ? 'A' : currentMerchant.merchantName.charAt(0)}
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <span className="block font-semibold text-xs text-bp-text">
                {isAdmin ? currentAdmin.username : currentMerchant.merchantName}
              </span>
              <span className="block font-mono text-[10px] text-bp-muted">
                {isAdmin ? 'Master Admin' : currentMerchant.merchantCode}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
