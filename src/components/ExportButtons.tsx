import React from 'react';
import { AnalysisResult } from '../types';
import { Download, FileText, File } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';

interface ExportButtonsProps {
  document: AnalysisResult;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ document }) => {
  const exportToMarkdown = () => {
    let markdown = `# ${document.repoName}\n\n`;
    markdown += `**Repository:** ${document.repoUrl}\n`;
    markdown += `**Analyzed:** ${new Date(document.analyzedAt).toLocaleDateString()}\n\n`;

    document.sections.forEach((section) => {
      markdown += `## ${section.title}\n\n`;
      if (section.type === 'code') {
        markdown += `\`\`\`${section.language || ''}\n${section.content}\n\`\`\`\n\n`;
      } else {
        markdown += `${section.content}\n\n`;
      }
    });

    const blob = new Blob([markdown], { type: 'text/markdown' });
    saveAs(blob, `${document.repoName}-documentation.md`);
  };

  const exportToPDF = () => {
    const element = document.querySelector('.document-content') as HTMLElement;
    if (!element) return;

    const opt = {
      margin: 1,
      filename: `${document.repoName}-documentation.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const exportToWord = async () => {
    // Simple HTML to Word conversion
    let htmlContent = `<h1>${document.repoName}</h1>`;
    htmlContent += `<p><strong>Repository:</strong> ${document.repoUrl}</p>`;
    htmlContent += `<p><strong>Analyzed:</strong> ${new Date(document.analyzedAt).toLocaleDateString()}</p>`;

    document.sections.forEach((section) => {
      htmlContent += `<h2>${section.title}</h2>`;
      if (section.type === 'code') {
        htmlContent += `<pre><code>${section.content}</code></pre>`;
      } else {
        htmlContent += `<p>${section.content.replace(/\n/g, '</p><p>')}</p>`;
      }
    });

    const blob = new Blob([htmlContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    saveAs(blob, `${document.repoName}-documentation.docx`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Export Documentation</h3>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={exportToMarkdown}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FileText className="h-4 w-4 mr-2" />
          Export to Markdown
        </button>

        <button
          onClick={exportToPDF}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Download className="h-4 w-4 mr-2" />
          Export to PDF
        </button>

        <button
          onClick={exportToWord}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <File className="h-4 w-4 mr-2" />
          Export to Word
        </button>
      </div>
    </div>
  );
};

export default ExportButtons;