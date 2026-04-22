import React from 'react';
import { Layout, History, Plus, Info, Bell } from 'lucide-react';
import { WorkspaceContextState } from '../types';

interface Props {
  contextState: WorkspaceContextState;
  onToggleHistory: () => void;
  onNewTask: () => void;
  onToggleEnvironment: () => void;
  onToggleInbox?: () => void;
}

export function WorkspaceHeader({ contextState, onToggleHistory, onNewTask, onToggleEnvironment, onToggleInbox }: Props) {
  return (
    <header className="h-14 border-b border-slate-200 bg-white/80 backdrop-blur flex items-center justify-between px-4 sticky top-0 z-20 shrink-0">
      {/* Left: Brand & Context */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center shadow-sm">
            <Layout className="w-4 h-4 text-white" />
          </div>
          <span className="text-[15px] font-bold text-slate-900 leading-tight">AI 分析工作台</span>
        </div>

        <div className="h-4 w-px bg-slate-200" />

        {/* Clickable Environment Selector */}
        <button 
          onClick={onToggleEnvironment}
          className="flex items-center space-x-2 px-2.5 py-1.5 hover:bg-slate-100 rounded-lg transition-colors group"
          title="查看或切换当前分析环境与数据源"
        >
          <div className="flex items-center text-[12px] text-slate-500 font-medium">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            当前分析环境:
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="px-1.5 py-0.5 bg-slate-50 text-slate-700 text-[11px] rounded border border-slate-200">{contextState.group.name}</span>
            <span className="px-1.5 py-0.5 bg-slate-50 text-slate-700 text-[11px] rounded border border-slate-200">{contextState.dataSource.name}</span>
            <Info className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors ml-1" />
          </div>
        </button>
      </div>

      {/* Right: Global Actions */}
      <div className="flex items-center space-x-2">
        <button 
          onClick={onToggleInbox}
          className="flex items-center space-x-1.5 px-3 py-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
        >
          <div className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
          </div>
          <span className="text-[12px] font-medium">待办通知</span>
        </button>

        <button 
          onClick={onToggleHistory}
          className="flex items-center space-x-1.5 px-3 py-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
        >
          <History className="w-4 h-4" />
          <span className="text-[12px] font-medium">历史任务</span>
        </button>

        <div className="h-4 w-px bg-slate-200 mx-1" />

        <button 
          onClick={onNewTask}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[13px] font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>开启新任务</span>
        </button>
      </div>
    </header>
  );
}
