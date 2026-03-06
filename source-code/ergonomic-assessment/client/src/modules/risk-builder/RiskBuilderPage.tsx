/**
 * Risk Assessment Builder — Main Page
 * A fully self-contained, standalone page for the dynamic risk builder.
 * Does NOT use the generic AssessmentContext — it has its own state management.
 */

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowLeft, ArrowRight, Plus, Trash2, ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, FileText, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HAZARD_LIBRARY, type HazardCategory } from "./library";
import { calculateRiskScore, getRiskLevelBadgeClass, LIKELIHOOD_LABELS, SEVERITY_LABELS, calculateOverallRating } from "./scoring";
import { createEmptyHazard, type HazardEntry, type RiskBuilderAssessment } from "./types";
import { RiskBuilderPDF } from "./RiskBuilderPDF";

type Step = "setup" | "select" | "assess" | "review" | "complete";

const ICON_COLOR_MAP: Record<string, string> = {
  amber:  "bg-amber-100 text-amber-700 border-amber-200",
  orange: "bg-orange-100 text-orange-700 border-orange-200",
  red:    "bg-red-100 text-red-700 border-red-200",
  yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
  purple: "bg-purple-100 text-purple-700 border-purple-200",
  sky:    "bg-sky-100 text-sky-700 border-sky-200",
  violet: "bg-violet-100 text-violet-700 border-violet-200",
  blue:   "bg-blue-100 text-blue-700 border-blue-200",
  gray:   "bg-gray-100 text-gray-700 border-gray-200",
};

interface SetupData {
  assessorName: string;
  assessorRole: string;
  companyName: string;
  location: string;
  department: string;
  assessmentDate: string;
  reviewDate: string;
  country: string;
}

