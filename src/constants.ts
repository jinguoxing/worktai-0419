import { Block, ExecutionTrace } from './types';

export const MOCK_CHART_DATA = [
  { date: '2023-10-01', sales: 4000, orders: 240, anomaly: false },
  { date: '2023-10-02', sales: 3000, orders: 139, anomaly: false },
  { date: '2023-10-03', sales: 2000, orders: 980, anomaly: true }, // Spike
  { date: '2023-10-04', sales: 2780, orders: 390, anomaly: false },
  { date: '2023-10-05', sales: 1890, orders: 480, anomaly: false },
  { date: '2023-10-06', sales: 2390, orders: 380, anomaly: false },
  { date: '2023-10-07', sales: 3490, orders: 430, anomaly: false },
  { date: '2023-10-08', sales: 1400, orders: 120, anomaly: true }, // Drop
  { date: '2023-10-09', sales: 3490, orders: 430, anomaly: false },
  { date: '2023-10-10', sales: 4000, orders: 500, anomaly: false },
];

export const MOCK_TABLE_DATA = [
  { id: 'O-1029', date: '2023-10-03', status: 'Refunded', amount: 980, reason: 'System Glitch' },
  { id: 'O-1030', date: '2023-10-03', status: 'Refunded', amount: 950, reason: 'System Glitch' },
  { id: 'O-1031', date: '2023-10-08', status: 'Failed', amount: 120, reason: 'Payment Gateway Down' },
];

export const MOCK_SQL = `SELECT 
  date,
  SUM(amount) as sales,
  COUNT(id) as orders
FROM order_db.orders
WHERE date >= CURRENT_DATE - INTERVAL 30 DAY
GROUP BY date
ORDER BY date ASC;`;

export const MOCK_MARKDOWN = `
### 订单异常归因报告

基于过去 30 天的数据监控，发现了 **两次显著的订单异常波动**：

1. **10月3日 订单暴涨与退款潮**：
   - 当日订单数激增至 \`980\` 单。
   - 归因分析：系统促销计算逻辑出现故障 (System Glitch)，导致大量商品标价错误。引发了大量恶意刷单。
   - 状态：受影响订单已进行拦截和 \`Refunded\` 处理。

2. **10月8日 订单骤降**：
   - 营收跌至 \`1,400\`，订单数仅 \`120\` 单 (相对均值下跌 70%)。
   - 归因分析：第三方支付网关 (Payment Gateway) 在 14:00 - 18:00 期间发生严重宕机，导致支付转化率降至 \`0%\`。

**建议跟进动作**：
- 为 10月8日 支付失败的用户定向补发补偿优惠券。
- 创建支付网关熔断监控规则。
`;

export const MOCK_BLOCKS: Block[] = [
  {
    id: 'cmd-1',
    type: 'command',
    timestamp: '14:23:01',
    title: '分析命令',
    content: '分析近30天订单异常，并给出归因',
    status: 'succeeded'
  },
  {
    id: 'act-1',
    type: 'activity',
    timestamp: '14:23:02',
    content: '已切换上下文至数据库 order_db，识别包含表：orders, order_detail'
  },
  {
    id: 'work-1',
    type: 'work',
    timestamp: '14:23:03',
    currentAgent: 'data_analyst',
    currentAgentName: '数据分析专员',
    status: 'succeeded',
    steps: [
      { id: 's1', agent: 'omi', agentName: '奥米', name: '理解与任务拆解', status: 'succeeded' },
      { id: 's2', agent: 'data_analyst', agentName: '数据分析专员', name: '生成查询 SQL', status: 'succeeded' },
      { id: 's3', agent: 'data_analyst', agentName: '数据分析专员', name: '执行查询语句', status: 'succeeded' },
      { id: 's4', agent: 'data_analyst', agentName: '数据分析专员', name: '渲染趋势图表', status: 'succeeded' },
      { id: 's5', agent: 'omi', agentName: '奥米', name: '归因汇总', status: 'succeeded' },
    ]
  },
  {
    id: 'res-1',
    type: 'result',
    timestamp: '14:23:15',
    items: [
      {
        id: 'ri-1',
        type: 'sql',
        content: MOCK_SQL
      },
      {
        id: 'ri-2',
        type: 'chart',
        content: MOCK_CHART_DATA
      },
      {
        id: 'ri-3',
        type: 'table',
        content: MOCK_TABLE_DATA
      },
      {
        id: 'ri-4',
        type: 'markdown',
        content: MOCK_MARKDOWN
      },
      {
        id: 'ri-5',
        type: 'suggested_actions',
        content: [
          '对异常交易用户进行封停',
          '创建支付转化率告警',
          '导出分析报告'
        ]
      }
    ]
  }
];

