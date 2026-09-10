import React from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { useTheme } from '../../context/ThemeContext';
import { OverviewPanel } from './OverviewPanel';
import { PayoutsPanel } from './PayoutsPanel';
import { ReceivePanel } from './ReceivePanel';
import { PaymentLinksPanel } from './PaymentLinksPanel';
import { BridgePanel } from './BridgePanel';
import { BridgeDashboardPanel } from './BridgeDashboardPanel';
import { BridgeSubOrdersPanel } from './BridgeSubOrdersPanel';
import { BuyTokenPanel } from './BuyTokenPanel';
import { SettlementsPanel } from './SettlementsPanel';
import { SettlementOnDemandPanel } from './SettlementOnDemandPanel';
import { DisputesPanel } from './DisputesPanel';
import { DeveloperPanel } from './DeveloperPanel';
import { SettingsPanel } from './SettingsPanel';
import { ProfilePanel } from './ProfilePanel';
import { AccountConfigPanel } from './AccountConfigPanel';

export const MerchantDashboard: React.FC = () => {
  const { section = 'bridgeDashboard' } = useParams<{ section?: string }>();
  const { sidebarCollapsed, sidebarWidth } = useTheme();

  const renderSection = () => {
    switch (section) {
      // Summary
      case 'bridgeDashboard':
        return <BridgeDashboardPanel />;
      case 'bridgeTokenOverview':
      case 'analytics':
        return <OverviewPanel />;

      // Payouts & Send
      case 'payToUpi':
        return <PayoutsPanel initialMethod="UPI" title="Pay to UPI" />;
      case 'payToAcc':
        return <PayoutsPanel initialMethod="BANK" title="Pay to Bank ACC" />;
      case 'payToSpecial':
        return <PayoutsPanel initialMethod="SPECIAL" title="Pay to Special Routing" />;
      case 'payouts':
        return <PayoutsPanel title="All Payout Orders" />;

      // Receive & Payin
      case 'bridgeReceiveOrders':
      case 'receiveInUpi':
        return <ReceivePanel paymentMethod="UPI" title="Receive in UPI Orders" />;
      case 'receiveInAcc':
        return <ReceivePanel paymentMethod="BANK" title="Receive in Bank ACC (Virtual Account)" />;
      case 'receiveOrders':
        return <ReceivePanel title="Receive Orders Journal" />;
      case 'deletedOrders':
        return <ReceivePanel title="Cancelled / Expired Inward Orders" />;

      // Sub Orders & Bridge
      case 'bridgeSubOrders':
        return <BridgeSubOrdersPanel />;
      case 'bridgePool':
      case 'openPool':
      case 'bridgeTokens':
      case 'bridgeTokenHistory':
      case 'bridgeMismatchedOrders':
        return <BridgePanel />;

      // Tokenomics
      case 'buyToken':
      case 'buyTokenOrders':
      case 'buyTokenHistory':
        return <BuyTokenPanel />;

      // Payment Links
      case 'paymentLinksGenerate':
        return <PaymentLinksPanel mode="generate" />;
      case 'paymentLinksActive':
      case 'customersActive':
      case 'customersUnfulfilled':
        return <PaymentLinksPanel mode="active" />;
      case 'paymentLinksAll':
      case 'paymentLinksPoolOrder':
        return <PaymentLinksPanel mode="all" />;

      // Settlements
      case 'settlementStandard':
        return <SettlementsPanel initialMode="standard" />;
      case 'settlementOnDemand':
        return <SettlementOnDemandPanel />;

      // Disputes
      case 'dispute':
        return <DisputesPanel />;

      // Developer
      case 'testMode':
        return <DeveloperPanel initialTab="playground" />;
      case 'apiKey':
      case 'apiDocumentation':
        return <DeveloperPanel initialTab="credentials" />;
      case 'accountConfig':
        return <AccountConfigPanel />;

      // Account & Setting
      case 'profile':
        return <ProfilePanel />;
      case 'appearanceSettings':
        return <SettingsPanel initialSection="appearance" />;

      default:
        return <BridgeDashboardPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-bp-bg text-bp-text bg-grid-pattern transition-colors">
      <Sidebar />
      <div 
        className="transition-all duration-300 flex flex-col min-h-screen"
        style={{ paddingLeft: sidebarCollapsed ? 70 : sidebarWidth }}
      >
        <Navbar />
        <main className="flex-1 p-6 pb-24 max-w-7xl w-full mx-auto">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};
