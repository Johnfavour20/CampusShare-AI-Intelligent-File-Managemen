import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { BarChart2, Users, Settings, LogOut } from 'lucide-react';

type AdminView = 'stats' | 'users';

interface AdminSidebarProps {
  adminView: AdminView;
  setAdminView: (view: AdminView) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ adminView, setAdminView }) => {
  const { logout } = useAppContext();

  const navButtonClasses = (view: AdminView) => 
    `w-full px-4 py-3 rounded-lg flex items-center space-x-3 transition ${
        adminView === view
        ? 'bg-blue-600 text-white'
        : 'text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white'
    }`;

  return (
    <aside className="hidden lg:block w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-blue-500/20 min-h-screen p-6 flex flex-col">
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

      <div className="mt-auto">
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
