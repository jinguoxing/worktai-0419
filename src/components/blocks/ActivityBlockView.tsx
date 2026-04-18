import React from 'react';
import { ActivityBlock } from '../../types';

export function ActivityBlockView({ block }: { block: ActivityBlock }) {
  return (
    <div className="pl-12 pr-4 py-1 flex items-center group">
      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-3 shrink-0 group-hover:bg-blue-500 transition-colors" />
      <span className="text-xs text-slate-500 group-hover:text-slate-700 transition-colors truncate">
        {block.content}
      </span>
      <span className="ml-auto text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
        {block.timestamp}
      </span>
    </div>
  );
}
