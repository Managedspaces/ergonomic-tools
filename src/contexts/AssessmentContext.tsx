/**
 * Platform Core — Generic Assessment Context
 * Works with any ToolModule from the registry.
 * Replaces the ergonomic-specific context with a tool-agnostic version.
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { calculateAssessment } from "@/lib/shared/scoring";
import type {
  ToolModule,
  QuestionResponse,
  AssessmentResult,
  EmployeeInfo,
} from "@/lib/shared/types";

export type AssessmentStep = "welcome" | "info" | "questions" | "results";

interface AssessmentState {
  tool: ToolModule | null;
  step: AssessmentStep;
  employeeInfo: EmployeeInfo;
  responses: QuestionResponse[];
  currentCategoryIndex: number;
  currentQuestionIndex: number;
  result: AssessmentResult | null;
  photoDataUrl: string | null;
}

interface AssessmentContextType extends AssessmentState {
  setTool: (tool: ToolModule | null) => void;
  setStep: (step: AssessmentStep) => void;
  setEmployeeInfo: (info: EmployeeInfo) => void;
  setResponse: (questionId: string, value: string, textComment?: string) => void;
  getResponse: (questionId: string) => QuestionResponse | undefined;
  nextQuestion: () => void;
  prevQuestion: () => void;
  goToCategory: (index: number) => void;
  submitAssessment: () => AssessmentResult;
  resetAssessment: () => void;
  setPhotoDataUrl: (url: string | null) => void;
  totalProgress: number;
  categoryProgress: number;
}

const defaultEmployeeInfo: EmployeeInfo = {
  name: "",
  email: "",
  jobTitle: "",
  department: "",
  workLocation: "home",
  country: "IE",
};

const AssessmentContext = createContext<AssessmentContextType | null>(null);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AssessmentState>({
    tool: null,
    step: "welcome",
    employeeInfo: defaultEmployeeInfo,
    responses: [],
    currentCategoryIndex: 0,
    currentQuestionIndex: 0,
    result: null,
    photoDataUrl: null,
  });

  const setTool = useCallback((tool: ToolModule | null) => {
    setState((s) => ({
      ...s,
      tool,
      step: "welcome",
      responses: [],
      currentCategoryIndex: 0,
      currentQuestionIndex: 0,
      result: null,
    }));
  }, []);

  const setStep = useCallback((step: AssessmentStep) => {
    setState((s) => ({ ...s, step }));
  }, []);

  const setEmployeeInfo = useCallback((info: EmployeeInfo) => {
    setState((s) => ({ ...s, employeeInfo: info }));
  }, []);

  const setResponse = useCallback((questionId: string, value: string, textComment?: string) => {
    setState((s) => {
      const existing = s.responses.findIndex((r) => r.questionId === questionId);
      const newResponse: QuestionResponse = { questionId, value, textComment };
      const responses = [...s.responses];
      if (existing >= 0) {
        responses[existing] = newResponse;
      } else {
        responses.push(newResponse);
      }
      return { ...s, responses };
    });
  }, []);

  const getResponse = useCallback(
    (questionId: string) => state.responses.find((r) => r.questionId === questionId),
    [state.responses]
  );

  const nextQuestion = useCallback(() => {
    setState((s) => {
      if (!s.tool) return s;
      const categories = s.tool.categories;
      const category = categories[s.currentCategoryIndex];
      if (s.currentQuestionIndex < category.questions.length - 1) {
        return { ...s, currentQuestionIndex: s.currentQuestionIndex + 1 };
      } else if (s.currentCategoryIndex < categories.length - 1) {
        return { ...s, currentCategoryIndex: s.currentCategoryIndex + 1, currentQuestionIndex: 0 };
      }
      return s;
    });
  }, []);

  const prevQuestion = useCallback(() => {
    setState((s) => {
      if (!s.tool) return s;
      const categories = s.tool.categories;
      if (s.currentQuestionIndex > 0) {
        return { ...s, currentQuestionIndex: s.currentQuestionIndex - 1 };
      } else if (s.currentCategoryIndex > 0) {
        const prevCat = categories[s.currentCategoryIndex - 1];
        return {
          ...s,
          currentCategoryIndex: s.currentCategoryIndex - 1,
          currentQuestionIndex: prevCat.questions.length - 1,
        };
      }
      return s;
    });
  }, []);

  const goToCategory = useCallback((index: number) => {
    setState((s) => ({ ...s, currentCategoryIndex: index, currentQuestionIndex: 0 }));
  }, []);

  const submitAssessment = useCallback(() => {
    if (!state.tool) throw new Error("No tool selected");
    const result = calculateAssessment(
      state.tool.categories,
      state.responses,
      state.tool.getRecommendations
    );
    setState((s) => ({ ...s, result, step: "results" }));
    return result;
  }, [state.tool, state.responses]);

  const resetAssessment = useCallback(() => {
    setState((s) => ({
      tool: s.tool, // Keep the tool selected
      step: "welcome",
      employeeInfo: defaultEmployeeInfo,
      responses: [],
      currentCategoryIndex: 0,
      currentQuestionIndex: 0,
      result: null,
      photoDataUrl: null,
    }));
  }, []);

  const setPhotoDataUrl = useCallback((url: string | null) => {
    setState((s) => ({ ...s, photoDataUrl: url }));
  }, []);

  // ─── Progress Calculation ───────────────────────────────────────────────
  const categories = state.tool?.categories ?? [];

  const totalScorable = categories.reduce(
    (sum, cat) => sum + cat.questions.filter((q) => q.type !== "text_comment").length,
    0
  );
  const totalAnswered = state.responses.filter((r) => {
    for (const cat of categories) {
      const q = cat.questions.find((q) => q.id === r.questionId);
      if (q && q.type !== "text_comment") return true;
    }
    return false;
  }).length;

  const currentCat = categories[state.currentCategoryIndex];
  const catScorable = currentCat
    ? currentCat.questions.filter((q) => q.type !== "text_comment").length
    : 0;
  const catAnswered = currentCat
    ? state.responses.filter((r) =>
        currentCat.questions.some((q) => q.id === r.questionId && q.type !== "text_comment")
      ).length
    : 0;

  const totalProgress = totalScorable > 0 ? (totalAnswered / totalScorable) * 100 : 0;
  const categoryProgress = catScorable > 0 ? (catAnswered / catScorable) * 100 : 0;

  return (
    <AssessmentContext.Provider
      value={{
        ...state,
        setTool,
        setStep,
        setEmployeeInfo,
        setResponse,
        getResponse,
        nextQuestion,
        prevQuestion,
        goToCategory,
        submitAssessment,
        resetAssessment,
        setPhotoDataUrl,
        totalProgress,
        categoryProgress,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error("useAssessment must be used within AssessmentProvider");
  return ctx;
}
