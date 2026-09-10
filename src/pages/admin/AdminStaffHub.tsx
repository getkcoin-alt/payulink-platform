import React, { useState } from 'react';
import { 
  ShieldCheck, 
  UserPlus, 
  Search, 
  Filter, 
  Key, 
  Lock, 
  Mail, 
  User, 
  Building, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  EyeOff, 
  Copy, 
  Sparkles, 
  AlertTriangle,
  RotateCw,
  MoreVertical,
  ShieldAlert,
  Smartphone
} from 'lucide-react';

interface AdminStaffUser {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: 'SUPER_ADMIN' | 'FINANCE_ADMIN' | 'OPS_ADMIN' | 'SUPPORT_LEAD' | 'COMPLIANCE_OFFICER';
  department: string;
  status: 'ACTIVE' | 'SUSPENDED';
  twoFactorEnabled: boolean;
  lastLogin: string;
  createdAt: string;
  permissions: string[];
}

export const AdminStaffHub: React.FC = () => {
  const [users, setUsers] = useState<AdminStaffUser[]>([
    {
      id: 'adm_01',
      username: 'admin',
      fullName: 'Chief Superadmin',
      email: 'security@payulink.io',
      role: 'SUPER_ADMIN',
      department: 'Executive Operations',
      status: 'ACTIVE',
      twoFactorEnabled: true,
      lastLogin: 'Today, 21:44 IST (103.21.244.18)',
      createdAt: '2026-01-01',
      permissions: ['*']
    },
    {
      id: 'adm_02',
      username: 'treasury_head',
      fullName: 'Sunil Verma',
      email: 'treasury@payulink.io',
      role: 'FINANCE_ADMIN',
      department: 'Treasury & Settlement',
      status: 'ACTIVE',
      twoFactorEnabled: true,
      lastLogin: 'Today, 18:20 IST (103.21.244.19)',
      createdAt: '2026-02-14',
      permissions: ['settlements:approve', 'tokens:adjust', 'usdt:broadcast', 'finance:view']
    },
    {
      id: 'adm_03',
      username: 'bridge_ops_lead',
      fullName: 'Anya Sharma',
      email: 'ops@payulink.io',
      role: 'OPS_ADMIN',
      department: 'UPI & Bridge Operations',
      status: 'ACTIVE',
      twoFactorEnabled: true,
      lastLogin: 'Yesterday, 23:10 IST',
      createdAt: '2026-03-01',
      permissions: ['upi:manage', 'upi:recalculate', 'pool:block', 'suborders:claim']
    },
    {
      id: 'adm_04',
      username: 'dispute_arbitrator',
      fullName: 'Rajesh Nair',
      email: 'support-lead@payulink.io',
      role: 'SUPPORT_LEAD',
      department: 'Dispute Arbitration',
      status: 'ACTIVE',
      twoFactorEnabled: false,
      lastLogin: '3 days ago',
      createdAt: '2026-04-10',
      permissions: ['disputes:resolve', 'tickets:write', 'utr:lookup']
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [createdUserNotice, setCreatedUserNotice] = useState<any>(null);

  // New User Form State
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    role: 'OPS_ADMIN' as AdminStaffUser['role'],
    department: 'UPI & Bridge Operations',
    requireTwoFactor: true,
    permissions: ['upi:manage', 'pool:view']
  });

  const generatePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%^&*';
    let pass = '';
    for (let i = 0; i < 14; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, password: pass }));
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.email) {
      alert('Please complete all required fields.');
      return;
    }

    const newUser: AdminStaffUser = {
      id: `adm_${Date.now().toString().slice(-4)}`,
      username: formData.username.trim().toLowerCase(),
      fullName: formData.fullName.trim() || formData.username,
      email: formData.email.trim(),
      role: formData.role,
      department: formData.department,
      status: 'ACTIVE',
      twoFactorEnabled: formData.requireTwoFactor,
      lastLogin: 'Never (Pending First Login)',
      createdAt: new Date().toISOString().split('T')[0],
      permissions: formData.permissions
    };

    setUsers([newUser, ...users]);
    setCreatedUserNotice({
      username: newUser.username,
      password: formData.password,
      role: newUser.role,
      email: newUser.email
    });
    setIsModalOpen(false);
    
    // Reset form
    setFormData({
      username: '',
      fullName: '',
      email: '',
      password: '',
      role: 'OPS_ADMIN',
      department: 'UPI & Bridge Operations',
      requireTwoFactor: true,
      permissions: ['upi:manage', 'pool:view']
    });
  };

  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        if (u.username === 'admin') {
          alert('Cannot deactivate primary Superadmin account');
          return u;
        }
        return {
          ...u,
          status: u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE'
        };
      }
      return u;
    }));
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0e0f26] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white">Admin & Staff RBAC Management</h2>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Provision, manage and configure role-based permissions and 2FA for authorized personnel on <strong>admin.payulink.io</strong>
          </p>
        </div>

        <button
          onClick={() => {
            generatePassword();
            setIsModalOpen(true);
          }}
          className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/30 flex items-center gap-2 transition-all shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          Create New Admin User
        </button>
      </div>

      {/* Notice Card if a user was recently created */}
      {createdUserNotice && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold text-emerald-300">New Admin Account Provisioned Successfully!</span>
              <p className="text-gray-300 text-[11px] mt-0.5">
                Username: <strong className="text-white font-mono">{createdUserNotice.username}</strong> | Password: <strong className="text-emerald-300 font-mono">{createdUserNotice.password}</strong> | Role: <span className="font-bold text-white">{createdUserNotice.role}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(`PayuLink Admin Login:\nURL: https://admin.payulink.io/login\nUsername: ${createdUserNotice.username}\nPassword: ${createdUserNotice.password}`);
                setCopiedKey(true);
                setTimeout(() => setCopiedKey(false), 2000);
              }}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" />
              {copiedKey ? 'Copied!' : 'Copy Credentials'}
            </button>
            <button
              onClick={() => setCreatedUserNotice(null)}
              className="px-2.5 py-1.5 text-gray-400 hover:text-white"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#0b0b1c] border border-white/5 rounded-2xl p-4">
          <span className="text-xs text-gray-400">Total Admin Accounts</span>
          <div className="text-xl font-bold text-white mt-1">{users.length} Active Staff</div>
          <span className="text-[10px] text-emerald-400">100% RBAC Covered</span>
        </div>
        <div className="bg-[#0b0b1c] border border-white/5 rounded-2xl p-4">
          <span className="text-xs text-gray-400">Superadmin Accounts</span>
          <div className="text-xl font-bold text-orange-400 mt-1">
            {users.filter(u => u.role === 'SUPER_ADMIN').length} Superadmins
          </div>
          <span className="text-[10px] text-gray-400">Restricted Root Access</span>
        </div>
        <div className="bg-[#0b0b1c] border border-white/5 rounded-2xl p-4">
          <span className="text-xs text-gray-400">2FA / TOTP Enforcement</span>
          <div className="text-xl font-bold text-emerald-400 mt-1">
            {Math.round((users.filter(u => u.twoFactorEnabled).length / users.length) * 100)}%
          </div>
          <span className="text-[10px] text-gray-400">Google Authenticator Required</span>
        </div>
        <div className="bg-[#0b0b1c] border border-white/5 rounded-2xl p-4">
          <span className="text-xs text-gray-400">Active Audit Logging</span>
          <div className="text-xl font-bold text-cyan-400 mt-1">100% Enforced</div>
          <span className="text-[10px] text-cyan-300">IP & Session Monitored</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#0b0b1c] p-3 rounded-2xl border border-white/5 text-xs">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search admin users by username, name, email..."
            className="w-full bg-[#12122b] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Role:
          </span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-[#12122b] border border-white/10 text-white rounded-xl px-3 py-2 focus:outline-none"
          >
            <option value="ALL">All Roles</option>
            <option value="SUPER_ADMIN">Super Admin</option>
            <option value="FINANCE_ADMIN">Finance Admin</option>
            <option value="OPS_ADMIN">Ops Admin</option>
            <option value="SUPPORT_LEAD">Support Lead</option>
            <option value="COMPLIANCE_OFFICER">Compliance Officer</option>
          </select>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-[#0b0b1c] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#121226] text-gray-400 border-b border-white/5 font-semibold">
              <tr>
                <th className="py-3 px-4">Admin User</th>
                <th className="py-3 px-4">Role & Department</th>
                <th className="py-3 px-4">2FA Security</th>
                <th className="py-3 px-4">Last Activity</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map(u => (
                <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-600/20 border border-orange-500/30 flex items-center justify-center font-bold text-orange-400">
                        {u.username[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span>{u.fullName}</span>
                          <span className="font-mono text-gray-400 text-[11px]">(@{u.username})</span>
                        </div>
                        <div className="text-[11px] text-gray-400">{u.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      u.role === 'SUPER_ADMIN' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      u.role === 'FINANCE_ADMIN' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      u.role === 'OPS_ADMIN' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    }`}>
                      {u.role}
                    </span>
                    <div className="text-[11px] text-gray-400 mt-0.5">{u.department}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    {u.twoFactorEnabled ? (
                      <span className="text-emerald-400 flex items-center gap-1 text-[11px] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Enforced
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-1 text-[11px] font-semibold">
                        <AlertTriangle className="w-3.5 h-3.5" /> Optional
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-gray-400 text-[11px]">
                    {u.lastLogin}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      u.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {u.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => toggleUserStatus(u.id)}
                      className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-gray-300 font-medium transition-all"
                    >
                      {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create New Admin User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0f26] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-orange-400" />
                <h3 className="font-bold text-white text-base">Provision New Admin User</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 font-medium block mb-1">Username *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. karnveer_admin"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full bg-[#141432] border border-white/10 rounded-xl px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-1">Full Name / Nickname</label>
                  <input
                    type="text"
                    placeholder="e.g. Karnveer Singh"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#141432] border border-white/10 rounded-xl px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 font-medium block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="admin-user@payulink.io"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#141432] border border-white/10 rounded-xl px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 font-medium block mb-1">Assigned Role *</label>
                  <select
                    value={formData.role}
                    onChange={(e: any) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-[#141432] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="SUPER_ADMIN">SUPER_ADMIN (Full Root)</option>
                    <option value="FINANCE_ADMIN">FINANCE_ADMIN (Treasury & Balances)</option>
                    <option value="OPS_ADMIN">OPS_ADMIN (UPI & Chunks)</option>
                    <option value="SUPPORT_LEAD">SUPPORT_LEAD (Disputes)</option>
                    <option value="COMPLIANCE_OFFICER">COMPLIANCE_OFFICER (AML)</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-[#141432] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="Executive Operations">Executive Operations</option>
                    <option value="Treasury & Settlement">Treasury & Settlement</option>
                    <option value="UPI & Bridge Operations">UPI & Bridge Operations</option>
                    <option value="Dispute Arbitration">Dispute Arbitration</option>
                    <option value="Risk & Security">Risk & Security</option>
                  </select>
                </div>
              </div>

              {/* Password Generator */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-gray-300 font-medium">Initial Password *</label>
                  <button
                    type="button"
                    onClick={generatePassword}
                    className="text-[11px] text-orange-400 hover:underline flex items-center gap-1"
                  >
                    <RotateCw className="w-3 h-3" /> Regenerate
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-[#141432] border border-white/10 rounded-xl pl-3 pr-10 py-2 font-mono text-white focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* 2FA Toggle */}
              <div className="bg-[#141432] p-3 rounded-xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-orange-400" />
                  <div>
                    <span className="font-semibold text-white block">Enforce 2FA (TOTP)</span>
                    <span className="text-[10px] text-gray-400">User will be prompted to link Google Authenticator upon first login</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.requireTwoFactor}
                  onChange={(e) => setFormData({ ...formData, requireTwoFactor: e.target.checked })}
                  className="rounded accent-orange-500 w-4 h-4"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl font-bold shadow-lg shadow-orange-500/30"
                >
                  Create Admin User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
