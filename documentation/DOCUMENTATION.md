# Ergonomic Risk Self-Assessment Tool — Technical Documentation

## Table of Contents

1. [System Overview](#system-overview)
2. [Data Model](#data-model)
3. [Questionnaire Structure](#questionnaire-structure)
4. [Scoring System Logic](#scoring-system-logic)
5. [JSON Schema for Assessment Results](#json-schema-for-assessment-results)
6. [API Endpoints](#api-endpoints)
7. [Compliance Framework](#compliance-framework)
8. [Extensibility Architecture](#extensibility-architecture)

---

## System Overview

The Ergonomic Risk Self-Assessment Tool is a web-based SaaS platform that enables employees to evaluate their workspace ergonomic risks and provides employers with compliance-ready reporting. The system is designed for international deployment across six jurisdictions: Germany (DE), Switzerland (CH), Denmark (DK), United Kingdom (UK), Ireland (IE), and Australia (AU).

### Architecture

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 19 + Tailwind CSS 4 | Step-by-step assessment UI, results dashboard |
| API | tRPC 11 + Express 4 | Type-safe RPC endpoints for assessment CRUD |
| Database | MySQL/TiDB via Drizzle ORM | Persistent storage of assessments and user data |
| PDF Generation | jsPDF + jspdf-autotable | Client-side PDF report generation |
| Authentication | Manus OAuth | Secure user authentication |
| File Storage | S3 | Workstation photo uploads |

### Key Design Decisions

- **Universal questionnaire**: The same questionnaire is used across all countries; only compliance outputs vary per jurisdiction.
- **Client-side PDF generation**: Reports are generated in the browser using jsPDF, avoiding server-side rendering dependencies.
- **Weighted scoring**: Each question and category carries configurable weights, enabling fine-tuned risk calculation.
- **Structured JSON storage**: Responses and scores are stored as JSON columns for flexibility while maintaining relational integrity.

---

## Data Model

### Entity Relationship

```
users (1) ──── (N) assessments
```

### Users Table

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK, auto-increment) | Surrogate primary key |
| openId | VARCHAR(64), UNIQUE | OAuth identifier |
| name | TEXT | User display name |
| email | VARCHAR(320) | User email |
| loginMethod | VARCHAR(64) | Authentication method |
| role | ENUM('user', 'admin') | Access control role |
| createdAt | TIMESTAMP | Account creation time |
| updatedAt | TIMESTAMP | Last update time |
| lastSignedIn | TIMESTAMP | Last login time |

### Assessments Table

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK, auto-increment) | Assessment identifier |
| userId | INT (FK → users.id) | Owning user |
| employeeName | VARCHAR(255) | Employee full name |
| employeeEmail | VARCHAR(320) | Employee email |
| jobTitle | VARCHAR(255) | Job title (optional) |
| department | VARCHAR(255) | Department (optional) |
| workLocation | ENUM('office','home','hybrid','other') | Primary work location |
| country | VARCHAR(2) | ISO country code for compliance |
| overallScore | DECIMAL(5,2) | Calculated overall risk score (0–100) |
| overallRating | ENUM('low','moderate','high','critical') | Overall risk tier |
| categoryScores | JSON | Array of category-level scores |
| responses | JSON | Full array of question responses |
| photoUrl | TEXT | S3 URL for workstation photo |
| status | ENUM('draft','completed') | Assessment completion status |
| assessmentDate | TIMESTAMP | When assessment was completed |
| createdAt | TIMESTAMP | Record creation time |
| updatedAt | TIMESTAMP | Record update time |

---

## Questionnaire Structure

### Categories

The questionnaire comprises six assessment categories, each with a configurable weight that determines its contribution to the overall score.

| Category ID | Title | Weight | Questions |
|-------------|-------|--------|-----------|
| workstation_equipment | Workstation Equipment | 0.20 | 6 |
| posture_body | Posture & Body Positioning | 0.20 | 6 |
| work_patterns | Work Patterns & Screen Time | 0.15 | 5 |
| environmental | Environmental Factors | 0.15 | 5 |
| vision_eye_strain | Vision & Eye Strain | 0.15 | 5 |
| psychosocial | Psychosocial Workload | 0.15 | 5 |

### Question Types

| Type | Format | Scoring Method |
|------|--------|---------------|
| `multiple_choice` | Select one from N options | Each option has a predefined `riskScore` (0–5) |
| `scale_rating` | Select 1–5 on a labeled scale | Inverted: 1 → score 4, 5 → score 0 |
| `yes_no` | Binary yes/no selection | Each option has a predefined `riskScore` |
| `text_comment` | Free-text input | Not scored; stored for documentation |

### Question Schema

```typescript
interface Question {
  id: string;                    // Unique identifier (e.g., "ws_chair_type")
  text: string;                  // Question text displayed to user
  type: "multiple_choice" | "scale_rating" | "yes_no" | "text_comment";
  required: boolean;             // Whether response is mandatory
  weight: number;                // Scoring weight (0–3, typically 1)
  helpText?: string;             // Explanatory text shown below question
  options?: QuestionOption[];    // Available choices (for MC, Y/N)
  scaleLabels?: {                // Labels for scale endpoints
    low: string;
    high: string;
  };
}

interface QuestionOption {
  value: string;                 // Machine-readable value stored in response
  label: string;                 // Human-readable label displayed to user
  riskScore: number;             // Risk contribution (0 = no risk, 5 = max risk)
}
```

### Sample Questions by Category

**Workstation Equipment** — Evaluates desk, chair, monitor, keyboard, and peripheral setup:
- Chair type and adjustability (multiple choice, weight 1.5)
- Monitor position relative to eye level (multiple choice, weight 1.5)
- Keyboard/mouse ergonomic design (multiple choice, weight 1)
- Desk height adjustability (yes/no, weight 1)
- External monitor usage for laptop users (yes/no, weight 1)

**Posture & Body Positioning** — Assesses sitting posture, alignment, and physical comfort:
- Feet flat on floor or footrest (yes/no, weight 1)
- Back support contact (scale 1–5, weight 1.5)
- Wrist position during typing (multiple choice, weight 1.5)
- Neck position and head alignment (scale 1–5, weight 1.5)
- Frequency of musculoskeletal discomfort (multiple choice, weight 2)

**Work Patterns & Screen Time** — Measures screen exposure and break habits:
- Daily continuous screen time (multiple choice, weight 1.5)
- Break frequency (multiple choice, weight 2)
- Task variety during workday (scale 1–5, weight 1)
- Overtime frequency (multiple choice, weight 1)

**Environmental Factors** — Evaluates lighting, temperature, noise, and air quality:
- Screen glare or reflection (yes/no, weight 1.5)
- Lighting adequacy (scale 1–5, weight 1)
- Temperature comfort (scale 1–5, weight 1)
- Noise level impact (scale 1–5, weight 1)
- Air quality/ventilation (scale 1–5, weight 1)

**Vision & Eye Strain** — Assesses visual health and screen-related eye comfort:
- Screen distance from eyes (multiple choice, weight 1.5)
- Eye strain symptoms frequency (multiple choice, weight 2)
- 20-20-20 rule practice (multiple choice, weight 1.5)
- Last eye examination timing (multiple choice, weight 1)
- Screen brightness adjustment (yes/no, weight 1)

**Psychosocial Workload** — Evaluates stress, autonomy, and workplace support:
- Workload manageability (scale 1–5, weight 1.5)
- Autonomy over work schedule (scale 1–5, weight 1)
- Workplace support availability (scale 1–5, weight 1.5)
- Work-life balance satisfaction (scale 1–5, weight 1)
- Stress level self-assessment (scale 1–5, weight 2)

---

## Scoring System Logic

### Algorithm Overview

The scoring system uses a three-tier weighted average approach:

```
Question Score → Category Score → Overall Score
```

### Step 1: Question-Level Scoring

Each question response maps to a raw risk score (0–5):

| Question Type | Scoring Rule |
|---------------|-------------|
| Multiple Choice | Lookup `riskScore` from selected option (0–5) |
| Scale Rating | Invert the 1–5 scale: `score = 5 - value` |
| Yes/No | Lookup `riskScore` from selected option |
| Text Comment | Not scored (weight = 0) |

The raw score is multiplied by the question's weight:

```
weighted_question_score = raw_score × question_weight
max_possible = 5 × question_weight
```

### Step 2: Category-Level Scoring

Category scores are calculated as the weighted average of all answered questions within the category, normalized to 0–100:

```
category_score = (Σ weighted_question_scores / Σ max_possible_scores) × 100
```

### Step 3: Overall Score

The overall score is the weighted average of all category scores:

```
overall_score = Σ(category_score × category_weight) / Σ(category_weights)
```

### Risk Rating Thresholds

| Score Range | Rating | Label | Action Timeline |
|-------------|--------|-------|----------------|
| 0–25 | `low` | Low Risk | Meets standards; maintain current setup |
| 26–50 | `moderate` | Moderate Risk | Review and adjust within 30 days |
| 51–75 | `high` | High Risk | Corrective action required within 14 days |
| 76–100 | `critical` | Critical Risk | Immediate intervention required |

### Recommendation Generation

Recommendations are generated per category based on the category's risk rating. Each recommendation includes:
- **Priority**: Mapped from risk rating (low → low, moderate → medium, high → high, critical → critical)
- **Category context**: Which assessment area the recommendation addresses
- **Actionable text**: Specific guidance tailored to the risk level

Recommendations are sorted by priority (critical first) in the output.

---

## JSON Schema for Assessment Results

### Assessment Export Schema (v1.0.0)

```json
{
  "schema": "ergonomic-assessment/v1.0.0",
  "exportedAt": "2026-03-06T10:30:00.000Z",
  "assessment": {
    "id": 1,
    "date": "2026-03-06T10:25:00.000Z",
    "status": "completed",
    "employee": {
      "name": "Jane Smith",
      "email": "jane@company.com",
      "jobTitle": "Software Engineer",
      "department": "Engineering",
      "workLocation": "hybrid"
    },
    "country": "UK",
    "scoring": {
      "overallScore": 42.5,
      "overallRating": "moderate",
      "overallRatingLabel": "Moderate Risk",
      "categoryScores": [
        {
          "categoryId": "workstation_equipment",
          "categoryTitle": "Workstation Equipment",
          "score": 35.0,
          "rating": "moderate",
          "ratingLabel": "Moderate Risk",
          "ratingColor": "#d4a017",
          "questionCount": 6,
          "answeredCount": 6
        }
      ]
    },
    "responses": [
      {
        "questionId": "ws_chair_type",
        "value": "basic_office",
        "textComment": null
      }
    ],
    "recommendations": [
      {
        "categoryId": "workstation_equipment",
        "categoryTitle": "Workstation Equipment",
        "priority": "medium",
        "text": "Consider adjusting your monitor height..."
      }
    ],
    "compliance": {
      "countryCode": "UK",
      "countryName": "United Kingdom",
      "regulatoryFramework": "Health and Safety (Display Screen Equipment) Regulations 1992",
      "regulatoryBody": "Health and Safety Executive (HSE)",
      "keyRegulations": [
        "Health and Safety (Display Screen Equipment) Regulations 1992 (as amended 2002)"
      ]
    },
    "photoUrl": null
  }
}
```

### Response Schema

```json
{
  "questionId": "string — unique question identifier",
  "value": "string — selected option value or scale number",
  "textComment": "string | undefined — optional free-text comment"
}
```

### Category Score Schema

```json
{
  "categoryId": "string — category identifier",
  "categoryTitle": "string — human-readable category name",
  "score": "number — normalized score 0–100",
  "rating": "low | moderate | high | critical",
  "ratingLabel": "string — human-readable rating",
  "ratingColor": "string — hex color for UI display",
  "questionCount": "number — total scorable questions",
  "answeredCount": "number — questions answered by user"
}
```

---

## API Endpoints

All endpoints are served via tRPC under `/api/trpc`. Authentication uses session cookies set by the OAuth flow.

### Public Endpoints

| Procedure | Type | Description |
|-----------|------|-------------|
| `questionnaire.getDefinition` | Query | Returns the full questionnaire structure, risk thresholds, and supported countries |
| `assessment.getCompliance` | Query | Returns compliance template for a given country code |

### Protected Endpoints (require authentication)

| Procedure | Type | Input | Description |
|-----------|------|-------|-------------|
| `assessment.submit` | Mutation | `{ employeeName, employeeEmail, jobTitle?, department?, workLocation?, country?, responses[] }` | Submit a completed assessment; calculates scores and stores results |
| `assessment.getById` | Query | `{ id: number }` | Retrieve a single assessment with recalculated results and compliance info |
| `assessment.listMine` | Query | — | List all assessments for the authenticated user |
| `assessment.listAll` | Query | — | **Admin only**: List all assessments across all users |
| `assessment.exportJson` | Query | `{ id: number }` | Export assessment as structured JSON (v1.0.0 schema) |
| `upload.photo` | Mutation | `{ fileName, fileBase64, mimeType }` | Upload a workstation photo to S3 |

### Input Validation

All inputs are validated using Zod schemas:

```typescript
// Assessment submission
{
  employeeName: z.string().min(1).max(255),
  employeeEmail: z.string().email().max(320),
  jobTitle: z.string().max(255).optional(),
  department: z.string().max(255).optional(),
  workLocation: z.enum(["office", "home", "hybrid", "other"]).optional(),
  country: z.string().length(2).optional(),
  responses: z.array(z.object({
    questionId: z.string(),
    value: z.string(),
    textComment: z.string().optional(),
  })),
  photoUrl: z.string().optional(),
}
```

### Error Handling

| Code | Condition |
|------|-----------|
| `NOT_FOUND` | Assessment ID does not exist |
| `FORBIDDEN` | User attempting to access another user's assessment (non-admin) |
| `UNAUTHORIZED` | Unauthenticated request to protected endpoint |
| `BAD_REQUEST` | Input validation failure |

---

## Compliance Framework

### Architecture

The compliance framework uses a template-based approach:

```
Universal Questionnaire → Scoring Engine → Country-Specific Compliance Template → Report Output
```

The questionnaire and scoring are identical across all jurisdictions. Compliance templates add jurisdiction-specific context to the output:

| Template Field | Purpose |
|---------------|---------|
| `regulatoryFramework` | Primary legislation name |
| `regulatoryBody` | Enforcement authority |
| `keyRegulations` | List of applicable regulations |
| `assessmentFrequency` | How often assessments should be conducted |
| `employerObligations` | Legal duties of the employer |
| `employeeRights` | Legal rights of the employee |
| `documentationRequirements` | What records must be maintained |
| `reportTitle` | Localized report title |
| `reportSubtitle` | Localized report subtitle |
| `legalDisclaimer` | Jurisdiction-specific disclaimer |

### Supported Jurisdictions

| Code | Country | Primary Legislation | Regulatory Body |
|------|---------|-------------------|----------------|
| DE | Germany | ArbSchG & ArbStättV | BAuA |
| CH | Switzerland | ArG & ArGV 3 | SECO |
| DK | Denmark | Arbejdsmiljøloven | Arbejdstilsynet |
| UK | United Kingdom | DSE Regulations 1992 | HSE |
| IE | Ireland | General Application Regulations 2007 | HSA |
| AU | Australia | WHS Act 2011 | Safe Work Australia |

### Adding New Countries

To add a new country, add an entry to `COMPLIANCE_TEMPLATES` in `shared/compliance.ts`:

```typescript
COMPLIANCE_TEMPLATES["XX"] = {
  countryCode: "XX",
  countryName: "Country Name",
  regulatoryFramework: "...",
  regulatoryBody: "...",
  keyRegulations: ["..."],
  assessmentFrequency: "...",
  employerObligations: ["..."],
  employeeRights: ["..."],
  documentationRequirements: ["..."],
  reportTitle: "...",
  reportSubtitle: "...",
  legalDisclaimer: "...",
};
```

---

## Extensibility Architecture

The system is designed with clear extension points for future capabilities:

### AI Report Generation

The `invokeLLM` helper is available server-side. A future endpoint could accept the structured assessment JSON and generate narrative reports:

```typescript
// Future: assessment.generateAIReport
const report = await invokeLLM({
  messages: [
    { role: "system", content: "You are an occupational health specialist..." },
    { role: "user", content: JSON.stringify(assessmentResult) },
  ],
});
```

### Photo-Based Posture Analysis

The photo upload endpoint (`upload.photo`) already stores workstation images. Future integration could:
1. Accept the S3 URL of an uploaded photo
2. Send it to a vision model via `invokeLLM` with image content
3. Return structured posture analysis feedback

### Employer Dashboards

The `assessment.listAll` admin endpoint provides the data foundation. Future dashboards could aggregate:
- Department-level risk averages
- Trend analysis over time
- Compliance completion rates
- Action item tracking

### Compliance Report Exports

The PDF generation system (`pdfReport.ts`) is modular. Future enhancements could:
- Add country-specific report formats
- Include digital signatures
- Generate bulk employer reports
- Export to additional formats (DOCX, CSV)
