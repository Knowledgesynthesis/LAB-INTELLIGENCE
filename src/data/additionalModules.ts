import type { ModuleContent } from '../pages/ModuleViewer';

export const additionalModules: Record<string, ModuleContent> = {
  roc: {
    id: 'roc',
    title: 'Test Performance & ROC Curves',
    level: 'Intermediate',
    duration: 25,
    description: 'Understanding threshold trade-offs and test discrimination',
    sections: [
      {
        title: 'What is an ROC Curve?',
        content: 'The Receiver Operating Characteristic (ROC) curve is a graphical plot that illustrates the diagnostic ability of a binary classifier system as its discrimination threshold is varied. It plots the True Positive Rate (sensitivity) against the False Positive Rate (1 - specificity) at various threshold settings.',
        keyPoints: [
          'ROC curves show the trade-off between sensitivity and specificity',
          'Each point represents a different threshold',
          'The curve shows all possible sensitivity-specificity combinations',
          'Tests closer to the upper-left corner are better'
        ]
      },
      {
        title: 'Area Under the Curve (AUC)',
        content: 'The AUC represents the probability that the test will rank a randomly chosen positive case higher than a randomly chosen negative case. It provides a single number summary of test performance.',
        keyPoints: [
          'AUC = 1.0: Perfect discrimination',
          'AUC = 0.9-1.0: Excellent',
          'AUC = 0.8-0.9: Good',
          'AUC = 0.7-0.8: Fair',
          'AUC = 0.5: No better than chance (coin flip)'
        ],
        formula: 'AUC ranges from 0.5 (worthless test) to 1.0 (perfect test)'
      },
      {
        title: 'Threshold Selection',
        content: 'Moving the threshold changes the balance between sensitivity and specificity. Lower thresholds increase sensitivity but decrease specificity. Higher thresholds do the opposite.',
        keyPoints: [
          'No single "best" threshold exists',
          'Choice depends on clinical context',
          'For screening: favor sensitivity (low threshold)',
          'For confirmation: favor specificity (high threshold)',
          'Consider consequences of false positives vs false negatives'
        ],
        examples: [
          {
            title: 'Troponin for MI',
            description: 'Low threshold (high sensitivity) to avoid missing MI, accepting more false positives'
          },
          {
            title: 'PSA for Prostate Cancer',
            description: 'Higher threshold reduces false positives and overdiagnosis of indolent cancers'
          }
        ]
      },
      {
        title: 'When ROC Curves Mislead',
        content: 'ROC curves have limitations. They don\'t account for disease prevalence, and a test with excellent AUC may still have poor PPV in low-prevalence settings.',
        keyPoints: [
          'ROC curves ignore prevalence',
          'Good AUC ≠ good clinical utility in all settings',
          'Must consider pre-test probability',
          'PPV/NPV change with prevalence even if ROC stays same'
        ]
      }
    ]
  },
  'predictive-values': {
    id: 'predictive-values',
    title: 'Predictive Values in Context',
    level: 'Intermediate',
    duration: 25,
    description: 'How PPV and NPV change with disease prevalence',
    sections: [
      {
        title: 'Understanding Predictive Values',
        content: 'PPV and NPV answer the clinically relevant questions: "If my test is positive, what\'s the chance I have disease?" and "If negative, what\'s the chance I don\'t have disease?" Unlike sensitivity and specificity, these values depend heavily on disease prevalence.',
        keyPoints: [
          'PPV = probability of disease given positive test',
          'NPV = probability of no disease given negative test',
          'Both vary with prevalence',
          'Sensitivity and specificity are constant across populations'
        ]
      },
      {
        title: 'The Prevalence Effect',
        content: 'As prevalence increases, PPV increases and NPV decreases. This is why the same test performs very differently in different populations.',
        keyPoints: [
          'High prevalence → High PPV, Low NPV',
          'Low prevalence → Low PPV, High NPV',
          'Even perfect tests affected by prevalence',
          'Pre-test probability = clinical prevalence for that patient'
        ],
        examples: [
          {
            title: 'HIV Testing Example',
            description: 'HIV test with 99.9% sensitivity and 99.5% specificity. In high-risk population (10% prevalence): PPV = 96%. In low-risk population (0.1% prevalence): PPV = only 17%!'
          }
        ]
      },
      {
        title: 'Clinical Examples',
        content: 'Understanding how prevalence affects predictive values is crucial for interpreting test results in different clinical contexts.',
        examples: [
          {
            title: 'D-dimer in Young vs Elderly',
            description: 'Same test, same sensitivity/specificity. But PPV drops dramatically in elderly due to increased false positives from age, comorbidities.'
          },
          {
            title: 'COVID Testing',
            description: 'During pandemic peak (high prevalence): positive test very likely true. During low transmission (low prevalence): more false positives possible.'
          },
          {
            title: 'Troponin in Chest Pain',
            description: 'Typical cardiac chest pain (high pre-test probability): positive troponin highly predictive. Atypical symptoms (low pre-test): positive troponin may be false positive.'
          }
        ]
      },
      {
        title: 'Why Screening Often Fails',
        content: 'Many screening programs fail because they apply tests to low-prevalence populations where PPV is poor, leading to many false positives and downstream harm.',
        keyPoints: [
          'Screening targets asymptomatic, low-risk populations',
          'Low prevalence = low PPV even with good tests',
          'False positives outnumber true positives',
          'Leads to unnecessary workups and procedures',
          'Psychological harm from false positives'
        ]
      }
    ]
  },
  informatics: {
    id: 'informatics',
    title: 'Informatics & Decision Support',
    level: 'Advanced',
    duration: 30,
    description: 'Clinical decision support systems and diagnostic algorithms',
    sections: [
      {
        title: 'Clinical Decision Support Systems',
        content: 'CDS systems use patient data to provide clinicians with assistance in decision-making. They can range from simple alerts to complex diagnostic algorithms.',
        keyPoints: [
          'CDS can improve quality and reduce errors',
          'Must balance helpfulness with alert fatigue',
          'Context-specific recommendations work best',
          'Integration with workflow is critical'
        ]
      },
      {
        title: 'Types of CDS Interventions',
        content: 'Different types of CDS serve different purposes, from passive information display to active alerts and order sets.',
        examples: [
          {
            title: 'Alerts',
            description: 'Interruptive warnings (e.g., drug-drug interactions, duplicate orders). Risk of alert fatigue.'
          },
          {
            title: 'Order Sets',
            description: 'Pre-configured groups of orders for common conditions (e.g., sepsis bundle, chest pain workup)'
          },
          {
            title: 'Documentation Templates',
            description: 'Structured data entry that ensures key information is captured'
          },
          {
            title: 'Reference Information',
            description: 'Context-sensitive links to guidelines, drug information, calculators'
          }
        ]
      },
      {
        title: 'LOINC and Standardization',
        content: 'Logical Observation Identifiers Names and Codes (LOINC) provides universal identifiers for laboratory and clinical observations, enabling interoperability.',
        keyPoints: [
          'Standard terminology for lab tests',
          'Enables data sharing across systems',
          'Critical for CDS that relies on lab data',
          'Reduces ambiguity in test ordering'
        ]
      },
      {
        title: 'Algorithm Misuse Pitfalls',
        content: 'CDS and algorithms can be misused or misinterpreted, leading to inappropriate care.',
        keyPoints: [
          'Over-reliance on algorithms without clinical judgment',
          'Applying algorithms outside their validated population',
          'Ignoring contraindications or special circumstances',
          'Alert fatigue leading to important alerts being ignored',
          'Lack of updates as evidence evolves'
        ],
        examples: [
          {
            title: 'Sepsis Alerts',
            description: 'May fire in patients without infection, leading to unnecessary antibiotics if clinician doesn\'t use judgment'
          }
        ]
      }
    ]
  },
  algorithms: {
    id: 'algorithms',
    title: 'Diagnostic Algorithms',
    level: 'Intermediate',
    duration: 40,
    description: 'Evidence-based pathways for common clinical scenarios',
    sections: [
      {
        title: 'Introduction to Diagnostic Algorithms',
        content: 'Diagnostic algorithms provide step-by-step approaches to common clinical presentations, integrating evidence-based testing strategies with clinical decision-making.',
        keyPoints: [
          'Standardize approach to common presentations',
          'Incorporate risk stratification',
          'Reduce unnecessary testing',
          'Improve diagnostic accuracy',
          'Must be adapted to individual patients'
        ]
      },
      {
        title: 'Chest Pain Evaluation',
        content: 'Structured approach to chest pain uses risk scores (HEART, TIMI) to guide testing and disposition.',
        keyPoints: [
          'History and exam guide pre-test probability',
          'ECG is first test for all chest pain',
          'Troponin use guided by risk stratification',
          'Serial troponins only if indicated',
          'Stress testing for intermediate-risk patients'
        ],
        examples: [
          {
            title: 'HEART Score',
            description: 'Low risk (0-3): Single troponin may suffice. Moderate (4-6): Serial troponins and observation. High (≥7): Aggressive workup.'
          }
        ]
      },
      {
        title: 'Suspected Pulmonary Embolism',
        content: 'Wells score or PERC rule guide use of D-dimer and imaging to avoid unnecessary CT angiography.',
        keyPoints: [
          'PERC rule can exclude PE without testing',
          'Wells score stratifies pre-test probability',
          'D-dimer for low/moderate probability',
          'Age-adjusted D-dimer in elderly',
          'CTPA only when indicated'
        ],
        examples: [
          {
            title: 'Low Wells Score + Negative D-dimer',
            description: 'PE effectively ruled out, no imaging needed'
          }
        ]
      },
      {
        title: 'Fever and Sepsis Bundles',
        content: 'Early recognition and treatment of sepsis using structured bundles, including appropriate cultures before antibiotics.',
        keyPoints: [
          'Blood cultures before antibiotics (if no delay)',
          'Broad-spectrum antibiotics within 1 hour',
          'Lactate measurement',
          'Fluid resuscitation',
          'De-escalate antibiotics based on cultures'
        ]
      },
      {
        title: 'Endocrine Testing: TSH-First Approach',
        content: 'Thyroid testing should start with TSH, with reflex testing based on results.',
        keyPoints: [
          'TSH is first-line screening test',
          'Normal TSH rules out primary thyroid disease',
          'Free T4 only if TSH abnormal',
          'T3 rarely needed for initial diagnosis',
          'Avoid full panels without indication'
        ],
        examples: [
          {
            title: 'Fatigue Workup',
            description: 'TSH alone initially. If normal, thyroid is not the cause. If abnormal, reflex to free T4.'
          }
        ]
      }
    ]
  },
  'lab-science': {
    id: 'lab-science',
    title: 'Laboratory Science Foundations',
    level: 'Beginner',
    duration: 25,
    description: 'Pre-analytic, analytic, and post-analytic considerations',
    sections: [
      {
        title: 'The Three Phases of Laboratory Testing',
        content: 'Laboratory testing involves three phases: pre-analytic (before analysis), analytic (during analysis), and post-analytic (after analysis). Most errors occur in the pre-analytic phase.',
        keyPoints: [
          'Pre-analytic: 60-70% of all lab errors',
          'Analytic: 10-15% of errors',
          'Post-analytic: 20-30% of errors',
          'Pre-analytic errors are most preventable'
        ]
      },
      {
        title: 'Pre-Analytic Errors',
        content: 'Errors that occur before the sample reaches the analyzer, including collection, handling, and transport.',
        examples: [
          {
            title: 'Hemolysis',
            description: 'Rupture of red cells releases intracellular contents. Falsely elevates potassium, LDH, AST. Most common from traumatic draws.'
          },
          {
            title: 'Wrong Tube',
            description: 'EDTA (purple top) for chemistry causes falsely low calcium. Heparin tube for coags interferes with testing.'
          },
          {
            title: 'Order of Draw',
            description: 'Filling tubes in wrong order can cause additive carryover and spurious results'
          },
          {
            title: 'Contamination',
            description: 'Blood cultures drawn through IV lines, urine cultures from Foleys - risk of contamination'
          },
          {
            title: 'Timing',
            description: 'Troponin too early after chest pain, therapeutic drug levels at wrong time'
          }
        ]
      },
      {
        title: 'Analytical Errors',
        content: 'Errors during the analysis phase. Modern analyzers are highly accurate, but issues can occur.',
        keyPoints: [
          'Instrument malfunction or calibration errors',
          'Reagent problems',
          'Interference from medications or substances',
          'Quality control monitors for analytical errors'
        ],
        examples: [
          {
            title: 'Lipemia',
            description: 'High triglycerides interfere with colorimetric assays'
          },
          {
            title: 'Biotin Interference',
            description: 'High-dose biotin can interfere with immunoassays, causing false normal TSH'
          }
        ]
      },
      {
        title: 'Post-Analytic Considerations',
        content: 'After analysis, results must be correctly interpreted and acted upon.',
        keyPoints: [
          'Critical values must be reported promptly',
          'Results must be interpreted in clinical context',
          'Understanding reference ranges',
          'Recognizing spurious results'
        ]
      },
      {
        title: 'Understanding Reference Ranges',
        content: 'Reference ranges are typically defined as the central 95% of values in a healthy population. This means 5% of healthy people will have "abnormal" values.',
        keyPoints: [
          '2.5% of healthy people above upper limit',
          '2.5% of healthy people below lower limit',
          'More tests = more chances of "abnormal" by chance',
          'Reference ranges vary by age, sex, ethnicity',
          'Critical to know your lab\'s reference ranges'
        ],
        examples: [
          {
            title: 'CMP with 10 Tests',
            description: 'If you order 10 independent tests, ~40% chance of at least one "abnormal" result in healthy person!'
          }
        ]
      }
    ]
  }
};
