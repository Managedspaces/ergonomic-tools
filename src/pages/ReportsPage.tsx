/**
 * Reports Page — Overview of report types and compliance outputs
 * Sabine brand design system
 */

import { motion } from "framer-motion";
import {
  FileText, Download, Shield, Users, BarChart3, Lock,
  CheckCircle2, Globe, AlertTriangle, ArrowRight, Clock
} from "lucide-react";

interface ReportsPageProps {
  onNavigate: (page: string) => void;
  onSelectTool: (toolId: string) => void;
}

const reportTypes = [
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Employee Confidential Report",
    audience: "Individual Employee",
    description:
      "Completing an assessment should feel safe. This report is addressed to the employee personally, written in plain language, and marked confidential. It gives each person a clear picture of their own working conditions and practical steps they can take immediately — without that information being visible to their manager unless they choose to share it.",
    contents: [
      "Overall risk score and risk level (Low / Moderate / High / Critical)",
      "Category-by-category breakdown with individual scores",
      "Personalised recommendations ranked by priority",
      "Jurisdiction-specific employee rights and entitlements",
      "Suggested actions and self-help resources",
      "Assessment date and unique reference number",
    ],
    accentBg: "#1A2B5F",
    accentLight: "rgba(26,43,95,0.07)",
    tag: "Confidential",
    tagStyle: { backgroundColor: "rgba(26,43,95,0.08)", color: "#1A2B5F" },
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Employer Compliance Report",
    audience: "HR / Health & Safety Manager",
    description:
      "This is the document your HR manager, safety officer, or external auditor needs to see. It summarises the assessment findings at an organisational level, maps them to the applicable legislation in your jurisdiction, and sets out a prioritised action plan. Structured to satisfy the documentation requirements of HSA, HSE, and equivalent regulatory bodies.",
    contents: [
      "Assessment metadata — assessor, date, department, location",
      "Overall and per-category risk ratings",
      "Priority-ranked list of recommended control measures",
      "Applicable legislation and employer obligations",
      "Action plan with suggested timelines",
      "Signature block for sign-off and review date",
    ],
    accentBg: "#D96C34",
    accentLight: "rgba(217,108,52,0.07)",
    tag: "Compliance Record",
    tagStyle: { backgroundColor: "rgba(217,108,52,0.08)", color: "#B85A28" },
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: "Hazard Register (Risk Builder)",
    audience: "Safety Officer / Facilities Manager",
    description:
      "The formal hazard register is a legal requirement in Ireland, the UK, and most other jurisdictions covered by this platform. This landscape PDF is designed to be printed, signed, and filed as part of your Safety Statement or equivalent documentation. It records every identified hazard, the controls in place, the residual risk, and the person responsible for each action.",
    contents: [
      "Cover page with organisation details and overall risk rating",
      "Full hazard register table — category, description, persons at risk",
      "Initial risk matrix (Likelihood × Severity) per hazard",
      "Selected and custom control measures per hazard",
      "Residual risk score after controls applied",
      "Action owner, target date, and compliance notes",
    ],
    accentBg: "#12204A",
    accentLight: "rgba(18,32,74,0.06)",
    tag: "Audit-Ready",
    tagStyle: { backgroundColor: "rgba(18,32,74,0.06)", color: "#12204A" },
  },
];

const jurisdictions = [
  { flag: "🇮🇪", name: "Ireland", law: "Safety, Health & Welfare at Work Act 2005" },
  { flag: "🇬🇧", name: "United Kingdom", law: "HSE Management Standards; Working Time Regulations 1998" },
  { flag: "🇩🇪", name: "Germany", law: "ArbSchG §5 — Gefährdungsbeurteilung" },
  { flag: "🇨🇭", name: "Switzerland", law: "ArGV 3 Art. 2; OR Art. 328 Fürsorgepflicht" },
  { flag: "🇩🇰", name: "Denmark", law: "Arbejdsmiljøloven; BEK nr. 1406" },
  { flag: "🇦🇺", name: "Australia", law: "Model WHS Act 2011; Safe Work Australia Code 2022" },
];

const features = [
  { icon: <Download className="w-5 h-5" />, title: "Instant PDF Download", desc: "Reports are generated client-side using jsPDF — no server required, no data leaves the browser." },
  { icon: <Globe className="w-5 h-5" />, title: "6-Jurisdiction Compliance", desc: "Each report automatically includes the correct legal framework for the selected country." },
  { icon: <BarChart3 className="w-5 h-5" />, title: "Consistent Scoring", desc: "All tools use the same weighted scoring engine, making cross-tool comparisons meaningful." },
  { icon: <Clock className="w-5 h-5" />, title: "Time-Stamped Records", desc: "Every report includes a unique reference, assessment date, and review date for audit trails." },
  { icon: <Shield className="w-5 h-5" />, title: "Audit-Ready Format", desc: "Reports are structured to meet the documentation requirements of HSA, HSE, and ISO 45001 inspections." },
  { icon: <Lock className="w-5 h-5" />, title: "Privacy by Design", desc: "Employee reports are confidential by default. No data is stored on external servers in the current version." },
];

