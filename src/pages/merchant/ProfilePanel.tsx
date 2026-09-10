import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Key, 
  CheckCircle2, 
  Building2, 
  Lock,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ProfilePanel: React.FC = () => {
  const { currentMerchant, updateMerchant } = useAuth();
  const [email, setEmail] = useState(currentMerchant.email);
  const [phone, setPhone] = useState(currentMerchant.contactPhone);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Password fields
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateMerchant({ email, contactPhone: phone });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      alert('Passwords do not match');
      return;
    }
    alert('Password updated successfully');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold font-display text-bp-text">Profile</h1>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
            MERCHANT ACCOUNT
          </span>
        </div>
        <p className="text-xs text-bp-muted mt-0.5">
          Manage your merchant profile, contact info, and password
        </p>
      </div>

      {/* Card 1: Merchant Info */}
      <div className="p-6 rounded-2xl bg-bp-card border border-white/[0.08] shadow-lg space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
          <h2 className="text-sm font-bold text-bp-text flex items-center gap-2">
            <Building2 className="w-4 h-4 text-orange-400" />
            Merchant Info
          </h2>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {currentMerchant.status.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <span className="text-[10px] font-mono text-bp-muted uppercase tracking-wider block">Merchant Code</span>
            <span className="text-sm font-bold font-mono text-orange-400 mt-1 block">
              {currentMerchant.merchantCode}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <span className="text-[10px] font-mono text-bp-muted uppercase tracking-wider block">Merchant Name</span>
            <span className="text-sm font-bold text-bp-text mt-1 block">
              {currentMerchant.merchantName}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <span className="text-[10px] font-mono text-bp-muted uppercase tracking-wider block">Merchant Type</span>
            <span className="text-sm font-bold text-bp-text mt-1 block">
              {currentMerchant.merchantType} (Receive + Send)
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <span className="text-[10px] font-mono text-bp-muted uppercase tracking-wider block">Credibility Score</span>
            <span className="text-sm font-bold font-mono text-emerald-400 mt-1 block">
              {currentMerchant.credibilityScore ?? 100} / 100
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <span className="text-[10px] font-mono text-bp-muted uppercase tracking-wider block">Success Rate</span>
            <span className="text-sm font-bold font-mono text-emerald-400 mt-1 block">
              {(currentMerchant.successRate ?? 100).toFixed(1)}%
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <span className="text-[10px] font-mono text-bp-muted uppercase tracking-wider block">Bridge Enabled</span>
            <span className="text-sm font-bold font-mono text-violet-400 mt-1 block">
              {currentMerchant.bridgeEnabled ? 'Yes (Active)' : 'No'}
            </span>
          </div>
        </div>
      </div>

      {/* Card 2: Contact & Settings */}
      <div className="p-6 rounded-2xl bg-bp-card border border-white/[0.08] shadow-lg space-y-4">
        <h2 className="text-sm font-bold text-bp-text flex items-center gap-2 pb-3 border-b border-white/[0.06]">
          <Mail className="w-4 h-4 text-orange-400" />
          Contact & Settings
        </h2>

        <form onSubmit={handleSaveContact} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-mono text-bp-muted block uppercase tracking-wider mb-1.5">
                Contact Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-bp-input border border-bp-border text-xs text-bp-text focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-bp-muted block uppercase tracking-wider mb-1.5">
                Contact Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-bp-input border border-bp-border text-xs text-bp-text focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {savedSuccess ? (
              <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4" /> Changes saved successfully
              </span>
            ) : <span />}

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs shadow-lg shadow-orange-500/20 transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Card 3: Change Password */}
      <div className="p-6 rounded-2xl bg-bp-card border border-white/[0.08] shadow-lg space-y-4">
        <h2 className="text-sm font-bold text-bp-text flex items-center gap-2 pb-3 border-b border-white/[0.06]">
          <Lock className="w-4 h-4 text-orange-400" />
          Change Password
        </h2>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] font-mono text-bp-muted block uppercase tracking-wider mb-1.5">
                Current Password
              </label>
              <input
                type="password"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-bp-input border border-bp-border text-xs text-bp-text focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-bp-muted block uppercase tracking-wider mb-1.5">
                New Password
              </label>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-bp-input border border-bp-border text-xs text-bp-text focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-bp-muted block uppercase tracking-wider mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-bp-input border border-bp-border text-xs text-bp-text focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-bp-text font-semibold text-xs transition-all"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
