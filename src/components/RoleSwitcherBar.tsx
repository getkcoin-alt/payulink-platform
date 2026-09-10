import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  Store, 
  Building2, 
  Coins, 
  LifeBuoy, 
  MessageSquare, 
  Terminal, 
  QrCode, 
  Palette,
  ChevronDown
} from 'lucide-react';
import { UserRole, ThemePreset } from '../types';

export const RoleSwitcherBar: React.FC = () => {
  const { role, setRole } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const themes: { id: ThemePreset; name: string }[] = [
    { id: 'dark', name: 'Dark' },
    { id: 'light', name: 'Light' },
    { id: 'ocean', name: 'Ocean' },
    { id: 'forest', name: 'Forest' },
    { id: 'royal', name: 'Royal' },
    { id: 'sunset', name: 'Sunset' },
    { id: 'cream', name: 'Cream' },
  ];

  const portals = [
    { id: 'merchant', name: 'Merchant', path: '/merchant/dashboard', icon: Store, color: 'text-orange-400' },
    { id: 'admin', name: 'Master Admin', path: '/admin/dashboard', icon: ShieldCheck, color: 'text-emerald-400' },
    { id: 'enterprise', name: 'Enterprise', path: '/enterprise/dashboard', icon: Building2, color: 'text-blue-400' },
    { id: 'p2p', name: 'Bharat P2P', path: '/p2p/dashboard', icon: Coins, color: 'text-teal-400' },
    { id: 'support', name: 'Support Desk', path: '/support', icon: LifeBuoy, color: 'text-cyan-400' },
    { id: 'discuss', name: 'Engine RFC', path: '/discuss', icon: MessageSquare, color: 'text-violet-400' },
    { id: 'playground', name: 'API Sandbox', path: '/playground', icon: Terminal, color: 'text-amber-400' },
    { id: 'pay', name: 'Checkout QR', path: '/pay/DEMO-LINK-101', icon: QrCode, color: 'text-pink-400' },
  ];

  const getCurrentPortal = () => {
    if (location.pathname.startsWith('/admin')) return 'admin';
    if (location.pathname.startsWith('/enterprise')) return 'enterprise';
    if (location.pathname.startsWith('/p2p')) return 'p2p';
    if (location.pathname.startsWith('/support')) return 'support';
    if (location.pathname.startsWith('/discuss')) return 'discuss';
    if (location.pathname.startsWith('/playground')) return 'playground';
    if (location.pathname.startsWith('/pay')) return 'pay';
    return 'merchant';
  };

  const currentPortal = getCurrentPortal();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#0c0824]/95 backdrop-blur-md border border-violet-500/30 shadow-2xl rounded-2xl px-3 py-2 flex items-center gap-3 text-xs max-w-[96vw] overflow-x-auto">
      <div className="flex items-center gap-2 pr-2.5 border-r border-white/10 shrink-0">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold text-violet-200 tracking-wider uppercase text-[10px]">Ecosystem Hub</span>
      </div>

      {/* Portal Buttons */}
      <div className="flex items-center gap-1 shrink-0">
        {portals.map(p => {
          const Icon = p.icon;
          const isActive = currentPortal === p.id;
          return (
            <button
              key={p.id}
              onClick={() => {
                if (p.id === 'admin') setRole('admin');
                else if (p.id === 'merchant') setRole('merchant_full');
                navigate(p.path);
              }}
              className={`px-2.5 py-1.5 rounded-lg transition-all font-medium flex items-center gap-1.5 whitespace-nowrap ${
                isActive 
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30 font-bold' 
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : p.color}`} />
              <span>{p.name}</span>
            </button>
          );
        })}
      </div>

      {/* Theme Selector */}
      <div className="flex items-center gap-2 pl-2.5 border-l border-white/10 shrink-0">
        <Palette className="w-3.5 h-3.5 text-gray-400" />
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as ThemePreset)}
          className="bg-white/5 border border-white/10 text-gray-200 rounded-lg px-2 py-1 focus:outline-none cursor-pointer text-xs"
        >
          {themes.map(t => (
            <option key={t.id} value={t.id} className="bg-gray-900 text-white">
              {t.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
