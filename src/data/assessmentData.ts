export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  type: 'mcq' | 'calculation' | 'case';
}

export interface AssessmentData {
  id: string;
  title: string;
  type: string;
  questions: Question[];
  passingScore: number;
}

// Additional questions for foundations quiz (need 5 more to reach 15)
export const additionalFoundationsQuestions: Question[] = [
  {
    id: 'q11',
    question: 'In a 2×2 table, what represents false negatives?',
    options: [
      'Diseased patients with negative test',
      'Healthy patients with positive test',
      'Diseased patients with positive test',
      'Healthy patients with negative test'
    ],
    correctAnswer: 0,
    explanation: 'False negatives are diseased patients who incorrectly test negative. They contribute to reduced sensitivity.',
    type: 'mcq'
  },
  {
    id: 'q12',
    question: 'What is the false positive rate?',
    options: ['1 - Sensitivity', '1 - Specificity', '1 - PPV', '1 - NPV'],
    correctAnswer: 1,
    explanation: 'False positive rate = 1 - Specificity. It represents the proportion of healthy people who incorrectly test positive.',
    type: 'mcq'
  },
  {
    id: 'q13',
    question: 'Which likelihood ratio indicates the STRONGEST negative test?',
    options: ['LR− = 0.5', 'LR− = 0.2', 'LR− = 0.05', 'LR− = 1.0'],
    correctAnswer: 2,
    explanation: 'LR− < 0.1 indicates a strong negative test. LR− of 0.05 makes disease 20 times less likely.',
    type: 'mcq'
  },
  {
    id: 'q14',
    question: 'A test with 100% specificity means:',
    options: [
      'No false positives',
      'No false negatives',
      'Perfect PPV',
      'Perfect NPV'
    ],
    correctAnswer: 0,
    explanation: '100% specificity means all healthy patients test negative, so there are no false positives.',
    type: 'mcq'
  },
  {
    id: 'q15',
    question: 'What is the main advantage of likelihood ratios over sensitivity/specificity?',
    options: [
      'They are easier to calculate',
      'They directly show how much probability changes',
      'They are not affected by disease prevalence',
      'They require fewer patients to calculate'
    ],
    correctAnswer: 1,
    explanation: 'Likelihood ratios directly quantify how much a test result changes the probability of disease, making them more clinically useful.',
    type: 'mcq'
  }
];

// Additional questions for bayesian quiz (need 2 more to reach 10)
export const additionalBayesianQuestions: Question[] = [
  {
    id: 'q9',
    question: 'Convert 75% probability to odds.',
    options: ['0.75:1', '3:1', '1:3', '4:1'],
    correctAnswer: 1,
    explanation: 'Odds = 0.75 / (1 - 0.75) = 0.75 / 0.25 = 3:1',
    type: 'calculation'
  },
  {
    id: 'q10',
    question: 'Why must tests be independent when applying sequential likelihood ratios?',
    options: [
      'To reduce cost',
      'Because dependent tests don\'t add new information',
      'To improve sensitivity',
      'To maintain specificity'
    ],
    correctAnswer: 1,
    explanation: 'If tests are dependent (correlated), the second test doesn\'t provide independent information, so simply multiplying LRs would overestimate the probability change.',
    type: 'mcq'
  }
];