export default function RiskBuilderPage({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<Step>("setup");
  const [setup, setSetup] = useState<SetupData>({
    assessorName: "",
    assessorRole: "",
    companyName: "",
    location: "",
    department: "",
    assessmentDate: new Date().toISOString().split("T")[0],
    reviewDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    country: "IE",
  });
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [hazards, setHazards] = useState<HazardEntry[]>([]);
  const [expandedHazard, setExpandedHazard] = useState<string | null>(null);
  const [assessment, setAssessment] = useState<RiskBuilderAssessment | null>(null);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setHazards((h) => h.filter((hz) => hz.categoryId !== id));
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const addHazard = (category: HazardCategory) => {
    const newHazard = createEmptyHazard(category.id, category.title);
    setHazards((prev) => [...prev, newHazard]);
    setExpandedHazard(newHazard.id);
  };

  const removeHazard = (id: string) => {
    setHazards((prev) => prev.filter((h) => h.id !== id));
  };

  const updateHazard = useCallback((id: string, updates: Partial<HazardEntry>) => {
    setHazards((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const updated = { ...h, ...updates };
        // Recalculate initial risk score
        const initial = calculateRiskScore(updated.likelihood, updated.severity);
        updated.riskScore = initial.score;
        updated.riskLevel = initial.level;
        // Recalculate residual risk score
        const residual = calculateRiskScore(updated.residualLikelihood, updated.residualSeverity);
        updated.residualScore = residual.score;
        updated.residualLevel = residual.level;
        return updated;
      })
    );
  }, []);

  const toggleControl = (hazardId: string, control: string) => {
    setHazards((prev) =>
      prev.map((h) => {
        if (h.id !== hazardId) return h;
        const controls = h.selectedControls.includes(control)
          ? h.selectedControls.filter((c) => c !== control)
          : [...h.selectedControls, control];
        return { ...h, selectedControls: controls };
      })
    );
  };

  const finalise = () => {
    const scores = hazards.map((h) => h.riskScore);
    const result: RiskBuilderAssessment = {
      id: crypto.randomUUID(),
      ...setup,
      hazards,
      overallRating: calculateOverallRating(scores),
      completedAt: new Date().toISOString(),
    };
    setAssessment(result);
    setStep("complete");
  };

  const reset = () => {
    setStep("setup");
    setSetup({
      assessorName: "", assessorRole: "", companyName: "", location: "",
      department: "", assessmentDate: new Date().toISOString().split("T")[0],
      reviewDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      country: "IE",
    });
    setSelectedCategories(new Set());
    setHazards([]);
    setAssessment(null);
  };

  const hazardsByCategory = HAZARD_LIBRARY.filter((c) => selectedCategories.has(c.id));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4 flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mr-2">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="w-9 h-9 bg-rose-600 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground leading-none">Risk Assessment Builder</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {step === "setup" && "Step 1 of 4 — Assessment Details"}
              {step === "select" && "Step 2 of 4 — Select Hazard Categories"}
              {step === "assess" && "Step 3 of 4 — Assess Hazards"}
              {step === "review" && "Step 4 of 4 — Review & Finalise"}
              {step === "complete" && "Assessment Complete"}
            </p>
          </div>
          {step !== "setup" && step !== "complete" && (
            <div className="ml-auto flex gap-1">
              {["setup", "select", "assess", "review"].map((s, i) => (
                <div key={s} className={`w-2 h-2 rounded-full transition-colors ${
                  ["setup", "select", "assess", "review"].indexOf(step) >= i
                    ? "bg-rose-600" : "bg-muted"
                }`} />
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="container py-8 max-w-3xl">
        <AnimatePresence mode="wait">

          {/* ── STEP 1: SETUP ─────────────────────────────── */}
          {step === "setup" && (
            <motion.div key="setup" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <h1 className="font-heading text-3xl mb-2">Assessment Details</h1>
              <p className="text-muted-foreground mb-8">Enter the details of the assessment and the assessor before identifying hazards.</p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Assessor Name *", key: "assessorName", placeholder: "e.g., Jane Smith" },
                  { label: "Assessor Role *", key: "assessorRole", placeholder: "e.g., Health & Safety Officer" },
                  { label: "Company / Organisation *", key: "companyName", placeholder: "e.g., Acme Ltd" },
                  { label: "Location / Site *", key: "location", placeholder: "e.g., Head Office, Dublin" },
                  { label: "Department / Area", key: "department", placeholder: "e.g., Warehouse" },
                ].map(({ label, key, placeholder }) => (
                  <div key={key} className={key === "companyName" ? "sm:col-span-2" : ""}>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
                    <input
                      type="text"
                      value={(setup as any)[key]}
                      onChange={(e) => setSetup((s) => ({ ...s, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Assessment Date *</label>
                  <input type="date" value={setup.assessmentDate}
                    onChange={(e) => setSetup((s) => ({ ...s, assessmentDate: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Review Date *</label>
                  <input type="date" value={setup.reviewDate}
                    onChange={(e) => setSetup((s) => ({ ...s, reviewDate: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-1.5">Jurisdiction / Country</label>
                  <select value={setup.country}
                    onChange={(e) => setSetup((s) => ({ ...s, country: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    {[["IE","Ireland"],["UK","United Kingdom"],["DE","Germany"],["CH","Switzerland"],["DK","Denmark"],["AU","Australia"]].map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  onClick={() => setStep("select")}
                  disabled={!setup.assessorName || !setup.assessorRole || !setup.companyName || !setup.location}
                  className="bg-rose-600 hover:bg-rose-700 text-white"
                >
                  Next: Select Hazards
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: SELECT CATEGORIES ─────────────────── */}
          {step === "select" && (
            <motion.div key="select" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <h1 className="font-heading text-3xl mb-2">Select Hazard Categories</h1>
              <p className="text-muted-foreground mb-8">Select all hazard categories relevant to this workplace. You can add multiple specific hazards within each category.</p>

              <div className="grid sm:grid-cols-2 gap-3">
                {HAZARD_LIBRARY.map((cat) => {
                  const selected = selectedCategories.has(cat.id);
                  const colorClass = ICON_COLOR_MAP[cat.color] ?? ICON_COLOR_MAP.gray;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className={`text-left rounded-xl border-2 p-4 transition-all ${
                        selected
                          ? "border-rose-500 bg-rose-50/50 shadow-sm"
                          : "border-border hover:border-rose-300 bg-card"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                          {selected ? <CheckCircle2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{cat.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{cat.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setStep("setup")}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button
                  onClick={() => setStep("assess")}
                  disabled={selectedCategories.size === 0}
                  className="bg-rose-600 hover:bg-rose-700 text-white"
                >
                  Next: Assess Hazards ({selectedCategories.size} selected)
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: ASSESS HAZARDS ────────────────────── */}
          {step === "assess" && (
            <motion.div key="assess" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <h1 className="font-heading text-3xl mb-2">Assess Hazards</h1>
              <p className="text-muted-foreground mb-8">For each hazard category, add the specific hazards you have identified. Rate the likelihood and severity, then select control measures.</p>

              <div className="space-y-6">
                {hazardsByCategory.map((cat) => {
                  const catHazards = hazards.filter((h) => h.categoryId === cat.id);
                  const colorClass = ICON_COLOR_MAP[cat.color] ?? ICON_COLOR_MAP.gray;
                  return (
                    <div key={cat.id} className="rounded-xl border border-border bg-card overflow-hidden">
                      {/* Category Header */}
                      <div className={`px-5 py-4 border-b border-border flex items-center justify-between bg-muted/30`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${colorClass}`}>
                            <Shield className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-foreground">{cat.title}</p>
                            <p className="text-xs text-muted-foreground">{catHazards.length} hazard{catHazards.length !== 1 ? "s" : ""} identified</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => addHazard(cat)} className="text-xs">
                          <Plus className="w-3 h-3 mr-1" /> Add Hazard
                        </Button>
                      </div>

                      {/* Hazard Cards */}
                      {catHazards.length === 0 && (
                        <div className="px-5 py-6 text-center text-sm text-muted-foreground">
                          Click "Add Hazard" to identify a specific hazard in this category.
                        </div>
                      )}

                      {catHazards.map((hazard, idx) => {
                        const isExpanded = expandedHazard === hazard.id;
                        const riskInfo = calculateRiskScore(hazard.likelihood, hazard.severity);
                        const residualInfo = calculateRiskScore(hazard.residualLikelihood, hazard.residualSeverity);
                        return (
                          <div key={hazard.id} className="border-t border-border">
                            {/* Hazard Summary Row */}
                            <div
                              className="px-5 py-3 flex items-center gap-3 cursor-pointer hover:bg-muted/20 transition-colors"
                              onClick={() => setExpandedHazard(isExpanded ? null : hazard.id)}
                            >
                              <span className="text-xs text-muted-foreground w-5 flex-shrink-0">#{idx + 1}</span>
                              <p className="text-sm flex-1 text-foreground truncate">
                                {hazard.hazardDescription || <span className="text-muted-foreground italic">Unnamed hazard — click to edit</span>}
                              </p>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getRiskLevelBadgeClass(riskInfo.level)}`}>
                                  {riskInfo.score} — {riskInfo.label}
                                </span>
                                <button onClick={(e) => { e.stopPropagation(); removeHazard(hazard.id); }} className="text-muted-foreground hover:text-destructive transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                              </div>
                            </div>

                            {/* Expanded Hazard Form */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-5 pb-6 pt-2 space-y-5 bg-muted/10">
                                    {/* Quick-select hazard descriptions */}
                                    {cat.commonHazards.length > 0 && (
                                      <div>
                                        <p className="text-xs font-medium text-muted-foreground mb-2">Quick select a common hazard:</p>
                                        <div className="flex flex-wrap gap-1.5">
                                          {cat.commonHazards.map((h) => (
                                            <button key={h} onClick={() => updateHazard(hazard.id, { hazardDescription: h })}
                                              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                                                hazard.hazardDescription === h
                                                  ? "bg-rose-100 border-rose-300 text-rose-700"
                                                  : "bg-white border-border text-muted-foreground hover:border-rose-300"
                                              }`}
                                            >{h}</button>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Hazard description */}
                                    <div>
                                      <label className="block text-xs font-medium text-foreground mb-1.5">Hazard Description *</label>
                                      <input type="text" value={hazard.hazardDescription}
                                        onChange={(e) => updateHazard(hazard.id, { hazardDescription: e.target.value })}
                                        placeholder="Describe the specific hazard..."
                                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                                      />
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-xs font-medium text-foreground mb-1.5">Who might be harmed?</label>
                                        <input type="text" value={hazard.personsAtRisk}
                                          onChange={(e) => updateHazard(hazard.id, { personsAtRisk: e.target.value })}
                                          placeholder="e.g., All employees, visitors"
                                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs font-medium text-foreground mb-1.5">Existing controls in place</label>
                                        <input type="text" value={hazard.existingControls}
                                          onChange={(e) => updateHazard(hazard.id, { existingControls: e.target.value })}
                                          placeholder="e.g., Warning signs, non-slip mats"
                                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                                        />
                                      </div>
                                    </div>

                                    {/* Risk Matrix */}
                                    <div className="rounded-xl border border-border p-4 bg-white">
                                      <p className="text-xs font-semibold text-foreground mb-4 uppercase tracking-wide">Initial Risk Rating (Before Controls)</p>
                                      <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                          <div className="flex items-center justify-between mb-2">
                                            <label className="text-xs font-medium text-foreground">Likelihood</label>
                                            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">{hazard.likelihood}</span>
                                          </div>
                                          <input type="range" min={1} max={5} value={hazard.likelihood}
                                            onChange={(e) => updateHazard(hazard.id, { likelihood: Number(e.target.value) })}
                                            className="w-full accent-rose-600"
                                          />
                                          <p className="text-xs text-muted-foreground mt-1">{LIKELIHOOD_LABELS[hazard.likelihood]}</p>
                                        </div>
                                        <div>
                                          <div className="flex items-center justify-between mb-2">
                                            <label className="text-xs font-medium text-foreground">Severity</label>
                                            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">{hazard.severity}</span>
                                          </div>
                                          <input type="range" min={1} max={5} value={hazard.severity}
                                            onChange={(e) => updateHazard(hazard.id, { severity: Number(e.target.value) })}
                                            className="w-full accent-rose-600"
                                          />
                                          <p className="text-xs text-muted-foreground mt-1">{SEVERITY_LABELS[hazard.severity]}</p>
                                        </div>
                                      </div>
                                      <div className={`mt-4 rounded-lg border p-3 ${riskInfo.bgColor} ${riskInfo.borderColor}`}>
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <p className={`text-sm font-bold ${riskInfo.color}`}>{riskInfo.label}</p>
                                            <p className={`text-xs mt-0.5 ${riskInfo.color} opacity-80`}>{riskInfo.action}</p>
                                          </div>
                                          <span className={`text-2xl font-black ${riskInfo.color}`}>{riskInfo.score}</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Control Measures */}
                                    <div>
                                      <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">Additional Control Measures</p>
                                      <div className="space-y-1.5">
                                        {cat.suggestedControls.map((ctrl) => (
                                          <label key={ctrl} className="flex items-start gap-2.5 cursor-pointer group">
                                            <input type="checkbox"
                                              checked={hazard.selectedControls.includes(ctrl)}
                                              onChange={() => toggleControl(hazard.id, ctrl)}
                                              className="mt-0.5 accent-rose-600 flex-shrink-0"
                                            />
                                            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">{ctrl}</span>
                                          </label>
                                        ))}
                                      </div>
                                      <div className="mt-3">
                                        <input type="text" value={hazard.customControl}
                                          onChange={(e) => updateHazard(hazard.id, { customControl: e.target.value })}
                                          placeholder="Add a custom control measure..."
                                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                                        />
                                      </div>
                                    </div>

                                    {/* Residual Risk */}
                                    <div className="rounded-xl border border-border p-4 bg-white">
                                      <p className="text-xs font-semibold text-foreground mb-4 uppercase tracking-wide">Residual Risk (After Controls)</p>
                                      <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                          <div className="flex items-center justify-between mb-2">
                                            <label className="text-xs font-medium text-foreground">Residual Likelihood</label>
                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{hazard.residualLikelihood}</span>
                                          </div>
                                          <input type="range" min={1} max={5} value={hazard.residualLikelihood}
                                            onChange={(e) => updateHazard(hazard.id, { residualLikelihood: Number(e.target.value) })}
                                            className="w-full accent-emerald-600"
                                          />
                                        </div>
                                        <div>
                                          <div className="flex items-center justify-between mb-2">
                                            <label className="text-xs font-medium text-foreground">Residual Severity</label>
                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{hazard.residualSeverity}</span>
                                          </div>
                                          <input type="range" min={1} max={5} value={hazard.residualSeverity}
                                            onChange={(e) => updateHazard(hazard.id, { residualSeverity: Number(e.target.value) })}
                                            className="w-full accent-emerald-600"
                                          />
                                        </div>
                                      </div>
                                      <div className={`mt-4 rounded-lg border p-3 ${residualInfo.bgColor} ${residualInfo.borderColor}`}>
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <p className={`text-sm font-bold ${residualInfo.color}`}>Residual: {residualInfo.label}</p>
                                            <p className={`text-xs mt-0.5 ${residualInfo.color} opacity-80`}>{residualInfo.action}</p>
                                          </div>
                                          <span className={`text-2xl font-black ${residualInfo.color}`}>{residualInfo.score}</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Action */}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-xs font-medium text-foreground mb-1.5">Action By (Person Responsible)</label>
                                        <input type="text" value={hazard.actionBy}
                                          onChange={(e) => updateHazard(hazard.id, { actionBy: e.target.value })}
                                          placeholder="e.g., Facilities Manager"
                                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs font-medium text-foreground mb-1.5">Target Completion Date</label>
                                        <input type="date" value={hazard.actionDate}
                                          onChange={(e) => updateHazard(hazard.id, { actionDate: e.target.value })}
                                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setStep("select")}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button
                  onClick={() => setStep("review")}
                  disabled={hazards.length === 0}
                  className="bg-rose-600 hover:bg-rose-700 text-white"
                >
                  Review Assessment ({hazards.length} hazard{hazards.length !== 1 ? "s" : ""})
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 4: REVIEW ────────────────────────────── */}
          {step === "review" && (
            <motion.div key="review" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <h1 className="font-heading text-3xl mb-2">Review & Finalise</h1>
              <p className="text-muted-foreground mb-8">Review all identified hazards below, sorted by risk level. Once satisfied, finalise the assessment to generate your compliance report.</p>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {(["critical","high","moderate","low"] as const).map((level) => {
                  const count = hazards.filter((h) => h.riskLevel === level).length;
                  return (
                    <div key={level} className={`rounded-xl border p-4 text-center ${getRiskLevelBadgeClass(level)}`}>
                      <p className="text-2xl font-black">{count}</p>
                      <p className="text-xs font-medium capitalize mt-0.5">{level}</p>
                    </div>
                  );
                })}
              </div>

              {/* Hazard Table */}
              <div className="rounded-xl border border-border overflow-hidden mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Hazard</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Category</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">L×S</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Risk</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Residual</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...hazards]
                        .sort((a, b) => b.riskScore - a.riskScore)
                        .map((h, i) => (
                          <tr key={h.id} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                            <td className="px-4 py-3 text-xs text-foreground max-w-[200px] truncate">{h.hazardDescription || "—"}</td>
                            <td className="px-4 py-3 text-xs text-muted-foreground">{h.categoryTitle}</td>
                            <td className="px-4 py-3 text-xs text-center font-mono">{h.likelihood}×{h.severity}={h.riskScore}</td>
                            <td className="px-4 py-3 text-center">
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getRiskLevelBadgeClass(h.riskLevel)}`}>
                                {h.riskLevel}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getRiskLevelBadgeClass(h.residualLevel)}`}>
                                {h.residualScore}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep("assess")}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button onClick={finalise} className="bg-rose-600 hover:bg-rose-700 text-white">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Finalise & Generate Report
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── COMPLETE ──────────────────────────────────── */}
          {step === "complete" && assessment && (
            <motion.div key="complete" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h1 className="font-heading text-3xl mb-2">Assessment Complete</h1>
                <p className="text-muted-foreground">Your risk assessment has been finalised. Download the compliance report below.</p>
              </div>

              {/* Summary */}
              <div className="rounded-xl border border-border bg-card p-6 mb-6">
                <h2 className="font-semibold text-sm text-foreground mb-4">Assessment Summary</h2>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Assessor:</span> <span className="font-medium">{assessment.assessorName}</span></div>
                  <div><span className="text-muted-foreground">Location:</span> <span className="font-medium">{assessment.location}</span></div>
                  <div><span className="text-muted-foreground">Date:</span> <span className="font-medium">{assessment.assessmentDate}</span></div>
                  <div><span className="text-muted-foreground">Hazards identified:</span> <span className="font-medium">{assessment.hazards.length}</span></div>
                  <div className="sm:col-span-2">
                    <span className="text-muted-foreground">Overall rating: </span>
                    <span className={`font-semibold capitalize px-2 py-0.5 rounded-full text-xs border ${getRiskLevelBadgeClass(assessment.overallRating)}`}>
                      {assessment.overallRating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <RiskBuilderPDF assessment={assessment} />
                <Button variant="outline" onClick={reset} className="w-full">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Start New Assessment
                </Button>
              </div>

              <Button variant="ghost" onClick={onBack} className="w-full text-muted-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Platform Home
              </Button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
