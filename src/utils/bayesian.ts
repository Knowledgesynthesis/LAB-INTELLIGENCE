/**
 * Bayesian reasoning calculations for diagnostic testing
 * All formulas based on evidence-based diagnostic principles
 */

/**
 * Convert probability to odds
 * @param probability - Probability (0 to 1)
 * @returns Odds
 */
export function probabilityToOdds(probability: number): number {
  if (probability < 0 || probability > 1) {
    throw new Error('Probability must be between 0 and 1');
  }
  if (probability === 1) return Infinity;
  return probability / (1 - probability);
}

/**
 * Convert odds to probability
 * @param odds - Odds (0 to Infinity)
 * @returns Probability (0 to 1)
 */
export function oddsToProbability(odds: number): number {
  if (odds < 0) {
    throw new Error('Odds must be non-negative');
  }
  if (odds === Infinity) return 1;
  return odds / (1 + odds);
}

/**
 * Calculate post-test probability given pre-test probability and likelihood ratio
 * @param preTestProbability - Pre-test probability (0 to 1)
 * @param likelihoodRatio - Likelihood ratio (positive or negative)
 * @returns Post-test probability (0 to 1)
 */
export function calculatePostTestProbability(
  preTestProbability: number,
  likelihoodRatio: number
): number {
  const preTestOdds = probabilityToOdds(preTestProbability);
  const postTestOdds = preTestOdds * likelihoodRatio;
  return oddsToProbability(postTestOdds);
}

/**
 * Calculate positive likelihood ratio from sensitivity and specificity
 * @param sensitivity - Sensitivity (0 to 1)
 * @param specificity - Specificity (0 to 1)
 * @returns Positive likelihood ratio
 */
export function calculatePositiveLR(
  sensitivity: number,
  specificity: number
): number {
  if (specificity === 1) return Infinity;
  return sensitivity / (1 - specificity);
}

/**
 * Calculate negative likelihood ratio from sensitivity and specificity
 * @param sensitivity - Sensitivity (0 to 1)
 * @param specificity - Specificity (0 to 1)
 * @returns Negative likelihood ratio
 */
export function calculateNegativeLR(
  sensitivity: number,
  specificity: number
): number {
  if (specificity === 0) return Infinity;
  return (1 - sensitivity) / specificity;
}

/**
 * Calculate positive predictive value
 * @param sensitivity - Sensitivity (0 to 1)
 * @param specificity - Specificity (0 to 1)
 * @param prevalence - Disease prevalence (0 to 1)
 * @returns PPV (0 to 1)
 */
export function calculatePPV(
  sensitivity: number,
  specificity: number,
  prevalence: number
): number {
  const numerator = sensitivity * prevalence;
  const denominator = sensitivity * prevalence + (1 - specificity) * (1 - prevalence);
  if (denominator === 0) return 0;
  return numerator / denominator;
}

/**
 * Calculate negative predictive value
 * @param sensitivity - Sensitivity (0 to 1)
 * @param specificity - Specificity (0 to 1)
 * @param prevalence - Disease prevalence (0 to 1)
 * @returns NPV (0 to 1)
 */
export function calculateNPV(
  sensitivity: number,
  specificity: number,
  prevalence: number
): number {
  const numerator = specificity * (1 - prevalence);
  const denominator = specificity * (1 - prevalence) + (1 - sensitivity) * prevalence;
  if (denominator === 0) return 0;
  return numerator / denominator;
}

/**
 * Format probability as percentage
 * @param probability - Probability (0 to 1)
 * @param decimals - Number of decimal places
 * @returns Formatted string
 */
export function formatProbability(probability: number, decimals: number = 1): string {
  return `${(probability * 100).toFixed(decimals)}%`;
}

/**
 * Format likelihood ratio for display
 * @param lr - Likelihood ratio
 * @param decimals - Number of decimal places
 * @returns Formatted string
 */
export function formatLR(lr: number, decimals: number = 1): string {
  if (lr === Infinity) return '∞';
  if (lr === 0) return '0';
  return lr.toFixed(decimals);
}

/**
 * Interpret likelihood ratio strength
 * Based on McGee S. Simplifying likelihood ratios. J Gen Intern Med. 2002
 */
export function interpretLR(lr: number, isPositive: boolean): string {
  if (isPositive) {
    if (lr > 10) return 'Large increase in probability';
    if (lr > 5) return 'Moderate increase in probability';
    if (lr > 2) return 'Small increase in probability';
    if (lr > 1) return 'Minimal increase in probability';
    return 'No change or decrease';
  } else {
    if (lr < 0.1) return 'Large decrease in probability';
    if (lr < 0.2) return 'Moderate decrease in probability';
    if (lr < 0.5) return 'Small decrease in probability';
    if (lr < 1) return 'Minimal decrease in probability';
    return 'No change or increase';
  }
}
