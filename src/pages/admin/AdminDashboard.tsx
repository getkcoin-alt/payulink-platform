import React from 'react';
import { useParams } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { Navbar } from '../../components/Navbar';
import { useTheme } from '../../context/ThemeContext';
import { AdminCommandCenter } from './AdminCommandCenter';
import { AdminMerchantHub } from './AdminMerchantHub';
import { AdminOperationsHub } from './AdminOperationsHub';
import { AdminBridgeHub } from './AdminBridgeHub';
import { AdminRatesHub } from './AdminRatesHub';
import { AdminSettlementsHub } from './AdminSettlementsHub';
import { AdminStaffHub } from './AdminStaffHub';
import { SettingsPanel } from '../merchant/SettingsPanel';

export const AdminDashboard: React.FC = () => {
  const { section = 'commandCenter' } = useParams<{ section?: string }>();
  const { sidebarCollapsed, sidebarWidth } = useTheme();

  const renderAdminSection = () => {
    switch (section) {
      // Core
      case 'commandCenter':
      case 'overview':
      case 'analytics':
        return <AdminCommandCenter />;

      // Staff & RBAC Management
      case 'staffManagement':
      case 'staff':
      case 'rbac':
      case 'keyPeople':
      case 'users':
        return <AdminStaffHub />;

      // Merchants & Enterprises
      case 'merchantsList':
      case 'merchants':
      case 'merchantCancelRequests':
      case 'bridgeMerchants':
      case 'manualCreditDebit':
      case 'enterprises':
      case 'enterpriseBuyTokens':
        return <AdminMerchantHub />;

      // Operations & Inward/Outward Flows
      case 'depositHub':
      case 'upiOrderPool':
      case 'upiWithdrawMgmt':
      case 'bankWithdrawMgmt':
      case 'specialWithdrawMgmt':
      case 'tokenStatements':
      case 'bridgeStatementSearch':
      case 'postInrDeposit':
      case 'bridgePurchases':
      case 'withdrawalHub':
      case 'assignment':
        return <AdminOperationsHub />;

      // Bridge Tools & UPI Health
      case 'bridgeDashboard':
      case 'openPool':
      case 'bridgeSettings':
      case 'bridgeOrderStrategy':
      case 'bridgeBlockedUpis':
      case 'bridgeStranded':
      case 'withdrawUpiPool':
      case 'withdrawAccPool':
      case 'upiHealthCalculator':
      case 'depositInrUpiPool':
      case 'bridgeOperations':
      case 'upiHealth':
      case 'blockedUpis':
        return <AdminBridgeHub />;

      // Rates, Margins & Commission Slabs
      case 'sellBuyBonus':
      case 'upiWithdrawLimits':
      case 'usdtTokenRate':
      case 'rates':
      case 'enterpriseCommissionSlabs':
      case 'usdtManagement':
      case 'usdtWithdrawMgmt':
      case 'usdtHistory':
      case 'usdtAccountMgmt':
        return <AdminRatesHub />;

      // Settlements
      case 'settlementManagement':
      case 'enterpriseSettlementManagement':
      case 'settlementMgmt':
        return <AdminSettlementsHub />;

      // System & Themes
      case 'appearanceSettings':
        return <SettingsPanel initialSection="appearance" />;

      default:
        return <AdminCommandCenter />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050510] text-[#e2e8f0] bg-grid-pattern transition-colors">
      <AdminSidebar />
      <div 
        className="transition-all duration-300 flex flex-col min-h-screen"
        style={{ paddingLeft: sidebarCollapsed ? 70 : sidebarWidth }}
      >
        <Navbar isAdmin={true} />
        <main className="flex-1 p-6 pb-24 max-w-7xl w-full mx-auto">
          {renderAdminSection()}
        </main>
      </div>
    </div>
  );
};
