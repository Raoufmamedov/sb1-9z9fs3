export interface TextBlock {
  id: string;
  content: string;
  startIndex: number;
  endIndex: number;
  metrics: {
    coherenceScore: number;
    length: number;
  };
}

export interface SegmentationConfig {
  maxBlockSize: number;
  minBlockSize: number;
  optimizeFor: 'coherence' | 'size' | 'balanced';
}

export interface SegmentationResult {
  blocks: TextBlock[];
  metrics: {
    averageBlockSize: number;
    variance: number;
    totalBlocks: number;
  };
}