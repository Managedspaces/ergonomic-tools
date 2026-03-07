/**
 * Tools Page — Full overview of all four assessment tools
 * Sabine brand design system
 */

import { motion } from "framer-motion";
import {
  Monitor, Home, Brain, AlertTriangle, ArrowRight,
  CheckCircle2, FileText, Globe, Shield, Clock
} from "lucide-react";

interface ToolsPageProps {
  onSelectTool: (toolId: string) => void;
  onNavigate: (page: string) => void;
}

const tools = [
  {
    id: "ergonomic",
    icon: <Monitor className="w-7 h-7" />,
    title: "Ergonomic Risk Assessment",
    subtitle: "Tool #1 — Workstation & Posture",
    description:
      "A structured 32-question assessment covering workstation equipment, posture, work patterns, environment, vision, and psychosocial factors. Designed to identify musculoskeletal risks before they become injuries.",
    categories: ["Workstation Equipment", "Posture & Position", "Work Patterns", "Environment", "Vision & Display", "Psychosocial Factors"],
    questions: 32,
    duration: "10–15 min",
    reports: ["Employee confidential report", "Employer compliance report"],
    standards: ["EU Directive 90/270/EEC", "HSA Display Screen Equipment", "ISO 9241"],
    accentBg: "#1A2B5F",
    accentLight: "rgba(26,43,95,0.08)",
    accentBorder: "rgba(26,43,95,0.2)",
    tag: "Workstation Safety",
    tagStyle: { backgroundColor: "rgba(26,43,95,0.08)", color: "#1A2B5F" },
  },
  {
    id: "home-office",
    icon: <Home className="w-7 h-7" />,
    title: "Home Office Risk Assessment",
    subtitle: "Tool #2 — Remote Work Safety",
    description:
      "A 30-question assessment covering workspace environment, electrical safety, fire safety, ergonomics, work organisation, and trip hazards. Built for remote and hybrid workers completing assessments from home.",
    categories: ["Workspace Environment", "Electrical Safety", "Fire Safety", "Ergonomics", "Work Organisation", "Trip & Fall Hazards"],
    questions: 30,
    duration: "8–12 min",
    reports: ["Employee home safety report", "Employer remote work compliance report"],
    standards: ["Safety, Health & Welfare at Work Act 2005", "Working Time Regulations", "ISO 45001"],
    accentBg: "#2A9D8F",
    accentLight: "rgba(42,157,143,0.08)",
    accentBorder: "rgba(42,157,143,0.2)",
    tag: "Remote Work",
    tagStyle: { backgroundColor: "rgba(42,157,143,0.08)", color: "#1D7A6E" },
  },
  {
    id: "psychosocial",
    icon: <Brain className="w-7 h-7" />,
    title: "Psychosocial Risk Assessment",
    subtitle: "Tool #3 — Stress & Wellbeing",
    description:
      "A 20-question confidential assessment covering workload and deadlines, role clarity and support, work environment and culture, work-life balance, and employee wellbeing. Aligned with ISO 45003 and HSE Management Standards.",
    categories: ["Workload & Deadlines", "Role Clarity & Support", "Work Environment & Culture", "Work-Life Balance", "Employee Wellbeing"],
    questions: 20,
    duration: "6–10 min",
    reports: ["Confidential employee wellbeing report", "Aggregated employer dashboard report"],
    standards: ["ISO 45003:2021", "HSE Management Standards", "EU-OSHA Psychosocial Risks Framework"],
    accentBg: "#D96C34",
    accentLight: "rgba(217,108,52,0.08)",
    accentBorder: "rgba(217,108,52,0.2)",
    tag: "Mental Health & Wellbeing",
    tagStyle: { backgroundColor: "rgba(217,108,52,0.08)", color: "#B85A28" },
  },
  {
    id: "risk-builder",
    icon: <AlertTriangle className="w-7 h-7" />,
    title: "Risk Assessment Builder",
    subtitle: "Tool #4 — Custom Hazard Register",
    description:
      "A flexible, guided 4-step builder for creating bespoke workplace risk assessments. Select hazard categories, identify specific hazards, rate likelihood and severity on a 5×5 matrix, assign control measures, and generate an audit-ready PDF register.",
    categories: ["Slips, Trips & Falls", "Manual Handling", "Electrical Hazards", "Fire & Emergency", "Chemical & Substances", "Machinery & Equipment", "Psychosocial Hazards", "Ergonomic Hazards", "Environmental Hazards"],
    questions: null,
    duration: "15–30 min",
    reports: ["Landscape A4 hazard register PDF", "Compliance and audit report"],
    standards: ["Safety Statement (Ireland)", "COSHH Regulations", "ISO 31000 Risk Management"],
    accentBg: "#12204A",
    accentLight: "rgba(18,32,74,0.06)",
    accentBorder: "rgba(18,32,74,0.15)",
    tag: "Custom Risk Register",
    tagStyle: { backgroundColor: "rgba(18,32,74,0.06)", color: "#12204A" },
  },
];

