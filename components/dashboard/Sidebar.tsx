import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Book, Folder, Activity, Settings, Lock, LogOut } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { logout, dashboardView, setDashboardView } = useAppContext();

  const navButtonClasses = (view: string) => 
    `w-full px-4 py-3 rounded-lg flex items-center space-x-3 transition ${
        dashboardView === view
        ? 'bg-blue-600 text-white'
        : 'text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white'
    }`;

  return (
    <aside className="hidden lg:block w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-blue-500/20 min-h-screen p-6 flex flex-col">
      <div className="space-y-2">
        <button onClick={() => setDashboardView('materials')} className={navButtonClasses('materials')}>
          <Book className="w-5 h-5" />
          <span>Course Folders</span>
        </button>
        <button onClick={() => setDashboardView('collaborations')} className={navButtonClasses('collaborations')}>
          <Folder className="w-5 h-5" />
          <span>Collaborations</span>
        </button>
        <button onClick={() => setDashboardView('activity')} className={navButtonClasses('activity')}>
          <Activity className="w-5 h-5" />
          <span>Activity Feed</span>
        </button>
        <button className="w-full px-4 py-3 text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white rounded-lg flex items-center space-x-3 transition">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>

      <div className="mt-auto">
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl mb-4">
            <Lock className="w-8 h-8 text-blue-500 dark:text-blue-400 mb-2" />
            <h4 className="text-slate-800 dark:text-white font-semibold mb-1">Storage Encrypted</h4>
            <p className="text-slate-600 dark:text-gray-400 text-sm">All your files are protected with AES-256 encryption</p>
        </div>
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

export default Sidebar;