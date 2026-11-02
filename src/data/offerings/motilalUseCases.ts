/**
 * Use cases identified in Motilal discovery sessions, as supplied by the team. None is built: the AI agents already
 * built for Motilal are a separate set, and which of them are live has not been established here. Entries are kept as
 * given (tags such as Quick Win or Strategic are the team's own, and some entries repeat across business areas). The
 * grouping into themes is only for reading; it is not a priority, a ranking or a plan.
 */
export interface UseCaseTheme {
  id: 'documents' | 'processing' | 'analytics' | 'rules' | 'email' | 'governance'
  label: string
  items: string[]
}

export const motilalUseCases: UseCaseTheme[] = [
  {
    id: 'processing',
    label: 'Operations processing',
    items: [
      'Product Data Validation Agent',
      'Payout Tracking & Reconciliation Agent',
      'NCD Issue Setup Agent',
      'Configuration Assist Agent',
      'Deal Setup Agent',
      '3rd Party Allocation Tracking Bot',
      'RTA File Ingestion & Validation Agent',
      'Transaction File Processing Agent',
      'SIP Validation & Upload Agent',
      'Commission Tracking Agent',
      'EUIN Validation Agent',
      'ARN Mapping Automation Agent',
      'Reporting & Reconciliation Agent',
      'Trade Error Detection Agent',
      'Insurance Policy Processing Agent',
      'IAP Reporting & Workflow Agent',
    ],
  },
  {
    id: 'documents',
    label: 'Documents & KYC',
    items: [
      'Document & KYC verification agent',
      'Document & KYC verification agent',
      'IDP Agent',
      'AI Document Agent — targeted enhancement',
      'AI Document Agent (High Priority)',
      'AI Document Agent + Rule-based Pre-filter (Quick Win — gated on IT API accuracy confirmation)',
      'AI Document Agent (High Priority)',
      'Document Retrieval Automation (Incremental)',
      'Document Validation & Onboarding Assist Agent',
    ],
  },
  {
    id: 'rules',
    label: 'Rules & approvals',
    items: [
      'Rules-based Agent + HITL (Quick Win)',
      'Rule-based Validation (Automation)',
      'Compliance Automation — Rule-based Agent + Zoho (Strategic)',
      'Agentic AI with mandatory HITL (Strategic)',
      'Agentic AI + HITL (Strategic — after pre-validation is live)',
      'Rule-based Automation (Quick Win)',
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics & prediction',
    items: [
      'Analytics Agent (Strategic — evaluate CogniBot first)',
      'Predictive Analytics — Statistical Model (Strategic)',
      'Predictive Analytics + Automation (Strategic)',
      'Predictive Analytics (Strategic — CRITICAL GAP)',
      'Dashboard Automation — Data Integration (Quick Win)',
      'Analytics Agent (Strategic)',
    ],
  },
  {
    id: 'email',
    label: 'Email & drafting',
    items: [
      'Email Management Agent',
      'Email Agent',
      'AI Drafting Assistant + mandatory HITL (Incremental)',
      'AI Drafting Assistant + HITL (Incremental)',
    ],
  },
  {
    id: 'governance',
    label: 'Governance',
    items: ['IT Governance Framework (Strategic — foundational for all AI)'],
  },
]

export const motilalUseCaseTotal = motilalUseCases.reduce((n, t) => n + t.items.length, 0)
