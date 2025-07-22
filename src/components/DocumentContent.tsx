import React, { useEffect, useRef } from 'react';
import { AnalysisResult, DocumentSection } from '../types';
import mermaid from 'mermaid';

interface DocumentContentProps {
  document: AnalysisResult;
}

const DocumentContent: React.FC<DocumentContentProps> = ({ document }) => {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true, theme: 'neutral' });
    if (mermaidRef.current) {
      mermaid.contentLoaded();
    }
  }, [document]);

  const renderSection = (section: DocumentSection, index: number) => {
    switch (section.type) {
      case 'text':
        return (
          <div key={section.id} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed">
              {section.content.split('\n').map((paragraph, i) => (
                paragraph.trim() && (
                  <p key={i} className="mb-4">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          </div>
        );

      case 'code':
        return (
          <div key={section.id} className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-3">{section.title}</h3>
            <div className="bg-gray-50 rounded-lg border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-200 bg-gray-100 rounded-t-lg">
                <span className="text-xs font-medium text-gray-600 uppercase">
                  {section.language || 'Code'}
                </span>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm text-gray-800">{section.content}</code>
              </pre>
            </div>
          </div>
        );

      case 'diagram':
        return (
          <div key={section.id} className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-3">{section.title}</h3>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div
                className={`mermaid-${index}`}
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{document.repoName}</h1>
            <p className="text-sm text-gray-500 mt-1">
              Analysis completed on {new Date(document.analyzedAt).toLocaleDateString()}
            </p>
          </div>
          <a
            href={document.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View Repository →
          </a>
        </div>
      </div>

      <div className="p-6" ref={mermaidRef}>
        {document.sections.map((section, index) => renderSection(section, index))}
      </div>
    </div>
  );
};

export default DocumentContent;