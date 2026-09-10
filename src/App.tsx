import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { RoleSwitcherBar } from './components/RoleSwitcherBar';
import { MerchantDashboard } from './pages/merchant/MerchantDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { EnterpriseDashboard } from './pages/enterprise/EnterpriseDashboard';
import { SupportPanel } from './pages/support/SupportPanel';
import { DiscussPanel } from './pages/discuss/DiscussPanel';
import { P2PDashboard } from './pages/p2p/P2PDashboard';
import { PlaygroundPanel } from './pages/playground/PlaygroundPanel';
import { PaymentPage } from './pages/checkout/PaymentPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="relative min-h-screen">
            <Routes>
              {/* Default redirects */}
              <Route path="/" element={<Navigate to="/merchant/dashboard" replace />} />
              <Route path="/login" element={<Navigate to="/merchant/dashboard" replace />} />
              <Route path="/merchant/login" element={<Navigate to="/merchant/dashboard" replace />} />
              <Route path="/admin/login" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/enterprise/login" element={<Navigate to="/enterprise/dashboard" replace />} />

              {/* Merchant Portal */}
              <Route path="/dashboard" element={<MerchantDashboard />} />
              <Route path="/dashboard/:section" element={<MerchantDashboard />} />
              <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
              <Route path="/merchant/dashboard/:section" element={<MerchantDashboard />} />

              {/* Master Admin Panel */}
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/dashboard/:section" element={<AdminDashboard />} />
              <Route path="/admin/dashboard/:section/:subParam" element={<AdminDashboard />} />

              {/* Enterprise Partner Portal */}
              <Route path="/enterprise" element={<Navigate to="/enterprise/dashboard" replace />} />
              <Route path="/enterprise/dashboard" element={<EnterpriseDashboard />} />
              <Route path="/enterprise/dashboard/:section" element={<EnterpriseDashboard />} />

              {/* Consumer P2P / Bharat Token App */}
              <Route path="/p2p" element={<Navigate to="/p2p/dashboard" replace />} />
              <Route path="/p2p/dashboard" element={<P2PDashboard />} />
              <Route path="/p2p/dashboard/:section" element={<P2PDashboard />} />

              {/* Support Desk & Dispute Arbitration */}
              <Route path="/support" element={<SupportPanel />} />

              {/* Engine Architecture & Peer RFC Forum */}
              <Route path="/discuss" element={<DiscussPanel />} />

              {/* Developer API Playground Sandbox */}
              <Route path="/playground" element={<PlaygroundPanel />} />

              {/* Customer Checkout Gateway */}
              <Route path="/pay/:linkToken" element={<PaymentPage />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/merchant/dashboard" replace />} />
            </Routes>

            {/* Floating Portal Switcher & Dev Controller */}
            <RoleSwitcherBar />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
