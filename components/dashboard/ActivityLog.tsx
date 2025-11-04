import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Upload, Share2, Download, Shield, Trash2, Search } from 'lucide-react';
import type { Activity } from '../../types';

const activityIcons = {
    upload: Upload,
    share: Share2,
    download: Download,
    access: Shield,
    delete: Trash2,
};

const activityColors = {
    upload: 'bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400',
    share: 'bg-cyan-500/10 text-cyan-500 dark:bg-cyan-500/20 dark:text-cyan-400',
    download: 'bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 dark:text-purple-400',
    delete: 'bg-red-500/10 text-red-500 dark:bg-red-500/20 dark:text-red-400',
    access: 'bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400',
};

const ActivityLog: React.FC = () => {
    const { activities } = useAppContext();
    const [filter, setFilter] = useState<Activity['type'] | 'all'>('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filterOptions: {label: string, value: Activity['type'] | 'all'}[] = [
        { label: 'All', value: 'all' },
        { label: 'Uploads', value: 'upload' },
        { label: 'Shares', value: 'share' },
        { label: 'Downloads', value: 'download' },
        { label: 'Access', value: 'access' },
        { label: 'Deletes', value: 'delete' },
    ];
    
    const filteredActivities = useMemo(() => activities.filter(activity => {
        const typeMatch = filter === 'all' || activity.type === filter;
        const searchMatch = searchTerm.trim() === '' ||
            activity.file.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activity.user.toLowerCase().includes(searchTerm.toLowerCase());
        return typeMatch && searchMatch;
    }), [activities, filter, searchTerm]);

    return (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-blue-500/20 rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Activity Feed</h3>
                <div className="relative">
                    <Search className="w-5 h-5 text-slate-400 dark:text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search by file or user..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-64 pl-11 pr-4 py-2 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-blue-500/20 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 dark:border-blue-500/20 pb-4">
                {filterOptions.map(option => (
                    <button
                        key={option.value}
                        onClick={() => setFilter(option.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            filter === option.value
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                {filteredActivities.length > 0 ? filteredActivities.map((activity, idx) => {
                    const Icon = activityIcons[activity.type];
                    const colorClass = activityColors[activity.type];
                    return (
                        <div key={idx} className="flex items-start space-x-4 p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-blue-500/20 rounded-lg">
                            <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${colorClass}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-slate-800 dark:text-white break-words">
                                    <span className="font-medium">{activity.user}</span> {activity.action.replace('File ', '').replace('Access ', 'granted access for ')}
                                    <span className="font-medium text-blue-600 dark:text-blue-400"> {activity.file}</span>
                                </p>
                                <p className="text-slate-500 dark:text-gray-500 text-xs mt-1">{activity.time}</p>
                            </div>
                        </div>
                    )
                }) : (
                    <div className="text-center py-12">
                        <p className="text-slate-500 dark:text-gray-400">No activities found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityLog;
