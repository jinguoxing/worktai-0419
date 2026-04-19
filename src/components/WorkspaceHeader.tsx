import React from 'react';
import { Layout, History, Plus, Info } from 'lucide-react';

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
          <span className="text-sm font-semibold text-slate-900 leading-tight">ChartWork</span>
        </div>

        <div className="h-4 w-px bg-slate-200" />

        <div className="flex items-center space-x-2 text-xs">
          <span className="flex items-center px-2 py-1 bg-slate-50 rounded-md border border-slate-200 text-slate-700 shadow-sm">
            财务分析组
          </span>
          <span className="flex items-center px-2 py-1 bg-slate-50 rounded-md border border-slate-200 text-slate-700 shadow-sm">
            order_db
          </span>
          <span className="flex items-center px-2 py-1 bg-slate-50 rounded-md border border-slate-200 text-slate-700 shadow-sm">
            近30天
          </span>
          <span className="flex items-center px-2 py-1 bg-emerald-50 rounded-md border border-emerald-100 text-emerald-700 shadow-sm">
            已连接 2 个数据源
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-1">
        <button className="flex items-center space-x-1 px-3 py-1.5 hover:bg-slate-100 rounded-md text-slate-600 transition-colors text-xs font-medium mr-1">
          <Info className="w-3.5 h-3.5" />
          <span>环境详情</span>
        </button>
        <button 
          onClick={onToggleHistory}
          className="p-2 hover:bg-slate-100 rounded-md text-slate-500 transition-colors tooltip" 
          title="历史记录"
        >
          <History className="w-4 h-4" />
        </button>
        <div className="h-4 w-px bg-slate-200 mx-2" />
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
