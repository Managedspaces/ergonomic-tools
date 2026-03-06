/**
 * Home Office Risk Assessment Tool — Questionnaire
 * Authored by OHS Expert for international remote work compliance.
 * 6 categories · 30 scorable questions · Weighted scoring
 *
 * Categories:
 *   1. Workspace Environment     (weight 15%)
 *   2. Electrical Safety         (weight 15%)
 *   3. Fire Safety               (weight 15%)
 *   4. Ergonomics                (weight 25%)
 *   5. Work Organisation         (weight 15%)
 *   6. Trip & Fall Hazards       (weight 15%)
 */

import type { Category } from "@/lib/shared/types";

export const HOME_OFFICE_CATEGORIES: Category[] = [
  // ─── 1. Workspace Environment ─────────────────────────────────────────
  {
    id: "workspace_environment",
    title: "Workspace Environment",
    description: "Evaluates lighting, temperature, ventilation, noise, and dedicated workspace adequacy.",
    weight: 0.15,
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
          { value: "no",                label: "No — it is frequently too hot, too cold, or draughty",             riskScore: 4 },
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
          { value: "no",                label: "No — poor ventilation, stuffy or stale air",                       riskScore: 4 },
        ],
      },
      {
        id: "ho_noise",
        text: "How disruptive is the noise level in your home working environment?",
        type: "scale_rating",
        required: true,
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
    weight: 0.15,
    icon: "Zap",
    questions: [
      {
        id: "ho_elec_cables",
        text: "Are all electrical cables and plugs associated with your work equipment free from damage (e.g., no frayed wires or cracked casings)?",
        type: "yes_no",
        required: true,
        weight: 2.0,
        helpText: "Damaged cables are a severe fire and electrocution hazard.",
        options: [
          { value: "yes", label: "Yes — all cables and plugs are in good condition", riskScore: 0 },
          { value: "no",  label: "No — there is visible damage to cables or plugs",  riskScore: 5 },
        ],
      },
      {
        id: "ho_elec_sockets",
        text: "Are your electrical sockets overloaded with multiple adaptors or daisy-chained extension leads?",
        type: "yes_no",
        required: true,
        weight: 2.0,
        helpText: "Daisy-chaining (plugging one extension lead into another) can overload the socket and cause a fire.",
        options: [
          { value: "no",  label: "No — sockets are not overloaded",                                    riskScore: 0 },
          { value: "yes", label: "Yes — I use multiple adaptors or daisy-chained extension leads",     riskScore: 5 },
        ],
      },
      {
        id: "ho_elec_liquids",
        text: "Are all electrical items kept away from liquids and sources of moisture?",
        type: "yes_no",
        required: true,
        weight: 1.5,
        options: [
          { value: "yes", label: "Yes — liquids are kept away from electrical equipment", riskScore: 0 },
          { value: "no",  label: "No — drinks or liquids are regularly placed near electrical equipment", riskScore: 4 },
        ],
      },
      {
        id: "ho_elec_ventilation",
        text: "Is there adequate ventilation around your electrical equipment (e.g., laptops, monitors) to prevent overheating?",
        type: "yes_no",
        required: true,
        weight: 1.0,
        options: [
          { value: "yes", label: "Yes — equipment is well-ventilated and not covered", riskScore: 0 },
          { value: "no",  label: "No — equipment is enclosed or placed on soft furnishings (e.g., bed) that block vents", riskScore: 4 },
        ],
      },
      {
        id: "ho_elec_testing",
        text: "If your employer provided electrical equipment, has it been visually inspected or PAT tested within the last 12 months?",
        type: "multiple_choice",
        required: true,
        weight: 1.0,
        options: [
          { value: "yes",       label: "Yes — it has been tested or visually inspected", riskScore: 0 },
          { value: "not_sure",  label: "I'm not sure",                                   riskScore: 2 },
          { value: "no",        label: "No — it has not been tested or inspected",       riskScore: 4 },
          { value: "na",        label: "N/A — I use my own equipment",                   riskScore: 0 },
        ],
      },
      {
        id: "ho_elec_comment",
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
    description: "Evaluates fire detection, escape routes, and hazard management.",
    weight: 0.15,
    icon: "Flame",
    questions: [
      {
        id: "ho_fire_alarms",
        text: "Are there working smoke alarms installed in your home, and are they tested regularly?",
        type: "multiple_choice",
        required: true,
        weight: 2.0,
        helpText: "Working smoke alarms are critical for early fire detection.",
        options: [
          { value: "yes_tested", label: "Yes — installed and tested regularly", riskScore: 0 },
          { value: "yes_untested", label: "Yes — installed but rarely/never tested", riskScore: 3 },
          { value: "no", label: "No — there are no working smoke alarms", riskScore: 5 },
        ],
      },
      {
        id: "ho_fire_escape",
        text: "Is your primary escape route from your workspace clear of obstructions?",
        type: "yes_no",
        required: true,
        weight: 2.0,
        options: [
          { value: "yes", label: "Yes — the escape route is completely clear", riskScore: 0 },
          { value: "no",  label: "No — there are items blocking the escape route", riskScore: 5 },
        ],
      },
      {
        id: "ho_fire_heaters",
        text: "If you use portable heaters, are they kept clear of combustible materials (e.g., curtains, paper, clothing)?",
        type: "multiple_choice",
        required: true,
        weight: 1.5,
        options: [
          { value: "na", label: "N/A — I do not use portable heaters", riskScore: 0 },
          { value: "yes", label: "Yes — they are kept well clear of combustibles", riskScore: 0 },
          { value: "no", label: "No — they are sometimes placed near combustible materials", riskScore: 5 },
        ],
      },
      {
        id: "ho_fire_charging",
        text: "Do you leave electronic devices (laptops, phones) charging unattended overnight or on soft surfaces (beds, sofas)?",
        type: "yes_no",
        required: true,
        weight: 1.5,
        options: [
          { value: "no",  label: "No — I charge them safely on hard surfaces while awake", riskScore: 0 },
          { value: "yes", label: "Yes — I sometimes leave them charging unattended or on soft surfaces", riskScore: 4 },
        ],
      },
      {
        id: "ho_fire_plan",
        text: "Do you know what to do and how to exit your home safely in the event of a fire?",
        type: "scale_rating",
        required: true,
        weight: 1.0,
        scaleLabels: { low: "Not sure", high: "Fully prepared" },
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
    id: "ergonomics",
    title: "Ergonomics",
    description: "Assesses workstation setup, posture, and equipment suitability.",
    weight: 0.25,
    icon: "User",
    questions: [
      {
        id: "ho_ergo_chair",
        text: "What type of chair do you use for your home workstation?",
        type: "multiple_choice",
        required: true,
        weight: 2.0,
        helpText: "An adjustable ergonomic chair is essential for supporting your spine during long periods of work.",
        options: [
          { value: "ergonomic", label: "Fully adjustable ergonomic office chair (height, backrest, armrests)", riskScore: 0 },
          { value: "basic_office", label: "Basic office chair (height adjustable only)", riskScore: 2 },
          { value: "dining", label: "Dining chair or rigid non-office chair", riskScore: 4 },
          { value: "sofa_bed", label: "Sofa, bed, or soft armchair", riskScore: 5 },
        ],
      },
      {
        id: "ho_ergo_monitor",
        text: "Is the top of your screen(s) roughly at eye level, and placed about an arm's length away?",
        type: "yes_no",
        required: true,
        weight: 1.5,
        options: [
          { value: "yes", label: "Yes — screen is at the correct height and distance", riskScore: 0 },
          { value: "no",  label: "No — I have to look down or lean forward to see the screen", riskScore: 4 },
        ],
      },
      {
        id: "ho_ergo_laptop",
        text: "If you use a laptop, do you use a separate keyboard and mouse along with a laptop stand/riser?",
        type: "multiple_choice",
        required: true,
        weight: 2.0,
        options: [
          { value: "desktop", label: "N/A — I use a desktop computer", riskScore: 0 },
          { value: "full_setup", label: "Yes — I use a stand, separate keyboard, and separate mouse", riskScore: 0 },
          { value: "partial_setup", label: "I use some external peripherals, but not all", riskScore: 3 },
          { value: "laptop_only", label: "No — I work directly on the laptop keyboard and trackpad", riskScore: 5 },
        ],
      },
      {
        id: "ho_ergo_posture",
        text: "When sitting at your desk, are your feet flat on the floor (or on a footrest) and your thighs roughly parallel to the floor?",
        type: "yes_no",
        required: true,
        weight: 1.5,
        options: [
          { value: "yes", label: "Yes — my feet are supported and thighs are parallel", riskScore: 0 },
          { value: "no",  label: "No — my feet dangle or my knees are raised too high", riskScore: 4 },
        ],
      },
      {
        id: "ho_ergo_pain",
        text: "How often do you experience physical discomfort (e.g., back pain, neck ache, eye strain) while working from home?",
        type: "scale_rating",
        required: true,
        weight: 2.0,
        scaleLabels: { low: "Frequently", high: "Rarely / Never" },
      },
      {
        id: "ho_ergo_comment",
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
    description: "Evaluates working hours, breaks, and psychosocial well-being.",
    weight: 0.15,
    icon: "Clock",
    questions: [
      {
        id: "ho_org_breaks",
        text: "Do you take regular short breaks away from your screen (e.g., 5-10 minutes every hour)?",
        type: "multiple_choice",
        required: true,
        weight: 1.5,
        helpText: "Regular screen breaks prevent eye strain and musculoskeletal issues.",
        options: [
          { value: "regular", label: "Yes — I take regular breaks away from the screen", riskScore: 0 },
          { value: "infrequent", label: "Sometimes — but I often forget or work through them", riskScore: 3 },
          { value: "rare", label: "Rarely — I stay at my screen for several hours at a time", riskScore: 5 },
        ],
      },
      {
        id: "ho_org_hours",
        text: "Are you able to disconnect and stop working at the end of your scheduled working hours?",
        type: "yes_no",
        required: true,
        weight: 1.5,
        options: [
          { value: "yes", label: "Yes — I maintain clear boundaries between work and personal time", riskScore: 0 },
          { value: "no",  label: "No — I frequently work late or check emails outside of hours", riskScore: 4 },
        ],
      },
      {
        id: "ho_org_support",
        text: "Do you feel adequately supported by your manager and team while working remotely?",
        type: "scale_rating",
        required: true,
        weight: 1.0,
        scaleLabels: { low: "Unsupported", high: "Well supported" },
      },
      {
        id: "ho_org_isolation",
        text: "How often do you feel isolated or disconnected from your colleagues?",
        type: "scale_rating",
        required: true,
        weight: 1.0,
        scaleLabels: { low: "Frequently", high: "Rarely / Never" },
      },
      {
        id: "ho_org_workload",
        text: "Is your workload manageable within your normal working hours?",
        type: "yes_no",
        required: true,
        weight: 1.5,
        options: [
          { value: "yes", label: "Yes — my workload is generally manageable", riskScore: 0 },
          { value: "no",  label: "No — I have too much work to complete in standard hours", riskScore: 4 },
        ],
      },
      {
        id: "ho_org_comment",
        text: "Any additional comments about your work organisation or well-being?",
        type: "text_comment",
        required: false,
        weight: 0,
      },
    ],
  },

  // ─── 6. Trip & Fall Hazards ───────────────────────────────────────────
  {
    id: "trip_hazards",
    title: "Trip & Fall Hazards",
    description: "Assesses the physical safety of the workspace regarding slips, trips, and falls.",
    weight: 0.15,
    icon: "AlertTriangle",
    questions: [
      {
        id: "ho_trip_cables",
        text: "Are trailing cables securely routed away from walkways to prevent tripping?",
        type: "yes_no",
        required: true,
        weight: 2.0,
        helpText: "Cables crossing walkways are a leading cause of home office injuries.",
        options: [
          { value: "yes", label: "Yes — cables are secured and out of the way", riskScore: 0 },
          { value: "no",  label: "No — there are loose cables in areas where I walk", riskScore: 5 },
        ],
      },
      {
        id: "ho_trip_clutter",
        text: "Is the floor area around your workstation clear of clutter, boxes, and other obstacles?",
        type: "yes_no",
        required: true,
        weight: 1.5,
        options: [
          { value: "yes", label: "Yes — the floor area is clear", riskScore: 0 },
          { value: "no",  label: "No — there is clutter that could cause a trip", riskScore: 4 },
        ],
      },
      {
        id: "ho_trip_flooring",
        text: "Are the floor coverings in your workspace (e.g., rugs, carpets) secure and free from curling edges or tears?",
        type: "yes_no",
        required: true,
        weight: 1.0,
        options: [
          { value: "yes", label: "Yes — flooring is secure and flat", riskScore: 0 },
          { value: "no",  label: "No — there are loose rugs or damaged flooring", riskScore: 3 },
        ],
      },
      {
        id: "ho_trip_lighting",
        text: "Is the lighting sufficient in walkways leading to and from your workspace (e.g., stairs, hallways) to see hazards clearly?",
        type: "yes_no",
        required: true,
        weight: 1.0,
        options: [
          { value: "yes", label: "Yes — walkways are well lit", riskScore: 0 },
          { value: "no",  label: "No — walkways are dim or poorly lit", riskScore: 4 },
        ],
      },
      {
        id: "ho_trip_spills",
        text: "Are you proactive in immediately cleaning up any liquid spills in or around your workspace?",
        type: "scale_rating",
        required: true,
        weight: 1.0,
        scaleLabels: { low: "Rarely", high: "Always" },
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
