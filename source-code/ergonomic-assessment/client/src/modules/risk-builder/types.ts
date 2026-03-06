/**
 * Risk Assessment Builder — Types
 * Defines the data structures for the dynamic risk builder.
 */

import type { RiskLevel } from "./scoring";

export interface HazardEntry {
  id: string;                    // UUID generated client-side
  categoryId: string;            // e.g., "slips_trips_falls"
  categoryTitle: string;         // e.g., "Slips, Trips & Falls"
  hazardDescription: string;     // What is the specific hazard?
  personsAtRisk: string;         // Who might be harmed?
  existingControls: string;      // What controls are already in place?
  likelihood: number;            // 1–5
  severity: number;              // 1–5
  riskScore: number;             // likelihood × severity
  riskLevel: RiskLevel;          // low | moderate | high | critical
  selectedControls: string[];    // Chosen from suggested + custom
  customControl: string;         // Free-text additional control
  actionBy: string;              // Who is responsible for implementing controls?
  actionDate: string;            // Target date for control implementation
  residualLikelihood: number;    // 1–5 after controls
  residualSeverity: number;      // 1–5 after controls
  residualScore: number;         // residual risk score
  residualLevel: RiskLevel;      // residual risk level
}

export interface RiskBuilderAssessment {
  id: string;
  assessorName: string;
  assessorRole: string;
  companyName: string;
  location: string;
  department: string;
  assessmentDate: string;
  reviewDate: string;
  hazards: HazardEntry[];
  overallRating: RiskLevel;
  completedAt: string;
}

export function createEmptyHazard(categoryId: string, categoryTitle: string): HazardEntry {
  return {
    id: crypto.randomUUID(),
    categoryId,
    categoryTitle,
    hazardDescription: "",
    personsAtRisk: "",
    existingControls: "",
    likelihood: 3,
    severity: 3,
    riskScore: 9,
    riskLevel: "moderate",
    selectedControls: [],
    customControl: "",
    actionBy: "",
    actionDate: "",
    residualLikelihood: 1,
    residualSeverity: 2,
    residualScore: 2,
    residualLevel: "low",
  };
}
