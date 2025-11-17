import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Calculator,
  Activity,
  TrendingUp,
  GitBranch,
  Shield,
  BookOpen,
  CheckSquare,
  ArrowRight
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      title: 'Bayesian Updating Simulator',
      description: 'Learn how test results update probability using likelihood ratios',
      icon: Calculator,
      path: '/bayesian',
      color: 'text-blue-500'
    },
    {
      title: 'Fagan Nomogram',
      description: 'Visual tool for converting pre-test to post-test probability',
      icon: Activity,
      path: '/fagan',
      color: 'text-green-500'
    },
    {
      title: 'ROC Explorer',
      description: 'Explore test performance across different thresholds',
      icon: TrendingUp,
      path: '/roc',
      color: 'text-purple-500'
    },
    {
      title: 'PPV/NPV Explorer',
      description: 'See how predictive values change with prevalence',
      icon: GitBranch,
      path: '/ppv-npv',
      color: 'text-orange-500'
    },
    {
      title: 'Test Cascade Simulator',
      description: 'Visualize consequences of unnecessary testing',
      icon: GitBranch,
      path: '/cascade',
      color: 'text-red-500'
    },
    {
      title: 'Stewardship Cases',
      description: 'Practice diagnostic stewardship with interactive cases',
      icon: Shield,
      path: '/stewardship',
      color: 'text-teal-500'
    },
    {
      title: 'Learning Modules',
      description: 'Structured curriculum on diagnostic reasoning',
      icon: BookOpen,
      path: '/modules',
      color: 'text-indigo-500'
    },
    {
      title: 'Assessment Hub',
      description: 'Test your knowledge with questions and cases',
      icon: CheckSquare,
      path: '/assessment',
      color: 'text-pink-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Lab Intelligence
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Master diagnostic reasoning and laboratory stewardship through interactive simulations
          and evidence-based education
        </p>
      </div>

      {/* Introduction Card */}
      <Card>
        <CardHeader>
          <CardTitle>Why Lab Intelligence?</CardTitle>
          <CardDescription>
            Evidence-based diagnostic decision support for clinicians at all levels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Clinicians struggle with appropriate test utilization and Bayesian reasoning.
            Lab Intelligence provides a comprehensive platform to learn:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Pre-test and post-test probability assessment</li>
            <li>Likelihood ratios and test characteristics</li>
            <li>Bayesian updating and clinical decision-making</li>
            <li>Diagnostic stewardship principles</li>
            <li>Test performance evaluation with ROC curves</li>
            <li>Value-based and harm-based test evaluation</li>
          </ul>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Interactive Tools & Learning</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.path} to={feature.path}>
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full justify-between">
                      Explore
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Start */}
      <Card className="bg-primary/5">
        <CardHeader>
          <CardTitle>Quick Start Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
              1
            </div>
            <div>
              <p className="font-medium">Start with the Bayesian Simulator</p>
              <p className="text-sm text-muted-foreground">
                Learn how likelihood ratios update probabilities
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
              2
            </div>
            <div>
              <p className="font-medium">Explore the ROC and PPV/NPV tools</p>
              <p className="text-sm text-muted-foreground">
                Understand test characteristics and their clinical implications
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
              3
            </div>
            <div>
              <p className="font-medium">Practice with Stewardship Cases</p>
              <p className="text-sm text-muted-foreground">
                Apply your knowledge to realistic clinical scenarios
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
              4
            </div>
            <div>
              <p className="font-medium">Test yourself with Assessments</p>
              <p className="text-sm text-muted-foreground">
                Validate your understanding with MCQs and case-based questions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-orange-500/50 bg-orange-500/5">
        <CardHeader>
          <CardTitle className="text-orange-600 dark:text-orange-400">
            Educational Use Only
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This platform uses synthetic data and is designed for educational purposes only.
            All test characteristics are based on evidence-based diagnostic literature but should
            not be used for actual clinical decision-making. Always consult current clinical
            guidelines and institutional protocols for patient care.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
