/**
 * Home Office Risk Assessment Tool — Questionnaire
 * 6 categories · 30 scorable questions · Weighted scoring
 *
 * Categories:
 *   1. Workspace Environment     (weight 20%)
 *   2. Electrical Safety         (weight 18%)
 *   3. Fire Safety               (weight 17%)
 *   4. Ergonomics                (weight 20%)
 *   5. Work Organisation         (weight 13%)
 *   6. Trip & Fall Hazards       (weight 12%)
 */

import type { Category } from "@/lib/shared/types";

export const HOME_OFFICE_CATEGORIES: Category[] = [
  // ─── 1. Workspace Environment ─────────────────────────────────────────
  {
    id: "workspace_environment",
    title: "Workspace Environment",
    description: "Evaluates lighting, temperature, ventilation, noise, and dedicated workspace adequacy.",
    weight: 0.20,
    icon: "Home",
    questions: [
      {
        id: "ho_workspace_dedicated",
        text: "Do you have a dedicated workspace that is separate from your relaxation or sleeping areas?",
        type: "multiple_choice",
        required: true,
        weight: 1.5,
        helpText: "A dedicated workspace reduces distractions and supports a healthy work-life boundary.",
        options: [
          { value: "dedicated_room",    label: "Yes — a separate room used only for work",                          riskScore: 0 },
          { value: "dedicated_area",    label: "Yes — a designated area within a shared room",                      riskScore: 1 },
          { value: "shared_sometimes",  label: "Partially — I share the space with other activities",               riskScore: 3 },
          { value: "no_dedicated",      label: "No — I work from a sofa, bed, or dining table",                    riskScore: 5 },
        ],
      },
      {
        id: "ho_lighting",
        text: "How would you describe the natural and artificial lighting in your workspace?",
        type: "multiple_choice",
        required: true,
        weight: 1.5,
        helpText: "Good lighting reduces eye strain and fatigue. Avoid glare on screens.",
        options: [
          { value: "excellent",         label: "Excellent — good natural light, supplemented by adjustable task lighting", riskScore: 0 },
          { value: "adequate",          label: "Adequate — sufficient light with minor glare issues",                      riskScore: 1 },
          { value: "poor_glare",        label: "Poor — significant glare or shadows affecting my screen",                 riskScore: 3 },
          { value: "very_poor",         label: "Very poor — dim, flickering, or no natural light",                        riskScore: 5 },
        ],
      },
      {
        id: "ho_temperature",
        text: "Is the temperature in your workspace comfortable and controllable during working hours?",
        type: "yes_no",
        required: true,
        weight: 1.0,
        options: [
          { value: "yes",               label: "Yes — comfortable and I can adjust it",                            riskScore: 0 },
          { value: "mostly",            label: "Mostly — minor issues but manageable",                             riskScore: 1 },
          { value: "no_cold",           label: "No — too cold or draughty",                                        riskScore: 3 },
          { value: "no_hot",            label: "No — too hot or poorly ventilated",                                riskScore: 3 },
        ],
      },
      {
        id: "ho_ventilation",
        text: "Is your workspace adequately ventilated with fresh air?",
        type: "yes_no",
        required: true,
        weight: 1.0,
        options: [
          { value: "yes",               label: "Yes — good ventilation, windows can be opened",                    riskScore: 0 },
          { value: "partial",           label: "Partially — some ventilation but limited",                         riskScore: 2 },
          { value: "no",                label: "No — poor ventilation, stuffy or stale air",                       riskScore: 4 },
        ],
      },
      {
        id: "ho_noise",
        text: "How disruptive is the noise level in your home working environment?",
        type: "scale_rating",
        required: false,
        weight: 1.0,
        scaleLabels: { low: "Very disruptive", high: "Quiet and focused" },
      },
      {
        id: "ho_workspace_comment",
        text: "Any additional comments about your workspace environment?",
        type: "text_comment",
        required: false,
        weight: 0,
      },
    ],
  },

  // ─── 2. Electrical Safety ─────────────────────────────────────────────
  {
    id: "electrical_safety",
    title: "Electrical Safety",
    description: "Assesses electrical equipment condition, socket usage, and cable management.",
    weight: 0.18,
    icon: "Zap",
    questions: [
      {
        id: "ho_electrical_equipment",
        text: "Is all electrical equipment in your workspace (laptop, chargers, monitors) in good working condition with no visible damage?",
        type: "multiple_choice",
        required: true,
        weight: 2.0,
        helpText: "Damaged cables or equipment are a serious fire and electrocution risk.",
        options: [
          { value: "all_good",          label: "Yes — all equipment is undamaged and functioning correctly",        riskScore: 0 },
          { value: "minor_wear",        label: "Mostly — minor wear but no exposed wires or damage",               riskScore: 1 },
          { value: "some_damage",       label: "Some equipment shows signs of damage or fraying cables",           riskScore: 4 },
          { value: "significant",       label: "Significant damage present — exposed wires or broken equipment",   riskScore: 5 },
        ],
      },
      {
        id: "ho_sockets_overloaded",
        text: "Are you using extension leads or multi-socket adapters safely, without overloading them?",
        type: "multiple_choice",
        required: true,
        weight: 1.5,
        options: [
          { value: "no_extension",      label: "I plug directly into wall sockets — no extension leads needed",    riskScore: 0 },
          { value: "safe_use",          label: "I use extension leads appropriately, not overloaded",              riskScore: 0 },
          { value: "daisy_chain",       label: "I daisy-chain extension leads together",                           riskScore: 4 },
          { value: "overloaded",        label: "I have multiple high-power devices on a single extension",         riskScore: 5 },
        ],
      },
      {
        id: "ho_cables_managed",
        text: "Are cables in your workspace organised and secured to prevent tripping or damage?",
        type: "yes_no",
        required: true,
        weight: 1.0,
        options: [
          { value: "yes",               label: "Yes — cables are managed with clips, ties, or cable trays",        riskScore: 0 },
          { value: "mostly",            label: "Mostly — some loose cables but not a hazard",                      riskScore: 1 },
          { value: "no",                label: "No — cables are loose and could cause trips or damage",            riskScore: 4 },
        ],
      },
      {
        id: "ho_pat_tested",
        text: "Has your employer-provided electrical equipment been PAT tested or safety checked within the last 12 months?",
        type: "multiple_choice",
        required: false,
        weight: 1.0,
        options: [
          { value: "yes",               label: "Yes — recently tested",                                            riskScore: 0 },
          { value: "unsure",            label: "Unsure — I don't know",                                            riskScore: 2 },
          { value: "no",                label: "No — not tested",                                                  riskScore: 3 },
          { value: "own_equipment",     label: "I use my own equipment — employer has not provided any",           riskScore: 1 },
        ],
      },
      {
        id: "ho_electrical_comment",
        text: "Any additional comments about electrical safety?",
        type: "text_comment",
        required: false,
        weight: 0,
      },
    ],
  },

  // ─── 3. Fire Safety ───────────────────────────────────────────────────
  {
    id: "fire_safety",
    title: "Fire Safety",
    description: "Checks smoke alarms, fire escape routes, and fire hazard awareness in the home workspace.",
    weight: 0.17,
    icon: "Flame",
    questions: [
      {
        id: "ho_smoke_alarm",
        text: "Is there a working smoke alarm within or near your workspace that is tested regularly?",
        type: "multiple_choice",
        required: true,
        weight: 2.0,
        helpText: "Smoke alarms should be tested monthly and batteries replaced annually.",
        options: [
          { value: "yes_tested",        label: "Yes — tested within the last month",                               riskScore: 0 },
          { value: "yes_untested",      label: "Yes — present but not recently tested",                            riskScore: 2 },
          { value: "no_alarm",          label: "No smoke alarm in or near my workspace",                           riskScore: 5 },
          { value: "unsure",            label: "Unsure",                                                           riskScore: 3 },
        ],
      },
      {
        id: "ho_fire_escape",
        text: "Is there a clear and unobstructed escape route from your workspace in the event of a fire?",
        type: "yes_no",
        required: true,
        weight: 1.5,
        options: [
          { value: "yes",               label: "Yes — clear exit route always accessible",                         riskScore: 0 },
          { value: "mostly",            label: "Mostly — minor obstructions that could be cleared quickly",        riskScore: 2 },
          { value: "no",                label: "No — route is obstructed or I work in a basement/attic",           riskScore: 5 },
        ],
      },
      {
        id: "ho_flammable_materials",
        text: "Are flammable materials (paper, cardboard, fabrics) stored away from heat sources and electrical equipment?",
        type: "yes_no",
        required: true,
        weight: 1.5,
        options: [
          { value: "yes",               label: "Yes — flammable materials are stored safely",                      riskScore: 0 },
          { value: "mostly",            label: "Mostly — some materials near equipment but not a significant risk", riskScore: 2 },
          { value: "no",                label: "No — flammable materials are near heat sources or equipment",      riskScore: 5 },
        ],
      },
      {
        id: "ho_fire_extinguisher",
        text: "Do you have access to a fire extinguisher or fire blanket in your home?",
        type: "yes_no",
        required: false,
        weight: 1.0,
        options: [
          { value: "yes",               label: "Yes",                                                              riskScore: 0 },
          { value: "no",                label: "No",                                                               riskScore: 2 },
        ],
      },
      {
        id: "ho_fire_comment",
        text: "Any additional comments about fire safety?",
        type: "text_comment",
        required: false,
        weight: 0,
      },
    ],
  },

  // ─── 4. Ergonomics ────────────────────────────────────────────────────
  {
    id: "home_ergonomics",
    title: "Ergonomics",
    description: "Assesses desk, chair, monitor, keyboard, and posture setup in the home environment.",
    weight: 0.20,
    icon: "Monitor",
    questions: [
      {
        id: "ho_chair",
        text: "What type of chair do you use for home working?",
        type: "multiple_choice",
        required: true,
        weight: 2.0,
        helpText: "An adjustable chair with lumbar support is essential for prolonged desk work.",
        options: [
          { value: "ergonomic_full",    label: "Fully adjustable ergonomic office chair",                          riskScore: 0 },
          { value: "ergonomic_basic",   label: "Basic office chair with some adjustment",                          riskScore: 1 },
          { value: "dining_chair",      label: "Dining or kitchen chair (non-adjustable)",                         riskScore: 3 },
          { value: "sofa_bed",          label: "Sofa, armchair, or bed",                                           riskScore: 5 },
        ],
      },
      {
        id: "ho_desk",
        text: "What surface do you primarily use as a desk?",
        type: "multiple_choice",
        required: true,
        weight: 1.5,
        options: [
          { value: "adjustable_desk",   label: "Height-adjustable standing desk",                                  riskScore: 0 },
          { value: "fixed_desk",        label: "Fixed-height office or computer desk",                             riskScore: 1 },
          { value: "dining_table",      label: "Dining or kitchen table",                                          riskScore: 2 },
          { value: "coffee_table",      label: "Coffee table, lap tray, or bed",                                   riskScore: 5 },
        ],
      },
      {
        id: "ho_monitor_position",
        text: "Is your monitor or laptop screen positioned at approximately eye level and arm's length away?",
        type: "multiple_choice",
        required: true,
        weight: 1.5,
        helpText: "The top of the screen should be at or just below eye level, 50–70 cm away.",
        options: [
          { value: "correct",           label: "Yes — screen is at eye level and correct distance",                riskScore: 0 },
          { value: "slightly_off",      label: "Slightly off — minor adjustments needed",                          riskScore: 1 },
          { value: "too_low",           label: "Screen is too low — I look down significantly",                    riskScore: 3 },
          { value: "laptop_flat",       label: "Laptop flat on desk with no stand or external monitor",            riskScore: 5 },
        ],
      },
      {
        id: "ho_keyboard_mouse",
        text: "Do you use an external keyboard and mouse when working at a laptop?",
        type: "multiple_choice",
        required: false,
        weight: 1.0,
        options: [
          { value: "external_both",     label: "Yes — external keyboard and mouse",                                riskScore: 0 },
          { value: "external_one",      label: "One of the two — keyboard or mouse only",                          riskScore: 2 },
          { value: "laptop_only",       label: "No — I use the laptop keyboard and trackpad",                      riskScore: 4 },
          { value: "desktop",           label: "Not applicable — I use a desktop computer",                        riskScore: 0 },
        ],
      },
      {
        id: "ho_posture_awareness",
        text: "How would you rate your awareness and maintenance of good posture during the working day?",
        type: "scale_rating",
        required: true,
        weight: 1.5,
        scaleLabels: { low: "Poor — I rarely think about posture", high: "Excellent — I maintain good posture consistently" },
      },
      {
        id: "ho_ergonomics_comment",
        text: "Any additional comments about your ergonomic setup?",
        type: "text_comment",
        required: false,
        weight: 0,
      },
    ],
  },

  // ─── 5. Work Organisation ─────────────────────────────────────────────
  {
    id: "work_organisation",
    title: "Work Organisation",
    description: "Evaluates working hours, break patterns, workload management, and work-life boundaries.",
    weight: 0.13,
    icon: "Clock",
    questions: [
      {
        id: "ho_working_hours",
        text: "Do you work within your contracted hours and avoid regular excessive overtime?",
        type: "multiple_choice",
        required: true,
        weight: 1.5,
        options: [
          { value: "within_hours",      label: "Yes — I consistently work within contracted hours",                riskScore: 0 },
          { value: "occasional_over",   label: "Occasionally over — 1–2 hours extra per week",                    riskScore: 1 },
          { value: "regular_over",      label: "Regularly over — 3–5 hours extra per week",                       riskScore: 3 },
          { value: "excessive",         label: "Excessively over — more than 5 hours extra per week",              riskScore: 5 },
        ],
      },
      {
        id: "ho_breaks",
        text: "Do you take regular screen breaks during the working day (at least every 60 minutes)?",
        type: "multiple_choice",
        required: true,
        weight: 1.5,
        options: [
          { value: "regular_breaks",    label: "Yes — I take breaks every 30–60 minutes",                         riskScore: 0 },
          { value: "occasional",        label: "Sometimes — I take breaks but not consistently",                   riskScore: 2 },
          { value: "rarely",            label: "Rarely — I often work for 2+ hours without a break",              riskScore: 4 },
          { value: "never",             label: "Never — I work through without breaks",                            riskScore: 5 },
        ],
      },
      {
        id: "ho_work_life_boundary",
        text: "Are you able to maintain a clear boundary between work and personal time when working from home?",
        type: "scale_rating",
        required: true,
        weight: 1.0,
        scaleLabels: { low: "No boundary — work bleeds into all hours", high: "Clear boundary — I switch off at end of day" },
      },
      {
        id: "ho_workload",
        text: "Is your workload manageable and clearly defined when working from home?",
        type: "multiple_choice",
        required: false,
        weight: 1.0,
        options: [
          { value: "manageable",        label: "Yes — workload is clear and manageable",                           riskScore: 0 },
          { value: "mostly",            label: "Mostly — occasional peaks but generally manageable",               riskScore: 1 },
          { value: "often_heavy",       label: "Often too heavy — I regularly feel overwhelmed",                   riskScore: 3 },
          { value: "unmanageable",      label: "Consistently unmanageable",                                        riskScore: 5 },
        ],
      },
      {
        id: "ho_work_org_comment",
        text: "Any additional comments about work organisation or workload?",
        type: "text_comment",
        required: false,
        weight: 0,
      },
    ],
  },

  // ─── 6. Trip & Fall Hazards ───────────────────────────────────────────
  {
    id: "trip_fall_hazards",
    title: "Trip & Fall Hazards",
    description: "Identifies floor hazards, obstructions, and physical safety risks in the home workspace.",
    weight: 0.12,
    icon: "AlertTriangle",
    questions: [
      {
        id: "ho_floor_hazards",
        text: "Is your workspace free from trailing cables, loose rugs, or other floor-level trip hazards?",
        type: "multiple_choice",
        required: true,
        weight: 2.0,
        helpText: "Trailing cables and loose floor coverings are a leading cause of workplace trips.",
        options: [
          { value: "clear",             label: "Yes — floor is clear and free from hazards",                       riskScore: 0 },
          { value: "mostly_clear",      label: "Mostly — minor hazards that could be easily resolved",             riskScore: 1 },
          { value: "some_hazards",      label: "Some hazards present — cables or rugs that could cause trips",     riskScore: 3 },
          { value: "many_hazards",      label: "Many hazards present — significant trip risk",                     riskScore: 5 },
        ],
      },
      {
        id: "ho_walkways",
        text: "Are the walkways and access routes to your workspace clear and unobstructed?",
        type: "yes_no",
        required: true,
        weight: 1.5,
        options: [
          { value: "yes",               label: "Yes — all walkways are clear",                                     riskScore: 0 },
          { value: "mostly",            label: "Mostly — minor obstructions that are not a significant risk",      riskScore: 1 },
          { value: "no",                label: "No — obstructions that could cause trips or falls",                riskScore: 4 },
        ],
      },
      {
        id: "ho_adequate_space",
        text: "Do you have adequate space around your workstation to move freely and safely?",
        type: "yes_no",
        required: true,
        weight: 1.0,
        options: [
          { value: "yes",               label: "Yes — sufficient space to move and adjust position",               riskScore: 0 },
          { value: "limited",           label: "Limited — cramped but manageable",                                 riskScore: 2 },
          { value: "no",                label: "No — very cramped with no room to move safely",                    riskScore: 4 },
        ],
      },
      {
        id: "ho_flooring",
        text: "Is the flooring in your workspace stable and in good condition (no loose tiles, torn carpet, or uneven surfaces)?",
        type: "yes_no",
        required: false,
        weight: 1.0,
        options: [
          { value: "yes",               label: "Yes — flooring is in good condition",                              riskScore: 0 },
          { value: "minor_issues",      label: "Minor issues — some wear but not a hazard",                        riskScore: 1 },
          { value: "poor",              label: "Poor condition — loose, torn, or uneven flooring",                 riskScore: 4 },
        ],
      },
      {
        id: "ho_trip_comment",
        text: "Any additional comments about trip or fall hazards?",
        type: "text_comment",
        required: false,
        weight: 0,
      },
    ],
  },
];

export const HOME_OFFICE_SCORABLE_QUESTIONS = HOME_OFFICE_CATEGORIES.reduce(
  (sum, cat) => sum + cat.questions.filter((q) => q.type !== "text_comment").length,
  0
);
