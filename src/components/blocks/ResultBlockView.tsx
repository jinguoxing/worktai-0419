import React from 'react';
import { ResultBlock, ResultItem } from '../../types';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from 'recharts';
import { Database, FileLineChart, Table2, Play, Download, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { KnowledgeGraphView } from './KnowledgeGraphView';

export function ResultBlockView({ block, isActive }: { block: ResultBlock; isActive: boolean }) {
  return (
    <div className={cn(
      "w-full rounded-xl border bg-white transition-all overflow-hidden shadow-sm",
      isActive ? "border-blue-400 ring-4 ring-blue-500/5 shadow-md shadow-blue-500/5" : "border-slate-200 hover:border-slate-300 hover:shadow-md"
    )}>
      <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>执行结果</span>
        </div>
        <span className="text-[10px] text-slate-500">{block.timestamp}</span>
      </div>

      <div className="p-1 space-y-1">
        {block.items.map((item) => (
          <div key={item.id}>
            <ResultItemRenderer item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultItemRenderer({ item }: { item: ResultItem }) {
  switch (item.type) {
    case 'knowledge_graph':
      return <KnowledgeGraphView data={item.content} />;
    case 'sql':
      return (
        <div className="group rounded-lg border border-slate-200 bg-white overflow-hidden m-2 shadow-sm">
          <div className="flex items-center justify-between bg-slate-50 px-3 py-1.5 border-b border-slate-200">
            <span className="text-[10px] font-mono text-slate-600 flex items-center">
              <Database className="w-3 h-3 mr-1" /> SQL 查询
            </span>
            <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="px-2 py-0.5 text-[10px] bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 text-slate-700 rounded flex items-center shadow-sm">
                <Play className="w-3 h-3 mr-1 text-slate-500" /> 运行
              </button>
            </div>
          </div>
          <div className="p-4 overflow-x-auto bg-slate-50/50">
            <pre className="text-xs font-mono text-emerald-700 leading-relaxed">
              {item.content}
            </pre>
          </div>
        </div>
      );

    case 'chart':
      return (
        <div className="rounded-lg border border-slate-200 bg-white shadow-sm p-4 m-2">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-slate-800 flex items-center">
              <FileLineChart className="w-4 h-4 text-blue-600 mr-2" />
              销售与订单趋势
            </h4>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={item.content}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px', color: '#0f172a', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a' }}
                />
                <Area yAxisId="left" type="monotone" dataKey="sales" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSales)" strokeWidth={2} />
                <Area yAxisId="right" type="monotone" dataKey="orders" stroke="#10b981" fillOpacity={1} fill="url(#colorOrders)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      );

    case 'table':
      return (
        <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm m-2">
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 bg-slate-50">
            <span className="text-[10px] font-mono text-slate-600 flex items-center">
              <Table2 className="w-3 h-3 mr-1 text-slate-400" /> 数据预览 (Top 10)
            </span>
            <button className="text-[10px] text-slate-500 hover:text-slate-800 transition-colors flex items-center bg-white border border-slate-200 rounded px-2 py-0.5 shadow-sm">
              <Download className="w-3 h-3 mr-1" /> 导出
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-medium">
                <tr>
                  {Object.keys(item.content[0]).map(k => (
                    <th key={k} className="px-4 py-2 border-b border-slate-200">{k}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-slate-700 divide-y divide-slate-100">
                {item.content.map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    {Object.values(row).map((v: any, j: number) => (
                      <td key={j} className="px-4 py-2 whitespace-nowrap">
                        {v === 'Refunded' || v === 'Failed' ? (
                          <span className="text-red-700 px-1.5 py-0.5 bg-red-50 border border-red-100 rounded">{v as string}</span>
                        ) : (
                          v as string
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case 'markdown':
      return (
        <div className="p-4 m-2 text-slate-800 text-sm leading-relaxed prose-slate prose max-w-none">
          <div dangerouslySetInnerHTML={{ 
            __html: item.content
              .replace(/### (.*)/g, '<h3 class="text-lg font-semibold text-slate-900 mb-3 mt-4">$1</h3>')
              .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-blue-700 font-medium">$1</strong>')
              .replace(/1\. (.*)/g, '<div class="mt-2 text-slate-800 tracking-wide border-l-[3px] border-blue-500 pl-3 py-1 bg-blue-50/50 rounded-r-sm">$1</div>')
              .replace(/2\. (.*)/g, '<div class="mt-4 text-slate-800 tracking-wide border-l-[3px] border-blue-500 pl-3 py-1 bg-blue-50/50 rounded-r-sm">$1</div>')
              .replace(/- \`([^\`]+)\`/g, '- <code class="px-1.5 py-0.5 mx-0.5 bg-slate-100 border border-slate-200 text-pink-600 rounded text-xs font-mono">$1</code>')
              .replace(/\`([^\`]+)\`/g, '<code class="px-1.5 py-0.5 mx-0.5 bg-slate-100 border border-slate-200 text-pink-600 rounded text-xs font-mono">$1</code>')
              .replace(/- (.*)/g, '<li class="ml-6 list-disc mb-1 marker:text-slate-400">$1</li>')
              .replace(/\n\n/g, '<br/>')
          }} />
        </div>
      );

    case 'suggested_actions':
      return (
        <div className="p-4 m-2 border-t border-slate-200 mt-4 bg-slate-50/50 rounded-b-lg">
          <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-3 font-semibold">建议跟进动作</div>
          <div className="flex flex-wrap gap-2">
            {item.content.map((action: string, i: number) => (
              <button key={i} className="text-xs text-slate-700 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 px-3 py-1.5 rounded-md border border-slate-200 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                {action}
              </button>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}
