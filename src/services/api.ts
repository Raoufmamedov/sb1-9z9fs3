import { SegmentationConfig, SegmentationResult } from '../types';
import { generateMockBlocks } from './mockData';
import { config } from '../config/env';

const USE_MOCK_API = !config.openAiApiKey; // Use mock API if no OpenAI key is provided

export async function segmentText(
  text: string,
  config: SegmentationConfig
): Promise<SegmentationResult> {
  if (USE_MOCK_API) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const blocks = generateMockBlocks(text, config.maxBlockSize);
    
    // Calculate metrics
    const lengths = blocks.map(block => block.metrics.length);
    const averageBlockSize = lengths.reduce((a, b) => a + b, 0) / blocks.length;
    const variance = lengths.reduce((acc, len) => acc + Math.pow(len - averageBlockSize, 2), 0) / blocks.length;

    return {
      blocks,
      metrics: {
        averageBlockSize: Math.round(averageBlockSize),
        variance,
        totalBlocks: blocks.length
      }
    };
  }

  // Real API implementation with OpenAI
  try {
    const response = await fetch(`${config.apiUrl}/api/segment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.openAiApiKey}`,
      },
      body: JSON.stringify({
        text,
        config,
      }),
    });

    if (!response.ok) {
      throw new Error('Segmentation request failed');
    }

    return response.json();
  } catch (error) {
    console.error('Error during text segmentation:', error);
    throw error;
  }
}