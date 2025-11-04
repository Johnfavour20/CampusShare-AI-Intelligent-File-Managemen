import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Sparkles, Loader, FileText, Check, X, Edit3 } from 'lucide-react';

const AIInsightsModal: React.FC = () => {
    const { 
        isAnalyzing, 
        analysisResult, 
        fileForAnalysis, 
        finalizeUpload, 
        cancelAnalysis 
    } = useAppContext();

    const [suggestedName, setSuggestedName] = useState('');
    
    useEffect(() => {
        if (analysisResult) {
            setSuggestedName(analysisResult.suggestedName);
        }
    }, [analysisResult]);

    if (!fileForAnalysis) return null;

    const handleAccept = () => {
        if (analysisResult) {
             finalizeUpload(fileForAnalysis, {
                name: suggestedName,
                summary: analysisResult.summary,
                keywords: analysisResult.keywords,
                category: analysisResult.category
            });
        }
    }

    const handleSaveOriginal = () => {
        finalizeUpload(fileForAnalysis);
    }

    const renderLoadingState = () => (
        <>
            <div className="mx-auto w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center mb-6 animate-pulse">
                <Loader className="w-8 h-8 text-blue-500 dark:text-blue-400 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">Analyzing File...</h2>
            <p className="text-slate-500 dark:text-gray-400 text-center">Our AI is generating a summary and extracting key topics. This may take a moment.</p>
            <p className="text-center font-medium text-slate-800 dark:text-white mt-4 break-all px-4">{fileForAnalysis.name}</p>
        </>
    );

    const renderResultsState = () => (
        <>
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-blue-500/20">
                 <div className="flex items-center space-x-3">
                    <Sparkles className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">AI Insights Generated</h2>
                 </div>
                 <button onClick={cancelAnalysis} className="p-1 rounded-full text-slate-500 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white transition">
                    <X className="w-5 h-5"/>
                 </button>
            </div>
            <div className="space-y-6 py-6 max-h-[60vh] overflow-y-auto pr-2">
                <div>
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 mb-2">Original Filename</h3>
                    <p className="text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-900/50 rounded-lg p-3 text-sm truncate">{fileForAnalysis.name}</p>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 mb-2 flex items-center space-x-2">
                        <Edit3 className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                        <span>Suggested Filename (Editable)</span>
                    </h3>
                    <input 
                        type="text"
                        value={suggestedName}
                        onChange={(e) => setSuggestedName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-blue-500/30 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition"
                    />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 mb-2">AI Summary</h3>
                    <p className="text-slate-700 dark:text-gray-300 bg-slate-100 dark:bg-slate-900/50 rounded-lg p-3 text-sm">{analysisResult?.summary}</p>
                </div>
                 <div>
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 mb-2">Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                        {analysisResult?.keywords.map(kw => (
                            <span key={kw} className="px-3 py-1 bg-cyan-500/10 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300 text-xs font-medium rounded-full">{kw}</span>
                        ))}
                    </div>
                </div>
                 <div>
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 mb-2">Suggested Category</h3>
                    <span className="px-3 py-1 bg-purple-500/10 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 text-sm font-medium rounded-full">{analysisResult?.category}</span>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-200 dark:border-blue-500/20">
                <button onClick={handleAccept} className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition flex items-center justify-center space-x-2">
                    <Check className="w-5 h-5"/>
                    <span>Accept & Save</span>
                </button>
                <button onClick={handleSaveOriginal} className="w-full px-6 py-3 bg-slate-200 dark:bg-slate-700/50 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-lg font-semibold transition">Save with Original Name</button>
            </div>
        </>
    );

    return (
        <div className="fixed inset-0 bg-slate-900/50 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-blue-500/20 rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative">
                 <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-20 blur-xl pointer-events-none"></div>
                {isAnalyzing ? renderLoadingState() : renderResultsState()}
            </div>
        </div>
    );
};

export default AIInsightsModal;