import { z } from 'zod';

export const AgentState = z.object({
  id: z.string(),
  type: z.enum(['research', 'analysis', 'validation', 'prototype']),
  status: z.enum(['idle', 'running', 'completed', 'failed']),
  input: z.any(),
  output: z.any().optional(),
  error: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

export const AgentNode = z.object({
  id: z.string(),
  type: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  data: AgentState,
});

export const AgentEdge = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  type: z.enum(['default', 'success', 'error']),
});

export type AgentState = z.infer<typeof AgentState>;
export type AgentNode = z.infer<typeof AgentNode>;
export type AgentEdge = z.infer<typeof AgentEdge>;

export interface AgentNetwork {
  nodes: AgentNode[];
  edges: AgentEdge[];
} 