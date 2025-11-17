import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';

interface ModuleContent {
  id: string;
  title: string;
  level: string;
  duration: number;
  description: string;
  sections: ModuleSection[];
}

interface ModuleSection {
  title: string;
  content: string;
  keyPoints?: string[];
  examples?: {
    title: string;
    description: string;
  }[];
  formula?: string;
}

const moduleData: Record<string, ModuleContent> = {
  foundations: {
    id: 'foundations',
    title: 'Foundations of Diagnostic Reasoning',
    level: 'Beginner',
    duration: 20,
    description: 'Core concepts: prevalence, probability, sensitivity, specificity, and likelihood ratios',
    sections: [
      {
        title: 'Introduction to Diagnostic Testing',
        content: 'Diagnostic testing is fundamental to modern medicine. However, tests are not perfect—they can be positive in patients without disease (false positives) and negative in patients with disease (false negatives). Understanding test characteristics helps clinicians use tests appropriately and interpret results correctly.',
        keyPoints: [
          'No test is 100% accurate',
          'All tests have trade-offs between sensitivity and specificity',
          'Test results must be interpreted in clinical context'
        ]
      },
      {
        title: 'Disease Prevalence and Pre-Test Probability',
        content: 'Prevalence is the proportion of people in a population who have a disease at a given time. Pre-test probability is your estimate of the likelihood of disease BEFORE performing a test, based on prevalence, clinical presentation, and risk factors.',
        keyPoints: [
          'Prevalence = Number with disease / Total population',
          'Pre-test probability incorporates both prevalence and individual factors',
          'Higher prevalence → higher chance any given patient has the disease'
        ],
        examples: [
          {
            title: 'COVID-19 Screening',
            description: 'During peak pandemic with 10% community prevalence, pre-test probability for symptomatic contact is ~40%. For asymptomatic person with no exposure, it might be only 5%.'
          }
        ]
      },
      {
        title: 'Sensitivity: Detecting Disease When Present',
        content: 'Sensitivity is the probability that a test is POSITIVE when disease is PRESENT. It answers: "If someone has the disease, what are the chances the test will catch it?"',
        keyPoints: [
          'Sensitivity = True Positives / (True Positives + False Negatives)',
          'High sensitivity tests are good for ruling OUT disease',
          'Acronym: SnNOut (Sensitive test, Negative result, rules OUT)'
        ],
        formula: 'Sensitivity = TP / (TP + FN)',
        examples: [
          {
            title: 'High-Sensitivity Troponin',
            description: '95% sensitivity for MI means 95 out of 100 MI patients will have positive test. Only 5 will be missed (false negatives).'
          },
          {
            title: 'D-Dimer for PE',
            description: '95% sensitivity means very few PE cases will be missed. A negative test effectively rules out PE in low-risk patients.'
          }
        ]
      },
      {
        title: 'Specificity: Confirming Absence of Disease',
        content: 'Specificity is the probability that a test is NEGATIVE when disease is ABSENT. It answers: "If someone doesn\'t have the disease, what are the chances the test will be negative?"',
        keyPoints: [
          'Specificity = True Negatives / (True Negatives + False Positives)',
          'High specificity tests are good for ruling IN disease',
          'Acronym: SpPIn (Specific test, Positive result, rules IN)'
        ],
        formula: 'Specificity = TN / (TN + FP)',
        examples: [
          {
            title: 'HIV Western Blot',
            description: '99.5% specificity means only 5 in 1000 people without HIV will test positive (false positive).'
          }
        ]
      },
      {
        title: 'Likelihood Ratios: Quantifying Test Impact',
        content: 'Likelihood ratios (LRs) tell you how much a test result changes the probability of disease. Unlike sensitivity and specificity alone, LRs directly show the clinical impact of a test result.',
        keyPoints: [
          'LR+ = Sensitivity / (1 - Specificity)',
          'LR− = (1 - Sensitivity) / Specificity',
          'LR+ > 10 or LR− < 0.1 indicate strong tests',
          'LR+ between 2-5 or LR− between 0.2-0.5 are weak to moderate'
        ],
        formula: 'LR+ = Sens / (1 - Spec)  |  LR− = (1 - Sens) / Spec'
      },
      {
        title: 'The 2×2 Table',
        content: 'The 2×2 contingency table is the fundamental tool for understanding test performance. It shows the relationship between test results and true disease status.',
        keyPoints: [
          'Rows: Test results (Positive/Negative)',
          'Columns: True disease status (Present/Absent)',
          'Cells: True Positives, False Positives, False Negatives, True Negatives'
        ]
      }
    ]
  },
  bayesian: {
    id: 'bayesian',
    title: 'Bayesian Medicine',
    level: 'Intermediate',
    duration: 30,
    description: 'Apply Bayes theorem to update probabilities based on test results',
    sections: [
      {
        title: 'Bayes Theorem for Clinicians',
        content: 'Bayes theorem provides a mathematical framework for updating probabilities based on new information. In medicine, it helps us update disease probability after receiving a test result.',
        keyPoints: [
          'Start with pre-test probability',
          'Apply likelihood ratio from test result',
          'Calculate post-test probability',
          'Decide on next action based on updated probability'
        ]
      },
      {
        title: 'From Probability to Odds',
        content: 'Odds and probability are two ways of expressing the same information. We convert between them to use likelihood ratios.',
        formula: 'Odds = Probability / (1 - Probability)  |  Probability = Odds / (1 + Odds)',
        examples: [
          {
            title: '30% Probability',
            description: 'Odds = 0.30 / 0.70 = 0.43 (approximately 3:7 odds)'
          },
          {
            title: '80% Probability',
            description: 'Odds = 0.80 / 0.20 = 4 (4:1 odds)'
          }
        ]
      },
      {
        title: 'The Bayesian Update',
        content: 'The core of Bayesian reasoning: multiply pre-test odds by the likelihood ratio to get post-test odds, then convert back to probability.',
        formula: 'Post-test odds = Pre-test odds × LR',
        keyPoints: [
          'Positive test: use LR+',
          'Negative test: use LR−',
          'Can chain multiple tests by applying LRs sequentially',
          'Works best when tests are independent'
        ]
      },
      {
        title: 'Clinical Example: Chest Pain and Troponin',
        content: 'A 55-year-old with typical chest pain has 60% pre-test probability of ACS. Troponin (LR+ = 6) returns positive.',
        examples: [
          {
            title: 'Step 1: Convert to odds',
            description: 'Pre-test odds = 0.60 / 0.40 = 1.5'
          },
          {
            title: 'Step 2: Apply LR',
            description: 'Post-test odds = 1.5 × 6 = 9'
          },
          {
            title: 'Step 3: Convert to probability',
            description: 'Post-test probability = 9 / (1 + 9) = 0.90 = 90%'
          }
        ]
      }
    ]
  },
  stewardship: {
    id: 'stewardship',
    title: 'Stewardship Principles',
    level: 'Advanced',
    duration: 35,
    description: 'Reduce overdiagnosis, test cascades, and unnecessary testing',
    sections: [
      {
        title: 'What is Diagnostic Stewardship?',
        content: 'Diagnostic stewardship is the coordinated set of strategies to improve the appropriate use of diagnostic tests. It aims to optimize test selection, reduce waste, minimize patient harm, and improve outcomes.',
        keyPoints: [
          'Right test for the right patient at the right time',
          'Consider both benefits and harms of testing',
          'Reduce low-value testing',
          'Minimize false positives and test cascades'
        ]
      },
      {
        title: 'Overdiagnosis and Its Harms',
        content: 'Overdiagnosis occurs when a condition is detected that would never have caused symptoms or harm. This leads to unnecessary treatment, anxiety, and cost.',
        examples: [
          {
            title: 'Incidental Thyroid Nodules',
            description: 'Found on neck CT for other reasons. Most are benign but trigger workup cascade.'
          },
          {
            title: 'Low-Risk Prostate Cancer',
            description: 'PSA screening detects indolent cancers that may never progress.'
          }
        ]
      },
      {
        title: 'Test Cascades',
        content: 'A test cascade occurs when an initial test (especially a false positive) triggers additional tests, consultations, or procedures—often with cumulative cost and risk.',
        keyPoints: [
          'Often starts with incidental findings',
          'Each subsequent test has its own false positive rate',
          'Psychological momentum to "complete the workup"',
          'Can lead to invasive procedures for benign findings'
        ]
      },
      {
        title: 'Choosing Wisely Principles',
        content: 'Choosing Wisely is an initiative identifying overused tests and procedures. Key principles include avoiding tests that won\'t change management and reducing redundant testing.',
        keyPoints: [
          'Don\'t test if results won\'t change management',
          'Avoid routine preoperative testing in low-risk patients',
          'Don\'t repeat tests without clinical indication',
          'Discuss testing decisions with patients'
        ]
      }
    ]
  }
};

