import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, UserCheck, Palette, ExternalLink } from 'lucide-react';
import { UserRole, ThemePreset } from '../types';

export const RoleSwitcherBar: React.FC = () => {
  const { role, setRole } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = location.pathname.startsWith('/admin');

  const themes: { id: ThemePreset; name: string }[] = [
    { id: 'dark', name: 'Dark' },
    { id: 'light', name: 'Light' },
    { id: 'ocean', name: 'Ocean' },
    { id: 'forest', name: 'Forest' },
    { id: 'royal', name: 'Royal' },
    { id: 'sunset', name: 'Sunset' },
    { id: 'cream', name: 'Cream' },
  ];

  const handleRoleChange = (r: UserRole) => {
    setRole(r);
    if (r === 'admin') {
      navigate('/admin/dashboard');
    } else {
      if (location.pathname.startsWith('/admin')) {
        navigate('/merchant/dashboard');
      }
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#0c0824]/95 backdrop-blur-md border border-violet-500/30 shadow-2xl rounded-2xl px-4 py-2 flex items-center gap-4 text-xs">
      <div className="flex items-center gap-2 pr-3 border-r border-white/10">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold text-violet-200 tracking-wider uppercase text-[10px]">Dev Controller</span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-gray-400">View Mode:</span>
        <button
          onClick={() => handleRoleChange('merchant_receiver')}
          className={`px-2.5 py-1 rounded-lg transition-all font-medium ${
            role === 'merchant_receiver' && !isAdmin 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
              : 'text-gray-300 hover:bg-white/5'
          }`}
        >
          Receiver (PayIn)
        </button>
        <button
          onClick={() => handleRoleChange('merchant_sender')}
          className={`px-2.5 py-1 rounded-lg transition-all font-medium ${
            role === 'merchant_sender' && !isAdmin 
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
              : 'text-gray-300 hover:bg-white/5'
          }`}
        >
          Sender (PayOut)
        </button>
        <button
          onClick={() => handleRoleChange('merchant_full')}
          className={`px-2.5 py-1 rounded-lg transition-all font-medium ${
            role === 'merchant_full' && !isAdmin 
              ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/30' 
              : 'text-gray-300 hover:bg-white/5'
          }`}
        >
          Full Access
        </button>
        <button
          onClick={() => handleRoleChange('merchant_bridge')}
          className={`px-2.5 py-1 rounded-lg transition-all font-medium ${
            role === 'merchant_bridge' && !isAdmin 
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30' 
              : 'text-gray-300 hover:bg-white/5'
          }`}
        >
          Bridge Enabled
        </button>
        <button
          onClick={() => handleRoleChange('admin')}
          className={`px-2.5 py-1 rounded-lg transition-all font-medium flex items-center gap-1 ${
            isAdmin 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' 
              : 'text-emerald-400 hover:bg-white/5'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Master Admin
        </button>
      </div>

      <div className="flex items-center gap-2 pl-3 border-l border-white/10">
        <Palette className="w-3.5 h-3.5 text-gray-400" />
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as ThemePreset)}
          className="bg-white/5 border border-white/10 text-gray-200 rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
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
