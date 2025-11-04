import React from 'react';
import { workspaces } from '../../constants';
import { Users, FileText } from 'lucide-react';
import type { Workspace } from '../../types';

const AvatarStack: React.FC<{ members: Workspace['members'] }> = ({ members }) => {
    const displayedMembers = members.slice(0, 3);
    const remainingCount = members.length - displayedMembers.length;

    return (
        <div className="flex -space-x-2">
            {displayedMembers.map((member, idx) => (
                <div 
                    key={idx}
                    title={member.name}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-white dark:ring-slate-800 ${member.avatarColor}`}
                >
                    {member.initials}
                </div>
            ))}
            {remainingCount > 0 && (
                 <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 dark:text-gray-300 text-xs font-bold bg-slate-200 dark:bg-slate-700 ring-2 ring-white dark:ring-slate-800">
                    +{remainingCount}
                </div>
            )}
        </div>
    )
}


const CollaborationsSection: React.FC = () => {
    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Collaborations & Shared Workspaces</h2>
                <p className="text-slate-500 dark:text-gray-400 mt-1">Access shared course materials, project folders, and departmental resources.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workspaces.map((space) => {
                    const Icon = space.icon;
                    return (
                        <div key={space.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-blue-500/20 rounded-xl p-6 flex flex-col hover:border-slate-300 dark:hover:border-blue-500/40 transition">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Icon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{space.name}</h3>
                                </div>
                            </div>
                            <p className="text-slate-600 dark:text-gray-400 text-sm flex-grow mb-6">{space.description}</p>
                            <div className="flex items-center justify-between">
                                <AvatarStack members={space.members} />
                                <div className="flex items-center space-x-4 text-sm">
                                    <div className="flex items-center space-x-2 text-slate-500 dark:text-gray-400">
                                        <Users className="w-4 h-4" />
                                        <span>{space.memberCount}</span>
                                    </div>
                                     <div className="flex items-center space-x-2 text-slate-500 dark:text-gray-400">
                                        <FileText className="w-4 h-4" />
                                        <span>{space.fileCount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CollaborationsSection;
