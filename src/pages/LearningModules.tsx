import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, CheckCircle } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';

export default function LearningModules() {
  const completedModules = useAppStore((state) => state.completedModules);

  const modules = [
    {
      id: 'foundations',
      title: 'Foundations of Diagnostic Reasoning',
      level: 'Beginner',
      duration: 20,
      description: 'Core concepts: prevalence, probability, sensitivity, specificity, and likelihood ratios',
      topics: [
        'Disease prevalence and pre-test probability',
        'Sensitivity and specificity explained',
        'Introduction to likelihood ratios',
        'True/false positives and negatives'
      ]
    },
    {
      id: 'bayesian',
      title: 'Bayesian Medicine',
      level: 'Intermediate',
      duration: 30,
      description: 'Apply Bayes theorem to update probabilities based on test results',
      topics: [
        'Bayes theorem for clinicians',
        'Converting probability to odds and back',
        'Using likelihood ratios to update probability',
        'Fagan nomogram interpretation'
      ]
    },
    {
      id: 'roc',
      title: 'Test Performance & ROC Curves',
      level: 'Intermediate',
      duration: 25,
      description: 'Understanding threshold trade-offs and test discrimination',
      topics: [
        'ROC curve construction and interpretation',
        'Area under the curve (AUC)',
        'Threshold selection strategies',
        'When ROC curves can be misleading'
      ]
    },
    {
      id: 'predictive-values',
      title: 'Predictive Values in Context',
      level: 'Intermediate',
      duration: 25,
      description: 'How PPV and NPV change with disease prevalence',
      topics: [
        'PPV/NPV vs sensitivity/specificity',
        'Prevalence effects on predictive values',
        'Clinical examples: HIV, COVID, troponin, D-dimer',
        'Why screening fails in low-prevalence populations'
      ]
    },
    {
      id: 'stewardship',
      title: 'Stewardship Principles',
      level: 'Advanced',
      duration: 35,
      description: 'Reduce overdiagnosis, test cascades, and unnecessary testing',
      topics: [
        'Overdiagnosis and its harms',
        'False-positive cascades',
        'Value vs utility vs cost vs risk',
        'Choosing Wisely recommendations',
        'Test redundancy and reflex testing'
      ]
    },
    {
      id: 'informatics',
      title: 'Informatics & Decision Support',
      level: 'Advanced',
      duration: 30,
      description: 'Clinical decision support systems and diagnostic algorithms',
      topics: [
        'CDS rules and their limitations',
        'Alerts vs care pathways',
        'LOINC and standardized terminology',
        'Algorithm misuse pitfalls'
      ]
    },
    {
      id: 'algorithms',
      title: 'Diagnostic Algorithms',
      level: 'Intermediate',
      duration: 40,
      description: 'Evidence-based pathways for common clinical scenarios',
      topics: [
        'Chest pain evaluation pathways',
        'Suspected PE workup',
        'Fever and sepsis bundles',
        'Endocrine testing (TSH-first approach)'
      ]
    },
    {
      id: 'lab-science',
      title: 'Laboratory Science Foundations',
      level: 'Beginner',
      duration: 25,
      description: 'Pre-analytic, analytic, and post-analytic considerations',
      topics: [
        'Pre-analytic errors (hemolysis, contamination)',
        'Analytical errors and quality control',
        'Post-analytic pitfalls',
        'Understanding reference ranges'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Learning Modules</h1>
        <p className="text-muted-foreground mt-2">
          Structured curriculum on diagnostic reasoning and laboratory stewardship
        </p>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${(completedModules.length / modules.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="text-sm font-medium">
              {completedModules.length} / {modules.length} modules
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {modules.map((module) => {
          const isCompleted = completedModules.includes(module.id);
          return (
            <Card key={module.id} className={isCompleted ? 'border-green-500/50' : ''}>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    {isCompleted && <CheckCircle className="h-5 w-5 text-green-600" />}
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                  </div>
                  <Badge variant={
                    module.level === 'Beginner' ? 'secondary' :
                    module.level === 'Intermediate' ? 'outline' :
                    'default'
                  }>
                    {module.level}
                  </Badge>
                </div>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{module.duration} minutes</span>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Topics Covered:</p>
                  <ul className="space-y-1">
                    {module.topics.map((topic, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <span className="mr-2">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <Link to={`/modules/${module.id}`}>
                    <Button className="w-full" variant={isCompleted ? 'outline' : 'default'}>
                      <BookOpen className="h-4 w-4 mr-2" />
                      {isCompleted ? 'Review' : 'Start'} Module
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Learning Path */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Learning Path</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            <li className="flex items-start">
              <span className="mr-3 font-bold text-primary">1.</span>
              <div>
                <p className="font-medium">Foundations</p>
                <p className="text-sm text-muted-foreground">
                  Start with core concepts of diagnostic testing
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-3 font-bold text-primary">2.</span>
              <div>
                <p className="font-medium">Lab Science</p>
                <p className="text-sm text-muted-foreground">
                  Understand pre-analytic and analytic factors
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-3 font-bold text-primary">3.</span>
              <div>
                <p className="font-medium">Bayesian Medicine & ROC Curves</p>
                <p className="text-sm text-muted-foreground">
                  Learn how to update probabilities and interpret test performance
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-3 font-bold text-primary">4.</span>
              <div>
                <p className="font-medium">Predictive Values</p>
                <p className="text-sm text-muted-foreground">
                  Master the prevalence-dependent nature of PPV/NPV
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-3 font-bold text-primary">5.</span>
              <div>
                <p className="font-medium">Diagnostic Algorithms</p>
                <p className="text-sm text-muted-foreground">
                  Apply concepts to real clinical pathways
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-3 font-bold text-primary">6.</span>
              <div>
                <p className="font-medium">Stewardship & Informatics</p>
                <p className="text-sm text-muted-foreground">
                  Advanced topics in test utilization and decision support
                </p>
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
