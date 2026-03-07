/**
 * About Page — Sabine Salowsky, personal voice and real credentials
 * Sabine brand design system
 */

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Quote } from "lucide-react";

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const credentials = [
  "B.Sc. Occupational Therapy (Ergotherapie)",
  "Diplom-Biologin — Physiological Psychology",
  "Corporate Occupational Health — D. Swarovski KG, Austria",
  "Research — Max-Planck-Institut für Biologische Kybernetik, Tübingen",
  "Cognitive Neuroscience — University of Tübingen",
  "Bilingual: native-level German and English",
  "Cross-jurisdictional compliance: UK, Ireland, DACH, Australia",
];

const jurisdictions = [
  { flag: "🇮🇪", name: "Ireland", law: "Safety, Health & Welfare at Work Act 2005" },
  { flag: "🇬🇧", name: "United Kingdom", law: "HSE Management Standards; Working Time Regulations 1998" },
  { flag: "🇩🇪", name: "Germany", law: "ArbSchG §5 — Gefährdungsbeurteilung" },
  { flag: "🇨🇭", name: "Switzerland", law: "ArGV 3 Art. 2; OR Art. 328 Fürsorgepflicht" },
  { flag: "🇩🇰", name: "Denmark", law: "Arbejdsmiljøloven; BEK nr. 1406" },
  { flag: "🇦🇺", name: "Australia", law: "Model WHS Act 2011; Safe Work Australia Code 2022" },
];

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--sabine-bg)" }}>

      {/* ── Hero ── */}
      <section
        className="pt-14 pb-16"
        style={{
          backgroundImage: `linear-gradient(rgba(26,43,95,0.75), rgba(26,43,95,0.85)), url('/ergonomic-tools/img-about-philosophy.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="section-label section-label-light mb-3">About the Consultancy</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Roboto', sans-serif" }}>
              About Sabine Salowsky
            </h1>
            <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
              Workplace risk and ergonomics specialist. Bilingual. Remote-first. Built for SMEs that need
              the rigour of enterprise occupational health without the complexity or cost.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Bio Section ── */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-14 items-start">

            {/* Photo + credentials card */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--sabine-border)", backgroundColor: "var(--sabine-card)", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
                <img
                  src="/ergonomic-tools/sabine-headshot.jpeg"
                  alt="Sabine Salowsky — Workplace Wellbeing Consultant"
                  className="w-full object-cover"
                  style={{ maxHeight: "380px", objectPosition: "center top" }}
                />
                <div className="px-6 py-5">
                  <p className="font-bold text-base" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
                    Sabine Salowsky
                  </p>
                  <p className="text-xs mt-0.5 mb-4" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                    B.Sc. Ergotherapie · Dipl.-Biol.
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Roboto', sans-serif" }}>
                    Credentials &amp; Expertise
                  </p>
                  <ul className="space-y-2">
                    {credentials.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-xs" style={{ color: "var(--sabine-text)", fontFamily: "'Open Sans', sans-serif" }}>
                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "var(--sabine-teal)" }} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Story */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-5">
              <div>
                <p className="section-label mb-3">The Approach</p>
                <h2 className="text-3xl font-bold mb-5" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
                  Proportionate expertise.<br />Defensible outputs.<br />No generic checklists.
                </h2>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                Effective ergonomics consultancy requires more than just a checklist. It requires a deep,
                scientific understanding of human physiology, cognition, and functional capacity.
              </p>

              <p className="text-sm leading-relaxed" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                My background is rooted in this scientific rigour. I hold a <strong style={{ color: "var(--sabine-text)" }}>B.Sc. in Occupational Therapy</strong> and
                a <strong style={{ color: "var(--sabine-text)" }}>Diplom-Biologin</strong> with a specialism in Physiological Psychology. This dual qualification
                provides the foundation for my approach: assessing the physical and cognitive demands of the
                workplace through a clinical lens.
              </p>

              <p className="text-sm leading-relaxed" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                Before establishing this consultancy, my career spanned corporate occupational health —
                including direct experience within the Occupational Health division of{" "}
                <strong style={{ color: "var(--sabine-text)" }}>D. Swarovski KG</strong> in Austria — as well as research roles at the{" "}
                <strong style={{ color: "var(--sabine-text)" }}>Max-Planck-Institut für Biologische Kybernetik</strong> and the Chair of Cognitive Neuroscience
                at the University of Tübingen. I have also worked extensively across clinical settings in
                Germany and Austria.
              </p>

              <p className="text-sm leading-relaxed" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                Today, I apply this clinical and scientific expertise to help SMEs manage their workplace risk.
                My bilingual capability (native German, fluent English) and multi-jurisdictional experience mean
                that organisations with employees across the UK, Ireland, and the DACH region can work with a
                single specialist who understands both the physical realities of the work and the regulatory
                frameworks that govern it.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="rounded-xl border p-4 text-center" style={{ backgroundColor: "var(--sabine-bg)", borderColor: "var(--sabine-border)" }}>
                  <p className="text-3xl font-black" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-navy)" }}>4</p>
                  <p className="text-xs mt-1" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>Regulatory frameworks covered:<br />UK, Ireland, DACH, Australia</p>
                </div>
                <div className="rounded-xl border p-4 text-center" style={{ backgroundColor: "var(--sabine-bg)", borderColor: "var(--sabine-border)" }}>
                  <p className="text-3xl font-black" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-navy)" }}>2</p>
                  <p className="text-xs mt-1" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>Languages: English and German,<br />both at native level</p>
                </div>
              </div>

              <button
                onClick={() => onNavigate("contact")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all mt-2"
                style={{ backgroundColor: "var(--sabine-cta)", fontFamily: "'Roboto', sans-serif" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta-hover)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta)")}
              >
                Book a Consultation <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Philosophy Quote ── */}
      <section
        className="py-16"
        style={{
          backgroundImage: `linear-gradient(rgba(26,43,95,0.80), rgba(26,43,95,0.90)), url('/ergonomic-tools/img-green-wall.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container max-w-3xl text-center">
          <p className="section-label section-label-light mb-6">The Philosophy</p>
          <div className="flex justify-center mb-6">
            <Quote className="w-10 h-10 opacity-40 text-white" />
          </div>
          <blockquote
            className="text-2xl lg:text-3xl font-bold text-white leading-snug mb-8"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            "Ergonomics is not a wellness initiative. It is a legal obligation, a liability management
            tool, and, when done properly, a genuine driver of productivity and retention."
          </blockquote>
          <p className="text-sm leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Open Sans', sans-serif" }}>
            Every piece of work produced by this consultancy is designed with one question in mind: would
            this documentation protect the client in the event of a regulatory inspection, an insurance
            claim, or a legal proceeding? If the answer is no, it is not finished.
          </p>
        </div>
      </section>

      {/* ── Jurisdiction Coverage ── */}
      <section className="py-14">
        <div className="container">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Jurisdiction Coverage</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
              Multi-jurisdictional compliance expertise
            </h2>
            <p className="text-sm mt-3 max-w-xl mx-auto" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
              Each assessment tool automatically includes the correct legislation, employer obligations,
              and employee rights for the selected country.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jurisdictions.map((j) => (
              <div key={j.name} className="rounded-xl border p-5" style={{ borderColor: "var(--sabine-border)", backgroundColor: "var(--sabine-card)" }}>
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

      {/* ── CTA ── */}
      <section className="py-16" style={{ backgroundColor: "var(--sabine-card)", borderTop: "1px solid var(--sabine-border)" }}>
        <div className="container text-center">
          <p className="section-label mb-3">Work With Sabine</p>
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
            Let us discuss your compliance requirements.
          </h2>
          <p className="text-sm mb-8 max-w-xl mx-auto" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
            Whether you need a single assessment, an ongoing wellbeing partnership, or a custom compliance
            tool for your organisation — get in touch to discuss your requirements.
          </p>
          <button
            onClick={() => onNavigate("contact")}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-semibold text-white transition-all"
            style={{ backgroundColor: "var(--sabine-cta)", fontFamily: "'Roboto', sans-serif" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta-hover)")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta)")}
          >
            Book a Consultation <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
