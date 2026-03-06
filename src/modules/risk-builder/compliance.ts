/**
 * Risk Assessment Builder — Compliance Templates
 * Jurisdiction-specific legal context for risk assessment obligations.
 */

export interface BuilderComplianceTemplate {
  country: string;
  legislation: string[];
  employerObligations: string[];
  reportingNote: string;
}

export const BUILDER_COMPLIANCE: Record<string, BuilderComplianceTemplate> = {
  IE: {
    country: "Ireland",
    legislation: [
      "Safety, Health and Welfare at Work Act 2005 (as amended)",
      "Safety, Health and Welfare at Work (General Application) Regulations 2007",
      "Safety, Health and Welfare at Work (Construction) Regulations 2013",
    ],
    employerObligations: [
      "Under Section 19 of the Safety, Health and Welfare at Work Act 2005, every employer must identify hazards, assess risks, and implement control measures.",
      "A written Safety Statement incorporating the risk assessment must be prepared and reviewed at least annually or following any significant change.",
      "Employees must be informed of the risks identified and the control measures in place.",
      "Risk assessments must be conducted by a competent person.",
    ],
    reportingNote:
      "This risk assessment was conducted in accordance with the Safety, Health and Welfare at Work Act 2005 and is part of the organisation's Safety Statement. It must be reviewed annually or following any accident, incident, or significant change in the workplace.",
  },
  UK: {
    country: "United Kingdom",
    legislation: [
      "Health and Safety at Work etc. Act 1974",
      "Management of Health and Safety at Work Regulations 1999",
      "Workplace (Health, Safety and Welfare) Regulations 1992",
    ],
    employerObligations: [
      "Under Regulation 3 of the Management of Health and Safety at Work Regulations 1999, employers must conduct a 'suitable and sufficient' risk assessment.",
      "Employers with 5 or more employees must record the significant findings of the risk assessment.",
      "Risk assessments must be reviewed regularly and whenever there is reason to suspect they are no longer valid.",
      "Employees and their representatives must be consulted on health and safety matters.",
    ],
    reportingNote:
      "This risk assessment was conducted in accordance with the Management of Health and Safety at Work Regulations 1999. The significant findings have been recorded as required. This assessment should be reviewed annually or following any significant change.",
  },
  DE: {
    country: "Germany",
    legislation: [
      "Arbeitsschutzgesetz (ArbSchG) — Occupational Health and Safety Act",
      "Arbeitsstättenverordnung (ArbStättV) — Workplace Ordinance",
      "DGUV Vorschrift 1 — Grundsätze der Prävention",
    ],
    employerObligations: [
      "Under §5 ArbSchG, employers must conduct a Gefährdungsbeurteilung (risk assessment) for all work activities.",
      "The Gefährdungsbeurteilung must be documented in writing.",
      "Employees must be instructed on the risks and control measures identified.",
      "The Betriebsrat (Works Council) has co-determination rights on health and safety matters.",
    ],
    reportingNote:
      "Diese Gefährdungsbeurteilung wurde gemäss §5 und §6 ArbSchG sowie den DGUV-Vorschriften durchgeführt und dokumentiert. Sie ist regelmässig zu überprüfen und bei wesentlichen Änderungen der Arbeitsbedingungen zu aktualisieren.",
  },
  CH: {
    country: "Switzerland",
    legislation: [
      "Arbeitsgesetz (ArG) — Labour Act",
      "Verordnung 3 zum Arbeitsgesetz (ArGV 3) — Health Protection Ordinance",
      "Unfallversicherungsgesetz (UVG) — Accident Insurance Act",
      "SUVA Richtlinien zur Risikobeurteilung",
    ],
    employerObligations: [
      "Under Art. 6 ArG, employers must take all measures necessary to protect the health and safety of employees.",
      "SUVA (Swiss National Accident Insurance Fund) requires employers to conduct risk assessments for all significant hazards.",
      "Employees must be informed and trained on identified risks and control measures.",
      "Risk assessments must be documented and available for inspection by SUVA and cantonal labour inspectorates.",
    ],
    reportingNote:
      "Diese Risikobeurteilung wurde gemäss den Anforderungen des Arbeitsgesetzes, der ArGV 3 und den SUVA-Richtlinien durchgeführt. Sie ist regelmässig zu überprüfen.",
  },
  DK: {
    country: "Denmark",
    legislation: [
      "Arbejdsmiljøloven — Working Environment Act",
      "Bekendtgørelse om arbejdets udførelse — Order on the Performance of Work",
      "Bekendtgørelse om systematisk arbejdsmiljøarbejde — Order on Systematic WHS Management",
    ],
    employerObligations: [
      "Under the Arbejdsmiljøloven, employers must conduct a written Arbejdspladsvurdering (APV — Workplace Assessment) covering all significant risks.",
      "The APV must be reviewed at least every three years or following significant changes.",
      "Employees must be involved in the APV process through the Arbejdsmiljøorganisation (AMO).",
      "The Arbejdstilsynet (Danish Working Environment Authority) may inspect APV documentation at any time.",
    ],
    reportingNote:
      "Denne risikovurdering er udført som en del af virksomhedens APV (Arbejdspladsvurdering) i overensstemmelse med Arbejdsmiljøloven. Den skal revideres mindst hvert tredje år.",
  },
  AU: {
    country: "Australia",
    legislation: [
      "Work Health and Safety Act 2011 (Model WHS Act)",
      "Work Health and Safety Regulations 2017",
      "Safe Work Australia — How to Manage Work Health and Safety Risks Code of Practice (2011)",
    ],
    employerObligations: [
      "Under the Model WHS Act, PCBUs must manage risks by identifying hazards, assessing risks, and implementing control measures using the hierarchy of controls.",
      "Risk assessments must be documented when the risk is not well-known, when controls require consultation, or when the assessment is needed to choose between controls.",
      "Workers and their health and safety representatives (HSRs) must be consulted in the risk management process.",
      "Risk assessments must be reviewed when there is reason to believe they are no longer valid.",
    ],
    reportingNote:
      "This risk assessment was conducted in accordance with the Model WHS Act 2011 and the Safe Work Australia Code of Practice: How to Manage Work Health and Safety Risks. It forms part of the organisation's WHS risk register.",
  },
};

export function getBuilderCompliance(country: string): BuilderComplianceTemplate {
  return (
    BUILDER_COMPLIANCE[country] ?? {
      country: "International",
      legislation: [
        "ISO 45001:2018 — Occupational Health and Safety Management Systems",
        "EU Framework Directive 89/391/EEC on Safety and Health at Work",
        "ILO Convention No. 155 — Occupational Safety and Health Convention",
      ],
      employerObligations: [
        "Employers must identify hazards, assess risks, and implement appropriate control measures.",
        "Risk assessments should be documented and reviewed regularly.",
        "Employees must be informed of identified risks and the controls in place.",
        "ISO 45001 provides a framework for systematic occupational health and safety management.",
      ],
      reportingNote:
        "This risk assessment was conducted in accordance with ISO 45001:2018 and international best practice for occupational health and safety risk management.",
    }
  );
}
