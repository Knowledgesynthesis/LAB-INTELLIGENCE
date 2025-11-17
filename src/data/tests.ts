import { TestCharacteristics } from '../types';

/**
 * Synthetic test characteristics based on evidence-based diagnostic literature
 * Sources: ACP High-Value Care, UpToDate, Evidence-Based Diagnosis texts
 */

export const diagnosticTests: TestCharacteristics[] = [
  {
    id: 'troponin',
    name: 'High-Sensitivity Troponin',
    sensitivity: 0.95,
    specificity: 0.85,
    lrPositive: 6.33,
    lrNegative: 0.06,
    description: 'Cardiac troponin for acute coronary syndrome diagnosis',
    category: 'cardiac',
    references: [
      'Roffi M, et al. 2015 ESC Guidelines for NSTEMI. Eur Heart J 2016',
      'High-sensitivity cardiac troponin for ACS. JAMA 2018'
    ]
  },
  {
    id: 'ddimer-standard',
    name: 'D-Dimer (Standard)',
    sensitivity: 0.95,
    specificity: 0.50,
    lrPositive: 1.90,
    lrNegative: 0.10,
    description: 'D-Dimer for pulmonary embolism or DVT (high sensitivity, low specificity)',
    category: 'hematologic',
    references: [
      'Wells PS, et al. D-dimer in PE. JAMA 2006',
      'Raja AS, et al. D-dimer for PE. Ann Emerg Med 2015'
    ]
  },
  {
    id: 'ddimer-age-adjusted',
    name: 'D-Dimer (Age-Adjusted)',
    sensitivity: 0.92,
    specificity: 0.65,
    lrPositive: 2.63,
    lrNegative: 0.12,
    description: 'Age-adjusted D-Dimer cutoff (age × 10 μg/L for age >50)',
    category: 'hematologic',
    references: [
      'Righini M, et al. Age-adjusted D-dimer. JAMA 2014'
    ]
  },
  {
    id: 'bnp',
    name: 'B-Type Natriuretic Peptide (BNP)',
    sensitivity: 0.90,
    specificity: 0.76,
    lrPositive: 3.75,
    lrNegative: 0.13,
    description: 'BNP for heart failure diagnosis',
    category: 'cardiac',
    references: [
      'Maisel A, et al. BNP for heart failure. NEJM 2002'
    ]
  },
  {
    id: 'crp',
    name: 'C-Reactive Protein (CRP)',
    sensitivity: 0.80,
    specificity: 0.60,
    lrPositive: 2.00,
    lrNegative: 0.33,
    description: 'CRP for inflammation (non-specific marker)',
    category: 'infectious',
    references: [
      'Pepys MB, et al. CRP: a critical update. J Clin Invest 2003'
    ]
  },
  {
    id: 'procalcitonin',
    name: 'Procalcitonin',
    sensitivity: 0.85,
    specificity: 0.70,
    lrPositive: 2.83,
    lrNegative: 0.21,
    description: 'Procalcitonin for bacterial infection vs viral',
    category: 'infectious',
    references: [
      'Schuetz P, et al. Procalcitonin for bacterial infections. Lancet Infect Dis 2013'
    ]
  },
  {
    id: 'tsh',
    name: 'Thyroid-Stimulating Hormone (TSH)',
    sensitivity: 0.98,
    specificity: 0.92,
    lrPositive: 12.25,
    lrNegative: 0.02,
    description: 'TSH for thyroid dysfunction screening',
    category: 'endocrine',
    references: [
      'Garber JR, et al. Thyroid function tests. Endocr Pract 2012'
    ]
  },
  {
    id: 'hba1c',
    name: 'Hemoglobin A1c',
    sensitivity: 0.78,
    specificity: 0.95,
    lrPositive: 15.60,
    lrNegative: 0.23,
    description: 'HbA1c for diabetes diagnosis (≥6.5%)',
    category: 'endocrine',
    references: [
      'ADA Standards of Medical Care in Diabetes 2023'
    ]
  },
  {
    id: 'hiv-elisa',
    name: 'HIV ELISA (4th Generation)',
    sensitivity: 0.999,
    specificity: 0.995,
    lrPositive: 199.80,
    lrNegative: 0.001,
    description: 'Fourth-generation HIV immunoassay',
    category: 'infectious',
    references: [
      'CDC HIV Testing Guidelines 2022'
    ]
  },
  {
    id: 'rapid-strep',
    name: 'Rapid Strep Test',
    sensitivity: 0.86,
    specificity: 0.95,
    lrPositive: 17.20,
    lrNegative: 0.15,
    description: 'Rapid antigen test for Group A Streptococcus',
    category: 'infectious',
    references: [
      'Shulman ST, et al. Strep pharyngitis. Clin Infect Dis 2012'
    ]
  },
  {
    id: 'covid-pcr',
    name: 'COVID-19 RT-PCR',
    sensitivity: 0.95,
    specificity: 0.99,
    lrPositive: 95.00,
    lrNegative: 0.05,
    description: 'RT-PCR for SARS-CoV-2 detection',
    category: 'infectious',
    references: [
      'CDC COVID-19 Testing Guidelines 2023'
    ]
  },
  {
    id: 'covid-antigen',
    name: 'COVID-19 Rapid Antigen',
    sensitivity: 0.75,
    specificity: 0.97,
    lrPositive: 25.00,
    lrNegative: 0.26,
    description: 'Rapid antigen test for SARS-CoV-2',
    category: 'infectious',
    references: [
      'FDA Antigen Test Guidelines 2023'
    ]
  }
];

export function getTestById(id: string): TestCharacteristics | undefined {
  return diagnosticTests.find(test => test.id === id);
}

export function getTestsByCategory(category: TestCharacteristics['category']): TestCharacteristics[] {
  return diagnosticTests.filter(test => test.category === category);
}