// Additional questions for PPV/NPV quiz (need 6 more to reach 12)
export const additionalPPVNPVQuestions: Question[] = [
  {
    id: 'q7',
    question: 'Which value DECREASES as prevalence increases?',
    options: ['PPV', 'NPV', 'Sensitivity', 'Specificity'],
    correctAnswer: 1,
    explanation: 'As prevalence increases, NPV decreases because there are more diseased individuals who could be missed (false negatives).',
    type: 'mcq'
  },
  {
    id: 'q8',
    question: 'A test is performed in two populations: one with 10% prevalence and one with 50% prevalence. The test has 90% sensitivity and 90% specificity. How does PPV compare?',
    options: [
      'PPV is the same in both',
      'PPV is higher in the 10% prevalence group',
      'PPV is higher in the 50% prevalence group',
      'Cannot determine without NPV'
    ],
    correctAnswer: 2,
    explanation: 'PPV increases with prevalence. Higher prevalence means more true positives relative to false positives.',
    type: 'case'
  },
  {
    id: 'q9',
    question: 'If you order 20 independent lab tests on a healthy person, approximately how many will be "abnormal" by chance?',
    options: ['None', 'One', 'Five', 'Ten'],
    correctAnswer: 1,
    explanation: 'Reference ranges include central 95%, so 5% are "abnormal" by definition. With 20 tests: 20 × 0.05 = 1 expected abnormal result by chance.',
    type: 'calculation'
  },
  {
    id: 'q10',
    question: 'Sensitivity and specificity are properties of:',
    options: [
      'The patient population being tested',
      'The test itself',
      'The disease prevalence',
      'The clinician ordering the test'
    ],
    correctAnswer: 1,
    explanation: 'Sensitivity and specificity are intrinsic properties of the test and remain constant. PPV and NPV vary with prevalence.',
    type: 'mcq'
  },
  {
    id: 'q11',
    question: 'In a population screening program for a rare disease (0.1% prevalence), a test with 99% sensitivity and 95% specificity is used. What is the likely outcome?',
    options: [
      'Most positives will be true positives',
      'Most positives will be false positives',
      'Equal true and false positives',
      'No false positives due to high specificity'
    ],
    correctAnswer: 1,
    explanation: 'With low prevalence, even a 5% false positive rate yields many more false positives than true positives, resulting in poor PPV.',
    type: 'case'
  },
  {
    id: 'q12',
    question: 'Which clinical scenario would you expect the HIGHEST PPV for a positive D-dimer?',
    options: [
      'Asymptomatic 80-year-old screening',
      'Low Wells score, no risk factors',
      'High Wells score, recent surgery, leg swelling',
      'Moderate Wells score, age 25'
    ],
    correctAnswer: 2,
    explanation: 'High pre-test probability (high Wells score with risk factors) yields highest PPV. The positive test is most likely to be a true positive.',
    type: 'case'
  }
];

