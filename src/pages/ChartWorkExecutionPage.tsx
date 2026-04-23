import React, { useRef, useEffect } from 'react';
import { 
  Play, FileText, CheckCircle2, ChevronRight, 
  MapPin, User, Check, Clock, Search, BookOpen, AlertCircle, 
  Paperclip, Send, RefreshCcw, Bell, Activity, Database
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer 
} from 'recharts';

interface Props {
  onBack: () => void;
}

export function ChartWorkExecutionPage({ onBack }: Props) {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  const dataRefund = [
    { time: '00:00', yesterday: 2.1, avg7: 1.8 },
    { time: '04:00', yesterday: 2.0, avg7: 1.7 },
    { time: '08:00', yesterday: 2.3, avg7: 1.9 },
    { time: '12:00', yesterday: 2.5, avg7: 2.0 },
    { time: '16:00', yesterday: 3.1, avg7: 2.2 },
    { time: '20:00', yesterday: 3.5, avg7: 2.3 },
    { time: '24:00', yesterday: 3.2, avg7: 2.1 },
  ];

  const dataSuccess = [
    { time: '00:00', yesterday: 88, avg7: 85 },
    { time: '04:00', yesterday: 89, avg7: 86 },
    { time: '08:00', yesterday: 85, avg7: 86 },
    { time: '12:00', yesterday: 84, avg7: 85.5 },
    { time: '16:00', yesterday: 81, avg7: 86 },
    { time: '20:00', yesterday: 76, avg7: 85 },
    { time: '24:00', yesterday: 78, avg7: 84 },
  ];

  return (
    <div className="flex-1 flex flex-col pt-4 px-4 overflow-hidden bg-slate-50 font-sans">
      
      {/* Top Banner */}
      <div className="shrink-0 bg-gradient-to-r from-[#F0F6FF] to-white rounded-2xl p-4 shadow-sm border border-blue-100/50 flex justify-between items-center bg-white relative">
        <div className="flex items-center space-x-4 ml-2">
          {/* Avatar Area */}
          <div className="w-[60px] h-[60px] relative shrink-0">
             <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-3xl shadow-inner overflow-hidden border border-blue-200">
                🤖
             </div>
             {/* decorative dots */}
             <div className="absolute -left-2 -bottom-1 text-blue-300 w-full h-full pointer-events-none opacity-50" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
          </div>
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight flex items-center">
              奥米正在推进 你的任务
            </h1>
            <p className="text-[13px] text-slate-500 mt-1">围绕当前任务持续理解、执行、交付结果，并在关键节点向你同步进度与待确认事项。</p>
          </div>
        </div>

        <div className="flex items-center space-x-8 pr-2">
           <div className="flex items-center space-x-8 text-[13px]">
              <div>
                 <div className="text-slate-400 mb-0.5">任务名称</div>
                 <div className="font-bold text-slate-800">昨日订单异常归因</div>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div>
                 <div className="text-slate-400 mb-0.5">当前模式</div>
                 <div className="font-bold text-slate-800 flex items-center"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>自动执行</div>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div>
                 <div className="text-slate-400 mb-0.5">当前状态</div>
                 <div className="font-bold text-slate-800 flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5 animate-pulse"></span>执行中</div>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div>
                 <div className="text-slate-400 mb-0.5">当前轮次</div>
                 <div className="font-bold text-slate-800">第 2 轮</div>
              </div>
           </div>

           <div className="flex space-x-3 ml-8">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-[14px] font-semibold flex items-center shadow-sm shadow-blue-500/20 transition-all">
                 <Play className="w-4 h-4 mr-1.5 fill-current" />
                 继续分析
              </button>
              <button className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-5 py-2 rounded-lg text-[14px] font-semibold flex items-center transition-all shadow-sm">
                 <FileText className="w-4 h-4 mr-1.5" />
                 查看完整结果
              </button>
           </div>
        </div>
      </div>

      {/* Main 3 Columns */}
      <div className="flex-1 flex gap-4 mt-4 overflow-hidden">
        
        {/* Left Panel */}
        <div className="w-[260px] bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col shrink-0 overflow-y-auto hidden lg:flex">
           <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center text-[14px] font-bold text-slate-800">
                 <BookOpen className="w-4 h-4 mr-1.5 text-blue-600" />
                 任务概览
              </div>
              <FileText className="w-4 h-4 text-slate-400" />
           </div>

           <div className="p-5 flex-1 flex flex-col">
              <div className="mb-6">
                <div className="text-[12px] text-slate-400 font-medium mb-1.5">当前任务</div>
                <div className="text-[15px] font-bold text-slate-900">昨日订单异常归因</div>
              </div>
              
              <div className="mb-8">
                <div className="text-[12px] text-slate-400 font-medium mb-1.5">任务目标</div>
                <div className="text-[13px] text-slate-700 leading-snug">定位异常原因并生成归因结论与建议</div>
              </div>

              <div className="mb-8 flex-1">
                <div className="text-[12px] text-slate-400 font-medium mb-4">任务阶段</div>
                <div className="space-y-0 relative text-[13px]">
                   <div className="absolute top-2.5 bottom-6 left-[7.5px] w-0.5 bg-slate-100 z-0"></div>
                   
                   <div className="flex items-center justify-between relative z-10 pb-4">
                     <div className="flex items-center space-x-2.5">
                       <span className="w-4 h-4 rounded-full border border-emerald-500 bg-white flex items-center justify-center text-[10px] text-emerald-600 font-bold tracking-tighter">1</span>
                       <span className="font-semibold text-slate-800">理解任务</span>
                     </div>
                     <span className="text-[11px] text-emerald-500 flex items-center"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1"></span>已完成</span>
                   </div>

                   <div className="flex items-center justify-between relative z-10 pb-4">
                     <div className="flex items-center space-x-2.5">
                       <span className="w-4 h-4 rounded-full border border-emerald-500 bg-white flex items-center justify-center text-[10px] text-emerald-600 font-bold tracking-tighter">2</span>
                       <span className="font-semibold text-slate-800">制定分析路径</span>
                     </div>
                     <span className="text-[11px] text-emerald-500 flex items-center"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1"></span>已完成</span>
                   </div>

                   <div className="flex items-center justify-between relative z-10 pb-4">
                     <div className="flex items-center space-x-2.5">
                       <span className="w-4 h-4 rounded-full border-blue-600 bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold tracking-tighter shadow-[0_0_0_3px_#EFF6FF]">3</span>
                       <span className="font-bold text-blue-700">数据处理与定位</span>
                     </div>
                     <span className="text-[11px] text-blue-600 flex items-center font-medium"><span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-1 animate-pulse"></span>进行中</span>
                   </div>

                   <div className="flex items-center justify-between relative z-10 pb-4">
                     <div className="flex items-center space-x-2.5">
                       <span className="w-4 h-4 rounded-full border border-slate-300 bg-slate-50 flex items-center justify-center text-[10px] text-slate-400 font-bold tracking-tighter">4</span>
                       <span className="font-medium text-slate-500">生成结论</span>
                     </div>
                     <span className="text-[11px] text-slate-400 flex items-center"><span className="w-1 h-1 bg-slate-300 rounded-full mr-1"></span>待执行</span>
                   </div>

                   <div className="flex items-center justify-between relative z-10">
                     <div className="flex items-center space-x-2.5">
                       <span className="w-4 h-4 rounded-full border border-slate-300 bg-slate-50 flex items-center justify-center text-[10px] text-slate-400 font-bold tracking-tighter">5</span>
                       <span className="font-medium text-slate-500">输出建议与交付结果</span>
                     </div>
                     <span className="text-[11px] text-slate-400 flex items-center"><span className="w-1 h-1 bg-slate-300 rounded-full mr-1"></span>待执行</span>
                   </div>
                </div>
              </div>
              
              <div className="mb-6 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                 <div className="text-[12px] text-slate-500 font-medium mb-1.5">当前状态提示</div>
                 <div className="text-[13px] font-semibold text-slate-800 flex items-center">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>
                    当前无需操作，奥米正在继续分析
                 </div>
              </div>

              <div>
                 <div className="text-[12px] text-slate-400 font-medium mb-2.5">快捷操作</div>
                 <div className="grid grid-cols-3 gap-2">
                    <button className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                      <Clock className="w-4 h-4 text-slate-600 mb-1" />
                      <span className="text-[11px] text-slate-600 font-medium">查看历史轮次</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                      <RefreshCcw className="w-4 h-4 text-slate-600 mb-1" />
                      <span className="text-[11px] text-slate-600 font-medium">切换任务</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                      <Bell className="w-4 h-4 text-slate-600 mb-1" />
                      <span className="text-[11px] text-slate-600 font-medium">订阅结果</span>
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Center Panel */}
        <div className="flex-1 flex flex-col relative w-full overflow-hidden">
           
           {/* Chat List */}
           <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 pb-[90px]" ref={chatRef}>
             
               {/* User Msg */}
               <div className="flex justify-end relative">
                 <div className="flex items-start max-w-[85%] space-x-3">
                   <div className="flex flex-col items-end space-y-1">
                     <span className="text-[11px] text-slate-400">10:02</span>
                     <div className="bg-[#E5EDFF] text-[#1E3A8A] px-5 py-3 rounded-2xl rounded-tr-sm text-[14px]">
                       分析昨日订单异常并给出归因
                     </div>
                   </div>
                   <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e2e8f0" 
                        className="w-8 h-8 rounded-full border border-slate-200 shrink-0 mt-3" alt="user" />
                 </div>
               </div>

               {/* Bot Block 1 */}
               <div className="flex items-start max-w-[95%] space-x-3">
                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200 mt-1">🤖</div>
                 <div className="flex-1 flex flex-col space-y-3">
                    <div className="text-[14px] text-slate-800 leading-relaxed bg-white/50 px-2 py-1 rounded">
                       我会先检查昨日订单量、支付成功率和渠道分布的异常波动，再定位主要影响因素。<br/>
                       当前使用：财务分析组 / order_db / 昨日。
                    </div>

                    {/* Complex Card 1 */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 w-full flex gap-5">
                       <div className="flex-1">
                          <div className="text-[13px] font-bold text-slate-800 mb-3">当前任务进度</div>
                          <div className="space-y-1.5 text-[12px]">
                             <div className="flex items-start text-emerald-600"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 mt-1 shrink-0"></span> 已完成：需求理解、分析路径确认</div>
                             <div className="flex items-start text-blue-600 font-medium"><span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5 mt-1 shrink-0 shadow-[0_0_0_2px_#DBEAFE]"></span> 进行中：昨日订单异常定位</div>
                             <div className="flex items-start text-slate-500"><span className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-2 mt-1 shrink-0"></span> 下一步：生成归因结论与建议</div>
                          </div>
                          <div className="mt-4 text-[12px] text-slate-500 border-t border-slate-100 pt-3">
                             当前状态：<span className="text-slate-800 font-medium">无需操作</span>
                          </div>
                       </div>
                       
                       <div className="w-px bg-slate-100"></div>

                       <div className="flex-1">
                          <div className="text-[13px] font-bold text-slate-800 mb-3">工作进展摘要</div>
                          <ul className="text-[12px] text-slate-700 space-y-1.5 list-disc pl-3">
                            <li>连接数据仓库、提取昨日订单与支付数据</li>
                            <li>对比近 7 日基线、定位区域与渠道波动因子</li>
                          </ul>
                          <div className="mt-4 text-[12px] text-slate-500 border-t border-slate-100 pt-3 flex items-center">
                             参与角色：奥米、数据分析专员、元数据专员
                             <div className="flex -space-x-1.5 ml-2">
                               <div className="w-4 h-4 rounded-full bg-blue-100 ring-1 ring-white"></div>
                               <div className="w-4 h-4 rounded-full bg-indigo-100 ring-1 ring-white"></div>
                               <div className="w-4 h-4 rounded-full bg-emerald-100 ring-1 ring-white"></div>
                             </div>
                          </div>
                       </div>

                       <div className="w-px bg-slate-100"></div>

                       <div className="flex-[1.2]">
                          <div className="text-[13px] font-bold text-slate-800 mb-3">关键发现</div>
                          <div className="space-y-2 text-[12px] text-slate-800">
                             <div className="flex items-start leading-snug">
                                <span className="w-3.5 h-3.5 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-[9px] mr-1.5 shrink-0 mt-0.5">1</span>
                                华东区域退款率 2.38%，较近 7 日均值上升 1.12 个百分点
                             </div>
                             <div className="flex items-start leading-snug">
                                <span className="w-3.5 h-3.5 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-[9px] mr-1.5 shrink-0 mt-0.5">2</span>
                                20:00-24:00 支付成功率下降 2.83 个百分点
                             </div>
                             <div className="flex items-start leading-snug">
                                <span className="w-3.5 h-3.5 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-[9px] mr-1.5 shrink-0 mt-0.5">3</span>
                                异常波动主要集中在华东、华南两个区域
                             </div>
                          </div>
                       </div>
                    </div>

                 </div>
               </div>

               {/* Bot Block 2 */}
               <div className="flex items-start max-w-[95%] space-x-3 mt-4">
                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200 mt-1">🤖</div>
                 <div className="flex-1 flex flex-col space-y-3">
                    <div className="text-[14px] text-slate-800 leading-relaxed bg-white/50 px-2 py-1 rounded">
                       我先说结论：昨日异常主要来自<span className="font-semibold text-slate-900 border-b border-red-200 bg-red-50 px-0.5">华东区域退款率上升</span>，其次是<span className="font-semibold text-slate-900 border-b border-red-200 bg-red-50 px-0.5">晚间支付成功率下降</span>。下面是具体图表和建议动作。
                    </div>
                    <div className="flex space-x-2">
                       <button className="px-4 py-1.5 text-[12px] font-semibold text-blue-600 bg-white border border-blue-200 rounded-full shadow-sm hover:bg-blue-50 transition">查看华东渠道明细</button>
                       <button className="px-4 py-1.5 text-[12px] font-semibold text-blue-600 bg-white border border-blue-200 rounded-full shadow-sm hover:bg-blue-50 transition">生成异常报告</button>
                       <button className="px-4 py-1.5 text-[12px] font-semibold text-blue-600 bg-white border border-blue-200 rounded-full shadow-sm hover:bg-blue-50 transition">订阅异常监控</button>
                    </div>
                 </div>
               </div>

               {/* User Msg 2 */}
               <div className="flex justify-end relative pt-2">
                 <div className="flex items-start max-w-[85%] space-x-3">
                   <div className="flex flex-col items-end space-y-1">
                     <span className="text-[11px] text-slate-400">10:07</span>
                     <div className="bg-[#E5EDFF] text-[#1E3A8A] px-5 py-3 rounded-2xl rounded-tr-sm text-[14px]">
                       再看下华东区域是哪些渠道导致的
                     </div>
                   </div>
                   <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e2e8f0" 
                        className="w-8 h-8 rounded-full border border-slate-200 shrink-0 mt-3" alt="user" />
                 </div>
               </div>

               {/* Bot Block 3 */}
               <div className="flex items-start max-w-[95%] space-x-3">
                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200 mt-1">🤖</div>
                 <div className="flex-1 flex flex-col space-y-3">
                    <div className="text-[14px] text-slate-800 leading-relaxed bg-white/50 px-2 py-1 rounded">
                       我将继续细分华东区域的渠道构成，优先检查直营、分销和线上渠道的订单量、退款率与支付成功率。
                    </div>

                    {/* Complex Card 2 */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 w-full flex flex-col gap-5">
                       
                       {/* Top Row Grid */}
                       <div className="flex gap-5">
                          <div className="flex-1">
                             <div className="text-[13px] font-bold text-slate-800 mb-3">当前任务进度</div>
                             <div className="space-y-1.5 text-[12px]">
                                <div className="flex items-start text-emerald-600"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 mt-1 shrink-0"></span> 已完成：需求级异常定位</div>
                                <div className="flex items-start text-blue-600 font-medium"><span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5 mt-1 shrink-0 shadow-[0_0_0_2px_#DBEAFE]"></span> 进行中：华东渠道构成分析</div>
                                <div className="flex items-start text-slate-500"><span className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-2 mt-1 shrink-0"></span> 下一步：输出渠道级归因结果</div>
                             </div>
                             <div className="mt-4 text-[12px] text-slate-500 font-medium">当前状态：无需操作</div>
                          </div>
                          
                          <div className="w-px bg-slate-100"></div>

                          <div className="flex-[0.8]">
                             <div className="text-[13px] font-bold text-slate-800 mb-3">执行摘要</div>
                             <ul className="text-[12px] text-slate-700 space-y-1.5 list-disc pl-3">
                               <li>提取华东区域渠道数据</li>
                               <li>计算渠道核心指标、对比近 7 日基线</li>
                               <li>定位主要异常渠道</li>
                             </ul>
                          </div>

                          <div className="w-px bg-slate-100"></div>

                          <div className="flex-1">
                             <div className="text-[13px] font-bold text-slate-800 mb-3">新发现</div>
                             <div className="text-[12px] text-slate-700 leading-relaxed">
                               华东异常主要集中在直营渠道，退款率显著高于基线。分销和线上渠道存在轻微波动，但不足以构成主要原因。
                             </div>
                          </div>

                          <div className="w-px bg-slate-100"></div>

                          <div className="flex-[1.2] relative h-full">
                             <div className="absolute top-0 right-0 bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">已生成阶段结果</div>
                             <div className="text-[13px] font-bold text-blue-700 mb-3">本轮交付结果</div>
                             <div className="text-[12px] space-y-1.5 leading-snug">
                                <div><span className="text-slate-500 font-medium">核心结论：</span> <span className="text-slate-800">华东直营渠道退款率上升是当前异常的主要原因</span></div>
                                <div><span className="text-slate-500 font-medium">输出产物：</span> <span className="text-slate-800">2 个图表 + 1 张明细表 + 1 份建议摘要</span></div>
                                <div><span className="text-slate-500 font-medium">当前是否需要操作：</span> <span className="text-slate-800">否</span></div>
                             </div>
                             <div className="mt-3 flex space-x-2">
                                <button className="px-3 py-1 text-[11px] font-medium text-slate-600 border border-slate-200 rounded hover:bg-slate-50">查看完整结果</button>
                                <button className="px-3 py-1 text-[11px] font-medium text-slate-600 border border-slate-200 rounded hover:bg-slate-50">导出报告</button>
                                <button className="px-3 py-1 text-[11px] font-medium text-blue-600 border border-blue-100 bg-blue-50 rounded hover:bg-blue-100">继续追问</button>
                             </div>
                          </div>
                       </div>

                       <div className="h-px bg-slate-100 w-full my-1"></div>

                       {/* Bottom Charts Row */}
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                            <div className="flex justify-between items-center mb-3">
                               <span className="text-[13px] font-bold text-slate-800">华东区域退款率趋势 (%)</span>
                               <div className="flex items-center space-x-2.5 text-[11px] font-medium text-slate-500">
                                  <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5 shadow-sm"></span>昨日</span>
                                  <span className="flex items-center"><span className="w-2.5 h-[2px] bg-slate-400 mr-1.5 border-dashed"></span>近7日均值</span>
                                  <span className="text-red-500 bg-red-50 px-1.5 rounded ml-1 font-bold">↑ 1.12 个百分点</span>
                               </div>
                            </div>
                            <div className="h-[140px] w-full">
                               <ResponsiveContainer width="100%" height="100%">
                                 <LineChart data={dataRefund}>
                                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                   <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} dy={10} />
                                   <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
                                   <Line type="monotone" dataKey="yesterday" stroke="#3B82F6" strokeWidth={2} dot={{r: 3, fill: '#3B82F6', strokeWidth: 0}} />
                                   <Line type="monotone" dataKey="avg7" stroke="#94A3B8" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                                 </LineChart>
                               </ResponsiveContainer>
                            </div>
                          </div>

                          <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                            <div className="flex justify-between items-center mb-3">
                               <span className="text-[13px] font-bold text-slate-800">支付成功率趋势 (%)</span>
                               <div className="flex items-center space-x-2.5 text-[11px] font-medium text-slate-500">
                                  <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5 shadow-sm"></span>昨日</span>
                                  <span className="flex items-center"><span className="w-2.5 h-[2px] bg-slate-400 mr-1.5 border-dashed"></span>近7日均值</span>
                                  <span className="text-emerald-500 bg-emerald-50 px-1.5 rounded ml-1 font-bold">↓ 2.83 个百分点</span>
                               </div>
                            </div>
                            <div className="h-[140px] w-full">
                               <ResponsiveContainer width="100%" height="100%">
                                 <LineChart data={dataSuccess}>
                                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                   <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} dy={10} />
                                   <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                                   <Line type="monotone" dataKey="yesterday" stroke="#3B82F6" strokeWidth={2} dot={{r: 3, fill: '#3B82F6', strokeWidth: 0}} />
                                   <Line type="monotone" dataKey="avg7" stroke="#94A3B8" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                                 </LineChart>
                               </ResponsiveContainer>
                            </div>
                          </div>
                       </div>

                    </div>
                 </div>
               </div>

           </div>

           {/* Input Box */}
           <div className="absolute bottom-4 justify-center w-full px-6 flex">
              <div className="w-full bg-white border border-blue-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-full p-1 pl-4 flex items-center focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <Paperclip className="w-5 h-5 text-slate-400 mr-2 cursor-pointer hover:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  className="flex-1 bg-transparent border-0 outline-none text-[14px] text-slate-800 placeholder:text-slate-400 h-10" 
                  placeholder="继续追问、补充条件，或让奥米追加分析..."
                />
                <button className="bg-blue-600 hover:bg-blue-700 w-28 text-white h-10 rounded-full text-[13px] font-semibold flex items-center justify-center shadow-lg shadow-blue-500/20 transition-all ml-2">
                   继续分析
                   <Send className="w-3.5 h-3.5 ml-1.5" />
                </button>
              </div>
           </div>

        </div>

        {/* Right Panel (Inspector) */}
        <div className="w-[280px] bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col shrink-0 overflow-y-auto hidden xl:flex">
           <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center text-[14px] font-bold text-slate-800">
                 <Search className="w-4 h-4 mr-1.5 text-indigo-600" />
                 执行真相
              </div>
              <AlertCircle className="w-4 h-4 text-slate-400" />
           </div>

           <div className="p-5 flex-1 flex flex-col space-y-7">
              
              {/* Box 1 */}
              <div>
                 <div className="text-[13px] font-bold text-slate-800 mb-3">任务概况</div>
                 <div className="space-y-2.5 text-[12px] text-slate-700">
                    <div className="flex justify-between font-medium">
                       <span className="text-slate-500">任务名称：</span>
                       <span>昨日订单异常归因</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-slate-500">当前轮次：</span>
                       <span>第 2 轮</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-slate-500">当前阶段：</span>
                       <span className="bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded font-medium">执行中</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-slate-500">预计完成：</span>
                       <span className="flex items-center text-blue-600 font-mono"><Clock className="w-3.5 h-3.5 mr-1" /> 00:03:24</span>
                    </div>
                 </div>
              </div>

              {/* Box 2 */}
              <div>
                 <div className="text-[13px] font-bold text-slate-800 mb-3">多智能体协作</div>
                 <div className="space-y-2.5 text-[12px] text-slate-700">
                    <div className="flex items-center justify-between font-medium">
                       <span className="truncate flex-1">奥米：<span className="text-slate-500 font-normal">任务主理与协调</span></span>
                       <span className="flex items-center text-emerald-600 ml-2 shrink-0"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>执行中</span>
                    </div>
                    <div className="flex items-center justify-between font-medium">
                       <span className="truncate flex-1">数据分析专员：<span className="text-slate-500 font-normal">数据处理与分析</span></span>
                       <span className="flex items-center text-emerald-600 ml-2 shrink-0"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>执行中</span>
                    </div>
                    <div className="flex items-center justify-between font-medium">
                       <span className="truncate flex-1">元数据专员：<span className="text-slate-500 font-normal">元数据检查与校验</span></span>
                       <span className="flex items-center text-slate-600 ml-2 shrink-0"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1" />已完成</span>
                    </div>
                    <div className="flex items-center justify-between font-medium">
                       <span className="truncate flex-1">质量专员：<span className="text-slate-500 font-normal">结果校验与质量评估</span></span>
                       <span className="flex items-center text-slate-400 ml-2 shrink-0"><span className="w-1.5 h-1.5 bg-slate-300 rounded-full mr-1.5"></span>待命</span>
                    </div>
                 </div>
              </div>

              {/* Box 3 */}
              <div>
                 <div className="text-[13px] font-bold text-slate-800 mb-3">工具调用</div>
                 <div className="space-y-2.5 text-[12px] font-mono text-slate-700">
                    <div className="flex items-center justify-between">
                       <span>SQL Query</span>
                       <span className="flex items-center text-emerald-600 font-sans font-medium"><CheckCircle2 className="w-3.5 h-3.5 mr-1" />成功</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <span>Schema Scan</span>
                       <span className="flex items-center text-emerald-600 font-sans font-medium"><CheckCircle2 className="w-3.5 h-3.5 mr-1" />成功</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <span>Anomaly Detector</span>
                       <span className="flex items-center text-blue-600 font-sans font-medium"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5 animate-pulse"></span>执行中</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <span>Metric Comparator</span>
                       <span className="flex items-center text-emerald-600 font-sans font-medium"><CheckCircle2 className="w-3.5 h-3.5 mr-1" />成功</span>
                    </div>
                 </div>
              </div>

              {/* Box 4 */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                 <div className="text-[12px] font-bold text-slate-800 mb-1">当前等待项</div>
                 <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>无阻塞，系统继续执行</span>
                    <div className="w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0">
                       <Check className="w-3 h-3" />
                    </div>
                 </div>
              </div>

              {/* Box 5 */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                 <div className="text-[12px] font-bold text-slate-800 mb-1">错误 / 重试</div>
                 <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>当前无错误</span>
                    <div className="w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0">
                       <Check className="w-3 h-3" />
                    </div>
                 </div>
              </div>

           </div>
        </div>

      </div>

      {/* Bottom Footer Action */}
      <div className="shrink-0 bg-blue-50/50 mt-4 -mx-4 border-t border-blue-100 px-8 py-3 flex items-center justify-between relative z-10 box-border">
         <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 shadow-md flex items-center justify-center shrink-0 transform -rotate-3 hover:rotate-0 transition-transform">
               <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
               <div className="text-[15px] font-bold text-slate-900 leading-tight">基于当前结果，继续推进下一步</div>
               <div className="text-[12px] text-slate-500 font-medium">你可以继续追问、导出结果，或将当前分析转为正式报告与任务记录。</div>
            </div>
         </div>
         <div className="flex space-x-3 text-[14px] font-semibold">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 h-10 rounded-lg flex items-center shadow-md shadow-blue-500/20 transition-all">
               <Play className="w-4 h-4 mr-1.5 fill-current" />继续分析
            </button>
            <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-5 h-10 rounded-lg flex items-center transition-all shadow-sm">
               <FileText className="w-4 h-4 mr-1.5 text-slate-400" />导出报告
            </button>
            <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-5 h-10 rounded-lg flex items-center transition-all shadow-sm">
               <BookOpen className="w-4 h-4 mr-1.5 text-slate-400" />查看执行记录
            </button>
         </div>
      </div>

    </div>
  );
}
