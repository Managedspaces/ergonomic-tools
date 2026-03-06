/**
 * Platform Core — Shared Types
 * Tool-agnostic interfaces shared across all assessment modules.
 * Adding a new tool = implement these interfaces in a new modules/ folder.
 */

// ─── Question Model ────────────────────────────────────────────────────────

export interface QuestionOption {
  value: string;
  label: string;
  riskScore: number; // 0 (compliant) → 5 (critical)
}

export interface Question {
  id: string;
  text: string;
  type: "multiple_choice" | "scale_rating" | "yes_no" | "text_comment";
  required: boolean;
  weight: number; // Relative importance within category (e.g. 1.0, 1.5, 2.0)
  helpText?: string;
  options?: QuestionOption[];
  scaleLabels?: { low: string; high: string };
}

export interface Category {
  id: string;
  title: string;
  description: string;
  weight: number; // Proportion of overall score (all weights must sum to 1.0)
  icon: string;   // Lucide icon name
  questions: Question[];
}

// ─── Assessment Response Model ─────────────────────────────────────────────

export interface QuestionResponse {
  questionId: string;
  value: string;
  textComment?: string;
}

export interface EmployeeInfo {
  name: string;
  email: string;
  jobTitle: string;
  department: string;
  workLocation: "office" | "home" | "hybrid" | "other";
  country: string;
}

// ─── Scoring Model ─────────────────────────────────────────────────────────

export type RiskRating = "low" | "moderate" | "high" | "critical";
export type RecommendationPriority = "low" | "medium" | "high" | "critical";

export interface CategoryScore {
  categoryId: string;
  categoryTitle: string;
  score: number;           // 0–100
  rating: RiskRating;
  ratingLabel: string;
  ratingColor: string;
  questionCount: number;
  answeredCount: number;
  recommendations: string[];
}

export interface Recommendation {
  categoryId: string;
  categoryTitle: string;
  priority: RecommendationPriority;
  text: string;
}

export interface AssessmentResult {
  overallScore: number;    // 0–100
  overallRating: RiskRating;
  overallRatingLabel: string;
  overallRatingColor: string;
  categoryScores: CategoryScore[];
  recommendations: Recommendation[];
}

// ─── Assessment Data Record (for persistence/export) ──────────────────────

export interface AssessmentRecord {
  assessment_id: string;
  tool_id: string;         // e.g. "ergonomic" | "home-office"
  employee_id: string;
  company_id: string;
  country: string;
  timestamp: string;       // ISO 8601
  category_scores: CategoryScore[];
  total_score: number;
  risk_level: RiskRating;
  recommendations: Recommendation[];
}

// ─── Tool Module Interface ─────────────────────────────────────────────────
// Every tool module must export an object conforming to this interface.

export interface ToolModule {
  id: string;
  name: string;
  description: string;
  icon: string;             // Lucide icon name
  categories: Category[];
  getRecommendations: (categoryId: string, rating: RiskRating) => string[];
  getComplianceTemplate: (countryCode: string) => ComplianceTemplate | null;
}

// ─── Compliance Model ──────────────────────────────────────────────────────

export interface ComplianceTemplate {
  countryCode: string;
  countryName: string;
  regulatoryFramework: string;
  regulatoryBody: string;
  keyRegulations: string[];
  assessmentFrequency: string;
  employerObligations: string[];
  employeeRights: string[];
  documentationRequirements: string[];
  reportTitle: string;
  reportSubtitle: string;
  legalDisclaimer: string;
  terminology: {
    employee: string;
    assessor: string;
    riskLevel: string;
    controlMeasures: string;
    actionPlan: string;
  };
}
