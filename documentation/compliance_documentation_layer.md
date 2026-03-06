# Compliance Documentation Layer Design
## Ergonomic Risk Assessment Platform

**Author:** Manus AI
**Date:** March 6, 2026

This document outlines the compliance documentation layer for the Ergonomic Risk Self-Assessment Tool. It provides the legal framework, required documentation structures, and automated template designs necessary to generate compliance-ready reports for six target jurisdictions: Germany, Switzerland, Denmark, the United Kingdom, Ireland, and Australia. The design ensures that a single universal assessment dataset can be transformed into jurisdiction-specific compliance outputs.

---

## 1. System Architecture: Compliance Layer

The compliance layer operates as a transformation engine between the universal assessment data model and the jurisdiction-specific output requirements. It relies on a template-based architecture where the core assessment data (JSON) is injected into localized reporting structures.

### 1.1 Core Components

The transformation process involves three distinct components working in sequence. The first component is the **Universal Assessment Dataset**, which contains the raw questionnaire responses, calculated risk scores, demographic data, and generated recommendations as defined in the technical documentation. The second component is the **Jurisdiction Rules Engine**, which maps the universal risk categories to specific legal requirements, determining the priority of risks based on local thresholds and identifying mandatory reporting fields. The final component is the **Compliance Template Library**, which provides the structured layouts, legal references, and localized terminology required to generate the final PDF report.

### 1.2 Data Transformation Flow

The system processes the assessment data through a structured flow to produce the final report. Initially, the user completes the universal questionnaire, and the system calculates the raw scores. The application then identifies the user's jurisdiction based on the `country` field in the assessment payload. Following this, the Jurisdiction Rules Engine selects the appropriate template and terminology set. The system maps the universal risk categories (e.g., "Monitor Positioning") to the corresponding legal requirements (e.g., "Schedule 4, Part 1(a)"). Finally, the reporting engine generates a localized document that satisfies the specific regulatory obligations of that country.

---

## 2. Jurisdictional Compliance Frameworks

This section details the primary legislation, regulatory bodies, and specific documentation requirements for each of the six target jurisdictions.

### 2.1 Germany (DE)

The German occupational health framework is highly structured and documentation-driven, focusing heavily on prevention and systematic risk evaluation [1].

**Primary Legislation:** Arbeitsschutzgesetz (ArbSchG) – Occupational Safety and Health Act (1996); Arbeitsstättenverordnung (ArbStättV) – Workplace Ordinance (2004, amended 2024).
**Secondary Regulations:** DGUV Information 215-410 (Screen and office workstations - Guidelines for design).
**Regulatory Body:** Deutsche Gesetzliche Unfallversicherung (DGUV) and Bundesanstalt für Arbeitsschutz und Arbeitsmedizin (BAuA).
**Required Documentation:** Gefährdungsbeurteilung (Risk Assessment) documentation.
**Assessment Frequency:** Must be reviewed regularly (typically annually) and updated when significant changes occur at the workstation.

**Key Terminology:**
| English Term | German Term |
|---|---|
| Risk Assessment | Gefährdungsbeurteilung |
| Display Screen Equipment Workstation | Bildschirmarbeitsplatz |
| Work Equipment | Arbeitsmittel |
| Control Measures | Schutzmaßnahmen |

### 2.2 Switzerland (CH)

The Swiss system emphasizes the employer's general duty of care and health protection, with specific guidelines provided by the State Secretariat for Economic Affairs [2].

**Primary Legislation:** Arbeitsgesetz (ArG) – Work Act (1964).
**Secondary Regulations:** Verordnung 3 zum Arbeitsgesetz (ArGV 3) – Ordinance 3 to the Work Act; SECO Wegleitung zur ArGV 3 (Guidance on Ordinance 3), specifically Articles 23 and 24.
**Regulatory Body:** State Secretariat for Economic Affairs (SECO) and Cantonal Labour Inspectorates.
**Required Documentation:** Arbeitsplatzbeurteilung (Workplace Assessment) or general Risikobeurteilung (Risk Assessment) documentation.
**Assessment Frequency:** Regularly, or when significant changes to the workstation or work processes occur.

