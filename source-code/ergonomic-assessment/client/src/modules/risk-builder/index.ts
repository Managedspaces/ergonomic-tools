/**
 * Risk Assessment Builder — Module Entry Point
 * Tool #4 in the Workplace Risk Platform.
 *
 * This tool is STANDALONE — it does not use the generic AssessmentContext.
 * Instead, it is launched directly from the PlatformHome via a special route flag.
 * The ToolModule interface is implemented with a minimal stub so it can be
 * registered in the registry and displayed on the landing page.
 */

import type { ToolModule } from "@/lib/shared/types";

// Stub categories — the builder has no fixed questionnaire.
// The real UI is in RiskBuilderPage.tsx.
const STUB_CATEGORIES = [
  { id: "slips_trips_falls",            title: "Slips, Trips & Falls",          description: "", weight: 0, icon: "Footprints", questions: [] },
  { id: "manual_handling",              title: "Manual Handling",               description: "", weight: 0, icon: "Package",    questions: [] },
  { id: "fire_safety",                  title: "Fire Safety",                   description: "", weight: 0, icon: "Flame",      questions: [] },
  { id: "electrical_safety",            title: "Electrical Safety",             description: "", weight: 0, icon: "Zap",        questions: [] },
  { id: "chemical_hazardous_substances",title: "Chemicals & Hazardous Substances", description: "", weight: 0, icon: "FlaskConical", questions: [] },
  { id: "working_at_height",            title: "Working at Height",             description: "", weight: 0, icon: "ArrowUp",    questions: [] },
  { id: "psychosocial_stress",          title: "Psychosocial & Stress",         description: "", weight: 0, icon: "Brain",      questions: [] },
  { id: "display_screen_equipment",     title: "Display Screen Equipment",      description: "", weight: 0, icon: "Monitor",    questions: [] },
  { id: "custom",                       title: "Custom Hazard",                 description: "", weight: 0, icon: "Plus",       questions: [] },
];

export const RISK_BUILDER_TOOL: ToolModule = {
  id: "risk-builder",
  name: "Risk Assessment Builder",
  description:
    "Build a bespoke, audit-ready workplace risk assessment. Select hazard categories, rate likelihood and severity using the 5×5 risk matrix, assign control measures, and generate a formal compliance report.",
  icon: "AlertTriangle",
  version: "1.0.0",
  isBuilder: true, // Flag used by PlatformHome to launch the standalone builder UI
  categories: STUB_CATEGORIES,
  getRecommendations: () => [],
  getComplianceTemplate: () => ({
    country: "International",
    legislation: [],
    employerObligations: [],
    reportingNote: "",
  }),
};
