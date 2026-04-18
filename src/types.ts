export type AgentType = 'omi' | 'data_analyst' | 'metadata_expert' | 'quality_expert';

export type BlockState = 'idle' | 'submitted' | 'understanding' | 'routing' | 'running' | 'waiting_user' | 'rendering_result' | 'succeeded' | 'failed' | 'cancelled';

export interface BaseBlock {
  id: string;
  type: 'command' | 'work' | 'result' | 'activity';
  timestamp: string;
}

export interface CommandBlock extends BaseBlock {
  type: 'command';
  title: string;
  content: string;
  status: 'submitted' | 'running' | 'waiting_user' | 'succeeded';
}

export interface WorkStep {
  id: string;
  agent: AgentType;
  agentName: string;
  name: string;
  status: 'pending' | 'running' | 'succeeded' | 'failed';
  detail?: string;
}

export interface WorkBlock extends BaseBlock {
  type: 'work';
  steps: WorkStep[];
  currentAgent: AgentType;
  currentAgentName: string;
  status: BlockState;
}

export interface ResultItem {
  id: string;
  type: 'markdown' | 'sql' | 'table' | 'chart' | 'suggested_actions';
  content: any; // specific per type
}

export interface ResultBlock extends BaseBlock {
  type: 'result';
  items: ResultItem[];
}

export interface ActivityBlock extends BaseBlock {
  type: 'activity';
  content: string;
}

export type Block = CommandBlock | WorkBlock | ResultBlock | ActivityBlock;

export interface ToolStep {
  id: string;
  name: string;
  status: 'queued' | 'running' | 'succeeded' | 'failed';
  agentName: string;
  duration: string;
  input: string;
  output: string;
}

export interface ExecutionTrace {
  taskId: string;
  taskTitle: string;
  status: string;
  startTime: string;
  currentAssignee: string;
  agentTimeline: { agent: string; action: string }[];
  toolSteps: ToolStep[];
}
