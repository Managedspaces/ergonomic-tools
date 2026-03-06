/**
 * Platform App — Root component
 * Platform home (tool selector) → Assessment flow per selected tool
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AssessmentProvider, useAssessment } from "./contexts/AssessmentContext";
import PlatformHome from "./pages/PlatformHome";
import WelcomeStep from "./components/WelcomeStep";
import InfoStep from "./components/InfoStep";
import QuestionsStep from "./components/QuestionsStep";
import ResultsStep from "./components/ResultsStep";

function AppContent() {
  const { tool, step } = useAssessment();

  // No tool selected → show platform home (tool selector)
  if (!tool) {
    return <PlatformHome />;
  }

  // Tool selected → run the assessment flow
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

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <AssessmentProvider>
            <Toaster />
            <AppContent />
          </AssessmentProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
