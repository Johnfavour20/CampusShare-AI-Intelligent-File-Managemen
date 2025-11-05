import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { BarChart2, Users, Settings, LogOut, X } from 'lucide-react';
import { AdminView } from '../../types';

const AdminSidebar: React.FC = () => {
  const { logout, adminView, setAdminView, isMobileMenuOpen, closeMobileMenu } = useAppContext();

  const navButtonClasses = (view: AdminView) => 
    `w-full px-4 py-3 rounded-lg flex items-center space-x-3 transition ${
        adminView === view
        ? 'bg-blue-600 text-white'
        : 'text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white'
    }`;

  const sidebarClasses = `
    w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-blue-500/20
    flex flex-col
    fixed lg:static inset-y-0 left-0 z-50
    transition-transform duration-300 ease-in-out
    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:translate-x-0
  `;

  return (
    <aside className={sidebarClasses}>
      <div className="p-6">
        <div className="flex justify-end lg:hidden mb-4">
          <button
            onClick={closeMobileMenu}
            className="p-2 -mr-2 text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
            aria-label="Close navigation menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-2">
          <button onClick={() => setAdminView('stats')} className={navButtonClasses('stats')}>
            <BarChart2 className="w-5 h-5" />
            <span>System Statistics</span>
          </button>
          <button onClick={() => setAdminView('users')} className={navButtonClasses('users')}>
            <Users className="w-5 h-5" />
            <span>User Management</span>
          </button>
          <button className="w-full px-4 py-3 text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white rounded-lg flex items-center space-x-3 transition">
            <Settings className="w-5 h-5" />
            <span>Admin Settings</span>
          </button>
        </div>
      </div>

      <div className="mt-auto p-6">
        <button 
          onClick={logout}
          className="w-full px-4 py-3 text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white rounded-lg flex items-center space-x-3 transition"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;