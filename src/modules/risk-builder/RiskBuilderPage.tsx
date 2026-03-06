/**
 * Risk Assessment Builder — Main Page
 * Design: Sabine brand — navy header, orange CTA, semantic risk colours
 */

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowLeft, ArrowRight, Plus, Trash2, ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, RotateCcw } from "lucide-react";
import { HAZARD_LIBRARY, type HazardCategory } from "./library";
import { calculateRiskScore, LIKELIHOOD_LABELS, SEVERITY_LABELS, calculateOverallRating } from "./scoring";
import { createEmptyHazard, type HazardEntry, type RiskBuilderAssessment } from "./types";
import { RiskBuilderPDF } from "./RiskBuilderPDF";

type Step = "setup" | "select" | "assess" | "review" | "complete";

const RISK_BADGE: Record<string, React.CSSProperties> = {
  low:      { backgroundColor: "#D1FAE5", color: "#065F46", border: "1px solid #A7F3D0" },
  moderate: { backgroundColor: "#FEF3C7", color: "#92400E", border: "1px solid #FDE68A" },
  high:     { backgroundColor: "#FFEDD5", color: "#9A3412", border: "1px solid #FED7AA" },
  critical: { backgroundColor: "#FEE2E2", color: "#991B1B", border: "1px solid #FECACA" },
};

const RISK_BORDER: Record<string, string> = {
  low:      "#2ECC71",
  moderate: "#FFA500",
  high:     "#FF5A3C",
  critical: "#DC2626",
};

interface SetupData {
  assessorName: string; assessorRole: string; companyName: string;
  location: string; department: string; assessmentDate: string;
  reviewDate: string; country: string;
}

const inputClass = "w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all";
const inputStyle: React.CSSProperties = { borderColor: "var(--sabine-border)", backgroundColor: "var(--sabine-card)", color: "var(--sabine-text)", fontFamily: "'Open Sans', sans-serif" };

