import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';

interface CaseDecision {
  id: string;
  prompt: string;
  situation: string;
  options: CaseOption[];
}

interface CaseOption {
  id: string;
  text: string;
  isOptimal: boolean;
  feedback: string;
  consequences: string;
  nextDecisionId?: string;
  stewardshipPoints: number;
}

interface CaseData {
  id: string;
  title: string;
  description: string;
  learningObjectives: string[];
  initialDecision: string;
  decisions: Record<string, CaseDecision>;
}

const cases: Record<string, CaseData> = {
  'chest-pain': {
    id: 'chest-pain',
    title: 'Chest Pain Evaluation',
    description: 'A 45-year-old patient presents with atypical chest pain',
    learningObjectives: [
      'Apply pre-test probability assessment',
      'Understand appropriate troponin use',
      'Recognize low-risk presentations'
    ],
    initialDecision: 'initial',
    decisions: {
      initial: {
        id: 'initial',
        prompt: 'Initial Assessment',
        situation: 'A 45-year-old man presents to the ED with chest discomfort that started 2 hours ago while watching TV. Pain is described as "pressure" in the center of chest, 4/10 intensity. No radiation, no SOB, no diaphoresis. No exertional component. PMH: none. No cardiac risk factors. Vitals: BP 125/78, HR 72, O2 sat 99% RA. Physical exam unremarkable.',
        options: [
          {
            id: 'immediate-troponin',
            text: 'Order troponin immediately',
            isOptimal: false,
            feedback: 'Suboptimal choice',
            consequences: 'Troponin ordered without risk stratification. Pre-test probability is likely <5% based on atypical features and no risk factors.',
            stewardshipPoints: -10,
            nextDecisionId: 'troponin-result'
          },
          {
            id: 'risk-stratify',
            text: 'Use HEART score to risk-stratify first',
            isOptimal: true,
            feedback: 'Excellent choice!',
            consequences: 'HEART score calculated: History (atypical, 0 pts), ECG (normal, 0 pts), Age (45, 1 pt), Risk factors (0 pts), Troponin (pending). Current score 1-2, suggesting very low risk (<2% MACE).',
            stewardshipPoints: 20,
            nextDecisionId: 'heart-score-result'
          },
          {
            id: 'stress-test',
            text: 'Order stress test',
            isOptimal: false,
            feedback: 'Inappropriate',
            consequences: 'Stress testing in acute setting is not appropriate. Risk stratification should come first.',
            stewardshipPoints: -20
          },
          {
            id: 'discharge',
            text: 'Discharge without testing',
            isOptimal: false,
            feedback: 'Too risky',
            consequences: 'Some evaluation is warranted even for low-risk chest pain to rule out ACS.',
            stewardshipPoints: -15
          }
        ]
      },
      'troponin-result': {
        id: 'troponin-result',
        prompt: 'Troponin Result',
        situation: 'High-sensitivity troponin returns at 8 ng/L (normal <14 ng/L). Patient remains asymptomatic.',
        options: [
          {
            id: 'repeat-troponin',
            text: 'Repeat troponin in 3 hours',
            isOptimal: false,
            feedback: 'Unnecessary',
            consequences: 'With atypical presentation, low pre-test probability, and negative initial troponin, serial testing adds little value and may lead to false positives.',
            stewardshipPoints: -10
          },
          {
            id: 'discharge-education',
            text: 'Discharge with return precautions',
            isOptimal: true,
            feedback: 'Correct!',
            consequences: 'Appropriate discharge. Low-risk features + negative troponin = <1% risk of MACE. Patient educated on return precautions.',
            stewardshipPoints: 25
          },
          {
            id: 'admit',
            text: 'Admit for observation',
            isOptimal: false,
            feedback: 'Overutilization',
            consequences: 'Admission not warranted for very low-risk patient. This increases costs without improving outcomes.',
            stewardshipPoints: -15
          }
        ]
      },
      'heart-score-result': {
        id: 'heart-score-result',
        prompt: 'After Risk Stratification',
        situation: 'HEART score is 1-2 (very low risk). What is your next step?',
        options: [
          {
            id: 'single-troponin',
            text: 'Order single troponin',
            isOptimal: true,
            feedback: 'Appropriate',
            consequences: 'Single high-sensitivity troponin at presentation is sufficient for HEART score 0-3. This is evidence-based and stewardship-friendly.',
            stewardshipPoints: 25,
            nextDecisionId: 'final-low-risk'
          },
          {
            id: 'serial-troponins',
            text: 'Order serial troponins',
            isOptimal: false,
            feedback: 'Unnecessary',
            consequences: 'For HEART score 0-3, single troponin is adequate. Serial testing increases false positives without improving outcomes.',
            stewardshipPoints: -10,
            nextDecisionId: 'final-low-risk'
          },
          {
            id: 'no-testing',
            text: 'No testing needed',
            isOptimal: false,
            feedback: 'Too aggressive',
            consequences: 'Even with low HEART score, single troponin helps confirm low risk and provides medicolegal protection.',
            stewardshipPoints: -5,
            nextDecisionId: 'final-low-risk'
          }
        ]
      },
      'final-low-risk': {
        id: 'final-low-risk',
        prompt: 'Final Decision',
        situation: 'Troponin is 6 ng/L (negative). Patient remains comfortable.',
        options: [
          {
            id: 'safe-discharge',
            text: 'Discharge with cardiology follow-up in 2 weeks if symptoms persist',
            isOptimal: true,
            feedback: 'Excellent stewardship!',
            consequences: 'You successfully risk-stratified appropriately, used testing judiciously, and avoided unnecessary admission or further testing.',
            stewardshipPoints: 30
          },
          {
            id: 'outpatient-testing',
            text: 'Discharge with outpatient stress test',
            isOptimal: false,
            feedback: 'Overutilization',
            consequences: 'With atypical symptoms and low pre-test probability, stress testing is low-yield and may lead to false positives.',
            stewardshipPoints: -10
          }
        ]
      }
    }
  },
  'dvt-evaluation': {
    id: 'dvt-evaluation',
    title: 'DVT/PE Workup',
    description: 'Approach to D-dimer testing and imaging for suspected VTE',
    learningObjectives: [
      'Use Wells score for pre-test probability',
      'Apply age-adjusted D-dimer',
      'Avoid unnecessary imaging'
    ],
    initialDecision: 'initial',
    decisions: {
      initial: {
        id: 'initial',
        prompt: 'Initial Presentation',
        situation: '72-year-old woman presents with 2 days of left calf swelling and pain. No recent surgery, no immobilization, no prior VTE. Takes no medications. Exam: left calf 2cm larger than right, mildly tender, no warmth.',
        options: [
          {
            id: 'immediate-ultrasound',
            text: 'Order venous duplex ultrasound immediately',
            isOptimal: false,
            feedback: 'Skipped risk stratification',
            consequences: 'You ordered imaging without assessing pre-test probability. This is costly and may be unnecessary.',
            stewardshipPoints: -15,
            nextDecisionId: 'ultrasound-result'
          },
          {
            id: 'wells-score',
            text: 'Calculate Wells score for DVT',
            isOptimal: true,
            feedback: 'Correct approach!',
            consequences: 'Wells score: Calf swelling (1), entire leg swollen (0), tenderness (1), pitting edema (0), collateral veins (0), previous DVT (0), alternative diagnosis likely (0). Score = 2 (moderate risk, ~17% probability).',
            stewardshipPoints: 20,
            nextDecisionId: 'after-wells'
          },
          {
            id: 'treat-empirically',
            text: 'Start anticoagulation empirically',
            isOptimal: false,
            feedback: 'Too aggressive',
            consequences: 'Starting anticoagulation without confirming diagnosis exposes patient to bleeding risk unnecessarily.',
            stewardshipPoints: -20
          }
        ]
      },
      'after-wells': {
        id: 'after-wells',
        prompt: 'After Wells Score',
        situation: 'Wells score is 2 (moderate probability ~17%). What test do you order?',
        options: [
          {
            id: 'standard-ddimer',
            text: 'Standard D-dimer (<500 ng/mL)',
            isOptimal: false,
            feedback: 'Consider age',
            consequences: 'Standard D-dimer cutoff is not ideal for elderly patients. Age-adjusted cutoff is more appropriate.',
            stewardshipPoints: 5,
            nextDecisionId: 'ddimer-positive'
          },
          {
            id: 'age-adjusted-ddimer',
            text: 'Age-adjusted D-dimer (age × 10 = 720 ng/mL)',
            isOptimal: true,
            feedback: 'Excellent!',
            consequences: 'Age-adjusted D-dimer increases specificity in elderly patients without sacrificing sensitivity. This reduces false positives.',
            stewardshipPoints: 25,
            nextDecisionId: 'ddimer-result'
          },
          {
            id: 'skip-ddimer',
            text: 'Skip D-dimer, go straight to ultrasound',
            isOptimal: false,
            feedback: 'Missed opportunity',
            consequences: 'D-dimer can help avoid unnecessary imaging in moderate-risk patients.',
            stewardshipPoints: -10,
            nextDecisionId: 'ultrasound-result'
          }
        ]
      },
      'ddimer-result': {
        id: 'ddimer-result',
        prompt: 'D-dimer Result',
        situation: 'Age-adjusted D-dimer returns at 650 ng/mL (below age-adjusted cutoff of 720 ng/mL).',
        options: [
          {
            id: 'no-ultrasound',
            text: 'No ultrasound needed, DVT ruled out',
            isOptimal: true,
            feedback: 'Perfect stewardship!',
            consequences: 'With moderate Wells score and negative age-adjusted D-dimer, DVT is effectively ruled out (<2% risk). You avoided unnecessary imaging.',
            stewardshipPoints: 30
          },
          {
            id: 'ultrasound-anyway',
            text: 'Order ultrasound anyway to be safe',
            isOptimal: false,
            feedback: 'Overutilization',
            consequences: 'This defeats the purpose of the D-dimer test. Negative D-dimer with moderate probability effectively rules out DVT.',
            stewardshipPoints: -15
          }
        ]
      },
      'ddimer-positive': {
        id: 'ddimer-positive',
        prompt: 'Positive D-dimer',
        situation: 'D-dimer is 850 ng/mL (positive by standard cutoff).',
        options: [
          {
            id: 'ultrasound-now',
            text: 'Proceed with venous duplex ultrasound',
            isOptimal: true,
            feedback: 'Appropriate',
            consequences: 'Positive D-dimer with moderate pre-test probability warrants imaging.',
            stewardshipPoints: 20,
            nextDecisionId: 'ultrasound-result'
          }
        ]
      },
      'ultrasound-result': {
        id: 'ultrasound-result',
        prompt: 'Ultrasound Complete',
        situation: 'Ultrasound shows no evidence of DVT. Calf veins fully compressible.',
        options: [
          {
            id: 'repeat-ultrasound',
            text: 'Repeat ultrasound in 1 week',
            isOptimal: false,
            feedback: 'Unnecessary',
            consequences: 'Repeat ultrasound is not indicated with negative initial study and only moderate pre-test probability.',
            stewardshipPoints: -15
          },
          {
            id: 'conservative',
            text: 'Conservative management, return precautions',
            isOptimal: true,
            feedback: 'Appropriate',
            consequences: 'Negative ultrasound rules out proximal DVT. Conservative management with reassurance is appropriate.',
            stewardshipPoints: 25
          }
        ]
      }
    }
  },
  'uti-screening': {
    id: 'uti-screening',
    title: 'Asymptomatic Bacteriuria',
    description: 'When to treat (and not treat) positive urine cultures in asymptomatic patients',
    learningObjectives: [
      'Distinguish colonization from infection',
      'Avoid unnecessary antibiotic use',
      'Understand stewardship principles'
    ],
    initialDecision: 'initial',
    decisions: {
      initial: {
        id: 'initial',
        prompt: 'Initial Presentation',
        situation: '78-year-old woman with dementia in nursing home. Routine urinalysis shows: WBC 50-100, bacteria many, nitrites positive. Patient is afebrile, eating well, no dysuria, no change in mental status. Vital signs stable.',
        options: [
          {
            id: 'start-antibiotics',
            text: 'Start antibiotics for UTI',
            isOptimal: false,
            feedback: 'Inappropriate',
            consequences: 'This is asymptomatic bacteriuria, not UTI. Treating increases antibiotic resistance, C. diff risk, and adverse effects without benefit.',
            stewardshipPoints: -25,
            nextDecisionId: 'after-antibiotics'
          },
          {
            id: 'no-treatment',
            text: 'No antibiotics - this is colonization',
            isOptimal: true,
            feedback: 'Excellent stewardship!',
            consequences: 'Correct. Asymptomatic bacteriuria should NOT be treated (except in pregnancy or before urologic procedures). Treatment does not improve outcomes.',
            stewardshipPoints: 30,
            nextDecisionId: 'education'
          },
          {
            id: 'repeat-culture',
            text: 'Repeat urine culture',
            isOptimal: false,
            feedback: 'Unnecessary',
            consequences: 'Repeating the culture will not change management. The patient is asymptomatic.',
            stewardshipPoints: -10,
            nextDecisionId: 'education'
          }
        ]
      },
      'after-antibiotics': {
        id: 'after-antibiotics',
        prompt: 'One Week Later',
        situation: 'Patient develops diarrhea. C. difficile test is positive. Now requires isolation and treatment.',
        options: [
          {
            id: 'treat-cdiff',
            text: 'Treat C. difficile infection',
            isOptimal: true,
            feedback: 'Necessary but preventable',
            consequences: 'You must treat the C. diff, but this was caused by unnecessary antibiotic use for asymptomatic bacteriuria.',
            stewardshipPoints: -15
          }
        ]
      },
      'education': {
        id: 'education',
        prompt: 'Nursing Home Follow-up',
        situation: 'Nursing staff asks: "Should we get urine cultures on residents with confusion?"',
        options: [
          {
            id: 'educate-correct',
            text: 'No - only test if symptomatic (fever, dysuria, acute change)',
            isOptimal: true,
            feedback: 'Excellent teaching!',
            consequences: 'You correctly educated staff about appropriate UTI diagnosis. Confusion alone is not an indication for urine testing.',
            stewardshipPoints: 25
          },
          {
            id: 'routine-testing',
            text: 'Yes - routine screening is good practice',
            isOptimal: false,
            feedback: 'Incorrect',
            consequences: 'Routine screening leads to overtreatment of asymptomatic bacteriuria. Test only with UTI symptoms.',
            stewardshipPoints: -20
          }
        ]
      }
    }
  },
  'thyroid-testing': {
    id: 'thyroid-testing',
    title: 'Thyroid Function Testing',
    description: 'Appropriate use of TSH vs full thyroid panel',
    learningObjectives: [
      'TSH-first approach',
      'Avoid reflexive T4/T3 ordering',
      'Understand test cascades'
    ],
    initialDecision: 'initial',
    decisions: {
      initial: {
        id: 'initial',
        prompt: 'Initial Presentation',
        situation: '42-year-old woman with fatigue for 3 months. No weight change, no heat/cold intolerance. No prior thyroid disease. Exam normal.',
        options: [
          {
            id: 'full-panel',
            text: 'Order full thyroid panel (TSH, free T4, free T3, TPO antibodies)',
            isOptimal: false,
            feedback: 'Overutilization',
            consequences: 'Full panel is unnecessary as initial test. TSH alone is the recommended screening test.',
            stewardshipPoints: -15,
            nextDecisionId: 'panel-results'
          },
          {
            id: 'tsh-only',
            text: 'Order TSH only',
            isOptimal: true,
            feedback: 'Perfect stewardship!',
            consequences: 'Correct TSH-first approach. If abnormal, reflex testing will follow based on TSH result.',
            stewardshipPoints: 25,
            nextDecisionId: 'tsh-result'
          },
          {
            id: 'no-testing',
            text: 'No testing - reassure patient',
            isOptimal: false,
            feedback: 'Too dismissive',
            consequences: 'Some evaluation is reasonable for persistent fatigue. TSH is appropriate screening.',
            stewardshipPoints: -5,
            nextDecisionId: 'tsh-result'
          }
        ]
      },
      'tsh-result': {
        id: 'tsh-result',
        prompt: 'TSH Result',
        situation: 'TSH returns at 2.1 mIU/L (normal range 0.4-4.0). Patient is euthyroid.',
        options: [
          {
            id: 'reflexive-t4',
            text: 'Order free T4 and T3 to be thorough',
            isOptimal: false,
            feedback: 'Unnecessary cascade',
            consequences: 'Normal TSH effectively rules out thyroid dysfunction. Further testing adds no value and may find incidental abnormalities.',
            stewardshipPoints: -20,
            nextDecisionId: 'cascade'
          },
          {
            id: 'stop-testing',
            text: 'No further thyroid testing needed',
            isOptimal: true,
            feedback: 'Excellent!',
            consequences: 'Normal TSH rules out primary thyroid disease. You avoided unnecessary testing.',
            stewardshipPoints: 30,
            nextDecisionId: 'alternative'
          }
        ]
      },
      'panel-results': {
        id: 'panel-results',
        prompt: 'Full Panel Results',
        situation: 'TSH 2.1 (normal), free T4 1.2 (normal), free T3 3.1 (normal), TPO antibodies 35 (mildly elevated but TSH normal).',
        options: [
          {
            id: 'treat-antibodies',
            text: 'Start levothyroxine for positive antibodies',
            isOptimal: false,
            feedback: 'Inappropriate',
            consequences: 'With normal TSH, elevated antibodies alone are not an indication for treatment. You would be treating a lab value, not a patient.',
            stewardshipPoints: -25
          },
          {
            id: 'observation',
            text: 'Observation - all clinically relevant values normal',
            isOptimal: true,
            feedback: 'Correct',
            consequences: 'Appropriate. TPO antibodies predict future hypothyroidism but do not indicate treatment now. Monitor TSH if symptoms develop.',
            stewardshipPoints: 15,
            nextDecisionId: 'alternative'
          }
        ]
      },
      'cascade': {
        id: 'cascade',
        prompt: 'Cascade Triggered',
        situation: 'Free T4 comes back at 1.8 ng/dL (normal 0.8-1.8, high-normal). Patient now worried about "borderline" results.',
        options: [
          {
            id: 'more-testing',
            text: 'Order repeat testing and endocrine referral',
            isOptimal: false,
            feedback: 'Cascade continues',
            consequences: 'High-normal T4 with normal TSH is not pathologic. You have created anxiety and cost with unnecessary testing.',
            stewardshipPoints: -15
          },
          {
            id: 'reassure',
            text: 'Reassure - values are within normal range',
            isOptimal: true,
            feedback: 'Good recovery',
            consequences: 'You appropriately counsel patient that values in normal range do not require action.',
            stewardshipPoints: 10,
            nextDecisionId: 'alternative'
          }
        ]
      },
      'alternative': {
        id: 'alternative',
        prompt: 'Addressing Fatigue',
        situation: 'Thyroid normal. What is your next step for persistent fatigue?',
        options: [
          {
            id: 'appropriate-workup',
            text: 'Consider other causes: CBC, CMP, depression screening',
            isOptimal: true,
            feedback: 'Appropriate',
            consequences: 'You appropriately shifted focus to other common causes of fatigue after ruling out thyroid disease.',
            stewardshipPoints: 20
          },
          {
            id: 'repeat-thyroid',
            text: 'Repeat thyroid panel in 1 month',
            isOptimal: false,
            feedback: 'Unnecessary',
            consequences: 'With normal TSH, repeat testing in 1 month will not change management. Focus on other causes.',
            stewardshipPoints: -15
          }
        ]
      }
    }
  }
};

