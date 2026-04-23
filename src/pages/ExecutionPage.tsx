import React, { useEffect, useRef } from 'react';
import { 
  ChevronRight, ChevronDown, Bell, HelpCircle, 
  CheckCircle2, Circle, MessageSquare,
  Paperclip, BarChart2, Smile, ArrowRight, MoreHorizontal,
  FileCode2, Database, AlertTriangle, Layers, Activity,
  PlayCircle, Clock, Link as LinkIcon, User as UserIcon
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  onBack: () => void;
}

export function ExecutionPage({ onBack }: Props) {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col font-sans">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 h-[56px] bg-white border-b border-slate-200 z-50 flex items-center justify-between px-5 shadow-sm">
        <div className="flex items-center space-x-3">
          <div 
            onClick={onBack}
            className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center cursor-pointer hover:bg-blue-700 transition"
          >
            <Database className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-slate-800 text-[15px] cursor-pointer" onClick={onBack}>数据语义治理平台</span>
          <ChevronRight className="w-4 h-4 text-slate-300" />
          <span className="text-slate-500 text-[14px]">AI工作台</span>
          <span className="text-slate-300 mx-0.5">/</span>
          <span className="text-slate-800 text-[14px] font-semibold tracking-wide">执行页</span>
        </div>
        
        <div className="flex items-center space-x-5 text-sm">
          <div className="flex items-center text-slate-600 hover:bg-slate-50 px-2 py-1 rounded cursor-pointer transition">
            <span className="text-slate-400 mr-1">项目：</span> 
            <span className="font-medium mr-1.5">零售数据项目: MRP推演</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
          
          <div className="h-4 w-px bg-slate-200" />
          
          <div className="flex items-center space-x-3">
            <button className="text-slate-400 hover:text-slate-600 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>
            <button className="text-slate-400 hover:text-slate-600">
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
          
          <div className="h-4 w-px bg-slate-200" />

          <div className="flex items-center space-x-2 cursor-pointer hover:bg-slate-50 px-2 py-1 rounded transition">
            <img 
              src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e2e8f0" 
              className="w-7 h-7 rounded-full border border-slate-200 bg-slate-100"
              alt="avatar"
            />
            <span className="text-slate-700 font-medium">规划员</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </header>

      {/* Main 3-Column Layout */}
      <div className="flex-1 flex overflow-hidden pt-[56px]">
        
        {/* Left Panel: Task Context */}
        <div className="w-[300px] xl:w-[320px] h-full overflow-y-auto p-4 shrink-0">
          <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100/60 p-5 flex flex-col min-h-full">
            
            {/* Task Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 text-[12px] font-medium mb-3">
                <span className="text-slate-500">当前任务</span>
                <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">执行中</span>
              </div>
              <h2 className="text-[16px] font-bold text-slate-800 leading-snug mb-2">推演MRP原材料需求缺口与BOM爆炸计算</h2>
              <div className="text-[12px] text-slate-400 font-mono">任务ID: task_2026_mrp_582</div>
              <div className="text-[12px] text-slate-400">创建时间: 2026-04-22 10:15:30</div>
            </div>

            <div className="h-px bg-slate-100 my-1 w-full" />

            <div className="py-4 flex items-center justify-between">
               <span className="text-[13px] font-bold text-slate-800">当前轮次 3 / 6</span>
               <span className="text-[12px] text-slate-500">进度 50%</span>
            </div>

            <div className="h-px bg-slate-100 my-1 w-full" />

            {/* Overview Meta */}
            <div className="py-4 space-y-3">
              <div className="text-[13px] font-bold text-slate-800 mb-2">任务概览</div>
              <div className="flex justify-between text-[13px]">
                <span className="text-slate-500">优先级</span>
                <span className="text-red-600 font-medium bg-red-50 px-2 py-0.5 rounded">高</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-slate-500">状态</span>
                <span className="text-blue-600 font-medium">执行中</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-slate-500">阻塞状态</span>
                <span className="text-slate-800">无阻塞</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-slate-500">推演对象</span>
                <span className="text-slate-800 font-medium">12 个产品簇</span>
              </div>
            </div>

            <div className="h-px bg-slate-100 my-2 w-full" />

            {/* Progress Stepper */}
            <div className="py-2 flex-1">
              <div className="text-[13px] font-bold text-slate-800 mb-4">推演进度</div>
              <div className="space-y-0 relative">
                
                {/* Connecting Line */}
                <div className="absolute top-3 bottom-8 left-[9px] w-0.5 bg-slate-100 z-0"></div>

                {/* Step 1 */}
                <div className="flex items-start relative z-10 pb-5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5 ring-4 ring-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="ml-3 flex-1 flex justify-between">
                    <span className="text-[13px] font-medium text-slate-700">理解业务背景与目标</span>
                    <span className="text-[12px] text-emerald-600">已完成</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start relative z-10 pb-5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5 ring-4 ring-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="ml-3 flex-1 flex justify-between">
                    <span className="text-[13px] font-medium text-slate-700">构建MRP推演链路</span>
                    <span className="text-[12px] text-emerald-600">已完成</span>
                  </div>
                </div>

                {/* Step 3 (Active) */}
                <div className="flex items-start relative z-10 pb-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center shrink-0 mt-0.5 ring-4 ring-white">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                  </div>
                  <div className="ml-3 flex-1 flex justify-between">
                    <span className="text-[13px] font-bold text-blue-700">数据提取与BOM爆炸</span>
                    <span className="text-[12px] text-blue-600">执行中</span>
                  </div>
                </div>
                {/* Sub-steps */}
                <div className="pl-6 space-y-2 pb-5 border-l-2 border-transparent relative z-0">
                  <div className="flex items-center space-x-2 text-[12px] text-blue-600 font-medium relative before:absolute before:-left-[15px] before:top-1/2 before:w-2 before:h-px before:bg-slate-200">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                    <span>提取并递归展开多级BOM</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[12px] text-slate-400 relative before:absolute before:-left-[15px] before:top-1/2 before:w-2 before:h-px before:bg-slate-200">
                    <div className="w-1.5 h-1.5 rounded-full border border-slate-300"></div>
                    <span>获取ERP当前实物可用库存</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[12px] text-slate-400 relative before:absolute before:-left-[15px] before:top-1/2 before:w-2 before:h-px before:bg-slate-200">
                    <div className="w-1.5 h-1.5 rounded-full border border-slate-300"></div>
                    <span>盘点采购在途与生产在制单据</span>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start relative z-10 pb-5">
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 ring-4 ring-white border border-slate-200">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                  </div>
                  <div className="ml-3 flex-1 flex justify-between">
                    <span className="text-[13px] font-medium text-slate-500">运算MRP净需求缺口</span>
                    <span className="text-[12px] text-slate-400">等待中</span>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex items-start relative z-10">
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 ring-4 ring-white border border-slate-200">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                  </div>
                  <div className="ml-3 flex-1 flex justify-between">
                    <span className="text-[13px] font-medium text-slate-500">生成采购与调拨建议</span>
                    <span className="text-[12px] text-slate-400">等待中</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Center Panel: Interaction Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          
          {/* Main Chat Area */}
          <div className="flex-1 overflow-y-auto px-6 py-6 pb-[160px] space-y-6" ref={chatRef}>
            
            {/* Agent Intro Info */}
            <div className="flex items-center space-x-3 mb-6 bg-white py-3 px-5 rounded-2xl shadow-sm border border-slate-100 w-fit">
              <div className="relative">
                <div className="w-10 h-10 bg-indigo-50 rounded-full border border-indigo-100 flex items-center justify-center text-xl shadow-sm">🤖</div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-slate-800">奥米 (任务指挥官)</h3>
                <p className="text-[12px] text-emerald-600 font-medium">● 护航中</p>
              </div>
            </div>

            {/* Chat Flow */}
            <div className="flex items-start space-x-3 max-w-[85%]">
              <div className="w-8 h-8 bg-indigo-50 rounded-full border border-indigo-100 flex items-center justify-center text-sm shadow-sm shrink-0">🤖</div>
              <div className="flex flex-col space-y-1">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 text-[14px] text-slate-800 leading-relaxed shadow-sm">
                  好的，我来帮您进行 <span className="font-semibold text-blue-600">Q3季度的MRP原材料需求缺口推演</span>。<br/><br/>
                  为了确保运算的有效性，我需要先拉取并冻结涉及的基准数据范围。我打算按以下路径进行：<br/>
                  <ul className="list-decimal pl-5 mt-2 space-y-1 text-[13px] text-slate-700">
                    <li>全量提取 `FORECAST_Q3_V2` 及确定的销售订单。</li>
                    <li>将其输入给多级BOM爆炸算法，拆解至原材料（L0到L8层级）。</li>
                    <li>快照当前的工厂实物库存、在途采购和在制WO。</li>
                    <li>最后运行毛需求与净需求对冲算法。</li>
                  </ul>
                  <br/>您确认按此方案流转吗？
                </div>
                <span className="text-[11px] text-slate-400">10:15</span>
              </div>
            </div>

            <div className="flex items-start justify-end w-full">
              <div className="flex flex-col items-end space-y-1 max-w-[85%]">
                <div className="bg-[#EEF2FF] border border-[#E0E7FF] rounded-2xl rounded-tr-sm px-4 py-3 text-[14px] text-slate-800 leading-relaxed shadow-sm text-right flex items-center space-x-3">
                  <span>没问题，另外在快照库存的时候，记得剔除掉状态为"质检冻结"的那部分物料。</span>
                </div>
                <span className="text-[11px] text-slate-400">10:18</span>
              </div>
              <div className="w-8 h-8 shrink-0 ml-3 mt-1 relative">
                <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e2e8f0" className="w-8 h-8 rounded-full border border-slate-200 bg-slate-100" alt="user" />
              </div>
            </div>

            <div className="flex items-start space-x-3 max-w-[85%]">
              <div className="w-8 h-8 bg-indigo-50 rounded-full border border-indigo-100 flex items-center justify-center text-sm shadow-sm shrink-0">🤖</div>
              <div className="flex flex-col space-y-1">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 text-[14px] text-slate-800 leading-relaxed shadow-sm">
                  收到。我已经向库存探针引擎下达了额外指令：<code className="text-pink-600 bg-pink-50 px-1 py-0.5 rounded text-[12px] mx-1">exclude_status = 'Q_FROZEN'</code>。<br/><br/>
                  现在，数据提取与BOM爆炸运算正在进行中，由于涉及约15K条物料的深层遍历，预计需要一分钟左右，请稍候......
                </div>
                <span className="text-[11px] text-slate-400">10:19</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 max-w-[85%]">
              <div className="w-8 h-8 bg-indigo-50 rounded-full border border-indigo-100 flex items-center justify-center text-sm shadow-sm shrink-0">🤖</div>
              <div className="flex flex-col space-y-1">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm flex items-center space-x-3">
                  <span className="text-[13px] font-medium text-slate-700">正在与数据基座交互运算中</span>
                  <div className="flex space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{animationDelay: '0ms'}}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{animationDelay: '150ms'}}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{animationDelay: '300ms'}}></span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Floating Composer */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[800px] px-6 z-20">
            <div className="bg-white border text-left border-slate-200 shadow-xl shadow-slate-200/50 rounded-2xl p-4 flex flex-col focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
              <textarea 
                className="w-full bg-transparent border-0 text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none resize-none min-h-[50px] font-sans" 
                placeholder="请输入您的需求，补充上下文，或继续追问..." 
              />
              <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-100">
                <div className="flex space-x-1.5">
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition"><Paperclip className="w-4 h-4" /></button>
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition"><BarChart2 className="w-4 h-4" /></button>
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition"><Smile className="w-4 h-4" /></button>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-[11px] text-slate-400hidden md:block">Shift + Enter 换行, Enter 发送</span>
                  <button className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm transition-transform hover:scale-105">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Panel: Inspector Context */}
        <div className="w-[300px] xl:w-[340px] h-full overflow-y-auto p-4 pl-0 shrink-0">
          <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100/60 p-5 flex flex-col space-y-6 min-h-full">
            
            {/* Inspector Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
               <h3 className="text-[14px] font-bold text-slate-800 flex items-center">
                 <Activity className="w-4 h-4 mr-1.5 text-indigo-500" />
                 执行洞察 (Inspector)
               </h3>
               <button className="text-[12px] text-slate-400 hover:text-slate-600 select-none">向上收起</button>
            </div>

            {/* Current Phase */}
            <div>
               <div className="text-[11px] text-slate-500 mb-2 font-medium">当前所处阶段： 轮次 3 / 6</div>
               <div className="flex items-center space-x-2 bg-blue-50/50 p-2.5 rounded-lg border border-blue-100/50">
                 <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0"></div>
                 <span className="text-[13px] text-blue-700 font-medium tracking-wide">正在计算：多级BOM图谱爆炸提取</span>
               </div>
            </div>

            {/* Digital Workers / Agents */}
            <div>
              <div className="text-[13px] font-bold text-slate-800 mb-3">协同数字专员</div>
              <div className="space-y-3">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-2">
                     <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                       <Layers className="w-3.5 h-3.5 text-indigo-600" />
                     </div>
                     <span className="text-[12px] font-medium text-slate-700">MRP算法专员</span>
                   </div>
                   <span className="text-[11px] text-blue-600 font-medium">运算中 (BOM爆展)</span>
                 </div>
                 
                 <div className="flex items-center justify-between opacity-60">
                   <div className="flex items-center space-x-2">
                     <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                       <Database className="w-3.5 h-3.5 text-amber-600" />
                     </div>
                     <span className="text-[12px] font-medium text-slate-700">库存风控员</span>
                   </div>
                   <span className="text-[11px] text-slate-500">等待输入数据</span>
                 </div>

                 <div className="flex items-center justify-between opacity-60">
                   <div className="flex items-center space-x-2">
                     <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                       <UserIcon className="w-3.5 h-3.5 text-emerald-600" />
                     </div>
                     <span className="text-[12px] font-medium text-slate-700">供需规划师</span>
                   </div>
                   <span className="text-[11px] text-slate-500">全局监控中</span>
                 </div>
              </div>
            </div>

            {/* Tools Invoked */}
            <div>
              <div className="flex justify-between items-end mb-3">
                <div className="text-[13px] font-bold text-slate-800">底层工具调用 (3)</div>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[12px]">
                  <div className="flex items-center space-x-2">
                    <FileCode2 className="w-3.5 h-3.5 text-pink-500" />
                    <span className="font-mono text-slate-700 font-medium">BOM_Graph_Query</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-500">
                    <span className="text-blue-500">执行中</span>
                    <span className="font-mono text-[10px]">00:15s</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[12px] opacity-70">
                   <div className="flex items-center space-x-2">
                     <Database className="w-3.5 h-3.5 text-sky-500" />
                     <span className="font-mono text-slate-700">SAP_Inv_Snapshot</span>
                   </div>
                   <div className="flex items-center space-x-3 text-slate-400">
                     <span>等待调度</span>
                     <span className="font-mono text-[10px]">--</span>
                   </div>
                </div>
                
                <div className="flex items-center justify-between text-[12px] opacity-70">
                   <div className="flex items-center space-x-2">
                     <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                     <span className="font-mono text-slate-700">Risk_Predictor</span>
                   </div>
                   <div className="flex items-center space-x-3 text-slate-400">
                     <span>挂起中</span>
                     <span className="font-mono text-[10px]">--</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Live Metrics */}
            <div>
              <div className="text-[13px] font-bold text-slate-800 mb-3 flex items-center justify-between">
                <span>关键计算指标 (实时)</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-3">
                  <div className="text-[11px] text-slate-500 mb-1">本次扫描耗时</div>
                  <div className="text-[15px] font-mono font-semibold text-slate-800">15.2<span className="text-[11px] text-slate-400 ml-0.5">s</span></div>
                </div>
                <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-3">
                  <div className="text-[11px] text-slate-500 mb-1">扫描物料节点</div>
                  <div className="text-[15px] font-mono font-semibold text-slate-800">45.8<span className="text-[11px] text-slate-400 ml-0.5">K</span></div>
                </div>
                <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-3">
                  <div className="text-[11px] text-slate-500 mb-1">MRP爆炸层级</div>
                  <div className="text-[15px] font-mono font-semibold text-blue-600">L8 <span className="text-[11px] text-slate-400 ml-0.5 font-sans">层级</span></div>
                </div>
                <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-3">
                  <div className="text-[11px] text-slate-500 mb-1">识别物料缺口</div>
                  <div className="text-[13px] font-medium text-slate-500 mt-1">计算中...</div>
                </div>
              </div>
            </div>

            {/* Evidence Context */}
            <div className="flex-1">
              <div className="text-[13px] font-bold text-slate-800 mb-3">被纳入当前上下文的挂载证据</div>
              <ul className="space-y-2.5 text-[12px] bg-slate-50 border border-slate-100 rounded-lg p-3">
                <li className="flex items-start">
                  <span className="text-slate-400 mr-2 mt-0.5 w-1 h-1 rounded-full bg-slate-300 shrink-0"></span>
                  <span className="text-slate-600 leading-snug">主输入源: <span className="font-mono text-slate-800 font-medium">FORECAST_Q3_V2</span> (预测订单)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-slate-400 mr-2 mt-0.5 w-1 h-1 rounded-full bg-slate-300 shrink-0"></span>
                  <span className="text-slate-600 leading-snug">BOM快照版本: <span className="font-mono text-slate-800 font-medium">ENG_BOM_2604</span></span>
                </li>
                <li className="flex items-start">
                  <span className="text-slate-400 mr-2 mt-0.5 w-1 h-1 rounded-full bg-slate-300 shrink-0"></span>
                  <span className="text-slate-600 leading-snug">库存调度策略: <span className="text-slate-800 font-medium">缓冲浮动 +15%</span></span>
                </li>
              </ul>
              <div className="mt-2 text-right">
                <button className="text-[11px] text-blue-600 hover:underline">去查阅元数据详情</button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