export default function RiskBuilderPage({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<Step>("setup");
  const [setup, setSetup] = useState<SetupData>({
    assessorName: "", assessorRole: "", companyName: "", location: "",
    department: "", assessmentDate: new Date().toISOString().split("T")[0],
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
      if (next.has(id)) { next.delete(id); setHazards((h) => h.filter((hz) => hz.categoryId !== id)); }
      else next.add(id);
      return next;
    });
  };

  const addHazard = (category: HazardCategory) => {
    const newHazard = createEmptyHazard(category.id, category.title);
    setHazards((prev) => [...prev, newHazard]);
    setExpandedHazard(newHazard.id);
  };

  const removeHazard = (id: string) => setHazards((prev) => prev.filter((h) => h.id !== id));

  const updateHazard = useCallback((id: string, updates: Partial<HazardEntry>) => {
    setHazards((prev) => prev.map((h) => {
      if (h.id !== id) return h;
      const updated = { ...h, ...updates };
      const initial = calculateRiskScore(updated.likelihood, updated.severity);
      updated.riskScore = initial.score; updated.riskLevel = initial.level;
      const residual = calculateRiskScore(updated.residualLikelihood, updated.residualSeverity);
      updated.residualScore = residual.score; updated.residualLevel = residual.level;
      return updated;
    }));
  }, []);

  const toggleControl = (hazardId: string, control: string) => {
    setHazards((prev) => prev.map((h) => {
      if (h.id !== hazardId) return h;
      const controls = h.selectedControls.includes(control)
        ? h.selectedControls.filter((c) => c !== control)
        : [...h.selectedControls, control];
      return { ...h, selectedControls: controls };
    }));
  };

  const finalise = () => {
    const scores = hazards.map((h) => h.riskScore);
    const result: RiskBuilderAssessment = {
      id: crypto.randomUUID(), ...setup, hazards,
      overallRating: calculateOverallRating(scores), completedAt: new Date().toISOString(),
    };
    setAssessment(result); setStep("complete");
  };

  const reset = () => {
    setStep("setup");
    setSetup({ assessorName: "", assessorRole: "", companyName: "", location: "", department: "",
      assessmentDate: new Date().toISOString().split("T")[0],
      reviewDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], country: "IE" });
    setSelectedCategories(new Set()); setHazards([]); setAssessment(null);
  };

  const hazardsByCategory = HAZARD_LIBRARY.filter((c) => selectedCategories.has(c.id));
  const stepIndex = ["setup","select","assess","review"].indexOf(step);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--sabine-bg)" }}>

      {/* ── Header ── */}
      <header className="sticky top-0 z-20 shadow-md" style={{ backgroundColor: "var(--sabine-navy)" }}>
        <div className="container py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm mr-2 transition-colors"
            style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Roboto', sans-serif" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--sabine-cta)" }}>
            <AlertTriangle className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-none" style={{ fontFamily: "'Roboto', sans-serif" }}>
              Risk Assessment Builder
            </p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
              {step === "setup" && "Step 1 of 4 — Assessment Details"}
              {step === "select" && "Step 2 of 4 — Select Hazard Categories"}
              {step === "assess" && "Step 3 of 4 — Assess Hazards"}
              {step === "review" && "Step 4 of 4 — Review & Finalise"}
              {step === "complete" && "Assessment Complete"}
            </p>
          </div>
          {step !== "complete" && (
            <div className="ml-auto flex gap-1.5">
              {[0,1,2,3].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full transition-colors" style={{ backgroundColor: stepIndex >= i ? "var(--sabine-cta)" : "rgba(255,255,255,0.25)" }} />
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="container py-8 max-w-3xl">
        <AnimatePresence mode="wait">

          {/* ── STEP 1: SETUP ── */}
          {step === "setup" && (
            <motion.div key="setup" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <p className="section-label mb-1">Step 1 of 4</p>
              <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>Assessment Details</h1>
              <p className="text-sm mb-8" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                Enter the details of the assessment and the assessor before identifying hazards.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Assessor Name *", key: "assessorName", placeholder: "e.g., Jane Smith" },
                  { label: "Assessor Role *", key: "assessorRole", placeholder: "e.g., Health & Safety Officer" },
                  { label: "Company / Organisation *", key: "companyName", placeholder: "e.g., Acme Ltd", span: true },
                  { label: "Location / Site *", key: "location", placeholder: "e.g., Head Office, Dublin" },
                  { label: "Department / Area", key: "department", placeholder: "e.g., Warehouse" },
                ].map(({ label, key, placeholder, span }) => (
                  <div key={key} className={span ? "sm:col-span-2" : ""}>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--sabine-text)", fontFamily: "'Roboto', sans-serif" }}>{label}</label>
                    <input
                      type="text"
                      value={(setup as any)[key]}
                      onChange={(e) => setSetup((s) => ({ ...s, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--sabine-text)", fontFamily: "'Roboto', sans-serif" }}>Assessment Date *</label>
                  <input type="date" value={setup.assessmentDate}
                    onChange={(e) => setSetup((s) => ({ ...s, assessmentDate: e.target.value }))}
                    className={inputClass} style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--sabine-text)", fontFamily: "'Roboto', sans-serif" }}>Review Date *</label>
                  <input type="date" value={setup.reviewDate}
                    onChange={(e) => setSetup((s) => ({ ...s, reviewDate: e.target.value }))}
                    className={inputClass} style={inputStyle}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--sabine-text)", fontFamily: "'Roboto', sans-serif" }}>Jurisdiction / Country</label>
                  <select value={setup.country}
                    onChange={(e) => setSetup((s) => ({ ...s, country: e.target.value }))}
                    className={inputClass} style={inputStyle}
                  >
                    {[["IE","Ireland"],["UK","United Kingdom"],["DE","Germany"],["CH","Switzerland"],["DK","Denmark"],["AU","Australia"]].map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep("select")}
                  disabled={!setup.assessorName || !setup.assessorRole || !setup.companyName || !setup.location}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white transition-all disabled:opacity-40"
                  style={{ backgroundColor: "var(--sabine-cta)", fontFamily: "'Roboto', sans-serif" }}
                  onMouseEnter={e => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = "var(--sabine-cta-hover)"; }}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta)")}
                >
                  Next: Select Hazards <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: SELECT CATEGORIES ── */}
          {step === "select" && (
            <motion.div key="select" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <p className="section-label mb-1">Step 2 of 4</p>
              <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>Select Hazard Categories</h1>
              <p className="text-sm mb-8" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                Select all hazard categories relevant to this workplace. You can add multiple specific hazards within each category.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {HAZARD_LIBRARY.map((cat) => {
                  const selected = selectedCategories.has(cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className="text-left rounded-xl border-2 p-4 transition-all"
                      style={{
                        borderColor: selected ? "var(--sabine-cta)" : "var(--sabine-border)",
                        backgroundColor: selected ? "rgba(217,108,52,0.06)" : "var(--sabine-card)",
                        boxShadow: selected ? "0 2px 8px rgba(217,108,52,0.15)" : "none",
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: selected ? "var(--sabine-cta)" : "var(--sabine-muted)",
                            color: selected ? "#fff" : "var(--sabine-muted-text)",
                          }}
                        >
                          {selected ? <CheckCircle2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>{cat.title}</p>
                          <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>{cat.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep("setup")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold border transition-all"
                  style={{ borderColor: "var(--sabine-border)", color: "var(--sabine-text)", backgroundColor: "transparent", fontFamily: "'Roboto', sans-serif" }}
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => setStep("assess")}
                  disabled={selectedCategories.size === 0}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white transition-all disabled:opacity-40"
                  style={{ backgroundColor: "var(--sabine-cta)", fontFamily: "'Roboto', sans-serif" }}
                  onMouseEnter={e => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = "var(--sabine-cta-hover)"; }}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta)")}
                >
                  Next: Assess Hazards ({selectedCategories.size} selected) <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: ASSESS HAZARDS ── */}
          {step === "assess" && (
            <motion.div key="assess" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <p className="section-label mb-1">Step 3 of 4</p>
              <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>Assess Hazards</h1>
              <p className="text-sm mb-8" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                For each category, add specific hazards, rate likelihood and severity, then select control measures.
              </p>

              <div className="space-y-6">
                {hazardsByCategory.map((cat) => {
                  const catHazards = hazards.filter((h) => h.categoryId === cat.id);
                  return (
                    <div key={cat.id} className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--sabine-border)", backgroundColor: "var(--sabine-card)" }}>
                      {/* Category Header */}
                      <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--sabine-border)", backgroundColor: "var(--sabine-muted)" }}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(217,108,52,0.12)", color: "var(--sabine-cta)" }}>
                            <Shield className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>{cat.title}</p>
                            <p className="text-xs" style={{ color: "var(--sabine-muted-text)" }}>{catHazards.length} hazard{catHazards.length !== 1 ? "s" : ""} identified</p>
                          </div>
                        </div>
                        <button
                          onClick={() => addHazard(cat)}
                          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold border transition-all"
                          style={{ borderColor: "var(--sabine-cta)", color: "var(--sabine-cta)", backgroundColor: "transparent", fontFamily: "'Roboto', sans-serif" }}
                          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--sabine-cta)"; e.currentTarget.style.color = "#fff"; }}
                          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--sabine-cta)"; }}
                        >
                          <Plus className="w-3 h-3" /> Add Hazard
                        </button>
                      </div>

                      {catHazards.length === 0 && (
                        <div className="px-5 py-6 text-center text-sm" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                          Click "Add Hazard" to identify a specific hazard in this category.
                        </div>
                      )}

                      {catHazards.map((hazard, idx) => {
                        const isExpanded = expandedHazard === hazard.id;
                        const riskInfo = calculateRiskScore(hazard.likelihood, hazard.severity);
                        const residualInfo = calculateRiskScore(hazard.residualLikelihood, hazard.residualSeverity);
                        const riskBadge = RISK_BADGE[riskInfo.level] ?? RISK_BADGE.moderate;
                        const residualBadge = RISK_BADGE[residualInfo.level] ?? RISK_BADGE.moderate;
                        const riskBorder = RISK_BORDER[riskInfo.level] ?? "#FFA500";

                        return (
                          <div key={hazard.id} style={{ borderTop: "1px solid var(--sabine-border)" }}>
                            {/* Hazard Summary Row */}
                            <div
                              className="px-5 py-3 flex items-center gap-3 cursor-pointer transition-colors"
                              style={{ backgroundColor: "transparent" }}
                              onClick={() => setExpandedHazard(isExpanded ? null : hazard.id)}
                              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--sabine-muted)")}
                              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                            >
                              <span className="text-xs w-5 flex-shrink-0" style={{ color: "var(--sabine-muted-text)" }}>#{idx + 1}</span>
                              <p className="text-sm flex-1 truncate" style={{ color: "var(--sabine-text)", fontFamily: "'Open Sans', sans-serif" }}>
                                {hazard.hazardDescription || <span style={{ color: "var(--sabine-muted-text)", fontStyle: "italic" }}>Unnamed hazard — click to edit</span>}
                              </p>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={riskBadge}>
                                  {riskInfo.score} — {riskInfo.label}
                                </span>
                                <button
                                  onClick={(e) => { e.stopPropagation(); removeHazard(hazard.id); }}
                                  style={{ color: "var(--sabine-muted-text)" }}
                                  onMouseEnter={e => (e.currentTarget.style.color = "var(--sabine-risk-critical)")}
                                  onMouseLeave={e => (e.currentTarget.style.color = "var(--sabine-muted-text)")}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                {isExpanded ? <ChevronUp className="w-4 h-4" style={{ color: "var(--sabine-muted-text)" }} /> : <ChevronDown className="w-4 h-4" style={{ color: "var(--sabine-muted-text)" }} />}
                              </div>
                            </div>

                            {/* Expanded Hazard Form */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-5 pb-6 pt-3 space-y-5" style={{ backgroundColor: "var(--sabine-bg)" }}>

                                    {/* Quick-select */}
                                    {cat.commonHazards.length > 0 && (
                                      <div>
                                        <p className="text-xs font-semibold mb-2" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Roboto', sans-serif" }}>Quick select a common hazard:</p>
                                        <div className="flex flex-wrap gap-1.5">
                                          {cat.commonHazards.map((h) => {
                                            const isActive = hazard.hazardDescription === h;
                                            return (
                                              <button key={h}
                                                onClick={() => updateHazard(hazard.id, { hazardDescription: h })}
                                                className="text-xs px-2.5 py-1 rounded-full border transition-all"
                                                style={{
                                                  backgroundColor: isActive ? "rgba(217,108,52,0.1)" : "var(--sabine-card)",
                                                  borderColor: isActive ? "var(--sabine-cta)" : "var(--sabine-border)",
                                                  color: isActive ? "var(--sabine-cta)" : "var(--sabine-muted-text)",
                                                  fontFamily: "'Open Sans', sans-serif",
                                                }}
                                              >{h}</button>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    )}

                                    {/* Hazard description */}
                                    <div>
                                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--sabine-text)", fontFamily: "'Roboto', sans-serif" }}>Hazard Description *</label>
                                      <input type="text" value={hazard.hazardDescription}
                                        onChange={(e) => updateHazard(hazard.id, { hazardDescription: e.target.value })}
                                        placeholder="Describe the specific hazard..."
                                        className={inputClass} style={inputStyle}
                                      />
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--sabine-text)", fontFamily: "'Roboto', sans-serif" }}>Who might be harmed?</label>
                                        <input type="text" value={hazard.personsAtRisk}
                                          onChange={(e) => updateHazard(hazard.id, { personsAtRisk: e.target.value })}
                                          placeholder="e.g., All employees, visitors"
                                          className={inputClass} style={inputStyle}
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--sabine-text)", fontFamily: "'Roboto', sans-serif" }}>Existing controls in place</label>
                                        <input type="text" value={hazard.existingControls}
                                          onChange={(e) => updateHazard(hazard.id, { existingControls: e.target.value })}
                                          placeholder="e.g., Warning signs, non-slip mats"
                                          className={inputClass} style={inputStyle}
                                        />
                                      </div>
                                    </div>

                                    {/* Initial Risk Matrix */}
                                    <div className="rounded-xl border p-4" style={{ borderColor: riskBorder + "40", backgroundColor: "var(--sabine-card)" }}>
                                      <p className="text-xs font-bold mb-4 uppercase tracking-wide" style={{ color: "var(--sabine-text)", fontFamily: "'Roboto', sans-serif" }}>
                                        Initial Risk Rating (Before Controls)
                                      </p>
                                      <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                          <div className="flex items-center justify-between mb-2">
                                            <label className="text-xs font-semibold" style={{ color: "var(--sabine-text)", fontFamily: "'Roboto', sans-serif" }}>Likelihood</label>
                                            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(217,108,52,0.12)", color: "var(--sabine-cta)" }}>{hazard.likelihood}</span>
                                          </div>
                                          <input type="range" min={1} max={5} value={hazard.likelihood}
                                            onChange={(e) => updateHazard(hazard.id, { likelihood: Number(e.target.value) })}
                                            className="w-full" style={{ accentColor: "var(--sabine-cta)" }}
                                          />
                                          <p className="text-xs mt-1" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>{LIKELIHOOD_LABELS[hazard.likelihood]}</p>
                                        </div>
                                        <div>
                                          <div className="flex items-center justify-between mb-2">
                                            <label className="text-xs font-semibold" style={{ color: "var(--sabine-text)", fontFamily: "'Roboto', sans-serif" }}>Severity</label>
                                            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(217,108,52,0.12)", color: "var(--sabine-cta)" }}>{hazard.severity}</span>
                                          </div>
                                          <input type="range" min={1} max={5} value={hazard.severity}
                                            onChange={(e) => updateHazard(hazard.id, { severity: Number(e.target.value) })}
                                            className="w-full" style={{ accentColor: "var(--sabine-cta)" }}
                                          />
                                          <p className="text-xs mt-1" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>{SEVERITY_LABELS[hazard.severity]}</p>
                                        </div>
                                      </div>
                                      <div className="mt-4 rounded-lg border p-3" style={{ ...riskBadge, borderColor: riskBorder + "40" }}>
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <p className="text-sm font-bold">{riskInfo.label}</p>
                                            <p className="text-xs mt-0.5 opacity-80">{riskInfo.action}</p>
                                          </div>
                                          <span className="text-2xl font-black">{riskInfo.score}</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Control Measures */}
                                    <div>
                                      <p className="text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: "var(--sabine-text)", fontFamily: "'Roboto', sans-serif" }}>
                                        Additional Control Measures
                                      </p>
                                      <div className="space-y-1.5">
                                        {cat.suggestedControls.map((ctrl) => (
                                          <label key={ctrl} className="flex items-start gap-2.5 cursor-pointer group">
                                            <input type="checkbox"
                                              checked={hazard.selectedControls.includes(ctrl)}
                                              onChange={() => toggleControl(hazard.id, ctrl)}
                                              className="mt-0.5 flex-shrink-0"
                                              style={{ accentColor: "var(--sabine-cta)" }}
                                            />
                                            <span className="text-xs leading-relaxed transition-colors" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>{ctrl}</span>
                                          </label>
                                        ))}
                                      </div>
                                      <div className="mt-3">
                                        <input type="text" value={hazard.customControl}
                                          onChange={(e) => updateHazard(hazard.id, { customControl: e.target.value })}
                                          placeholder="Add a custom control measure..."
                                          className={inputClass} style={{ ...inputStyle, fontSize: "0.75rem" }}
                                        />
                                      </div>
                                    </div>

                                    {/* Residual Risk */}
                                    <div className="rounded-xl border p-4" style={{ borderColor: "var(--sabine-border)", backgroundColor: "var(--sabine-card)" }}>
                                      <p className="text-xs font-bold mb-4 uppercase tracking-wide" style={{ color: "var(--sabine-text)", fontFamily: "'Roboto', sans-serif" }}>
                                        Residual Risk (After Controls)
                                      </p>
                                      <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                          <div className="flex items-center justify-between mb-2">
                                            <label className="text-xs font-semibold" style={{ color: "var(--sabine-text)", fontFamily: "'Roboto', sans-serif" }}>Residual Likelihood</label>
                                            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(46,204,113,0.12)", color: "var(--sabine-risk-low)" }}>{hazard.residualLikelihood}</span>
                                          </div>
                                          <input type="range" min={1} max={5} value={hazard.residualLikelihood}
                                            onChange={(e) => updateHazard(hazard.id, { residualLikelihood: Number(e.target.value) })}
                                            className="w-full" style={{ accentColor: "var(--sabine-risk-low)" }}
                                          />
                                        </div>
                                        <div>
                                          <div className="flex items-center justify-between mb-2">
                                            <label className="text-xs font-semibold" style={{ color: "var(--sabine-text)", fontFamily: "'Roboto', sans-serif" }}>Residual Severity</label>
                                            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(46,204,113,0.12)", color: "var(--sabine-risk-low)" }}>{hazard.residualSeverity}</span>
                                          </div>
                                          <input type="range" min={1} max={5} value={hazard.residualSeverity}
                                            onChange={(e) => updateHazard(hazard.id, { residualSeverity: Number(e.target.value) })}
                                            className="w-full" style={{ accentColor: "var(--sabine-risk-low)" }}
                                          />
                                        </div>
                                      </div>
                                      <div className="mt-4 rounded-lg border p-3" style={{ ...residualBadge }}>
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <p className="text-sm font-bold">Residual: {residualInfo.label}</p>
                                            <p className="text-xs mt-0.5 opacity-80">{residualInfo.action}</p>
                                          </div>
                                          <span className="text-2xl font-black">{residualInfo.score}</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Action */}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--sabine-text)", fontFamily: "'Roboto', sans-serif" }}>Action By (Person Responsible)</label>
                                        <input type="text" value={hazard.actionBy}
                                          onChange={(e) => updateHazard(hazard.id, { actionBy: e.target.value })}
                                          placeholder="e.g., Facilities Manager"
                                          className={inputClass} style={inputStyle}
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--sabine-text)", fontFamily: "'Roboto', sans-serif" }}>Target Completion Date</label>
                                        <input type="date" value={hazard.actionDate}
                                          onChange={(e) => updateHazard(hazard.id, { actionDate: e.target.value })}
                                          className={inputClass} style={inputStyle}
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
                <button onClick={() => setStep("select")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold border transition-all"
                  style={{ borderColor: "var(--sabine-border)", color: "var(--sabine-text)", backgroundColor: "transparent", fontFamily: "'Roboto', sans-serif" }}
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={() => setStep("review")}
                  disabled={hazards.length === 0}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white transition-all disabled:opacity-40"
                  style={{ backgroundColor: "var(--sabine-cta)", fontFamily: "'Roboto', sans-serif" }}
                  onMouseEnter={e => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = "var(--sabine-cta-hover)"; }}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta)")}
                >
                  Review Assessment ({hazards.length} hazard{hazards.length !== 1 ? "s" : ""}) <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 4: REVIEW ── */}
          {step === "review" && (
            <motion.div key="review" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <p className="section-label mb-1">Step 4 of 4</p>
              <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>Review & Finalise</h1>
              <p className="text-sm mb-8" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                Review all identified hazards below, sorted by risk level. Once satisfied, finalise the assessment to generate your compliance report.
              </p>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {(["critical","high","moderate","low"] as const).map((level) => {
                  const count = hazards.filter((h) => h.riskLevel === level).length;
                  return (
                    <div key={level} className="rounded-xl border p-4 text-center" style={{ ...RISK_BADGE[level] }}>
                      <p className="text-2xl font-black" style={{ fontFamily: "'Roboto', sans-serif" }}>{count}</p>
                      <p className="text-xs font-semibold capitalize mt-0.5" style={{ fontFamily: "'Roboto', sans-serif" }}>{level}</p>
                    </div>
                  );
                })}
              </div>

              {/* Hazard Table */}
              <div className="rounded-xl overflow-hidden mb-8" style={{ border: "1px solid var(--sabine-border)", backgroundColor: "var(--sabine-card)" }}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ backgroundColor: "var(--sabine-muted)", borderBottom: "1px solid var(--sabine-border)" }}>
                        <th className="text-left px-4 py-3 section-label">Hazard</th>
                        <th className="text-left px-4 py-3 section-label">Category</th>
                        <th className="text-center px-4 py-3 section-label">L×S</th>
                        <th className="text-center px-4 py-3 section-label">Risk</th>
                        <th className="text-center px-4 py-3 section-label">Residual</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...hazards].sort((a, b) => b.riskScore - a.riskScore).map((h, i) => (
                        <tr key={h.id} style={{ borderBottom: "1px solid var(--sabine-border)", backgroundColor: i % 2 === 0 ? "var(--sabine-card)" : "var(--sabine-muted)" }}>
                          <td className="px-4 py-3 text-xs max-w-[200px] truncate" style={{ color: "var(--sabine-text)", fontFamily: "'Open Sans', sans-serif" }}>{h.hazardDescription || "—"}</td>
                          <td className="px-4 py-3 text-xs" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>{h.categoryTitle}</td>
                          <td className="px-4 py-3 text-xs text-center font-mono" style={{ color: "var(--sabine-text)" }}>{h.likelihood}×{h.severity}={h.riskScore}</td>
                          <td className="px-4 py-3 text-center">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={RISK_BADGE[h.riskLevel] ?? RISK_BADGE.moderate}>{h.riskLevel}</span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={RISK_BADGE[h.residualLevel] ?? RISK_BADGE.moderate}>{h.residualScore}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep("assess")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold border transition-all"
                  style={{ borderColor: "var(--sabine-border)", color: "var(--sabine-text)", backgroundColor: "transparent", fontFamily: "'Roboto', sans-serif" }}
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={finalise}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white transition-all"
                  style={{ backgroundColor: "var(--sabine-cta)", fontFamily: "'Roboto', sans-serif" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta-hover)")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta)")}
                >
                  <CheckCircle2 className="w-4 h-4" /> Finalise & Generate Report
                </button>
              </div>
            </motion.div>
          )}

          {/* ── COMPLETE ── */}
          {step === "complete" && assessment && (
            <motion.div key="complete" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <div className="text-center mb-10">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "rgba(46,204,113,0.12)" }}>
                  <CheckCircle2 className="w-8 h-8" style={{ color: "var(--sabine-risk-low)" }} />
                </div>
                <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>Assessment Complete</h1>
                <p className="text-sm" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                  Your risk assessment has been finalised. Download the compliance report below.
                </p>
              </div>

              {/* Summary */}
              <div className="rounded-xl border p-6 mb-6" style={{ backgroundColor: "var(--sabine-card)", borderColor: "var(--sabine-border)" }}>
                <p className="section-label mb-4">Assessment Summary</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div style={{ fontFamily: "'Open Sans', sans-serif", color: "var(--sabine-text)" }}>
                    <span style={{ color: "var(--sabine-muted-text)" }}>Assessor: </span>
                    <span className="font-semibold">{assessment.assessorName}</span>
                  </div>
                  <div style={{ fontFamily: "'Open Sans', sans-serif", color: "var(--sabine-text)" }}>
                    <span style={{ color: "var(--sabine-muted-text)" }}>Location: </span>
                    <span className="font-semibold">{assessment.location}</span>
                  </div>
                  <div style={{ fontFamily: "'Open Sans', sans-serif", color: "var(--sabine-text)" }}>
                    <span style={{ color: "var(--sabine-muted-text)" }}>Date: </span>
                    <span className="font-semibold">{assessment.assessmentDate}</span>
                  </div>
                  <div style={{ fontFamily: "'Open Sans', sans-serif", color: "var(--sabine-text)" }}>
                    <span style={{ color: "var(--sabine-muted-text)" }}>Hazards identified: </span>
                    <span className="font-semibold">{assessment.hazards.length}</span>
                  </div>
                  <div className="sm:col-span-2" style={{ fontFamily: "'Open Sans', sans-serif", color: "var(--sabine-text)" }}>
                    <span style={{ color: "var(--sabine-muted-text)" }}>Overall rating: </span>
                    <span className="font-semibold text-xs px-2 py-0.5 rounded-full capitalize" style={RISK_BADGE[assessment.overallRating] ?? RISK_BADGE.moderate}>
                      {assessment.overallRating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <RiskBuilderPDF assessment={assessment} />
                <button onClick={reset}
                  className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold border transition-all"
                  style={{ borderColor: "var(--sabine-border)", color: "var(--sabine-text)", backgroundColor: "transparent", fontFamily: "'Roboto', sans-serif" }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--sabine-muted)"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  <RotateCcw className="w-4 h-4" /> Start New Assessment
                </button>
              </div>

              <button onClick={onBack}
                className="w-full flex items-center justify-center gap-2 text-sm transition-colors"
                style={{ color: "var(--sabine-muted-text)", fontFamily: "'Roboto', sans-serif" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--sabine-text)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--sabine-muted-text)")}
              >
                <ArrowLeft className="w-4 h-4" /> Return to Platform Home
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
