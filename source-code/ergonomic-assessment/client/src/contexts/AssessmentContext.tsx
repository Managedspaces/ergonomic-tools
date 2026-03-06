/**
 * Assessment State Management Context
 * Manages the full assessment flow: employee info → questions → results
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { CATEGORIES } from "@/lib/questionnaire";
import { calculateAssessment, type QuestionResponse, type AssessmentResult } from "@/lib/scoring";

export interface EmployeeInfo {
  name: string;
  email: string;
  jobTitle: string;
  department: string;
  workLocation: "office" | "home" | "hybrid" | "other";
  country: string;
}

export type AssessmentStep = "welcome" | "info" | "questions" | "results";

interface AssessmentState {
  step: AssessmentStep;
  employeeInfo: EmployeeInfo;
  responses: QuestionResponse[];
  currentCategoryIndex: number;
  currentQuestionIndex: number;
  result: AssessmentResult | null;
  photoDataUrl: string | null;
}

interface AssessmentContextType extends AssessmentState {
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
  workLocation: "office",
  country: "UK",
};

const AssessmentContext = createContext<AssessmentContextType | null>(null);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AssessmentState>({
    step: "welcome",
    employeeInfo: defaultEmployeeInfo,
    responses: [],
    currentCategoryIndex: 0,
    currentQuestionIndex: 0,
    result: null,
    photoDataUrl: null,
  });

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
    (questionId: string) => {
      return state.responses.find((r) => r.questionId === questionId);
    },
    [state.responses]
  );

  const nextQuestion = useCallback(() => {
    setState((s) => {
      const category = CATEGORIES[s.currentCategoryIndex];
      if (s.currentQuestionIndex < category.questions.length - 1) {
        return { ...s, currentQuestionIndex: s.currentQuestionIndex + 1 };
      } else if (s.currentCategoryIndex < CATEGORIES.length - 1) {
        return { ...s, currentCategoryIndex: s.currentCategoryIndex + 1, currentQuestionIndex: 0 };
      }
      return s;
    });
  }, []);

  const prevQuestion = useCallback(() => {
    setState((s) => {
      if (s.currentQuestionIndex > 0) {
        return { ...s, currentQuestionIndex: s.currentQuestionIndex - 1 };
      } else if (s.currentCategoryIndex > 0) {
        const prevCat = CATEGORIES[s.currentCategoryIndex - 1];
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
    const result = calculateAssessment(state.responses);
    setState((s) => ({ ...s, result, step: "results" }));
    return result;
  }, [state.responses]);

  const resetAssessment = useCallback(() => {
    setState({
      step: "welcome",
      employeeInfo: defaultEmployeeInfo,
      responses: [],
      currentCategoryIndex: 0,
      currentQuestionIndex: 0,
      result: null,
      photoDataUrl: null,
    });
  }, []);

  const setPhotoDataUrl = useCallback((url: string | null) => {
    setState((s) => ({ ...s, photoDataUrl: url }));
  }, []);

  // Calculate progress
  const totalAnswered = state.responses.filter((r) => {
    for (const cat of CATEGORIES) {
      const q = cat.questions.find((q) => q.id === r.questionId);
      if (q && q.type !== "text_comment") return true;
    }
    return false;
  }).length;

  const totalScorable = CATEGORIES.reduce(
    (sum, cat) => sum + cat.questions.filter((q) => q.type !== "text_comment").length,
    0
  );

  const currentCat = CATEGORIES[state.currentCategoryIndex];
  const catAnswered = currentCat
    ? state.responses.filter((r) => currentCat.questions.some((q) => q.id === r.questionId && q.type !== "text_comment")).length
    : 0;
  const catScorable = currentCat
    ? currentCat.questions.filter((q) => q.type !== "text_comment").length
    : 0;

  const totalProgress = totalScorable > 0 ? (totalAnswered / totalScorable) * 100 : 0;
  const categoryProgress = catScorable > 0 ? (catAnswered / catScorable) * 100 : 0;

  return (
    <AssessmentContext.Provider
      value={{
        ...state,
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
