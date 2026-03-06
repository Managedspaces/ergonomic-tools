/**
 * About Page — Platform story, methodology, team, and compliance credentials
 * Sabine brand design system
 */

import { motion } from "framer-motion";
import {
  Shield, BookOpen, Globe, Users, Award, CheckCircle2,
  ArrowRight, Lightbulb, TrendingUp, Lock
} from "lucide-react";

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const values = [
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Compliance First",
    desc: "Every question, scoring rule, and recommendation is grounded in current legislation and international standards — not generic advice.",
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: "Privacy by Design",
    desc: "Employee assessment data is processed client-side. No personal data is transmitted to external servers without explicit consent.",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Internationally Applicable",
    desc: "Built for organisations operating across multiple jurisdictions. Compliance text adapts automatically to the selected country.",
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Actionable Outputs",
    desc: "Assessments don't just identify risk — they generate prioritised, practical recommendations that employees and managers can act on immediately.",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Built to Scale",
    desc: "The modular architecture means new tools, categories, and jurisdictions can be added without touching existing functionality.",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Designed for Everyone",
    desc: "Plain-language questions, mobile-friendly layout, and a clean interface make the tools accessible to all employees — not just H&S professionals.",
  },
];

const methodology = [
  {
    step: "01",
    title: "Structured Question Design",
    desc: "Each question set is authored by occupational health and safety experts. Questions are mapped to specific risk indicators and scored using validated weighting models aligned with ISO 45001 and EU-OSHA frameworks.",
  },
  {
    step: "02",
    title: "Weighted Scoring Engine",
    desc: "Answers are converted to risk scores (0–5 per question) and multiplied by category weights. Category scores are normalised to a 0–100 scale and combined into an overall risk rating: Low, Moderate, High, or Critical.",
  },
  {
    step: "03",
    title: "Jurisdiction-Aware Compliance",
    desc: "Each tool contains compliance templates for Ireland, UK, Germany, Switzerland, Denmark, and Australia. The correct legislation, employer obligations, and employee rights are automatically included in every report.",
  },
  {
    step: "04",
    title: "Prioritised Recommendations",
    desc: "Recommendations are generated per category based on the risk rating. They are sorted critical-first and include specific, actionable steps — not generic guidance.",
  },
];

const standards = [
  { code: "ISO 45001:2018", name: "Occupational Health & Safety Management Systems" },
  { code: "ISO 45003:2021", name: "Psychological Health & Safety at Work" },
  { code: "ISO 9241", name: "Ergonomics of Human-System Interaction" },
  { code: "EU Directive 89/391/EEC", name: "Framework Directive on Safety & Health at Work" },
  { code: "EU Directive 90/270/EEC", name: "Display Screen Equipment" },
  { code: "HSE Management Standards", name: "Work-Related Stress (UK)" },
  { code: "ISO 31000:2018", name: "Risk Management — Guidelines" },
  { code: "EU-OSHA Framework", name: "Psychosocial Risks & Stress at Work" },
];

