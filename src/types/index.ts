/**
 * Core data types for Lab Intelligence
 */

export interface TestCharacteristics {
  id: string;
  name: string;
  sensitivity: number; // 0 to 1
  specificity: number; // 0 to 1
  lrPositive: number;
  lrNegative: number;
  description: string;
  category: 'cardiac' | 'infectious' | 'hematologic' | 'endocrine' | 'other';
  references?: string[];
}

export interface Disease {
  id: string;
  name: string;
  basePrevalence: number; // 0 to 1
  description: string;
  riskFactors: string[];
}

export interface PatientScenario {
  id: string;
  title: string;
  description: string;
  clinicalPresentation: string;
  disease: Disease;
  estimatedPreTestProbability: number;
  availableTests: string[]; // Test IDs
  learningObjectives: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface TestResult {
  testId: string;
  result: 'positive' | 'negative';
  preTestProbability: number;
  postTestProbability: number;
  likelihoodRatio: number;
}

export interface CascadeStep {
  testId: string;
  reason: string;
  cost: number;
  harm: 'none' | 'minimal' | 'moderate' | 'significant';
  description: string;
}

export interface TestCascade {
  id: string;
  triggerTest: string;
  steps: CascadeStep[];
  totalCost: number;
  overallHarm: 'none' | 'minimal' | 'moderate' | 'significant';
  stewardshipRecommendation: string;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  objectives: string[];
  content: string;
  estimatedTime: number; // minutes
  category: 'foundations' | 'bayesian' | 'roc' | 'predictive-values' | 'stewardship' | 'informatics' | 'algorithms' | 'lab-science';
}

export interface AssessmentQuestion {
  id: string;
  type: 'mcq' | 'case' | 'calculation';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  rationale: string;
  bloomLevel: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate';
  moduleId: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  example?: string;
  relatedTerms: string[];
  formula?: string;
}

export interface UserProgress {
  userId: string;
  completedModules: string[];
  assessmentScores: Record<string, number>;
  currentModule?: string;
  lastAccessed: Date;
}

export interface StewardshipCase {
  id: string;
  title: string;
  scenario: string;
  initialPresentations: string[];
  decisions: CaseDecision[];
  optimalPath: string[];
  suboptimalConsequences: Record<string, string>;
}

export interface CaseDecision {
  id: string;
  prompt: string;
  options: CaseOption[];
}

export interface CaseOption {
  id: string;
  text: string;
  consequences: string;
  nextDecisionId?: string;
  outcome?: CaseOutcome;
}

export interface CaseOutcome {
  type: 'success' | 'suboptimal' | 'harmful';
  message: string;
  learningPoints: string[];
  stewardshipScore: number; // 0 to 100
}

export interface ROCPoint {
  threshold: number;
  sensitivity: number;
  specificity: number;
  fpRate: number; // 1 - specificity
}
