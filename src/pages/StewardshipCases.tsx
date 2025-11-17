import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, BookOpen, Play } from 'lucide-react';

export default function StewardshipCases() {
  const cases = [
    {
      id: 'chest-pain',
      title: 'Chest Pain Evaluation',
      level: 'Intermediate',
      description: 'A 45-year-old patient presents with atypical chest pain. When should you order troponin?',
      objectives: [
        'Apply pre-test probability assessment',
        'Understand appropriate troponin use',
        'Recognize low-risk presentations'
      ]
    },
    {
      id: 'dvt-evaluation',
      title: 'DVT/PE Workup',
      level: 'Intermediate',
      description: 'Approach to D-dimer testing and imaging for suspected venous thromboembolism',
      objectives: [
        'Use Wells score for pre-test probability',
        'Apply age-adjusted D-dimer',
        'Avoid unnecessary imaging'
      ]
    },
    {
      id: 'uti-screening',
      title: 'Asymptomatic Bacteriuria',
      level: 'Beginner',
      description: 'When to treat (and not treat) positive urine cultures in asymptomatic patients',
      objectives: [
        'Distinguish colonization from infection',
        'Avoid unnecessary antibiotic use',
        'Understand stewardship principles'
      ]
    },
    {
      id: 'thyroid-testing',
      title: 'Thyroid Function Testing',
      level: 'Beginner',
      description: 'Appropriate use of TSH vs full thyroid panel in various clinical contexts',
      objectives: [
        'TSH-first approach',
        'Avoid reflexive T4/T3 ordering',
        'Understand test cascades'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Stewardship Case Library</h1>
        <p className="text-muted-foreground mt-2">
          Practice diagnostic stewardship with interactive clinical scenarios
        </p>
      </div>

      {/* Introduction */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>What is Diagnostic Stewardship?</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            Diagnostic stewardship involves coordinated guidance and interventions to improve the appropriate use
            of diagnostic tests, reduce waste, and minimize patient harm from unnecessary testing.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-3 bg-secondary/50 rounded-md">
              <p className="font-medium text-sm mb-1">Right Test</p>
              <p className="text-xs text-muted-foreground">
                Ordering tests that will change management
              </p>
            </div>
            <div className="p-3 bg-secondary/50 rounded-md">
              <p className="font-medium text-sm mb-1">Right Time</p>
              <p className="text-xs text-muted-foreground">
                Avoiding premature or redundant testing
              </p>
            </div>
            <div className="p-3 bg-secondary/50 rounded-md">
              <p className="font-medium text-sm mb-1">Right Interpretation</p>
              <p className="text-xs text-muted-foreground">
                Understanding pre-test probability and test characteristics
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cases Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Interactive Cases</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {cases.map((caseItem) => (
            <Card key={caseItem.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                  <Badge variant={
                    caseItem.level === 'Beginner' ? 'secondary' :
                    caseItem.level === 'Intermediate' ? 'outline' :
                    'default'
                  }>
                    {caseItem.level}
                  </Badge>
                </div>
                <CardDescription>{caseItem.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-2">Learning Objectives:</p>
                    <ul className="space-y-1">
                      {caseItem.objectives.map((obj, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start">
                          <span className="mr-2">•</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-3 border-t">
                    <Link to={`/stewardship/case/${caseItem.id}`}>
                      <Button className="w-full">
                        <Play className="h-4 w-4 mr-2" />
                        Start Case
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stewardship Principles */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <CardTitle>Core Stewardship Principles</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Ask Before Ordering:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Will this test change management?</li>
                <li>• What is the pre-test probability?</li>
                <li>• Could this lead to a test cascade?</li>
                <li>• What are the risks of false positives?</li>
                <li>• Is there a better alternative?</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Choosing Wisely Concepts:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Avoid redundant testing</li>
                <li>• Don't screen asymptomatic low-risk patients</li>
                <li>• Consider watchful waiting when appropriate</li>
                <li>• Use guideline-recommended pathways</li>
                <li>• Engage patients in shared decision-making</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
