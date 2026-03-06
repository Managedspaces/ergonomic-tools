# Ergonomic Risk Self-Assessment Tool — Source Package

## Live URL
https://ergorisk-fhrlt49u.manus.space

## Package Structure

```
ergonomic-assessment-tool/
├── README.md                          ← This file
├── documentation/
│   ├── DOCUMENTATION.md               ← Full technical documentation
│   ├── ergonomic_risk_evaluation.md   ← Risk scoring & evaluation logic
│   ├── compliance_documentation_layer.md ← Country-specific compliance frameworks
│   └── ai_report_generation_system.md ← AI/report generation system docs
└── source-code/
    └── ergonomic-assessment/          ← Full React + TypeScript project
        ├── client/
        │   ├── index.html
        │   └── src/
        │       ├── App.tsx
        │       ├── index.css
        │       ├── main.tsx
        │       ├── components/
        │       │   ├── WelcomeStep.tsx       ← Landing page
        │       │   ├── InfoStep.tsx          ← Employee info form
        │       │   ├── QuestionsStep.tsx     ← Step-by-step question flow
        │       │   ├── ResultsStep.tsx       ← Results dashboard & PDF export
        │       │   └── ui/                   ← shadcn/ui component library
        │       ├── contexts/
        │       │   └── AssessmentContext.tsx ← Global state management
        │       ├── lib/
        │       │   ├── questionnaire.ts      ← 32 questions across 6 categories
        │       │   ├── scoring.ts            ← Weighted risk scoring engine
        │       │   ├── compliance.ts         ← 6-country compliance framework
        │       │   └── pdfReport.ts          ← PDF generation (jsPDF)
        │       └── pages/
        │           └── Home.tsx              ← Root page (step router)
        ├── server/
        │   └── index.ts                      ← Express static file server
        ├── shared/
        │   └── const.ts
        ├── package.json
        ├── tsconfig.json
        └── vite.config.ts
```

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Animation | Framer Motion |
| PDF Generation | jsPDF + jsPDF-AutoTable |
| State Management | React Context API |
| Routing | Wouter |
| Server | Express (static file serving) |

## Assessment Features

- **6 categories**: Workstation Equipment, Posture & Body Positioning, Work Patterns & Screen Time, Environmental Factors, Vision & Eye Strain, Psychosocial Workload
- **32 questions**: Multiple choice, 1–5 scale rating, yes/no, and optional text comments
- **Weighted scoring**: Category-specific weights producing Low / Moderate / High / Critical ratings
- **Compliance frameworks**: DE (ArbStättV/DGUV), CH (ArGV 3/SUVA), DK (Arbejdsmiljøloven), UK (DSE Regulations 1992), IE (Safety, Health and Welfare at Work Act), AU (Safe Work Australia)
- **PDF reports**: Separate employee and employer reports with recommendations and compliance references
- **Workstation photo upload**: Optional image attachment stored in browser memory

## Getting Started (Development)

```bash
cd source-code/ergonomic-assessment
pnpm install
pnpm dev
```

The development server starts at http://localhost:3000.

## Building for Production

```bash
pnpm build
pnpm start
```
