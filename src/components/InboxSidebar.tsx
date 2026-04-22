import React from 'react';
import { Bell, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function InboxSidebar({ isOpen, onClose }: Props) {
  const pendingTasks = [
    { title: "线上发布被拦截", summary: "检测到 fact_order_detail 模型有 3 个未定义的新维度，导致下游视图发布阻塞。", action: "前往治理页", tone: "red" },
    { title: "命名域存在冲突疑似点", summary: "“总收入”指标在财务中心和运营中心存在两套计算口径，需要确认保留版本。", action: "对齐口径", tone: "amber" },
    { title: "异常波动诊断报告完成", summary: "昨日大促期间产生异常转化率跌幅，分析报告及初步归因已生成，请查阅。", action: "查看结果", tone: "slate" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-900/10 backdrop-blur-[1px]"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ x: 380, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 380, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 bottom-0 w-[380px] bg-slate-50 border-l border-slate-200 z-50 flex flex-col shadow-2xl"
          >
            <div className="h-14 flex items-center justify-between px-5 border-b border-slate-200 shrink-0 bg-white">
              <div className="flex items-center space-x-2 text-slate-800">
                <Bell className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold">待办通知</span>
                <span className="flex items-center justify-center bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-2">1</span>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex space-x-2">
                <button className="text-[11px] font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm hover:border-slate-300">
                  需要处理
                </button>
                <button className="text-[11px] font-medium text-slate-500 border border-transparent px-3 py-1.5 rounded-full hover:bg-slate-200/50">
                  已完成
                </button>
              </div>

              <div className="space-y-3">
                {pendingTasks.map((t, i) => (
                  <div key={i} className={cn(
                    "bg-white border rounded-xl p-4 flex flex-col justify-between transition-colors shadow-sm relative group",
                    t.tone === 'red' ? "border-red-200 hover:border-red-300" :
                    t.tone === 'amber' ? "border-amber-200 hover:border-amber-300" : "border-slate-200 hover:border-slate-300"
                  )}>
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-[14px] font-bold text-slate-800 pr-4 leading-tight">{t.title}</span>
                        {t.tone === 'red' && <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />}
                        {t.tone === 'amber' && <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
                      </div>
                      <p className="text-[12px] text-slate-500 leading-relaxed mb-4">{t.summary}</p>
                    </div>
                    <div className="flex justify-start">
                      <button className={cn(
                        "text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors border",
                        t.tone === 'red' ? "bg-red-50 text-red-600 border-red-100 hover:bg-red-100" : 
                        t.tone === 'amber' ? "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100" : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100"
                      )}>
                        {t.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
