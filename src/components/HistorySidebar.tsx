import React from 'react';
import { History, MessageSquare, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export interface SessionInfo {
  id: string;
  title: string;
  date: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  sessions: SessionInfo[];
  currentSessionId: string;
  onSelectSession: (id: string) => void;
  onNewTask: () => void;
}

export function HistorySidebar({ isOpen, onClose, sessions, currentSessionId, onSelectSession, onNewTask }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 left-0 bottom-0 w-80 bg-white border-r border-slate-200 z-50 flex flex-col shadow-2xl shadow-slate-200/50"
          >
            <div className="h-14 flex items-center justify-between px-4 border-b border-slate-200 shrink-0 bg-slate-50/50">
              <div className="flex items-center space-x-2 text-slate-800">
                <History className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold">任务记录</span>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 shrink-0">
              <button 
                onClick={() => {
                  onNewTask();
                  onClose();
                }}
                className="w-full flex items-center justify-center space-x-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>新建任务</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2 mt-2">近期任务</div>
              {sessions.map(session => (
                <button
                  key={session.id}
                  onClick={() => {
                    onSelectSession(session.id);
                    onClose();
                  }}
                  className={cn(
                    "w-full flex flex-col text-left px-3 py-2.5 rounded-lg transition-all",
                    currentSessionId === session.id 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                      : "text-slate-700 hover:bg-slate-50 border border-transparent hover:border-slate-200"
                  )}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <MessageSquare className={cn("w-3.5 h-3.5 shrink-0", currentSessionId === session.id ? "text-blue-200" : "text-slate-400")} />
                    <span className="text-sm font-medium truncate">{session.title}</span>
                  </div>
                  <div className={cn("text-[10px] pl-5", currentSessionId === session.id ? "text-blue-200" : "text-slate-400")}>
                    {session.date}
                  </div>
                </button>
              ))}
              
              {sessions.length === 0 && (
                <div className="text-center py-8 text-sm text-slate-500">
                  暂无历史记录
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
