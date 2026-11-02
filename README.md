# SERAA Wealth Management Strategy

Internal, presentation-style strategy site for Covasant leadership. It is frontend-only: content and source
references live in typed local data files. There is no database, authentication or runtime AI call.

Stack: React 19, TypeScript, Vite 8, Tailwind CSS 4 (official `@tailwindcss/vite` plugin), React Router 7,
Lucide React. Diagrams are CSS and SVG icons. Inter is bundled locally (`@fontsource-variable/inter`), so the site
works offline.

## Commands

Requires Node 20.19+ or 22.12+.

```bash
npm install          # install from package-lock.json
npm run dev          # development server with hot reload (http://localhost:5173)
npm run typecheck    # TypeScript project check
npm run build        # typecheck + production build into dist/
npm run preview      # serve the production build locally (http://localhost:4173)
```

### Direct route loading

Routes are client-side (`BrowserRouter`). `npm run dev` and `npm run preview` already serve `index.html` for any
path, so `/decisions` and the other routes load directly. A static host would need the same fallback: rewrite every
non-file path to `/index.html`. Deployment is out of scope for now.

## Pages

Every page opens on an executive **Overview** chapter (the `overview` prop of `SectionedPage`), built to the standard of the Market chapter:
a conclusion headline, one sentence, one visual, the essential evidence and recommendation, and one or two evidence buttons. The left navigation reaches the supporting chapters.
Each overview answers what we recommend, why and what follows through a headline, one dominant native visual, two or three short reasons and a next-action line (about 100-200 visible words, counted without screen-reader-only text). Deeper material stays in the chapters and drawers.

Chapters: `SectionedPage` shows one chapter (section) at a time, in the order of its `sections` list and its children. The left rail, the small-screen
menu and the Previous/Next buttons (`ChapterPager`) change chapter with a short fade (`FADE_MS`, instant under `prefers-reduced-motion`). The chapter is held
in the URL hash, so deep links, reloads and in-page links such as `navigate({ hash: 'assessment' })` land on it. The closing band shows under the last
chapter only. There is no scroll-driven section tracking.

| Label | Route | Status |
|---|---|---|
| Opportunity | `/opportunity` | Complete (`/` redirects here) |
| Position | `/position` | Complete |
| Offerings | `/offerings` | Complete |
| Readiness | `/readiness` | Complete |
| Growth | `/growth` | Complete |
| Decisions | `/decisions` | Complete |

### Opportunity page: business case

Seven chapters (overview, market, demand, competition, partnerships, Covasant fit, commercial potential) in `src/pages/opportunity/`, each with
one conclusion, one dominant visual, a closing implication bar and supporting detail in a panel. Components are in `src/components/opportunity/`.

- Copy for all chapters is in `src/data/opportunity/case.ts`, built on the existing records (`market*.ts`, `demand.ts`, `competition.ts`,
  `partnerships.ts`, `data/shared/startingPoints.ts`). Counts are derived from `marketCompanies`. Five tags keep published findings, team-reported
  activity, proposed directions, commercial hypotheses and unresolved inputs apart (`CaseTagLabel`).
- Market: three proposed pursuit groups (`pursuitGroupOf`), the research-list counts shown only on the pursuit groups (with the not-market-size qualifier), and an account explorer
  (`AccountExplorer`) where missing account facts read "Not established". Account-specific facts live in `accountFacts`; everything else is a labelled hypothesis.
- No TAM, price, forecast, score or ranking appears anywhere. The commercial chapter is a contract model with no amounts.
- `EvidenceBody` (market evidence) is shared by `EvidenceDrawer` and `MarketSupport`.
### Decisions page

Copy lives in `src/data/decisions/` (page, decisions, roadmap, review, record, types). Sections are in `src/pages/decisions/`, components in
`src/components/decisions/` (`StatementLabel`, `StatusBadges`, `DecisionDetail`, `DecisionsExplorer`, `MilestoneDetail`, `MilestoneRoadmap`,
`ProposedOutputPreview`, `NextReviewPack`, `ReviewOutcomes`, `DecisionRegister`) with one editable diagram (the D4 pursuit flow) in `DecisionDetail`.

- Three statement types are always kept apart: What we know (blue), What we recommend (teal), Leadership decision needed (amber). Lilac marks execution.
- Every decision has `actualDecisionStatus: 'pending'` and `namedOwner: null`; every milestone has `progressStatus: 'not-assessed'` (not "not started").
  The types allow only those values. There is no approval control, workflow, backend or persisted state: selectors only inspect proposals.
- No budget, date, headcount, owner name, percentage or review date appears. Next-review documents are proposed outputs, not files.
- D4 reuses the `wealthFirm` image from `src/assets/wealth/index.ts`.
- Sources S40-S46 cover the decision research, governance references (NIST AI RMF is S23; Microsoft, UK Service Manual and FinOps are S42, S43, S40)
  and the earlier strategy syntheses. Governance references inform the decision structure only.

### Growth page

