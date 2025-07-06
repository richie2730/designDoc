import React from 'react';
import { Download, FileText, File, FileImage } from 'lucide-react';

interface ExportPanelProps {
  onExport: (format: 'pdf' | 'markdown' | 'docx') => void;
  isExporting: boolean;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({ onExport, isExporting }) => {
  const exportOptions = [
    {
      format: 'pdf' as const,
      label: 'Export as PDF',
      icon: FileText,
      description: 'Complete document with embedded diagrams'
    },
    {
      format: 'markdown' as const,
      label: 'Export as Markdown',
      icon: File,
      description: 'Formatted text with diagram links'
    },
    {
      format: 'docx' as const,
      label: 'Export as Word',
      icon: FileImage,
      description: 'Microsoft Word document format'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Download className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Export Design Document</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exportOptions.map(({ format, label, icon: Icon, description }) => (
          <button
            key={format}
            onClick={() => onExport(format)}
            disabled={isExporting}
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <Icon className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-gray-800 mb-1">{label}</span>
            <span className="text-sm text-gray-500 text-center">{description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};