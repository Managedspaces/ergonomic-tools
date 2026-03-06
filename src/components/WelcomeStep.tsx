/**
 * Welcome Step — Tool-agnostic landing page for any assessment module
 * Design: Sabine brand — navy, orange CTA, teal secondary
 */

import { useAssessment } from "@/contexts/AssessmentContext";
import {
  Monitor, Home, Clock, Flame, Zap, AlertTriangle, Brain, Eye, User, Sun,
  ArrowRight, Shield, FileText, Globe, ArrowLeft, CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

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

const toolAccentBg: Record<string, string> = {
  "ergonomic":    "#1A2B5F",
  "home-office":  "#4C99B0",
  "psychosocial": "#D96C34",
  "risk-builder": "#12204A",
};

export default function WelcomeStep() {
  const { tool, setStep } = useAssessment();
  if (!tool) return null;

  const scorableCount = tool.categories.reduce(
    (sum, cat) => sum + cat.questions.filter((q) => q.type !== "text_comment").length,
    0
  );

  const accentColor = toolAccentBg[tool.id] ?? "#1A2B5F";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--sabine-bg)" }}>

      {/* ── Navigation ── */}
      <nav style={{ backgroundColor: "var(--sabine-navy)" }} className="sticky top-0 z-20 shadow-md">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--sabine-cta)" }}>
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-bold text-white" style={{ fontFamily: "'Roboto', sans-serif" }}>
              Workplace Risk Platform
            </span>
          </div>
          <button
            onClick={() => setStep("welcome")}
            className="flex items-center gap-1.5 text-sm transition-colors"
            style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Roboto', sans-serif" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
          >
            <ArrowLeft className="w-4 h-4" />
            All Tools
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ backgroundColor: "var(--sabine-navy)" }} className="pb-16 pt-12">
        <div className="container">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="section-label section-label-light mb-4"
            >
              Workplace Health &amp; Safety Assessment
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              {tool.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg mb-8 max-w-xl leading-relaxed"
              style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Open Sans', sans-serif" }}
            >
              {tool.description} Receive personalised recommendations and a compliance-ready
              report for your jurisdiction.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-5"
            >
              <button
                onClick={() => setStep("info")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-white transition-all shadow-lg"
                style={{ backgroundColor: "var(--sabine-cta)", fontFamily: "'Roboto', sans-serif", fontSize: "1rem" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta-hover)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta)")}
              >
                Begin Assessment <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex flex-wrap items-center gap-5 text-sm" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Open Sans', sans-serif" }}>
                <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" />{scorableCount} questions</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />~5 minutes</span>
                <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" />6 jurisdictions</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="container py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="section-label mb-3">Assessment Categories</p>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
              What we assess
            </h2>
            <p className="leading-relaxed mb-8 max-w-md" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
              Our structured assessment covers {tool.categories.length} key categories, generating
              actionable recommendations and a compliance-ready PDF report.
            </p>

            {/* Feature bullets */}
            <div className="space-y-3">
              {[
                "Personalised risk score per category",
                "Compliance report for your jurisdiction",
                "Downloadable PDF for employer records",
                "Actionable recommendations prioritised by risk",
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: "var(--sabine-teal)" }} />
                  <span className="text-sm" style={{ color: "var(--sabine-text)", fontFamily: "'Open Sans', sans-serif" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {tool.categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.07 * i }}
                className="flex items-start gap-4 p-4 rounded-xl border transition-all"
                style={{ backgroundColor: "var(--sabine-card)", borderColor: "var(--sabine-border)" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-white"
                  style={{ backgroundColor: accentColor }}
                >
                  {iconMap[cat.icon] ?? <Shield className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-0.5" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
                    {cat.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--sabine-muted-text)" }}>{cat.description}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--sabine-teal)" }}>
                    {cat.questions.length} questions · {(cat.weight * 100).toFixed(0)}% weighting
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature Strip ── */}
      <section style={{ backgroundColor: "var(--sabine-navy)" }} className="py-14">
        <div className="container grid md:grid-cols-3 gap-8">
          {[
            { icon: <Shield className="w-7 h-7" />, title: "Compliance Ready", desc: "Reports aligned with DE, CH, DK, UK, IE, and AU occupational health regulations." },
            { icon: <FileText className="w-7 h-7" />, title: "PDF Reports", desc: "Download professional employee and employer reports with actionable recommendations." },
            { icon: <Globe className="w-7 h-7" />, title: "Multi-Jurisdiction", desc: "Country-specific terminology, legal references, and documentation requirements." },
          ].map((f, i) => (
            <div key={i}>
              <div className="mb-4" style={{ color: "var(--sabine-cta)" }}>{f.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Roboto', sans-serif" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Open Sans', sans-serif" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="container py-12 text-center">
        <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
          Ready to begin?
        </h2>
        <p className="mb-6 text-sm" style={{ color: "var(--sabine-muted-text)" }}>
          The assessment takes approximately 5 minutes to complete.
        </p>
        <button
          onClick={() => setStep("info")}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-white transition-all"
          style={{ backgroundColor: "var(--sabine-cta)", fontFamily: "'Roboto', sans-serif" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta-hover)")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta)")}
        >
          Begin Assessment <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: "var(--sabine-navy)" }} className="py-6">
        <div className="container text-center">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Open Sans', sans-serif" }}>
            Workplace Risk Platform · {tool.name} · For informational purposes only
          </p>
        </div>
      </footer>
    </div>
  );
}
