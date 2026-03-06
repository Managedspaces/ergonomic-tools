/**
 * Psychosocial / Stress & Workload Risk Assessment — Questionnaire
 * Tool #3 in the Workplace Risk Platform.
 *
 * Aligned with: EU Framework Directive 89/391/EEC, HSE Management Standards,
 * ISO 45003 (Psychological Safety at Work), and national legislation for
 * IE, UK, DE, CH, DK, AU.
 *
 * Scoring: 0–3 per question (0 = low risk, 3 = critical risk)
 * Categories:
 *   1. Workload & Deadlines         (weight 25%)
 *   2. Role Clarity & Support       (weight 20%)
 *   3. Work Environment & Culture   (weight 20%)
 *   4. Work-Life Balance            (weight 15%)
 *   5. Employee Wellbeing           (weight 20%)
 */

import type { Category } from "@/lib/shared/types";

export const PSYCHOSOCIAL_CATEGORIES: Category[] = [
  // ─── 1. Workload & Deadlines ──────────────────────────────────────────
  {
    id: "workload_deadlines",
    title: "Workload & Deadlines",
    description: "Assesses the volume, pace, and time pressure of your work.",
    weight: 0.25,
    icon: "Clock",
    questions: [
      {
        id: "ps_workload_unachievable",
        text: "How often do you feel you have an unmanageable workload or unachievable deadlines?",
        type: "scale_rating",
        required: true,
        weight: 2.0,
        helpText: "Consider your typical week, not just unusually busy periods.",
        scaleLabels: { low: "Always", high: "Never" },
      },
      {
        id: "ps_workload_overtime",
        text: "Do you have to work outside your contracted hours to complete your normal duties?",
        type: "multiple_choice",
        required: true,
        weight: 2.0,
        options: [
          { value: "rarely",      label: "Rarely or never",                          riskScore: 0 },
          { value: "monthly",     label: "Sometimes — a few times a month",           riskScore: 1 },
          { value: "weekly",      label: "Frequently — most weeks",                   riskScore: 2 },
          { value: "daily",       label: "Almost always — most days",                 riskScore: 3 },
        ],
      },
      {
        id: "ps_workload_time",
        text: "Are you given enough time to complete your tasks to a standard you are satisfied with?",
        type: "yes_no",
        required: true,
        weight: 1.5,
        options: [
          { value: "yes", label: "Yes — I have sufficient time to do my work well",  riskScore: 0 },
          { value: "no",  label: "No — I rarely have enough time",                   riskScore: 3 },
        ],
      },
      {
        id: "ps_workload_rushed",
        text: "How often do you feel rushed or under pressure for time while working?",
        type: "scale_rating",
        required: true,
        weight: 1.5,
        scaleLabels: { low: "Always", high: "Never" },
      },
      {
        id: "ps_workload_comment",
        text: "Any additional comments about your workload or deadlines?",
        type: "text_comment",
        required: false,
        weight: 0,
      },
    ],
  },

  // ─── 2. Role Clarity & Support ────────────────────────────────────────
  {
    id: "role_clarity_support",
    title: "Role Clarity & Support",
    description: "Evaluates how clearly your role is defined and how supported you feel.",
    weight: 0.20,
    icon: "User",
    questions: [
      {
        id: "ps_role_clear",
        text: "Are you clear about what is expected of you in your role?",
        type: "yes_no",
        required: true,
        weight: 1.5,
        helpText: "This includes your responsibilities, priorities, and performance expectations.",
        options: [
          { value: "yes", label: "Yes — my role and responsibilities are clearly defined", riskScore: 0 },
          { value: "no",  label: "No — I am often unsure what is expected of me",          riskScore: 3 },
        ],
      },
      {
        id: "ps_role_conflict",
        text: "How often do you receive conflicting demands or instructions from different managers or stakeholders?",
        type: "scale_rating",
        required: true,
        weight: 1.5,
        scaleLabels: { low: "Always", high: "Never" },
      },
      {
        id: "ps_role_manager_support",
        text: "If you are struggling with a task or feeling stressed, how comfortable do you feel raising this with your manager?",
        type: "multiple_choice",
        required: true,
        weight: 2.0,
        options: [
          { value: "very_comfortable",   label: "Very comfortable — I feel fully supported",             riskScore: 0 },
          { value: "somewhat",           label: "Somewhat comfortable — I would raise it if serious",    riskScore: 1 },
          { value: "uncomfortable",      label: "Uncomfortable — I would hesitate to raise it",          riskScore: 2 },
          { value: "very_uncomfortable", label: "Very uncomfortable — I would not raise it",             riskScore: 3 },
        ],
      },
      {
        id: "ps_role_resources",
        text: "Do you have the necessary resources, training, and equipment to do your job effectively?",
        type: "yes_no",
        required: true,
        weight: 1.5,
        options: [
          { value: "yes", label: "Yes — I have everything I need",                       riskScore: 0 },
          { value: "no",  label: "No — I am missing resources, training, or equipment",  riskScore: 2 },
        ],
      },
      {
        id: "ps_role_comment",
        text: "Any additional comments about your role clarity or the support you receive?",
        type: "text_comment",
        required: false,
        weight: 0,
      },
    ],
  },

  // ─── 3. Work Environment & Culture ────────────────────────────────────
  {
    id: "work_environment_culture",
    title: "Work Environment & Culture",
    description: "Assesses psychological safety, team relationships, and how change is managed.",
    weight: 0.20,
    icon: "Shield",
    questions: [
      {
        id: "ps_env_relationships",
        text: "How would you rate the quality of relationships and teamwork within your immediate team?",
        type: "scale_rating",
        required: true,
        weight: 1.5,
        helpText: "Consider trust, respect, and how well people collaborate.",
        scaleLabels: { low: "Very poor", high: "Excellent" },
      },
      {
        id: "ps_env_bullying",
        text: "Have you experienced or witnessed bullying, harassment, or unacceptable behaviour in your workplace in the last 6 months?",
        type: "yes_no",
        required: true,
        weight: 2.0,
        helpText: "This includes in-person, remote, or digital communications.",
        options: [
          { value: "no",  label: "No — I have not experienced or witnessed this",  riskScore: 0 },
          { value: "yes", label: "Yes — I have experienced or witnessed this",      riskScore: 3 },
        ],
      },
      {
        id: "ps_env_change",
        text: "When organisational changes occur (e.g., restructuring, new processes), how well are they communicated and managed?",
        type: "multiple_choice",
        required: true,
        weight: 1.5,
        options: [
          { value: "effectively",  label: "Effectively — changes are well communicated in advance",   riskScore: 0 },
          { value: "adequately",   label: "Adequately — communication could be improved",             riskScore: 1 },
          { value: "poorly",       label: "Poorly — changes are often sprung on us",                  riskScore: 2 },
          { value: "not_at_all",   label: "Not at all — we are rarely informed of changes",           riskScore: 3 },
        ],
      },
      {
        id: "ps_env_voice",
        text: "Do you feel your opinions and suggestions are listened to and valued by management?",
        type: "yes_no",
        required: true,
        weight: 1.5,
        options: [
          { value: "yes", label: "Yes — I feel heard and valued",                     riskScore: 0 },
          { value: "no",  label: "No — my input is rarely acknowledged or acted upon", riskScore: 2 },
        ],
      },
      {
        id: "ps_env_comment",
        text: "Any additional comments about your work environment or team culture?",
        type: "text_comment",
        required: false,
        weight: 0,
      },
    ],
  },

  // ─── 4. Work-Life Balance ─────────────────────────────────────────────
  {
    id: "work_life_balance",
    title: "Work-Life Balance",
    description: "Evaluates boundaries, rest, and the ability to disconnect from work.",
    weight: 0.15,
    icon: "Home",
    questions: [
      {
        id: "ps_wlb_disconnect",
        text: "Are you able to fully disconnect from work communications (emails, messages) outside of your working hours?",
        type: "yes_no",
        required: true,
        weight: 2.0,
        helpText: "Consider whether you feel obligated to respond to work messages in the evenings or at weekends.",
        options: [
          { value: "yes", label: "Yes — I can fully switch off outside of work hours",                     riskScore: 0 },
          { value: "no",  label: "No — I feel I must remain available outside of contracted hours",        riskScore: 3 },
        ],
      },
      {
        id: "ps_wlb_leave_contact",
        text: "How often are you contacted by your manager or colleagues during your annual leave or rest days?",
        type: "multiple_choice",
        required: true,
        weight: 1.5,
        options: [
          { value: "never",      label: "Never",                                      riskScore: 0 },
          { value: "rarely",     label: "Rarely — only in genuine emergencies",       riskScore: 1 },
          { value: "sometimes",  label: "Sometimes — a few times per leave period",   riskScore: 2 },
          { value: "frequently", label: "Frequently — I am regularly contacted",      riskScore: 3 },
        ],
      },
      {
        id: "ps_wlb_breaks",
        text: "Do you take your full entitlement of rest breaks (e.g., a proper lunch break) during your working day?",
        type: "yes_no",
        required: true,
        weight: 1.5,
        options: [
          { value: "yes", label: "Yes — I take regular breaks away from my work",       riskScore: 0 },
          { value: "no",  label: "No — I often skip breaks or eat at my desk",          riskScore: 2 },
        ],
      },
      {
        id: "ps_wlb_personal",
        text: "How effectively do your working hours allow you to manage your personal and family commitments?",
        type: "scale_rating",
        required: true,
        weight: 1.5,
        scaleLabels: { low: "Very poorly", high: "Very effectively" },
      },
      {
        id: "ps_wlb_comment",
        text: "Any additional comments about your work-life balance?",
        type: "text_comment",
        required: false,
        weight: 0,
      },
    ],
  },

  // ─── 5. Employee Wellbeing ────────────────────────────────────────────
  {
    id: "employee_wellbeing",
    title: "Employee Wellbeing",
    description: "Assesses the physical and emotional impact of work on your overall health.",
    weight: 0.20,
    icon: "Brain",
    questions: [
      {
        id: "ps_wellbeing_exhaustion",
        text: "Over the last month, how often have you felt emotionally drained or exhausted by your work?",
        type: "scale_rating",
        required: true,
        weight: 2.0,
        helpText: "Emotional exhaustion is a key indicator of work-related burnout.",
        scaleLabels: { low: "Always", high: "Never" },
      },
      {
        id: "ps_wellbeing_sleep",
        text: "Has work-related stress negatively impacted your sleep quality recently?",
        type: "multiple_choice",
        required: true,
        weight: 2.0,
        options: [
          { value: "never",      label: "Never — my sleep is not affected by work",                riskScore: 0 },
          { value: "rarely",     label: "Rarely — occasionally I find it hard to switch off",      riskScore: 1 },
          { value: "frequently", label: "Frequently — work stress regularly disrupts my sleep",    riskScore: 2 },
          { value: "every_night",label: "Almost every night — I struggle to sleep due to work",   riskScore: 3 },
        ],
      },
      {
        id: "ps_wellbeing_mental_health",
        text: "Do you feel that your work is having a negative impact on your overall mental health?",
        type: "yes_no",
        required: true,
        weight: 2.0,
        options: [
          { value: "no",  label: "No — my work does not negatively affect my mental health",  riskScore: 0 },
          { value: "yes", label: "Yes — I feel my mental health is being affected by work",   riskScore: 3 },
        ],
      },
      {
        id: "ps_wellbeing_eap",
        text: "Are you aware of how to access wellbeing support services (e.g., Employee Assistance Programme) provided by your employer?",
        type: "yes_no",
        required: true,
        weight: 1.0,
        helpText: "An EAP typically provides free, confidential counselling and support services.",
        options: [
          { value: "yes", label: "Yes — I know how to access wellbeing support",                      riskScore: 0 },
          { value: "no",  label: "No — I am not aware of any wellbeing support available to me",     riskScore: 2 },
        ],
      },
      {
        id: "ps_wellbeing_comment",
        text: "Any additional comments about your wellbeing or mental health at work?",
        type: "text_comment",
        required: false,
        weight: 0,
      },
    ],
  },
];
