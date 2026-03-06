/**
 * Results Step — Tool-agnostic assessment results dashboard
 * Design: Clinical Precision — Swiss Medical Design
 */

import { useAssessment } from "@/contexts/AssessmentContext";
import { getActionTimeline } from "@/lib/shared/scoring";
import { generateEmployeePDF, generateEmployerPDF } from "@/lib/pdfReport";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Shield, Download, RotateCcw, FileText, Building2,
  AlertTriangle, CheckCircle2, AlertCircle, XCircle,
  Monitor, Home, Clock, Flame, Zap, AlertTriangle as AT, Brain, Eye, User, Sun,
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
  low:      <CheckCircle2 className="w-5 h-5" />,
  moderate: <AlertCircle className="w-5 h-5" />,
  high:     <AlertTriangle className="w-5 h-5" />,
  critical: <XCircle className="w-5 h-5" />,
};

const ratingBgColors: Record<string, string> = {
  low:      "bg-[#2D6A4F]/10 text-[#2D6A4F] border-[#2D6A4F]/20",
  moderate: "bg-[#D4A017]/10 text-[#D4A017] border-[#D4A017]/20",
  high:     "bg-[#C44536]/10 text-[#C44536] border-[#C44536]/20",
  critical: "bg-[#9B2226]/10 text-[#9B2226] border-[#9B2226]/20",
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
    try {
      generateEmployeePDF(result, employeeInfo, responses, compliance, photoDataUrl);
      toast.success("Employee report downloaded");
    } catch (e) {
      toast.error("Failed to generate PDF");
      console.error(e);
    }
  };

  const handleEmployerPDF = () => {
    try {
      generateEmployerPDF(result, employeeInfo, responses, compliance);
      toast.success("Employer report downloaded");
    } catch (e) {
      toast.error("Failed to generate PDF");
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden">
        <div className="relative z-10 container py-8">
          <nav className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                  Assessment Results
                </span>
                <p className="text-xs text-muted-foreground">{tool.name}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={resetAssessment} className="gap-2 text-muted-foreground">
              <RotateCcw className="w-4 h-4" />
              New Assessment
            </Button>
          </nav>

          <div className="max-w-4xl mx-auto">
            {/* Overall Score Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="border-2 overflow-hidden" style={{ borderColor: result.overallRatingColor + "40" }}>
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                    {/* Score Circle */}
                    <div className="relative w-36 h-36 shrink-0">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
                        <circle
                          cx="60" cy="60" r="52" fill="none"
                          stroke={result.overallRatingColor}
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={`${(result.overallScore / 100) * 327} 327`}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-data text-3xl font-bold" style={{ color: result.overallRatingColor }}>
                          {result.overallScore.toFixed(1)}
                        </span>
                        <span className="text-xs text-muted-foreground">/ 100</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={`text-sm px-3 py-1 font-medium border ${ratingBgColors[result.overallRating]}`} variant="outline">
                          {ratingIcons[result.overallRating]}
                          <span className="ml-1.5">{result.overallRatingLabel}</span>
                        </Badge>
                      </div>
                      <h1 className="font-heading text-3xl text-foreground mb-2">
                        Assessment for <span className="italic">{employeeInfo.name}</span>
                      </h1>
                      <p className="text-sm text-muted-foreground mb-3">
                        {employeeInfo.jobTitle && `${employeeInfo.jobTitle} · `}
                        {employeeInfo.department && `${employeeInfo.department} · `}
                        {employeeInfo.workLocation.charAt(0).toUpperCase() + employeeInfo.workLocation.slice(1)} worker
                        {compliance && ` · ${compliance.countryName}`}
                      </p>
                      <p className="text-sm font-medium" style={{ color: result.overallRatingColor }}>
                        {getActionTimeline(result.overallRating)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* PDF Download Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap gap-3 mt-6"
            >
              <Button onClick={handleEmployeePDF} variant="outline" className="gap-2">
                <FileText className="w-4 h-4" />
                Download Employee Report (PDF)
              </Button>
              <Button onClick={handleEmployerPDF} variant="outline" className="gap-2">
                <Building2 className="w-4 h-4" />
                Download Employer Report (PDF)
              </Button>
            </motion.div>

            {/* Category Breakdown */}
            <div className="mt-10 space-y-3">
              <h2 className="font-heading text-2xl text-foreground mb-4">
                Category <span className="italic">Breakdown</span>
              </h2>

              {result.categoryScores.map((cs, i) => {
                const cat = tool.categories.find((c) => c.id === cs.categoryId);
                const isExpanded = expandedCategories.has(cs.categoryId);

                return (
                  <motion.div
                    key={cs.categoryId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * i }}
                  >
                    <Card className="overflow-hidden">
                      <button onClick={() => toggleCategory(cs.categoryId)} className="w-full text-left">
                        <CardHeader className="p-4 pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: cs.ratingColor + "15", color: cs.ratingColor }}>
                                {cat && (iconMap[cat.icon] ?? <Shield className="w-5 h-5" />)}
                              </div>
                              <div>
                                <CardTitle className="text-sm font-semibold">{cs.categoryTitle}</CardTitle>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {cs.answeredCount}/{cs.questionCount} questions answered
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <span className="font-data text-lg font-bold" style={{ color: cs.ratingColor }}>
                                  {cs.score.toFixed(1)}
                                </span>
                                <Badge variant="outline" className={`ml-2 text-xs ${ratingBgColors[cs.rating]}`}>
                                  {cs.ratingLabel}
                                </Badge>
                              </div>
                              {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                            </div>
                          </div>
                          <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${cs.score}%`, backgroundColor: cs.ratingColor }} />
                          </div>
                        </CardHeader>
                      </button>

                      {isExpanded && (
                        <CardContent className="px-4 pb-4 pt-0">
                          <Separator className="mb-3" />
                          {cs.recommendations.length > 0 && (
                            <div>
                              <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
                                Recommendations
                              </p>
                              <ul className="space-y-2">
                                {cs.recommendations.map((rec, ri) => (
                                  <li key={ri} className="flex items-start gap-2 text-sm text-foreground">
                                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: cs.ratingColor }} />
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Recommendations Summary */}
            {result.recommendations.length > 0 && (
              <div className="mt-10">
                <h2 className="font-heading text-2xl text-foreground mb-4">
                  Priority <span className="italic">Action Plan</span>
                </h2>
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border bg-muted/50">
                            <th className="text-left p-3 font-medium text-muted-foreground text-xs tracking-wider uppercase">Priority</th>
                            <th className="text-left p-3 font-medium text-muted-foreground text-xs tracking-wider uppercase">Category</th>
                            <th className="text-left p-3 font-medium text-muted-foreground text-xs tracking-wider uppercase">Recommendation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.recommendations.map((rec, i) => (
                            <tr key={i} className="border-b border-border last:border-0">
                              <td className="p-3">
                                <Badge variant="outline" className={`text-xs ${
                                  rec.priority === "critical" ? ratingBgColors.critical
                                  : rec.priority === "high" ? ratingBgColors.high
                                  : ratingBgColors.moderate
                                }`}>
                                  {rec.priority.toUpperCase()}
                                </Badge>
                              </td>
                              <td className="p-3 text-muted-foreground whitespace-nowrap">{rec.categoryTitle}</td>
                              <td className="p-3">{rec.text}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Compliance Info */}
            {compliance && (
              <div className="mt-10">
                <h2 className="font-heading text-2xl text-foreground mb-4">
                  Compliance <span className="italic">Framework</span>
                </h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-1">Country</p>
                        <p className="text-sm font-medium">{compliance.countryName} ({compliance.countryCode})</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-1">Regulatory Body</p>
                        <p className="text-sm font-medium">{compliance.regulatoryBody}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-1">Regulatory Framework</p>
                        <p className="text-sm font-medium">{compliance.regulatoryFramework}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">Key Regulations</p>
                        <ul className="space-y-1">
                          {compliance.keyRegulations.map((reg, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                              {reg}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-1">Assessment Frequency</p>
                        <p className="text-sm text-muted-foreground">{compliance.assessmentFrequency}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Footer */}
            <div className="mt-12 mb-8 text-center">
              <p className="text-xs text-muted-foreground mb-4">
                Assessment completed on {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>
              <Button onClick={resetAssessment} variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Start New Assessment
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
