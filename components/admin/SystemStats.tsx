import React from 'react';
import { Users, FileText, Database, GitBranch } from 'lucide-react';
import WeeklyActivityChart from './WeeklyActivityChart';

const SystemStats: React.FC = () => {
    const stats = [
        {
            icon: Users,
            label: 'Total Users',
            value: '10,542',
            change: '+2.5%',
            changeColor: 'text-green-400',
            color: 'text-blue-500 dark:text-blue-400'
        },
        {
            icon: FileText,
            label: 'Total Files',
            value: '152,890',
            change: '+5.1%',
            changeColor: 'text-green-400',
            color: 'text-cyan-500 dark:text-cyan-400'
        },
        {
            icon: Database,
            label: 'Storage Used',
            value: '2.4 TB',
            change: '+1.2%',
            changeColor: 'text-green-400',
            color: 'text-purple-500 dark:text-purple-400'
        },
        {
            icon: GitBranch,
            label: 'Active Collaborations',
            value: '1,204',
            change: '-0.5%',
            changeColor: 'text-red-400',
            color: 'text-green-500 dark:text-green-400'
        }
    ];

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">System Statistics</h2>
                <p className="text-slate-500 dark:text-gray-400 mt-1">High-level overview of the CampusShare platform.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-blue-500/20 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-2">
                                <Icon className={`w-8 h-8 ${stat.color}`} />
                                <span className={`${stat.changeColor} text-sm font-semibold`}>{stat.change}</span>
                            </div>
                            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
                            <div className="text-slate-500 dark:text-gray-400 text-sm">{stat.label}</div>
                        </div>
                    );
                })}
            </div>

            <WeeklyActivityChart />

            <div className="mt-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-blue-500/20 rounded-xl p-6">
                 <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Platform Health</h3>
                 <div className="flex items-center space-x-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-green-600 dark:text-green-400 font-medium">All systems are currently operational.</p>
                 </div>
            </div>
        </div>
    );
};

export default SystemStats;