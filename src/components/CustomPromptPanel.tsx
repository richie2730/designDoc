import React, { useState } from 'react';
import { Settings, ChevronDown, ChevronRight, Save } from 'lucide-react';

interface CustomPromptPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const CustomPromptPanel: React.FC<CustomPromptPanelProps> = ({ isOpen, onToggle }) => {
  const [config, setConfig] = useState({
    includePrimary: true,
    includePrivate: false,
    focusModules: '',
    verbosity: 'detailed' as 'brief' | 'detailed',
    includeTests: true,
    includeDependencies: true
  });

  const handleSave = () => {
    // Save configuration logic here
    console.log('Saving configuration:', config);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <button
        onClick={onToggle}
        className="flex items-center gap-3 w-full text-left"
      >
        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-500" />
        )}
        <Settings className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-800">Advanced Prompt Settings</h2>
        <span className="ml-auto text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
          Experimental
        </span>
      </button>
      
      {isOpen && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Include/Exclude Options</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={config.includePrimary}
                    onChange={(e) => setConfig(prev => ({ ...prev, includePrimary: e.target.checked }))}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">Include primary methods</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={config.includePrivate}
                    onChange={(e) => setConfig(prev => ({ ...prev, includePrivate: e.target.checked }))}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">Include private methods</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={config.includeTests}
                    onChange={(e) => setConfig(prev => ({ ...prev, includeTests: e.target.checked }))}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">Include test files</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={config.includeDependencies}
                    onChange={(e) => setConfig(prev => ({ ...prev, includeDependencies: e.target.checked }))}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">Include dependencies</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-800 mb-3">Focus & Verbosity</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Focus on specific modules
                  </label>
                  <input
                    type="text"
                    value={config.focusModules}
                    onChange={(e) => setConfig(prev => ({ ...prev, focusModules: e.target.value }))}
                    placeholder="e.g., auth, database, api"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Verbosity level
                  </label>
                  <select
                    value={config.verbosity}
                    onChange={(e) => setConfig(prev => ({ ...prev, verbosity: e.target.value as 'brief' | 'detailed' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="brief">Brief</option>
                    <option value="detailed">Detailed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Configuration
            </button>
          </div>
        </div>
      )}
    </div>
  );
};