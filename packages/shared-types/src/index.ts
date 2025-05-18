// Knowledge Acquisition Types
export interface IndustryData {
  id: string;
  source: 'research' | 'reports' | 'earnings' | 'regulatory';
  content: string;
  metadata: {
    date: string;
    source: string;
    confidence: number;
  };
}

// Pain Point Types
export interface PainPoint {
  id: string;
  description: string;
  impact: {
    severity: number;
    frequency: number;
    affectedStakeholders: string[];
  };
  context: {
    industry: string;
    process: string;
    stage: string;
  };
}

// Technology Types
export interface Technology {
  id: string;
  name: string;
  category: string;
  capabilities: string[];
  maturity: number;
  integrationComplexity: number;
}

// Validation Types
export interface ExpertValidation {
  id: string;
  expertId: string;
  opportunityId: string;
  feedback: {
    feasibility: number;
    marketFit: number;
    technicalViability: number;
    comments: string;
  };
  date: string;
}

// Prototype Types
export interface Prototype {
  id: string;
  name: string;
  type: 'nocode' | 'code';
  status: 'draft' | 'testing' | 'validated';
  components: {
    name: string;
    type: string;
    status: string;
  }[];
  metrics: {
    userFeedback: number;
    performance: number;
    adoption: number;
  };
} 