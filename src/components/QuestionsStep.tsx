/**
 * Questions Step — Tool-agnostic step-by-step assessment
 * Design: Sabine brand — navy header, orange CTA, teal active states
 */

import { useAssessment } from "@/contexts/AssessmentContext";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft, ArrowRight, Shield, Check,
  Monitor, Home, Clock, Flame, Zap, AlertTriangle, Brain, Eye, User, Sun,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const iconMap: Record<string, React.ReactNode> = {
  Monitor:       <Monitor className="w-4 h-4" />,
  Home:          <Home className="w-4 h-4" />,
  Clock:         <Clock className="w-4 h-4" />,
  Flame:         <Flame className="w-4 h-4" />,
  Zap:           <Zap className="w-4 h-4" />,
  AlertTriangle: <AlertTriangle className="w-4 h-4" />,
  Brain:         <Brain className="w-4 h-4" />,
  Eye:           <Eye className="w-4 h-4" />,
  User:          <User className="w-4 h-4" />,
  Sun:           <Sun className="w-4 h-4" />,
  Shield:        <Shield className="w-4 h-4" />,
};

export default function QuestionsStep() {
  const {
    tool, setStep, currentCategoryIndex, currentQuestionIndex,
    nextQuestion, prevQuestion, goToCategory, setResponse, getResponse,
    responses, submitAssessment, totalProgress,
  } = useAssessment();

  if (!tool) return null;

  const categories = tool.categories;
  const category = categories[currentCategoryIndex];
  const question = category.questions[currentQuestionIndex];
  const currentResponse = getResponse(question.id);

  const isFirstQuestion = currentCategoryIndex === 0 && currentQuestionIndex === 0;
  const isLastCategory = currentCategoryIndex === categories.length - 1;
  const isLastQuestion = currentQuestionIndex === category.questions.length - 1;
  const isVeryLast = isLastCategory && isLastQuestion;

  const getCategoryAnswered = (catIndex: number) => {
    const cat = categories[catIndex];
    return cat.questions.filter(
      (q) => q.type !== "text_comment" && responses.some((r) => r.questionId === q.id)
    ).length;
  };
  const getCategoryScorable = (catIndex: number) =>
    categories[catIndex].questions.filter((q) => q.type !== "text_comment").length;

  const handleNext = () => {
    if (question.required && question.type !== "text_comment" && !currentResponse) {
      toast.error("Please answer this question before continuing.");
      return;
    }
    if (isVeryLast) {
      const unanswered = categories.flatMap((cat) =>
        cat.questions.filter(
          (q) => q.required && q.type !== "text_comment" && !responses.some((r) => r.questionId === q.id)
        )
      );
      if (unanswered.length > 0) {
        toast.error(`Please answer all required questions. ${unanswered.length} remaining.`);
        return;
      }
      submitAssessment();
    } else {
      nextQuestion();
    }
  };

  const handlePrev = () => {
    if (isFirstQuestion) setStep("info");
    else prevQuestion();
  };

  let globalIndex = 0;
  for (let ci = 0; ci < currentCategoryIndex; ci++) globalIndex += categories[ci].questions.length;
  globalIndex += currentQuestionIndex + 1;
  const totalQuestions = categories.reduce((s, c) => s + c.questions.length, 0);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--sabine-bg)" }}>

      {/* ── Top Bar ── */}
      <header className="sticky top-0 z-20 shadow-md" style={{ backgroundColor: "var(--sabine-navy)" }}>
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: "var(--sabine-cta)" }}>
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-semibold hidden sm:block text-white" style={{ fontFamily: "'Roboto', sans-serif" }}>
              {tool.name}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.6)" }}>
              {globalIndex} / {totalQuestions}
            </span>
            <div className="w-32 sm:w-48">
              <Progress value={totalProgress} className="h-1.5" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
            </div>
            <span className="text-xs font-semibold" style={{ color: "var(--sabine-cta)", fontFamily: "'Roboto', sans-serif" }}>
              {Math.round(totalProgress)}%
            </span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* ── Category Sidebar — Desktop ── */}
        <aside className="hidden lg:block w-64 border-r shrink-0" style={{ backgroundColor: "var(--sabine-card)", borderColor: "var(--sabine-border)" }}>
          <div className="p-4">
            <p className="section-label mb-4 px-2">Categories</p>
            <nav className="space-y-1">
              {categories.map((cat, i) => {
                const answered = getCategoryAnswered(i);
                const total = getCategoryScorable(i);
                const isActive = i === currentCategoryIndex;
                const isComplete = answered === total;

                return (
                  <button
                    key={cat.id}
                    onClick={() => goToCategory(i)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all text-sm"
                    style={{
                      backgroundColor: isActive ? "rgba(217,108,52,0.1)" : "transparent",
                      color: isActive ? "var(--sabine-cta)" : "var(--sabine-muted-text)",
                      fontFamily: "'Open Sans', sans-serif",
                      fontWeight: isActive ? 600 : 400,
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = "var(--sabine-muted)"; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <div
                      className="w-7 h-7 rounded flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: isActive ? "var(--sabine-cta)" : isComplete ? "rgba(46,204,113,0.15)" : "var(--sabine-muted)",
                        color: isActive ? "#fff" : isComplete ? "var(--sabine-risk-low)" : "var(--sabine-muted-text)",
                      }}
                    >
                      {isComplete ? <Check className="w-3.5 h-3.5" /> : (iconMap[cat.icon] ?? <Shield className="w-4 h-4" />)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block truncate text-xs">{cat.title}</span>
                      <span className="block text-[10px]" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Roboto', sans-serif" }}>
                        {answered}/{total}
                      </span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* ── Mobile Category Bar ── */}
        <div className="lg:hidden border-b overflow-x-auto fixed top-[53px] left-0 right-0 z-10" style={{ backgroundColor: "var(--sabine-card)", borderColor: "var(--sabine-border)" }}>
          <div className="flex gap-1.5 p-2 min-w-max">
            {categories.map((cat, i) => {
              const isActive = i === currentCategoryIndex;
              const answered = getCategoryAnswered(i);
              const total = getCategoryScorable(i);
              const isComplete = answered === total;

              return (
                <button
                  key={cat.id}
                  onClick={() => goToCategory(i)}
                  className="px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all font-semibold"
                  style={{
                    backgroundColor: isActive ? "var(--sabine-cta)" : isComplete ? "rgba(46,204,113,0.1)" : "var(--sabine-muted)",
                    color: isActive ? "#fff" : isComplete ? "var(--sabine-risk-low)" : "var(--sabine-muted-text)",
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  {cat.title.split(" ")[0]} {isComplete ? "✓" : `${answered}/${total}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Main Question Area ── */}
        <main className="flex-1 flex flex-col lg:pt-0 pt-12">
          <div className="flex-1 flex items-start justify-center p-6 lg:p-12">
            <div className="w-full max-w-2xl">

              {/* Category Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: "rgba(217,108,52,0.12)", color: "var(--sabine-cta)" }}>
                    {iconMap[category.icon] ?? <Shield className="w-4 h-4" />}
                  </div>
                  <span className="section-label">{category.title}</span>
                </div>
                <div className="flex items-center gap-2 text-xs" style={{ color: "var(--sabine-muted-text)" }}>
                  <span>Question {currentQuestionIndex + 1} of {category.questions.length}</span>
                  {question.required && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold" style={{ backgroundColor: "rgba(220,38,38,0.1)", color: "var(--sabine-risk-critical)", fontFamily: "'Roboto', sans-serif" }}>
                      Required
                    </span>
                  )}
                </div>
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="text-2xl lg:text-3xl font-bold mb-3 leading-snug" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
                    {question.text}
                  </h2>
                  {question.helpText && (
                    <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                      {question.helpText}
                    </p>
                  )}

                  {/* Answer Input */}
                  <div className="mt-6">
                    {question.type === "text_comment" ? (
                      <Textarea
                        value={currentResponse?.textComment || currentResponse?.value || ""}
                        onChange={(e) => setResponse(question.id, e.target.value, e.target.value)}
                        placeholder="Type your comments here (optional)..."
                        rows={4}
                        className="text-base"
                        style={{ borderColor: "var(--sabine-border)", fontFamily: "'Open Sans', sans-serif" }}
                      />
                    ) : question.type === "scale_rating" ? (
                      <div>
                        <div className="flex justify-between text-xs mb-3" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                          <span>{question.scaleLabels?.low}</span>
                          <span>{question.scaleLabels?.high}</span>
                        </div>
                        <RadioGroup
                          value={currentResponse?.value || ""}
                          onValueChange={(v) => setResponse(question.id, v)}
                          className="flex gap-3 justify-center"
                        >
                          {[1, 2, 3, 4, 5].map((n) => {
                            const isSelected = currentResponse?.value === String(n);
                            return (
                              <label
                                key={n}
                                className="w-14 h-14 rounded-xl border-2 flex items-center justify-center cursor-pointer transition-all text-lg font-bold"
                                style={{
                                  borderColor: isSelected ? "var(--sabine-cta)" : "var(--sabine-border)",
                                  backgroundColor: isSelected ? "var(--sabine-cta)" : "var(--sabine-card)",
                                  color: isSelected ? "#fff" : "var(--sabine-text)",
                                  fontFamily: "'Roboto', sans-serif",
                                  boxShadow: isSelected ? "0 4px 12px rgba(217,108,52,0.3)" : "none",
                                }}
                              >
                                <RadioGroupItem value={String(n)} className="sr-only" />
                                {n}
                              </label>
                            );
                          })}
                        </RadioGroup>
                      </div>
                    ) : (
                      <RadioGroup
                        value={currentResponse?.value || ""}
                        onValueChange={(v) => setResponse(question.id, v)}
                        className="space-y-2"
                      >
                        {question.options?.map((opt) => {
                          const isSelected = currentResponse?.value === opt.value;
                          return (
                            <label
                              key={opt.value}
                              className="flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all"
                              style={{
                                borderColor: isSelected ? "var(--sabine-cta)" : "var(--sabine-border)",
                                backgroundColor: isSelected ? "rgba(217,108,52,0.06)" : "var(--sabine-card)",
                                boxShadow: isSelected ? "0 2px 8px rgba(217,108,52,0.15)" : "none",
                              }}
                            >
                              <RadioGroupItem value={opt.value} className="mt-0.5" />
                              <span className="text-sm leading-relaxed" style={{ fontFamily: "'Open Sans', sans-serif", color: "var(--sabine-text)" }}>
                                {opt.label}
                              </span>
                            </label>
                          );
                        })}
                      </RadioGroup>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Bottom Navigation ── */}
          <div className="border-t sticky bottom-0" style={{ backgroundColor: "var(--sabine-card)", borderColor: "var(--sabine-border)" }}>
            <div className="container flex items-center justify-between py-4">
              <button
                onClick={handlePrev}
                className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all"
                style={{ color: "var(--sabine-muted-text)", fontFamily: "'Roboto', sans-serif" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--sabine-muted)"; e.currentTarget.style.color = "var(--sabine-text)"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--sabine-muted-text)"; }}
              >
                <ArrowLeft className="w-4 h-4" />
                {isFirstQuestion ? "Back to Info" : "Previous"}
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white transition-all"
                style={{ backgroundColor: "var(--sabine-cta)", fontFamily: "'Roboto', sans-serif" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta-hover)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta)")}
              >
                {isVeryLast ? "Submit Assessment" : "Next"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
