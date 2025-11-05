import React from 'react';
import { Book, Folder, Activity, BarChart2, Users } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { AdminView } from '../../types';

const MobileBottomNav: React.FC = () => {
    const { user } = useAppContext();
    const isAdmin = user?.role === 'admin';

    if (isAdmin) {
        return <AdminNav />;
    }
    return <UserNav />;
}

const UserNav: React.FC = () => {
    const { dashboardView, setDashboardView } = useAppContext();

    const navItems = [
        { view: 'materials', icon: Book, label: 'Folders' },
        { view: 'collaborations', icon: Folder, label: 'Spaces' },
        { view: 'activity', icon: Activity, label: 'Activity' },
    ];

    const navButtonClasses = (view: string) => 
        `flex flex-col items-center justify-center flex-1 py-2 rounded-lg transition ${
            dashboardView === view
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-slate-500 dark:text-gray-400'
        }`;
    
    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-slate-200 dark:border-blue-500/20 z-40 h-16 flex items-center px-2">
            {navItems.map(item => (
                <button key={item.view} onClick={() => setDashboardView(item.view as any)} className={navButtonClasses(item.view)}>
                    <item.icon className="w-6 h-6 mb-0.5" />
                    <span className="text-xs font-medium">{item.label}</span>
                </button>
            ))}
        </nav>
    );
}

const AdminNav: React.FC = () => {
    const { adminView, setAdminView } = useAppContext();
     const navItems = [
        { view: 'stats', icon: BarChart2, label: 'Stats' },
        { view: 'users', icon: Users, label: 'Users' },
    ];

    const navButtonClasses = (view: string) => 
        `flex flex-col items-center justify-center flex-1 py-2 rounded-lg transition ${
            adminView === view
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-slate-500 dark:text-gray-400'
        }`;

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-slate-200 dark:border-blue-500/20 z-40 h-16 flex items-center px-2">
            {navItems.map(item => (
                <button key={item.view} onClick={() => setAdminView(item.view as AdminView)} className={navButtonClasses(item.view)}>
                    <item.icon className="w-6 h-6 mb-0.5" />
                    <span className="text-xs font-medium">{item.label}</span>
                </button>
            ))}
        </nav>
    );
}


export default MobileBottomNav;