**Key Terminology:**
| English Term | Swiss German Term |
|---|---|
| Risk Assessment | Risikobeurteilung |
| Workplace Assessment | Arbeitsplatzbeurteilung |
| Display Screen Equipment | Bildschirmgerät |
| Health Protection | Gesundheitsschutz |

### 2.3 Denmark (DK)

Denmark requires a highly participatory approach to risk assessment, mandating the involvement of employees and the health and safety organization [3].

**Primary Legislation:** Arbejdsmiljøloven – Working Environment Act (Consolidated Act No. 268).
**Secondary Regulations:** Bekendtgørelse om arbejde ved skærmterminaler (Executive Order on Work at Display Screen Equipment, No. 1108).
**Regulatory Body:** Arbejdstilsynet (The Danish Working Environment Authority).
**Required Documentation:** Arbejdspladsvurdering (APV) – Workplace Assessment.
**Assessment Frequency:** At least every three years, or when changes affect the working environment.

**Key Terminology:**
| English Term | Danish Term |
|---|---|
| Workplace Assessment | Arbejdspladsvurdering (APV) |
| Working Environment Authority | Arbejdstilsynet |
| Display Screen Terminal | Skærmterminal |
| Working Environment | Arbejdsmiljø |

### 2.4 United Kingdom (UK)

The UK framework relies on specific regulations derived from the original EU Directive, requiring a structured analysis of workstations [4].

**Primary Legislation:** Health and Safety (Display Screen Equipment) Regulations 1992 (as amended 2002); Management of Health and Safety at Work Regulations 1999.
**Secondary Regulations:** HSE Guidance L26 (Work with display screen equipment).
**Regulatory Body:** Health and Safety Executive (HSE).
**Required Documentation:** DSE Workstation Assessment Record.
**Assessment Frequency:** When a new workstation is set up, a new user starts, substantial changes are made, or users complain of discomfort.

**Key Terminology:**
| English Term | UK Legal Term |
|---|---|
| Display Screen Equipment | Display Screen Equipment (DSE) |
| Risk Assessment | DSE Workstation Assessment |
| Employee | User |
| Control Measures | Remedial Action |

### 2.5 Ireland (IE)

Ireland's regulations closely mirror the UK's but are embedded within a broader General Application framework [5].

**Primary Legislation:** Safety, Health and Welfare at Work Act 2005.
**Secondary Regulations:** Safety, Health and Welfare at Work (General Application) Regulations 2007, Part 2, Chapter 5 (Regulations 70-73) and Schedule 4.
**Regulatory Body:** Health and Safety Authority (HSA).
**Required Documentation:** Workstation Risk Assessment (Analysis of the workstation).
**Assessment Frequency:** Before commencing DSE work, at regular intervals, or when significant changes occur.

**Key Terminology:**
| English Term | Irish Legal Term |
|---|---|
| Display Screen Equipment | Display Screen Equipment (DSE) / VDU |
| Risk Assessment | Analysis of the workstation |
| Corrective Appliances | Special corrective appliances |
| Control Measures | Action Plan |

### 2.6 Australia (AU)

The Australian framework is harmonized across most states and focuses on managing the risks associated with hazardous manual tasks, which includes prolonged sitting and computer use [6].

**Primary Legislation:** Work Health and Safety Act 2011 (WHS Act).
**Secondary Regulations:** Work Health and Safety Regulations 2011 (Chapter 4, Part 4.2); Model Code of Practice: Hazardous manual tasks.
**Regulatory Body:** Safe Work Australia (policy) and state/territory regulators (e.g., SafeWork NSW, WorkSafe Victoria).
**Required Documentation:** WHS Risk Assessment Record.
**Assessment Frequency:** Regularly reviewed, especially when new hazards are identified or before significant workplace changes.

**Key Terminology:**
| English Term | Australian Legal Term |
|---|---|
| Employer | Person Conducting a Business or Undertaking (PCBU) |
| Ergonomic Risk | Hazardous Manual Task |
| Risk Assessment | Risk Management Process |
| Control Measures | Control Measures |

---

## 3. Minimum Report Structure Requirements

To ensure compliance across all supported jurisdictions, the automated reporting engine must generate documents containing the following minimum structural elements. While the presentation and terminology will vary by country, the core data points remain consistent.

