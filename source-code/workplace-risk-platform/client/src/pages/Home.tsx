/**
 * Home Page — Orchestrates the assessment flow
 * Design: Clinical Precision — Swiss Medical Design
 */

import { useAssessment } from "@/contexts/AssessmentContext";
import WelcomeStep from "@/components/WelcomeStep";
import InfoStep from "@/components/InfoStep";
import QuestionsStep from "@/components/QuestionsStep";
import ResultsStep from "@/components/ResultsStep";

export default function Home() {
  const { step } = useAssessment();

  switch (step) {
    case "welcome":
      return <WelcomeStep />;
    case "info":
      return <InfoStep />;
    case "questions":
      return <QuestionsStep />;
    case "results":
      return <ResultsStep />;
    default:
      return <WelcomeStep />;
  }
}
