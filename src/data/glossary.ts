import { GlossaryTerm } from '../types';

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'sensitivity',
    term: 'Sensitivity',
    definition: 'The probability that a test is positive when disease is present. Also called the true positive rate.',
    example: 'A test with 90% sensitivity will be positive in 90 out of 100 patients who have the disease.',
    relatedTerms: ['specificity', 'true-positive-rate', 'false-negative-rate'],
    formula: 'Sensitivity = TP / (TP + FN)'
  },
  {
    id: 'specificity',
    term: 'Specificity',
    definition: 'The probability that a test is negative when disease is absent. Also called the true negative rate.',
    example: 'A test with 95% specificity will be negative in 95 out of 100 patients who do not have the disease.',
    relatedTerms: ['sensitivity', 'true-negative-rate', 'false-positive-rate'],
    formula: 'Specificity = TN / (TN + FP)'
  },
  {
    id: 'lr-positive',
    term: 'Positive Likelihood Ratio (LR+)',
    definition: 'The ratio of the probability of a positive test in patients with disease versus without disease. Indicates how much a positive test increases the odds of disease.',
    example: 'An LR+ of 10 means a positive test makes disease 10 times more likely.',
    relatedTerms: ['lr-negative', 'sensitivity', 'specificity', 'post-test-odds'],
    formula: 'LR+ = Sensitivity / (1 - Specificity)'
  },
  {
    id: 'lr-negative',
    term: 'Negative Likelihood Ratio (LR−)',
    definition: 'The ratio of the probability of a negative test in patients with disease versus without disease. Indicates how much a negative test decreases the odds of disease.',
    example: 'An LR− of 0.1 means a negative test makes disease 10 times less likely.',
    relatedTerms: ['lr-positive', 'sensitivity', 'specificity', 'post-test-odds'],
    formula: 'LR− = (1 - Sensitivity) / Specificity'
  },
  {
    id: 'ppv',
    term: 'Positive Predictive Value (PPV)',
    definition: 'The probability that disease is present when the test is positive. Depends on disease prevalence.',
    example: 'A PPV of 80% means that 80 out of 100 patients with a positive test actually have the disease.',
    relatedTerms: ['npv', 'prevalence', 'sensitivity', 'specificity'],
    formula: 'PPV = (Sens × Prev) / [(Sens × Prev) + ((1−Spec) × (1−Prev))]'
  },
  {
    id: 'npv',
    term: 'Negative Predictive Value (NPV)',
    definition: 'The probability that disease is absent when the test is negative. Depends on disease prevalence.',
    example: 'An NPV of 99% means that 99 out of 100 patients with a negative test do not have the disease.',
    relatedTerms: ['ppv', 'prevalence', 'sensitivity', 'specificity'],
    formula: 'NPV = (Spec × (1−Prev)) / [(Spec × (1−Prev)) + ((1−Sens) × Prev)]'
  },
  {
    id: 'pre-test-probability',
    term: 'Pre-Test Probability',
    definition: 'The probability of disease before performing a diagnostic test. Based on prevalence, clinical presentation, and risk factors.',
    example: 'A patient with typical angina has a 70% pre-test probability of coronary artery disease.',
    relatedTerms: ['post-test-probability', 'prevalence', 'bayesian-reasoning'],
  },
  {
    id: 'post-test-probability',
    term: 'Post-Test Probability',
    definition: 'The probability of disease after incorporating a test result. Calculated using Bayesian updating.',
    example: 'After a positive troponin (LR+ = 6), a 30% pre-test probability becomes 72% post-test probability.',
    relatedTerms: ['pre-test-probability', 'lr-positive', 'lr-negative', 'bayesian-reasoning'],
  },
  {
    id: 'prevalence',
    term: 'Prevalence',
    definition: 'The proportion of people in a population who have a disease at a specific time. Strongly influences PPV and NPV.',
    example: 'If 1 in 1000 people have a disease, the prevalence is 0.1%.',
    relatedTerms: ['pre-test-probability', 'ppv', 'npv'],
  },
  {
    id: 'bayesian-reasoning',
    term: 'Bayesian Reasoning',
    definition: 'A method of updating probabilities based on new information (test results). Uses likelihood ratios to convert pre-test to post-test probability.',
    example: 'Starting with 40% pre-test probability, a test with LR+ of 5 gives post-test probability of 77%.',
    relatedTerms: ['pre-test-probability', 'post-test-probability', 'lr-positive', 'lr-negative'],
    formula: 'Post-test odds = Pre-test odds × LR'
  },
  {
    id: 'roc-curve',
    term: 'ROC Curve',
    definition: 'Receiver Operating Characteristic curve showing trade-off between sensitivity and specificity at different test thresholds.',
    example: 'A troponin cutoff of 14 ng/L has higher sensitivity but lower specificity than 50 ng/L.',
    relatedTerms: ['auc', 'sensitivity', 'specificity', 'threshold'],
  },
  {
    id: 'auc',
    term: 'Area Under Curve (AUC)',
    definition: 'The area under the ROC curve. Ranges from 0.5 (no discrimination) to 1.0 (perfect discrimination).',
    example: 'An AUC of 0.85 indicates good diagnostic accuracy.',
    relatedTerms: ['roc-curve', 'sensitivity', 'specificity'],
  },
  {
    id: 'diagnostic-stewardship',
    term: 'Diagnostic Stewardship',
    definition: 'Coordinated guidance and interventions to improve appropriate test use, reduce waste, and minimize patient harm from unnecessary testing.',
    example: 'Implementing order sets that require clinical criteria before ordering D-dimer.',
    relatedTerms: ['test-cascade', 'choosing-wisely', 'false-positive-cascade'],
  },
  {
    id: 'test-cascade',
    term: 'Test Cascade',
    definition: 'A sequence of additional tests triggered by an initial abnormal result, often due to false positives, leading to increased cost and potential harm.',
    example: 'An incidental thyroid nodule found on CT leads to ultrasound, FNA, surgery for benign disease.',
    relatedTerms: ['diagnostic-stewardship', 'false-positive', 'overdiagnosis'],
  },
  {
    id: 'false-positive',
    term: 'False Positive',
    definition: 'A positive test result in a patient who does not have the disease.',
    example: 'A positive D-dimer in an elderly patient without PE due to age and comorbidities.',
    relatedTerms: ['specificity', 'ppv', 'test-cascade'],
  },
  {
    id: 'false-negative',
    term: 'False Negative',
    definition: 'A negative test result in a patient who has the disease.',
    example: 'A negative rapid strep test in a patient with streptococcal pharyngitis.',
    relatedTerms: ['sensitivity', 'npv'],
  },
  {
    id: 'pre-analytic-error',
    term: 'Pre-Analytic Error',
    definition: 'Errors occurring before laboratory analysis, such as improper specimen collection, handling, or transport.',
    example: 'Hemolysis from difficult blood draw falsely elevating potassium levels.',
    relatedTerms: ['analytic-error', 'post-analytic-error'],
  },
  {
    id: 'choosing-wisely',
    term: 'Choosing Wisely',
    definition: 'An initiative identifying tests and procedures that are commonly overused and of little value to patients.',
    example: 'Avoiding routine preoperative testing in low-risk patients undergoing low-risk surgery.',
    relatedTerms: ['diagnostic-stewardship', 'high-value-care'],
  },
  {
    id: 'fagan-nomogram',
    term: 'Fagan Nomogram',
    definition: 'A graphical tool for converting pre-test probability to post-test probability using likelihood ratios.',
    example: 'Draw a line from 30% pre-test probability through LR+ of 5 to find ~72% post-test probability.',
    relatedTerms: ['bayesian-reasoning', 'lr-positive', 'lr-negative'],
  }
];

export function getTermById(id: string): GlossaryTerm | undefined {
  return glossaryTerms.find(term => term.id === id);
}

export function searchTerms(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase();
  return glossaryTerms.filter(term =>
    term.term.toLowerCase().includes(lowerQuery) ||
    term.definition.toLowerCase().includes(lowerQuery)
  );
}