### 3.1 Document Metadata and Header
Every compliance report must clearly identify the context of the assessment. This includes the formal title of the document localized to the jurisdiction (e.g., "Gefährdungsbeurteilung für Bildschirmarbeitsplätze" for Germany). It must also contain the assessment date, the date for the next scheduled review, and the unique assessment identifier. The header must detail the employee's full name, job title, department, and primary work location. Finally, the name and role of the assessor must be recorded; in the context of a self-assessment tool, this will indicate that it is an employee self-assessment, supplemented by system-generated analysis.

### 3.2 Workstation Description and Scope
The report must provide a clear overview of the workstation being assessed. This section details the equipment profile, listing the primary devices in use, such as laptops, external monitors, and ergonomic peripherals. It also documents the work pattern, specifying the average daily hours spent using display screen equipment and the typical frequency of breaks. If the user has uploaded a photograph of their workstation, a reference to this visual evidence should be included to support the assessment findings.

### 3.3 Identified Risks and Evaluation
This is the core of the compliance document, detailing the findings of the assessment. The report must systematically present the evaluation across the key ergonomic categories: Workstation Equipment, Posture and Body Positioning, Work Patterns, Environmental Factors, Vision and Eye Strain, and Psychosocial Workload. For each category, the report must display the calculated risk score and the corresponding risk rating (Low, Moderate, High, or Critical). The specific risk factors identified during the questionnaire must be explicitly listed, mapping the user's responses to potential health hazards.

### 3.4 Recommended Control Measures (Action Plan)
Compliance requires not just identifying risks, but also planning corrective actions. The report must generate a structured action plan based on the identified risks. Each recommendation must include a priority level, dictating the urgency of the intervention. The recommended corrective actions must be specific and actionable, such as adjusting monitor height or implementing the 20-20-20 rule. Crucially, the action plan must designate the implementation responsibilities, clarifying whether the action is to be taken by the employee (e.g., changing posture) or the employer (e.g., procuring new equipment).

### 3.5 Legal Declarations and Signatures
The final section of the report formalizes the document as a compliance record. It must include the relevant legal references, citing the specific national legislation and regulations that the assessment fulfills. A localized legal disclaimer must be present, clarifying the scope and limitations of the self-assessment. Finally, the document must provide signature blocks or digital timestamps confirming the completion of the assessment by the employee and the review by the designated management or health and safety representative.

---

## 4. Automated Template Design

The platform will utilize a JSON-driven templating system to generate the final PDF reports. The following structure defines the template schema required to map the universal assessment data to the jurisdiction-specific outputs.

### 4.1 Base Template Schema

The compliance templates are defined using a structured configuration object. This object dictates the localized text, legal references, and specific structural requirements for each country.

```json
{
  "countryCode": "STRING",
  "documentTitle": "STRING",
  "documentSubtitle": "STRING",
  "regulatoryBody": "STRING",
  "terminology": {
    "employee": "STRING",
    "assessor": "STRING",
    "riskLevel": "STRING",
    "controlMeasures": "STRING",
    "actionPlan": "STRING"
  },
  "legalReferences": [
    "STRING"
  ],
  "requiredSections": [
    "metadata",
    "workstation_profile",
    "risk_evaluation_matrix",
    "action_plan",
    "effectiveness_review",
    "employee_involvement"
  ],
  "disclaimerText": "STRING"
}
```

### 4.2 Country-Specific Template Implementations

#### Germany (DE) Template
**Focus:** The German template heavily emphasizes the "Effectiveness Review" (Wirksamkeitskontrolle) section, which is a strict requirement under the ArbSchG. It includes specific fields for documenting when the control measures were reviewed and whether they successfully mitigated the identified risks.

