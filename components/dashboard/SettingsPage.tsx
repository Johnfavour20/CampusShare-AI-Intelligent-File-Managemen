import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { User, Bell, Palette, Shield, Save, Sun, Moon } from 'lucide-react';

// A reusable card component for settings sections
const SettingsCard: React.FC<{ icon: React.ElementType, title: string, children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-blue-500/20 rounded-xl">
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-blue-500/20">
            <div className="flex items-center space-x-3">
                <Icon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
            </div>
        </div>
        <div className="p-4 sm:p-6 space-y-6">
            {children}
        </div>
    </div>
);

// A reusable toggle switch component
const ToggleSwitch: React.FC<{ label: string, description: string, enabled: boolean, setEnabled: (enabled: boolean) => void }> = ({ label, description, enabled, setEnabled }) => (
    <div className="flex items-center justify-between">
        <div>
            <p className="font-medium text-slate-800 dark:text-white">{label}</p>
            <p className="text-sm text-slate-500 dark:text-gray-400">{description}</p>
        </div>
        <button
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
            aria-label={`Toggle ${label}`}
        >
            <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
            />
        </button>
    </div>
);

const SettingsPage: React.FC = () => {
    const { user, theme, toggleTheme } = useAppContext();
    
    // Mock state for settings
    const [name, setName] = useState(user?.name || '');
    const [email] = useState(user?.email || '');
    const [notificationsEnabled, setNotificationsEnabled] = useState({
        shares: true,
        downloads: true,
        announcements: false,
    });
    
    const [adminSettings, setAdminSettings] = useState({
        requireApproval: false,
        enable2FA: true,
    });

    const roleColors: Record<string, string> = {
        admin: 'bg-red-500/10 text-red-500 dark:text-red-400',
        faculty: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
        student: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
        staff: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h2>
                <p className="text-slate-500 dark:text-gray-400 mt-1">Manage your account, preferences, and platform settings.</p>
            </div>
            
            {/* Profile Settings */}
            <SettingsCard icon={User} title="Profile Information">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
                        {user?.initials}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-1">Full Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-blue-500/30 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-1">Email Address</label>
                            <input type="email" value={email} disabled className="w-full px-3 py-2 bg-slate-200 dark:bg-slate-900/50 border border-slate-300 dark:border-blue-500/20 rounded-lg text-slate-500 dark:text-gray-400 cursor-not-allowed" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-1">Role</label>
                            <p className={`px-3 py-2 text-sm font-semibold rounded-full capitalize text-center ${roleColors[user?.role || 'student']}`}>{user?.role}</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-blue-500/20">
                     <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center space-x-2">
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                    </button>
                </div>
            </SettingsCard>

            {/* Appearance Settings */}
            <SettingsCard icon={Palette} title="Appearance">
                <div>
                     <p className="font-medium text-slate-800 dark:text-white">Theme</p>
                    <p className="text-sm text-slate-500 dark:text-gray-400 mb-4">Choose how CampusShare looks to you. Select a theme below.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button onClick={() => theme !== 'light' && toggleTheme()} className={`p-4 border-2 rounded-lg text-left transition ${theme === 'light' ? 'border-blue-500' : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'}`} aria-pressed={theme === 'light'}>
                            <div className="flex items-center space-x-2 mb-2">
                                <Sun className="w-5 h-5 text-slate-500"/>
                                <span className="font-semibold text-slate-800 dark:text-white">Light</span>
                            </div>
                            <div className="w-full h-20 bg-slate-100 rounded-md border border-slate-200"></div>
                        </button>
                         <button onClick={() => theme !== 'dark' && toggleTheme()} className={`p-4 border-2 rounded-lg text-left transition ${theme === 'dark' ? 'border-blue-500' : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'}`} aria-pressed={theme === 'dark'}>
                             <div className="flex items-center space-x-2 mb-2">
                                <Moon className="w-5 h-5 text-slate-500"/>
                                <span className="font-semibold text-slate-800 dark:text-white">Dark</span>
                            </div>
                            <div className="w-full h-20 bg-slate-800 rounded-md border border-slate-700"></div>
                        </button>
                    </div>
                </div>
            </SettingsCard>

            {/* Notification Settings */}
            <SettingsCard icon={Bell} title="Notifications">
                <ToggleSwitch 
                    label="File Shares"
                    description="Receive a notification when someone shares a file with you."
                    enabled={notificationsEnabled.shares}
                    setEnabled={(value) => setNotificationsEnabled(p => ({...p, shares: value}))}
                />
                 <ToggleSwitch 
                    label="File Downloads"
                    description="Receive a notification when someone downloads a file you own."
                    enabled={notificationsEnabled.downloads}
                    setEnabled={(value) => setNotificationsEnabled(p => ({...p, downloads: value}))}
                />
                 <ToggleSwitch 
                    label="Platform Announcements"
                    description="Receive notifications about system updates and news."
                    enabled={notificationsEnabled.announcements}
                    setEnabled={(value) => setNotificationsEnabled(p => ({...p, announcements: value}))}
                />
            </SettingsCard>

            {/* Admin-only Settings */}
            {user?.role === 'admin' && (
                <SettingsCard icon={Shield} title="Platform Security Settings">
                    <ToggleSwitch 
                        label="Require Admin Approval"
                        description="New user registrations must be manually approved by an administrator."
                        enabled={adminSettings.requireApproval}
                        setEnabled={(value) => setAdminSettings(p => ({...p, requireApproval: value}))}
                    />
                    <ToggleSwitch 
                        label="Enable 2FA for Faculty"
                        description="Enforce two-factor authentication for all users with the 'faculty' role."
                        enabled={adminSettings.enable2FA}
                        setEnabled={(value) => setAdminSettings(p => ({...p, enable2FA: value}))}
                    />
                </SettingsCard>
            )}

        </div>
    );
};

export default SettingsPage;