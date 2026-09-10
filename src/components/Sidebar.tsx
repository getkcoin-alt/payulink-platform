import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Send, 
  Download, 
  QrCode, 
  Building2, 
  ListFilter, 
  Link2, 
  Layers, 
  Coins, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  Scale, 
  Code2, 
  Key, 
  FileCode2, 
  Settings, 
  Palette, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  RefreshCw,
  PlusCircle,
  FileCheck2,
  Sliders,
  Sun,
  Moon,
  LogOut,
  Users,
  Globe
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentMerchant } = useAuth();
  const { sidebarCollapsed, setSidebarCollapsed, sidebarWidth, theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const currentSection = location.pathname.split('/')[2] || location.pathname.split('/')[3] || 'bridgeDashboard';

  const navigateTo = (section: string) => {
    navigate(`/merchant/dashboard/${section}`);
  };

  interface NavItem {
    key: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }

  interface NavGroup {
    title: string;
    items: NavItem[];
  }

  const groups: NavGroup[] = [
    {
      title: 'SUMMARY',
      items: [
        { key: 'bridgeDashboard', label: 'Dashboard', icon: Sparkles, badge: 'Live' },
        { key: 'bridgeTokenOverview', label: 'Overview', icon: LayoutDashboard },
        { key: 'analytics', label: 'Analytics', icon: TrendingUp },
      ]
    },
    {
      title: 'TRANSACTION',
      items: [
        { key: 'payToUpi', label: 'Send', icon: Send },
        { key: 'bridgeReceiveOrders', label: 'Receive', icon: Download },
        { key: 'bridgeSubOrders', label: 'Order', icon: ListFilter, badge: '11' },
        { key: 'bridgeTokenHistory', label: 'History', icon: Clock },
        { key: 'dispute', label: 'Dispute', icon: AlertTriangle },
      ]
    },
    {
      title: 'TOKENOMICS',
      items: [
        { key: 'buyToken', label: 'Buy Token', icon: Coins },
        { key: 'buyTokenOrders', label: 'Order', icon: ListFilter },
        { key: 'buyTokenHistory', label: 'History', icon: Clock },
      ]
    },
    {
      title: 'SETTLEMENT',
      items: [
        { key: 'settlementStandard', label: 'Standard', icon: Clock },
        { key: 'settlementOnDemand', label: 'On-Demand', icon: Scale, badge: 'Instant' },
      ]
    },
    {
      title: 'PAYMENT LINKS',
      items: [
        { key: 'paymentLinksGenerate', label: 'Create Payment Link', icon: PlusCircle },
        { key: 'paymentLinksPoolOrder', label: 'Create Pool Order', icon: Layers },
        { key: 'paymentLinksAll', label: 'All', icon: FileCheck2 },
        { key: 'paymentLinksActive', label: 'Order', icon: Link2 },
      ]
    },
    {
      title: 'CUSTOMER',
      items: [
        { key: 'customersActive', label: 'Active', icon: Users },
        { key: 'customersUnfulfilled', label: 'Unfulfilled', icon: Clock },
      ]
    },
    {
      title: 'DEVELOPER',
      items: [
        { key: 'apiDocumentation', label: 'API Documentation', icon: FileCode2 },
        { key: 'testMode', label: 'Test Mode', icon: Code2, badge: 'Sandbox' },
        { key: 'apiKey', label: 'API Key', icon: Key },
      ]
    },
    {
      title: 'ACCOUNT & SETTING',
      items: [
        { key: 'profile', label: 'Profile', icon: User },
        { key: 'accountConfig', label: 'Config', icon: Settings },
        { key: 'appearanceSettings', label: 'Appearance', icon: Palette },
      ]
    }
  ];

  return (
    <aside
      className="fixed top-0 left-0 z-50 h-screen flex flex-col border-r border-bp-border bg-bp-sidebar transition-all duration-300 select-none"
      style={{ width: sidebarCollapsed ? 70 : sidebarWidth }}
    >
      {/* Brand Header */}
      <div className={`h-16 px-4 flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} border-b border-bp-border shrink-0`}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white font-bold text-sm">
            P
          </div>
          {!sidebarCollapsed && (
            <div>
              <span className="font-display font-bold text-base text-bp-text tracking-tight">PayuLink</span>
              <span className="block text-[9px] text-orange-400 font-mono tracking-wider uppercase font-semibold">MERCHANT</span>
            </div>
          )}
        </div>

        {!sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(true)}
            className="p-1 rounded-lg text-bp-muted hover:text-bp-text hover:bg-white/5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Merchant Info Card (Mazer Infotech) */}
      {!sidebarCollapsed && (
        <div className="mx-3 my-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] space-y-2 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-orange-500/15 flex items-center justify-center text-orange-400 font-bold text-xs shrink-0">
              M
            </div>
            <div className="truncate">
              <span className="block font-bold text-xs text-bp-text truncate">
                {currentMerchant.merchantName}
              </span>
              <span className="block font-mono text-[10px] text-orange-400">
                {currentMerchant.merchantCode}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-white/[0.04]">
            <span className="text-[10px] text-bp-muted">Full Access</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-400 font-medium">Receive + Send</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-5 scrollbar-thin">
        {groups.map((group) => (
          <div key={group.title} className="space-y-0.5">
            {!sidebarCollapsed && (
              <p className="px-3 py-1 text-[10px] font-semibold text-bp-muted tracking-wider uppercase font-mono">
                {group.title}
              </p>
            )}

            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => navigateTo(item.key)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={`group relative w-full flex items-center gap-2.5 ${
                    sidebarCollapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2'
                  } rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 font-semibold shadow-sm'
                      : 'text-bp-muted hover:text-bp-text hover:bg-white/[0.03]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-orange-400' : 'group-hover:text-bp-text'}`} />
                  
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left truncate">{item.label}</span>
                      {item.badge && (
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full font-semibold ${
                          isActive ? 'bg-orange-500/20 text-orange-400' : 'bg-white/10 text-bp-muted'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Controls: Language, Theme Toggle, Logout */}
      <div className="p-3 border-t border-bp-border space-y-1 shrink-0">
        {!sidebarCollapsed ? (
          <>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-bp-muted">
              <Globe className="w-3.5 h-3.5" />
              <span>🇬🇧 English</span>
            </div>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-bp-muted hover:text-bp-text hover:bg-white/[0.04] transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            <button
              onClick={() => alert('Logged out successfully.')}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-rose-400/80 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="p-2 rounded-xl text-bp-muted hover:text-bp-text hover:bg-white/5"
              title="Expand Sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
