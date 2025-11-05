import React from 'react';
import Sidebar from './dashboard/Sidebar';
import Header from './dashboard/Header';
import StatsCards from './dashboard/StatsCards';
import UploadSection from './dashboard/UploadSection';
import FilesSection from './dashboard/FilesSection';
import ActivityLog from './dashboard/ActivityLog';
import CollaborationsSection from './dashboard/CollaborationsSection';
import SettingsPage from './dashboard/SettingsPage';
import { useAppContext } from '../context/AppContext';

const MyMaterialsView = () => (
    <>
        <StatsCards />
        <div className="mt-8">
            <UploadSection />
        </div>
        <div className="mt-8">
            <FilesSection />
        </div>
    </>
);

const DashboardPage: React.FC = () => {
  const { dashboardView, isMobileMenuOpen, closeMobileMenu } = useAppContext();

  const renderContent = () => {
    switch (dashboardView) {
        case 'materials':
            return <MyMaterialsView />;
        case 'collaborations':
            return <CollaborationsSection />;
        case 'activity':
            return <ActivityLog />;
        case 'settings':
            return <SettingsPage />;
        default:
            return <MyMaterialsView />;
    }
  }

  return (
    <div className="min-h-screen text-slate-800 dark:text-white flex bg-slate-50 dark:bg-slate-900">
      {isMobileMenuOpen && (
          <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={closeMobileMenu}
              aria-hidden="true"
          ></div>
      )}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
            {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;