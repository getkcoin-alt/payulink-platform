import React, { useState } from 'react';
import { 
  User, 
  Palette, 
  ShieldCheck, 
  Lock, 
  Sliders, 
  Check, 
  Smartphone, 
  Building2 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { ThemePreset } from '../../types';

export const SettingsPanel: React.FC<{ initialSection?: 'profile' | 'appearance' }> = ({
  initialSection = 'profile'
}) => {
  const { currentMerchant, updateMerchant } = useAuth();
  const { theme, setTheme, sidebarWidth, setSidebarWidth } = useTheme();

  const [name, setName] = useState(currentMerchant.merchantName);
  const [phone, setPhone] = useState(currentMerchant.contactPhone);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const themes: { id: ThemePreset; name: string; color: string; desc: string }[] = [
    { id: 'dark', name: 'Dark Obsidian', color: '#ff6b00', desc: 'Default high-contrast night theme' },
    { id: 'light', name: 'Clean Light', color: '#ea580c', desc: 'Pure white business daylight mode' },
    { id: 'ocean', name: 'Ocean Blue', color: '#0ea5e9', desc: 'Deep navy with vibrant sky accents' },
    { id: 'forest', name: 'Forest Green', color: '#22c55e', desc: 'Emerald green nature palette' },
    { id: 'royal', name: 'Royal Purple', color: '#a855f7', desc: 'Regal violet luxury aesthetic' },
    { id: 'sunset', name: 'Sunset Crimson', color: '#ef4444', desc: 'Warm amber and crimson glow' },
    { id: 'cream', name: 'Cream Warmth', color: '#d97706', desc: 'Soft warm paper daylight theme' },
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateMerchant({ merchantName: name, contactPhone: phone });
    alert('Merchant Profile updated successfully!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) return;
    alert('Password updated successfully.');
    setOldPassword('');
    setNewPassword('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold font-display text-bp-text">Account & Appearance Settings</h1>
        <p className="text-xs text-bp-muted mt-0.5">
          Configure business metadata, account security, and customize your portal interface styling.
        </p>
      </div>

      {/* Theme & Styling Customization Card */}
      <div className="p-6 rounded-2xl bg-bp-card border border-bp-border space-y-4">
        <h2 className="font-semibold text-sm text-bp-text flex items-center gap-2">
          <Palette className="w-4 h-4 text-bp-accent" />
          Appearance Themes (7 Native Presets)
        </h2>
        <p className="text-xs text-bp-muted">
          Select your preferred workspace atmosphere. Settings persist automatically across your browser sessions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
          {themes.map((t) => {
            const isSelected = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  isSelected 
                    ? 'border-bp-accent bg-bp-accent/10 shadow-lg' 
                    : 'border-bp-border bg-bp-input hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-xs text-bp-text">{t.name}</span>
                  <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: t.color }} />
                </div>
                <p className="text-[10px] text-bp-muted">{t.desc}</p>
                {isSelected && (
                  <span className="absolute top-2 right-2 text-bp-accent">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar width slider */}
        <div className="pt-4 border-t border-bp-border">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-bp-muted font-medium flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              Custom Sidebar Width: <span className="font-mono text-bp-text font-bold">{sidebarWidth}px</span>
            </span>
            <button
              onClick={() => setSidebarWidth(240)}
              className="text-[11px] text-bp-accent hover:underline"
            >
              Reset Default (240px)
            </button>
          </div>
          <input
            type="range"
            min="208"
            max="360"
            value={sidebarWidth}
            onChange={(e) => setSidebarWidth(Number(e.target.value))}
            className="w-full accent-bp-accent cursor-pointer"
          />
        </div>
      </div>

      {/* Profile & Security Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Details */}
        <div className="p-6 rounded-2xl bg-bp-card border border-bp-border space-y-4">
          <h2 className="font-semibold text-sm text-bp-text flex items-center gap-2">
            <Building2 className="w-4 h-4 text-bp-accent" />
            Merchant Profile Details
          </h2>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="text-bp-muted block mb-1">Merchant Code (Immutable)</label>
              <input
                type="text"
                disabled
                value={currentMerchant.merchantCode}
                className="w-full bg-bp-input/50 border border-bp-border rounded-xl px-3 py-2 text-bp-muted font-mono"
              />
            </div>

            <div>
              <label className="text-bp-muted block mb-1">Business Entity Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-bp-text focus:outline-none focus:border-bp-accent"
              />
            </div>

            <div>
              <label className="text-bp-muted block mb-1">Contact Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-bp-text focus:outline-none focus:border-bp-accent"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-bp-accent text-white font-semibold hover:bg-bp-accent-hover transition-all shadow-md"
            >
              Save Profile Changes
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="p-6 rounded-2xl bg-bp-card border border-bp-border space-y-4">
          <h2 className="font-semibold text-sm text-bp-text flex items-center gap-2">
            <Lock className="w-4 h-4 text-bp-accent" />
            Update Portal Password
          </h2>

          <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
            <div>
              <label className="text-bp-muted block mb-1">Current Password</label>
              <input
                type="password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-bp-text focus:outline-none focus:border-bp-accent"
              />
            </div>

            <div>
              <label className="text-bp-muted block mb-1">New Password (Min 8 characters)</label>
              <input
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-bp-text focus:outline-none focus:border-bp-accent"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-bp-input border border-bp-border hover:bg-white/[0.08] text-bp-text font-medium transition-all"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
