import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, ShieldCheck, User, Lock, Eye, EyeOff, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { setRole } = useAuth();
  
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setRole('admin');
      localStorage.setItem('adminUser', JSON.stringify({
        id: 'adm_01',
        username: username,
        role: 'SUPER_ADMIN',
        loginTime: new Date().toISOString()
      }));
      navigate('/admin/dashboard');
    }, 600);
  };

  const handleQuickLogin = (user: string, roleTitle: string) => {
    setUsername(user);
    setPassword('MazerAdmin2026!');
    setRole('admin');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center px-4 py-12 font-sans selection:bg-orange-500/30">
      <div className="max-w-md w-full">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-xl shadow-orange-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">PayuLink</span>
          </Link>

          <div className="flex items-center justify-center gap-2 mt-2">
            <Shield className="w-5 h-5 text-orange-400" />
            <h1 className="text-xl font-bold text-white">Admin Portal</h1>
          </div>
          <p className="text-gray-400 text-xs mt-1">Secure access for authorized personnel only</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0b0b1c] rounded-2xl p-8 border border-white/10 shadow-2xl space-y-6">
          <h2 className="text-xl font-bold text-white text-center">Administrator Login</h2>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
            <p className="text-orange-400 text-xs font-semibold mb-0.5">🔒 Authorized Access Only</p>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              All login attempts are logged and monitored. IP address: <code className="text-white font-mono">103.21.244.18</code>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-300 font-medium mb-1.5">Username</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  className="w-full bg-[#12122b] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-[#12122b] border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Login to Admin Panel</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Profiles */}
          <div className="border-t border-white/5 pt-4 space-y-2">
            <span className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider block text-center">
              Quick Role Shortcuts
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <button
                onClick={() => handleQuickLogin('admin', 'Super Admin')}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 hover:text-white text-left transition-all"
              >
                <div className="font-bold text-orange-400">Super Admin</div>
                <div className="text-[10px] text-gray-500">@admin</div>
              </button>
              <button
                onClick={() => handleQuickLogin('ops_admin', 'Operations Lead')}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 hover:text-white text-left transition-all"
              >
                <div className="font-bold text-blue-400">Ops Admin</div>
                <div className="text-[10px] text-gray-500">@bridge_ops</div>
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-orange-500/5 border border-orange-500/10 text-[11px] text-gray-400">
            <span className="text-orange-400 font-bold block mb-0.5">🔒 Security Notice</span>
            All admin activities are logged and monitored. Unauthorized access attempts will be reported.
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/merchant/dashboard" className="text-gray-400 hover:text-orange-400 text-xs transition-colors">
            ← Back to Merchant Portal
          </Link>
        </div>
      </div>
    </div>
  );
};
