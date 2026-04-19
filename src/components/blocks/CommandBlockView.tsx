import React from 'react';
import { CommandBlock } from '../../types';
import { TerminalSquare, Clock, CheckCircle2, Loader2, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export function CommandBlockView({ block, isActive }: { block: CommandBlock; isActive: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-xl border bg-white p-4 transition-all duration-300 shadow-sm",
        isActive ? "border-blue-400 ring-2 ring-blue-500/10 shadow-md shadow-blue-500/5" : "border-slate-200 hover:border-slate-300 hover:shadow-md"
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="bg-slate-100 border border-slate-200 p-2 rounded-lg text-slate-600 shadow-sm">
              <TerminalSquare className="w-5 h-5" />
            </div>
            {block.status === 'running' && (
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-white rounded-full border border-slate-200 flex items-center justify-center">
                <Loader2 className="w-2.5 h-2.5 text-blue-600 animate-spin" />
              </div>
            )}
            {block.status === 'succeeded' && (
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-white rounded-full border border-slate-200 flex items-center justify-center">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
              </div>
            )}
          </div>
          <div>
             <div className="text-xs text-slate-500 font-mono tracking-wide mb-1 flex items-center space-x-2">
                <span className="uppercase">用户指令</span>
                {block.status === 'running' && <span className="text-blue-500">正在执行...</span>}
             </div>
            <div className="text-base font-medium text-slate-900 leading-relaxed">{block.content}</div>
          </div>
        </div>
        <div className="flex items-center text-[10px] text-slate-400 font-mono">
          <Clock className="w-3 h-3 mr-1" />
          {block.timestamp}
        </div>
      </div>

      {block.attachments && block.attachments.length > 0 && (
        <div className="mt-3 text-sm pl-12">
          <div className="flex flex-wrap gap-2">
            {block.attachments.map((file, idx) => (
              <div key={idx} className="flex items-center space-x-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg transition-colors hover:bg-slate-100">
                <FileText className="w-4 h-4 text-blue-500" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-700 max-w-[150px] truncate leading-tight">
                    {file.name}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