// New assessment: ROC Interpretation
export const rocAssessment: AssessmentData = {
  id: 'roc-interpretation',
  title: 'ROC Curve Interpretation',
  type: 'Case',
  passingScore: 75,
  questions: [
    {
      id: 'q1',
      question: 'What does the ROC curve plot?',
      options: [
        'Sensitivity vs Specificity',
        'PPV vs NPV',
        'Sensitivity vs (1-Specificity)',
        'PPV vs Prevalence'
      ],
      correctAnswer: 2,
      explanation: 'ROC curves plot True Positive Rate (sensitivity) on Y-axis vs False Positive Rate (1-specificity) on X-axis.',
      type: 'mcq'
    },
    {
      id: 'q2',
      question: 'An AUC of 0.7 indicates:',
      options: [
        'Excellent discrimination',
        'Good discrimination',
        'Fair discrimination',
        'No discrimination'
      ],
      correctAnswer: 2,
      explanation: 'AUC 0.7-0.8 is considered fair discrimination. It\'s better than chance but not excellent.',
      type: 'mcq'
    },
    {
      id: 'q3',
      question: 'Where on an ROC curve would you find a test with 100% sensitivity and 0% specificity?',
      options: [
        'Top-left corner',
        'Top-right corner',
        'Bottom-left corner',
        'Center of diagonal'
      ],
      correctAnswer: 1,
      explanation: 'Top-right corner: 100% sensitivity (Y=1.0) and 0% specificity means FPR=1.0 (X=1.0). This test calls everyone positive.',
      type: 'mcq'
    },
    {
      id: 'q4',
      question: 'Moving the threshold lower (to increase sensitivity) will:',
      options: [
        'Increase specificity',
        'Decrease specificity',
        'Not affect specificity',
        'Eliminate false positives'
      ],
      correctAnswer: 1,
      explanation: 'Lowering threshold increases sensitivity but decreases specificity. You catch more disease but also get more false positives.',
      type: 'mcq'
    },
    {
      id: 'q5',
      question: 'An AUC of 0.5 means:',
      options: [
        'Perfect test',
        'Good test',
        'Test no better than random chance',
        'Test has 50% sensitivity'
      ],
      correctAnswer: 2,
      explanation: 'AUC of 0.5 corresponds to the diagonal line of no discrimination. The test performs no better than flipping a coin.',
      type: 'mcq'
    },
    {
      id: 'q6',
      question: 'For a screening test, you would typically choose a threshold that:',
      options: [
        'Maximizes sensitivity',
        'Maximizes specificity',
        'Maximizes PPV',
        'Equals AUC'
      ],
      correctAnswer: 0,
      explanation: 'Screening tests should maximize sensitivity to avoid missing disease, even at the cost of some false positives.',
      type: 'mcq'
    },
    {
      id: 'q7',
      question: 'What is a limitation of ROC curves?',
      options: [
        'Cannot compare different tests',
        'Do not account for disease prevalence',
        'Only work for binary tests',
        'Require large sample sizes'
      ],
      correctAnswer: 1,
      explanation: 'ROC curves show test performance independent of prevalence, but clinical utility (PPV/NPV) depends heavily on prevalence.',
      type: 'mcq'
    },
    {
      id: 'q8',
      question: 'Two tests have the same AUC (0.85). Which additional information is needed to choose between them?',
      options: [
        'The sensitivity values',
        'The disease prevalence and clinical consequences of errors',
        'The specificity values',
        'The number of patients tested'
      ],
      correctAnswer: 1,
      explanation: 'Same AUC means similar overall performance, but the optimal test depends on prevalence and whether you prioritize avoiding false positives or false negatives.',
      type: 'case'
    }
  ]
};

