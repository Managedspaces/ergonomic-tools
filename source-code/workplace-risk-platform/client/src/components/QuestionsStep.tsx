/**
 * Questions Step — Tool-agnostic step-by-step assessment with category sidebar
 * Design: Clinical Precision — Swiss Medical Design
 */

import { useAssessment } from "@/contexts/AssessmentContext";
import { Button } from "@/components/ui/button";
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
    if (isFirstQuestion) {
      setStep("info");
    } else {
      prevQuestion();
    }
  };

  let globalIndex = 0;
  for (let ci = 0; ci < currentCategoryIndex; ci++) {
    globalIndex += categories[ci].questions.length;
  }
  globalIndex += currentQuestionIndex + 1;
  const totalQuestions = categories.reduce((s, c) => s + c.questions.length, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xs font-semibold tracking-wide uppercase text-muted-foreground hidden sm:block">
              {tool.name}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground font-data">
              {globalIndex} / {totalQuestions}
            </span>
            <div className="w-32 sm:w-48">
              <Progress value={totalProgress} className="h-1.5" />
            </div>
            <span className="text-xs font-medium text-muted-foreground font-data">
              {Math.round(totalProgress)}%
            </span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Category Sidebar — Desktop */}
        <aside className="hidden lg:block w-64 border-r border-border bg-card p-4 shrink-0">
          <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4 px-2">
            Categories
          </p>
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
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-all text-sm ${
                    isActive
                      ? "bg-primary/10 text-foreground font-medium"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <div className={`w-7 h-7 rounded flex items-center justify-center shrink-0 ${
                    isActive ? "bg-primary text-primary-foreground" : isComplete ? "bg-chart-1/20 text-chart-1" : "bg-secondary text-muted-foreground"
                  }`}>
                    {isComplete ? <Check className="w-3.5 h-3.5" /> : (iconMap[cat.icon] ?? <Shield className="w-4 h-4" />)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block truncate text-xs">{cat.title}</span>
                    <span className="block text-[10px] text-muted-foreground font-data">
                      {answered}/{total}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Category Bar */}
        <div className="lg:hidden border-b border-border bg-card overflow-x-auto fixed top-[53px] left-0 right-0 z-10">
          <div className="flex gap-1 p-2 min-w-max">
            {categories.map((cat, i) => {
              const isActive = i === currentCategoryIndex;
              const answered = getCategoryAnswered(i);
              const total = getCategoryScorable(i);
              const isComplete = answered === total;

              return (
                <button
                  key={cat.id}
                  onClick={() => goToCategory(i)}
                  className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground font-medium"
                      : isComplete
                        ? "bg-chart-1/10 text-chart-1"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {cat.title.split(" ")[0]} {isComplete ? "✓" : `${answered}/${total}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Question Area */}
        <main className="flex-1 flex flex-col lg:pt-0 pt-12">
          <div className="flex-1 flex items-start justify-center p-6 lg:p-12">
            <div className="w-full max-w-2xl">
              {/* Category Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-primary">
                    {iconMap[category.icon] ?? <Shield className="w-4 h-4" />}
                  </div>
                  <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                    {category.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Question {currentQuestionIndex + 1} of {category.questions.length}</span>
                  {question.required && (
                    <span className="px-1.5 py-0.5 bg-destructive/10 text-destructive rounded text-[10px] font-medium">
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
                  <h2 className="font-heading text-2xl lg:text-3xl text-foreground mb-3 leading-snug">
                    {question.text}
                  </h2>
                  {question.helpText && (
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
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
                      />
                    ) : question.type === "scale_rating" ? (
                      <div>
                        <div className="flex justify-between text-xs text-muted-foreground mb-3">
                          <span>{question.scaleLabels?.low}</span>
                          <span>{question.scaleLabels?.high}</span>
                        </div>
                        <RadioGroup
                          value={currentResponse?.value || ""}
                          onValueChange={(v) => setResponse(question.id, v)}
                          className="flex gap-3 justify-center"
                        >
                          {[1, 2, 3, 4, 5].map((n) => (
                            <label
                              key={n}
                              className={`w-14 h-14 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all font-data text-lg font-semibold ${
                                currentResponse?.value === String(n)
                                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                                  : "border-border bg-card text-foreground hover:border-muted-foreground"
                              }`}
                            >
                              <RadioGroupItem value={String(n)} className="sr-only" />
                              {n}
                            </label>
                          ))}
                        </RadioGroup>
                      </div>
                    ) : (
                      <RadioGroup
                        value={currentResponse?.value || ""}
                        onValueChange={(v) => setResponse(question.id, v)}
                        className="space-y-2"
                      >
                        {question.options?.map((opt) => (
                          <label
                            key={opt.value}
                            className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              currentResponse?.value === opt.value
                                ? "border-primary bg-primary/5 shadow-sm"
                                : "border-border bg-card hover:border-muted-foreground/50"
                            }`}
                          >
                            <RadioGroupItem value={opt.value} className="mt-0.5" />
                            <span className="text-sm leading-relaxed">{opt.label}</span>
                          </label>
                        ))}
                      </RadioGroup>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="border-t border-border bg-card/80 backdrop-blur-sm sticky bottom-0">
            <div className="container flex items-center justify-between py-4">
              <Button
                variant="ghost"
                onClick={handlePrev}
                className="gap-2 text-muted-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                {isFirstQuestion ? "Back to Info" : "Previous"}
              </Button>

              <Button onClick={handleNext} className="gap-2 px-6">
                {isVeryLast ? "Submit Assessment" : "Next"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
