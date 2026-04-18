import React, { useEffect, useRef, useState } from 'react';
import { Network } from 'lucide-react';
import { motion } from 'motion/react';

export function KnowledgeGraphView({ data }: { data: any }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const width = 600;
  const height = 300;

  // Center the hardcoded positions roughly inside a bounded box
  // We can just rely on standard percentages or fixed positions for the mock.
  
  const nodes = [
    { id: '1', label: 'Customer (客户)', type: 'core', x: 50, y: 30, color: '#3b82f6', bg: '#eff6ff' },
    { id: '2', label: 'Order (订单)', type: 'transaction', x: 20, y: 70, color: '#10b981', bg: '#ecfdf5' },
    { id: '3', label: 'Campaign (活动)', type: 'marketing', x: 80, y: 70, color: '#8b5cf6', bg: '#f5f3ff' },
    { id: '4', label: 'Product (商品)', type: 'entity', x: 20, y: 15, color: '#64748b', bg: '#f8fafc' },
    { id: '5', label: 'Coupon (券卡)', type: 'marketing', x: 80, y: 15, color: '#f59e0b', bg: '#fffbeb' },
  ];

  const links = [
    { sourceId: '1', targetId: '2', label: '1:N (下单)', danger: false },
    { sourceId: '1', targetId: '3', label: 'N:M (参与影响)', danger: false },
    { sourceId: '2', targetId: '4', label: '1:N (包含)', danger: false },
    { sourceId: '3', targetId: '5', label: '1:N (发放)', danger: false },
    { sourceId: '5', targetId: '2', label: '1:1 (抵扣断层)', danger: true }, // Risk edge
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/50 shadow-sm m-2 overflow-hidden relative group">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white">
        <span className="text-xs font-bold text-slate-700 flex items-center tracking-widest uppercase">
          <Network className="w-4 h-4 mr-2 text-indigo-600" />
          领域业务连通血缘图谱
        </span>
        <div className="flex items-center space-x-3 text-[10px] uppercase font-bold text-slate-400">
          <div className="flex items-center space-x-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div><span>核心</span></div>
          <div className="flex items-center space-x-1"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div><span>断层</span></div>
        </div>
      </div>
      
      <div className="relative w-full h-[320px] bg-gradient-to-br from-white to-slate-50 overflow-hidden">
        {/* Draw SVG Links */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
               <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
            </marker>
            <marker id="arrow-danger" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
               <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
            </marker>
          </defs>
          {mounted && links.map((link, i) => {
            const source = nodes.find(n => n.id === link.sourceId)!;
            const target = nodes.find(n => n.id === link.targetId)!;
            
            // Wait, using percentage directly in SVG requires percentage units
            return (
              <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.2 + 0.5 }}>
                <path
                  d={`M ${source.x}% ${source.y}% L ${target.x}% ${target.y}%`}
                  fill="none"
                  stroke={link.danger ? '#ef4444' : '#cbd5e1'}
                  strokeWidth="2"
                  strokeDasharray={link.danger ? '4 4' : 'none'}
                  markerEnd={link.danger ? 'url(#arrow-danger)' : 'url(#arrow)'}
                  className={link.danger ? "animate-pulse" : ""}
                />
                <foreignObject 
                  x={Math.min(source.x, target.x) + Math.abs(source.x - target.x)/2 - 10 + '%'} 
                  y={Math.min(source.y, target.y) + Math.abs(source.y - target.y)/2 - 5 + '%'} 
                  width="100" height="30"
                  className="overflow-visible"
                >
                  <div className={`text-[9px] font-mono px-1.5 py-0.5 rounded shadow-sm border whitespace-nowrap inline-block -translate-x-1/2 -translate-y-1/2 ${link.danger ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white text-slate-500 border-slate-200'}`}>
                    {link.label}
                  </div>
                </foreignObject>
              </motion.g>
            )
          })}
        </svg>

        {/* Draw HTML Nodes */}
        {mounted && nodes.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', delay: i * 0.1 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div 
              className="px-4 py-2 rounded-xl text-xs font-semibold shadow-sm border transition-transform hover:scale-105 hover:shadow-md"
              style={{ backgroundColor: node.bg, color: node.color, borderColor: node.color + '40' }}
            >
              {node.label}
            </div>
            
            <div className="absolute top-full mt-2 w-32 bg-slate-800 text-white text-[10px] p-2 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 text-center">
              实体 `{node.label.split(' ')[0]}` <br/> 共发现 {Math.floor(Math.random()*40) + 12} 条计算逻辑血缘
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