Copy lives in `src/data/growth/` (page, approach, sales, commercial, partnerships, ownership, scaling, types). Sections are in
`src/pages/growth/`, interactive pieces in `src/components/growth/` (`Disclosure`, `StatusChip`, tabs via `src/hooks/useTabs.ts`), and diagrams
built from `src/components/exec` (`PathwayDiagram`, `CommercialObjects`, `MeasureLenses`).

- Proposed directions use the six strategic statuses (Proposed, Proposed positioning, Priority hypothesis, Hypothesis, Leadership decision,
  Proposed decision rule). These are separate from the Readiness 0-3 scale and from technical maturity.
- Owner roles are proposed; no named person, headcount, price, margin, pipeline figure or deadline appears.
- Building images come from `src/assets/wealth/index.ts`, which aliases the existing buyer WebPs under the supplied names
  (wealth-firm, financial-group, private-bank, family-office). They already include their aqua motif; do not add a second circle.
- Sources S33-S40 were added for the Growth research, vendor pricing, marketplace routes and FinOps. External pricing and routes show available
  approaches only; they do not validate Covasant pricing or eligibility.

## Executive design system (`src/components/exec/`)

Tokens live in `styles/tokens.css` (`heading`, `hairline`, `hairline-soft`, `tint`, `tint-line`, `quiet`) and the type scale in `exec/styles.ts` (`exec.title`, `lede`, `h3`, `body`, `strong`, `meta`, `panel`, `link`).

| Component | Use |
|---|---|
| `ExecHeader` | Eyebrow, conclusion, one sentence, optional top-right link (h1 on an overview, h2 on a chapter) |
| `ExecPanel` | One flat block; `variant="tint"` is the single teal recommendation block |
| `EvidenceStrip` | Published by others / internal / still to prove, each with an `EvidenceLabel` |
| `FlowRow`, `FlowNode` | Editable sequence or composition diagrams (live text and CSS, not pictures) |
| `GlyphTile` | Tinted tile with one outline icon, where a section needs an anchor but a picture adds nothing |
| `PhotoFrame`, `familyPhoto` | Supplied photographs (`assets/market`) at a fixed ratio; scene-setting, no claim |
| `DrawerLink`, `ChapterLink` | Text links that open a drawer or move chapter |
| `NextAction` (`components/overview/parts.tsx`) | The closing bar on every overview: one next-action line with up to two evidence buttons |

Overviews: `pages/opportunity/OverviewSection.tsx`, `pages/position/OverviewSection.tsx`, `pages/offerings/OverviewSection.tsx`,
`pages/readiness/ReadinessOverview.tsx`, `pages/growth/OverviewSection.tsx`, `pages/decisions/DecisionsOverview.tsx`. In Readiness and Decisions the
former `overview` chapter is now labelled Dimensions and How to read.

Media rules: no clip-art scenes. Use a supplied photograph, a `FlowRow` diagram or a `GlyphTile`. Charts appear only where sourced numbers
support them (the Capgemini figures on Opportunity). The Readiness strip shades each requirement by its provisional rating and never counts, averages or scores.
The only remaining illustrations are the supplied building images inside the Market ICP drawer.

## Project structure

```
src/
  main.tsx, App.tsx          Entry point and routes
  index.css                  Tailwind import, base styles, drawer animation, reduced-motion rules
  styles/tokens.css          Design tokens (colours, fonts, radii) as a Tailwind @theme, plus sticky-chrome heights
  layouts/                   AppLayout (header, main, footer, scroll/focus on navigation), Container
  context/SourcesContext     One shared source drawer that any SourceReference can open
  components/
    navigation/              TopNav (navy header, teal active pill, Sources button, mobile menu), SectionRail (numbered left rail,
                             xl and up), SectionDropdown ("On this page" menu, sticky under the header below xl)
    ui/                      SectionedPage, ChapterPager and PageClosing (shared page frame, chapter buttons and closing strip), actionClass (button styles),
                             Section (full-width coloured band), SectionHeading, Conclusion, EvidenceLabel,
                             SourceReference (readable chips), SourceEntry/SourceList, SourcesDrawer, DetailDrawer, PageHeader
    diagrams/                readiness/ (AssessmentExplorer, useExplorer, RatingBadge, ProofStandards), PortfolioOverview (2x2 families with a single-select business-function filter), SystemFitDiagram (tabbed delivery-approach architecture), CompetitorLandscape, EcosystemDiagram, InitiativePanel, WorkflowIllustration,
                             QualificationDiagram, RevenueModel, ShareBar, ResearchConclusion
    exec/                    Executive design system: ExecHeader, ExecPanel, EvidenceStrip, FlowRow/FlowNode, GlyphTile, PhotoFrame, links, styles.ts
  assets/logos/              Provider logo files (see "Logos" below)
  assets/buyers/             Building illustrations for the four buyer groups (background removed, WebP)
  styles/                    tokens.css (design tokens), tones.ts (colour grouping classes)
  data/
    types.ts                 Shared types (SourceId, EvidenceKind, ...)
    sources.ts               All source definitions (S01-S14, I01-I02)
    evidence.ts              Evidence label names and the snapshot date
    navigation.ts            The six pages
    opportunity/             One content file per Opportunity section plus opening and closing
    offerings/               Offerings content: page (page summary, assessment drawer), families (the four families,
                             business functions, candidate packages and their statuses), development
    readiness/               Readiness content: ratings (the scale), requirements (all 28, provisional and dated),
                             dimensions, proof, page. Ratings are never averaged or scored
    position/                Position content: page (page summary, research drawer), direction, customers, offer,
                             systemFit, reasons, commitments. Items share the ContentItem shape in types.ts
  hooks/                     useDrawer (drawer state + trigger), useTabs, useMediaQuery
  pages/
    OpportunityPage.tsx      Opening, section nav, the six sections, closing assessment
    opportunity/             One component per section (composition only; text comes from data/)
    ReadinessPage.tsx        six dimension tiles, evidence explorer, proof standards, critical requirements, actions
    readiness/               One component per Readiness section
    OfferingsPage.tsx        portfolio overview, four family sections, development, closing, assessment drawer
    offerings/               PortfolioSection, FamilySection (one component for all four families), DevelopmentSection
    PositionPage.tsx         the six Position sections, closing statement, research drawer
    position/                One component per Position section, plus PositionClosing
    PlaceholderPage.tsx      Shared stand-in for pages still to be written
```

