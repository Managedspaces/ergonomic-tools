/**
 * Ergonomic Risk Scoring Engine
 * Three-tier weighted average: Question → Category → Overall
 */

import { CATEGORIES, type Category, type Question } from "./questionnaire";

export interface QuestionResponse {
  questionId: string;
  value: string;
  textComment?: string;
}

export interface CategoryScore {
  categoryId: string;
  categoryTitle: string;
  score: number;
  rating: "low" | "moderate" | "high" | "critical";
  ratingLabel: string;
  ratingColor: string;
  questionCount: number;
  answeredCount: number;
  recommendations: string[];
}

export interface AssessmentResult {
  overallScore: number;
  overallRating: "low" | "moderate" | "high" | "critical";
  overallRatingLabel: string;
  overallRatingColor: string;
  categoryScores: CategoryScore[];
  recommendations: Recommendation[];
}

export interface Recommendation {
  categoryId: string;
  categoryTitle: string;
  priority: "low" | "medium" | "high" | "critical";
  text: string;
}

// Risk rating thresholds
function getRating(score: number): { rating: "low" | "moderate" | "high" | "critical"; label: string; color: string } {
  if (score <= 25) return { rating: "low", label: "Low Risk", color: "#2D6A4F" };
  if (score <= 50) return { rating: "moderate", label: "Moderate Risk", color: "#D4A017" };
  if (score <= 75) return { rating: "high", label: "High Risk", color: "#C44536" };
  return { rating: "critical", label: "Critical Risk", color: "#9B2226" };
}

// Score a single question
function scoreQuestion(question: Question, response: QuestionResponse): { raw: number; max: number } {
  if (question.type === "text_comment" || question.weight === 0) {
    return { raw: 0, max: 0 };
  }

  let rawScore = 0;

  if (question.type === "scale_rating") {
    const value = parseInt(response.value, 10);
    rawScore = isNaN(value) ? 2.5 : 5 - value; // Invert: 1→4, 2→3, 3→2, 4→1, 5→0
  } else if (question.type === "multiple_choice" || question.type === "yes_no") {
    const option = question.options?.find((o) => o.value === response.value);
    rawScore = option ? option.riskScore : 0;
  }

  return {
    raw: rawScore * question.weight,
    max: 5 * question.weight,
  };
}

// Score a category
function scoreCategory(category: Category, responses: QuestionResponse[]): CategoryScore {
  const scorableQuestions = category.questions.filter((q) => q.type !== "text_comment");
  let totalWeightedScore = 0;
  let totalMaxScore = 0;
  let answeredCount = 0;

  for (const question of scorableQuestions) {
    const response = responses.find((r) => r.questionId === question.id);
    if (response) {
      const { raw, max } = scoreQuestion(question, response);
      totalWeightedScore += raw;
      totalMaxScore += max;
      answeredCount++;
    }
  }

  const score = totalMaxScore > 0 ? (totalWeightedScore / totalMaxScore) * 100 : 0;
  const { rating, label, color } = getRating(score);

  return {
    categoryId: category.id,
    categoryTitle: category.title,
    score: Math.round(score * 100) / 100,
    rating,
    ratingLabel: label,
    ratingColor: color,
    questionCount: scorableQuestions.length,
    answeredCount,
    recommendations: getCategoryRecommendations(category.id, rating),
  };
}

// Calculate overall assessment
export function calculateAssessment(responses: QuestionResponse[]): AssessmentResult {
  const categoryScores = CATEGORIES.map((cat) => scoreCategory(cat, responses));

  let weightedSum = 0;
  let totalWeight = 0;
  for (let i = 0; i < CATEGORIES.length; i++) {
    weightedSum += categoryScores[i].score * CATEGORIES[i].weight;
    totalWeight += CATEGORIES[i].weight;
  }

  const overallScore = totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 100) / 100 : 0;
  const { rating, label, color } = getRating(overallScore);

  const recommendations = generateRecommendations(categoryScores);

  return {
    overallScore,
    overallRating: rating,
    overallRatingLabel: label,
    overallRatingColor: color,
    categoryScores,
    recommendations,
  };
}

function generateRecommendations(categoryScores: CategoryScore[]): Recommendation[] {
  const recs: Recommendation[] = [];

  for (const cs of categoryScores) {
    if (cs.rating === "low") continue;

    const priority = cs.rating === "critical" ? "critical" : cs.rating === "high" ? "high" : "medium";

    for (const text of cs.recommendations) {
      recs.push({
        categoryId: cs.categoryId,
        categoryTitle: cs.categoryTitle,
        priority,
        text,
      });
    }
  }

  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  recs.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return recs;
}

