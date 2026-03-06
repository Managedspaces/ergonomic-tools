/**
 * Ergonomic Risk Self-Assessment Tool — Questionnaire Data Model
 * Design: Clinical Precision — Swiss Medical Design
 * 6 categories, 31 questions, weighted scoring
 */

export interface QuestionOption {
  value: string;
  label: string;
  riskScore: number;
}

export interface Question {
  id: string;
  text: string;
  type: "multiple_choice" | "scale_rating" | "yes_no" | "text_comment";
  required: boolean;
  weight: number;
  helpText?: string;
  options?: QuestionOption[];
  scaleLabels?: { low: string; high: string };
}

export interface Category {
  id: string;
  title: string;
  description: string;
  weight: number;
  icon: string;
  questions: Question[];
}

export const CATEGORIES: Category[] = [
  {
    id: "workstation_equipment",
    title: "Workstation Equipment",
    description: "Evaluates your desk, chair, monitor, keyboard, and peripheral setup.",
    weight: 0.20,
    icon: "Monitor",
    questions: [
      {
        id: "ws_chair_type",
        text: "What type of chair do you primarily use for work?",
        type: "multiple_choice",
        required: true,
        weight: 1.5,
        helpText: "Select the option that best describes your primary work chair.",
        options: [
          { value: "ergonomic_full", label: "Fully adjustable ergonomic chair (height, backrest, armrests, lumbar)", riskScore: 0 },
          { value: "ergonomic_basic", label: "Basic ergonomic chair (height adjustable, some back support)", riskScore: 1 },
          { value: "basic_office", label: "Standard office chair (limited adjustability)", riskScore: 3 },
          { value: "non_office", label: "Non-office chair (dining chair, stool, etc.)", riskScore: 5 },
        ],
      },
      {
        id: "ws_monitor_position",
        text: "Where is the top edge of your monitor relative to your eye level?",
        type: "multiple_choice",
        required: true,
        weight: 1.5,
        helpText: "Sit in your normal working position and check where the top of the screen aligns with your eyes.",
        options: [
          { value: "at_eye_level", label: "At or slightly below eye level", riskScore: 0 },
          { value: "slightly_below", label: "Noticeably below eye level", riskScore: 2 },
          { value: "significantly_below", label: "Significantly below eye level (e.g., laptop on desk)", riskScore: 4 },
          { value: "above_eye_level", label: "Above eye level", riskScore: 3 },
        ],
      },
      {
        id: "ws_keyboard_mouse",
        text: "What type of keyboard and mouse do you use?",
        type: "multiple_choice",
        required: true,
        weight: 1,
        helpText: "Ergonomic peripherals are designed to maintain neutral wrist positions.",
        options: [
          { value: "ergonomic_both", label: "Ergonomic keyboard and ergonomic/vertical mouse", riskScore: 0 },
          { value: "ergonomic_one", label: "One ergonomic device (either keyboard or mouse)", riskScore: 1 },
          { value: "standard_external", label: "Standard external keyboard and mouse", riskScore: 2 },
          { value: "laptop_builtin", label: "Laptop built-in keyboard and trackpad only", riskScore: 4 },
        ],
      },
      {
        id: "ws_desk_adjustable",
        text: "Is your desk height adjustable (sit-stand)?",
        type: "yes_no",
        required: true,
        weight: 1,
        helpText: "Height-adjustable desks allow you to alternate between sitting and standing.",
        options: [
          { value: "yes", label: "Yes", riskScore: 0 },
          { value: "no", label: "No", riskScore: 3 },
        ],
      },
      {
        id: "ws_external_monitor",
        text: "If you use a laptop, do you connect it to an external monitor?",
        type: "yes_no",
        required: true,
        weight: 1,
        helpText: "Using a laptop without an external monitor often leads to poor neck posture.",
        options: [
          { value: "yes", label: "Yes, I use an external monitor", riskScore: 0 },
          { value: "no", label: "No, I use only the laptop screen", riskScore: 4 },
          { value: "na", label: "Not applicable (I use a desktop)", riskScore: 0 },
        ],
      },
      {
        id: "ws_equipment_comments",
        text: "Any additional comments about your workstation equipment?",
        type: "text_comment",
        required: false,
        weight: 0,
        helpText: "Optional: Describe any specific equipment concerns or recent changes.",
      },
    ],
  },
  {
    id: "posture_body",
    title: "Posture & Body Positioning",
    description: "Assesses your sitting posture, alignment, and physical comfort during work.",
    weight: 0.20,
    icon: "User",
    questions: [
      {
        id: "pb_feet_position",
        text: "Are your feet flat on the floor or on a footrest while working?",
        type: "yes_no",
        required: true,
        weight: 1,
        helpText: "Feet should be fully supported to maintain proper leg circulation.",
        options: [
          { value: "yes", label: "Yes, feet are flat on floor or footrest", riskScore: 0 },
          { value: "no", label: "No, feet dangle or are tucked under the chair", riskScore: 4 },
        ],
      },
      {
        id: "pb_back_support",
        text: "How well does your chair support your lower back?",
        type: "scale_rating",
        required: true,
        weight: 1.5,
        helpText: "1 = No support at all, 5 = Excellent lumbar support throughout the day.",
        scaleLabels: { low: "No support", high: "Excellent support" },
      },
      {
        id: "pb_wrist_position",
        text: "What is your typical wrist position while typing?",
        type: "multiple_choice",
        required: true,
        weight: 1.5,
        helpText: "Neutral wrist position means wrists are straight, not bent up, down, or sideways.",
        options: [
          { value: "neutral", label: "Neutral and straight, forearms parallel to desk", riskScore: 0 },
          { value: "slightly_bent", label: "Slightly bent upward or downward", riskScore: 2 },
          { value: "significantly_bent", label: "Significantly bent or resting on desk edge", riskScore: 4 },
          { value: "unsure", label: "I'm not sure", riskScore: 3 },
        ],
      },
      {
        id: "pb_neck_position",
        text: "How would you rate your neck position and head alignment during work?",
        type: "scale_rating",
        required: true,
        weight: 1.5,
        helpText: "1 = Constantly looking down/up with strain, 5 = Head balanced naturally over shoulders.",
        scaleLabels: { low: "Poor alignment", high: "Excellent alignment" },
      },
      {
        id: "pb_discomfort_frequency",
        text: "How often do you experience musculoskeletal discomfort (back, neck, shoulders, wrists)?",
        type: "multiple_choice",
        required: true,
        weight: 2,
        helpText: "Consider pain, stiffness, or discomfort that you attribute to your work setup.",
        options: [
          { value: "never", label: "Never or rarely", riskScore: 0 },
          { value: "occasionally", label: "Occasionally (once or twice a week)", riskScore: 2 },
          { value: "frequently", label: "Frequently (most days)", riskScore: 4 },
          { value: "constantly", label: "Constantly (throughout each workday)", riskScore: 5 },
        ],
      },
      {
        id: "pb_posture_comments",
        text: "Any additional comments about your posture or physical comfort?",
        type: "text_comment",
        required: false,
        weight: 0,
        helpText: "Optional: Describe any specific discomfort areas or posture concerns.",
      },
    ],
  },
  {
    id: "work_patterns",
    title: "Work Patterns & Screen Time",
    description: "Measures your screen exposure, break habits, and work schedule patterns.",
    weight: 0.15,
    icon: "Clock",
    questions: [
      {
        id: "wp_screen_time",
        text: "How many hours per day do you spend continuously looking at a screen?",
        type: "multiple_choice",
        required: true,
        weight: 1.5,
        helpText: "Consider your longest unbroken screen sessions.",
        options: [
          { value: "under_2", label: "Less than 2 hours", riskScore: 0 },
          { value: "2_to_4", label: "2–4 hours", riskScore: 1 },
          { value: "4_to_6", label: "4–6 hours", riskScore: 3 },
          { value: "over_6", label: "More than 6 hours", riskScore: 5 },
        ],
      },
      {
        id: "wp_break_frequency",
        text: "How often do you take breaks from your screen during the workday?",
        type: "multiple_choice",
        required: true,
        weight: 2,
        helpText: "Breaks include standing up, stretching, or looking away from the screen for at least 5 minutes.",
        options: [
          { value: "every_30", label: "Every 30 minutes or less", riskScore: 0 },
          { value: "every_60", label: "Every 60 minutes", riskScore: 1 },
          { value: "every_2h", label: "Every 2 hours", riskScore: 3 },
          { value: "rarely", label: "Rarely or never during work sessions", riskScore: 5 },
        ],
      },
      {
        id: "wp_task_variety",
        text: "How much variety do you have in your daily work tasks?",
        type: "scale_rating",
        required: true,
        weight: 1,
        helpText: "1 = Same repetitive task all day, 5 = Highly varied tasks with different physical demands.",
        scaleLabels: { low: "Very repetitive", high: "Highly varied" },
      },
      {
        id: "wp_overtime",
        text: "How often do you work overtime or extended hours?",
        type: "multiple_choice",
        required: true,
        weight: 1,
        helpText: "Extended hours increase cumulative ergonomic strain.",
        options: [
          { value: "never", label: "Never or rarely", riskScore: 0 },
          { value: "occasionally", label: "Occasionally (once or twice a month)", riskScore: 1 },
          { value: "frequently", label: "Frequently (weekly)", riskScore: 3 },
          { value: "always", label: "Almost always (daily)", riskScore: 5 },
        ],
      },
      {
        id: "wp_patterns_comments",
        text: "Any additional comments about your work patterns?",
        type: "text_comment",
        required: false,
        weight: 0,
        helpText: "Optional: Describe any specific scheduling concerns or constraints.",
      },
    ],
  },
  {
    id: "environmental",
    title: "Environmental Factors",
    description: "Evaluates your workspace lighting, temperature, noise, and air quality.",
    weight: 0.15,
    icon: "Sun",
    questions: [
      {
        id: "env_screen_glare",
        text: "Do you experience glare or reflections on your screen?",
        type: "yes_no",
        required: true,
        weight: 1.5,
        helpText: "Glare from windows or overhead lights can cause eye strain and poor posture adjustments.",
        options: [
          { value: "no", label: "No, my screen is free from glare", riskScore: 0 },
          { value: "yes", label: "Yes, I frequently see reflections or glare", riskScore: 4 },
        ],
      },
      {
        id: "env_lighting",
        text: "How adequate is the lighting in your workspace?",
        type: "scale_rating",
        required: true,
        weight: 1,
        helpText: "1 = Very poor (too dim or too bright), 5 = Perfectly balanced lighting.",
        scaleLabels: { low: "Very poor", high: "Excellent" },
      },
      {
        id: "env_temperature",
        text: "How comfortable is the temperature in your workspace?",
        type: "scale_rating",
        required: true,
        weight: 1,
        helpText: "1 = Very uncomfortable (too hot or too cold), 5 = Consistently comfortable.",
        scaleLabels: { low: "Very uncomfortable", high: "Very comfortable" },
      },
      {
        id: "env_noise",
        text: "How much does noise in your workspace impact your concentration?",
        type: "scale_rating",
        required: true,
        weight: 1,
        helpText: "1 = Severely distracting noise, 5 = Quiet and conducive to focus.",
        scaleLabels: { low: "Severely distracting", high: "Very quiet" },
      },
      {
        id: "env_air_quality",
        text: "How would you rate the air quality and ventilation in your workspace?",
        type: "scale_rating",
        required: true,
        weight: 1,
        helpText: "1 = Stuffy, poor ventilation, 5 = Fresh air with good circulation.",
        scaleLabels: { low: "Poor ventilation", high: "Excellent ventilation" },
      },
    ],
  },
  {
    id: "vision_eye_strain",
    title: "Vision & Eye Strain",
    description: "Assesses your visual health and screen-related eye comfort.",
    weight: 0.15,
    icon: "Eye",
    questions: [
      {
        id: "ve_screen_distance",
        text: "How far is your screen from your eyes?",
        type: "multiple_choice",
        required: true,
        weight: 1.5,
        helpText: "The recommended distance is approximately arm's length (50–70 cm).",
        options: [
          { value: "arms_length", label: "Approximately arm's length (50–70 cm)", riskScore: 0 },
          { value: "too_close", label: "Closer than arm's length", riskScore: 3 },
          { value: "too_far", label: "Further than arm's length", riskScore: 2 },
          { value: "unsure", label: "I'm not sure", riskScore: 2 },
        ],
      },
      {
        id: "ve_eye_strain_symptoms",
        text: "How often do you experience eye strain symptoms (dry eyes, headaches, blurred vision)?",
        type: "multiple_choice",
        required: true,
        weight: 2,
        helpText: "Consider symptoms that occur during or after screen work.",
        options: [
          { value: "never", label: "Never or rarely", riskScore: 0 },
          { value: "occasionally", label: "Occasionally (once or twice a week)", riskScore: 2 },
          { value: "frequently", label: "Frequently (most days)", riskScore: 4 },
          { value: "constantly", label: "Constantly", riskScore: 5 },
        ],
      },
      {
        id: "ve_20_20_20",
        text: "Do you practice the 20-20-20 rule (every 20 min, look at something 20 feet away for 20 sec)?",
        type: "multiple_choice",
        required: true,
        weight: 1.5,
        helpText: "This technique helps reduce digital eye strain.",
        options: [
          { value: "always", label: "Yes, regularly", riskScore: 0 },
          { value: "sometimes", label: "Sometimes", riskScore: 2 },
          { value: "rarely", label: "Rarely", riskScore: 3 },
          { value: "never", label: "Never / I wasn't aware of this rule", riskScore: 4 },
        ],
      },
      {
        id: "ve_eye_exam",
        text: "When was your last eye examination?",
        type: "multiple_choice",
        required: true,
        weight: 1,
        helpText: "Regular eye exams are recommended for DSE users.",
        options: [
          { value: "within_year", label: "Within the last 12 months", riskScore: 0 },
          { value: "1_2_years", label: "1–2 years ago", riskScore: 1 },
          { value: "over_2_years", label: "More than 2 years ago", riskScore: 3 },
          { value: "never", label: "Never / I don't remember", riskScore: 4 },
        ],
      },
      {
        id: "ve_brightness_adjusted",
        text: "Do you adjust your screen brightness to match your environment?",
        type: "yes_no",
        required: true,
        weight: 1,
        helpText: "Screen brightness should match ambient lighting to reduce eye strain.",
        options: [
          { value: "yes", label: "Yes, I regularly adjust brightness", riskScore: 0 },
          { value: "no", label: "No, I leave it at a fixed setting", riskScore: 3 },
        ],
      },
    ],
  },
  {
    id: "psychosocial",
    title: "Psychosocial Workload",
    description: "Evaluates stress levels, autonomy, and workplace support factors.",
    weight: 0.15,
    icon: "Brain",
    questions: [
      {
        id: "ps_workload",
        text: "How manageable is your current workload?",
        type: "scale_rating",
        required: true,
        weight: 1.5,
        helpText: "1 = Completely overwhelming, 5 = Very manageable with time to spare.",
        scaleLabels: { low: "Overwhelming", high: "Very manageable" },
      },
      {
        id: "ps_autonomy",
        text: "How much control do you have over your work schedule and methods?",
        type: "scale_rating",
        required: true,
        weight: 1,
        helpText: "1 = No control at all, 5 = Full autonomy over when and how I work.",
        scaleLabels: { low: "No control", high: "Full autonomy" },
      },
      {
        id: "ps_support",
        text: "How available is workplace support when you need it (IT, HR, management)?",
        type: "scale_rating",
        required: true,
        weight: 1.5,
        helpText: "1 = No support available, 5 = Immediate and effective support always available.",
        scaleLabels: { low: "No support", high: "Excellent support" },
      },
      {
        id: "ps_work_life_balance",
        text: "How satisfied are you with your work-life balance?",
        type: "scale_rating",
        required: true,
        weight: 1,
        helpText: "1 = Very dissatisfied, 5 = Very satisfied.",
        scaleLabels: { low: "Very dissatisfied", high: "Very satisfied" },
      },
      {
        id: "ps_stress_level",
        text: "How would you rate your overall stress level related to work?",
        type: "scale_rating",
        required: true,
        weight: 2,
        helpText: "1 = Extremely stressed, 5 = Very relaxed and comfortable.",
        scaleLabels: { low: "Extremely stressed", high: "Very relaxed" },
      },
    ],
  },
];

export const TOTAL_QUESTIONS = CATEGORIES.reduce((sum, cat) => sum + cat.questions.length, 0);
export const SCORABLE_QUESTIONS = CATEGORIES.reduce(
  (sum, cat) => sum + cat.questions.filter((q) => q.type !== "text_comment").length,
  0
);
