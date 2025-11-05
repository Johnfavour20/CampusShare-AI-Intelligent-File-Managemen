import React, { useState, useRef } from 'react';
import { Bell, LogOut, BookOpen, Sun, Moon, Menu } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

const Header: React.FC = () => {
    const { user, logout, notifications, markNotificationsAsRead, theme, toggleTheme, dashboardView, setDashboardView, toggleMobileMenu } = useAppContext();
    const [showNotifications, setShowNotifications] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const notificationsRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(notificationsRef, () => setShowNotifications(false));
    useOnClickOutside(profileRef, () => setIsProfileOpen(false));
    
    const handleNotificationsToggle = () => {
        setShowNotifications(!showNotifications);
        if (!showNotifications) {
            markNotificationsAsRead();
        }
    }

    const unreadCount = notifications.filter(n => !n.read).length;

    const navButtonClasses = (view: string) => 
        `px-4 py-2 rounded-lg text-sm font-medium transition ${
            dashboardView === view 
            ? 'bg-blue-600 text-white' 
            : 'text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white'
        }`;

    return (
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-blue-500/20 sticky top-0 z-30">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2 sm:space-x-4">
                         <button
                            onClick={toggleMobileMenu}
                            className="lg:hidden p-2 -ml-2 text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
                            aria-label="Open navigation menu"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="flex items-center space-x-2">
                            <BookOpen className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                            <span className="text-xl font-bold text-slate-900 dark:text-white">CampusShare</span>
                             {user?.role === 'admin' && <span className="px-2 py-1 bg-red-500/10 text-red-500 text-xs rounded-full font-semibold">Admin</span>}
                        </div>
                        {user?.role !== 'admin' && (
                             <div className="hidden lg:flex items-center space-x-1">
                                <button onClick={() => setDashboardView('materials')} className={navButtonClasses('materials')}>Course Folders</button>
                                <button onClick={() => setDashboardView('collaborations')} className={navButtonClasses('collaborations')}>Collaborations</button>
                                <button onClick={() => setDashboardView('activity')} className={navButtonClasses('activity')}>Activity Feed</button>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <div className="relative" ref={notificationsRef}>
                            <button
                                onClick={handleNotificationsToggle}
                                className="relative p-2 text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
                                aria-haspopup="true"
                                aria-expanded={showNotifications}
                            >
                                <Bell className="w-6 h-6" />
                                {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
                            </button>
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-blue-500/20 rounded-xl shadow-xl z-50">
                                    <div className="p-4 border-b border-slate-200 dark:border-blue-500/20">
                                        <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {notifications.length > 0 ? notifications.map(notif => (
                                            <div key={notif.id} className={`p-4 border-b border-slate-100 dark:border-blue-500/10 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 ${!notif.read ? 'bg-blue-500/5' : ''}`}>
                                                <p className="text-slate-800 dark:text-white text-sm">{notif.message}</p>
                                                <p className="text-slate-500 dark:text-gray-400 text-xs mt-1">{notif.time}</p>
                                            </div>
                                        )) : <p className="text-slate-500 dark:text-gray-400 text-sm p-4">No new notifications.</p>}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="relative" ref={profileRef}>
                            <button onClick={() => setIsProfileOpen(p => !p)} className="flex items-center space-x-3 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 p-1 transition">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                                    {user?.initials}
                                </div>
                            </button>
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-blue-500/20 rounded-xl shadow-xl z-50 p-2">
                                    <div className="p-2 border-b border-slate-200 dark:border-blue-500/20 mb-2">
                                        <p className="font-semibold text-slate-800 dark:text-white truncate">{user?.name}</p>
                                        <p className="text-sm text-slate-500 dark:text-gray-400 truncate">{user?.email}</p>
                                    </div>
                                    <button onClick={logout} className="w-full flex items-center space-x-3 px-3 py-2 text-left text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition">
                                        <LogOut className="w-5 h-5" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;