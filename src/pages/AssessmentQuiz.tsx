import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  type: 'mcq' | 'calculation' | 'case';
}

interface AssessmentData {
  id: string;
  title: string;
  type: string;
  questions: Question[];
  passingScore: number;
}

const assessments: Record<string, AssessmentData> = {
  'foundations-quiz': {
    id: 'foundations-quiz',
    title: 'Foundations Quiz',
    type: 'MCQ',
    passingScore: 70,
    questions: [
      {
        id: 'q1',
        question: 'What does sensitivity measure?',
        options: [
          'The probability of a negative test in patients without disease',
          'The probability of a positive test in patients with disease',
          'The probability of disease given a positive test',
          'The probability of no disease given a negative test'
        ],
        correctAnswer: 1,
        explanation: 'Sensitivity is the probability that a test is positive when disease is PRESENT. It measures how good the test is at detecting disease when it exists.',
        type: 'mcq'
      },
      {
        id: 'q2',
        question: 'A test has sensitivity of 90% and specificity of 80%. What is the positive likelihood ratio?',
        options: ['4.5', '2.25', '0.125', '7.2'],
        correctAnswer: 0,
        explanation: 'LR+ = Sensitivity / (1 - Specificity) = 0.90 / (1 - 0.80) = 0.90 / 0.20 = 4.5',
        type: 'calculation'
      },
      {
        id: 'q3',
        question: 'Which statement about specificity is TRUE?',
        options: [
          'High specificity tests are best for ruling out disease',
          'High specificity tests are best for ruling in disease',
          'Specificity changes with disease prevalence',
          'Specificity is the same as positive predictive value'
        ],
        correctAnswer: 1,
        explanation: 'High specificity tests are good for ruling IN disease (SpPIn). A positive result on a highly specific test strongly suggests disease is present.',
        type: 'mcq'
      },
      {
        id: 'q4',
        question: 'What does a likelihood ratio of 1.0 indicate?',
        options: [
          'The test strongly suggests disease',
          'The test strongly rules out disease',
          'The test does not change probability',
          'The test is highly sensitive'
        ],
        correctAnswer: 2,
        explanation: 'An LR of 1.0 means the test result does not change the probability of disease at all. The post-test probability equals the pre-test probability.',
        type: 'mcq'
      },
      {
        id: 'q5',
        question: 'A test has 95% sensitivity and 50% specificity. What is the negative likelihood ratio?',
        options: ['0.10', '0.05', '1.90', '19.0'],
        correctAnswer: 0,
        explanation: 'LR− = (1 - Sensitivity) / Specificity = (1 - 0.95) / 0.50 = 0.05 / 0.50 = 0.10',
        type: 'calculation'
      },
      {
        id: 'q6',
        question: 'Which acronym helps remember when to rule OUT disease?',
        options: ['SpPIn', 'SnNOut', 'PPV', 'NPV'],
        correctAnswer: 1,
        explanation: 'SnNOut = Sensitive test, Negative result, rules OUT disease. A negative result on a highly sensitive test effectively rules out disease.',
        type: 'mcq'
      },
      {
        id: 'q7',
        question: 'True positives divided by all people with disease equals:',
        options: ['Specificity', 'Sensitivity', 'PPV', 'NPV'],
        correctAnswer: 1,
        explanation: 'Sensitivity = TP / (TP + FN), which is true positives divided by all people who actually have the disease.',
        type: 'mcq'
      },
      {
        id: 'q8',
        question: 'Which likelihood ratio indicates the STRONGEST positive test?',
        options: ['LR+ = 2', 'LR+ = 5', 'LR+ = 15', 'LR+ = 1'],
        correctAnswer: 2,
        explanation: 'LR+ > 10 indicates a strong test that greatly increases probability of disease. LR+ of 15 is much stronger than 2 or 5.',
        type: 'mcq'
      },
      {
        id: 'q9',
        question: 'A test that never misses disease (100% sensitivity) will have:',
        options: [
          'Zero false negatives',
          'Zero false positives',
          'Perfect specificity',
          'LR+ of infinity'
        ],
        correctAnswer: 0,
        explanation: 'A test with 100% sensitivity means all diseased patients test positive, so there are zero false negatives (diseased patients who test negative).',
        type: 'mcq'
      },
      {
        id: 'q10',
        question: 'If a test has LR+ = 4, by how much does it increase the odds of disease?',
        options: ['2-fold', '4-fold', '8-fold', 'Does not change odds'],
        correctAnswer: 1,
        explanation: 'A positive test multiplies the pre-test odds by the LR+. With LR+ = 4, the odds are increased 4-fold.',
        type: 'calculation'
      }
    ]
  },
  'bayesian-quiz': {
    id: 'bayesian-quiz',
    title: 'Bayesian Reasoning Quiz',
    type: 'Calculation',
    passingScore: 75,
    questions: [
      {
        id: 'q1',
        question: 'A patient has 30% pre-test probability of disease. Convert this to odds.',
        options: ['0.30:1', '0.43:1', '2.33:1', '3:7'],
        correctAnswer: 1,
        explanation: 'Odds = Probability / (1 - Probability) = 0.30 / 0.70 = 0.43 (or approximately 3:7)',
        type: 'calculation'
      },
      {
        id: 'q2',
        question: 'Pre-test odds are 1:1. After a test with LR+ = 5, what are the post-test odds?',
        options: ['1:1', '5:1', '5:5', '6:1'],
        correctAnswer: 1,
        explanation: 'Post-test odds = Pre-test odds × LR = 1 × 5 = 5:1',
        type: 'calculation'
      },
      {
        id: 'q3',
        question: 'If odds are 4:1, what is the probability?',
        options: ['25%', '40%', '80%', '75%'],
        correctAnswer: 2,
        explanation: 'Probability = Odds / (1 + Odds) = 4 / (1 + 4) = 4 / 5 = 0.80 = 80%',
        type: 'calculation'
      },
      {
        id: 'q4',
        question: 'A patient has 20% pre-test probability. A test with LR+ = 5 is positive. What is the approximate post-test probability?',
        options: ['40%', '55%', '75%', '100%'],
        correctAnswer: 1,
        explanation: 'Pre-test odds = 0.20/0.80 = 0.25. Post-test odds = 0.25 × 5 = 1.25. Post-test probability = 1.25/(1+1.25) = 55.6%',
        type: 'calculation'
      },
      {
        id: 'q5',
        question: 'What does the Fagan nomogram help you visualize?',
        options: [
          'The relationship between sensitivity and specificity',
          'The conversion from pre-test to post-test probability',
          'The area under the ROC curve',
          'The prevalence of disease'
        ],
        correctAnswer: 1,
        explanation: 'The Fagan nomogram is a visual tool that shows how to use likelihood ratios to convert pre-test probability to post-test probability.',
        type: 'mcq'
      },
      {
        id: 'q6',
        question: 'A test with LR− = 0.1 is used. If pre-test odds are 1:1, what are post-test odds?',
        options: ['0.1:1', '1:10', '10:1', '1:1'],
        correctAnswer: 0,
        explanation: 'Post-test odds = Pre-test odds × LR− = 1 × 0.1 = 0.1:1 (or 1:10)',
        type: 'calculation'
      },
      {
        id: 'q7',
        question: 'Which statement about Bayesian reasoning is TRUE?',
        options: [
          'It replaces clinical judgment',
          'It requires independent tests',
          'It cannot be used with multiple tests',
          'It ignores pre-test probability'
        ],
        correctAnswer: 1,
        explanation: 'Bayesian reasoning works best when tests are independent. Sequential application of LRs assumes test results don\'t influence each other.',
        type: 'mcq'
      },
      {
        id: 'q8',
        question: 'Pre-test probability is 80%. A test with LR− = 0.2 is negative. What is the approximate post-test probability?',
        options: ['20%', '40%', '50%', '60%'],
        correctAnswer: 2,
        explanation: 'Pre-test odds = 0.80/0.20 = 4. Post-test odds = 4 × 0.2 = 0.8. Post-test probability = 0.8/(1+0.8) = 44% (approximately 50%)',
        type: 'calculation'
      }
    ]
  },
  'ppv-npv-mastery': {
    id: 'ppv-npv-mastery',
    title: 'PPV/NPV Mastery',
    type: 'Calculation',
    passingScore: 75,
    questions: [
      {
        id: 'q1',
        question: 'Which statement about PPV is TRUE?',
        options: [
          'PPV is independent of disease prevalence',
          'PPV increases as prevalence increases',
          'PPV is the same as sensitivity',
          'PPV cannot exceed specificity'
        ],
        correctAnswer: 1,
        explanation: 'PPV is directly dependent on prevalence. As prevalence increases, PPV increases for a given sensitivity and specificity.',
        type: 'mcq'
      },
      {
        id: 'q2',
        question: 'A screening test for a rare disease (prevalence 0.1%) has 99% sensitivity and 95% specificity. What happens to PPV?',
        options: [
          'PPV will be very high (>90%)',
          'PPV will be moderate (50-90%)',
          'PPV will be low (<10%)',
          'PPV equals sensitivity'
        ],
        correctAnswer: 2,
        explanation: 'In low-prevalence settings, even excellent tests have poor PPV due to high false positive rate relative to true positives.',
        type: 'case'
      },
      {
        id: 'q3',
        question: 'Which predictive value tells you: "If my test is negative, what is the chance I don\'t have disease?"',
        options: ['PPV', 'NPV', 'Sensitivity', 'Specificity'],
        correctAnswer: 1,
        explanation: 'NPV (Negative Predictive Value) is the probability that disease is absent when the test is negative.',
        type: 'mcq'
      },
      {
        id: 'q4',
        question: 'As disease prevalence decreases, what happens to NPV (assuming constant sensitivity and specificity)?',
        options: [
          'NPV increases',
          'NPV decreases',
          'NPV stays the same',
          'NPV becomes equal to sensitivity'
        ],
        correctAnswer: 0,
        explanation: 'As prevalence decreases, NPV increases because there are fewer diseased individuals to miss (fewer false negatives relative to true negatives).',
        type: 'mcq'
      },
      {
        id: 'q5',
        question: 'Sensitivity and specificity are properties of:',
        options: [
          'The test (constant across populations)',
          'The population being tested',
          'The disease prevalence',
          'The patient\'s pre-test probability'
        ],
        correctAnswer: 0,
        explanation: 'Sensitivity and specificity are intrinsic properties of the test and remain constant regardless of the population. PPV and NPV vary with prevalence.',
        type: 'mcq'
      },
      {
        id: 'q6',
        question: 'In a population where disease is very common (high prevalence), which predictive value will be highest?',
        options: ['PPV will be high, NPV will be low', 'NPV will be high, PPV will be low', 'Both will be high', 'Both will be low'],
        correctAnswer: 0,
        explanation: 'High prevalence increases PPV (more true positives relative to false positives) but decreases NPV (more false negatives relative to true negatives).',
        type: 'mcq'
      }
    ]
  }
};

