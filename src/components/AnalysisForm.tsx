import React, { useState } from 'react';
import { RepoAnalysisRequest } from '../types';
import { GitBranch, Search } from 'lucide-react';

interface AnalysisFormProps {
  onSubmit: (request: RepoAnalysisRequest) => void;
  isLoading: boolean;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<RepoAnalysisRequest>({
    repoUrl: '',
    repoName: '',
    fileExtension: '.py',
    includeDiagrams: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.repoUrl && formData.repoName) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof RepoAnalysisRequest, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <GitBranch className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-medium text-gray-900">Repository Analysis</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-700 mb-1">
            GitHub Repository URL
          </label>
          <input
            type="url"
            id="repoUrl"
            value={formData.repoUrl}
            onChange={(e) => handleInputChange('repoUrl', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://github.com/username/repository"
            required
          />
        </div>

        <div>
          <label htmlFor="repoName" className="block text-sm font-medium text-gray-700 mb-1">
            Repository Name
          </label>
          <input
            type="text"
            id="repoName"
            value={formData.repoName}
            onChange={(e) => handleInputChange('repoName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="my-project"
            required
          />
        </div>

        <div>
          <label htmlFor="fileExtension" className="block text-sm font-medium text-gray-700 mb-1">
            File Extension
          </label>
          <select
            id="fileExtension"
            value={formData.fileExtension}
            onChange={(e) => handleInputChange('fileExtension', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value=".py">Python (.py)</option>
            <option value=".ts">TypeScript (.ts)</option>
            <option value=".js">JavaScript (.js)</option>
            <option value=".java">Java (.java)</option>
            <option value=".go">Go (.go)</option>
            <option value=".rs">Rust (.rs)</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="includeDiagrams"
            checked={formData.includeDiagrams}
            onChange={(e) => handleInputChange('includeDiagrams', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="includeDiagrams" className="ml-2 block text-sm text-gray-700">
            Include Diagrams
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading || !formData.repoUrl || !formData.repoName}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Analyzing...
            </>
          ) : (
            <>
              <Search className="h-4 w-4 mr-2" />
              Analyze Repository
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AnalysisForm;