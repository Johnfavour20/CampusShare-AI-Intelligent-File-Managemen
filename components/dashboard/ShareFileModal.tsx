import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { X, Share2, Mail } from 'lucide-react';

const ShareFileModal: React.FC = () => {
    const { fileToShare, cancelShareFile, confirmShareFile } = useAppContext();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    if (!fileToShare) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        setError('');
        confirmShareFile(fileToShare.id, email);
        setEmail(''); // Reset for next time
    };
    
    const handleCancel = () => {
        setEmail('');
        setError('');
        cancelShareFile();
    }

    return (
        <div className="fixed inset-0 bg-slate-900/50 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-blue-500/20 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-blue-500/20">
                    <div className="flex items-center space-x-3">
                        <Share2 className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Share File</h2>
                    </div>
                    <button onClick={handleCancel} className="p-1 rounded-full text-slate-500 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white transition">
                        <X className="w-5 h-5"/>
                    </button>
                </div>
                <div className="py-6">
                    <p className="text-slate-600 dark:text-gray-300 mb-2">You are sharing:</p>
                    <p className="font-semibold text-slate-900 dark:text-white truncate mb-6" title={fileToShare.name}>{fileToShare.name}</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="share-email" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                            Share with (email address)
                        </label>
                        <div className="relative">
                            <Mail className="w-5 h-5 text-slate-400 dark:text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                id="share-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="e.g., colleague@university.edu.ng"
                                className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-blue-500/30 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                        <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-4 border-t border-slate-200 dark:border-blue-500/20">
                            <button type="button" onClick={handleCancel} className="w-full px-6 py-3 bg-slate-200 dark:bg-slate-700/50 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-lg font-semibold transition">
                                Cancel
                            </button>
                            <button type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition flex items-center justify-center space-x-2">
                                <Share2 className="w-5 h-5"/>
                                <span>Share File</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ShareFileModal;