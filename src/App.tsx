import React, { useState, useEffect, useRef } from 'react';
import { WorkspaceHeader } from './components/WorkspaceHeader';
import { ExecutionSidePanel } from './components/ExecutionSidePanel';
import { OmniCommandBar } from './components/OmniCommandBar';
import { BlockStream } from './components/BlockStream';
import { HistorySidebar, SessionInfo } from './components/HistorySidebar';
import { MOCK_BLOCKS, MOCK_TRACE, MOCK_CHART_DATA, MOCK_KG_BLOCKS, MOCK_KG_TRACE } from './constants';
import { Block, ExecutionTrace, CommandBlock, WorkBlock, ResultBlock } from './types';
import { LineChart, Share2, Wand2, Paperclip, ArrowUp, LayoutDashboard } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from './lib/utils';

const getTime = () => {

  const d = new Date();
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
};

interface SessionData {
  id: string;
  title: string;
  date: string;
  blocks: Block[];
  trace: ExecutionTrace | null;
}

const INITIAL_SESSIONS: SessionData[] = [
  {
    id: 'session-new',
    title: '新建任务',
    date: '刚刚',
    blocks: [],
    trace: null
  },
  {
    id: 'session-1',
    title: '分析近30天订单异常',
    date: '今天, 14:23',
    blocks: MOCK_BLOCKS,
    trace: MOCK_TRACE
  },
  {
    id: 'session-2',
    title: '盘点交易域核心指标语义',
    date: '昨天, 16:45',
    blocks: [],
    trace: null
  },
  {
    id: 'session-3',
    title: '构建 CRM_Prod 营销领域关系图谱',
    date: '昨天, 10:12',
    blocks: MOCK_KG_BLOCKS,
    trace: MOCK_KG_TRACE
  },
  {
    id: 'session-4',
    title: '审查风控引擎表元数据质量',
    date: '4月16日, 09:30',
    blocks: [],
    trace: null
  },
  {
    id: 'session-5',
    title: '修复 customer 表架构定义歧义',
    date: '4月15日, 17:20',
    blocks: [],
    trace: null
  }
];

