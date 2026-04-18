import React, { useState } from 'react';
import { Command, Paperclip, ArrowUp, ActivitySquare, Users } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  onSubmit: (command: string) => void;
  disabled?: boolean;
}

export function OmniCommandBar({ onSubmit, disabled }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  const showSuggestions = isFocused && value.length === 0 && !disabled;

  const handleSubmit = () => {
    if (value.trim() && !disabled) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl z-30 px-4">
      <div className="mb-3 flex items-center justify-center space-x-2">
        <span className="text-[10px] uppercase font-mono tracking-wider bg-white border border-slate-200 text-slate-500 px-2.5 py-0.5 rounded-full flex items-center shadow-sm">
          <ActivitySquare className="w-3.5 h-3.5 mr-1" /> 模式: 执行
        </span>
        <span className="text-[10px] bg-blue-50 border border-blue-200 text-blue-700 px-2.5 py-0.5 rounded-full flex items-center shadow-sm">
          <Users className="w-3.5 h-3.5 mr-1" /> 路由: 自动
        </span>
      </div>

      <motion.div 
        className={cn(
          "bg-white/95 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300",
          isFocused ? "border-blue-400 shadow-2xl shadow-blue-500/10 ring-4 ring-blue-500/10" : "border-slate-200 shadow-xl",
          disabled ? "opacity-70 pointer-events-none" : ""
        )}
      >
        <AnimatePresence>
          {showSuggestions && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-b border-slate-100 px-3 py-2.5 bg-slate-50/50"
            >
              <div className="text-[11px] font-medium text-slate-500 mb-2 px-2 uppercase tracking-wide">建议操作</div>
              <div className="flex gap-2 px-1 overflow-x-auto pb-1 no-scrollbar">
                {['盘点销售域指标语义', '生成业务实体知识图谱', '检查用户表元数据完备度'].map((s, i) => (
                  <button 
                    key={i} 
                    onClick={() => setValue(s)}
                    className="shrink-0 text-xs font-medium text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 shadow-sm rounded-lg px-3 py-2 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-end p-2 px-4 py-3">
          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors tooltip mb-1" title="附件">
            <Paperclip className="w-5 h-5 -rotate-45" />
          </button>
          
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="描述分析需求、执行语义治理或构建企业知识网络，输入 / 唤起快捷操作..."
            className="flex-1 bg-transparent border-0 text-[15px] text-slate-900 placeholder:text-slate-400 resize-none focus:ring-0 px-4 py-2 min-h-[44px] max-h-40 m-0 leading-relaxed font-sans outline-none"
            rows={1}
            disabled={disabled}
          />

          <div className="flex items-center space-x-2 pl-3 mb-1">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Command className="w-5 h-5" />
            </button>
            <button 
              onClick={handleSubmit}
              disabled={value.length === 0 || disabled}
              className={cn(
                "p-2.5 rounded-xl transition-all",
                value.length > 0 && !disabled
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md" 
                  : "bg-slate-100 text-slate-400"
              )}
            >
              <ArrowUp className="w-5 h-5 shadow-sm" />
            </button>
          </div>
        </div>
      </motion.div>
      <div className="mt-3 text-center text-[11px] text-slate-500 font-medium">
        按 <kbd className="font-sans px-1.5 py-0.5 mx-0.5 bg-white border border-slate-200 shadow-sm text-slate-600 rounded">Enter</kbd> 发送执行，按 <kbd className="font-sans px-1.5 py-0.5 mx-0.5 bg-white border border-slate-200 shadow-sm text-slate-600 rounded">Shift + Enter</kbd> 换行
      </div>
    </div>
  );
}
