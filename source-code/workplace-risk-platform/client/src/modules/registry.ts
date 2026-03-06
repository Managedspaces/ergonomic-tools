/**
 * Platform Core — Tool Registry
 *
 * The registry is the single source of truth for all available assessment tools.
 * To add a new tool: create a new modules/[tool-name]/ folder, implement ToolModule,
 * and add it to the TOOL_REGISTRY array below.
 *
 * The platform shell reads this registry to render the tool selector.
 */

import type { ToolModule } from "@/lib/shared/types";
import { ERGONOMIC_TOOL } from "./ergonomic";
import { HOME_OFFICE_TOOL } from "./home-office";

export const TOOL_REGISTRY: ToolModule[] = [
  ERGONOMIC_TOOL,
  HOME_OFFICE_TOOL,
  // Future tools:
  // STRESS_TOOL,
  // RISK_BUILDER_TOOL,
];

export function getToolById(id: string): ToolModule | undefined {
  return TOOL_REGISTRY.find((t) => t.id === id);
}
