import { StateGraph, END } from 'langgraph';
import { AgentState, AgentNode, AgentEdge } from './types';

export class AgentNetworkManager {
  private graph: StateGraph;
  private nodes: Map<string, AgentNode>;
  private edges: Map<string, AgentEdge>;

  constructor() {
    this.graph = new StateGraph();
    this.nodes = new Map();
    this.edges = new Map();
  }

  addNode(node: AgentNode) {
    this.nodes.set(node.id, node);
    this.graph.addNode(node.id, async (state: AgentState) => {
      // Agent execution logic here
      return { ...state, status: 'completed' };
    });
  }

  addEdge(edge: AgentEdge) {
    this.edges.set(edge.id, edge);
    this.graph.addEdge(edge.source, edge.target);
  }

  async execute(startNodeId: string, input: any) {
    const startNode = this.nodes.get(startNodeId);
    if (!startNode) {
      throw new Error(`Node ${startNodeId} not found`);
    }

    const initialState: AgentState = {
      id: startNodeId,
      type: startNode.data.type,
      status: 'running',
      input,
    };

    const result = await this.graph.execute(initialState);
    return result;
  }

  getNetwork() {
    return {
      nodes: Array.from(this.nodes.values()),
      edges: Array.from(this.edges.values()),
    };
  }
} 