const jurisdictions = [
  { code: "IE", name: "Ireland", flag: "🇮🇪" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭" },
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
];

export default function ToolsPage({ onSelectTool, onNavigate }: ToolsPageProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--sabine-bg)" }}>

      {/* ── Page Hero ── */}
      <section
        className="pt-14 pb-16"
        style={{
          backgroundImage: `linear-gradient(rgba(26,43,95,0.72), rgba(26,43,95,0.82)), url('/ergonomic-tools/img-tools-desk.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="section-label section-label-light mb-3">Assessment Tools</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Roboto', sans-serif" }}>
              Four tools. One platform.
            </h1>
            <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
              Each tool is independently deployable, generates jurisdiction-specific PDF compliance reports,
              and is built to the same scoring architecture for consistent, auditable results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Jurisdiction Banner ── */}
      <div style={{ backgroundColor: "var(--sabine-card)", borderBottom: "1px solid var(--sabine-border)" }}>
        <div className="container py-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold mr-2" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Roboto', sans-serif" }}>
              <Globe className="w-3.5 h-3.5" /> Compliance coverage:
            </div>
            {jurisdictions.map((j) => (
              <span key={j.code} className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full" style={{ backgroundColor: "var(--sabine-muted)", color: "var(--sabine-text)", fontFamily: "'Open Sans', sans-serif" }}>
                <span>{j.flag}</span> {j.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tool Cards ── */}
      <div className="container py-14 space-y-10">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: "var(--sabine-card)", border: `1px solid var(--sabine-border)`, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
          >
            {/* Tool Header */}
            <div className="px-8 py-6 flex flex-col sm:flex-row sm:items-center gap-4" style={{ borderBottom: `1px solid var(--sabine-border)`, backgroundColor: tool.accentLight }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-white" style={{ backgroundColor: tool.accentBg }}>
                {tool.icon}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>{tool.title}</h2>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full" style={tool.tagStyle}>{tool.tag}</span>
                </div>
                <p className="text-sm" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>{tool.subtitle}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-center px-4 py-2 rounded-lg" style={{ backgroundColor: "var(--sabine-card)", border: "1px solid var(--sabine-border)" }}>
                  <p className="text-lg font-black" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
                    {tool.questions ?? "∞"}
                  </p>
                  <p className="text-xs" style={{ color: "var(--sabine-muted-text)" }}>Questions</p>
                </div>
                <div className="text-center px-4 py-2 rounded-lg" style={{ backgroundColor: "var(--sabine-card)", border: "1px solid var(--sabine-border)" }}>
                  <p className="text-sm font-bold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
                    <Clock className="w-3.5 h-3.5 inline mr-1" />{tool.duration}
                  </p>
                  <p className="text-xs" style={{ color: "var(--sabine-muted-text)" }}>Duration</p>
                </div>
              </div>
            </div>

            {/* Tool Body */}
            <div className="px-8 py-6 grid md:grid-cols-3 gap-8">
              {/* Description */}
              <div className="md:col-span-1">
                <p className="text-sm leading-relaxed" style={{ color: "var(--sabine-text)", fontFamily: "'Open Sans', sans-serif" }}>{tool.description}</p>
                <button
                  onClick={() => onSelectTool(tool.id)}
                  className="mt-5 w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white transition-all"
                  style={{ backgroundColor: tool.accentBg, fontFamily: "'Roboto', sans-serif" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  Launch Tool <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Roboto', sans-serif" }}>Assessment Categories</p>
                <ul className="space-y-1.5">
                  {tool.categories.map((cat) => (
                    <li key={cat} className="flex items-center gap-2 text-xs" style={{ color: "var(--sabine-text)", fontFamily: "'Open Sans', sans-serif" }}>
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: tool.accentBg }} />
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reports & Standards */}
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Roboto', sans-serif" }}>PDF Reports Generated</p>
                  <ul className="space-y-1.5">
                    {tool.reports.map((r) => (
                      <li key={r} className="flex items-center gap-2 text-xs" style={{ color: "var(--sabine-text)", fontFamily: "'Open Sans', sans-serif" }}>
                        <FileText className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--sabine-cta)" }} />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Roboto', sans-serif" }}>Standards & Legislation</p>
                  <ul className="space-y-1.5">
                    {tool.standards.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-xs" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                        <Shield className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--sabine-teal)" }} />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── CTA Banner ── */}
      <section
        className="py-16"
        style={{
          backgroundImage: `linear-gradient(rgba(26,43,95,0.78), rgba(26,43,95,0.88)), url('/ergonomic-tools/img-hero-office.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Roboto', sans-serif" }}>
            Need a custom assessment?
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Open Sans', sans-serif" }}>
            The Risk Assessment Builder lets you create fully bespoke hazard registers for any workplace scenario — no fixed question set required.
          </p>
          <button
            onClick={() => onSelectTool("risk-builder")}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-semibold text-white transition-all"
            style={{ backgroundColor: "var(--sabine-cta)", fontFamily: "'Roboto', sans-serif" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta-hover)")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta)")}
          >
            Open Risk Builder <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