export default function ReportsPage({ onNavigate, onSelectTool }: ReportsPageProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--sabine-bg)" }}>

      {/* ── Hero ── */}
      <section
        className="pt-14 pb-16"
        style={{
          backgroundImage: `linear-gradient(rgba(26,43,95,0.72), rgba(26,43,95,0.82)), url('/ergonomic-tools/img-reports-calm.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="section-label section-label-light mb-3">Compliance Reports</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Roboto', sans-serif" }}>
              Documentation that satisfies<br />
              <span style={{ color: "var(--sabine-cta)" }}>your regulatory obligations.</span>
            </h1>
            <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
              Regulatory compliance is a natural outcome of a well-designed wellbeing programme.
              Every report is structured to satisfy the applicable requirements in your jurisdiction
              — so you never have to choose between caring for your people and meeting your legal obligations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Report Types ── */}
      <div className="container py-14 space-y-8">
        <div className="text-center mb-10">
          <p className="section-label mb-2">Report Types</p>
          <h2 className="text-3xl font-bold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
            Three report formats, each with a clear purpose
          </h2>
        </div>

        {reportTypes.map((report, i) => (
          <motion.div
            key={report.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: "var(--sabine-card)", border: "1px solid var(--sabine-border)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
          >
            <div className="px-8 py-6 flex flex-col sm:flex-row sm:items-center gap-4" style={{ borderBottom: "1px solid var(--sabine-border)", backgroundColor: report.accentLight }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white" style={{ backgroundColor: report.accentBg }}>
                {report.icon}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <h3 className="text-lg font-bold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>{report.title}</h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full" style={report.tagStyle}>{report.tag}</span>
                </div>
                <p className="text-xs font-semibold" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Roboto', sans-serif" }}>
                  Audience: {report.audience}
                </p>
              </div>
            </div>
            <div className="px-8 py-6 grid md:grid-cols-2 gap-8">
              <p className="text-sm leading-relaxed" style={{ color: "var(--sabine-text)", fontFamily: "'Open Sans', sans-serif" }}>
                {report.description}
              </p>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Roboto', sans-serif" }}>Report Contents</p>
                <ul className="space-y-2">
                  {report.contents.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs" style={{ color: "var(--sabine-text)", fontFamily: "'Open Sans', sans-serif" }}>
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: report.accentBg }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Jurisdiction Coverage ── */}
      <section className="py-14" style={{ backgroundColor: "var(--sabine-card)", borderTop: "1px solid var(--sabine-border)", borderBottom: "1px solid var(--sabine-border)" }}>
        <div className="container">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Jurisdiction Coverage</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
              Your jurisdiction, applied automatically
            </h2>
            <p className="text-sm mt-3 max-w-xl mx-auto" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
              Select your country at the start of any assessment. Every report will automatically reference the correct legislation, employer obligations, and employee rights for that jurisdiction — without any manual configuration.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jurisdictions.map((j) => (
              <div key={j.name} className="rounded-xl border p-5" style={{ borderColor: "var(--sabine-border)", backgroundColor: "var(--sabine-bg)" }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{j.flag}</span>
                  <p className="font-semibold text-sm" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>{j.name}</p>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>{j.law}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="py-14">
        <div className="container">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Report Features</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
              Designed to be used, not just downloaded
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border p-5" style={{ backgroundColor: "var(--sabine-card)", borderColor: "var(--sabine-border)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: "rgba(217,108,52,0.1)", color: "var(--sabine-cta)" }}>
                  {f.icon}
                </div>
                <p className="font-semibold text-sm mb-1.5" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>{f.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-16"
        style={{
          backgroundImage: `linear-gradient(rgba(26,43,95,0.78), rgba(26,43,95,0.88)), url('/ergonomic-tools/img-green-wall.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Roboto', sans-serif" }}>
            Want to see a report before you start?
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Open Sans', sans-serif" }}>
            Book a free 20-minute call with Sabine to walk through a sample report and discuss which assessment is the right starting point for your team.
          </p>
          <button
            onClick={() => onNavigate("contact")}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-semibold text-white transition-all"
            style={{ backgroundColor: "var(--sabine-cta)", fontFamily: "'Roboto', sans-serif" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta-hover)")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta)")}
          >
            View All Tools <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
