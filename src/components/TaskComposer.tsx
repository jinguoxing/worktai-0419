import React, { useState, useRef } from 'react';
import { Paperclip, ArrowUp, Sparkles, FileText, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { ExecMode } from '../types';
import { motion } from 'motion/react';

interface Props {
  layout: 'hero' | 'dock';
  onSubmit: (command: string, mode: ExecMode, attachments: File[]) => void;
  disabled?: boolean;
}

export function TaskComposer({ layout, onSubmit, disabled }: Props) {
  const [value, setValue] = useState('');
  const [mode, setMode] = useState<ExecMode>('auto');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(prev => [...prev, ...Array.from(e.target.files!)]);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if ((value.trim() || attachments.length > 0) && !disabled) {
      onSubmit(value.trim(), mode, attachments);
      setValue('');
      setAttachments([]);
    }
  };

  const hasContent = value.trim() || attachments.length > 0;

  const AttachmentPreview = () => {
    if (attachments.length === 0) return null;
    return (
      <div className="flex flex-wrap gap-2 p-3 pb-0">
        {attachments.map((file, i) => (
          <div key={i} className="flex items-center space-x-1.5 bg-slate-100/80 text-slate-700 px-2.5 py-1.5 rounded-lg text-[11px] border border-slate-200/60 font-medium">
            <FileText className="w-3.5 h-3.5 text-blue-500" />
            <span className="max-w-[120px] truncate">{file.name}</span>
            <button 
              onClick={() => removeAttachment(i)} 
              className="p-0.5 hover:bg-slate-200 rounded-md text-slate-500 hover:text-slate-700 transition-colors ml-1"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    );
  };

  const MODE_CONFIG = {
    auto: {
      title: '自动执行', sub: '直接帮我做',
      placeholder: '请输入你要直接执行的任务，例如：分析昨日订单异常并给出归因',
      btn: '开始执行', tip: '本次将自动拆解任务并调度数字员工执行'
    },
    expert: {
      title: '专家协作', sub: '出计划等确认',
      placeholder: '请输入复杂任务目标，例如：先给我一版指标治理执行计划',
      btn: '生成计划', tip: '本次将先生成执行计划，等待你确认后再运行'
    },
    suggest: {
      title: '仅给建议', sub: '给思路不运行',
      placeholder: '请输入你想先咨询的问题，例如：这个异常排查应该从哪里开始',
      btn: '获取建议', tip: '本次仅输出建议，不会调用真实工具'
    }
  };

  if (layout === 'dock') {
    return (
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[800px] px-4 z-20">
        <motion.div 
          layoutId="composer-box"
          className={cn(
            "bg-white border shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all flex flex-col relative",
            disabled ? "opacity-70 grayscale-[0.2] pointer-events-none border-slate-200" : "border-slate-200"
          )}
        >
          <AttachmentPreview />
          <div className="flex p-3 pb-1">
            <textarea 
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyDown={e => {
                if(e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="请输入新的指令，或调整当前任务..."
              className="flex-1 bg-transparent border-0 text-[14px] text-slate-900 placeholder:text-slate-400 resize-none focus:ring-0 min-h-[44px] max-h-[200px] m-0 leading-relaxed font-sans outline-none"
              disabled={disabled}
            />
            <div className="self-end ml-2 flex items-center mb-1 space-x-2">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                multiple 
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors tooltip hover:bg-slate-100 rounded-lg" 
                title="上传附件"
              >
                <Paperclip className="w-4 h-4 -rotate-45" />
              </button>
              <button 
                onClick={handleSubmit} 
                disabled={!hasContent || disabled} 
                className={cn(
                  "flex items-center justify-center p-2 rounded-xl transition-all shadow-sm", 
                  hasContent ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-slate-100 text-slate-400"
                )}
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex items-center px-4 py-2 bg-slate-50/50 border-t border-slate-100 space-x-4 text-[11px] text-slate-500 font-medium">
             <div className="flex items-center space-x-1 bg-slate-100 rounded p-0.5">
                <button onClick={() => setMode('auto')} className={cn("px-2 py-1 rounded transition-colors", mode === 'auto' ? "bg-white text-slate-700 shadow-sm" : "hover:text-slate-700")}>自动执行</button>
                <button onClick={() => setMode('expert')} className={cn("px-2 py-1 rounded transition-colors", mode === 'expert' ? "bg-white text-slate-700 shadow-sm" : "hover:text-slate-700")}>专家协作</button>
                <button onClick={() => setMode('suggest')} className={cn("px-2 py-1 rounded transition-colors", mode === 'suggest' ? "bg-white text-slate-700 shadow-sm" : "hover:text-slate-700")}>仅给建议</button>
             </div>
             {disabled && (
               <span className="flex items-center text-blue-600 animate-pulse">
                 <Sparkles className="w-3 h-3 mr-1" />
                 任务指令执行中...
               </span>
             )}
          </div>
        </motion.div>
      </div>
    );
  }

  // Hero layout
  const config = MODE_CONFIG[mode];
  return (
    <div className="w-full max-w-[800px] mb-12 relative z-20 flex flex-col space-y-4">
      <div className="flex gap-3 w-full">
        {(Object.keys(MODE_CONFIG) as ExecMode[]).map((k) => {
          const v = MODE_CONFIG[k];
          return (
            <button 
              key={k}
              onClick={() => setMode(k)}
              className={cn(
                "p-3 rounded-xl flex-1 text-left transition-all border flex flex-col",
                mode === k 
                  ? "border-blue-500 bg-blue-50/30 ring-1 ring-blue-500/20 shadow-sm" 
                  : "border-slate-200 hover:border-blue-300 bg-white"
              )}
            >
              <div className="font-semibold text-[13px] text-slate-800 tracking-wide">{v.title}</div>
              <div className="text-[11px] text-slate-500 mt-1">{v.sub}</div>
            </button>
          )
        })}
      </div>

      <motion.div 
        layoutId="composer-box"
        className={cn(
          "bg-white border shadow-xl shadow-slate-200/40 rounded-2xl overflow-hidden focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all flex flex-col relative",
          disabled ? "opacity-70 pointer-events-none border-slate-200" : "border-slate-200"
        )}
      >
        <AttachmentPreview />
        <div className="flex p-4 pb-2">
          <textarea 
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => {
              if(e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder={config.placeholder}
            className="flex-1 bg-transparent border-0 text-[15px] text-slate-900 placeholder:text-slate-400 resize-none focus:ring-0 min-h-[80px] m-0 leading-relaxed font-sans outline-none disabled:bg-transparent"
            disabled={disabled}
          />
        </div>
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50/50 border-t border-slate-100 flex-wrap gap-3">
          <div className="text-[11px] text-slate-500 flex items-center">
             <Sparkles className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
             {config.tip}
          </div>
          <div className="flex items-center space-x-2">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              multiple 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors tooltip hover:bg-slate-100 rounded-lg" 
              title="上传附件"
            >
              <Paperclip className="w-5 h-5 -rotate-45" />
            </button>
            <button 
              onClick={handleSubmit} 
              disabled={!hasContent || disabled} 
              className={cn(
                "flex items-center px-4 py-2 text-[13px] font-semibold rounded-xl transition-all shadow-sm", 
                hasContent ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-slate-200 text-slate-400"
              )}
            >
              <span>{disabled ? "正在启动..." : config.btn}</span>
              {!disabled && <ArrowUp className="w-4 h-4 ml-1.5" />}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
