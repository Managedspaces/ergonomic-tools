/**
 * Risk Assessment Builder — Hazard Library
 *
 * Predefined hazard categories, common hazard examples, and suggested control measures.
 * Aligned with: ISO 45001, EU Framework Directive 89/391/EEC, HSA (IE), HSE (UK),
 * Safe Work Australia, SUVA (CH), DGUV (DE), Arbejdstilsynet (DK).
 *
 * Each HazardCategory contains:
 *   - id, title, icon, description
 *   - commonHazards: quick-select hazard descriptions
 *   - suggestedControls: pre-written control measures the user can select
 */

export interface HazardCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  commonHazards: string[];
  suggestedControls: string[];
}

export const HAZARD_LIBRARY: HazardCategory[] = [
  {
    id: "slips_trips_falls",
    title: "Slips, Trips & Falls",
    icon: "Footprints",
    description: "Hazards arising from floor surfaces, obstructions, and changes in level.",
    color: "amber",
    commonHazards: [
      "Wet or slippery floor surfaces",
      "Trailing cables or leads across walkways",
      "Uneven or damaged floor surfaces",
      "Obstructions in walkways or corridors",
      "Inadequate lighting in corridors or stairwells",
      "Unsecured floor mats or rugs",
      "Working at height on ladders or steps",
    ],
    suggestedControls: [
      "Display wet floor warning signs immediately when floors are wet",
      "Implement a cable management system to route cables away from walkways",
      "Repair or replace damaged floor surfaces promptly",
      "Maintain a clear walkway policy — all obstructions removed within 24 hours",
      "Ensure adequate lighting (minimum 100 lux) in all walkways and stairwells",
      "Secure all floor mats with non-slip backing or double-sided tape",
      "Implement a ladder safety policy and provide training",
      "Conduct regular housekeeping inspections (minimum weekly)",
    ],
  },
  {
    id: "manual_handling",
    title: "Manual Handling",
    icon: "Package",
    description: "Hazards from lifting, carrying, pushing, pulling, or moving loads.",
    color: "orange",
    commonHazards: [
      "Lifting heavy or awkward loads manually",
      "Repetitive lifting or carrying tasks",
      "Pushing or pulling heavy trolleys or equipment",
      "Working in awkward postures while handling loads",
      "Carrying loads over long distances",
      "Handling loads in confined spaces",
    ],
    suggestedControls: [
      "Provide mechanical handling aids (trolleys, pallet trucks, hoists) to eliminate manual lifting",
      "Redesign tasks to reduce the weight of individual loads",
      "Provide manual handling training to all employees who handle loads",
      "Implement a team lifting procedure for loads exceeding 25kg",
      "Adjust workstation heights to minimise awkward postures",
      "Rotate tasks to reduce repetitive manual handling",
      "Conduct a Manual Handling risk assessment for all high-risk tasks",
    ],
  },
  {
    id: "fire_safety",
    title: "Fire Safety",
    icon: "Flame",
    description: "Hazards relating to fire ignition, spread, and safe evacuation.",
    color: "red",
    commonHazards: [
      "Overloaded electrical sockets or damaged cables",
      "Combustible materials stored near heat sources",
      "Blocked or obstructed fire escape routes",
      "Inadequate or untested fire detection systems",
      "Absence of or expired fire extinguishers",
      "Inadequate fire warden coverage",
      "Flammable liquids or gases stored improperly",
    ],
    suggestedControls: [
      "Conduct annual Portable Appliance Testing (PAT) on all electrical equipment",
      "Store combustible materials in designated, ventilated areas away from ignition sources",
      "Conduct weekly checks to ensure all fire escape routes are clear and unobstructed",
      "Test fire detection and alarm systems weekly; service annually by a competent person",
      "Service and inspect all fire extinguishers annually; replace as required",
      "Appoint and train a sufficient number of fire wardens for each floor/area",
      "Store flammable liquids in approved, clearly labelled, locked metal cabinets",
      "Conduct fire evacuation drills at least annually",
    ],
  },
  {
    id: "electrical_safety",
    title: "Electrical Safety",
    icon: "Zap",
    description: "Hazards from electrical equipment, installations, and live systems.",
    color: "yellow",
    commonHazards: [
      "Damaged or frayed electrical cables",
      "Use of non-approved or counterfeit electrical equipment",
      "Electrical work carried out by unqualified persons",
      "Overloaded electrical circuits",
      "Electrical equipment used near water or in wet conditions",
      "Lack of Residual Current Device (RCD) protection",
    ],
    suggestedControls: [
      "Implement a Portable Appliance Testing (PAT) programme for all portable equipment",
      "Establish a procurement policy requiring all electrical equipment to carry CE/UKCA marking",
      "Ensure all fixed electrical installation work is carried out by a qualified electrician",
      "Install RCD protection on all circuits supplying portable equipment",
      "Prohibit the use of electrical equipment in wet or damp conditions unless specifically rated for it",
      "Implement a visual inspection regime for all electrical equipment before each use",
    ],
  },
  {
    id: "chemical_hazardous_substances",
    title: "Chemicals & Hazardous Substances",
    icon: "FlaskConical",
    description: "Hazards from exposure to harmful chemicals, fumes, dusts, or biological agents.",
    color: "purple",
    commonHazards: [
      "Exposure to cleaning chemicals or solvents",
      "Inhalation of dusts, fumes, or vapours",
      "Skin contact with corrosive or irritant substances",
      "Improper storage of hazardous substances",
      "Absence of Safety Data Sheets (SDS) for chemicals in use",
      "Inadequate ventilation in areas where chemicals are used",
    ],
    suggestedControls: [
      "Conduct a COSHH (Control of Substances Hazardous to Health) assessment for all chemicals in use",
      "Substitute hazardous substances with less harmful alternatives where possible",
      "Provide appropriate Personal Protective Equipment (PPE): gloves, eye protection, respirators",
      "Ensure adequate local exhaust ventilation (LEV) is installed and maintained",
      "Store all chemicals in their original, labelled containers in a locked, ventilated store",
      "Maintain a current Safety Data Sheet (SDS) register for all chemicals on site",
      "Provide training on safe handling, storage, and emergency procedures for all chemical users",
    ],
  },
  {
    id: "working_at_height",
    title: "Working at Height",
    icon: "ArrowUp",
    description: "Hazards from work activities performed above ground level.",
    color: "sky",
    commonHazards: [
      "Use of portable ladders for work tasks",
      "Working on flat or fragile roofs",
      "Use of mobile elevated work platforms (MEWPs)",
      "Working near unguarded edges or openings",
      "Falling objects from elevated work areas",
    ],
    suggestedControls: [
      "Avoid working at height wherever possible — use long-handled tools or adjustable workstations",
      "Use a hierarchy of controls: collective protection (scaffolding, guardrails) before personal protection (harnesses)",
      "Ensure all ladders are inspected before use and secured at the top and/or bottom",
      "Implement a permit-to-work system for all roof access",
      "Erect toe boards and debris nets to prevent falling objects",
      "Ensure all MEWP operators are trained and certified",
      "Conduct a pre-task risk assessment for every working-at-height activity",
    ],
  },
  {
    id: "psychosocial_stress",
    title: "Psychosocial & Stress",
    icon: "Brain",
    description: "Hazards arising from work organisation, relationships, and psychological demands.",
    color: "violet",
    commonHazards: [
      "Excessive workload or unrealistic deadlines",
      "Lack of role clarity or conflicting demands",
      "Bullying, harassment, or interpersonal conflict",
      "Lone working without adequate supervision or support",
      "Lack of management support or recognition",
      "Significant organisational change without adequate communication",
    ],
    suggestedControls: [
      "Conduct regular workload reviews between managers and employees",
      "Implement a Dignity at Work policy and provide training to all staff",
      "Establish a lone worker policy with regular check-in procedures",
      "Provide access to an Employee Assistance Programme (EAP) for all employees",
      "Train managers in mental health awareness and psychological first aid",
      "Implement a structured change management process with employee consultation",
      "Conduct regular psychosocial risk assessments using the HSE Management Standards framework",
    ],
  },
  {
    id: "display_screen_equipment",
    title: "Display Screen Equipment (DSE)",
    icon: "Monitor",
    description: "Hazards from prolonged use of computers, laptops, and other screens.",
    color: "blue",
    commonHazards: [
      "Poorly adjusted workstation causing neck or back strain",
      "Screen glare or reflections causing eye strain",
      "Prolonged sitting without adequate breaks",
      "Use of laptop as a primary workstation without peripherals",
      "Inadequate desk space causing awkward postures",
    ],
    suggestedControls: [
      "Conduct a DSE workstation assessment for all habitual display screen users",
      "Provide adjustable chairs, monitor arms, and ergonomic keyboards/mice",
      "Implement the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds",
      "Provide anti-glare screen filters or adjust monitor positioning to eliminate screen glare",
      "Provide a laptop stand and external keyboard/mouse for all laptop users",
      "Ensure all employees are aware of their entitlement to an eyesight test",
    ],
  },
  {
    id: "custom",
    title: "Custom Hazard",
    icon: "Plus",
    description: "Define a specific hazard not covered by the predefined categories above.",
    color: "gray",
    commonHazards: [],
    suggestedControls: [
      "Eliminate the hazard at source if possible",
      "Substitute the hazardous process or material with a safer alternative",
      "Implement engineering controls to isolate people from the hazard",
      "Implement administrative controls (safe systems of work, training, procedures)",
      "Provide appropriate Personal Protective Equipment (PPE) as a last resort",
      "Monitor and review the effectiveness of controls regularly",
    ],
  },
];

export function getHazardCategoryById(id: string): HazardCategory | undefined {
  return HAZARD_LIBRARY.find((h) => h.id === id);
}
