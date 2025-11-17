import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckSquare, Trophy, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export default function Assessment() {
  const [sampleAnswers, setSampleAnswers] = useState<(number | null)[]>([null, null, null]);
  const assessments = [
    {
      id: 'foundations-quiz',
      title: 'Foundations Quiz',
      type: 'MCQ',
      questions: 15,
      difficulty: 'Easy',
      module: 'Foundations of Diagnostic Reasoning',
      passingScore: 70
    },
    {
      id: 'bayesian-quiz',
      title: 'Bayesian Reasoning Quiz',
      type: 'Calculation',
      questions: 10,
      difficulty: 'Medium',
      module: 'Bayesian Medicine',
      passingScore: 75
    },
    {
      id: 'roc-interpretation',
      title: 'ROC Curve Interpretation',
      type: 'Case',
      questions: 8,
      difficulty: 'Medium',
      module: 'Test Performance & ROC Curves',
      passingScore: 75
    },
    {
      id: 'ppv-npv-mastery',
      title: 'PPV/NPV Mastery',
      type: 'Calculation',
      questions: 12,
      difficulty: 'Medium',
      module: 'Predictive Values in Context',
      passingScore: 75
    },
    {
      id: 'stewardship-cases',
      title: 'Stewardship Scenarios',
      type: 'Case',
      questions: 10,
      difficulty: 'Hard',
      module: 'Stewardship Principles',
      passingScore: 80
    },
    {
      id: 'comprehensive',
      title: 'Comprehensive Assessment',
      type: 'Mixed',
      questions: 10,
      difficulty: 'Hard',
      module: 'All Modules',
      passingScore: 80
    }
  ];

  const sampleQuestions = [
    {
      question: 'A test has sensitivity of 90% and specificity of 80%. What is the positive likelihood ratio?',
      options: ['4.5', '2.25', '0.125', '7.2'],
      correct: 0,
      explanation: 'LR+ = Sensitivity / (1 - Specificity) = 0.90 / 0.20 = 4.5'
    },
    {
      question: 'Which statement about PPV is TRUE?',
      options: [
        'PPV is independent of disease prevalence',
        'PPV increases as prevalence increases',
        'PPV is the same as sensitivity',
        'PPV cannot exceed specificity'
      ],
      correct: 1,
      explanation: 'PPV is directly dependent on prevalence. As prevalence increases, PPV increases for a given sensitivity and specificity.'
    },
    {
      question: 'A patient has 20% pre-test probability of disease. A test with LR+ of 5 returns positive. What is the approximate post-test probability?',
      options: ['50%', '60%', '70%', '55%'],
      correct: 3,
      explanation: 'Pre-test odds = 0.20/0.80 = 0.25. Post-test odds = 0.25 × 5 = 1.25. Post-test probability = 1.25/(1+1.25) = 55.6%'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assessment Hub</h1>
        <p className="text-muted-foreground mt-2">
          Test your knowledge with questions and case-based scenarios
        </p>
      </div>

      {/* Available Assessments */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Available Assessments</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment) => (
            <Card key={assessment.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{assessment.title}</CardTitle>
                  <Badge variant={
                    assessment.difficulty === 'Easy' ? 'secondary' :
                    assessment.difficulty === 'Medium' ? 'outline' :
                    'default'
                  }>
                    {assessment.difficulty}
                  </Badge>
                </div>
                <CardDescription>{assessment.module}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Questions</p>
                    <p className="font-bold">{assessment.questions}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-bold">{assessment.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Passing Score</p>
                    <p className="font-bold">{assessment.passingScore}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <p className="text-orange-600 dark:text-orange-400 font-bold">Not Started</p>
                  </div>
                </div>
                <Link to={`/assessment/${assessment.id}`}>
                  <Button className="w-full">
                    <CheckSquare className="h-4 w-4 mr-2" />
                    Start Assessment
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Sample Questions */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Sample Questions</h2>
        <div className="space-y-4">
          {sampleQuestions.map((q, index) => {
            const selectedAnswer = sampleAnswers[index];
            const isAnswered = selectedAnswer !== null;
            const isCorrect = selectedAnswer === q.correct;

            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-base">Question {index + 1}</CardTitle>
                  <CardDescription>{q.question}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {q.options.map((option, optIndex) => {
                      const isSelected = selectedAnswer === optIndex;
                      const isCorrectAnswer = optIndex === q.correct;

                      return (
                        <button
                          key={optIndex}
                          onClick={() => {
                            if (!isAnswered) {
                              const newAnswers = [...sampleAnswers];
                              newAnswers[index] = optIndex;
                              setSampleAnswers(newAnswers);
                            }
                          }}
                          disabled={isAnswered}
                          className={`w-full p-3 rounded-md border text-left transition-colors ${
                            !isAnswered
                              ? isSelected
                                ? 'border-primary bg-primary/10'
                                : 'border-border hover:border-primary/50'
                              : isSelected && isCorrect
                              ? 'border-green-500 bg-green-500/10'
                              : isSelected && !isCorrect
                              ? 'border-red-500 bg-red-500/10'
                              : isCorrectAnswer
                              ? 'border-green-500 bg-green-500/10'
                              : 'border-border opacity-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="font-mono font-bold">
                                {String.fromCharCode(65 + optIndex)}.
                              </span>
                              <span>{option}</span>
                            </div>
                            {isAnswered && isCorrectAnswer && (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            )}
                            {isAnswered && isSelected && !isCorrect && (
                              <XCircle className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {isAnswered && (
                    <div className={`p-3 rounded-md border ${
                      isCorrect
                        ? 'bg-green-500/10 border-green-500/20'
                        : 'bg-orange-500/10 border-orange-500/20'
                    }`}>
                      <p className={`text-sm font-medium mb-1 ${
                        isCorrect
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-orange-600 dark:text-orange-400'
                      }`}>
                        {isCorrect ? 'Correct!' : 'Incorrect'}
                      </p>
                      <p className="text-sm">{q.explanation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Assessment Types */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-primary" />
            <CardTitle>Assessment Types</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-secondary/50 rounded-md">
              <p className="font-medium mb-2">MCQ</p>
              <p className="text-sm text-muted-foreground">
                Multiple choice questions testing conceptual understanding
              </p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-md">
              <p className="font-medium mb-2">Calculation</p>
              <p className="text-sm text-muted-foreground">
                Problems requiring LR, PPV/NPV, or probability calculations
              </p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-md">
              <p className="font-medium mb-2">Case-Based</p>
              <p className="text-sm text-muted-foreground">
                Clinical scenarios testing application of concepts
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="border-amber-500/50 bg-amber-500/5">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <CardTitle>Assessment Tips</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Complete the relevant learning module before attempting each assessment</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Use the interactive calculators to verify your calculation-based answers</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Read explanations carefully, even for questions you answered correctly</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>The comprehensive assessment covers all modules and is recommended after completing all learning modules</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
