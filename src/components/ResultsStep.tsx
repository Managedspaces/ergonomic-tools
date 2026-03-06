/**
 * Results Step — Tool-agnostic assessment results dashboard
 * Design: Sabine brand — navy header, orange CTA, semantic risk colours
 */

import { useAssessment } from "@/contexts/AssessmentContext";
import { getActionTimeline } from "@/lib/shared/scoring";
import { generateEmployeePDF, generateEmployerPDF } from "@/lib/pdfReport";
import { Separator } from "@/components/ui/separator";
import {
  Shield, Download, RotateCcw, FileText, Building2,
  AlertTriangle, CheckCircle2, AlertCircle, XCircle,
  Monitor, Home, Clock, Flame, Zap, Brain, Eye, User, Sun,
  ChevronDown, ChevronUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const iconMap: Record<string, React.ReactNode> = {
  Monitor:       <Monitor className="w-5 h-5" />,
  Home:          <Home className="w-5 h-5" />,
  Clock:         <Clock className="w-5 h-5" />,
  Flame:         <Flame className="w-5 h-5" />,
  Zap:           <Zap className="w-5 h-5" />,
  AlertTriangle: <AlertTriangle className="w-5 h-5" />,
  Brain:         <Brain className="w-5 h-5" />,
  Eye:           <Eye className="w-5 h-5" />,
  User:          <User className="w-5 h-5" />,
  Sun:           <Sun className="w-5 h-5" />,
  Shield:        <Shield className="w-5 h-5" />,
};

const ratingIcons: Record<string, React.ReactNode> = {
  low:      <CheckCircle2 className="w-4 h-4" />,
  moderate: <AlertCircle className="w-4 h-4" />,
  high:     <AlertTriangle className="w-4 h-4" />,
  critical: <XCircle className="w-4 h-4" />,
};

const ratingBadgeStyle: Record<string, React.CSSProperties> = {
  low:      { backgroundColor: "#D1FAE5", color: "#065F46", border: "1px solid #A7F3D0" },
  moderate: { backgroundColor: "#FEF3C7", color: "#92400E", border: "1px solid #FDE68A" },
  high:     { backgroundColor: "#FFEDD5", color: "#9A3412", border: "1px solid #FED7AA" },
  critical: { backgroundColor: "#FEE2E2", color: "#991B1B", border: "1px solid #FECACA" },
};

const ratingColors: Record<string, string> = {
  low:      "#2ECC71",
  moderate: "#FFA500",
  high:     "#FF5A3C",
  critical: "#DC2626",
};

export default function ResultsStep() {
  const { tool, result, employeeInfo, responses, resetAssessment, photoDataUrl } = useAssessment();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  if (!result || !tool) return null;

  const compliance = tool.getComplianceTemplate(employeeInfo.country);

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleEmployeePDF = () => {
    try { generateEmployeePDF(result, employeeInfo, responses, compliance, photoDataUrl); toast.success("Employee report downloaded"); }
    catch (e) { toast.error("Failed to generate PDF"); console.error(e); }
  };

  const handleEmployerPDF = () => {
    try { generateEmployerPDF(result, employeeInfo, responses, compliance); toast.success("Employer report downloaded"); }
    catch (e) { toast.error("Failed to generate PDF"); console.error(e); }
  };

  const ratingColor = ratingColors[result.overallRating] ?? "#1A2B5F";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--sabine-bg)" }}>

      {/* ── Navigation ── */}
      <nav style={{ backgroundColor: "var(--sabine-navy)" }} className="sticky top-0 z-20 shadow-md">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--sabine-cta)" }}>
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none" style={{ fontFamily: "'Roboto', sans-serif" }}>
                Assessment Results
              </p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>{tool.name}</p>
            </div>
          </div>
          <button
            onClick={resetAssessment}
            className="flex items-center gap-1.5 text-sm transition-colors"
            style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Roboto', sans-serif" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
          >
            <RotateCcw className="w-4 h-4" /> New Assessment
          </button>
        </div>
      </nav>

      <div className="container py-10">
        <div className="max-w-4xl mx-auto">

          {/* ── Overall Score Card ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div
              className="rounded-2xl p-8 mb-6"
              style={{ backgroundColor: "var(--sabine-card)", border: `2px solid ${ratingColor}30`, boxShadow: `0 4px 20px ${ratingColor}15` }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                {/* Score Circle */}
                <div className="relative w-36 h-36 shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="#E0E0E0" strokeWidth="8" />
                    <circle
                      cx="60" cy="60" r="52" fill="none"
                      stroke={ratingColor}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(result.overallScore / 100) * 327} 327`}
                      style={{ transition: "stroke-dasharray 1s ease" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold" style={{ color: ratingColor, fontFamily: "'Roboto', sans-serif" }}>
                      {result.overallScore.toFixed(1)}
                    </span>
                    <span className="text-xs" style={{ color: "var(--sabine-muted-text)" }}>/ 100</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="risk-badge flex items-center gap-1.5"
                      style={ratingBadgeStyle[result.overallRating]}
                    >
                      {ratingIcons[result.overallRating]}
                      {result.overallRatingLabel}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
                    Assessment for {employeeInfo.name}
                  </h1>
                  <p className="text-sm mb-3" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                    {employeeInfo.jobTitle && `${employeeInfo.jobTitle} · `}
                    {employeeInfo.department && `${employeeInfo.department} · `}
                    {employeeInfo.workLocation.charAt(0).toUpperCase() + employeeInfo.workLocation.slice(1)} worker
                    {compliance && ` · ${compliance.countryName}`}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: ratingColor, fontFamily: "'Roboto', sans-serif" }}>
                    {getActionTimeline(result.overallRating)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── PDF Download Buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <button
              onClick={handleEmployeePDF}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white transition-all"
              style={{ backgroundColor: "var(--sabine-cta)", fontFamily: "'Roboto', sans-serif" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta-hover)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta)")}
            >
              <FileText className="w-4 h-4" /> Employee Report (PDF)
            </button>
            <button
              onClick={handleEmployerPDF}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all border"
              style={{ borderColor: "var(--sabine-navy)", color: "var(--sabine-navy)", backgroundColor: "transparent", fontFamily: "'Roboto', sans-serif" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--sabine-navy)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--sabine-navy)"; }}
            >
              <Building2 className="w-4 h-4" /> Employer Report (PDF)
            </button>
          </motion.div>

          {/* ── Category Breakdown ── */}
          <div className="mb-10">
            <p className="section-label mb-2">Results by Category</p>
            <h2 className="text-2xl font-bold mb-5" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
              Category Breakdown
            </h2>
            <div className="space-y-3">
              {result.categoryScores.map((cs, i) => {
                const cat = tool.categories.find((c) => c.id === cs.categoryId);
                const isExpanded = expandedCategories.has(cs.categoryId);
                const catColor = ratingColors[cs.rating] ?? "#1A2B5F";

                return (
                  <motion.div
                    key={cs.categoryId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * i }}
                    className="rounded-xl overflow-hidden"
                    style={{ backgroundColor: "var(--sabine-card)", border: "1px solid var(--sabine-border)" }}
                  >
                    <button onClick={() => toggleCategory(cs.categoryId)} className="w-full text-left p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${catColor}18`, color: catColor }}>
                            {cat && (iconMap[cat.icon] ?? <Shield className="w-5 h-5" />)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>{cs.categoryTitle}</p>
                            <p className="text-xs" style={{ color: "var(--sabine-muted-text)" }}>{cs.answeredCount}/{cs.questionCount} questions answered</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-lg font-bold" style={{ color: catColor, fontFamily: "'Roboto', sans-serif" }}>
                              {cs.score.toFixed(1)}
                            </span>
                            <span className="risk-badge ml-2" style={ratingBadgeStyle[cs.rating]}>{cs.ratingLabel}</span>
                          </div>
                          {isExpanded ? <ChevronUp className="w-4 h-4" style={{ color: "var(--sabine-muted-text)" }} /> : <ChevronDown className="w-4 h-4" style={{ color: "var(--sabine-muted-text)" }} />}
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--sabine-border)" }}>
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${cs.score}%`, backgroundColor: catColor }} />
                      </div>
                    </button>

                    {isExpanded && cs.recommendations.length > 0 && (
                      <div className="px-4 pb-4 pt-0">
                        <Separator className="mb-3" />
                        <p className="section-label mb-2">Recommendations</p>
                        <ul className="space-y-2">
                          {cs.recommendations.map((rec, ri) => (
                            <li key={ri} className="flex items-start gap-2 text-sm" style={{ color: "var(--sabine-text)", fontFamily: "'Open Sans', sans-serif" }}>
                              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: catColor }} />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── Priority Action Plan ── */}
          {result.recommendations.length > 0 && (
            <div className="mb-10">
              <p className="section-label mb-2">Action Plan</p>
              <h2 className="text-2xl font-bold mb-5" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
                Priority Recommendations
              </h2>
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "var(--sabine-card)", border: "1px solid var(--sabine-border)" }}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ backgroundColor: "var(--sabine-muted)", borderBottom: "1px solid var(--sabine-border)" }}>
                        <th className="text-left p-3 section-label">Priority</th>
                        <th className="text-left p-3 section-label">Category</th>
                        <th className="text-left p-3 section-label">Recommendation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.recommendations.map((rec, i) => (
                        <tr key={i} style={{ borderBottom: "1px solid var(--sabine-border)" }}>
                          <td className="p-3">
                            <span className="risk-badge" style={ratingBadgeStyle[rec.priority] ?? ratingBadgeStyle.moderate}>
                              {rec.priority.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-3" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif", whiteSpace: "nowrap" }}>
                            {rec.categoryTitle}
                          </td>
                          <td className="p-3" style={{ color: "var(--sabine-text)", fontFamily: "'Open Sans', sans-serif" }}>{rec.text}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── Compliance Framework ── */}
          {compliance && (
            <div className="mb-10">
              <p className="section-label mb-2">Legal Framework</p>
              <h2 className="text-2xl font-bold mb-5" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
                Compliance Information
              </h2>
              <div className="rounded-xl p-6" style={{ backgroundColor: "var(--sabine-card)", border: "1px solid var(--sabine-border)" }}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="section-label mb-1">Country</p>
                    <p className="text-sm font-semibold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
                      {compliance.countryName} ({compliance.countryCode})
                    </p>
                  </div>
                  <div>
                    <p className="section-label mb-1">Regulatory Body</p>
                    <p className="text-sm font-semibold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
                      {compliance.regulatoryBody}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="section-label mb-1">Regulatory Framework</p>
                    <p className="text-sm font-semibold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
                      {compliance.regulatoryFramework}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="section-label mb-2">Key Regulations</p>
                    <ul className="space-y-1.5">
                      {compliance.keyRegulations.map((reg, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                          <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: "var(--sabine-cta)" }} />
                          {reg}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="section-label mb-1">Assessment Frequency</p>
                    <p className="text-sm" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                      {compliance.assessmentFrequency}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Footer ── */}
          <div className="mt-8 mb-6 text-center">
            <p className="text-xs mb-5" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
              Assessment completed on {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
            <button
              onClick={resetAssessment}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all border"
              style={{ borderColor: "var(--sabine-navy)", color: "var(--sabine-navy)", backgroundColor: "transparent", fontFamily: "'Roboto', sans-serif" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--sabine-navy)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--sabine-navy)"; }}
            >
              <RotateCcw className="w-4 h-4" /> Start New Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