function getCategoryRecommendations(categoryId: string, rating: "low" | "moderate" | "high" | "critical"): string[] {
  const recs: Record<string, Record<string, string[]>> = {
    workstation_equipment: {
      low: ["Maintain your current workstation setup — it meets ergonomic standards."],
      moderate: [
        "Consider upgrading to an ergonomic keyboard or mouse to reduce wrist strain.",
        "If using a laptop, connect to an external monitor at eye level.",
      ],
      high: [
        "Invest in a fully adjustable ergonomic chair with lumbar support.",
        "Position your monitor so the top edge is at eye level, approximately arm's length away.",
        "Use an external keyboard and mouse instead of laptop built-in peripherals.",
      ],
      critical: [
        "Immediate workstation overhaul required: obtain an ergonomic chair, height-adjustable desk, and external monitor.",
        "Your current setup poses significant risk of musculoskeletal injury. Contact your employer about equipment provision.",
        "Stop using non-office furniture for extended work immediately.",
      ],
    },
    posture_body: {
      low: ["Your posture habits are good — continue maintaining awareness of your body positioning."],
      moderate: [
        "Focus on keeping your wrists neutral while typing — consider a wrist rest.",
        "Ensure your feet are flat on the floor; use a footrest if needed.",
      ],
      high: [
        "Prioritize lumbar support — add a cushion or adjust your chair's backrest.",
        "Keep your head balanced over your shoulders; avoid forward head posture.",
        "Consider ergonomic training or physiotherapy consultation for recurring discomfort.",
      ],
      critical: [
        "Your posture is causing significant strain. Seek professional ergonomic assessment immediately.",
        "Frequent musculoskeletal discomfort requires medical attention — consult an occupational health specialist.",
        "Restructure your workstation to enforce neutral body positioning.",
      ],
    },
    work_patterns: {
      low: ["Your work patterns support good ergonomic health — maintain regular breaks."],
      moderate: [
        "Increase break frequency — aim for a 5-minute break every 30–60 minutes.",
        "Introduce more task variety to reduce repetitive strain.",
      ],
      high: [
        "Implement mandatory screen breaks using a timer or reminder application.",
        "Discuss workload distribution with your manager to reduce extended screen sessions.",
        "Practice micro-exercises (stretching, eye exercises) during breaks.",
      ],
      critical: [
        "Your screen time and break patterns pose serious health risks. Restructure your workday immediately.",
        "Excessive overtime is compounding ergonomic strain — escalate to management.",
        "Set strict boundaries on continuous screen time (maximum 2 hours without a break).",
      ],
    },
    environmental: {
      low: ["Your workspace environment is well-suited for comfortable work."],
      moderate: [
        "Adjust window blinds or reposition your screen to reduce glare.",
        "Consider a desk lamp to supplement overhead lighting.",
      ],
      high: [
        "Position your monitor at right angles to windows to eliminate glare.",
        "Request improvements to temperature control or ventilation in your workspace.",
        "Use noise-cancelling headphones if ambient noise is distracting.",
      ],
      critical: [
        "Your environmental conditions require immediate attention — report to facilities management.",
        "Poor lighting and glare are likely contributing to eye strain and headaches.",
        "Inadequate ventilation may affect both comfort and cognitive performance.",
      ],
    },
    vision_eye_strain: {
      low: ["Your visual health practices are good — continue regular eye care."],
      moderate: [
        "Start practicing the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.",
        "Adjust your screen brightness to match ambient lighting conditions.",
      ],
      high: [
        "Schedule an eye examination — you may need corrective lenses for screen work.",
        "Ensure your screen is at arm's length (50–70 cm) from your eyes.",
        "Consider blue-light filtering glasses or screen settings.",
      ],
      critical: [
        "Frequent eye strain symptoms require immediate attention — consult an optometrist.",
        "Your screen distance and brightness settings need immediate correction.",
        "Implement the 20-20-20 rule strictly and reduce continuous screen time.",
      ],
    },
    psychosocial: {
      low: ["Your psychosocial work environment appears healthy and supportive."],
      moderate: [
        "Discuss workload concerns with your manager to find a sustainable balance.",
        "Explore flexible working arrangements to improve work-life balance.",
      ],
      high: [
        "High stress levels can exacerbate physical ergonomic issues — seek support.",
        "Request clearer task prioritization from management to reduce overwhelm.",
        "Consider employee assistance programs or counselling services.",
      ],
      critical: [
        "Your stress and workload levels are critically high — this requires immediate management intervention.",
        "Contact HR or occupational health services about your working conditions.",
        "Chronic psychosocial strain significantly increases musculoskeletal injury risk.",
      ],
    },
  };

  return recs[categoryId]?.[rating] || [];
}

export function getActionTimeline(rating: "low" | "moderate" | "high" | "critical"): string {
  switch (rating) {
    case "low": return "Meets standards; maintain current setup";
    case "moderate": return "Review and adjust within 30 days";
    case "high": return "Corrective action required within 14 days";
    case "critical": return "Immediate intervention required";
  }
}
