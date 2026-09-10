import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Activity, 
  Users, 
  Building, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Sparkles, 
  Layers, 
  Percent, 
  AlertOctagon, 
  FileText, 
  Cpu, 
  Sliders, 
  CheckSquare, 
  Ban, 
  Scale, 
  ChevronLeft, 
  ChevronRight,
  RotateCcw,
  Coins,
  Settings,
  Clock,
  QrCode,
  Link,
  ExternalLink,
  LogOut,
  Palette,
  Key
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sidebarCollapsed, setSidebarCollapsed, sidebarWidth } = useTheme();

  const currentSection = location.pathname.split('/')[3] || 'commandCenter';

  const navigateTo = (section: string) => {
    navigate(`/admin/dashboard/${section}`);
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

  // Exact navigation groups extracted from live admin bundle (AdminDashboard-CYTUpa2L.js)
  const groups: NavGroup[] = [
    {
      title: 'CORE PLATFORM',
      items: [
        { key: 'commandCenter', label: 'Command Center', icon: Activity, badge: 'Live' },
        { key: 'overview', label: 'System Overview', icon: Cpu },
      ]
    },
    {
      title: 'MERCHANT OPERATIONS',
      items: [
        { key: 'merchantsList', label: 'Live Merchants', icon: Users, badge: '54' },
        { key: 'merchantCancelRequests', label: 'Cancel Requests', icon: RotateCcw },
        { key: 'bridgeMerchants', label: 'Manual Credit/Debit', icon: Sliders },
        { key: 'settlementManagement', label: 'Settlements Queue', icon: Scale, badge: 'T+0' },
        { key: 'bridgePurchases', label: 'Token Purchase Orders', icon: Coins },
      ]
    },
    {
      title: 'CORE MERCHANT (BRIDGE TOOLS)',
      items: [
        { key: 'bridgeDashboard', label: 'Bridge Dashboard', icon: Sparkles },
        { key: 'openPool', label: 'Open Liquidity Pools', icon: Layers },
        { key: 'bridgeSettings', label: 'Bridge Settings & Limits', icon: Settings },
        { key: 'bridgeOrderStrategy', label: 'Order Strategy & Routing', icon: Cpu },
        { key: 'bridgeStatementSearch', label: 'Chunk Payments & Ledger', icon: FileText },
        { key: 'bridgeBlockedUpis', label: 'Block UPI Manager', icon: Ban },
        { key: 'bridgeStranded', label: 'Stranded Chunks & UTR', icon: AlertOctagon },
      ]
    },
    {
      title: 'INR MANAGEMENT',
      items: [
        { key: 'depositHub', label: 'Buy Token · INR Deposit', icon: ArrowDownCircle },
        { key: 'upiOrderPool', label: 'App Display Orders', icon: Layers },
        { key: 'upiWithdrawMgmt', label: 'UPI Withdrawal Queue', icon: ArrowUpCircle },
        { key: 'bankWithdrawMgmt', label: 'Bank Withdrawal (IMPS)', icon: Building },
        { key: 'specialWithdrawMgmt', label: 'Special Routing Offers', icon: Sparkles },
        { key: 'tokenStatements', label: 'Token Statement Feed', icon: FileText },
        { key: 'manualCreditDebit', label: 'Token Credit / Debit', icon: Sliders },
        { key: 'sellBuyBonus', label: 'Bonus & Rates (%)', icon: Percent },
        { key: 'upiWithdrawLimits', label: 'UPI Withdrawal Limits', icon: Clock },
      ]
    },
    {
      title: 'UPI OPERATIONS & HEALTH',
      items: [
        { key: 'withdrawUpiPool', label: 'UPI Withdrawal Pool', icon: Layers },
        { key: 'withdrawAccPool', label: 'UPI Account Handling', icon: Building },
        { key: 'upiHealthCalculator', label: 'UPI Health Calculator', icon: Cpu, badge: 'Risk' },
        { key: 'depositInrUpiPool', label: 'Live UPI Status & Feeds', icon: QrCode },
      ]
    },
    {
      title: 'USDT MANAGEMENT',
      items: [
        { key: 'usdtManagement', label: 'Buy (Deposit) USDT', icon: ArrowDownCircle },
        { key: 'usdtWithdrawMgmt', label: 'Sell (Withdrawal) USDT', icon: ArrowUpCircle },
        { key: 'usdtHistory', label: 'USDT Blockchain History', icon: Clock },
        { key: 'usdtTokenRate', label: 'Rate & Spread Margin', icon: Percent },
        { key: 'usdtAccountMgmt', label: 'USDT Address Pool', icon: QrCode },
      ]
    },
    {
      title: 'USERS & ENTERPRISE',
      items: [
        { key: 'users', label: 'All Users & Clients', icon: Users },
        { key: 'staffManagement', label: 'Key People (Staff RBAC)', icon: ShieldCheck },
        { key: 'enterprises', label: 'Enterprise Accounts', icon: Building },
        { key: 'enterpriseCommissionSlabs', label: 'Commission Slabs', icon: Percent },
        { key: 'enterpriseBuyTokens', label: 'Enterprise Token Purchase', icon: Coins },
        { key: 'enterpriseSettlementManagement', label: 'Enterprise Settlements', icon: Scale },
      ]
    },
    {
      title: 'SYSTEM & SETTINGS',
      items: [
        { key: 'postInrDeposit', label: 'Post INR Deposit Orders', icon: ArrowDownCircle },
        { key: 'appearanceSettings', label: 'Appearance & Themes', icon: Palette },
      ]
    }
  ];

  return (
    <aside
      className="fixed top-0 left-0 z-50 h-screen flex flex-col border-r border-white/[0.06] bg-[#0a0b1a] transition-all duration-300 select-none"
      style={{ width: sidebarCollapsed ? 70 : sidebarWidth }}
    >
      {/* Brand Header */}
      <div className={`h-16 px-4 flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} border-b border-white/[0.06] shrink-0`}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
          </div>
          {!sidebarCollapsed && (
            <div>
              <span className="font-display font-bold text-base text-white tracking-tight">PayuLink</span>
              <span className="block text-[9px] text-orange-400 font-bold tracking-[0.2em] uppercase">
                ADMIN PANEL
              </span>
            </div>
          )}
        </div>

        {!sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(true)}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-5 scrollbar-thin">
        {groups.map((group) => (
          <div key={group.title} className="space-y-0.5">
            {!sidebarCollapsed && (
              <p className="px-3 py-1 text-[10px] font-bold text-gray-400 tracking-wider uppercase font-mono">
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
                      ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30 font-semibold shadow-sm'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-orange-400' : 'group-hover:text-gray-200'}`} />
                  
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left truncate">{item.label}</span>
                      {item.badge && (
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full font-bold ${
                          isActive 
                            ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' 
                            : 'bg-white/10 text-gray-300'
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

      {/* Footer Controls */}
      <div className="p-3 border-t border-white/[0.06] space-y-1 shrink-0">
        {!sidebarCollapsed ? (
          <>
            <button
              onClick={() => navigate('/merchant/dashboard')}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Back to Merchant Portal</span>
            </button>

            <button
              onClick={() => alert('Logged out from admin panel.')}
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
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5"
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
