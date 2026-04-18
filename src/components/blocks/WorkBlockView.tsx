import React from 'react';
import { WorkBlock } from '../../types';
import { Bot, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export function WorkBlockView({ block, isActive }: { block: WorkBlock; isActive: boolean }) {
  return (
    <div className={cn(
      "w-full rounded-xl border bg-white p-4 transition-all shadow-sm",
      isActive ? "border-blue-300 ring-4 ring-blue-500/5 shadow-md shadow-blue-500/5" : "border-slate-200 hover:border-slate-300 hover:shadow-md"
    )}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <Bot className="w-4 h-4" />
          </div>
          {block.status !== 'succeeded' && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center">
              <Loader2 className="w-3 h-3 text-blue-600 animate-spin" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-900">
              {block.status === 'running' ? '智能体正在处理中...' : '任务执行完毕'}
            </span>
          </div>
          <div className="text-xs text-slate-500 mt-0.5 max-w-sm truncate">
            {block.steps.map(s => s.name).join(' → ')}
          </div>
        </div>
      </div>

      <div className="pl-[15px]">
        <div className="border-l border-slate-200 pl-6 space-y-3">
          {block.steps.map((step, idx) => (
            <div key={step.id} className="relative flex items-center h-5">
              <div className="absolute -left-[29px] bg-white py-1">
                {step.status === 'succeeded' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 bg-white" />
                ) : step.status === 'running' ? (
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin bg-white" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-slate-300 mx-1" />
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-indigo-600">{step.agentName}</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className={cn(
                  "text-xs",
                  step.status === 'succeeded' ? "text-slate-700" : "text-slate-400"
                )}>
                  {step.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
