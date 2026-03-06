/**
 * Psychosocial / Stress & Workload Risk Assessment — Module Entry Point
 * Tool #3 in the Workplace Risk Platform.
 *
 * Implements the ToolModule interface so it can be registered in the platform registry
 * with zero changes to the platform shell.
 */

import type { ToolModule } from "@/lib/shared/types";
import { PSYCHOSOCIAL_CATEGORIES } from "./questionnaire";
import { getPsychosocialRecommendations } from "./recommendations";
import { getPsychosocialCompliance } from "./compliance";

export const PSYCHOSOCIAL_TOOL: ToolModule = {
  id: "psychosocial",
  name: "Psychosocial Risk Assessment",
  description:
    "Assesses stress, workload, role clarity, work-life balance, and employee wellbeing. Generates a confidential employee report and a compliance-ready employer report aligned with ISO 45003 and national legislation.",
  icon: "Brain",
  version: "1.0.0",
  categories: PSYCHOSOCIAL_CATEGORIES,
  getRecommendations: getPsychosocialRecommendations,
  getComplianceTemplate: getPsychosocialCompliance,
};