## Imagery

The four buyer-group building illustrations were supplied as design references. The buildings
were supplied as screenshots with a dark or checkered background; the background was removed and the files converted to
WebP. Replace the files in `src/assets/buyers/` (same names) to change them.

## Logos

Provider logos in `src/assets/logos/` are the providers' own published files, displayed unaltered: WealthSpectrum
(wealthspectrum.com), Intellect (intellectdesign.com), Salesforce (a.sfdcstatic.com), TIFIN (tifin.com) and Accenture
(Wikimedia Commons copy of the Accenture logo). Logos with white or cream artwork sit on a navy well
(`onDark` in `src/assets/logos/index.ts`). CogniCor is shown as a plain text wordmark because no logo file could be
retrieved. Check each owner's brand guidelines before using the site outside internal review.

## Readiness assessment rules

- The scale is 0 Gap, 1 Emerging, 2 Demonstrated, 3 Repeatable, plus ? Unverified (`src/data/readiness/ratings.ts`).
  Unverified is not zero. Ratings are never averaged, weighted or summed, and no dimension or overall score exists.
- Requirement rows live in `src/data/readiness/requirements.ts`. Do not raise a rating without reviewed evidence.
  Owner roles are proposed (`namedOwner` stays `null`) and `decisionRelevance` stays `unassessed`.
- Sources can carry a `sourceType` (internal product description, internal discovery transcript, company-published claim,
  external corroboration, assessment benchmark). One source can support several rows without being independent proof.

## Content and evidence rules

- **Edit wording** in `src/data/opportunity/*.ts`. Components contain layout, not copy (apart from small labels).
- **Sources** are defined once in `src/data/sources.ts`. Claims reference IDs (`['S03']`); the page shows readable labels
  (`sourceShortLabel`, e.g. "Capgemini 2026") and URLs are never repeated in components. Only sources with a public website URL are listed; documents without one are not cited.
  Only public websites are linked; never link a chat or AI-tool library.
- **Evidence labels** (`EvidenceLabel`): Public research, Vendor-published capability, Internal discovery, POC,
  Proposed direction, To validate. Keep research, internal description and recommendation distinct.
- The research snapshot is dated **28 October 2026** (`SNAPSHOT_DATE`) and is presented as static, not live data.
- Do not add readiness scores, competitor ratings, revenue forecasts, customer commitments, product claims or
  invented screenshots. Use labelled schematics instead (`WorkflowIllustration`).
- Default visible copy is kept short (about 650 words on the Opportunity page, excluding names and source labels).
  Longer research belongs in drawers and expandable areas.

## Adding a future page

1. Build the page component in `src/pages/` (for example `PositionPage.tsx`), with its sections in `src/pages/position/`
   and its copy in `src/data/position/`.
2. In `src/data/navigation.ts`, set that entry's `status` to `'built'`.
3. In `src/App.tsx`, add `<Route path="/position" element={<PositionPage />} />`. Placeholder routes are generated from
   entries whose status is `'placeholder'`, so a built page will not collide with its placeholder.
4. For in-page navigation, copy the pattern in `OpportunityPage.tsx`: a `SectionLink[]` and `SectionedPage`, whose children are one `Section`
   per chapter in the same order as the list. The chapter id in the URL hash selects the chapter.
5. Reuse `PageHeader`, `SectionHeading`, `Conclusion`, `EvidenceLabel`, `SourceReference` and `DetailDrawer`.

## Accessibility notes

- Drawers use a native modal `<dialog>`: Escape closes, the background is inert, focus is cycled inside and returns to
  the trigger, and the document does not scroll behind it.
- Status is always paired with a text label; no important content depends on hover.
- Animations are short CSS transitions and are disabled under `prefers-reduced-motion`.
- The skip link, landmark regions, `aria-current` on navigation, and `aria-pressed` / `aria-expanded` on selectors and
  disclosures are in place.
