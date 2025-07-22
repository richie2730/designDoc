import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AnalysisForm from './components/AnalysisForm';
import Sidebar from './components/Sidebar';
import DocumentContent from './components/DocumentContent';
import ExportButtons from './components/ExportButtons';
import { RepoAnalysisRequest, AnalysisResult, SidebarDocument } from './types';
import { analyzeRepository, getAnalyzedDocuments, getDocumentById } from './services/api';

function App() {
  const [documents, setDocuments] = useState<SidebarDocument[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [currentDocument, setCurrentDocument] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const docs = await getAnalyzedDocuments();
      const sidebarDocs: SidebarDocument[] = docs.map(doc => ({
        id: doc.id,
        repoName: doc.repoName,
        analyzedAt: doc.analyzedAt,
      }));
      setDocuments(sidebarDocs);
    } catch (error) {
      console.error('Failed to load documents:', error);
    }
  };

  const handleAnalyze = async (request: RepoAnalysisRequest) => {
    setIsLoading(true);
    try {
      const result = await analyzeRepository(request);
      setCurrentDocument(result);
      setSelectedDocument(result.id);
      setShowForm(false);
      await loadDocuments();
      setSidebarOpen(false);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectDocument = async (id: string) => {
    try {
      const doc = await getDocumentById(id);
      setCurrentDocument(doc);
      setSelectedDocument(id);
      setShowForm(false);
      setSidebarOpen(false);
    } catch (error) {
      console.error('Failed to load document:', error);
    }
  };

  const handleNewAnalysis = () => {
    setShowForm(true);
    setCurrentDocument(null);
    setSelectedDocument(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <Sidebar
          documents={documents}
          selectedDocument={selectedDocument}
          onSelectDocument={handleSelectDocument}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 lg:ml-0">
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            {showForm && (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Design Documentation Generator
                  </h1>
                  <p className="text-gray-600">
                    Analyze your GitHub repositories and generate comprehensive design documentation
                  </p>
                </div>
                <AnalysisForm onSubmit={handleAnalyze} isLoading={isLoading} />
              </>
            )}

            {currentDocument && (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Documentation
                  </h2>
                  <button
                    onClick={handleNewAnalysis}
                    className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    + New Analysis
                  </button>
                </div>
                
                <div className="document-content">
                  <DocumentContent document={currentDocument} />
                </div>
                
                <ExportButtons document={currentDocument} />
              </>
            )}

            {!showForm && !currentDocument && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Select a document from the sidebar or</p>
                <button
                  onClick={handleNewAnalysis}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Start New Analysis
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;