export const MOCK_TRACE: ExecutionTrace = {
  taskId: 'cmd-1',
  taskTitle: '分析近30天订单异常',
  status: 'succeeded',
  startTime: '14:23:01',
  currentAssignee: 'System',
  agentTimeline: [
    { agent: '奥米', action: '接收并拆解任务为 3 步' },
    { agent: '数据分析专员', action: '接管子任务：查询数据' },
    { agent: '数据分析专员', action: '提交图表视图' },
    { agent: '奥米', action: '结合数据产出分析结论' },
  ],
  toolSteps: [
    {
      id: 'ts-1',
      name: 'NL2SQL',
      agentName: '数据分析专员',
      status: 'succeeded',
      duration: '1.2s',
      input: '分析近30天订单异常',
      output: 'SELECT date, SUM(amount)...'
    },
    {
      id: 'ts-2',
      name: 'Execute_Query',
      agentName: '数据分析专员',
      status: 'succeeded',
      duration: '4.5s',
      input: 'SQL Query...',
      output: '10 rows returned. (78KB)'
    },
    {
      id: 'ts-3',
      name: 'Summarize_Anomaly',
      agentName: '奥米',
      status: 'succeeded',
      duration: '3.1s',
      input: 'Time series data anomalies...',
      output: 'Markdown report generated.'
    }
  ]
};

export const MOCK_KG_DATA = {
  nodes: [
    { id: '1', label: 'Customer (客户)', group: 'core' },
    { id: '2', label: 'Order (订单)', group: 'transaction' },
    { id: '3', label: 'Campaign (活动)', group: 'marketing' },
    { id: '4', label: 'Product (商品)', group: 'entity' },
    { id: '5', label: 'Coupon (券卡)', group: 'marketing' },
  ],
  links: [
    { source: '1', target: '2', label: '1:N (下单)' },
    { source: '1', target: '3', label: 'N:M (参与)' },
    { source: '2', target: '4', label: '1:N (包含)' },
    { source: '3', target: '5', label: '1:N (发放)' },
    { source: '5', target: '2', label: '1:1 (抵扣)' }
  ]
};

export const MOCK_KG_MARKDOWN = `
### CRM_Prod 营销领域关系图谱梳理报告

基于您指定的 \`CRM_Prod\` 及底层的表结构、视图逻辑和计算引擎日志，图谱专员已完成血缘关联与实体抽取。

**发现洞察**：
1. **核心枢纽**：\`Customer\` 是最具中心性的节点，关联所有交易与营销实体。
2. **潜在风险**：\`Coupon\` 与 \`Order\` 之间的关联（抵扣逻辑）在跨库血缘中存在断层，建议进一步由语义治理专员对齐口径。

您可以直接在上方查看生成的可视化图谱。
`;

export const MOCK_KG_BLOCKS: Block[] = [
  {
    id: 'cmd-kg-1',
    type: 'command',
    timestamp: '10:12:05',
    title: '构建指令',
    content: '构建 CRM_Prod 营销领域关系图谱',
    status: 'succeeded'
  },
  {
    id: 'act-kg-1',
    type: 'activity',
    timestamp: '10:12:06',
    content: '正在接入源端，执行跨表元数据扫描与主外键关系推断...'
  },
  {
    id: 'work-kg-1',
    type: 'work',
    timestamp: '10:12:08',
    currentAgent: 'kg_specialist',
    currentAgentName: '图谱专员',
    status: 'succeeded',
    steps: [
      { id: 's1', agent: 'omi', agentName: '奥米', name: '意图识别与域划分', status: 'succeeded' },
      { id: 's2', agent: 'meta_specialist', agentName: '元数据专员', name: '全域结构拉取', status: 'succeeded' },
      { id: 's3', agent: 'kg_specialist', agentName: '图谱专员', name: '血缘关联计算', status: 'succeeded' },
      { id: 's4', agent: 'kg_specialist', agentName: '图谱专员', name: '构建并渲染网络', status: 'succeeded' },
    ]
  },
  {
    id: 'res-kg-1',
    type: 'result',
    timestamp: '10:12:20',
    items: [
      {
        id: 'ri-kg-1',
        type: 'knowledge_graph',
        content: MOCK_KG_DATA
      },
      {
        id: 'ri-kg-2',
        type: 'markdown',
        content: MOCK_KG_MARKDOWN
      },
      {
        id: 'ri-kg-3',
        type: 'suggested_actions',
        content: [
          '导出为图谱结构 (JSON)',
          '修复 Coupon 血缘断层',
          '对齐营销指标语义口径'
        ]
      }
    ]
  }
];

export const MOCK_KG_TRACE: ExecutionTrace = {
  taskId: 'cmd-kg-1',
  taskTitle: '构建 CRM_Prod 营销领域关系图谱',
  status: 'succeeded',
  startTime: '10:12:05',
  currentAssignee: 'System',
  agentTimeline: [
    { agent: '奥米', action: '接收图谱生成意图并规划算力' },
    { agent: '元数据专员', action: '抽取 CRM 与 Order 域库表信息' },
    { agent: '图谱专员', action: '执行节点聚类与血缘链路推断' },
    { agent: '图谱专员', action: '渲染并输出最终可视化图谱' },
  ],
  toolSteps: [
    {
      id: 'ts-kg-1',
      name: 'Extract_Metadata',
      agentName: '元数据专员',
      status: 'succeeded',
      duration: '4.2s',
      input: 'Scan schema: crm_prod, target: marketing',
      output: 'Extracted 5 core tables, 42 fields.'
    },
    {
      id: 'ts-kg-2',
      name: 'Infer_Relations',
      agentName: '图谱专员',
      status: 'succeeded',
      duration: '6.5s',
      input: 'Analyze primary/foreign keys and lineage paths',
      output: 'Inferred 5 relationships among 5 entities.'
    }
  ]
};