export default function CaseViewer() {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const [currentDecisionId, setCurrentDecisionId] = useState<string>('initial');
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [currentSelection, setCurrentSelection] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const caseData = caseId ? cases[caseId] : null;

  if (!caseData) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate('/stewardship')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cases
        </Button>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Case not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentDecision = caseData.decisions[currentDecisionId];

  const handleOptionSelect = (option: CaseOption) => {
    setSelectedPath([...selectedPath, option.id]);
    setCurrentSelection(option.id);
    setTotalPoints(totalPoints + option.stewardshipPoints);

    if (option.nextDecisionId) {
      setTimeout(() => {
        setCurrentDecisionId(option.nextDecisionId!);
        setCurrentSelection(null); // Reset selection for new decision
      }, 2000);
    } else {
      setCompleted(true);
    }
  };

  const resetCase = () => {
    setCurrentDecisionId('initial');
    setTotalPoints(0);
    setSelectedPath([]);
    setCurrentSelection(null);
    setCompleted(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/stewardship')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cases
        </Button>
        <Button variant="outline" onClick={resetCase}>
          Reset Case
        </Button>
      </div>

      {/* Case Info */}
      <Card>
        <CardHeader>
          <CardTitle>{caseData.title}</CardTitle>
          <CardDescription>{caseData.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-2">Learning Objectives:</p>
              <ul className="space-y-1">
                {caseData.learningObjectives.map((obj, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start">
                    <span className="mr-2">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
              <span className="text-sm font-medium">Stewardship Score</span>
              <Badge variant={totalPoints >= 50 ? 'default' : totalPoints >= 0 ? 'secondary' : 'destructive'}>
                {totalPoints} points
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Decision */}
      {!completed && (
        <Card>
          <CardHeader>
            <CardTitle>{currentDecision.prompt}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Clinical Situation */}
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-md">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                Clinical Scenario:
              </p>
              <p className="text-sm">{currentDecision.situation}</p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              <p className="font-medium">What do you do?</p>
              <div className="grid gap-3">
                {currentDecision.options.map((option) => {
                  const isSelected = currentSelection === option.id;
                  const showFeedback = isSelected;

                  return (
                    <div key={option.id} className="space-y-2">
                      <Button
                        variant={isSelected ? 'default' : 'outline'}
                        className="w-full justify-start text-left h-auto py-3 px-4"
                        onClick={() => !currentSelection && handleOptionSelect(option)}
                        disabled={currentSelection !== null && currentSelection !== option.id}
                      >
                        {option.text}
                      </Button>

                      {showFeedback && (
                        <div
                          className={`p-4 rounded-md border ${
                            option.isOptimal
                              ? 'bg-green-500/10 border-green-500/20'
                              : 'bg-orange-500/10 border-orange-500/20'
                          }`}
                        >
                          <div className="flex items-start space-x-2 mb-2">
                            {option.isOptimal ? (
                              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                            ) : (
                              <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <p className={`font-medium text-sm ${
                                option.isOptimal
                                  ? 'text-green-600 dark:text-green-400'
                                  : 'text-orange-600 dark:text-orange-400'
                              }`}>
                                {option.feedback}
                              </p>
                              <p className="text-sm mt-2">{option.consequences}</p>
                              <p className="text-sm font-medium mt-2">
                                Stewardship points: {option.stewardshipPoints > 0 ? '+' : ''}{option.stewardshipPoints}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completion */}
      {completed && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <CardTitle>Case Complete!</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-6 bg-secondary/50 rounded-md">
              <p className="text-sm text-muted-foreground mb-2">Final Stewardship Score</p>
              <p className="text-5xl font-bold mb-2">{totalPoints}</p>
              <Badge variant={totalPoints >= 50 ? 'default' : totalPoints >= 0 ? 'secondary' : 'destructive'}>
                {totalPoints >= 50 ? 'Excellent' : totalPoints >= 0 ? 'Good' : 'Needs Improvement'}
              </Badge>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-md">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                Key Takeaways:
              </p>
              <ul className="space-y-2 text-sm">
                {caseData.learningObjectives.map((obj, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex space-x-3">
              <Button onClick={resetCase} className="flex-1">
                Try Again
              </Button>
              <Button variant="outline" onClick={() => navigate('/stewardship')} className="flex-1">
                Back to Cases
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