export default function App() {
  const [sessions, setSessions] = useState<SessionData[]>(INITIAL_SESSIONS);
  const [currentSessionId, setCurrentSessionId] = useState<string>('session-new');
  const [activeBlockId, setActiveBlockId] = useState<string | undefined>(undefined);
  
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const [welcomeInput, setWelcomeInput] = useState('');
  const [execMode, setExecMode] = useState('auto');
  
  const handleWelcomeSubmit = () => {
    if (welcomeInput.trim()) {
      handleSubmitCommand(welcomeInput.trim());
      setWelcomeInput('');
    }
  };

  const RECENT_TASKS = [
    { title: '昨日订单异常归因', statusText: '进行中', statusColor: 'bg-blue-50 text-blue-600 border-blue-200', time: '10 分钟前更新', summary: '已完成波动因子识别，等待确认口径范围' },
    { title: '财务指标口径清洗', statusText: '待确认', statusColor: 'bg-amber-50 text-amber-600 border-amber-200', time: '2 小时前更新', summary: '发现 3 处口径冲突，待选择标准定义' },
    { title: '核心域质量扫描', statusText: '已完成', statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-200', time: '昨日', summary: '识别 5 个高风险字段，已生成诊断报告' }
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  const currentSession = sessions.find(s => s.id === currentSessionId)!;

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession.blocks.length]);

  const handleBlockClick = (block: Block) => {
    setActiveBlockId(block.id);
    if (!isSidePanelOpen) {
      setIsSidePanelOpen(true);
    }
  };

  const updateSessionBlocks = (sessionId: string, newBlocks: Block[]) => {
    setSessions(prev => 
      prev.map(s => {
        if (s.id === sessionId) {
          let title = s.title;
          const firstCommand = newBlocks.find(b => b.type === 'command');
          if (firstCommand && s.title === '新建任务') {
            title = (firstCommand as CommandBlock).content;
          }
          return { ...s, blocks: newBlocks, title };
        }
        return s;
      })
    );
  };

  const updateSessionTrace = (sessionId: string, newTrace: ExecutionTrace) => {
    setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, trace: newTrace } : s));
  };

  const handleNewTask = () => {
    const newId = `session-${Date.now()}`;
    const newSession: SessionData = {
      id: newId,
      title: '新建任务',
      date: '刚刚',
      blocks: [],
      trace: null
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newId);
    setActiveBlockId(undefined);
    setIsSidePanelOpen(false);
  };

  const handleSubmitCommand = async (command: string) => {
    if (!command.trim() || isSimulating) return;

    setIsSimulating(true);

    const cmdId = `cmd-${Date.now()}`;
    const workId = `work-${Date.now()}`;
    const resId = `res-${Date.now()}`;
    const tstamp = getTime();

    let currentBlocks = [...currentSession.blocks];
    const newCmd: CommandBlock = {
      id: cmdId,
      type: 'command',
      timestamp: tstamp,
      title: '用户指令',
      content: command,
      status: 'running'
    };
    currentBlocks.push(newCmd);
    updateSessionBlocks(currentSessionId, currentBlocks);
    setActiveBlockId(cmdId);
    scrollToBottom();

    await new Promise(r => setTimeout(r, 600));

    const act1: Block = {
      id: `act-${Date.now()}`,
      type: 'activity',
      timestamp: getTime(),
      content: '任务指挥官 奥米 正在接管任务并进行意图识别...'
    };
    currentBlocks = [...currentBlocks, act1];
    updateSessionBlocks(currentSessionId, currentBlocks);

    await new Promise(r => setTimeout(r, 800));

    const newWork: WorkBlock = {
      id: workId,
      type: 'work',
      timestamp: getTime(),
      currentAgent: 'omi',
      currentAgentName: '奥米',
      status: 'running',
      steps: [
        { id: 's1', agent: 'omi', agentName: '奥米', name: '任务意图拆解', status: 'running' }
      ]
    };
    currentBlocks = [...currentBlocks, newWork];
    updateSessionBlocks(currentSessionId, currentBlocks);
    setActiveBlockId(workId);
    setIsSidePanelOpen(true);
    scrollToBottom();

    const isGraphTask = command.includes('图谱');
    const targetTitle = isGraphTask ? '构建 CRM_Prod 营销领域关系图谱' : command;

    const initialTrace: ExecutionTrace = isGraphTask ? {
      taskId: cmdId,
      taskTitle: targetTitle,
      status: 'running',
      startTime: getTime(),
      currentAssignee: 'omi',
      agentTimeline: [{ agent: '奥米', action: '接收图谱生成意图并规划算力' }],
      toolSteps: []
    } : {
      taskId: cmdId,
      taskTitle: targetTitle,
      status: 'running',
      startTime: getTime(),
      currentAssignee: 'omi',
      agentTimeline: [{ agent: '奥米', action: '接收任务并开始拆解任务' }],
      toolSteps: []
    };
    updateSessionTrace(currentSessionId, initialTrace);

    await new Promise(r => setTimeout(r, 1200));

    if (isGraphTask) {
      newWork.steps[0].status = 'succeeded';
      newWork.steps.push({ id: 's2', agent: 'meta_specialist', agentName: '元数据专员', name: '全域结构拉取', status: 'running' });
      newWork.currentAgent = 'meta_specialist';
      newWork.currentAgentName = '元数据专员';
      updateSessionBlocks(currentSessionId, [...currentBlocks]);
      
      initialTrace.agentTimeline.push({ agent: '元数据专员', action: '抽取 CRM 与 Order 域库表信息' });
      initialTrace.toolSteps.push({
        id: 'ts-1',
        name: 'Extract_Metadata',
        agentName: '元数据专员',
        status: 'succeeded',
        duration: '4.2s',
        input: 'Scan schema: crm_prod, target: marketing',
        output: 'Extracted 5 core tables, 42 fields.'
      });
      updateSessionTrace(currentSessionId, { ...initialTrace });
      scrollToBottom();

      await new Promise(r => setTimeout(r, 1500));

      newWork.steps[1].status = 'succeeded';
      newWork.steps.push({ id: 's3', agent: 'kg_specialist', agentName: '图谱专员', name: '血缘关联计算与渲染', status: 'running' });
      newWork.currentAgent = 'kg_specialist';
      newWork.currentAgentName = '图谱专员';
      updateSessionBlocks(currentSessionId, [...currentBlocks]);
      
      initialTrace.agentTimeline.push({ agent: '图谱专员', action: '执行节点聚类与血缘链路推断' });
      initialTrace.toolSteps.push({
        id: 'ts-2',
        name: 'Infer_Relations',
        agentName: '图谱专员',
        status: 'succeeded',
        duration: '6.5s',
        input: 'Analyze primary/foreign keys and lineage paths',
        output: 'Inferred 5 relationships among 5 entities.'
      });
      updateSessionTrace(currentSessionId, { ...initialTrace });
      scrollToBottom();

      await new Promise(r => setTimeout(r, 1500));

      newWork.steps[2].status = 'succeeded';
      newWork.status = 'succeeded';
      currentBlocks = currentBlocks.map(b => b.id === cmdId ? { ...b, status: 'succeeded' } as Block : b);
      updateSessionBlocks(currentSessionId, [...currentBlocks]);

      initialTrace.status = 'succeeded';
      initialTrace.agentTimeline.push({ agent: '图谱专员', action: '渲染并输出最终可视化图谱' });
      updateSessionTrace(currentSessionId, { ...initialTrace });

      const newRes: ResultBlock = {
        id: resId,
        type: 'result',
        timestamp: getTime(),
        items: [
          { id: 'r1', type: 'knowledge_graph', content: MOCK_KG_BLOCKS[3]?.items?.[0]?.content || {} },
          { id: 'r2', type: 'markdown', content: MOCK_KG_BLOCKS[3]?.items?.[1]?.content || '' },
          { id: 'r3', type: 'suggested_actions', content: ['导出为图谱结构 (JSON)', '修复 Coupon 血缘断层', '对齐营销指标语义口径'] }
        ]
      };
      currentBlocks = [...currentBlocks, newRes];
    } else {
      newWork.steps[0].status = 'succeeded';
      newWork.steps.push({ id: 's2', agent: 'data_analyst', agentName: '数据分析专员', name: '底层数据提取与清洗', status: 'running' });
      newWork.currentAgent = 'data_analyst';
      newWork.currentAgentName = '数据分析专员';
      updateSessionBlocks(currentSessionId, [...currentBlocks]);
      
      initialTrace.agentTimeline.push({ agent: '数据分析专员', action: '接管查询权限并连接数据仓库' });
      initialTrace.toolSteps.push({
        id: 'ts-1',
        name: 'Execute_SQL_Query',
        agentName: '数据分析专员',
        status: 'succeeded',
        duration: '1.2s',
        input: 'Extract data related to user prompt limit 1000...',
        output: 'Query optimal. 24 rows returned.'
      });
      updateSessionTrace(currentSessionId, { ...initialTrace });
      scrollToBottom();

      await new Promise(r => setTimeout(r, 1500));

      newWork.steps[1].status = 'succeeded';
      newWork.status = 'succeeded';
      currentBlocks = currentBlocks.map(b => b.id === cmdId ? { ...b, status: 'succeeded' } as Block : b);
      updateSessionBlocks(currentSessionId, [...currentBlocks]);

      initialTrace.status = 'succeeded';
      initialTrace.agentTimeline.push({ agent: '数据分析专员', action: '完成多维模型构建并输出最终产物' });
      updateSessionTrace(currentSessionId, { ...initialTrace });

      const newRes: ResultBlock = {
        id: resId,
        type: 'result',
        timestamp: getTime(),
        items: [
          {
            id: 'r1',
            type: 'markdown',
            content: `任务已处理完成：**${command}**\n\n基于财务分析组最近 30 天的数据样本，我为您生成了相关的数据报告与可视化图表，异常点已为您高亮标注。`
          },
          {
            id: 'r2',
            type: 'chart',
            content: MOCK_CHART_DATA.map(d => ({ ...d, sales: d.sales * (0.8 + Math.random() * 0.4) })) 
          },
          {
            id: 'r3',
            type: 'suggested_actions',
            content: ['导出 PDF 分析报告', '深入分析异常节点', '将此指标加入每日巡检']
          }
        ]
      };
      currentBlocks = [...currentBlocks, newRes];
    }
    
    updateSessionBlocks(currentSessionId, currentBlocks);
    setActiveBlockId(resId);
    scrollToBottom();

    setIsSimulating(false);
  };

  const sessionList: SessionInfo[] = sessions.map(s => ({ id: s.id, title: s.title, date: s.date }));

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans selection:bg-blue-200">
      <WorkspaceHeader 
        onToggleHistory={() => setIsHistoryOpen(!isHistoryOpen)} 
        onNewTask={handleNewTask}
      />
      
      <HistorySidebar 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
        sessions={sessionList}
        currentSessionId={currentSessionId}
        onSelectSession={setCurrentSessionId}
        onNewTask={handleNewTask}
      />

      <div className="flex-1 flex overflow-hidden relative">
        <div ref={scrollRef} className="flex-1 overflow-y-auto pb-44 scroll-smooth bg-slate-50/50">
          {currentSession.blocks.length === 0 ? (
            <div className="min-h-full flex flex-col items-center pt-16 lg:pt-24 px-6 lg:px-12 w-full max-w-5xl mx-auto relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-100/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>

              {/* 1. Hero */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center mb-10 w-full"
              >
                <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">你想完成什么分析任务？</h2>
                <p className="text-[15px] text-slate-500">告诉我目标，我会结合当前数据环境自动拆解并执行</p>
              </motion.div>

              {/* 2. Main Input Box */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="w-full max-w-[800px] mb-12"
              >
                <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/40 rounded-2xl overflow-hidden focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all flex flex-col relative z-20">
                  <div className="flex p-4 pb-2">
                    <textarea 
                      value={welcomeInput}
                      onChange={e => setWelcomeInput(e.target.value)}
                      onKeyDown={e => {
                        if(e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleWelcomeSubmit();
                        }
                      }}
                      placeholder="请输入你的分析目标、业务问题或待诊断异常...&#10;例如：对齐“实收金额”指标口径，并指出冲突来源"
                      className="flex-1 bg-transparent border-0 text-[15px] text-slate-900 placeholder:text-slate-400 resize-none focus:ring-0 min-h-[80px] m-0 leading-relaxed font-sans outline-none"
                    />
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-50/50 border-t border-slate-100 flex-wrap gap-3">
                    <div className="flex items-center bg-slate-100/80 p-1 rounded-lg">
                      <button onClick={() => setExecMode('auto')} className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-colors", execMode === 'auto' ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700")}>自动执行</button>
                      <button onClick={() => setExecMode('expert')} className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-colors", execMode === 'expert' ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700")}>专家协作</button>
                      <button onClick={() => setExecMode('suggest')} className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-colors", execMode === 'suggest' ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700")}>仅给建议</button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors tooltip hover:bg-slate-100 rounded-lg" title="上传附件">
                        <Paperclip className="w-5 h-5 -rotate-45" />
                      </button>
                      <button 
                        onClick={handleWelcomeSubmit} 
                        disabled={!welcomeInput.trim()} 
                        className={cn(
                          "flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all shadow-sm", 
                          welcomeInput.trim() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-slate-200 text-slate-400"
                        )}
                      >
                        <span>发送</span>
                        <ArrowUp className="w-4 h-4 ml-1.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 3. Grid for Templates logic and Recent Tasks */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="w-full max-w-[800px] flex flex-col gap-10 pb-20 z-10"
              >
                {/* Recommended Templates */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
                    推荐任务模板
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { title: "生成业务知识图谱", desc: "盘点实体、关系与关键业务链路", icon: <Share2 className="w-4 h-4 text-indigo-500" /> },
                      { title: "对齐核心指标口径", desc: "识别定义冲突与口径差异来源", icon: <Wand2 className="w-4 h-4 text-amber-500" /> },
                      { title: "诊断异常波动原因", desc: "定位关键波动因子与异常归因", icon: <LineChart className="w-4 h-4 text-emerald-500" /> },
                      { title: "更多模板", desc: "从业务场景库中选择", icon: <LayoutDashboard className="w-4 h-4 text-blue-500" />, isMore: true }
                    ].map((t, i) => (
                      <button 
                        key={i} 
                        onClick={() => !t.isMore && setWelcomeInput(t.title)} 
                        className={cn(
                          "p-4 rounded-xl border transition-all text-left flex flex-col", 
                          t.isMore ? "bg-slate-50 border-slate-200 border-dashed hover:border-blue-400 hover:bg-blue-50/50 items-center justify-center text-center h-full" : "bg-white border-slate-200 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5 group"
                        )}
                      >
                        <div className={cn("mb-3 p-1.5 rounded-lg w-fit transition-colors shrink-0", t.isMore ? "bg-white border border-slate-200 shadow-sm" : "bg-slate-50 group-hover:bg-blue-50 group-hover:text-blue-600")}>
                          {t.icon}
                        </div>
                        <div className={cn("text-[13px] font-semibold text-slate-800 mb-1 leading-tight", t.isMore && "text-slate-600")}>{t.title}</div>
                        {!t.isMore && <div className="text-[11px] text-slate-500 leading-snug">{t.desc}</div>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Tasks */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
                    继续最近任务
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    {RECENT_TASKS.map((t, i) => (
                      <button 
                        key={i} 
                        onClick={() => {
                           const session = sessions.find(s => s.title.includes(t.title.substring(0,4)));
                           if(session) {
                             setCurrentSessionId(session.id);
                           }
                        }} 
                        className="p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all text-left flex flex-col group hover:-translate-y-0.5"
                      >
                        <div className="text-[13px] font-semibold text-slate-800 mb-2 truncate group-hover:text-blue-700 transition-colors">{t.title}</div>
                        <div className="flex items-center space-x-2 text-[10px] mb-2.5">
                          <span className={cn("px-1.5 py-0.5 rounded-md font-bold shadow-sm border", t.statusColor)}>{t.statusText}</span>
                          <span className="text-slate-400 font-medium">· {t.time}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 leading-snug line-clamp-2">{t.summary}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            <BlockStream 
              blocks={currentSession.blocks} 
              onBlockClick={handleBlockClick} 
              activeBlockId={activeBlockId} 
            />
          )}
        </div>
        
        <ExecutionSidePanel 
          trace={currentSession.trace} 
          isOpen={isSidePanelOpen && currentSession.trace !== null} 
          onClose={() => setIsSidePanelOpen(false)} 
        />
        
        <OmniCommandBar 
          onSubmit={handleSubmitCommand} 
          disabled={isSimulating} 
          hidden={currentSession.blocks.length === 0} 
        />
      </div>
    </div>
  );
}
