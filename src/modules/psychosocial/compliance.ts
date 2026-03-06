/**
 * Psychosocial Risk Assessment — Compliance Templates
 * Jurisdiction-specific legal context for 6 countries.
 */

import type { ComplianceTemplate } from "@/lib/shared/types";

export const PSYCHOSOCIAL_COMPLIANCE: Record<string, ComplianceTemplate> = {
  IE: {
    country: "Ireland",
    legislation: [
      "Safety, Health and Welfare at Work Act 2005 (as amended)",
      "Code of Practice for Employers and Employees on the Right to Disconnect 2021",
      "Work Life Balance and Miscellaneous Provisions Act 2023",
      "Industrial Relations Act 1990 — Dignity at Work",
    ],
    employerObligations: [
      "Employers must identify and assess psychosocial hazards (including stress, bullying, and excessive workload) as part of their statutory risk assessment under Section 19 of the Safety, Health and Welfare at Work Act 2005.",
      "Employers must have a written Safety Statement that includes psychosocial risk controls.",
      "Under the Right to Disconnect Code of Practice, employers must not require employees to routinely respond to communications outside of contracted hours.",
      "Employers must have a Dignity at Work policy in place and must investigate complaints of bullying or harassment promptly and fairly.",
      "Employers must provide access to an Employee Assistance Programme or equivalent wellbeing support.",
    ],
    reportingNote:
      "This assessment was conducted in compliance with the Health and Safety Authority (HSA) guidance on work-related stress and psychosocial risk management. Results should be reviewed by a competent person and incorporated into the organisation's Safety Statement.",
  },

  UK: {
    country: "United Kingdom",
    legislation: [
      "Health and Safety at Work etc. Act 1974",
      "Management of Health and Safety at Work Regulations 1999",
      "HSE Management Standards for Work-Related Stress (2004)",
      "Equality Act 2010 — Mental Health as a Protected Characteristic",
      "Working Time Regulations 1998",
    ],
    employerObligations: [
      "Employers must conduct suitable and sufficient risk assessments that include psychosocial hazards under the Management of Health and Safety at Work Regulations 1999.",
      "The HSE Management Standards identify six key areas of work design that can lead to stress if not properly managed: Demands, Control, Support, Relationships, Role, and Change.",
      "Employers must implement the HSE Management Standards approach as a framework for managing work-related stress.",
      "Employers must have a written stress policy and a clear process for employees to report stress-related concerns.",
      "Under the Working Time Regulations 1998, workers are entitled to a maximum 48-hour working week (unless they opt out), 11 hours daily rest, and 24 hours weekly rest.",
    ],
    reportingNote:
      "This assessment is aligned with the HSE Management Standards Indicator Tool. Results should be reviewed against HSE benchmark data and used to inform a stress risk assessment action plan.",
  },

  DE: {
    country: "Germany",
    legislation: [
      "Arbeitsschutzgesetz (ArbSchG) — Occupational Health and Safety Act",
      "Arbeitszeitgesetz (ArbZG) — Working Hours Act",
      "Allgemeines Gleichbehandlungsgesetz (AGG) — General Equal Treatment Act",
      "Betriebsverfassungsgesetz (BetrVG) — Works Constitution Act",
    ],
    employerObligations: [
      "Under §5 ArbSchG, employers must conduct a Gefährdungsbeurteilung (risk assessment) that explicitly includes psychische Belastungen (psychological stressors) as required by the 2013 amendment.",
      "The Gefährdungsbeurteilung must assess workload, work organisation, social relationships, and the work environment.",
      "Under the ArbZG, the maximum working day is 8 hours (extendable to 10 hours if averaged over 6 months), with a minimum 11-hour rest period.",
      "The Works Council (Betriebsrat) has co-determination rights on matters affecting employee wellbeing under §87 BetrVG.",
      "Employers must document their Gefährdungsbeurteilung and make it available to the Gewerbeaufsicht (labour inspectorate) on request.",
    ],
    reportingNote:
      "Diese Beurteilung wurde im Einklang mit den Anforderungen des Arbeitsschutzgesetzes und der DGUV-Leitlinien zur psychischen Gefährdungsbeurteilung durchgeführt.",
  },

  CH: {
    country: "Switzerland",
    legislation: [
      "Arbeitsgesetz (ArG) — Labour Act",
      "Verordnung 3 zum Arbeitsgesetz (ArGV 3) — Ordinance on Health Protection",
      "Obligationenrecht (OR) Art. 328 — Employer's Duty of Care",
      "Unfallversicherungsgesetz (UVG) — Accident Insurance Act",
    ],
    employerObligations: [
      "Under Art. 6 ArG and ArGV 3, employers must take all measures necessary to protect the physical and psychological health of employees.",
      "ArGV 3 Art. 2 explicitly requires employers to design work in a way that avoids health-damaging psychological stress.",
      "Under Art. 328 OR, employers have a duty of care (Fürsorgepflicht) that includes protecting employees from workplace stress and harassment.",
      "SECO (State Secretariat for Economic Affairs) guidance requires that psychosocial risk assessments be conducted as part of the overall workplace risk assessment.",
      "Maximum working hours are regulated under Art. 9 ArG (45 hours per week for office workers).",
    ],
    reportingNote:
      "Diese Beurteilung wurde gemäss den Anforderungen des Arbeitsgesetzes und der Verordnung 3 zum Arbeitsgesetz sowie den SECO-Leitlinien zum Schutz der psychischen Gesundheit am Arbeitsplatz durchgeführt.",
  },

  DK: {
    country: "Denmark",
    legislation: [
      "Arbejdsmiljøloven — Working Environment Act",
      "Bekendtgørelse om psykisk arbejdsmiljø (BEK nr. 1406) — Psychosocial Work Environment Order",
      "Ligebehandlingsloven — Equal Treatment Act",
      "Ferieloven — Holiday Act",
    ],
    employerObligations: [
      "Under the Arbejdsmiljøloven, employers must ensure that the psychosocial work environment does not cause health or safety risks.",
      "BEK nr. 1406 specifically requires employers to assess and manage psychosocial risk factors including workload, role clarity, social support, and work-life balance.",
      "Employers must involve employees and their representatives in the risk assessment process through the Arbejdsmiljøorganisation (AMO).",
      "The Arbejdstilsynet (Danish Working Environment Authority) actively inspects psychosocial working conditions and can issue improvement notices.",
      "Employers must have a written workplace assessment (APV — Arbejdspladsvurdering) that includes psychosocial risks, reviewed at least every three years.",
    ],
    reportingNote:
      "Denne vurdering er udført i overensstemmelse med kravene i Arbejdsmiljøloven og bekendtgørelsen om psykisk arbejdsmiljø. Resultaterne bør indgå i virksomhedens APV.",
  },

  AU: {
    country: "Australia",
    legislation: [
      "Work Health and Safety Act 2011 (Model WHS Act)",
      "Work Health and Safety Regulations 2017",
      "Safe Work Australia — Managing Psychosocial Hazards at Work Code of Practice (2022)",
      "Fair Work Act 2009",
    ],
    employerObligations: [
      "Under the Model WHS Act, persons conducting a business or undertaking (PCBUs) have a primary duty of care to ensure the health, safety, and welfare of workers, which explicitly includes psychological health.",
      "The 2022 Code of Practice on Managing Psychosocial Hazards at Work requires PCBUs to identify, assess, and control psychosocial hazards including job demands, low job control, poor support, and workplace violence.",
      "Employers must consult with workers and their health and safety representatives (HSRs) when identifying and managing psychosocial risks.",
      "Under the Fair Work Act 2009, employees are protected from adverse action if they raise health and safety concerns.",
      "Safe Work Australia's psychosocial hazard framework identifies 14 specific psychosocial hazards that must be assessed, including high job demands, low role clarity, and poor change management.",
    ],
    reportingNote:
      "This assessment was conducted in accordance with the Safe Work Australia Code of Practice: Managing Psychosocial Hazards at Work (2022) and the Model WHS Act. Results should be incorporated into the organisation's WHS risk register.",
  },
};

export function getPsychosocialCompliance(country: string): ComplianceTemplate {
  return (
    PSYCHOSOCIAL_COMPLIANCE[country] ?? {
      country: "International",
      legislation: [
        "ISO 45003:2021 — Occupational Health and Safety: Psychological Health and Safety at Work",
        "EU Framework Directive 89/391/EEC on Safety and Health at Work",
        "ILO Convention No. 155 — Occupational Safety and Health Convention",
      ],
      employerObligations: [
        "Employers should conduct regular psychosocial risk assessments as part of their overall occupational health and safety management system.",
        "ISO 45003 provides a framework for identifying, assessing, and controlling psychosocial hazards in the workplace.",
        "Employers should establish clear policies on workload management, dignity at work, and employee wellbeing.",
        "Access to confidential employee support services (e.g., EAP) is considered best practice internationally.",
      ],
      reportingNote:
        "This assessment was conducted in accordance with ISO 45003:2021 and international best practice for psychosocial risk management.",
    }
  );
}
