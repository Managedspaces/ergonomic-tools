/**
 * Platform Home — Tool Selector
 * Sabine brand design: deep navy hero, orange CTA, teal secondary, Roboto/Open Sans.
 * Navigation is now handled by App.tsx — this component receives onNavigate and onSelectTool as props.
 */

import { motion } from "framer-motion";
import { useAssessment } from "@/contexts/AssessmentContext";
import { TOOL_REGISTRY } from "@/modules/registry";
import {
  Shield, ArrowRight, Monitor, Home, Clock, Flame, Zap,
  AlertTriangle, Brain, Eye, User, Wrench, ChevronRight,
  FileText, Globe, BarChart3
} from "lucide-react";

interface PlatformHomeProps {
  onNavigate?: (page: string) => void;
  onSelectTool?: (toolId: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Monitor:       <Monitor className="w-6 h-6" />,
  Home:          <Home className="w-6 h-6" />,
  Clock:         <Clock className="w-6 h-6" />,
  Flame:         <Flame className="w-6 h-6" />,
  Zap:           <Zap className="w-6 h-6" />,
  AlertTriangle: <AlertTriangle className="w-6 h-6" />,
  Brain:         <Brain className="w-6 h-6" />,
  Eye:           <Eye className="w-6 h-6" />,
  User:          <User className="w-6 h-6" />,
  Shield:        <Shield className="w-6 h-6" />,
  Wrench:        <Wrench className="w-6 h-6" />,
};

const toolAccentBg: Record<string, string> = {
  "ergonomic":    "#1A2B5F",
  "home-office":  "#2A9D8F",
  "psychosocial": "#D96C34",
  "risk-builder": "#12204A",
};

const toolAccentLight: Record<string, string> = {
  "ergonomic":    "rgba(26,43,95,0.07)",
  "home-office":  "rgba(42,157,143,0.07)",
  "psychosocial": "rgba(217,108,52,0.07)",
  "risk-builder": "rgba(18,32,74,0.06)",
};

const toolTagStyle: Record<string, React.CSSProperties> = {
  "ergonomic":    { backgroundColor: "rgba(26,43,95,0.08)", color: "#1A2B5F" },
  "home-office":  { backgroundColor: "rgba(42,157,143,0.08)", color: "#1D7A6E" },
  "psychosocial": { backgroundColor: "rgba(217,108,52,0.08)", color: "#B85A28" },
  "risk-builder": { backgroundColor: "rgba(18,32,74,0.06)", color: "#12204A" },
};

const toolTags: Record<string, string> = {
  "ergonomic":    "Workstation Safety",
  "home-office":  "Remote Work",
  "psychosocial": "Mental Health & Wellbeing",
  "risk-builder": "Custom Risk Register",
};

const stats = [
  { number: "4", label: "Compliance Tools" },
  { number: "6", label: "Jurisdictions" },
  { number: "100+", label: "Questions" },
  { number: "PDF", label: "Audit Reports" },
];

const features = [
  { icon: <FileText className="w-5 h-5" />, title: "Instant PDF Reports", desc: "Professional compliance reports generated immediately after each assessment — no waiting, no uploads." },
  { icon: <Globe className="w-5 h-5" />, title: "6 Jurisdictions", desc: "Ireland, UK, Germany, Switzerland, Denmark, and Australia — correct legislation included automatically." },
  { icon: <BarChart3 className="w-5 h-5" />, title: "Weighted Scoring", desc: "ISO-aligned weighted scoring engine produces consistent, auditable risk ratings across all tools." },
  { icon: <Shield className="w-5 h-5" />, title: "Audit-Ready", desc: "Every report is structured to meet the documentation requirements of HSA, HSE, and ISO 45001 inspections." },
];

export default function PlatformHome({ onNavigate, onSelectTool }: PlatformHomeProps) {
  const { setTool, setStep } = useAssessment();

  function handleSelectTool(toolId: string) {
    if (onSelectTool) {
      onSelectTool(toolId);
    } else {
      // Fallback for standalone use
      const tool = TOOL_REGISTRY.find(t => t.id === toolId);
      if (tool && !tool.isBuilder) {
        setTool(tool);
        setStep("welcome");
      }
    }
  }

  return (
    <div style={{ backgroundColor: "var(--sabine-bg)", fontFamily: "'Open Sans', sans-serif" }}>

      {/* ── Hero ── */}
      <section style={{ backgroundColor: "var(--sabine-navy)" }} className="pb-20 pt-16">
        <div className="container">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <p className="section-label section-label-light mb-4">
                Workplace Compliance · Risk Assessment Tools
              </p>
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "'Roboto', sans-serif" }}>
                Protect your team.<br />
                <span style={{ color: "var(--sabine-cta)" }}>Stay compliant.</span>
              </h1>
              <p className="text-lg mb-8 max-w-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                Four structured risk assessment tools covering ergonomics, home office safety,
                psychosocial wellbeing, and custom hazard identification — with PDF compliance
                reports for 6 jurisdictions.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleSelectTool("ergonomic")}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all"
                  style={{ backgroundColor: "var(--sabine-cta)", fontFamily: "'Roboto', sans-serif" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta-hover)")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta)")}
                >
                  Start an Assessment <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate?.("about")}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all border"
                  style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff", fontFamily: "'Roboto', sans-serif", backgroundColor: "transparent" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center py-4 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
                <p className="text-3xl font-black text-white" style={{ fontFamily: "'Roboto', sans-serif" }}>{s.number}</p>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Tool Cards ── */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Assessment Tools</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
              Choose your assessment
            </h2>
            <p className="text-sm mt-3 max-w-xl mx-auto" style={{ color: "var(--sabine-muted-text)" }}>
              Each tool generates a professional PDF compliance report immediately on completion.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {TOOL_REGISTRY.map((tool, i) => {
              const accentBg = toolAccentBg[tool.id] ?? "#1A2B5F";
              const accentLight = toolAccentLight[tool.id] ?? "rgba(26,43,95,0.07)";
              const tagStyle = toolTagStyle[tool.id] ?? {};
              const tag = toolTags[tool.id] ?? "";

              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-2xl overflow-hidden cursor-pointer group transition-all"
                  style={{
                    backgroundColor: "var(--sabine-card)",
                    border: "1px solid var(--sabine-border)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                  onClick={() => handleSelectTool(tool.id)}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px rgba(0,0,0,0.12)`;
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  {/* Card header */}
                  <div className="px-6 py-5 flex items-center gap-4" style={{ backgroundColor: accentLight, borderBottom: "1px solid var(--sabine-border)" }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white" style={{ backgroundColor: accentBg }}>
                      {iconMap[tool.icon ?? "Shield"] ?? <Shield className="w-6 h-6" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <h3 className="font-bold text-base truncate" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>{tool.name}</h3>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0" style={tagStyle}>{tag}</span>
                      </div>
                      <p className="text-xs" style={{ color: "var(--sabine-muted-text)" }}>{tool.description}</p>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex flex-wrap gap-3">
                      {tool.categories?.slice(0, 3).map((cat) => (
                        <span key={cat.id} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--sabine-muted)", color: "var(--sabine-muted-text)" }}>
                          {cat.title}
                        </span>
                      ))}
                      {(tool.categories?.length ?? 0) > 3 && (
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--sabine-muted)", color: "var(--sabine-muted-text)" }}>
                          +{(tool.categories?.length ?? 0) - 3} more
                        </span>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: accentBg }} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate?.("tools")}
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: "var(--sabine-cta)", fontFamily: "'Roboto', sans-serif" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--sabine-cta-hover)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--sabine-cta)")}
            >
              View detailed tool descriptions <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-14" style={{ backgroundColor: "var(--sabine-card)", borderTop: "1px solid var(--sabine-border)", borderBottom: "1px solid var(--sabine-border)" }}>
        <div className="container">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Platform Features</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
              Built for real-world compliance
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border p-5" style={{ backgroundColor: "var(--sabine-bg)", borderColor: "var(--sabine-border)" }}>
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
      <section className="py-16" style={{ backgroundColor: "var(--sabine-navy)" }}>
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Roboto', sans-serif" }}>
            Ready to get started?
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Open Sans', sans-serif" }}>
            Complete your first assessment in under 15 minutes and download a professional PDF compliance report immediately.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => handleSelectTool("ergonomic")}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-semibold text-white transition-all"
              style={{ backgroundColor: "var(--sabine-cta)", fontFamily: "'Roboto', sans-serif" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta-hover)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta)")}
            >
              Start an Assessment <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate?.("contact")}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-semibold border transition-all"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff", fontFamily: "'Roboto', sans-serif", backgroundColor: "transparent" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              Talk to Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
