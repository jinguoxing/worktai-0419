import React, { useState } from 'react';
import { Activity, Terminal, ChevronDown, ChevronRight, AlertCircle, CheckCircle2, Loader2, PauseCircle, RefreshCcw, X } from 'lucide-react';
import { ExecutionTrace } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  trace: ExecutionTrace | null;
  isOpen: boolean;
  onClose: () => void;
}

function ToolStepDetails({ step }: { step: any }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden transition-all">
      <div 
        onClick={() => setExpanded(!expanded)}
        className="flex flex-col p-2.5 cursor-pointer hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-1.5">
            {step.status === 'running' ? <Loader2 className="w-3.5 h-3.5 text-blue-500 animate-spin" /> : 
             step.status === 'failed' ? <AlertCircle className="w-3.5 h-3.5 text-red-500" /> : 
             <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
            <span className="text-[11px] font-bold text-slate-700 font-mono flex items-center">
              {step.name}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono">{step.duration || '--'}</span>
            {expanded ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
          </div>
        </div>
        <div className="text-[10px] text-slate-500 flex items-center space-x-2">
          <span>调用方: {step.agentName}</span>
          {step.status === 'failed' && <span className="text-red-500 font-medium">执行异常</span>}
        </div>
      </div>
      
      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50 p-2.5 space-y-2">
          <div>
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Input Payload</div>
            <div className="text-[10px] font-mono bg-white border border-slate-200 p-2 rounded text-slate-600 break-all max-h-24 overflow-y-auto">
              {step.input}
            </div>
          </div>
          <div>
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Output Response</div>
            <div className={cn("text-[10px] font-mono border p-2 rounded break-all max-h-32 overflow-y-auto", step.status === 'failed' ? "bg-red-50/50 border-red-100 text-red-700" : "bg-white border-slate-200 text-slate-600")}>
              {step.output}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ExecutionSidePanel({ trace, isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 340, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="border-l border-slate-200 bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.03)] flex flex-col overflow-hidden shrink-0"
        >
          <div className="w-[340px] flex flex-col h-full uppercase-none">
            <div className="h-14 border-b border-slate-200 flex items-center justify-between px-4 shrink-0 bg-slate-50/50">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-800 tracking-widest uppercase">任务执行检查器</span>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-md text-slate-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {trace ? (
              <div className="flex-1 overflow-y-auto p-4 space-y-6 text-sm">
                
                {/* 1. 当前阶段概览 */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-1">
                    <span>当前任务状态</span>
                  </h3>
                  <div className={cn(
                    "border shadow-sm p-3.5 rounded-xl space-y-2.5 transition-colors duration-500",
                    trace.status === 'running' ? "bg-blue-50/50 border-blue-200" :
                    trace.status === 'waiting_user' ? "bg-amber-50/50 border-amber-200" :
                    trace.status === 'succeeded' ? "bg-emerald-50/50 border-emerald-200" :
                    "bg-red-50/50 border-red-200"
                  )}>
                    <div className="text-[13px] font-semibold text-slate-800 leading-snug">{trace.taskTitle}</div>
                    
                    <div className="flex items-center justify-between text-[11px] font-medium pt-1">
                      <div className="flex items-center space-x-1.5">
                        {trace.status === 'running' && <><Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" /><span className="text-blue-700">执行中</span></>}
                        {trace.status === 'waiting_user' && <><PauseCircle className="w-3.5 h-3.5 text-amber-600" /><span className="text-amber-700">等待确认</span></>}
                        {trace.status === 'succeeded' && <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /><span className="text-emerald-700">已完成</span></>}
                        {trace.status === 'failed' && <><AlertCircle className="w-3.5 h-3.5 text-red-600" /><span className="text-red-700">执行异常</span></>}
                      </div>
                      <span className="text-slate-400">{trace.startTime}</span>
                    </div>

                    {/* 如果是等待确认状态，给出明确的 Action 指引 */}
                    {trace.status === 'waiting_user' && (
                      <div className="mt-2 pt-2 border-t border-amber-200/60 flex flex-col space-y-1.5">
                        <span className="text-[10px] text-amber-700 font-bold">待处理动作：</span>
                        <div className="text-[11px] text-amber-600/90 leading-tight">
                          请在主工作区核对执行计划，确认无误后批准，或修改指令细节。
                        </div>
                      </div>
                    )}
                    
                    {/* 如果失败，给出重试入口 */}
                    {trace.status === 'failed' && (
                      <div className="mt-2 pt-2 border-t border-red-200/60">
                        <button className="flex items-center text-[11px] font-bold text-red-600 hover:text-red-700 bg-red-100/50 px-2.5 py-1.5 rounded-lg transition-colors">
                          <RefreshCcw className="w-3 h-3 mr-1.5" /> 重新执行失败节点
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. 编排时间线 */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between">
                    <span>协作编排时间线</span>
                    <span className="text-slate-300 font-normal">{trace.agentTimeline.length} steps</span>
                  </h3>
                  <div className="pl-3 space-y-4 border-l-2 border-slate-100 ml-1.5 py-1">
                    {trace.agentTimeline.map((ev, idx) => (
                      <div key={idx} className="relative pl-5">
                        <div className="absolute -left-[20px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white shadow-sm" />
                        <div className="text-[11px] font-bold text-slate-800 mb-0.5">{ev.agent}</div>
                        <div className="text-[11px] text-slate-500 leading-snug">{ev.action}</div>
                      </div>
                    ))}
                    {trace.status === 'running' && (
                      <div className="relative pl-5 opacity-60">
                        <div className="absolute -left-[20px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-white animate-pulse" />
                        <div className="text-[11px] font-bold text-slate-400 mb-0.5">下一步规划中...</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. 底层工具调用堆栈 */}
                {trace.toolSteps.length > 0 && (
                  <div className="space-y-3 pb-8">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between">
                      <span>底层工具级调用堆栈</span>
                      <span className="text-slate-300 font-normal">{trace.toolSteps.length} items</span>
                    </h3>
                    <div className="space-y-2.5">
                      {trace.toolSteps.map(step => (
                        <ToolStepDetails key={step.id} step={step} />
                      ))}
                    </div>
                  </div>
                )}
                
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-[11px] space-y-3">
                <Terminal className="w-8 h-8 text-slate-200" />
                <span>暂无任务轨迹，请在左侧发起新任务</span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
