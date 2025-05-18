import type { NextApiRequest, NextApiResponse } from 'next';
import type { IndustryData } from '@startup-agent/shared-types';

// Mock data for development
const mockData: IndustryData[] = [
  {
    id: '1',
    source: 'research',
    content: 'AI adoption in manufacturing is expected to grow by 25% annually.',
    metadata: {
      date: '2024-01-15',
      source: 'Industry Research Report',
      confidence: 0.85
    }
  },
  {
    id: '2',
    source: 'earnings',
    content: 'Tech companies report increased investment in automation solutions.',
    metadata: {
      date: '2024-01-10',
      source: 'Q4 Earnings Call',
      confidence: 0.92
    }
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IndustryData[]>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  // TODO: Implement actual data fetching logic
  res.status(200).json(mockData);
} 