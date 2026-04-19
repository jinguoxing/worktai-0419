import React from 'react';
import { Database, Users, Shield, Waypoints, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WorkspaceContextState } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  contextState: WorkspaceContextState;
}

export function EnvironmentDrawer({ isOpen, onClose, contextState }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 transition-opacity"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl border-l border-slate-200 z-50 flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-800">环境详情</h2>
              <button onClick={onClose} className="p-1 text-slate-400 hover:bg-slate-100 rounded-md transition-colors text-xs">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1"><Users className="w-3 h-3"/><span>工作组</span></div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm font-medium text-slate-700">
                  {contextState.group.name}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1"><Database className="w-3 h-3"/><span>已连通数据源 ({contextState.dataSource.connectedCount})</span></div>
                <div className="space-y-1.5">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">{contextState.dataSource.name}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold">在线</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">crm_prod</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold">在线</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1"><Waypoints className="w-3 h-3"/><span>可用数字员工</span></div>
                <div className="flex flex-wrap gap-2">
                  {(contextState.availableAgents || ['奥米 (主节点)', '数据分析专员', '元数据专员', '图谱专员']).map((agent, i) => (
                     <div key={i} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md border border-blue-100 font-medium">
                       {agent}
                     </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1"><Shield className="w-3 h-3"/><span>权限与策略</span></div>
                <div className="p-3 text-xs text-slate-600 bg-slate-50 rounded-lg border border-slate-200 leading-relaxed font-mono">
                  {contextState.permissions?.map(p => <div key={p}>• {p}</div>) || (
                    <>
                      <div>• 允许读取 crm_prod 与 order_db 表结构</div>
                      <div>• 允许拉取近 30 天聚合数据</div>
                      <div>• 禁止变更或修改任何记录</div>
                    </>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
