# AI Report Generation System: Digital Ergonomic Assessment Platform

**Author:** Manus AI  
**Date:** March 6, 2026

## 1. System Overview

This document defines the architecture, system instructions, prompt templates, and data schemas for the AI Report Generation System within the Digital Ergonomic Assessment Platform. The system is designed to consume structured JSON data resulting from the platform's ergonomic risk evaluation logic and generate two distinct, professional reports:

1.  **Employee Report:** A personalized, actionable guide focused on individual health, posture, and workstation improvements.
2.  **Employer Compliance Report:** A structured, formal document designed to meet jurisdictional occupational health and safety documentation requirements.

The AI generation layer acts as an advanced synthesis engine, transforming raw scores, identified hazards, and categorical data into coherent, professional narratives that avoid speculative medical claims and adhere strictly to occupational health standards [1].

---

## 2. Architecture & Implementation Guidance

The report generation process relies on a robust integration between the existing application backend (tRPC/Express) and a Large Language Model (LLM) capable of structured output generation.

### 2.1 Implementation Flow

1.  **Data Aggregation:** The system aggregates the user's questionnaire responses, calculated risk scores, demographic data, and jurisdiction-specific compliance metadata into a single, comprehensive JSON payload (the "Universal Assessment Dataset").
2.  **Prompt Assembly:** The backend selects the appropriate prompt template (Employee or Employer) and injects the JSON payload into the context.
3.  **LLM Invocation:** The `invokeLLM` function is called using a model optimized for structured outputs (e.g., GPT-4 or Claude 3.5 Sonnet) with JSON mode enabled to ensure the output strictly adheres to the defined response schema [2].
4.  **Validation & Parsing:** The resulting JSON is validated against a Zod schema to ensure all required fields are present and correctly typed.
5.  **Document Generation:** The validated JSON is passed to the client-side PDF generation engine (`jsPDF`), which maps the structured narrative into the final document layout.

### 2.2 Guardrails and Safety Constraints

To ensure the generated reports are safe, professional, and compliant, the following guardrails must be strictly enforced via system instructions:

*   **No Medical Diagnoses:** The AI must explicitly avoid diagnosing medical conditions (e.g., "You have Carpal Tunnel Syndrome"). It must only identify ergonomic risks (e.g., "Your wrist posture increases the risk of repetitive strain").
*   **Tone and Register:** The tone must be professional, objective, and supportive. For employees, it should be encouraging and instructional. For employers, it must be formal, precise, and suitable for legal auditing.
*   **Adherence to Logic:** The AI must not invent new risks or recommendations outside of those implied by the input data and the platform's predefined logic blocks. It acts to synthesize and contextualize, not to hallucinate novel ergonomic theories.
*   **Jurisdictional Accuracy:** When generating the employer report, the AI must strictly utilize the terminology and legal references provided in the input compliance metadata (e.g., using "Arbeitsplatzbeurteilung" for Switzerland or "DSE Workstation Assessment" for the UK).

---

## 3. Input Data Schema

Both prompt templates utilize the same input data structure, which represents the fully evaluated assessment.

```json
{
  "schema": "ergonomic-assessment/v1.0.0",
  "assessment": {
    "id": 12345,
    "date": "2026-03-06T10:25:00.000Z",
    "employee": {
      "name": "Jane Smith",
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
          "categoryId": "monitor_positioning",
          "categoryTitle": "Monitor Positioning",
          "score": 75.0,
          "rating": "high",
          "identifiedHazards": ["monitor_height_incorrect", "monitor_distance_incorrect"]
        },
        {
          "categoryId": "keyboard_mouse_placement",
          "categoryTitle": "Keyboard and Mouse Placement",
          "score": 20.0,
          "rating": "low",
          "identifiedHazards": []
        }
      ]
    },
    "recommendations": [
      {
        "categoryId": "monitor_positioning",
        "priority": "high",
        "text": "Raise the monitor using a stand or books so the top edge is at eye level, and ensure it is placed directly in front of you."
      }
    ],
    "complianceMetadata": {
      "countryCode": "UK",
      "regulatoryFramework": "Health and Safety (Display Screen Equipment) Regulations 1992",
      "regulatoryBody": "Health and Safety Executive (HSE)",
      "terminology": {
        "employee": "User",
        "assessor": "Assessor",
        "riskLevel": "Risk Rating",
        "controlMeasures": "Remedial Action",
        "actionPlan": "Action Plan"
      }
    }
  }
}
```

---

## 4. Employee Report Generation

The Employee Report is designed to help the individual understand their ergonomic risks and take immediate, practical steps to improve their workspace and habits.

### 4.1 System Instructions (Employee Persona)

