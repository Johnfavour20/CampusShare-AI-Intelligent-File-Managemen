import React, { useState, useRef, FormEvent } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Sparkles, Loader, Lock, FileText, Users, Download, Share2, MoreVertical, Trash2, Info, X } from 'lucide-react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

const FileOptions: React.FC<{ fileId: number, close: () => void }> = ({ fileId, close }) => {
    const { deleteFile } = useAppContext();
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, close);

    const handleDelete = () => {
        deleteFile(fileId);
        close();
    }

    return (
        <div ref={ref} className="absolute right-0 top-8 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-blue-500/20 rounded-xl shadow-xl z-20">
            <button
                onClick={handleDelete}
                className="w-full flex items-center space-x-3 px-4 py-2 text-left text-red-500 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition"
            >
                <Trash2 className="w-4 h-4" />
                <span>Delete File</span>
            </button>
        </div>
    );
};

const FileItemCard: React.FC<{ file: any, onMenuToggle: (id: number) => void, isMenuOpen: boolean }> = ({ file, onMenuToggle, isMenuOpen }) => {
    return (
         <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-blue-500/20 rounded-lg p-4 hover:border-slate-300 dark:hover:border-blue-500/40 transition">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-2 mb-1">
                            {file.category && (
                                <span className="flex-shrink-0 px-2 py-1 bg-purple-500/20 text-purple-600 dark:text-purple-400 text-xs rounded-full font-medium">
                                    {file.category}
                                </span>
                            )}
                            <h4 className="text-slate-900 dark:text-white font-medium truncate" title={file.name}>{file.name}</h4>
                            <span className="flex-shrink-0 px-2 py-1 bg-green-500/20 text-green-600 dark:text-green-400 text-xs rounded-full flex items-center space-x-1">
                                <Lock className="w-3 h-3" />
                                <span>Encrypted</span>
                            </span>
                            {file.summary && (
                                <div className="relative group">
                                    <Info className="w-4 h-4 text-slate-400 dark:text-gray-400 cursor-pointer" />
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-2 bg-slate-700 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                        {file.summary}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-gray-400">
                            <span>{file.size}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{file.uploaded}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>By {file.owner}</span>
                                <span className="hidden sm:inline">•</span>
                            <span className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <span>{file.shared} people</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0 ml-auto sm:ml-4 flex-shrink-0">
                    <button className="p-2 text-slate-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition" aria-label={`Download ${file.name}`}>
                        <Download className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-slate-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition" aria-label={`Share ${file.name}`}>
                        <Share2 className="w-5 h-5" />
                    </button>
                    <div className="relative">
                        <button
                            onClick={() => onMenuToggle(file.id)}
                            className="p-2 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition"
                            aria-label={`More options for ${file.name}`}
                        >
                            <MoreVertical className="w-5 h-5" />
                        </button>
                        {isMenuOpen && <FileOptions fileId={file.id} close={() => onMenuToggle(file.id)} />}
                    </div>
                </div>
            </div>
        </div>
    )
}


const FilesSection: React.FC = () => {
    const { files, isSearching, searchResults, aiSearchResponse, performAISearch, clearSearch } = useAppContext();
    const [query, setQuery] = useState('');
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            performAISearch(query);
        }
    }

    const handleMenuToggle = (id: number) => {
        setOpenMenuId(prevId => (prevId === id ? null : id));
    };

    const renderContent = () => {
        if (isSearching) {
            return (
                <div className="flex flex-col items-center justify-center py-12">
                    <Loader className="w-8 h-8 text-blue-500 dark:text-blue-400 animate-spin mb-4" />
                    <h4 className="text-lg text-slate-900 dark:text-white font-semibold">AI is searching your materials...</h4>
                    <p className="text-slate-500 dark:text-gray-400">Please wait a moment.</p>
                </div>
            );
        }

        if (searchResults) {
            return (
                <>
                    <div className="bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-blue-500/20 rounded-lg p-4 mb-6">
                       <div className="flex justify-between items-start">
                             <div className="flex items-start space-x-3">
                                <Sparkles className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-slate-900 dark:text-white">AI Assistant Response</h4>
                                    <p className="text-slate-700 dark:text-gray-300 text-sm">{aiSearchResponse}</p>
                                </div>
                            </div>
                            <button onClick={clearSearch} className="flex items-center space-x-2 text-sm text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition -mr-1 -mt-1 p-1">
                               <X className="w-4 h-4" />
                            </button>
                       </div>
                    </div>
                    {searchResults.length > 0 && <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Relevant Documents</h4>}
                    <div className="space-y-3">
                         {searchResults.map(file => (
                           <FileItemCard key={file.id} file={file} onMenuToggle={handleMenuToggle} isMenuOpen={openMenuId === file.id} />
                        ))}
                    </div>
                </>
            )
        }
        
        // Default view
        return (
            <div className="space-y-3">
                {files.map(file => (
                    <FileItemCard key={file.id} file={file} onMenuToggle={handleMenuToggle} isMenuOpen={openMenuId === file.id} />
                ))}
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-blue-500/20 rounded-xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Course Folders</h3>
                <form onSubmit={handleSearch} className="flex-1 min-w-[250px] max-w-lg">
                    <div className="relative">
                        <Sparkles className="w-5 h-5 text-blue-500 dark:text-blue-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Ask AI to find your files..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-blue-500/20 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                        />
                    </div>
                </form>
            </div>
            {renderContent()}
        </div>
    );
};

export default FilesSection;