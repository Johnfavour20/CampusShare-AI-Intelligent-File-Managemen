import React from 'react';
import AdminSidebar from './AdminSidebar';
import Header from '../dashboard/Header';
import SystemStats from './SystemStats';
import UserManagement from './UserManagement';
import { useAppContext } from '../../context/AppContext';
import MobileBottomNav from '../dashboard/MobileBottomNav';
import type { AdminView } from '../../types';

const AdminDashboardPage: React.FC = () => {
  const { adminView, setAdminView } = useAppContext();

  const renderContent = () => {
    switch (adminView) {
      case 'users':
        return <UserManagement />;
      case 'stats':
      default:
        return <SystemStats />;
    }
  };

  return (
    <div className="min-h-screen text-slate-800 dark:text-white flex">
      <AdminSidebar adminView={adminView} setAdminView={setAdminView} />
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

export default AdminDashboardPage;