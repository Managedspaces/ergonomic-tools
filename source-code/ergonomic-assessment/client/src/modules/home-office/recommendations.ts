/**
 * Home Office Risk Assessment — Recommendations
 * Category-specific, risk-level-specific improvement guidance.
 */

import type { RiskRating } from "@/lib/shared/types";

const RECOMMENDATIONS: Record<string, Record<RiskRating, string[]>> = {
  workspace_environment: {
    low: [
      "Your workspace environment meets the required standards. Continue maintaining good lighting and ventilation.",
    ],
    moderate: [
      "Review your lighting setup — add a task lamp to reduce eye strain and shadows.",
      "If noise is a recurring issue, consider noise-cancelling headphones or acoustic panels.",
      "Ensure your workspace temperature remains comfortable; discuss heating/cooling costs with your employer.",
    ],
    high: [
      "Establish a dedicated workspace separated from relaxation areas to maintain work-life boundaries.",
      "Improve natural light access or invest in full-spectrum lighting to reduce fatigue.",
      "Address ventilation — open windows regularly or use an air purifier if ventilation is poor.",
      "Discuss workspace improvement allowances with your employer under your remote working policy.",
    ],
    critical: [
      "Your workspace environment poses significant health and productivity risks. Immediate action required.",
      "Working from a sofa or bed long-term causes serious musculoskeletal and psychological harm — establish a proper workspace.",
      "Report inadequate home working conditions to your manager or HR department.",
      "Contact your employer about a home office equipment allowance or alternative working arrangement.",
    ],
  },
  electrical_safety: {
    low: [
      "Your electrical setup is safe. Continue to inspect equipment periodically for signs of wear.",
    ],
    moderate: [
      "Schedule a visual inspection of all cables and equipment for wear or damage.",
      "Confirm with your employer whether PAT testing is required for employer-provided equipment.",
      "Replace any extension leads that are showing signs of age or heat damage.",
    ],
    high: [
      "Immediately stop using any equipment with damaged, frayed, or exposed cables.",
      "Do not daisy-chain extension leads — use a single surge-protected multi-socket instead.",
      "Request PAT testing of employer-provided equipment if not completed within the last 12 months.",
      "Ensure all sockets are not overloaded — high-power devices (heaters, monitors) should use separate circuits.",
    ],
    critical: [
      "Critical electrical hazards identified — stop using damaged equipment immediately.",
      "Exposed wiring or significantly damaged equipment must be replaced before further use.",
      "Report electrical safety concerns to your employer and, if necessary, a qualified electrician.",
      "Do not attempt to repair electrical equipment yourself — use a qualified professional.",
    ],
  },
  fire_safety: {
    low: [
      "Your fire safety measures are adequate. Continue testing smoke alarms monthly.",
    ],
    moderate: [
      "Test your smoke alarm this week and replace the battery if it has not been changed in the last year.",
      "Identify and clear your primary escape route from your workspace.",
      "Store paper and other flammable materials away from electrical equipment and heat sources.",
    ],
    high: [
      "Install a smoke alarm in or immediately adjacent to your workspace if one is not present.",
      "Ensure your escape route is always clear — never store items in hallways or near exits.",
      "Consider purchasing a small fire extinguisher or fire blanket for your home.",
      "Review your home insurance to ensure it covers home working activities.",
    ],
    critical: [
      "Critical fire safety deficiencies identified — immediate action required.",
      "The absence of a working smoke alarm is a life-safety issue — install one today.",
      "A blocked escape route is a serious risk — clear it immediately.",
      "Contact your employer about fire safety responsibilities for home workers under your jurisdiction.",
    ],
  },
  ergonomics: {
    low: [
      "Your ergonomic setup is good. Continue maintaining correct posture and monitor positioning.",
    ],
    moderate: [
      "If using a laptop, elevate it to eye level with a stand and connect an external keyboard and mouse.",
      "Ensure your chair provides adequate lumbar support — add a cushion if needed.",
      "Check your monitor distance — it should be approximately arm's length (50–70 cm) from your eyes.",
    ],
    high: [
      "Invest in or request an ergonomic chair with adjustable height, backrest, and armrests.",
      "Use a monitor stand or laptop riser to bring the screen to eye level.",
      "Connect an external keyboard and mouse to avoid awkward wrist and neck positions.",
      "Consider requesting a home office equipment allowance from your employer.",
    ],
    critical: [
      "Your home ergonomic setup poses a high risk of musculoskeletal injury. Immediate changes required.",
      "Working from a sofa or bed for extended periods causes serious spinal and postural damage.",
      "Contact your employer immediately — under most jurisdictions, employers are responsible for ensuring safe home workstations.",
      "Seek a physiotherapy or occupational health assessment if you are experiencing pain or discomfort.",
    ],
  },
  work_organisation: {
    low: [
      "Your work patterns are healthy. Continue maintaining clear boundaries and regular breaks.",
    ],
    moderate: [
      "Set a timer to remind yourself to take a 5-minute break every 45–60 minutes.",
      "Establish a clear end-of-day routine to signal the boundary between work and personal time.",
      "Discuss workload concerns with your manager before they become unmanageable.",
    ],
    high: [
      "Regularly working excessive hours is unsustainable and increases injury risk. Discuss workload with your manager.",
      "Use time-blocking techniques to structure your day and protect break times.",
      "Disable work notifications outside of contracted hours to protect personal time.",
      "Review your remote working agreement — many jurisdictions require employers to protect home workers from excessive hours.",
    ],
    critical: [
      "Your work organisation patterns are critically unhealthy and require immediate management intervention.",
      "Chronic overwork combined with poor home working conditions significantly increases both physical and mental health risks.",
      "Escalate workload concerns to HR or occupational health services.",
      "Review your rights under working time regulations in your jurisdiction.",
    ],
  },
  trip_hazards: {
    low: [
      "Your workspace is free from significant trip and fall hazards. Maintain this standard.",
    ],
    moderate: [
      "Secure trailing cables with cable clips, ties, or a cable management tray.",
      "Ensure loose rugs or mats are secured with non-slip backing or removed from the workspace.",
      "Keep walkways to your workspace clear of bags, boxes, and other obstructions.",
    ],
    high: [
      "Address trailing cables immediately — use cable management solutions or route cables along walls.",
      "Remove or secure all loose floor coverings in and around your workspace.",
      "Ensure adequate space around your workstation to move safely without risk of collision.",
      "Report flooring defects (loose tiles, torn carpet) to your landlord or property owner.",
    ],
    critical: [
      "Multiple significant trip and fall hazards identified — immediate remediation required.",
      "Trailing cables and obstructed walkways are a leading cause of home worker injuries.",
      "Your employer may be liable for injuries sustained in your home workspace — report hazards formally.",
      "Take photographs of hazards and report them to your employer in writing to create a record.",
    ],
  },
};

export function getHomeOfficeRecommendations(categoryId: string, rating: RiskRating): string[] {
  return RECOMMENDATIONS[categoryId]?.[rating] ?? [];
}