```json
{
  "countryCode": "DE",
  "documentTitle": "Gefährdungsbeurteilung: Bildschirmarbeitsplatz",
  "documentSubtitle": "Nach § 5 ArbSchG und Anhang 6 ArbStättV",
  "regulatoryBody": "DGUV / BAuA",
  "terminology": {
    "employee": "Beschäftigte(r)",
    "assessor": "Beurteiler",
    "riskLevel": "Gefährdungsstufe",
    "controlMeasures": "Schutzmaßnahmen",
    "actionPlan": "Maßnahmenplan"
  },
  "legalReferences": [
    "Arbeitsschutzgesetz (ArbSchG) §§ 5, 6",
    "Arbeitsstättenverordnung (ArbStättV) § 3, Anhang 6",
    "DGUV Information 215-410"
  ],
  "requiredSections": [
    "metadata",
    "workstation_profile",
    "risk_evaluation_matrix",
    "action_plan",
    "effectiveness_review"
  ],
  "disclaimerText": "Diese Beurteilung wurde als Selbstbewertung durchgeführt und dient als Grundlage für die gesetzlich vorgeschriebene Gefährdungsbeurteilung."
}
```

#### United Kingdom (UK) Template
**Focus:** The UK template closely follows the structure of the Schedule to the DSE Regulations. The evaluation section is organized specifically around the equipment, the environment, and the user interface, ensuring direct alignment with the HSE guidance documents.

```json
{
  "countryCode": "UK",
  "documentTitle": "DSE Workstation Assessment Record",
  "documentSubtitle": "In compliance with Health and Safety (Display Screen Equipment) Regulations 1992",
  "regulatoryBody": "Health and Safety Executive (HSE)",
  "terminology": {
    "employee": "User",
    "assessor": "Assessor",
    "riskLevel": "Risk Rating",
    "controlMeasures": "Remedial Action",
    "actionPlan": "Action Plan"
  },
  "legalReferences": [
    "Health and Safety (Display Screen Equipment) Regulations 1992 (as amended)",
    "Management of Health and Safety at Work Regulations 1999"
  ],
  "requiredSections": [
    "metadata",
    "workstation_profile",
    "risk_evaluation_matrix",
    "action_plan"
  ],
  "disclaimerText": "This document serves as a record of a suitable and sufficient analysis of the user's workstation as required by Regulation 2."
}
```

#### Denmark (DK) Template
**Focus:** The Danish APV template requires explicit documentation of employee involvement. The template includes a mandatory section detailing how the health and safety organization or employee representatives participated in the assessment process, reflecting the collaborative requirements of the Arbejdsmiljøloven.

```json
{
  "countryCode": "DK",
  "documentTitle": "Arbejdspladsvurdering (APV): Skærmterminalarbejdsplads",
  "documentSubtitle": "I henhold til Arbejdsmiljøloven og Bekendtgørelse nr. 1108",
  "regulatoryBody": "Arbejdstilsynet",
  "terminology": {
    "employee": "Medarbejder",
    "assessor": "Vurderer",
    "riskLevel": "Risikoniveau",
    "controlMeasures": "Forebyggende foranstaltninger",
    "actionPlan": "Handlingsplan"
  },
  "legalReferences": [
    "Arbejdsmiljøloven (Consolidated Act No. 268)",
    "Bekendtgørelse om arbejde ved skærmterminaler (nr. 1108)"
  ],
  "requiredSections": [
    "metadata",
    "employee_involvement",
    "workstation_profile",
    "risk_evaluation_matrix",
    "action_plan",
    "effectiveness_review"
  ],
  "disclaimerText": "Denne APV er udarbejdet i samarbejde mellem ledelse og medarbejdere som et led i virksomhedens systematiske arbejdsmiljøarbejde."
}
```

#### Australia (AU) Template
**Focus:** The Australian template utilizes the terminology of the WHS Act, focusing on "Hazardous Manual Tasks." The action plan is structured around the "Hierarchy of Controls," categorizing recommendations by their effectiveness (e.g., elimination, engineering controls, administrative controls).

```json
{
  "countryCode": "AU",
  "documentTitle": "WHS Risk Assessment Record: Office Ergonomics",
  "documentSubtitle": "In accordance with the Work Health and Safety Act 2011",
  "regulatoryBody": "Safe Work Australia / State Regulator",
  "terminology": {
    "employee": "Worker",
    "assessor": "Assessor",
    "riskLevel": "Risk Level",
    "controlMeasures": "Control Measures",
    "actionPlan": "Risk Management Plan"
  },
  "legalReferences": [
    "Work Health and Safety Act 2011, Section 19",
    "Work Health and Safety Regulations 2011, Chapter 4, Part 4.2",
    "Model Code of Practice: Hazardous manual tasks"
  ],
  "requiredSections": [
    "metadata",
    "workstation_profile",
    "risk_evaluation_matrix",
    "hierarchy_of_controls_plan"
  ],
  "disclaimerText": "This record documents the risk management process undertaken by the PCBU to identify, assess, and control risks associated with hazardous manual tasks."
}
```

