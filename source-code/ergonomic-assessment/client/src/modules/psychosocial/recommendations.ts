/**
 * Psychosocial Risk Assessment — Recommendations Engine
 * Category-specific, risk-level-specific guidance for employees and employers.
 * Aligned with ISO 45003, HSE Management Standards, and EU Framework Directive 89/391/EEC.
 */

import type { RiskRating } from "@/lib/shared/types";

const RECOMMENDATIONS: Record<string, Record<RiskRating, string[]>> = {
  workload_deadlines: {
    low: [
      "Your workload appears manageable. Continue to communicate proactively with your manager if priorities shift.",
      "Maintain your current work patterns and review workload periodically with your team.",
    ],
    moderate: [
      "Review your task prioritisation method — consider using a structured approach such as time-blocking or the Eisenhower Matrix.",
      "Speak with your manager about workload expectations and agree on realistic deadlines before they become unmanageable.",
      "Identify and eliminate low-value tasks that consume time without contributing to key objectives.",
    ],
    high: [
      "Your workload levels are unsustainable and pose a significant risk of burnout. Raise this with your manager as a priority.",
      "Request a formal workload review with your manager or HR. Document instances where deadlines are unachievable.",
      "Explore delegation opportunities and discuss whether additional resource or support is available.",
      "Under the EU Working Time Directive and equivalent national legislation, you are entitled to maximum weekly working hour limits and minimum rest periods.",
    ],
    critical: [
      "Your workload is at a critical level. Immediate management intervention is required.",
      "Escalate your workload concerns to HR or your manager's manager if your direct manager is unresponsive.",
      "Contact your Employee Assistance Programme (EAP) for confidential support and guidance.",
      "Consider requesting a formal occupational health referral to assess the impact of workload on your health.",
      "Your employer has a legal duty of care under health and safety legislation to address excessive workload.",
    ],
  },

  role_clarity_support: {
    low: [
      "Your role clarity and support levels are good. Continue to maintain open communication with your manager.",
    ],
    moderate: [
      "Request a role clarification meeting with your manager to agree on priorities and expectations.",
      "If you receive conflicting instructions, ask for written confirmation of priorities from your manager.",
      "Identify any training or resource gaps and raise them formally in your next one-to-one.",
    ],
    high: [
      "Lack of role clarity is a significant psychosocial stressor. Request a formal job description review.",
      "Establish a regular one-to-one meeting cadence with your manager to align on expectations and priorities.",
      "If you feel unable to raise concerns with your manager, identify an alternative contact in HR or a senior colleague.",
      "Request the training and resources you need in writing so there is a formal record of the gap.",
    ],
    critical: [
      "Critical levels of role ambiguity and lack of support have been identified. Immediate action is required.",
      "Escalate the absence of management support to HR. This is a recognised psychosocial hazard under ISO 45003.",
      "Contact your Employee Assistance Programme for confidential support.",
      "Your employer is legally required to provide adequate information, instruction, and supervision under health and safety law.",
    ],
  },

  work_environment_culture: {
    low: [
      "Your work environment and team culture are positive. Continue to foster open communication and mutual respect.",
    ],
    moderate: [
      "Invest in team relationship-building activities and encourage open, respectful communication.",
      "Ensure change management processes include adequate advance notice and opportunity for employee input.",
      "Establish regular team check-ins to surface and address emerging concerns before they escalate.",
    ],
    high: [
      "Significant cultural and environmental risk factors have been identified. Management action is required.",
      "If you have experienced bullying or harassment, report it formally using your organisation's grievance procedure.",
      "Request that management improve change communication processes — employees should be consulted, not just informed.",
      "Advocate for a formal employee voice mechanism (e.g., team surveys, suggestion schemes) to improve engagement.",
    ],
    critical: [
      "Critical cultural and environmental risk factors identified. Immediate management and HR intervention required.",
      "Bullying and harassment must be reported and investigated under your organisation's dignity at work policy.",
      "Contact your EAP or an external support service if you are experiencing distress as a result of workplace culture.",
      "Your employer has a legal duty to provide a psychologically safe working environment under national health and safety legislation.",
      "Consider contacting your national workplace relations body if internal processes are not being followed.",
    ],
  },

  work_life_balance: {
    low: [
      "Your work-life balance is healthy. Continue to maintain clear boundaries between work and personal time.",
    ],
    moderate: [
      "Establish a clear end-of-day routine to signal the boundary between work and personal time.",
      "Use your device's 'Do Not Disturb' or focus mode settings to limit work notifications outside of hours.",
      "Discuss with your manager the expectation around out-of-hours availability — many jurisdictions provide a Right to Disconnect.",
    ],
    high: [
      "Your work-life balance is significantly impaired. This is a recognised risk factor for burnout and health deterioration.",
      "Review your organisation's Right to Disconnect policy — in Ireland, the UK, and the EU, employees have the right to not engage with work outside contracted hours.",
      "Raise out-of-hours contact during annual leave with your manager or HR as a formal concern.",
      "Ensure you are taking your full statutory rest break entitlements each day.",
    ],
    critical: [
      "Critical work-life balance impairment identified. Immediate intervention required.",
      "The inability to disconnect from work is a primary driver of burnout, cardiovascular disease, and mental health disorders.",
      "Formally raise the issue with HR and request a review of your working arrangements.",
      "Contact your EAP for confidential support and guidance on managing work-related stress.",
      "Under the EU Working Time Directive, you are entitled to minimum daily and weekly rest periods. Contact your national labour authority if these are not being respected.",
    ],
  },

  employee_wellbeing: {
    low: [
      "Your wellbeing indicators are positive. Continue to prioritise self-care and maintain a healthy work routine.",
    ],
    moderate: [
      "Practise regular stress management techniques such as mindfulness, physical exercise, or structured relaxation.",
      "Ensure you are aware of and able to access your employer's Employee Assistance Programme (EAP) if needed.",
      "Speak with your GP if you are experiencing persistent sleep disruption or fatigue.",
    ],
    high: [
      "Significant wellbeing concerns have been identified. You should not manage these alone.",
      "Contact your Employee Assistance Programme (EAP) for free, confidential counselling and support.",
      "Speak with your GP about the impact of work on your health — they can provide a sick note if required and refer you to specialist services.",
      "Raise your wellbeing concerns with your manager or HR. Your employer has a duty of care to support your mental health.",
      "Consider requesting a temporary adjustment to your working arrangements to allow recovery.",
    ],
    critical: [
      "Critical wellbeing indicators identified. Immediate support is required.",
      "Please contact your Employee Assistance Programme (EAP) today for confidential support.",
      "Speak with your GP as a matter of urgency if you are experiencing significant mental health difficulties.",
      "You may be entitled to sick leave if work is negatively impacting your mental health — your GP can advise.",
      "Your employer is legally required to protect your mental health and wellbeing under health and safety legislation. If they are not doing so, contact your national health and safety authority.",
      "If you are in crisis, please contact a mental health helpline in your country (e.g., Samaritans: 116 123 in IE/UK).",
    ],
  },
};

export function getPsychosocialRecommendations(categoryId: string, rating: RiskRating): string[] {
  return RECOMMENDATIONS[categoryId]?.[rating] ?? [];
}
