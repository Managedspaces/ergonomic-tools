/**
 * Platform Core — Shared Scoring Engine
 * Three-tier weighted pipeline: Question → Category → Overall
 *
 * This engine is tool-agnostic. Pass any Category[] array from any tool module
 * and it will calculate scores using the same algorithm.
 *
 * Scoring pipeline:
 *   1. Each question produces a weighted score (0 → 5 × weight)
 *   2. Each category normalises to 0–100 using answered questions only
 *   3. Overall score is the weighted average of all category scores
 */

import type {
  Category,
  Question,
  QuestionResponse,
  CategoryScore,
  AssessmentResult,
  Recommendation,
  RiskRating,
} from "./types";

// ─── Risk Rating Thresholds ────────────────────────────────────────────────

export function getRating(score: number): { rating: RiskRating; label: string; color: string } {
  if (score <= 25) return { rating: "low",      label: "Low Risk",      color: "#2D6A4F" };
  if (score <= 50) return { rating: "moderate", label: "Moderate Risk", color: "#D4A017" };
  if (score <= 75) return { rating: "high",     label: "High Risk",     color: "#C44536" };
  return             { rating: "critical",  label: "Critical Risk", color: "#9B2226" };
}

export function getActionTimeline(rating: RiskRating): string {
  switch (rating) {
    case "low":      return "Meets standards; maintain current setup";
    case "moderate": return "Review and adjust within 30 days";
    case "high":     return "Corrective action required within 14 days";
    case "critical": return "Immediate intervention required";
  }
}

// ─── Tier 1: Question Scoring ──────────────────────────────────────────────

function scoreQuestion(
  question: Question,
  response: QuestionResponse
): { raw: number; max: number } {
  if (question.type === "text_comment" || question.weight === 0) {
    return { raw: 0, max: 0 };
  }

  let rawScore = 0;

  if (question.type === "scale_rating") {
    // Scale is inverted: 1 (worst) → risk 4, 5 (best) → risk 0
    const value = parseInt(response.value, 10);
    rawScore = isNaN(value) ? 2.5 : 5 - value;
  } else if (question.type === "multiple_choice" || question.type === "yes_no") {
    const option = question.options?.find((o) => o.value === response.value);
    rawScore = option ? option.riskScore : 0;
  }

  return {
    raw: rawScore * question.weight,
    max: 5 * question.weight,
  };
}

// ─── Tier 2: Category Scoring ──────────────────────────────────────────────

function scoreCategory(
  category: Category,
  responses: QuestionResponse[],
  getRecommendations: (categoryId: string, rating: RiskRating) => string[]
): CategoryScore {
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
    recommendations: getRecommendations(category.id, rating),
  };
}

// ─── Tier 3: Overall Assessment ───────────────────────────────────────────

export function calculateAssessment(
  categories: Category[],
  responses: QuestionResponse[],
  getRecommendations: (categoryId: string, rating: RiskRating) => string[]
): AssessmentResult {
  const categoryScores = categories.map((cat) =>
    scoreCategory(cat, responses, getRecommendations)
  );

  let weightedSum = 0;
  let totalWeight = 0;
  for (let i = 0; i < categories.length; i++) {
    weightedSum += categoryScores[i].score * categories[i].weight;
    totalWeight += categories[i].weight;
  }

  const overallScore =
    totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 100) / 100 : 0;
  const { rating, label, color } = getRating(overallScore);

  const recommendations = buildRecommendationList(categoryScores);

  return {
    overallScore,
    overallRating: rating,
    overallRatingLabel: label,
    overallRatingColor: color,
    categoryScores,
    recommendations,
  };
}

// ─── Recommendation Aggregation ───────────────────────────────────────────

function buildRecommendationList(categoryScores: CategoryScore[]): Recommendation[] {
  const recs: Recommendation[] = [];

  for (const cs of categoryScores) {
    if (cs.rating === "low") continue;

    const priority: Recommendation["priority"] =
      cs.rating === "critical" ? "critical" : cs.rating === "high" ? "high" : "medium";

    for (const text of cs.recommendations) {
      recs.push({
        categoryId: cs.categoryId,
        categoryTitle: cs.categoryTitle,
        priority,
        text,
      });
    }
  }

  const priorityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
  recs.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return recs;
}

// ─── Progress Helpers ─────────────────────────────────────────────────────

export function getTotalScorableQuestions(categories: Category[]): number {
  return categories.reduce(
    (sum, cat) => sum + cat.questions.filter((q) => q.type !== "text_comment").length,
    0
  );
}

export function getAnsweredCount(categories: Category[], responses: QuestionResponse[]): number {
  return responses.filter((r) => {
    for (const cat of categories) {
      const q = cat.questions.find((q) => q.id === r.questionId);
      if (q && q.type !== "text_comment") return true;
    }
    return false;
  }).length;
}