export default function AssessmentQuiz() {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();
  const setAssessmentScore = useAppStore((state) => state.setAssessmentScore);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const assessment = assessmentId ? assessments[assessmentId] : null;

  if (!assessment) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate('/assessment')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Assessments
        </Button>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {assessmentId && !assessments[assessmentId]
                ? 'Assessment coming soon'
                : 'Assessment not found'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = assessment.questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex] ?? null;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed
      const score = selectedAnswers.filter((answer, idx) =>
        answer === assessment.questions[idx].correctAnswer
      ).length;
      const percentage = Math.round((score / assessment.questions.length) * 100);
      setAssessmentScore(assessmentId!, percentage);
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    setShowExplanation(false);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowExplanation(false);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const score = selectedAnswers.filter((answer, idx) =>
      answer === assessment.questions[idx].correctAnswer
    ).length;
    const percentage = Math.round((score / assessment.questions.length) * 100);
    const passed = percentage >= assessment.passingScore;

    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate('/assessment')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Assessments
        </Button>

        <Card className={`border-2 ${passed ? 'border-green-500' : 'border-orange-500'}`}>
          <CardHeader>
            <div className="flex items-center space-x-2">
              {passed ? (
                <Trophy className="h-6 w-6 text-green-600" />
              ) : (
                <XCircle className="h-6 w-6 text-orange-600" />
              )}
              <CardTitle>Assessment Complete!</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center p-6 bg-secondary/50 rounded-md">
              <p className="text-sm text-muted-foreground mb-2">Your Score</p>
              <p className="text-5xl font-bold mb-2">{percentage}%</p>
              <p className="text-sm text-muted-foreground">
                {score} out of {assessment.questions.length} correct
              </p>
              <Badge
                variant={passed ? 'default' : 'secondary'}
                className={`mt-3 ${passed ? 'bg-green-600' : ''}`}
              >
                {passed ? 'Passed' : 'Not Passed'} (Passing: {assessment.passingScore}%)
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-md">
                <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">
                  Correct Answers
                </p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{score}</p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md">
                <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">
                  Incorrect Answers
                </p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {assessment.questions.length - score}
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button onClick={resetQuiz} className="flex-1">
                Retake Assessment
              </Button>
              <Button variant="outline" onClick={() => navigate('/assessment')} className="flex-1">
                Back to Assessments
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/assessment')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Assessments
        </Button>
        <Badge variant="outline">
          Question {currentQuestionIndex + 1} of {assessment.questions.length}
        </Badge>
      </div>

      {/* Assessment Info */}
      <Card>
        <CardHeader>
          <CardTitle>{assessment.title}</CardTitle>
          <CardDescription>
            {assessment.type} • Passing Score: {assessment.passingScore}%
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Question */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg">
              Question {currentQuestionIndex + 1}
            </CardTitle>
            <Badge variant={
              currentQuestion.type === 'mcq' ? 'secondary' :
              currentQuestion.type === 'calculation' ? 'outline' :
              'default'
            }>
              {currentQuestion.type.toUpperCase()}
            </Badge>
          </div>
          <CardDescription className="text-base mt-3">
            {currentQuestion.question}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === currentQuestion.correctAnswer;
              const showResult = showExplanation;

              return (
                <button
                  key={index}
                  onClick={() => !showExplanation && handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-md border-2 text-left transition-colors ${
                    !showResult
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
                    <div className="flex items-center space-x-3">
                      <span className="font-mono font-bold text-sm">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span>{option}</span>
                    </div>
                    {showResult && isCorrectAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div
              className={`p-4 rounded-md border ${
                isCorrect
                  ? 'bg-green-500/10 border-green-500/20'
                  : 'bg-orange-500/10 border-orange-500/20'
              }`}
            >
              <p className={`text-sm font-medium mb-2 ${
                isCorrect
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-orange-600 dark:text-orange-400'
              }`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </p>
              <p className="text-sm">{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={selectedAnswer === null}
            >
              {currentQuestionIndex === assessment.questions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
