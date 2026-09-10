import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { RoleSwitcherBar } from './components/RoleSwitcherBar';
import { MerchantDashboard } from './pages/merchant/MerchantDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
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

              {/* Merchant Portal */}
              <Route path="/dashboard" element={<MerchantDashboard />} />
              <Route path="/dashboard/:section" element={<MerchantDashboard />} />
              <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
              <Route path="/merchant/dashboard/:section" element={<MerchantDashboard />} />

              {/* Master Admin Panel */}
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/dashboard/:section" element={<AdminDashboard />} />

              {/* Customer Checkout */}
              <Route path="/pay/:linkToken" element={<PaymentPage />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/merchant/dashboard" replace />} />
            </Routes>

            {/* Floating Role Switcher & Dev Controller */}
            <RoleSwitcherBar />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
