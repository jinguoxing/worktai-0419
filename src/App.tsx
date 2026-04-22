import React, { useState, useEffect, useRef } from 'react';
import { WorkspaceHeader } from './components/WorkspaceHeader';
import { ExecutionSidePanel } from './components/ExecutionSidePanel';
import { TaskComposer } from './components/TaskComposer';
import { EnvironmentDrawer } from './components/EnvironmentDrawer';
import { InboxSidebar } from './components/InboxSidebar';
import { WorkspaceContextState, ExecMode } from './types';
import { BlockStream } from './components/BlockStream';
import { HistorySidebar, SessionInfo } from './components/HistorySidebar';
import { MOCK_BLOCKS, MOCK_TRACE, MOCK_CHART_DATA, MOCK_KG_BLOCKS, MOCK_KG_TRACE } from './constants';
import { Block, ExecutionTrace, CommandBlock, WorkBlock, ResultBlock } from './types';
import { LineChart, Share2, Wand2, Paperclip, ArrowUp, LayoutDashboard, AlertCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isEnvironmentDrawerOpen, setIsEnvironmentDrawerOpen] = useState(false);

  const contextState: WorkspaceContextState = {
    workspaceName: 'ChartWork',
    group: { id: 'g01', name: '财务分析组' },
    dataSource: { id: 'db01', name: 'order_db', connectedCount: 2 },
    timeRange: '近30天'
  };

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

  const handleSubmitCommand = async (command: string, mode: ExecMode = 'auto', files: File[] = []) => {
    if ((!command.trim() && files.length === 0) || isSimulating) return;

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
      content: command || '上传了参考附件',
      status: 'running',
      attachments: files.length > 0 ? files.map(f => ({ name: f.name, size: f.size })) : undefined
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

    // MODE: Suggest
    if (mode === 'suggest') {
      const suggestWork: WorkBlock = {
        id: workId, type: 'work', timestamp: getTime(), currentAgent: 'omi', currentAgentName: '奥米', status: 'running',
        steps: [{ id: 's1', agent: 'omi', agentName: '奥米', name: '需求理解与建议草案生成', status: 'running' }]
      };
      currentBlocks = [...currentBlocks, suggestWork];
      updateSessionBlocks(currentSessionId, currentBlocks);
      const trace: ExecutionTrace = { taskId: cmdId, taskTitle: '生成执行建议', status: 'running', startTime: getTime(), currentAssignee: 'omi', agentTimeline: [{ agent: '奥米', action: '快速出具排查建议' }], toolSteps: [] };
      updateSessionTrace(currentSessionId, trace);
      
      await new Promise(r => setTimeout(r, 1000));
      suggestWork.steps[0].status = 'succeeded';
      suggestWork.status = 'succeeded';
      trace.status = 'succeeded';
      
      const newRes: ResultBlock = {
        id: resId, type: 'result', timestamp: getTime(),
        items: [
          {
            id: 'r1', type: 'markdown',
            content: `针对您的问题：**${command}**\n\n系统目前提供了**仅供参考的排查建议**，不执行真实工具调用。您可以参考以下思路：\n\n1. **核实数据源状态：** 检查 order_db 是否有凌晨积压延迟。\n2. **检查底层模型：** 请数据开发审查 \`dim_user\` 与 \`fact_order\` 的关联键变更。\n3. **建议行动**：如果需要深入，请切换至 [自动执行] 模式重新发送此指令。`
          },
          { id: 'r2', type: 'suggested_actions', content: ['采用自动执行模式重试', '查看相关报表', '创建值班工单'] }
        ]
      };
      currentBlocks = currentBlocks.map(b => b.id === cmdId ? { ...b, status: 'succeeded' } as Block : b);
      currentBlocks.push(newRes);
      updateSessionBlocks(currentSessionId, currentBlocks);
      updateSessionTrace(currentSessionId, trace);
      setActiveBlockId(resId);
      setIsSimulating(false);
      scrollToBottom();
      return;
    }

    // MODE: Expert (Wait for user)
    if (mode === 'expert') {
      const expertWork: WorkBlock = {
        id: workId, type: 'work', timestamp: getTime(), currentAgent: 'omi', currentAgentName: '奥米', status: 'running',
        steps: [{ id: 's1', agent: 'omi', agentName: '奥米', name: '全链路执行计划编制', status: 'running' }]
      };
      currentBlocks = [...currentBlocks, expertWork];
      updateSessionBlocks(currentSessionId, currentBlocks);
      const trace: ExecutionTrace = { taskId: cmdId, taskTitle: '专家协作模式：等待前置确认', status: 'running', startTime: getTime(), currentAssignee: 'omi', agentTimeline: [{ agent: '奥米', action: '编制多维排查计划...' }], toolSteps: [] };
      updateSessionTrace(currentSessionId, trace);
      
      await new Promise(r => setTimeout(r, 1200));
      expertWork.steps[0].status = 'succeeded';
      expertWork.status = 'waiting_user';
      trace.status = 'waiting_user';
      trace.agentTimeline.push({ agent: '奥米', action: '暂停执行，等待主理人确认核查计划' });
      
      const newRes: ResultBlock = {
        id: resId, type: 'result', timestamp: getTime(),
        items: [
          {
            id: 'r1', type: 'markdown',
            content: `**[专家模式] 已生成多步执行规划：**\n\n1. **元数据专员** 先行扫描 \`order_db\` 业务域的最新 schema。\n2. **数据分析专员** 取最近三周环比基准对问题节点进行方差分析。\n3. （可选增强）由 **质量专员** 对空值进行规则拦截验证。\n\n请确认计划无误后，我将指挥各智能体开始运行上述管道。`
          },
          { id: 'r2', type: 'suggested_actions', content: ['✅ 批准并运行此计划', '✏️ 修改部分步骤', '❌ 取消当前分析'] }
        ]
      };
      currentBlocks = currentBlocks.map(b => b.id === cmdId ? { ...b, status: 'waiting_user' } as Block : b);
      currentBlocks.push(newRes);
      updateSessionBlocks(currentSessionId, currentBlocks);
      updateSessionTrace(currentSessionId, trace);
      setActiveBlockId(resId);
      setIsSimulating(false);
      scrollToBottom();
      return;
    }

    // MODE: Auto (Default Execution)
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
        contextState={contextState}
        onToggleHistory={() => setIsHistoryOpen(!isHistoryOpen)} 
        onToggleInbox={() => setIsInboxOpen(!isInboxOpen)}
        onNewTask={handleNewTask}
        onToggleEnvironment={() => setIsEnvironmentDrawerOpen(true)}
      />
      
      <HistorySidebar 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
        sessions={sessionList}
        currentSessionId={currentSessionId}
        onSelectSession={setCurrentSessionId}
        onNewTask={handleNewTask}
      />

      <InboxSidebar 
        isOpen={isInboxOpen}
        onClose={() => setIsInboxOpen(false)}
      />

      <div className="flex-1 flex overflow-hidden relative">
        <div ref={scrollRef} className="flex-1 overflow-y-auto pb-44 scroll-smooth bg-slate-50/50">
          <AnimatePresence mode="wait">
            {currentSession.blocks.length === 0 ? (
              <motion.div 
                key="hero-entry"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                className="min-h-full w-full relative group"
              >
                {/* Professional AI Background System */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10 bg-slate-50/30">
                  {/* High-Tech Data Network Image */}
                  <div className="absolute top-0 left-0 w-full h-[700px] opacity-[0.4] mix-blend-luminosity">
                    <img 
                      src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=2800" 
                      alt="Data Network" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale opacity-40 brightness-110"
                      style={{
                        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
                        maskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.1) 60%, transparent 100%)'
                      }}
                    />
                  </div>

                  {/* Subtle Dotted Grid */}
                  <div 
                    className="absolute inset-0 opacity-[0.4]" 
                    style={{ 
                      backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', 
                      backgroundSize: '24px 24px', 
                      WebkitMaskImage: 'radial-gradient(ellipse at center top, black 50%, transparent 80%)',
                      maskImage: 'radial-gradient(ellipse at center top, black 50%, transparent 80%)' 
                    }}
                  />
                  {/* Abstract Mesh Gradients */}
                  <div className="absolute -top-[10%] -left-[5%] w-[50%] h-[600px] rounded-full bg-blue-500/10 blur-[120px]" />
                  <div className="absolute -top-[5%] -right-[5%] w-[40%] h-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />
                  <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[60%] h-[400px] rounded-full bg-sky-400/5 blur-[120px]" />
                </div>

                {/* Content Container */}
                <div className="flex flex-col items-center pt-16 lg:pt-28 px-6 lg:px-12 w-full max-w-7xl mx-auto relative z-10">

              {/* 1. Hero */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center mb-10 w-full"
              >
                <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">你想完成什么任务？</h2>
                <p className="text-[15px] text-slate-500">告诉我目标，我会结合当前数据环境自动拆解并执行</p>
              </motion.div>

              {/* 2. Main Input Box */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="w-full flex justify-center"
              >
                <TaskComposer layout="hero" onSubmit={handleSubmitCommand} disabled={isSimulating} />
              </motion.div>

              {/* 3. Grid for Templates */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="w-full max-w-[900px] flex flex-col gap-10 pb-20 mt-16 z-10"
              >
                {/* Recommended Templates */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-slate-900 flex items-center">
                      <Sparkles className="w-4 h-4 text-blue-500 mr-2" />
                      推荐任务模板
                    </h3>
                    <button className="text-[12px] text-slate-500 hover:text-blue-600 font-medium flex items-center transition-colors">
                      探索更多模板 
                      <svg className="w-3.5 h-3.5 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "生成业务知识图谱", desc: "盘点实体、关系与核心链路", icon: <Share2 className="w-4 h-4 text-indigo-500" /> },
                    { title: "对齐核心指标口径", desc: "识别定义冲突与数据口径差异", icon: <Wand2 className="w-4 h-4 text-amber-500" /> },
                    { title: "诊断异常波动原因", desc: "定位关键波动因子与异常归因", icon: <LineChart className="w-4 h-4 text-emerald-500" /> }
                  ].map((t, i) => (
                    <button 
                      key={i} 
                      onClick={() => {
                        handleSubmitCommand(t.title);
                      }} 
                      className="p-4 rounded-2xl bg-white border border-slate-200 transition-all text-left flex flex-col hover:border-blue-300 hover:shadow-lg hover:shadow-slate-200/50 group hover:-translate-y-1"
                    >
                      <div className="mb-4 p-2 rounded-xl w-fit bg-slate-50 group-hover:bg-blue-50 transition-colors shrink-0">
                        {t.icon}
                      </div>
                      <div className="text-[14px] font-bold text-slate-800 mb-1.5 leading-tight">{t.title}</div>
                      <div className="text-[12px] text-slate-500 leading-snug">{t.desc}</div>
                    </button>
                  ))}
                  </div>
                </div>

              </motion.div>
              </div> {/* Close Content Container */}
              </motion.div>
            ) : (
              <motion.div
                key="execution-stream"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full min-h-full"
              >
                <BlockStream 
                  blocks={currentSession.blocks} 
                  onBlockClick={handleBlockClick} 
                  activeBlockId={activeBlockId} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <ExecutionSidePanel 
          trace={currentSession.trace} 
          isOpen={isSidePanelOpen && currentSession.trace !== null} 
          onClose={() => setIsSidePanelOpen(false)} 
        />
        
        {currentSession.blocks.length > 0 && (
          <TaskComposer 
            layout="dock" 
            onSubmit={handleSubmitCommand} 
            disabled={isSimulating} 
          />
        )}
      </div>

      <EnvironmentDrawer 
        isOpen={isEnvironmentDrawerOpen}
        onClose={() => setIsEnvironmentDrawerOpen(false)}
        contextState={contextState}
      />
    </div>
  );
}
