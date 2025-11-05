import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const UploadSection: React.FC = () => {
    const { startFileUploadAnalysis } = useAppContext();
    const [isDragOver, setIsDragOver] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            startFileUploadAnalysis(file);
            e.target.value = ''; // Reset input to allow re-uploading the same file
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            startFileUploadAnalysis(file);
        }
    }

    return (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-blue-500/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Upload New Material</h3>

            <label
                onDragEnter={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false); }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center transition cursor-pointer ${isDragOver ? 'border-blue-500 bg-blue-500/10 dark:bg-slate-700/50' : 'border-slate-300 dark:border-blue-500/30 hover:border-blue-500/50'}`}
            >
                <input type="file" className="hidden" onChange={handleFileChange} />
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                </div>
                <p className="text-slate-800 dark:text-white font-medium mb-2">
                    <span className="text-blue-600 dark:text-blue-400">Click to upload</span> or drag and drop
                </p>
                <p className="text-slate-500 dark:text-gray-400 text-sm">PDF, DOC, DOCX, PPT, PPTX up to 50MB</p>
            </label>
        </div>
    );
};

export default UploadSection;