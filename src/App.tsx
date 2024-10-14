import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PatchManagement from './components/PatchManagement';
import SystemHardening from './components/SystemHardening';
import ComplianceReporting from './components/ComplianceReporting';
import Navbar from './components/Navbar';
import NotificationsPanel from './components/NotificationsPanel';
import ThemeCustomizer from './components/ThemeCustomizer';
import SystemInventory from './components/SystemInventory';
import PatchScheduler from './components/PatchScheduler';
import UserManagement from './components/UserManagement';
import ReportingModule from './components/ReportingModule';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <div className="flex">
                      <Navbar setShowNotifications={setShowNotifications} />
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={location.pathname}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.2 }}
                          className="flex-1 p-8"
                        >
                          <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/patch-management" element={<PatchManagement />} />
                            <Route path="/system-hardening" element={<SystemHardening />} />
                            <Route path="/compliance-reporting" element={<ComplianceReporting />} />
                            <Route path="/system-inventory" element={<SystemInventory />} />
                            <Route path="/patch-scheduler" element={<PatchScheduler />} />
                            <Route path="/user-management" element={<UserManagement />} />
                            <Route path="/reporting" element={<ReportingModule />} />
                          </Routes>
                        </motion.div>
                      </AnimatePresence>
                      {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
                    </div>
                  </ProtectedRoute>
                }
              />
            </Routes>
            <ThemeCustomizer />
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;