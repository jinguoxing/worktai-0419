import React from 'react';
import { Block } from '../types';
import { CommandBlockView } from './blocks/CommandBlockView';
import { WorkBlockView } from './blocks/WorkBlockView';
import { ResultBlockView } from './blocks/ResultBlockView';
import { ActivityBlockView } from './blocks/ActivityBlockView';

interface Props {
  blocks: Block[];
  onBlockClick: (block: Block) => void;
  activeBlockId?: string;
}

export function BlockStream({ blocks, onBlockClick, activeBlockId }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {blocks.map((block) => {
        const isActive = activeBlockId === block.id;
        
        return (
          <div 
            key={block.id}
            className="group cursor-pointer"
            onClick={() => onBlockClick(block)}
          >
            {block.type === 'command' && <CommandBlockView block={block} isActive={isActive} />}
            {block.type === 'work' && <WorkBlockView block={block} isActive={isActive} />}
            {block.type === 'result' && <ResultBlockView block={block} isActive={isActive} />}
            {block.type === 'activity' && <ActivityBlockView block={block} />}
          </div>
        );
      })}
    </div>
  );
}
