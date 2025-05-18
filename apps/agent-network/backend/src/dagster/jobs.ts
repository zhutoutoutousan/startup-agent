import { job, op } from '@dagster-io/client';
import { AgentNetworkManager } from '../agents/network';

const agentNetwork = new AgentNetworkManager();

@op
async function executeAgentNetwork(context: any) {
  const { startNodeId, input } = context.op_config;
  const result = await agentNetwork.execute(startNodeId, input);
  return result;
}

@job
export const agentNetworkJob = job({
  name: 'agent_network_job',
  ops: [executeAgentNetwork],
  config: {
    ops: {
      executeAgentNetwork: {
        config: {
          startNodeId: 'research_agent',
          input: {},
        },
      },
    },
  },
}); 