```text
You are an expert Occupational Health and Ergonomics Specialist. Your task is to generate a personalized, highly actionable, and encouraging ergonomic assessment report for an employee based on their structured assessment data.

CRITICAL INSTRUCTIONS:
1. Tone: Maintain a supportive, professional, and easy-to-understand tone. Avoid overly technical jargon.
2. Structure: Follow the requested JSON output structure exactly.
3. No Medical Advice: NEVER diagnose conditions, suggest medical treatments, or use definitive medical terminology (e.g., do not say "This will cause sciatica"). Instead, use risk-based language (e.g., "This posture increases the risk of lower back discomfort").
4. Personalization: Address the employee by name and reference their specific work location (e.g., home, office, hybrid).
5. Actionability: Focus on practical, immediate steps they can take to improve their setup, drawing directly from the provided recommendations.
6. Empathy: Acknowledge that improving ergonomics is an ongoing process.
```

### 4.2 Prompt Template (Employee Report)

```text
Please generate the Employee Ergonomic Report based on the following assessment data.

INPUT DATA:
{input_json_payload}

OUTPUT FORMAT:
You must return a valid JSON object matching the following schema. Do not include markdown formatting like ```json.

{
  "reportTitle": "Personalized Ergonomic Assessment Report for [Employee Name]",
  "executiveSummary": "A concise, encouraging 2-3 sentence summary explaining their overall risk score ([Overall Score]) and what it means for their daily work.",
  "riskExplanation": "A brief paragraph explaining their overall risk rating ([Overall Rating Label]) in plain language.",
  "topPriorities": [
    {
      "area": "[Category Title]",
      "issue": "A plain-language description of the identified hazard.",
      "action": "A clear, specific instruction on how to fix it, based on the provided recommendations."
    }
  ],
  "postureAndHabits": "A synthesized paragraph providing personalized advice on posture, breaks, and work patterns based on their specific data.",
  "closingEncouragement": "A supportive closing sentence encouraging them to make these adjustments."
}
```

---

## 5. Employer Compliance Report Generation

The Employer Compliance Report serves as a formal record of the risk assessment, designed to satisfy jurisdictional legal requirements and provide management with a clear action plan.

### 5.1 System Instructions (Employer Persona)

```text
You are a highly precise Occupational Health and Safety (OHS) Compliance Auditor. Your task is to generate a formal, structured compliance report for an employer based on an employee's ergonomic risk assessment data.

CRITICAL INSTRUCTIONS:
1. Tone: Maintain a formal, objective, and highly professional tone suitable for legal documentation and auditing.
2. Compliance Terminology: You MUST use the specific terminology provided in the `complianceMetadata.terminology` object for the relevant jurisdiction. For example, if the data specifies the UK, use "User" instead of "Employee" and "Remedial Action" instead of "Recommendations".
3. Legal Context: Reference the provided `regulatoryFramework` and `regulatoryBody` to establish the document's authority.
4. Objectivity: Present findings as factual observations based on the assessment data. Do not use emotive language.
5. Action-Oriented: Clearly delineate between risks identified and the necessary control measures/action plan.
6. No Medical Speculation: Focus entirely on occupational hazards and control measures. Do not mention specific medical conditions.
```

### 5.2 Prompt Template (Employer Report)

```text
Please generate the Employer Compliance Report based on the following assessment data. Ensure strict adherence to the jurisdiction-specific terminology provided in the complianceMetadata.

INPUT DATA:
{input_json_payload}

OUTPUT FORMAT:
You must return a valid JSON object matching the following schema. Do not include markdown formatting like ```json.

{
  "documentHeader": {
    "title": "Formal report title incorporating the jurisdiction's regulatory framework.",
    "subtitle": "Reference to the specific regulations and regulatory body.",
    "assessmentId": "[Assessment ID]",
    "dateOfAssessment": "[Date]"
  },
  "subjectProfile": {
    "name": "[Employee Name]",
    "role": "[Job Title]",
    "department": "[Department]",
    "location": "[Work Location]"
  },
  "executiveSummary": "A formal, objective 2-sentence summary stating the overall risk rating and the general necessity for intervention.",
  "identifiedHazards": [
    {
      "category": "[Category Title]",
      "riskLevel": "[Rating]",
      "description": "A formal description of the specific hazards identified in this category."
    }
  ],
  "actionPlan": [
    {
      "priority": "[Priority Level]",
      "controlMeasure": "The specific recommended action, formatted as a formal directive.",
      "responsibility": "Indicate whether this is an 'Employee Action' (e.g., posture change) or 'Employer Action' (e.g., equipment purchase)."
    }
  ],
  "complianceStatement": "A formal closing statement indicating that this report serves as a record of the risk assessment process in accordance with the specified regulatory framework."
}
```

---

## References

[1] Health and Safety Executive (HSE). (2013). *Display screen equipment (DSE) workstation checklist*. Retrieved from https://www.hse.gov.uk/pubns/ck1.htm  
[2] OpenAI. (n.d.). *Best practices for prompt engineering with the OpenAI API*. Retrieved from https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api
