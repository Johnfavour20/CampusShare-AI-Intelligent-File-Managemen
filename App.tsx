import React from 'react';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import DashboardPage from './components/DashboardPage';
import AdminDashboardPage from './components/admin/AdminDashboardPage';
import { useAppContext } from './context/AppContext';
import AIInsightsModal from './components/dashboard/AIInsightsModal';

const App: React.FC = () => {
  const { page, isAuthenticated, user, fileForAnalysis } = useAppContext();

  const renderPage = () => {
    if (isAuthenticated && user) {
        if (user.role === 'admin') {
            return <AdminDashboardPage />;
        }
        return <DashboardPage />;
    }

    switch (page) {
      case 'auth':
        return <AuthPage />;
      case 'landing':
      default:
        return <LandingPage />;
    }
  };

  return (
    <>
      {renderPage()}
      {fileForAnalysis && <AIInsightsModal />}
    </>
  );
};

export default App;