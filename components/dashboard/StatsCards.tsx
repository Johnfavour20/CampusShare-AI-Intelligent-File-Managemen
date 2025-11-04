import React from 'react';
import { Book, Users, Download, Shield } from 'lucide-react';

const StatsCards: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-blue-500/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                    <Book className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                    <span className="text-green-400 text-sm">+12%</span>
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">24</div>
                <div className="text-slate-500 dark:text-gray-400 text-sm">Course Folders</div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-blue-500/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                    <Users className="w-8 h-8 text-cyan-500 dark:text-cyan-400" />
                    <span className="text-green-400 text-sm">+8%</span>
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">12</div>
                <div className="text-slate-500 dark:text-gray-400 text-sm">Collaborations</div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-blue-500/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                    <Download className="w-8 h-8 text-purple-500 dark:text-purple-400" />
                    <span className="text-green-400 text-sm">+15%</span>
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">48</div>
                <div className="text-slate-500 dark:text-gray-400 text-sm">Resources Accessed</div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-blue-500/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                    <Shield className="w-8 h-8 text-green-500 dark:text-green-400" />
                    <span className="text-green-400 text-sm">100%</span>
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Secure</div>
                <div className="text-slate-500 dark:text-gray-400 text-sm">Platform Status</div>
            </div>
        </div>
    );
};

export default StatsCards;