import React, { createContext, useContext, useState } from 'react';
import { MerchantUser, AdminUser, UserRole } from '../types';
import { mockMerchants } from '../services/mockData';

interface AuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentMerchant: MerchantUser;
  currentAdmin: AdminUser;
  updateMerchant: (updates: Partial<MerchantUser>) => void;
}

const mockAdminUser: AdminUser = {
  id: 'adm_01',
  username: 'superadmin_ops',
  email: 'security@payulink.io',
  role: 'super_admin',
  permissions: ['*']
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('merchant_full');
  const [currentMerchant, setCurrentMerchant] = useState<MerchantUser>(mockMerchants[0]);
  const [currentAdmin] = useState<AdminUser>(mockAdminUser);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === 'merchant_receiver') {
      setCurrentMerchant({
        ...mockMerchants[2],
        merchantType: 'receive',
        bridgeEnabled: false
      });
    } else if (newRole === 'merchant_sender') {
      setCurrentMerchant({
        ...mockMerchants[1],
        merchantType: 'send',
        bridgeEnabled: false
      });
    } else if (newRole === 'merchant_full') {
      setCurrentMerchant({
        ...mockMerchants[0],
        merchantType: 'both',
        bridgeEnabled: false
      });
    } else if (newRole === 'merchant_bridge') {
      setCurrentMerchant({
        ...mockMerchants[0],
        merchantType: 'both',
        bridgeEnabled: true
      });
    }
  };

  const updateMerchant = (updates: Partial<MerchantUser>) => {
    setCurrentMerchant(prev => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{
      role,
      setRole,
      currentMerchant,
      currentAdmin,
      updateMerchant
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
