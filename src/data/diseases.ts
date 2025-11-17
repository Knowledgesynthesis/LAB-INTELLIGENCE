import { Disease } from '../types';

/**
 * Synthetic disease data with prevalence estimates
 * For educational purposes only
 */

export const diseases: Disease[] = [
  {
    id: 'acs',
    name: 'Acute Coronary Syndrome',
    basePrevalence: 0.15,
    description: 'Acute coronary syndrome in ED chest pain patients',
    riskFactors: [
      'Age >65',
      'Prior MI',
      'Diabetes',
      'Hypertension',
      'Smoking',
      'Family history',
      'Hyperlipidemia'
    ]
  },
  {
    id: 'pe',
    name: 'Pulmonary Embolism',
    basePrevalence: 0.10,
    description: 'Pulmonary embolism in patients with dyspnea/chest pain',
    riskFactors: [
      'Recent surgery',
      'Immobilization',
      'Malignancy',
      'Prior VTE',
      'Oral contraceptives',
      'Pregnancy/postpartum',
      'Thrombophilia'
    ]
  },
  {
    id: 'heart-failure',
    name: 'Acute Heart Failure',
    basePrevalence: 0.20,
    description: 'Acute decompensated heart failure',
    riskFactors: [
      'Known HF history',
      'Hypertension',
      'CAD',
      'Valvular disease',
      'Cardiomyopathy',
      'Renal insufficiency'
    ]
  },
  {
    id: 'sepsis',
    name: 'Sepsis/Severe Infection',
    basePrevalence: 0.12,
    description: 'Bacterial sepsis requiring antibiotics',
    riskFactors: [
      'Immunosuppression',
      'Recent hospitalization',
      'Indwelling devices',
      'Diabetes',
      'Chronic illness',
      'Age >65'
    ]
  },
  {
    id: 'hypothyroid',
    name: 'Hypothyroidism',
    basePrevalence: 0.05,
    description: 'Primary hypothyroidism in symptomatic patients',
    riskFactors: [
      'Female sex',
      'Age >60',
      'Autoimmune disease',
      'Prior thyroid disease',
      'Family history',
      'Radiation exposure'
    ]
  },
  {
    id: 'diabetes',
    name: 'Diabetes Mellitus',
    basePrevalence: 0.25,
    description: 'Type 2 diabetes in at-risk screening population',
    riskFactors: [
      'BMI ≥25',
      'Age >45',
      'Family history',
      'Sedentary lifestyle',
      'Hypertension',
      'Polycystic ovary syndrome',
      'Gestational diabetes history'
    ]
  },
  {
    id: 'hiv',
    name: 'HIV Infection',
    basePrevalence: 0.005,
    description: 'HIV infection in screening population',
    riskFactors: [
      'Unprotected sex',
      'Multiple partners',
      'IV drug use',
      'MSM',
      'Previous STI',
      'Blood transfusion (pre-1985)'
    ]
  },
  {
    id: 'strep-pharyngitis',
    name: 'Group A Strep Pharyngitis',
    basePrevalence: 0.30,
    description: 'Streptococcal pharyngitis in adults with sore throat',
    riskFactors: [
      'Age 5-15 years',
      'Winter/spring season',
      'Close contact with confirmed case',
      'Fever',
      'Tonsillar exudate',
      'Tender anterior cervical nodes'
    ]
  },
  {
    id: 'covid-19',
    name: 'COVID-19',
    basePrevalence: 0.10,
    description: 'SARS-CoV-2 infection (varies with community prevalence)',
    riskFactors: [
      'Close contact with confirmed case',
      'Community transmission level',
      'Unvaccinated',
      'Indoor exposure',
      'Symptomatic presentation',
      'Loss of taste/smell'
    ]
  }
];

export function getDiseaseById(id: string): Disease | undefined {
  return diseases.find(disease => disease.id === id);
}
