import React from 'react';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import DashboardPage from './components/DashboardPage';
import AdminDashboardPage from './components/admin/AdminDashboardPage';
import { useAppContext } from './context/AppContext';
import AIInsightsModal from './components/dashboard/AIInsightsModal';
import ShareFileModal from './components/dashboard/ShareFileModal';
import FileViewerModal from './components/dashboard/FileViewerModal';

const App: React.FC = () => {
  const { page, isAuthenticated, user, fileForAnalysis, fileToShare, fileToView } = useAppContext();

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
      {fileToShare && <ShareFileModal />}
      {fileToView && <FileViewerModal />}
    </>
  );
};

export default App;