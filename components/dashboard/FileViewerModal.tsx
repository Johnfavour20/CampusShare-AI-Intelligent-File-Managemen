import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { X, Eye, User, FileText, Tag, Info } from 'lucide-react';

const FileViewerModal: React.FC = () => {
    const { fileToView, cancelViewFile } = useAppContext();

    if (!fileToView) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/50 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-blue-500/20 rounded-2xl shadow-2xl max-w-3xl w-full p-6 sm:p-8 relative flex flex-col max-h-[90vh]">
                <div className="flex-shrink-0">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-blue-500/20">
                        <div className="flex items-center space-x-3 min-w-0">
                            <Eye className="w-6 h-6 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                            <div className="min-w-0">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white truncate" title={fileToView.name}>{fileToView.name}</h2>
                                <p className="text-sm text-slate-500 dark:text-gray-400">Shared by <span className="font-medium">{fileToView.owner}</span></p>
                            </div>
                        </div>
                        <button onClick={cancelViewFile} className="p-1 rounded-full text-slate-500 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white transition flex-shrink-0 ml-4">
                            <X className="w-5 h-5"/>
                        </button>
                    </div>
                </div>

                <div className="flex-grow py-6 overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Column - Details */}
                    <div className="md:col-span-1 space-y-6">
                        <div>
                            <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 mb-2 flex items-center space-x-2">
                                <Info className="w-4 h-4"/>
                                <span>AI Summary</span>
                            </h3>
                            <p className="text-slate-700 dark:text-gray-300 bg-slate-100 dark:bg-slate-900/50 rounded-lg p-3 text-sm">{fileToView.summary || 'No summary available.'}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 mb-2 flex items-center space-x-2">
                                <Tag className="w-4 h-4"/>
                                <span>Keywords</span>
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {fileToView.keywords && fileToView.keywords.length > 0 ? fileToView.keywords.map(kw => (
                                    <span key={kw} className="px-3 py-1 bg-cyan-500/10 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300 text-xs font-medium rounded-full">{kw}</span>
                                )) : <span className="text-slate-500 dark:text-gray-400 text-xs">None</span>}
                            </div>
                        </div>
                         <div>
                            <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 mb-2">Category</h3>
                             <span className="px-3 py-1 bg-purple-500/10 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 text-sm font-medium rounded-full">{fileToView.category || 'Uncategorized'}</span>
                        </div>
                    </div>

                    {/* Right Column - Mock Preview */}
                    <div className="md:col-span-2 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-blue-500/20 rounded-lg p-4">
                         <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 mb-2 flex items-center space-x-2">
                            <FileText className="w-4 h-4"/>
                            <span>Document Preview</span>
                        </h3>
                        <div className="prose prose-sm dark:prose-invert text-slate-600 dark:text-gray-300 max-w-none">
                            <h4>{fileToView.name}</h4>
                            <p className="font-semibold italic">{fileToView.summary}</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.</p>
                            <p>Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue.</p>
                        </div>
                    </div>
                </div>
                
                <div className="flex-shrink-0 pt-4 border-t border-slate-200 dark:border-blue-500/20">
                    <button onClick={cancelViewFile} className="w-full sm:w-auto sm:float-right px-6 py-3 bg-slate-200 dark:bg-slate-700/50 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-lg font-semibold transition">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FileViewerModal;