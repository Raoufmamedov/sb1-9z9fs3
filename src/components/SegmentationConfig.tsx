import React from 'react';
import { Settings } from 'lucide-react';
import { SegmentationConfig } from '../types';

interface ConfigProps {
  config: SegmentationConfig;
  onConfigChange: (config: SegmentationConfig) => void;
}

export function ConfigurationPanel({ config, onConfigChange }: ConfigProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="text-blue-600" />
        <h2 className="text-xl font-semibold">Configuration</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Maximum Block Size (characters)
          </label>
          <input
            type="number"
            value={config.maxBlockSize}
            onChange={(e) => onConfigChange({
              ...config,
              maxBlockSize: Math.max(0, parseInt(e.target.value))
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Minimum Block Size (characters)
          </label>
          <input
            type="number"
            value={config.minBlockSize}
            onChange={(e) => onConfigChange({
              ...config,
              minBlockSize: Math.max(0, parseInt(e.target.value))
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Optimization Strategy
          </label>
          <select
            value={config.optimizeFor}
            onChange={(e) => onConfigChange({
              ...config,
              optimizeFor: e.target.value as SegmentationConfig['optimizeFor']
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="coherence">Maximize Coherence</option>
            <option value="size">Uniform Size</option>
            <option value="balanced">Balanced</option>
          </select>
        </div>
      </div>
    </div>
  );
}