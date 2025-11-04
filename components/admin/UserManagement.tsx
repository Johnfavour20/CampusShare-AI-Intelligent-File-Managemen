import React, { useState, useMemo } from 'react';
import { allUsers } from '../../constants';
import { Search, Edit, UserX, MoreVertical } from 'lucide-react';
import type { User } from '../../types';

const roleColors: Record<User['role'], string> = {
    admin: 'bg-red-500/10 text-red-500 dark:text-red-400',
    faculty: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    student: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    staff: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
};

const UserManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = useMemo(() => {
        return allUsers.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-blue-500/20 rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">User Management</h2>
                    <p className="text-slate-500 dark:text-gray-400 mt-1">View, edit, or suspend user accounts.</p>
                </div>
                <div className="relative">
                    <Search className="w-5 h-5 text-slate-400 dark:text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-64 pl-11 pr-4 py-2 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-blue-500/20 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-slate-200 dark:border-blue-500/20 text-sm text-slate-500 dark:text-gray-400">
                        <tr>
                            <th className="p-4">User</th>
                            <th className="p-4 hidden md:table-cell">Role</th>
                            <th className="p-4 hidden lg:table-cell">Last Active</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.email} className="border-b border-slate-100 dark:border-blue-500/10">
                                <td className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                                            {user.initials}
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900 dark:text-white">{user.name}</div>
                                            <div className="text-sm text-slate-500 dark:text-gray-400">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 hidden md:table-cell">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${roleColors[user.role]}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-slate-500 dark:text-gray-400 hidden lg:table-cell">
                                    {user.lastActive}
                                </td>
                                <td className="p-4 text-right">
                                    <div className="inline-flex space-x-2">
                                         <button className="p-2 text-slate-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700" aria-label={`Edit ${user.name}`}>
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-slate-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700" aria-label={`Suspend ${user.name}`}>
                                            <UserX className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-500 dark:text-gray-400">No users found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserManagement;
