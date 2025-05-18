import React, { useEffect, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';
import { AgentNode, AgentEdge } from '@startup-agent/shared-types';

const nodeTypes = {
  research: ({ data }: { data: any }) => (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-blue-500">
      <div className="flex items-center">
        <div className="rounded-full w-12 h-12 flex items-center justify-center bg-blue-100">
          🔍
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold">{data.type}</div>
          <div className="text-gray-500">{data.status}</div>
        </div>
      </div>
    </div>
  ),
  analysis: ({ data }: { data: any }) => (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-green-500">
      <div className="flex items-center">
        <div className="rounded-full w-12 h-12 flex items-center justify-center bg-green-100">
          📊
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold">{data.type}</div>
          <div className="text-gray-500">{data.status}</div>
        </div>
      </div>
    </div>
  ),
};

export function AgentNetwork() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const fetchNetwork = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/network');
        const data = await response.json();
        setNodes(data.nodes);
        setEdges(data.edges);
      } catch (error) {
        console.error('Error fetching agent network:', error);
      }
    };

    fetchNetwork();
  }, []);

  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
} 