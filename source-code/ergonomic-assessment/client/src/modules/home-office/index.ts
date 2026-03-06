/**
 * Home Office Risk Assessment Tool — Module Entry Point
 *
 * This file is the single import point for the Home Office tool.
 * The platform shell imports this to register the tool.
 */

export { HOME_OFFICE_CATEGORIES, HOME_OFFICE_SCORABLE_QUESTIONS } from "./questionnaire";
export { getHomeOfficeRecommendations } from "./recommendations";
export { getHomeOfficeCompliance, HOME_OFFICE_COMPLIANCE } from "./compliance";

import { HOME_OFFICE_CATEGORIES } from "./questionnaire";
import { getHomeOfficeRecommendations } from "./recommendations";
import { getHomeOfficeCompliance } from "./compliance";
import type { ToolModule } from "@/lib/shared/types";

export const HOME_OFFICE_TOOL: ToolModule = {
  id: "home-office",
  name: "Home Office Risk Assessment",
  description: "Assess the safety of your remote workspace across six key risk categories.",
  icon: "Home",
  categories: HOME_OFFICE_CATEGORIES,
  getRecommendations: getHomeOfficeRecommendations,
  getComplianceTemplate: getHomeOfficeCompliance,
};
