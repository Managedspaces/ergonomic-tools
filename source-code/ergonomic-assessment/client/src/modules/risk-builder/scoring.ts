/**
 * Risk Assessment Builder — Scoring Engine
 * Implements the industry-standard 5×5 Risk Matrix.
 *
 * Risk Score = Likelihood (1–5) × Severity (1–5)
 * Range: 1–25
 *
 * Risk Levels:
 *   1–4:   Low      (Acceptable — monitor)
 *   5–9:   Moderate (Tolerable — implement controls)
 *   10–16: High     (Unacceptable — immediate action)
 *   20–25: Critical (Intolerable — halt work)
 */

export type RiskLevel = "low" | "moderate" | "high" | "critical";

export interface RiskScore {
  score: number;
  level: RiskLevel;
  label: string;
  action: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const LIKELIHOOD_LABELS: Record<number, string> = {
  1: "Rare — highly unlikely to occur",
  2: "Unlikely — could occur but not expected",
  3: "Possible — might occur occasionally",
  4: "Likely — expected to occur frequently",
  5: "Almost Certain — will occur in most circumstances",
};

export const SEVERITY_LABELS: Record<number, string> = {
  1: "Negligible — minor injury, no lost time",
  2: "Minor — minor injury, up to 3 days lost time",
  3: "Moderate — significant injury, over 3 days lost time",
  4: "Major — serious injury, long-term absence",
  5: "Catastrophic — fatality or permanent disability",
};

export function calculateRiskScore(likelihood: number, severity: number): RiskScore {
  const score = likelihood * severity;
  let level: RiskLevel;
  let label: string;
  let action: string;
  let color: string;
  let bgColor: string;
  let borderColor: string;

  if (score <= 4) {
    level = "low";
    label = "Low Risk";
    action = "Acceptable. No immediate action required. Monitor periodically.";
    color = "text-green-700";
    bgColor = "bg-green-50";
    borderColor = "border-green-300";
  } else if (score <= 9) {
    level = "moderate";
    label = "Moderate Risk";
    action = "Tolerable. Implement cost-effective controls within a reasonable timeframe.";
    color = "text-amber-700";
    bgColor = "bg-amber-50";
    borderColor = "border-amber-300";
  } else if (score <= 16) {
    level = "high";
    label = "High Risk";
    action = "Unacceptable. Work should not start or continue until risk is reduced. Immediate action required.";
    color = "text-orange-700";
    bgColor = "bg-orange-50";
    borderColor = "border-orange-300";
  } else {
    level = "critical";
    label = "Critical Risk";
    action = "Intolerable. Halt work immediately. Major structural or process changes required.";
    color = "text-red-700";
    bgColor = "bg-red-50";
    borderColor = "border-red-300";
  }

  return { score, level, label, action, color, bgColor, borderColor };
}

/**
 * Calculates the overall risk rating for a complete assessment.
 * The overall rating is the HIGHEST individual hazard rating (worst-case).
 */
export function calculateOverallRating(hazardScores: number[]): RiskLevel {
  if (hazardScores.length === 0) return "low";
  const max = Math.max(...hazardScores);
  if (max >= 20) return "critical";
  if (max >= 10) return "high";
  if (max >= 5) return "moderate";
  return "low";
}

/**
 * Returns a colour class for a risk level badge.
 */
export function getRiskLevelBadgeClass(level: RiskLevel): string {
  switch (level) {
    case "low":      return "bg-green-100 text-green-800 border-green-200";
    case "moderate": return "bg-amber-100 text-amber-800 border-amber-200";
    case "high":     return "bg-orange-100 text-orange-800 border-orange-200";
    case "critical": return "bg-red-100 text-red-800 border-red-200";
  }
}
