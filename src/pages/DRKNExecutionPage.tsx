import React, { useRef, useEffect } from 'react';
import { 
  Play, FileText, CheckCircle2, ChevronRight, 
  MapPin, User, Check, Clock, Search, BookOpen, AlertCircle, 
  Paperclip, Send, RefreshCcw, Bell, Activity, Database,
  Pause, Home, GitMerge, AlertTriangle, HelpCircle, AtSign, Smile, LayoutDashboard
} from 'lucide-react';

interface Props {
  onBack: () => void;
}

export function DRKNExecutionPage({ onBack }: Props) {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col pt-4 px-4 overflow-hidden bg-[#F7F8FA] font-sans">
      
      {/* Top Banner */}
      <div className="shrink-0 bg-white rounded-2xl p-4 px-5 shadow-sm border border-slate-200/60 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-4">
          <div className="w-[52px] h-[52px] rounded-full bg-slate-50 flex items-center justify-center text-3xl shrink-0 border border-slate-200/80 shadow-inner">
             🤖
          </div>
           <div>
            <div className="flex items-center space-x-3 mb-1.5">
               <h1 className="text-[18px] font-bold text-slate-900 tracking-tight flex items-center">
                 订单履约与异常归因场景包构建 (DRKN)
               </h1>
               <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[11px] font-semibold border border-blue-100 flex items-center shadow-sm"><Activity className="w-3 h-3 mr-1" /> 自动执行模式</span>
            </div>
            
            <div className="flex items-center space-x-4 text-[12px] text-slate-500 font-medium">
               <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1 text-slate-400" /> 销售分析组</span>
               <span className="flex items-center"><Database className="w-3.5 h-3.5 mr-1 text-slate-400" /> sales_domain</span>
               <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-slate-400" /> 近30天</span>
               <span className="flex items-center"><BookOpen className="w-3.5 h-3.5 mr-1 text-slate-400" /> DRKN 场景构建</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
           <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-1.5 rounded-lg text-[13px] font-semibold flex items-center transition-all shadow-sm">
              <Pause className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
              暂停执行
           </button>
           <button className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-4 py-1.5 rounded-lg text-[13px] font-semibold flex items-center transition-all shadow-sm">
              <FileText className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
              导出结果
           </button>
           <button onClick={onBack} className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-4 py-1.5 rounded-lg text-[13px] font-semibold flex items-center transition-all shadow-sm">
              <Home className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
              返回首页
           </button>
        </div>
      </div>

      {/* Main 3 Columns */}
      <div className="flex-1 flex gap-4 mt-4 overflow-hidden pb-4">
        
        {/* Left Panel */}
        <div className="w-[260px] bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col shrink-0 overflow-y-auto hidden lg:flex">
           <div className="p-5 flex-1 flex flex-col">
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                   <div className="text-[13px] text-slate-800 font-bold">当前任务</div>
                   <ChevronRight className="w-4 h-4 text-slate-400 transform rotate-90" />
                </div>
                <div className="text-[14px] font-semibold text-slate-900 leading-snug mb-2">构建销售业务<br/>领域知识网络 (BKN → DRKN)</div>
                <div className="text-[11px] text-slate-400 font-mono space-y-0.5">
                   <div>任务ID: task_drkn_20250711_024</div>
                   <div>创建时间: 2025-07-11 09:12:05</div>
                </div>
              </div>
              
              <div className="h-px bg-slate-100 mb-5"></div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2 text-[12px]">
                   <span className="font-bold text-slate-800">构建进度</span>
                   <span className="text-slate-500 font-medium"><span className="text-blue-600 font-bold">3</span> / 5 阶段</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-600 rounded-full w-3/5"></div>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-[13px] text-slate-800 font-bold mb-4">执行阶段</div>
                <div className="space-y-4 relative text-[12px]">
                   <div className="absolute top-2 bottom-2 left-[7.5px] w-0.5 bg-slate-100 z-0"></div>
                   
                   <div className="flex items-center justify-between relative z-10">
                     <div className="flex items-center space-x-3">
                       <CheckCircle2 className="w-4 h-4 text-emerald-500 bg-white" />
                       <span className="font-medium text-slate-700">元数据接入与扫描</span>
                     </div>
                     <span className="text-[11px] text-emerald-500">已完成</span>
                   </div>

                   <div className="flex items-center justify-between relative z-10">
                     <div className="flex items-center space-x-3">
                       <CheckCircle2 className="w-4 h-4 text-emerald-500 bg-white" />
                       <span className="font-medium text-slate-700">对象候选提取</span>
                     </div>
                     <span className="text-[11px] text-emerald-500">已完成</span>
                   </div>

                   <div className="flex items-center justify-between relative z-10">
                     <div className="flex items-center space-x-3">
                       <div className="w-4 h-4 rounded-full border-[3px] border-blue-100 bg-blue-600 shadow-sm relative z-10 ring-2 ring-white"></div>
                       <span className="font-bold text-blue-700">语义理解与映射匹配</span>
                     </div>
                     <span className="text-[11px] text-blue-600 font-medium">执行中</span>
                   </div>

                   <div className="flex items-center justify-between relative z-10">
                     <div className="flex items-center space-x-3">
                       <div className="w-4 h-4 rounded-full border-2 border-slate-200 bg-white relative z-10"></div>
                       <span className="font-medium text-slate-500">领域建模 (关系绑定)</span>
                     </div>
                     <span className="text-[11px] text-slate-400">待执行</span>
                   </div>

                   <div className="flex items-center justify-between relative z-10">
                     <div className="flex items-center space-x-3">
                       <div className="w-4 h-4 rounded-full border-2 border-slate-200 bg-white relative z-10"></div>
                       <span className="font-medium text-slate-500">全局质量校验</span>
                     </div>
                     <span className="text-[11px] text-slate-400">待执行</span>
                   </div>
                </div>
              </div>
              
              <div className="h-px bg-slate-100 mb-5"></div>

              <div className="flex-1 overflow-y-auto pr-1 -mr-2">
                 <div className="flex items-center justify-between mb-3 text-[13px] text-slate-800 font-bold sticky top-0 bg-white py-1">
                    分流队列 (待处理)
                    <ChevronRight className="w-4 h-4 text-slate-400 transform rotate-[-90deg]" />
                 </div>
                 
                 <div className="space-y-2 text-[12px]">
                    <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition">
                       <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_4px_rgba(245,158,11,0.5)]"></span>
                          <span className="font-medium text-slate-700">NEEDS_CONFIRM</span>
                       </div>
                       <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-[10px]">2</span>
                    </div>

                    <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition">
                       <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-red-500"></span>
                          <span className="font-medium text-slate-700">CONFLICT</span>
                       </div>
                       <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-[10px]">1</span>
                    </div>

                    <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition">
                       <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                          <span className="font-medium text-slate-700">UNKNOWN_FIELD</span>
                       </div>
                       <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px]">3</span>
                    </div>

                    <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition">
                       <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                          <span className="font-medium text-slate-700">IGNORE_CANDIDATE</span>
                       </div>
                       <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-[10px]">5</span>
                    </div>

                    <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition">
                       <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span className="font-medium text-slate-700">AUTO_PASS</span>
                       </div>
                       <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px]">18</span>
                    </div>
                 </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-2">
                 <button className="w-full py-2 bg-white border border-blue-200 text-blue-600 text-[12px] font-semibold rounded-lg hover:bg-blue-50 transition">
                   查看全部任务
                 </button>
              </div>

           </div>
        </div>

        {/* Center Panel */}
        <div className="flex-1 flex flex-col relative w-full overflow-hidden bg-white rounded-2xl border border-slate-200/60 shadow-sm">
           
           {/* Top Alert Banner */}
           <div className="shrink-0 p-4 pb-0 z-10 w-full max-w-[95%] mx-auto mt-2">
              <div className="bg-[#F8F6FF] border border-[#E9E1FF] rounded-xl p-4 flex items-center shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-white/50 to-transparent pointer-events-none z-0"></div>
                 
                 <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200 text-lg shadow-sm overflow-hidden mr-4 relative z-10">
                    <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Omi&backgroundColor=f8fafc" className="w-full h-full" alt="omi"/>
                 </div>
                 
                 <div className="relative z-10 flex flex-col justify-center flex-1 pr-6 border-r border-[#E9E1FF] mr-6">
                    <h2 className="text-[20px] font-bold text-slate-900 mb-1 leading-none tracking-tight">奥米正在推进 你的 DRKN 构建任务</h2>
                    <p className="text-[12px] text-slate-500 font-medium">围绕当前任务持续理解、执行、交付结果，并在关键节点向你同步进度与待确认事项。</p>
                 </div>
                 
                 <div className="relative z-10 flex items-center space-x-12 shrink-0 text-[13px] mr-12">
                    <div className="flex flex-col text-left">
                       <span className="text-slate-400 font-medium">任务名称</span>
                       <span className="font-bold mt-1 text-[12px] text-slate-800">构建销售业务领域知识网络<br/>(BKN → DRKN)</span>
                    </div>
                    <div className="flex flex-col text-left">
                       <span className="text-slate-400 font-medium">当前模式</span>
                       <span className="font-bold flex items-center mt-3"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>自动执行</span>
                    </div>
                    <div className="flex flex-col text-left">
                       <span className="text-slate-400 font-medium">当前状态</span>
                       <span className="font-bold text-blue-600 flex items-center mt-3"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5 animate-pulse"></span>执行中</span>
                    </div>
                    <div className="flex flex-col text-left">
                       <span className="text-slate-400 font-medium">当前轮次</span>
                       <span className="font-bold mt-3 text-[14px]">第 3 轮</span>
                    </div>
                 </div>

                 <div className="relative z-10 flex flex-col justify-center gap-2 shrink-0 w-[140px]">
                    <button className="w-full bg-[#0052FF] hover:bg-blue-700 text-white py-1.5 rounded-lg text-[13px] font-bold flex items-center justify-center shadow-md transition-all">
                       <Play className="w-3.5 h-3.5 mr-1.5 fill-current" /> 继续构建
                    </button>
                    <button className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 py-1.5 rounded-lg text-[13px] font-bold flex items-center justify-center transition-all shadow-sm">
                       查看完整结果
                    </button>
                 </div>
                 
              </div>
           </div>

           {/* Chat Flow */}
           <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 pb-[100px]" ref={chatRef}>
             
               <div className="text-[14px] font-bold text-slate-800 mb-6 sticky top-0 bg-white/90 backdrop-blur-md py-2 border-b border-slate-100 z-10">任务对话</div>

               {/* Bot Msg 1 */}
               <div className="flex items-start max-w-[95%] space-x-3">
                 <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200 mt-1 text-lg shadow-sm overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Omi&backgroundColor=f8fafc" className="w-full h-full" alt="omi"/>
                 </div>
                 <div className="flex-1 flex flex-col space-y-4">
                    
                    <div className="flex">
                       <div className="text-[13px] text-slate-700 leading-relaxed bg-slate-50 border border-slate-200/60 px-4 py-2.5 rounded-2xl rounded-tl-sm shadow-sm flex items-center">
                          我正在对扫描结果进行语义理解，识别业务术语、标准术语和指标含义，并建立同义词与上下位关系。
                          <span className="text-[11px] text-slate-400 font-normal ml-3">09:15</span>
                       </div>
                    </div>

                    {/* Progress Card 1 */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 w-full max-w-[650px] flex items-center gap-8 relative overflow-hidden">
                       <div className="absolute top-3 right-4 text-[10px] text-slate-400 font-medium tracking-wide">09:16</div>
                       
                       <div className="flex flex-col items-center justify-center shrink-0 w-28">
                          <div className="text-[13px] font-bold text-slate-800 mb-4 w-full text-center">语义理解进度</div>
                          <div className="relative w-[88px] h-[88px] flex items-center justify-center text-center">
                             <svg className="w-full h-full transform -rotate-90">
                                <circle cx="44" cy="44" r="38" stroke="currentColor" strokeWidth="7" fill="transparent" className="text-slate-100" />
                                <circle cx="44" cy="44" r="38" stroke="currentColor" strokeWidth="7" fill="transparent" strokeDasharray="238.7" strokeDashoffset={238.7 * (1 - 0.86)} className="text-blue-600 transition-all duration-1000 ease-in-out" />
                             </svg>
                             <div className="absolute inset-0 flex flex-col justify-center items-center">
                                <span className="text-[22px] font-extrabold text-blue-700 -mb-1 font-mono tracking-tighter hover:scale-110 cursor-pointer transition-transform">86%</span>
                                <span className="text-[9px] text-slate-400 font-medium uppercase tracking-widest mt-1">识别完成度</span>
                             </div>
                          </div>
                       </div>

                       <div className="w-px h-32 bg-slate-100"></div>

                       <div className="flex flex-col flex-1 text-[12px] pr-2">
                          <div className="flex items-center justify-between mb-4">
                             <div className="flex items-center text-slate-600 font-medium"><LayoutDashboard className="w-4 h-4 text-emerald-500 mr-2.5" /> 术语识别</div>
                             <div className="text-slate-800 font-bold font-mono text-[14px]">1,248 <span className="text-slate-400 font-medium font-sans text-[12px]">/ 1,450</span></div>
                          </div>
                          <div className="flex items-center justify-between mb-4">
                             <div className="flex items-center text-slate-600 font-medium"><Activity className="w-4 h-4 text-emerald-500 mr-2.5" /> 指标识别</div>
                             <div className="text-slate-800 font-bold font-mono text-[14px]">276 <span className="text-slate-400 font-medium font-sans text-[12px]">/ 320</span></div>
                          </div>
                          <div className="flex items-center justify-between">
                             <div className="flex items-center text-slate-600 font-medium"><GitMerge className="w-4 h-4 text-blue-500 mr-2.5" /> 关系识别</div>
                             <div className="text-slate-800 font-bold font-mono text-[14px]">532 <span className="text-slate-400 font-medium font-sans text-[12px]">/ 680</span></div>
                          </div>
                       </div>
                       
                       <div className="w-px h-32 bg-slate-100"></div>

                       <div className="flex flex-col flex-1 pl-1">
                          <div className="flex items-center justify-between mb-2.5">
                             <div className="text-[13px] font-bold text-slate-800 flex items-center">
                                <Sparkles className="w-4 h-4 text-amber-500 mr-1.5" />
                                最新识别术语
                             </div>
                          </div>
                          <ul className="text-[12px] text-slate-600 space-y-2 list-disc pl-4 marker:text-slate-300">
                             <li className="pl-1">客户生命周期价值 (CLV)</li>
                             <li className="pl-1">复购率</li>
                             <li className="pl-1 text-slate-400">客单价</li>
                             <li className="pl-1 text-slate-400">订单履约时效</li>
                          </ul>
                          <div className="text-[11px] text-blue-600 hover:text-blue-700 cursor-pointer mt-3 flex items-center font-medium bg-blue-50/50 w-fit px-2 py-1 rounded transition-colors">查看更多 <ChevronRight className="w-3 h-3 ml-0.5" /></div>
                       </div>
                    </div>
                 </div>
               </div>

               {/* Bot Msg 2 */}
               <div className="flex items-start max-w-[95%] space-x-3 mt-4">
                 <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200 mt-1 text-lg shadow-sm overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Omi&backgroundColor=f8fafc" className="w-full h-full" alt="omi"/>
                 </div>
                 <div className="flex-1 flex flex-col space-y-3">
                    <div className="flex">
                       <div className="text-[13px] text-slate-700 leading-relaxed bg-slate-50 border border-slate-200/60 px-4 py-2.5 rounded-2xl rounded-tl-sm shadow-sm flex items-center">
                          已完成语义理解，发现 1,248 个业务术语、276 个指标和 532 条业务关系。是否基于当前结果生成业务对象？
                       </div>
                    </div>
                    <div className="flex space-x-2.5">
                       <button className="px-5 py-2.5 text-[13px] font-bold text-white bg-blue-600 rounded-lg shadow-sm shadow-blue-500/20 hover:bg-blue-700 transition flex items-center">
                          <Play className="w-3.5 h-3.5 mr-1" /> 开始生成业务对象
                       </button>
                       <button className="px-5 py-2.5 text-[13px] font-medium text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition">调整识别规则</button>
                       <button className="px-5 py-2.5 text-[13px] font-medium text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition">查看识别详情</button>
                    </div>
                 </div>
               </div>

               {/* User Msg */}
               <div className="flex justify-end w-full pt-4">
                 <div className="flex items-start max-w-[85%] space-x-3">
                   <div className="flex flex-col items-end space-y-1">
                     <span className="text-[11px] text-slate-400">09:16</span>
                     <div className="bg-[#E5EDFF] text-[#1E3A8A] px-5 py-3 rounded-2xl rounded-tr-sm text-[13px] leading-relaxed shadow-sm">
                       开始生成业务对象
                     </div>
                   </div>
                   <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e2e8f0" 
                        className="w-9 h-9 rounded-full border border-slate-200 shrink-0 mt-3 shadow-sm" alt="user" />
                 </div>
               </div>
               
               {/* Bot Msg 3 */}
               <div className="flex items-start max-w-[95%] space-x-3">
                 <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200 mt-1 text-lg shadow-sm overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Omi&backgroundColor=f8fafc" className="w-full h-full" alt="omi"/>
                 </div>
                 <div className="flex-1 flex flex-col space-y-4">
                    
                    <div className="flex">
                       <div className="text-[13px] text-slate-700 leading-relaxed bg-slate-50 border border-slate-200/60 px-4 py-2.5 rounded-2xl rounded-tl-sm shadow-sm flex items-center">
                          好的，我将基于识别结果生成业务对象，并建立对象之间的关联关系...
                       </div>
                    </div>

                    {/* Progress Card 2 (Stepper) */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 w-full max-w-[650px] relative overflow-hidden">
                       <div className="text-[13px] font-bold text-slate-800 mb-6 flex items-center"><Activity className="w-4 h-4 text-blue-600 mr-2" /> 业务对象生成进度</div>
                       
                       <div className="relative flex justify-between items-center w-full px-6 mb-8 text-[12px]">
                          <div className="absolute top-[10px] left-8 right-8 h-px bg-slate-100 z-0"></div>
                          <div className="absolute top-[10px] left-8 w-[12%] h-[2px] bg-blue-600 z-0"></div>
                          
                          <div className="relative z-10 flex flex-col items-center gap-2 text-blue-600">
                             <div className="bg-white p-0.5 rounded-full"><CheckCircle2 className="w-5 h-5 fill-blue-50" /></div>
                             <span className="font-bold -ml-1 whitespace-nowrap">对象抽取</span>
                          </div>
                          <div className="relative z-10 flex flex-col items-center gap-2 text-slate-400">
                             <div className="w-5 h-5 rounded-full border-2 border-slate-200 bg-white shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5">2</div>
                             <span className="font-medium whitespace-nowrap">对象去重</span>
                          </div>
                          <div className="relative z-10 flex flex-col items-center gap-2 text-slate-400">
                             <div className="w-5 h-5 rounded-full border-2 border-slate-200 bg-white shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5">3</div>
                             <span className="font-medium whitespace-nowrap">对象标准化</span>
                          </div>
                          <div className="relative z-10 flex flex-col items-center gap-2 text-slate-400">
                             <div className="w-5 h-5 rounded-full border-2 border-slate-200 bg-white shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5">4</div>
                             <span className="font-medium whitespace-nowrap">建立关联关系</span>
                          </div>
                          <div className="relative z-10 flex flex-col items-center gap-2 text-slate-400">
                             <div className="w-5 h-5 rounded-full border-2 border-slate-200 bg-white shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5">5</div>
                             <span className="font-medium whitespace-nowrap">质量校验</span>
                          </div>
                          <div className="relative z-10 flex flex-col items-center gap-2 text-slate-400">
                             <div className="w-5 h-5 rounded-full border-2 border-slate-200 bg-white shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5">6</div>
                             <span className="font-medium whitespace-nowrap -mr-1">完成</span>
                          </div>
                       </div>

                       <div className="flex justify-between items-center bg-[#F8FAFC] px-5 py-3.5 rounded-xl border border-slate-100">
                          <div className="flex items-center space-x-10">
                             <div>
                                <div className="text-[11px] text-slate-500 mb-1 font-medium tracking-wide">已抽取对象</div>
                                <div className="text-[15px] font-bold font-mono text-blue-600">156 <span className="text-[11px] text-slate-400 font-sans font-medium mix-blend-multiply">/ 预计 320+</span></div>
                             </div>
                             <div className="w-px h-8 bg-slate-200/60"></div>
                             <div>
                                <div className="text-[11px] text-slate-500 mb-1 font-medium tracking-wide">关系建立</div>
                                <div className="text-[15px] font-bold font-mono text-slate-800">0 <span className="text-[11px] text-slate-400 font-sans font-medium mix-blend-multiply">/ 预计 680+</span></div>
                             </div>
                             <div className="w-px h-8 bg-slate-200/60"></div>
                             <div>
                                <div className="text-[11px] text-slate-500 mb-1 font-medium tracking-wide">预计剩余时间</div>
                                <div className="text-[13px] font-bold text-slate-800 font-mono">约 3 分钟</div>
                             </div>
                          </div>
                          <button className="px-4 py-1.5 border border-red-200 text-red-500 bg-white hover:bg-red-50 hover:border-red-300 text-[12px] font-bold rounded shadow-sm transition">取消生成</button>
                       </div>
                    </div>

                    {/* Result Preview Card */}
                    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100 p-5 w-full max-w-[650px] mt-2">
                       <div className="text-[14px] font-bold text-slate-800 mb-4 flex items-center justify-between">
                          <span className="flex items-center">本轮交付结果 <span className="text-blue-600 font-medium bg-blue-50 px-1.5 py-0.5 rounded ml-2 text-[10px]">预览</span></span>
                       </div>
                       
                       <div className="flex bg-[#F8FAFC] border border-slate-100/80 rounded-xl overflow-hidden divide-x divide-slate-100">
                          <div className="p-4 flex-1">
                             <div className="text-[11px] text-slate-500 mb-2 font-medium tracking-wide">核心结论</div>
                             <div className="text-[12px] text-slate-800 leading-relaxed font-medium">
                                当前正在生成业务对象...
                             </div>
                          </div>
                          <div className="p-4 flex-[1.5]">
                             <div className="text-[11px] text-slate-500 mb-3 font-medium tracking-wide">输出产物</div>
                             <div className="flex justify-between items-center px-1">
                                <div className="flex flex-col items-center">
                                   <div className="w-8 h-8 flex justify-center items-center bg-slate-100 text-slate-600 rounded-lg mb-1.5"><BookOpen className="w-4 h-4" /></div>
                                   <span className="text-[10px] text-slate-500 mb-0.5">术语</span>
                                   <span className="text-[15px] font-bold text-slate-800 font-mono">1,248</span>
                                </div>
                                <div className="flex flex-col items-center">
                                   <div className="w-8 h-8 flex justify-center items-center bg-slate-100 text-slate-600 rounded-lg mb-1.5"><Activity className="w-4 h-4" /></div>
                                   <span className="text-[10px] text-slate-500 mb-0.5">指标</span>
                                   <span className="text-[15px] font-bold text-slate-800 font-mono">276</span>
                                </div>
                                <div className="flex flex-col items-center">
                                   <div className="w-8 h-8 flex justify-center items-center bg-slate-100 text-slate-600 rounded-lg mb-1.5"><GitMerge className="w-4 h-4 transform rotate-90" /></div>
                                   <span className="text-[10px] text-slate-500 mb-0.5">关系</span>
                                   <span className="text-[15px] font-bold text-slate-800 font-mono">532</span>
                                </div>
                                <div className="flex flex-col items-center relative">
                                   <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full border border-white animate-pulse"></div>
                                   <div className="w-8 h-8 flex justify-center items-center bg-blue-50 text-blue-600 rounded-lg mb-1.5"><Database className="w-4 h-4" /></div>
                                   <span className="text-[10px] text-slate-500 mb-0.5">对象候选</span>
                                   <span className="text-[15px] font-bold text-blue-600 font-mono animate-pulse">156<span className="text-[11px]">+</span></span>
                                </div>
                             </div>
                          </div>
                       </div>
                       
                       <div className="flex justify-end items-center space-x-3 mt-4 pt-4 border-t border-slate-100">
                          <button className="px-5 py-2 text-[12px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-transparent rounded-lg shadow-sm transition">查看阶段结果</button>
                       </div>
                    </div>

                 </div>
               </div>

           </div>

           {/* Input Box Footer */}
           <div className="absolute bottom-0 left-0 w-full bg-white px-2 pb-2">
              <div className="w-full bg-[#f4f4f5] rounded-xl flex items-center pr-2 focus-within:ring-2 focus-within:ring-white focus-within:shadow-[0_0_0_2px_#3b82f6] transition-all">
                <div className="pl-3 py-3 shrink-0"><Paperclip className="w-4 h-4 text-slate-400 rotate-45" /></div>
                <input 
                  type="text" 
                  className="flex-1 bg-transparent border-0 outline-none text-[13px] text-slate-800 placeholder:text-slate-400 px-2 h-11" 
                  placeholder="请输入您的问题或指令，支持 @选择知识库、#添加标签、/快捷命令"
                />
                <div className="flex items-center space-x-4 pr-1 shrink-0">
                   <div className="w-4 h-4 flex flex-col justify-between shrink-0 opacity-50 cursor-pointer hover:opacity-100">
                      <div className="w-full h-0.5 bg-slate-600 rounded-full"></div>
                      <div className="w-full h-0.5 bg-slate-600 rounded-full"></div>
                      <div className="w-full h-0.5 bg-slate-600 rounded-full"></div>
                   </div>
                   <button className="bg-blue-600 hover:bg-blue-700 w-8 h-8 rounded text-white flex items-center justify-center transition-all shrink-0">
                      <Send className="w-4 h-4 ml-0.5" />
                   </button>
                </div>
              </div>
           </div>

        </div>

        {/* Right Panel (Inspector) */}
        <div className="w-[300px] bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col shrink-0 overflow-y-auto hidden xl:flex">
           <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center text-[15px] font-bold text-slate-800">
                 <FileText className="w-4 h-4 mr-1.5 text-blue-600" />执行真相
              </div>
           </div>

           <div className="p-5 flex-1 flex flex-col space-y-6 pb-8">
              
              {/* Box 1 */}
              <div>
                 <div className="flex items-center justify-between mb-4 cursor-pointer">
                    <div className="flex items-center text-[13px] font-bold text-slate-800"><Activity className="w-4 h-4 mr-1.5 text-slate-500" />任务概况</div>
                    <ChevronRight className="w-4 h-4 text-slate-400 transform -rotate-90" />
                 </div>
                 <div className="space-y-3 text-[12px] text-slate-700">
                    <div className="flex justify-between">
                       <span className="text-slate-500">任务名称:</span>
                       <span className="font-medium">构建销售业务领域网络 (BKN→DRKN)</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-slate-500">当前轮次:</span>
                       <span className="font-medium text-slate-800">第 3 轮</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-slate-500">当前阶段:</span>
                       <span className="font-medium text-slate-800">语义理解 (3/5)</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-slate-500">预计完成:</span>
                       <span className="text-slate-800 font-mono">约 00:05:30</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-slate-500">执行时长:</span>
                       <span className="text-slate-800 font-mono">00:07:24</span>
                    </div>
                 </div>
              </div>
              
              <div className="w-full h-px bg-slate-100"></div>

              {/* Box 2 */}
              <div>
                 <div className="flex items-center justify-between mb-4 cursor-pointer">
                    <div className="flex items-center text-[13px] font-bold text-slate-800"><CheckCircle2 className="w-4 h-4 mr-1.5 text-blue-500" />多智能体协作</div>
                    <ChevronRight className="w-4 h-4 text-slate-400 transform -rotate-90" />
                 </div>
                 <div className="space-y-3 text-[12px] text-slate-700">
                    <div className="flex items-center justify-between font-medium">
                       <div className="flex items-center space-x-2"><span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><Check className="w-2.5 h-2.5" /></span><span className="flex items-center">奥米 <span className="text-slate-400 font-normal ml-1">(任务协调)</span></span></div>
                       <span className="text-emerald-600 font-bold">执行中</span>
                    </div>
                    <div className="flex items-center justify-between font-medium">
                       <div className="flex items-center space-x-2"><span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><Check className="w-2.5 h-2.5" /></span><span className="flex items-center">数据分析专员 <span className="text-slate-400 font-normal ml-1">(扫描分析)</span></span></div>
                       <span className="text-emerald-600">已完成</span>
                    </div>
                    <div className="flex items-center justify-between font-medium">
                       <div className="flex items-center space-x-2"><span className="flex w-4 h-4 rounded-full text-blue-500 items-center justify-center border border-blue-500 bg-white shadow-[0_0_0_2px_#EFF6FF]"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span></span><span className="flex items-center font-bold text-blue-700">语义理解专员 <span className="text-slate-400 font-normal ml-1">(语义识别)</span></span></div>
                       <span className="text-blue-600 font-bold">执行中</span>
                    </div>
                    <div className="flex items-center justify-between font-medium text-slate-400">
                       <div className="flex items-center space-x-2"><span className="w-4 h-4 bg-slate-50 border-2 border-slate-200 rounded-full flex items-center justify-center"></span><span className="flex items-center">建模专员 <span className="text-slate-400 font-normal ml-1">(对象建模)</span></span></div>
                       <span className="text-slate-400">待命</span>
                    </div>
                    <div className="flex items-center justify-between font-medium text-slate-400">
                       <div className="flex items-center space-x-2"><span className="w-4 h-4 bg-slate-50 border-2 border-slate-200 rounded-full flex items-center justify-center"></span><span className="flex items-center">质检专员 <span className="text-slate-400 font-normal ml-1">(质量校验)</span></span></div>
                       <span className="text-slate-400">待命</span>
                    </div>
                 </div>
              </div>
              
              <div className="w-full h-px bg-slate-100"></div>

              {/* Box 3 */}
              <div>
                 <div className="flex items-center justify-between mb-4 cursor-pointer">
                    <div className="flex items-center text-[13px] font-bold text-slate-800"><MapPin className="w-4 h-4 mr-1.5 text-slate-500" />工具调用</div>
                    <ChevronRight className="w-4 h-4 text-slate-400 transform -rotate-90" />
                 </div>
                 <div className="space-y-3 text-[12px] text-slate-700">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center text-slate-700">数据源连接器</div>
                       <div className="flex items-center space-x-3 w-24 justify-end">
                          <span className="text-emerald-600 font-sans font-medium">成功</span>
                          <span className="text-slate-400 font-mono text-[11px]">09:12:05</span>
                       </div>
                    </div>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center text-slate-700">元数据扫描器</div>
                       <div className="flex items-center space-x-3 w-24 justify-end">
                          <span className="text-emerald-600 font-sans font-medium">成功</span>
                          <span className="text-slate-400 font-mono text-[11px]">09:12:18</span>
                       </div>
                    </div>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center font-semibold text-blue-700">语义识别引擎</div>
                       <div className="flex items-center space-x-3 w-24 justify-end">
                          <span className="text-blue-600 font-sans font-bold">执行中</span>
                          <span className="text-blue-400 font-mono text-[11px]">09:15:02</span>
                       </div>
                    </div>
                    <div className="flex items-center justify-between opacity-80">
                       <div className="flex items-center text-slate-700">同义词挖掘器</div>
                       <div className="flex items-center space-x-3 w-24 justify-end">
                          <span className="text-emerald-600 font-sans font-medium">成功</span>
                          <span className="text-slate-400 font-mono text-[11px]">09:15:35</span>
                       </div>
                    </div>
                    <div className="flex items-center justify-between opacity-60">
                       <div className="flex items-center text-slate-500">关系抽取引擎</div>
                       <div className="flex items-center space-x-3 w-24 justify-end">
                          <span className="text-slate-400 font-sans">待执行</span>
                          <span className="text-slate-300 font-mono text-[11px]">-</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="w-full h-px bg-slate-100"></div>
              
              {/* Box 4 */}
              <div>
                 <div className="flex items-center justify-between mb-4 cursor-pointer">
                    <div className="flex items-center text-[13px] font-bold text-slate-800"><BookOpen className="w-4 h-4 mr-1.5 text-blue-500" />关键指标</div>
                    <ChevronRight className="w-4 h-4 text-slate-400 transform -rotate-90" />
                 </div>
                 
                 <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                       <span className="text-[11px] text-slate-500 mb-0.5">已识别术语</span>
                       <span className="text-[15px] font-bold font-mono text-blue-700">1,248</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[11px] text-slate-500 mb-0.5">已识别指标</span>
                       <span className="text-[15px] font-bold font-mono text-blue-700">276</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[11px] text-slate-500 mb-0.5">识别准确率</span>
                       <span className="text-[15px] font-bold font-mono text-blue-700">92.3%</span>
                    </div>
                 </div>
              </div>

              <div className="w-full h-px bg-slate-100"></div>

              {/* Box 5 */}
              <div>
                 <div className="flex items-center justify-between mb-2 cursor-pointer">
                    <div className="flex items-center text-[13px] font-bold text-slate-800"><AlertCircle className="w-4 h-4 mr-1.5 text-slate-500" />当前等待项</div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                 </div>
                 <div className="text-[12px] text-slate-500 py-1 font-medium">无阻塞，系统继续执行</div>
              </div>

              <div className="w-full h-px bg-slate-100"></div>

              {/* Box 6 */}
              <div>
                 <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-[13px] font-bold text-slate-800"><RefreshCcw className="w-4 h-4 mr-1.5 text-slate-500" />错误 / 重试</div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                 </div>
                 <div className="text-[12px] text-slate-500 py-1 font-medium">当前无错误</div>
              </div>

           </div>
        </div>

      </div>
    </div>
  );
}