// New assessment: Stewardship Scenarios
export const stewardshipAssessment: AssessmentData = {
  id: 'stewardship-scenarios',
  title: 'Stewardship Scenarios',
  type: 'Case',
  passingScore: 80,
  questions: [
    {
      id: 'q1',
      question: 'An 85-year-old nursing home resident has pyuria on urinalysis but no symptoms. What is the appropriate action?',
      options: [
        'Start antibiotics for UTI',
        'No treatment - likely asymptomatic bacteriuria',
        'Repeat urinalysis',
        'Urine culture and treat based on results'
      ],
      correctAnswer: 1,
      explanation: 'Asymptomatic bacteriuria in elderly should not be treated (except pre-procedure or pregnancy). Treatment increases resistance without benefit.',
      type: 'case'
    },
    {
      id: 'q2',
      question: 'A patient with low-risk chest pain (HEART score 2) has one negative troponin. Next step?',
      options: [
        'Serial troponins every 3 hours',
        'Stress test',
        'Discharge with follow-up',
        'Coronary angiography'
      ],
      correctAnswer: 2,
      explanation: 'Low HEART score (0-3) with single negative high-sensitivity troponin safely rules out ACS. Serial troponins are unnecessary.',
      type: 'case'
    },
    {
      id: 'q3',
      question: 'When is it appropriate to order a full thyroid panel (TSH, T4, T3) as initial test?',
      options: [
        'Fatigue workup',
        'Suspected hyperthyroidism',
        'Rarely - TSH should be first',
        'Weight gain evaluation'
      ],
      correctAnswer: 2,
      explanation: 'TSH-first approach is recommended. Full panels are rarely needed initially and often lead to unnecessary findings and cascades.',
      type: 'mcq'
    },
    {
      id: 'q4',
      question: 'A CT incidentally finds a 1.5cm homogeneous, low-attenuation adrenal nodule. Best next step?',
      options: [
        'Adrenal biopsy',
        'PET scan',
        'Repeat imaging in 6-12 months',
        'Immediate adrenalectomy'
      ],
      correctAnswer: 2,
      explanation: 'Benign-appearing adrenal incidentalomas <4cm can be followed with repeat imaging per guidelines. Biopsy/surgery creates unnecessary risk.',
      type: 'case'
    },
    {
      id: 'q5',
      question: 'Which D-dimer strategy is most appropriate for a 75-year-old with suspected DVT?',
      options: [
        'Standard cutoff <500 ng/mL',
        'Age-adjusted cutoff (age × 10)',
        'Skip D-dimer, go straight to ultrasound',
        'Use troponin instead'
      ],
      correctAnswer: 1,
      explanation: 'Age-adjusted D-dimer (age × 10 ng/mL for age >50) increases specificity in elderly without sacrificing sensitivity.',
      type: 'case'
    },
    {
      id: 'q6',
      question: 'What is a key principle of Choosing Wisely?',
      options: [
        'Order all available tests to be thorough',
        'Don\'t order tests that won\'t change management',
        'Always use newest/most expensive tests',
        'Repeat abnormal tests until normal'
      ],
      correctAnswer: 1,
      explanation: 'Choosing Wisely emphasizes avoiding tests that won\'t change management, reducing waste and potential harm from incidental findings.',
      type: 'mcq'
    },
    {
      id: 'q7',
      question: 'A test cascade typically starts with:',
      options: [
        'High clinical suspicion',
        'Definitive diagnosis',
        'Incidental finding or false positive',
        'Patient request'
      ],
      correctAnswer: 2,
      explanation: 'Cascades often begin with incidental findings or false positives that trigger additional testing, leading to cumulative cost and risk.',
      type: 'mcq'
    },
    {
      id: 'q8',
      question: 'Patient has Wells score of 1 for PE and negative D-dimer. Next step?',
      options: [
        'CT angiography anyway to be safe',
        'Repeat D-dimer tomorrow',
        'No imaging needed - PE ruled out',
        'V/Q scan'
      ],
      correctAnswer: 2,
      explanation: 'Low Wells score with negative D-dimer effectively rules out PE (<2% probability). Further testing is unnecessary.',
      type: 'case'
    },
    {
      id: 'q9',
      question: 'What is the main harm of treating asymptomatic bacteriuria?',
      options: [
        'Increased cost only',
        'Antibiotic resistance and C. diff risk',
        'Patient inconvenience',
        'No harm - always treat positive cultures'
      ],
      correctAnswer: 1,
      explanation: 'Treating asymptomatic bacteriuria increases antibiotic resistance, C. difficile risk, and adverse drug effects without clinical benefit.',
      type: 'mcq'
    },
    {
      id: 'q10',
      question: 'A healthy 40-year-old has routine metabolic panel. One value is borderline abnormal. Best approach?',
      options: [
        'Extensive workup for that abnormality',
        'Repeat in context of symptoms or risk factors',
        'Immediate specialist referral',
        'Start treatment based on lab value'
      ],
      correctAnswer: 1,
      explanation: 'With multiple tests, some abnormal results occur by chance (5% for each test). Repeat testing and clinical context guide next steps.',
      type: 'case'
    }
  ]
};

