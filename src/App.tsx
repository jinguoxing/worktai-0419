import React, { useState, useEffect, useRef } from 'react';
import { WorkspaceHeader } from './components/WorkspaceHeader';
import { ExecutionSidePanel } from './components/ExecutionSidePanel';
import { OmniCommandBar } from './components/OmniCommandBar';
import { BlockStream } from './components/BlockStream';
import { HistorySidebar, SessionInfo } from './components/HistorySidebar';
import { MOCK_BLOCKS, MOCK_TRACE, MOCK_CHART_DATA } from './constants';
import { Block, ExecutionTrace, CommandBlock, WorkBlock, ResultBlock } from './types';
import { Sparkles, BarChart3, Fingerprint, LineChart, FileText, Bot, Database, Filter, Share2, Wand2, Network, Waypoints } from 'lucide-react';
import { motion } from 'motion/react';

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
    blocks: [],
    trace: null
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

    const initialTrace: ExecutionTrace = {
      taskId: cmdId,
      taskTitle: command,
      status: 'running',
      startTime: getTime(),
      currentAssignee: 'omi',
      agentTimeline: [{ agent: '奥米', action: '接收任务并开始拆解网络关系' }],
      toolSteps: []
    };
    updateSessionTrace(currentSessionId, initialTrace);

    await new Promise(r => setTimeout(r, 1200));

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
            <div className="min-h-full flex flex-col items-center justify-center p-6 lg:p-12 relative overflow-hidden">
              {/* 极其微弱的中心径向渐变背景烘托氛围 */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-100/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center max-w-3xl w-full z-10 mt-[-6vh]"
              >
                {/* 1. Hero 标题区 */}
                <div className="flex flex-col items-center text-center mb-10">
                  <div className="w-16 h-16 bg-white border border-slate-200/60 text-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/10 mb-6">
                    <Network className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">ChartWork 智能空间</h2>
                  <p className="text-[15px] text-slate-500 max-w-xl leading-relaxed">
                    多智能体网络已就绪。支持环境语义模型治理，基于底层血缘自动构建图谱，或执行复杂业务的异常溯源与归因。
                  </p>
                </div>

                {/* 2. 环境透明指示带 (Status Ribbon) - 替代原本臃肿的右侧边栏 */}
                <div className="flex items-stretch bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm mb-12 overflow-hidden w-full divide-x divide-slate-100 transition-all hover:bg-white/90">
                  <div className="flex-1 p-3.5 flex flex-col items-center text-center hover:bg-slate-50/50 transition-colors">
                    <Database className="w-4 h-4 text-emerald-500 mb-1.5 opacity-80" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">连通资产库</span>
                    <span className="text-[13px] font-semibold text-slate-700">order_db, crm_prod</span>
                  </div>
                  <div className="flex-1 p-3.5 flex flex-col items-center text-center bg-slate-50/30 hover:bg-slate-50/80 transition-colors">
                    <Filter className="w-4 h-4 text-amber-500 mb-1.5 opacity-80" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">扫描分析域</span>
                    <span className="text-[13px] font-semibold text-slate-700">交易、客户、风控</span>
                  </div>
                  <div className="flex-1 p-3.5 flex flex-col items-center text-center hover:bg-slate-50/50 transition-colors">
                    <Waypoints className="w-4 h-4 text-blue-500 mb-1.5 opacity-80" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">在线智能体矩阵</span>
                    <div className="flex items-center -space-x-1.5">
                       {['图谱', '语义', '数分', '架构'].map((name, i) => (
                         <div key={i} className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-600 shadow-sm relative tooltip hover:z-20 hover:scale-110 transition-transform cursor-help" title={`${name}专员`}>
                           {name.substring(0, 1)}
                           <div className="absolute -bottom-0.5 -right-0 w-2 h-2 bg-emerald-500 border-[1.5px] border-white rounded-full z-20"></div>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>

                {/* 3. 意图模块格 (Prompt Grid) */}
                <div className="w-full">
                  <div className="flex items-center justify-center mb-5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center bg-slate-100/50 px-3 py-1 rounded-full border border-slate-200/50">
                      <Sparkles className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> 推荐探索指令
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 w-full">
                    {[
                      { title: "盘点生成业务知识图谱", desc: "穿透底层数据血缘与计算引擎日志，以可视化构架呈现企业实体关联", icon: <Share2 className="w-4 h-4 text-indigo-500" /> },
                      { title: "执行核心指标语义对齐", desc: "扫描并提取活动库内口径冲突，消除因命名与计算逻辑导致的认知歧义", icon: <Wand2 className="w-4 h-4 text-amber-500" /> },
                      { title: "对昨日订单异常拉群归因", desc: "动态召集数分与业务智能体，利用多维归因树定位导致大盘波动的根因", icon: <LineChart className="w-4 h-4 text-emerald-500" /> },
                      { title: "审查核心域数据架构质量", desc: "唤起架构审阅引擎，对目标环境的所有主数据进行元数据完备度扫描", icon: <Database className="w-4 h-4 text-blue-500" /> }
                    ].map((item, i) => (
                      <button
                        key={i}
                        onClick={() => handleSubmitCommand(item.title)}
                        className="bg-white/80 backdrop-blur-sm border border-slate-200/80 px-5 py-4 rounded-xl hover:bg-white hover:border-blue-400 hover:ring-2 hover:ring-blue-500/10 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group flex flex-col text-left relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-slate-50 to-transparent opacity-50 group-hover:from-blue-50/50 transition-colors pointer-events-none" />
                        <div className="flex items-center space-x-3 mb-2 z-10">
                          <div className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors shrink-0 shadow-sm">
                            {item.icon}
                          </div>
                          <span className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                            {item.title}
                          </span>
                        </div>
                        <p className="text-[11.5px] text-slate-500 leading-relaxed font-sans mt-0.5 z-10">
                          {item.desc}
                        </p>
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
        
        <OmniCommandBar onSubmit={handleSubmitCommand} disabled={isSimulating} />
      </div>
    </div>
  );
}
