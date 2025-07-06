import React, { useState } from 'react';
import { RepositoryInput } from './components/RepositoryInput';
import { DesignDocumentViewer } from './components/DesignDocumentViewer';
import { ExportPanel } from './components/ExportPanel';
import { CustomPromptPanel } from './components/CustomPromptPanel';
import { Toast } from './components/Toast';

interface DocumentData {
  hld: string;
  lld: string;
  diagrams: {
    architecture: string;
    sequence: string;
    class: string;
  };
}

function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [documentData, setDocumentData] = useState<DocumentData | null>(null);
  const [isPromptPanelOpen, setIsPromptPanelOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  }>({ message: '', type: 'success', isVisible: false });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleGenerate = async (url: string) => {
    setIsGenerating(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock data
      const mockData: DocumentData = {
        hld: "This system follows a microservices architecture with React frontend, Node.js backend, and PostgreSQL database. The main components include user authentication, data processing, and API gateway services. The system is designed for scalability and maintainability with clear separation of concerns.",
        lld: "The application consists of several key classes: UserService (handles authentication and user management), DataProcessor (processes incoming data), APIGateway (routes requests), and DatabaseManager (handles data persistence). Each class follows SOLID principles and implements proper error handling.",
        diagrams: {
          architecture: `graph TD
    A[Frontend - React] --> B[API Gateway]
    B --> C[Auth Service]
    B --> D[Data Service]
    B --> E[User Service]
    C --> F[Database]
    D --> F
    E --> F`,
          sequence: `sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API Gateway
    participant S as Service
    participant D as Database
    
    U->>F: Login Request
    F->>A: POST /auth/login
    A->>S: Authenticate
    S->>D: Query User
    D-->>S: User Data
    S-->>A: JWT Token
    A-->>F: Response
    F-->>U: Dashboard`,
          class: `classDiagram
    class User {
        +id: string
        +email: string
        +password: string
        +createdAt: Date
        +authenticate()
        +updateProfile()
    }
    
    class UserService {
        +createUser()
        +loginUser()
        +updateUser()
        +deleteUser()
    }
    
    User --> UserService`
        }
      };
      
      setDocumentData(mockData);
      showToast('Design generation completed!', 'success');
    } catch (error) {
      showToast('Failed to generate design document. Please try again.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = async (format: 'pdf' | 'markdown' | 'docx') => {
    setIsExporting(true);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const fileName = `design-document.${format}`;
      showToast(`Document exported as ${fileName}`, 'success');
    } catch (error) {
      showToast('Export failed. Please try again.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Design Document Generator
            </h1>
            <p className="text-gray-600 text-lg">
              Transform your GitHub repositories into comprehensive design documents
            </p>
          </header>

          <RepositoryInput onGenerate={handleGenerate} isLoading={isGenerating} />
          
          <CustomPromptPanel 
            isOpen={isPromptPanelOpen} 
            onToggle={() => setIsPromptPanelOpen(!isPromptPanelOpen)} 
          />

          {documentData && (
            <>
              <DesignDocumentViewer
                hldContent={documentData.hld}
                lldContent={documentData.lld}
                diagrams={documentData.diagrams}
              />
              
              <ExportPanel onExport={handleExport} isExporting={isExporting} />
            </>
          )}

          <Toast
            message={toast.message}
            type={toast.type}
            isVisible={toast.isVisible}
            onClose={hideToast}
          />
        </div>
      </div>
    </div>
  );
}

export default App;