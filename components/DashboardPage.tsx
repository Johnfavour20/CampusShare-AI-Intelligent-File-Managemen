import React from 'react';
import Sidebar from './dashboard/Sidebar';
import Header from './dashboard/Header';
import StatsCards from './dashboard/StatsCards';
import UploadSection from './dashboard/UploadSection';
import FilesSection from './dashboard/FilesSection';
import ActivityLog from './dashboard/ActivityLog';
import CollaborationsSection from './dashboard/CollaborationsSection';
import { useAppContext } from '../context/AppContext';
import MobileBottomNav from './dashboard/MobileBottomNav';

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
  const { dashboardView } = useAppContext();

  const renderContent = () => {
    switch (dashboardView) {
        case 'materials':
            return <MyMaterialsView />;
        case 'collaborations':
            return <CollaborationsSection />;
        case 'activity':
            return <ActivityLog />;
        default:
            return <MyMaterialsView />;
    }
  }

  return (
    <div className="min-h-screen text-slate-800 dark:text-white flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto pb-20 lg:pb-6">
            {renderContent()}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default DashboardPage;