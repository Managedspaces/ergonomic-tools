/**
 * Welcome Step — Tool-agnostic landing page for any assessment module
 * Design: Clinical Precision — Swiss Medical Design
 */

import { useAssessment } from "@/contexts/AssessmentContext";
import { Button } from "@/components/ui/button";
import {
  Monitor, Home, Clock, Flame, Zap, AlertTriangle, Brain, Eye, User, Sun,
  ArrowRight, Shield, FileText, Globe, ArrowLeft,
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

const toolHeroImages: Record<string, string> = {
  "ergonomic":   "https://d2xsxph8kpxj0f.cloudfront.net/310519663036985142/fhRLT49Ux3ps8Kx65JURu8/hero-ergonomic-FW5qFi5deWFjUorau3cAPV.webp",
  "home-office": "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1400&q=80",
};

const toolSubImages: Record<string, string> = {
  "ergonomic":   "https://d2xsxph8kpxj0f.cloudfront.net/310519663036985142/fhRLT49Ux3ps8Kx65JURu8/posture-illustration-4U4rvym6QGrWrK7Bdc9SYd.webp",
  "home-office": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
};

const toolDimensions: Record<string, string> = {
  "ergonomic":   "Six dimensions of ergonomic health",
  "home-office": "Six dimensions of home office safety",
};

export default function WelcomeStep() {
  const { tool, setStep } = useAssessment();

  if (!tool) return null;

  const scorableCount = tool.categories.reduce(
    (sum, cat) => sum + cat.questions.filter((q) => q.type !== "text_comment").length,
    0
  );

  const heroImg = toolHeroImages[tool.id] ?? toolHeroImages["ergonomic"];
  const subImg = toolSubImages[tool.id] ?? toolSubImages["ergonomic"];
  const dimensionLabel = toolDimensions[tool.id] ?? "Assessment categories";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt={tool.name}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div className="relative z-10 container pt-12 pb-20 lg:pt-20 lg:pb-28">
          <nav className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                Workplace Risk Platform
              </span>
            </div>
            <button
              onClick={() => setStep("welcome")}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All tools
            </button>
          </nav>

          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4"
            >
              Workplace Health & Safety
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-5xl lg:text-7xl text-foreground leading-[1.1] mb-6"
            >
              {tool.id === "home-office" ? (
                <>Home Office<br /><span className="italic">Risk Assessment</span></>
              ) : (
                <>Ergonomic Risk<br /><span className="italic">Self-Assessment</span></>
              )}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed"
            >
              {tool.description} Receive personalised recommendations and compliance-ready
              reports for your jurisdiction.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Button
                size="lg"
                onClick={() => setStep("info")}
                className="bg-primary text-primary-foreground px-8 py-6 text-base font-medium gap-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                Begin Assessment
                <ArrowRight className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  {scorableCount} questions
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  ~5 minutes
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  6 jurisdictions
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="container py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-3">
              Assessment Categories
            </p>
            <h2 className="font-heading text-3xl lg:text-4xl text-foreground mb-6">
              {dimensionLabel.split(" ").slice(0, 3).join(" ")}<br />
              <span className="italic">{dimensionLabel.split(" ").slice(3).join(" ")}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              Our assessment covers the critical factors that influence your safety and
              well-being, generating actionable recommendations and a compliance-ready report.
            </p>
            <img
              src={subImg}
              alt={`${tool.name} illustration`}
              className="w-full max-w-sm rounded-lg border border-border/50 shadow-sm"
            />
          </div>

          <div className="space-y-3">
            {tool.categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-card hover:border-border hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-foreground">
                  {iconMap[cat.icon] ?? <Shield className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{cat.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{cat.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {cat.questions.length} questions · Weight: {(cat.weight * 100).toFixed(0)}%
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-primary text-primary-foreground py-16 lg:py-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Shield className="w-8 h-8 mb-4 opacity-80" />
              <h3 className="font-heading text-xl mb-2 italic">Compliance Ready</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Generate reports aligned with DE, CH, DK, UK, IE, and AU occupational health regulations.
              </p>
            </div>
            <div>
              <FileText className="w-8 h-8 mb-4 opacity-80" />
              <h3 className="font-heading text-xl mb-2 italic">PDF Reports</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Download professional employee and employer reports with actionable recommendations.
              </p>
            </div>
            <div>
              <Globe className="w-8 h-8 mb-4 opacity-80" />
              <h3 className="font-heading text-xl mb-2 italic">Multi-Jurisdiction</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Country-specific terminology, legal references, and documentation requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container py-8 text-center text-xs text-muted-foreground">
        <p>Workplace Risk Platform · {tool.name} · For informational purposes only · Does not constitute legal or medical advice</p>
      </footer>
    </div>
  );
}