export default function ModuleViewer() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const completeModule = useAppStore((state) => state.completeModule);
  const completedModules = useAppStore((state) => state.completedModules);

  const module = moduleId ? moduleData[moduleId] : null;
  const isCompleted = moduleId ? completedModules.includes(moduleId) : false;

  if (!module) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate('/modules')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Modules
        </Button>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {moduleId && !moduleData[moduleId]
                ? 'Module content coming soon'
                : 'Module not found'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleComplete = () => {
    if (moduleId) {
      completeModule(moduleId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/modules')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Modules
        </Button>
        {!isCompleted && (
          <Button onClick={handleComplete}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark as Complete
          </Button>
        )}
      </div>

      {/* Module Info */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <CardTitle className="text-3xl">{module.title}</CardTitle>
                {isCompleted && (
                  <Badge variant="default" className="bg-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <CardDescription>{module.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{module.duration} minutes</span>
            </div>
            <Badge variant={
              module.level === 'Beginner' ? 'secondary' :
              module.level === 'Intermediate' ? 'outline' :
              'default'
            }>
              {module.level}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Content Sections */}
      {module.sections.map((section, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-xl">{section.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">{section.content}</p>

            {section.formula && (
              <div className="p-4 bg-secondary/50 rounded-md font-mono text-sm">
                {section.formula}
              </div>
            )}

            {section.keyPoints && section.keyPoints.length > 0 && (
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-md">
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">
                  Key Points:
                </p>
                <ul className="space-y-2">
                  {section.keyPoints.map((point, idx) => (
                    <li key={idx} className="text-sm flex items-start">
                      <span className="mr-2">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {section.examples && section.examples.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium">Examples:</p>
                {section.examples.map((example, idx) => (
                  <div key={idx} className="p-3 bg-secondary/30 rounded-md">
                    <p className="text-sm font-medium mb-1">{example.title}</p>
                    <p className="text-sm text-muted-foreground">{example.description}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Completion Card */}
      <Card className={isCompleted ? 'border-green-500/50 bg-green-500/5' : 'border-primary'}>
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isCompleted ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <div className="h-6 w-6 rounded-full border-2 border-primary" />
              )}
              <div>
                <p className="font-medium">
                  {isCompleted ? 'Module Completed!' : 'Complete this module'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isCompleted
                    ? 'You can review this content anytime'
                    : 'Mark as complete when you\'ve finished reading'}
                </p>
              </div>
            </div>
            {!isCompleted && (
              <Button onClick={handleComplete}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
