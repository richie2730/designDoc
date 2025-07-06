import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FileText, Code, RefreshCw } from 'lucide-react';

interface DesignDocumentViewerProps {
  hldContent: string;
  lldContent: string;
  diagrams: {
    architecture: string;
    sequence: string;
    class: string;
  };
}

export const DesignDocumentViewer: React.FC<DesignDocumentViewerProps> = ({
  hldContent,
  lldContent,
  diagrams
}) => {
  const [activeTab, setActiveTab] = useState<'hld' | 'lld'>('hld');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    overview: true,
    components: true,
    architecture: true,
    classes: true,
    methods: true,
    sequences: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderDiagram = (diagramCode: string, title: string) => (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-700">{title}</h4>
        <button className="text-blue-600 hover:text-blue-700 transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
      <div className="bg-white rounded border p-4 font-mono text-sm text-gray-600">
        <pre className="whitespace-pre-wrap">{diagramCode}</pre>
      </div>
    </div>
  );

  const SectionHeader = ({ title, sectionKey, icon: Icon }: { title: string; sectionKey: string; icon: any }) => (
    <button
      onClick={() => toggleSection(sectionKey)}
      className="flex items-center gap-2 w-full text-left py-2 px-1 hover:bg-gray-50 rounded transition-colors"
    >
      {expandedSections[sectionKey] ? (
        <ChevronDown className="w-4 h-4 text-gray-500" />
      ) : (
        <ChevronRight className="w-4 h-4 text-gray-500" />
      )}
      <Icon className="w-4 h-4 text-gray-600" />
      <span className="font-medium text-gray-800">{title}</span>
    </button>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-800">Design Document</h2>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('hld')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
            activeTab === 'hld'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          High-Level Design (HLD)
        </button>
        <button
          onClick={() => setActiveTab('lld')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
            activeTab === 'lld'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Low-Level Design (LLD)
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'hld' && (
          <div>
            <SectionHeader title="System Overview" sectionKey="overview" icon={FileText} />
            {expandedSections.overview && (
              <div className="ml-6 mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 leading-relaxed">{hldContent}</p>
              </div>
            )}

            <SectionHeader title="Component Descriptions" sectionKey="components" icon={Code} />
            {expandedSections.components && (
              <div className="ml-6 mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p>Main application components and their responsibilities...</p>
                </div>
              </div>
            )}

            <SectionHeader title="Architecture Diagram" sectionKey="architecture" icon={FileText} />
            {expandedSections.architecture && (
              <div className="ml-6 mb-4">
                {renderDiagram(diagrams.architecture, 'System Architecture')}
              </div>
            )}
          </div>
        )}

        {activeTab === 'lld' && (
          <div>
            <SectionHeader title="Class Breakdown" sectionKey="classes" icon={Code} />
            {expandedSections.classes && (
              <div className="ml-6 mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 leading-relaxed">{lldContent}</p>
              </div>
            )}

            <SectionHeader title="Method Descriptions" sectionKey="methods" icon={FileText} />
            {expandedSections.methods && (
              <div className="ml-6 mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p>Detailed method descriptions with input/output specifications...</p>
                </div>
              </div>
            )}

            <SectionHeader title="Sequence Diagrams" sectionKey="sequences" icon={FileText} />
            {expandedSections.sequences && (
              <div className="ml-6 mb-4">
                {renderDiagram(diagrams.sequence, 'Sequence Diagram')}
                {renderDiagram(diagrams.class, 'Class Diagram')}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};