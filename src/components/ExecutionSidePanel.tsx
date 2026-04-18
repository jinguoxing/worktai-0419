import React from 'react';
import { Activity, Terminal } from 'lucide-react';
import { ExecutionTrace } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  trace: ExecutionTrace | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ExecutionSidePanel({ trace, isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 320, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="border-l border-slate-200 bg-white/80 backdrop-blur flex flex-col overflow-hidden shrink-0 shadow-[-10px_0_30px_rgba(0,0,0,0.03)]"
        >
          <div className="w-[320px] flex flex-col h-full uppercase-none">
            <div className="h-14 border-b border-slate-200 flex items-center justify-between px-4 shrink-0 bg-white/50">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold text-slate-800 tracking-wider uppercase">执行链路</span>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded text-slate-500 transition-colors">
                &times;
              </button>
            </div>

            {trace ? (
              <div className="flex-1 overflow-y-auto p-4 space-y-6 text-sm">
                <div className="space-y-2">
                  <h3 className="text-xs font-medium text-slate-500 uppercase tracking-widest">任务概览</h3>
                  <div className="bg-slate-50 border border-slate-200 shadow-sm p-3 rounded-lg space-y-2">
                    <div className="text-slate-900 font-medium">{trace.taskTitle}</div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>状态: {trace.status}</span>
                      <span>开始: {trace.startTime}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-medium text-slate-500 uppercase tracking-widest">多智能体协作</h3>
                  <div className="pl-2 space-y-4 border-l border-slate-200 ml-2">
                    {trace.agentTimeline.map((ev, idx) => (
                      <div key={idx} className="relative pl-4">
                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-white" />
                        <div className="text-xs font-medium text-blue-600 mb-0.5">{ev.agent}</div>
                        <div className="text-xs text-slate-600">{ev.action}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-medium text-slate-500 uppercase tracking-widest">底层工具调用</h3>
                  <div className="space-y-2">
                    {trace.toolSteps.map(step => (
                      <div key={step.id} className="bg-white border border-slate-200 shadow-sm rounded-md p-2">
                        <div className="flex flex-col space-y-1 mb-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-700 font-mono flex items-center space-x-1">
                              <Terminal className="w-3 h-3 text-emerald-600" />
                              <span>{step.name}</span>
                            </span>
                            <span className="text-[10px] text-slate-400">{step.duration}</span>
                          </div>
                          <div className="text-[10px] text-slate-500">执行者: {step.agentName}</div>
                        </div>
                        <div className="text-xs font-mono bg-slate-50 border border-slate-100 p-2 rounded text-slate-500 truncate mb-1">
                          &gt; {step.input}
                        </div>
                        <div className="text-xs font-mono bg-slate-100 p-2 rounded text-slate-600 truncate">
                          &lt; {step.output}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
                未选择任务轨迹
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