const timeline = [
  { year: "2024", event: "Platform concept developed — modular compliance tool architecture designed" },
  { year: "2025 Q1", event: "Ergonomic Risk Assessment (Tool #1) — 32 questions, 6 categories, 6 jurisdictions" },
  { year: "2025 Q2", event: "Home Office Risk Assessment (Tool #2) — OHS expert question set, remote work focus" },
  { year: "2025 Q3", event: "Psychosocial Risk Assessment (Tool #3) — ISO 45003 aligned, confidential reporting" },
  { year: "2025 Q4", event: "Risk Assessment Builder (Tool #4) — dynamic 5×5 matrix, audit-ready hazard register" },
  { year: "2026", event: "Brand redesign, commercial deployment, AI trend analysis roadmap" },
];

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--sabine-bg)" }}>

      {/* ── Hero ── */}
      <section style={{ backgroundColor: "var(--sabine-navy)" }} className="pt-14 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="section-label section-label-light mb-3">About the Platform</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Roboto', sans-serif" }}>
              Built by H&S experts.<br />
              <span style={{ color: "var(--sabine-cta)" }}>Designed for everyone.</span>
            </h1>
            <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
              The Workplace Risk Platform is a modular compliance toolkit built to make professional-grade
              risk assessments accessible to every organisation — from SMEs to enterprise teams operating
              across multiple jurisdictions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-14">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <p className="section-label mb-3">Our Mission</p>
              <h2 className="text-3xl font-bold mb-5" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
                Compliance shouldn't require a consultant for every assessment.
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                Most SMEs know they need risk assessments but lack the internal expertise to conduct them properly, 
                or the budget to engage external consultants for routine compliance tasks. The result is either 
                no assessment at all, or a generic tick-box exercise that provides no real protection.
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                The Workplace Risk Platform changes that. Each tool is built on the same methodology used by 
                professional H&S consultants — structured question sets, weighted scoring, jurisdiction-specific 
                compliance text, and audit-ready PDF reports — delivered through an interface that any employee 
                can complete in under 15 minutes.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                The platform is designed to grow with your organisation. New tools, categories, and jurisdictions 
                can be added without changing the core architecture — making it a long-term compliance infrastructure 
                investment, not a one-off project.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: "4", l: "Assessment Tools" },
                  { n: "6", l: "Jurisdictions" },
                  { n: "100+", l: "Scored Questions" },
                  { n: "3", l: "Report Formats" },
                  { n: "8+", l: "International Standards" },
                  { n: "0", l: "Data Sent to Servers" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl border p-5 text-center" style={{ backgroundColor: "var(--sabine-card)", borderColor: "var(--sabine-border)" }}>
                    <p className="text-3xl font-black mb-1" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-navy)" }}>{s.n}</p>
                    <p className="text-xs" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Methodology ── */}
      <section className="py-14" style={{ backgroundColor: "var(--sabine-card)", borderTop: "1px solid var(--sabine-border)", borderBottom: "1px solid var(--sabine-border)" }}>
        <div className="container">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Methodology</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
              How the scoring works
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {methodology.map((m) => (
              <div key={m.step} className="rounded-xl border p-6" style={{ backgroundColor: "var(--sabine-bg)", borderColor: "var(--sabine-border)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-black" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-cta)" }}>{m.step}</span>
                  <h3 className="font-bold text-sm" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>{m.title}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-14">
        <div className="container">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Platform Principles</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
              What guides every decision
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border p-5" style={{ backgroundColor: "var(--sabine-card)", borderColor: "var(--sabine-border)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: "rgba(26,43,95,0.08)", color: "var(--sabine-navy)" }}>
                  {v.icon}
                </div>
                <p className="font-semibold text-sm mb-1.5" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>{v.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Standards ── */}
      <section className="py-14" style={{ backgroundColor: "var(--sabine-card)", borderTop: "1px solid var(--sabine-border)", borderBottom: "1px solid var(--sabine-border)" }}>
        <div className="container">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Standards & Legislation</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
              Built on internationally recognised frameworks
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {standards.map((s) => (
              <div key={s.code} className="flex items-start gap-3 rounded-xl border p-4" style={{ backgroundColor: "var(--sabine-bg)", borderColor: "var(--sabine-border)" }}>
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--sabine-teal)" }} />
                <div>
                  <p className="text-xs font-bold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>{s.code}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>{s.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-14">
        <div className="container max-w-2xl">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Platform Roadmap</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
              How we got here
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px" style={{ backgroundColor: "var(--sabine-border)" }} />
            <div className="space-y-6">
              {timeline.map((t, i) => (
                <motion.div key={t.year} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }} className="flex gap-5">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10" style={{ backgroundColor: i === timeline.length - 1 ? "var(--sabine-cta)" : "var(--sabine-card)", border: `2px solid ${i === timeline.length - 1 ? "var(--sabine-cta)" : "var(--sabine-border)"}` }}>
                    <Award className="w-4 h-4" style={{ color: i === timeline.length - 1 ? "#fff" : "var(--sabine-muted-text)" }} />
                  </div>
                  <div className="pt-2.5">
                    <p className="text-xs font-bold mb-1" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-cta)" }}>{t.year}</p>
                    <p className="text-sm" style={{ color: "var(--sabine-text)", fontFamily: "'Open Sans', sans-serif" }}>{t.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16" style={{ backgroundColor: "var(--sabine-navy)" }}>
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Roboto', sans-serif" }}>
            Want to know more?
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Open Sans', sans-serif" }}>
            Get in touch to discuss custom tool development, enterprise deployment, or jurisdiction expansion.
          </p>
          <button
            onClick={() => onNavigate("contact")}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-semibold text-white transition-all"
            style={{ backgroundColor: "var(--sabine-cta)", fontFamily: "'Roboto', sans-serif" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta-hover)")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta)")}
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
