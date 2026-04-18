import React from 'react';
import { Database, Filter, Layers, Layout, Settings, History, Plus } from 'lucide-react';

interface Props {
  onToggleHistory: () => void;
  onNewTask: () => void;
}

export function WorkspaceHeader({ onToggleHistory, onNewTask }: Props) {
  return (
    <header className="h-14 border-b border-slate-200 bg-white/80 backdrop-blur flex items-center justify-between px-4 sticky top-0 z-20 shrink-0">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center shadow-sm">
            <Layout className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-slate-900 leading-tight">ChartWork</h1>
            <p className="text-[10px] text-slate-500 font-mono tracking-wider">数据治理与知识图谱工作台</p>
          </div>
        </div>

        <div className="h-4 w-px bg-slate-200" />

        <div className="flex items-center space-x-2 text-xs">
          <span className="flex items-center space-x-1 px-2 py-1 bg-slate-50 rounded-md border border-slate-200 text-slate-700 shadow-sm">
            <Layers className="w-3 h-3 text-slate-500" />
            <span>财务分析组</span>
          </span>
          <span className="flex items-center space-x-1 px-2 py-1 bg-slate-50 rounded-md border border-slate-200 text-slate-700 shadow-sm">
            <Database className="w-3 h-3 text-slate-500" />
            <span>order_db</span>
          </span>
          <span className="flex items-center space-x-1 px-2 py-1 bg-slate-50 rounded-md border border-slate-200 text-slate-700 shadow-sm">
            <Filter className="w-3 h-3 text-slate-500" />
            <span>近30天</span>
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button 
          onClick={onToggleHistory}
          className="p-2 hover:bg-slate-100 rounded-md text-slate-500 transition-colors tooltip" 
          title="历史记录"
        >
          <History className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-md text-slate-500 transition-colors" title="工作区设置">
          <Settings className="w-4 h-4" />
        </button>
        <div className="h-4 w-px bg-slate-200 mx-1" />
        <button 
          onClick={onNewTask}
          className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium transition-colors shadow-sm"
        >
          <Plus className="w-3 h-3" />
          <span>新建任务</span>
        </button>
      </div>
    </header>
  );
}
