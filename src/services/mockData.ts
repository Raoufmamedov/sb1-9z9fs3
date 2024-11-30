import { SegmentationResult, TextBlock } from '../types';

export function generateMockBlocks(text: string, maxBlockSize: number): TextBlock[] {
  // Simple text splitting logic for mock data
  const words = text.split(' ');
  const blocks: TextBlock[] = [];
  let currentBlock = '';
  let startIndex = 0;

  words.forEach((word, index) => {
    if ((currentBlock + ' ' + word).length <= maxBlockSize) {
      currentBlock += (currentBlock ? ' ' : '') + word;
    } else {
      blocks.push({
        id: `block-${blocks.length + 1}`,
        content: currentBlock,
        startIndex,
        endIndex: startIndex + currentBlock.length,
        metrics: {
          coherenceScore: Math.random() * 0.5 + 0.5, // Random score between 0.5 and 1
          length: currentBlock.length
        }
      });
      currentBlock = word;
      startIndex += currentBlock.length + 1;
    }
  });

  // Add the last block
  if (currentBlock) {
    blocks.push({
      id: `block-${blocks.length + 1}`,
      content: currentBlock,
      startIndex,
      endIndex: startIndex + currentBlock.length,
      metrics: {
        coherenceScore: Math.random() * 0.5 + 0.5,
        length: currentBlock.length
      }
    });
  }

  return blocks;
}