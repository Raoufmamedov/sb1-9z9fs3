import React from 'react';
import { SegmentationResult, TextBlock } from '../types';
import { ChevronRight, AlertCircle } from 'lucide-react';

interface ResultsProps {
  result: SegmentationResult;
}

export function SegmentationResults({ result }: ResultsProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Segmentation Metrics</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">Average Block Size</p>
            <p className="text-xl font-semibold">{result.metrics.averageBlockSize}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">Total Blocks</p>
            <p className="text-xl font-semibold">{result.metrics.totalBlocks}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">Size Variance</p>
            <p className="text-xl font-semibold">{result.metrics.variance.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {result.blocks.map((block: TextBlock) => (
          <div key={block.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-start gap-3">
              <ChevronRight className="mt-1 flex-shrink-0 text-blue-600" />
              <div>
                <div className="text-sm text-gray-500 mb-2">
                  Block {block.id} ({block.metrics.length} chars)
                  {block.metrics.coherenceScore < 0.7 && (
                    <span className="ml-2 inline-flex items-center text-amber-600">
                      <AlertCircle size={16} className="mr-1" />
                      Low coherence
                    </span>
                  )}
                </div>
                <p className="text-gray-800">{block.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}