#### Ireland (IE) Template
**Focus:** Similar to the UK, but referencing the specific General Application Regulations and the Schedule 4 minimum requirements.

```json
{
  "countryCode": "IE",
  "documentTitle": "Workstation Risk Assessment (DSE/VDU)",
  "documentSubtitle": "Safety, Health and Welfare at Work (General Application) Regulations 2007",
  "regulatoryBody": "Health and Safety Authority (HSA)",
  "terminology": {
    "employee": "Employee",
    "assessor": "Assessor",
    "riskLevel": "Risk Level",
    "controlMeasures": "Control Measures",
    "actionPlan": "Action Plan"
  },
  "legalReferences": [
    "Safety, Health and Welfare at Work Act 2005",
    "General Application Regulations 2007, Part 2, Chapter 5",
    "Schedule 4: Minimum Requirements for all Display Screen Equipment"
  ],
  "requiredSections": [
    "metadata",
    "workstation_profile",
    "risk_evaluation_matrix",
    "action_plan"
  ],
  "disclaimerText": "This assessment confirms that the minimum requirements from Schedule 4 have been considered."
}
```

#### Switzerland (CH) Template
**Focus:** General health protection documentation referencing the Work Act and SECO guidelines.

```json
{
  "countryCode": "CH",
  "documentTitle": "Arbeitsplatzbeurteilung: Bildschirmarbeit",
  "documentSubtitle": "Gemäss Arbeitsgesetz (ArG) und Verordnung 3 (ArGV 3)",
  "regulatoryBody": "SECO / SUVA",
  "terminology": {
    "employee": "Arbeitnehmer",
    "assessor": "Beurteiler",
    "riskLevel": "Risikostufe",
    "controlMeasures": "Massnahmen",
    "actionPlan": "Massnahmenplan"
  },
  "legalReferences": [
    "Arbeitsgesetz (ArG)",
    "Verordnung 3 zum Arbeitsgesetz (ArGV 3), Art. 23 & 24",
    "SECO Wegleitung zur ArGV 3"
  ],
  "requiredSections": [
    "metadata",
    "workstation_profile",
    "risk_evaluation_matrix",
    "action_plan"
  ],
  "disclaimerText": "Diese Dokumentation dient dem Nachweis der Einhaltung der Vorschriften zum Gesundheitsschutz am Arbeitsplatz."
}
```

---

## References

[1] Germany Federal Ministry of Justice. (2004). *Arbeitsstättenverordnung (ArbStättV)*. Retrieved from https://www.gesetze-im-internet.de/arbst_ttv_2004/
[2] State Secretariat for Economic Affairs (SECO). (n.d.). *Wegleitung zur ArGV 3*. Retrieved from https://www.seco.admin.ch/seco/de/home/Arbeit/Arbeitsbedingungen/Arbeitsgesetz-und-Verordnungen/Wegleitungen/wegleitung-zur-argv-3.html
[3] Arbejdstilsynet. (2016). *Risk assessment (APV)*. Retrieved from https://at.dk/en/regulations/guidelines/risk-assessment-apv/
[4] Health and Safety Executive (HSE). (2013). *Display screen equipment (DSE) workstation checklist*. Retrieved from https://www.hse.gov.uk/pubns/ck1.htm
[5] Health and Safety Authority (HSA). (2007). *Guide to the Safety, Health and Welfare at Work (General Application) Regulations 2007 - Chapter 5: Display Screen Equipment*. Retrieved from https://www.hsa.ie/
[6] Safe Work Australia. (2018). *Model Code of Practice: How to manage work health and safety risks*. Retrieved from https://www.safeworkaustralia.gov.au/doc/model-code-practice-how-manage-work-health-and-safety-risks
