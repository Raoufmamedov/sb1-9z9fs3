import React, { useState } from 'react';
import { TextInput } from './components/TextInput';
import { ConfigurationPanel } from './components/SegmentationConfig';
import { SegmentationResults } from './components/SegmentationResults';
import { SegmentationConfig, SegmentationResult } from './types';
import { segmentText } from './services/api';
import { Loader2 } from 'lucide-react';

function App() {
  const [config, setConfig] = useState<SegmentationConfig>({
    maxBlockSize: 1000,
    minBlockSize: 100,
    optimizeFor: 'balanced',
  });

  const [result, setResult] = useState<SegmentationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTextSubmit = async (text: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await segmentText(text, config);
      setResult(response);
    } catch (err) {
      setError('Failed to process text. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Text Segmentation Service
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <TextInput onTextSubmit={handleTextSubmit} />
            
            {loading && (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="animate-spin text-blue-600" size={32} />
                <span className="ml-2">Processing text...</span>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mt-4">
                {error}
              </div>
            )}

            {result && !loading && (
              <div className="mt-6">
                <SegmentationResults result={result} />
              </div>
            )}
          </div>

          <div>
            <ConfigurationPanel
              config={config}
              onConfigChange={setConfig}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;