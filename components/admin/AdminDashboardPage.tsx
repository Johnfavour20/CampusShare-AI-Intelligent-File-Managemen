import React from 'react';
import AdminSidebar from './AdminSidebar';
import Header from '../dashboard/Header';
import SystemStats from './SystemStats';
import UserManagement from './UserManagement';
import { useAppContext } from '../../context/AppContext';

const AdminDashboardPage: React.FC = () => {
  const { adminView, isMobileMenuOpen, closeMobileMenu } = useAppContext();

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
    <div className="min-h-screen text-slate-800 dark:text-white flex bg-slate-50 dark:bg-slate-900">
       {isMobileMenuOpen && (
          <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={closeMobileMenu}
              aria-hidden="true"
          ></div>
      )}
      <AdminSidebar />
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