// New assessment: Comprehensive (reduced from 30 to 10)
export const comprehensiveAssessment: AssessmentData = {
  id: 'comprehensive',
  title: 'Comprehensive Assessment',
  type: 'Mixed',
  passingScore: 80,
  questions: [
    {
      id: 'q1',
      question: 'Calculate PPV: Test has 80% sensitivity, 90% specificity, disease prevalence is 20%.',
      options: ['67%', '44%', '89%', '73%'],
      correctAnswer: 0,
      explanation: 'PPV = (0.80 × 0.20) / [(0.80 × 0.20) + (0.10 × 0.80)] = 0.16 / (0.16 + 0.08) = 0.16 / 0.24 = 67%',
      type: 'calculation'
    },
    {
      id: 'q2',
      question: 'Pre-test probability 40%, LR+ = 8. What is post-test probability?',
      options: ['85%', '90%', '75%', '95%'],
      correctAnswer: 0,
      explanation: 'Pre-test odds = 0.4/0.6 = 0.67. Post-test odds = 0.67 × 8 = 5.36. Post-test probability = 5.36/(1+5.36) = 84%',
      type: 'calculation'
    },
    {
      id: 'q3',
      question: 'Which scenario has the HIGHEST post-test probability after a positive troponin?',
      options: [
        'Atypical chest pain, no risk factors',
        'Typical angina, multiple risk factors',
        'Asymptomatic screening',
        'Non-cardiac chest pain'
      ],
      correctAnswer: 1,
      explanation: 'Highest pre-test probability yields highest post-test probability. Typical angina with risk factors has highest pre-test probability.',
      type: 'case'
    },
    {
      id: 'q4',
      question: 'An ROC curve with AUC = 0.92 indicates:',
      options: [
        'Fair test',
        'Good test',
        'Excellent test',
        'Perfect test'
      ],
      correctAnswer: 2,
      explanation: 'AUC 0.9-1.0 indicates excellent discrimination.',
      type: 'mcq'
    },
    {
      id: 'q5',
      question: 'Why does PPV decrease in low-prevalence populations?',
      options: [
        'Sensitivity decreases',
        'Specificity decreases',
        'False positives outnumber true positives',
        'Test characteristics change'
      ],
      correctAnswer: 2,
      explanation: 'With low prevalence, fewer true positives exist. Even small false positive rates yield more false positives than true positives.',
      type: 'mcq'
    },
    {
      id: 'q6',
      question: 'Best stewardship practice for isolated microscopic hematuria in asymptomatic 30-year-old?',
      options: [
        'Immediate cystoscopy and CT urogram',
        'Repeat urinalysis, consider further workup if persistent',
        'Nephrology referral',
        'No follow-up needed'
      ],
      correctAnswer: 1,
      explanation: 'Transient microscopic hematuria is common. Repeat testing before extensive workup prevents unnecessary procedures.',
      type: 'case'
    },
    {
      id: 'q7',
      question: 'What is the main limitation of using sensitivity and specificity alone in clinical practice?',
      options: [
        'They are hard to calculate',
        'They don\'t tell you the probability of disease after testing',
        'They change with different populations',
        'They require large sample sizes'
      ],
      correctAnswer: 1,
      explanation: 'Sensitivity/specificity describe test performance but don\'t directly answer "What\'s the probability MY patient has disease?" PPV/NPV and Bayesian reasoning do.',
      type: 'mcq'
    },
    {
      id: 'q8',
      question: 'A test result is flagged as "critical value." What phase error occurred if the result was never communicated to the clinician?',
      options: [
        'Pre-analytic error',
        'Analytic error',
        'Post-analytic error',
        'No error occurred'
      ],
      correctAnswer: 2,
      explanation: 'Failure to communicate results is a post-analytic error. The specimen was collected and analyzed correctly, but the result wasn\'t acted upon.',
      type: 'mcq'
    },
    {
      id: 'q9',
      question: 'In diagnostic stewardship, what does "right test, right time" mean?',
      options: [
        'Always use the newest test available',
        'Order tests that will change management when results will be actionable',
        'Test everyone for everything',
        'Only test when insurance approves'
      ],
      correctAnswer: 1,
      explanation: 'Stewardship emphasizes ordering appropriate tests (that will change management) at the right time (when results are actionable).',
      type: 'mcq'
    },
    {
      id: 'q10',
      question: 'Which best describes the relationship between likelihood ratios and post-test probability?',
      options: [
        'LR+ always increases probability by the same absolute amount',
        'LR multiplies pre-test odds to give post-test odds',
        'LR replaces the need for pre-test probability',
        'LR is only useful when prevalence is 50%'
      ],
      correctAnswer: 1,
      explanation: 'Likelihood ratios multiply pre-test odds to calculate post-test odds, which can then be converted to post-test probability.',
      type: 'mcq'
    }
  ]
};
