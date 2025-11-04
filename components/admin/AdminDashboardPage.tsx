import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import Header from '../dashboard/Header';
import SystemStats from './SystemStats';
import UserManagement from './UserManagement';

type AdminView = 'stats' | 'users';

const AdminDashboardPage: React.FC = () => {
  const [adminView, setAdminView] = useState<AdminView>('stats');

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
        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
