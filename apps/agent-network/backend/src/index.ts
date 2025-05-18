import express from 'express';
import { AgentNetworkManager } from './agents/network';
import { agentNetworkJob } from './dagster/jobs';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const agentNetwork = new AgentNetworkManager();

// Initialize with some example nodes
agentNetwork.addNode({
  id: 'research_agent',
  type: 'research',
  position: { x: 0, y: 0 },
  data: {
    id: 'research_agent',
    type: 'research',
    status: 'idle',
    input: {},
  },
});

agentNetwork.addNode({
  id: 'analysis_agent',
  type: 'analysis',
  position: { x: 200, y: 0 },
  data: {
    id: 'analysis_agent',
    type: 'analysis',
    status: 'idle',
    input: {},
  },
});

agentNetwork.addEdge({
  id: 'research_to_analysis',
  source: 'research_agent',
  target: 'analysis_agent',
  type: 'default',
});

// API Endpoints
app.get('/api/network', (req, res) => {
  res.json(agentNetwork.getNetwork());
});

app.post('/api/network/execute', async (req, res) => {
  try {
    const { startNodeId, input } = req.body;
    const result = await agentNetwork.execute(startNodeId, input);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Agent Network Backend running on port ${port}`);
}); 