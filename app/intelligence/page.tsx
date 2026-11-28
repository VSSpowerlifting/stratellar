import type { Metadata } from "next";
import Link from "next/link";
import { CallBand } from "@/components/firm/call-band";
import { FirmCover } from "@/components/firm/firm-cover";
import { InquiryLink } from "@/components/inquiry-link";
import { Container } from "@/components/ui/container";
import { getAllJurisdictions, getDatasetSummary } from "@/lib/data";
import { formatDateLongUS } from "@/lib/format";
import { jurisdictionLabels } from "@/lib/labels";
import { buildPublishedControlsSnapshotBundle } from "@/lib/published-controls-download";

export const metadata: Metadata = {
  title: "Intelligence",
  description:
    "Source-linked records of strategic-materials export controls, policy actions, public financing, and industrial projects. Free under CC BY 4.0, with Controls available under a separate commercial license.",
  alternates: { canonical: "/intelligence" },
};

const DOWNLOAD_HREF = "/api/export/controls-snapshot.zip";

/**
 * Worked results quoted from the "Worked result" section of docs/engineering/controls-snapshot/README.md,
 * the README shipped inside the pinned download. They hold for the release named in `release` only. When a
 * new release is admitted, this constant changes with it; the section is withheld while the two differ.
 */
const WORKED_EXAMPLES = {
  release: "2026-11-12",
  items: [
    {
      question:
        "Which Chinese graphite controls applied to a U.S. destination on November 8, 2025, and on the day after?",
      figure: "2 → 1",
      answer:
        "Two clauses under two instruments on November 8. One on November 9, after MOFCOM No. 72 of 2025 suspended item 2 of No. 46 of 2024. The 2023 export licensing clause stayed in force on both dates.",
    },
    {
      question: "How many export restrictions first took effect between January 1, 2025, and November 12, 2026?",
      figure: "8",
      answer:
        "Eight clauses under four instruments, each supported by explicit status evidence from an official primary source. Suspensions, continuations, and resumptions are status changes to existing clauses and leave the count at eight.",
    },
    {
      question: "What happens to the suspended graphite anode licensing after January 10, 2027?",
      figure: "Jan 10, 2027",
      answer:
        "Announcement No. 58 of 2026 continues the suspension through that date. After it, the records leave the status unresolved until a dated source says otherwise.",
    },
  ],
} as const;

/** Public and licensed use, compared like with like. Each row: the term, the public position, the licensed one. */
const USE_TERMS = [
  ["Basis", "CC BY 4.0, a standard public license", "A written agreement between your organization and Stratellar LLC"],
  ["Who it covers", "Anyone", "The named organization"],
  ["Commercial reuse", "Permitted", "Permitted, with the uses inside your product or service set down in writing"],
  ["Attribution", "As CC BY 4.0 requires", "In the form set down in the agreement"],
  ["Term", "As CC BY 4.0 provides", "Stated in the agreement"],
  ["Updates", "New snapshots as issued, on no fixed schedule", "As stated in the agreement"],
  ["Warranty", "None; provided as-is", "As stated in the agreement"],
  ["What you receive", "The public snapshot", "The data named in the agreement; today, the Controls snapshot"],
  ["Paperwork", "None", "A signed agreement your counsel and procurement team can file"],
] as const;

const SNAPSHOT_CONTENTS = [
  "Four JSON datasets joined on record IDs: control clauses, policy actions, status history, and cited sources",
  "A manifest with a SHA-256 checksum and a row count for each dataset",
  "A README with the data dictionary and the joins between datasets",
  "A worked Python import example that uses only the standard library and verifies checksums, keys, and joins before printing results",
] as const;

export default function IntelligencePage() {
  const summary = getDatasetSummary();
  // Every Controls figure comes from the pinned release the download serves, so the page states what the ZIP
  // contains even after the live record moves on.
  const { manifest, files } = buildPublishedControlsSnapshotBundle();
  const rows = (name: string) => manifest.datasets[name].rows;
  const asOf = formatDateLongUS(manifest.asOf);
  const clauseCount = rows("control-clauses.json");

  // Clauses in the release by issuing jurisdiction, largest first, and the in-scope jurisdictions with none.
  const releaseClauses = JSON.parse(
    files.find((file) => file.name === "control-clauses.json")?.content ?? "[]",
  ) as { issuer: string }[];
  const byIssuer = new Map<string, number>();
  for (const clause of releaseClauses) byIssuer.set(clause.issuer, (byIssuer.get(clause.issuer) ?? 0) + 1);
  const issuers = [...byIssuer.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const label = (code: string) => jurisdictionLabels[code as keyof typeof jurisdictionLabels] ?? code;
  const noClauses = getAllJurisdictions().map((j) => j.id).filter((id) => !byIssuer.has(id));

  const facts = [
    ["Control clauses", String(clauseCount)],
    ["Policy actions", String(rows("policy-events.json"))],
    ["Status entries", String(rows("control-status-history.json"))],
    ["Cited sources", String(rows("sources.json"))],
    ["Legal status as of", asOf],
  ] as const;

  /** Each row: the framework layer, the record kept for it, and what the record holds. */
  const records = [
    {
      layer: "Policy",
      href: "/events",
      name: "Policy actions",
      note: `${summary.events} laws, regulations, funding decisions, and official statements.`,
    },
    {
      layer: "Capital",
      href: "/capital",
      name: "Financing",
      note: `${summary.financialCommitments} financial commitments, with their programs and organizations.`,
    },
    {
      layer: "Industrial execution",
      href: "/projects",
      name: "Industrial projects",
      note: `${summary.projects} projects, with reported milestones and linked financing.`,
    },
  ] as const;

  const showWorkedExamples = WORKED_EXAMPLES.release === manifest.asOf;

  return (
    <div data-flush-footer>
      <FirmCover
        kicker="Intelligence"
        title="Which export controls were in force on the day a shipment left port?"
        standfirst="Each clause records its issuer, the materials and destinations the source names, and a dated status history, each tied to the source document behind it. The records are public under CC BY 4.0. A commercial license puts the Controls data under a signed agreement with Stratellar LLC, for organizations whose counsel requires one."
        actions={
          <>
            <a href={DOWNLOAD_HREF} className="research-button">Download the public snapshot</a>
            <a href="#licensing" className="research-button-secondary">Compare public and licensed use</a>
          </>
        }
        aside={
          <div className="seam-rule pt-6">
            <p className="figure-xxl">{clauseCount}</p>
            <p className="seam-quiet mt-4 max-w-xs font-display text-sm leading-6">
              control clauses, legal status recorded through {asOf}
            </p>
          </div>
        }
      />

      {showWorkedExamples ? (
        <section aria-labelledby="questions-heading" className="bg-background">
          <Container width="wide" className="py-14 sm:py-20">
            <h2 id="questions-heading" className="display-2 max-w-[20em]">Three questions the dataset answers</h2>
            <p className="kicker mt-3">
              Worked examples from the snapshot&rsquo;s README, legal status through {asOf}.
            </p>
            <div className="mt-10 grid border-t border-border-strong lg:grid-cols-3">
              {WORKED_EXAMPLES.items.map((item, i) => (
                <article
                  key={item.figure}
                  className={
                    "min-w-0 border-b border-border py-8 lg:border-b-0 lg:py-10 " +
                    (i === 0 ? "lg:pr-10" : "lg:border-l lg:border-border lg:px-10")
                  }
                >
                  <h3 className="display-3">{item.question}</h3>
                  <p className="article-figure tnum mt-6 text-accent">{item.figure}</p>
                  <p className="mt-4 font-display text-[0.9375rem] leading-7 text-foreground">{item.answer}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 max-w-[44rem] font-display text-sm leading-6 text-muted">
              A match covers the items a clause specifies. Whether a particular shipment is caught still depends
              on the product and conditions in the source document, which every record links to.
            </p>
          </Container>
        </section>
      ) : null}

      <section id="controls" aria-labelledby="controls-heading" className="scroll-mt-24 border-t border-border bg-card">
        <Container width="wide" className="py-14 sm:py-20">
          <h2 id="controls-heading" className="display-2">What is in the snapshot</h2>
          <p className="standfirst mt-4 max-w-2xl">
            Every clause, policy event, status entry, and cited source in one versioned download. A team can
            verify that the files it received are the files that were published.
          </p>

          <dl className="fact-grid mt-10">
            {facts.map(([term, value]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd className="tnum">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
            <div className="min-w-0">
              <h3 className="label">Contents</h3>
              <ul className="mt-3 border-t border-border-strong font-display text-[0.9375rem] leading-7 text-foreground">
                {SNAPSHOT_CONTENTS.map((line) => (
                  <li key={line} className="border-b border-border py-3">{line}</li>
                ))}
              </ul>
            </div>
            <div className="min-w-0">
              <h3 className="label">Coverage</h3>
              <p className="tnum mt-3 border-t border-border-strong pt-3 font-display text-[0.9375rem] leading-7 text-foreground">
                Clauses by issuer: {issuers.map(([code, n]) => `${label(code)} ${n}`).join(", ")}.
                {noClauses.length > 0 ? ` None is recorded for ${noClauses.map(label).join(", ")}.` : null}
              </p>
              <p className="mt-3 font-display text-[0.9375rem] leading-7 text-foreground">
                Coverage is selective. A missing row cannot establish that a material or destination is
                unrestricted. Instruments issued after {asOf} are outside this snapshot.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3">
            <a href={DOWNLOAD_HREF} className="research-button">Download the public snapshot</a>
            <Link href="/controls" className="research-button-secondary">Open Controls</Link>
          </div>
          <p className="mt-5 flex flex-wrap gap-x-6 font-display text-sm text-muted">
            <Link href="/data" className="link-quiet inline-flex min-h-11 items-center">Data and API</Link>
            <Link href="/coverage" className="link-quiet inline-flex min-h-11 items-center">Coverage</Link>
            <Link href="/methodology" className="link-quiet inline-flex min-h-11 items-center">Methodology</Link>
          </p>
        </Container>
      </section>

      <section id="licensing" aria-labelledby="licensing-heading" className="scroll-mt-24 border-t border-border bg-background">
        <Container width="wide" className="py-14 sm:py-20">
          <h2 id="licensing-heading" className="display-2 max-w-[20em]">
            Public under CC BY 4.0, with a signed license for organizations that need one
          </h2>
          <p className="standfirst mt-4 max-w-3xl">
            The Controls snapshot is published under{" "}
            <a href="https://creativecommons.org/licenses/by/4.0/" className="link-quiet text-foreground">CC BY 4.0</a>.
            Anyone may download it, build on it, and sell products that include it, with attribution. For many
            uses, nothing more is needed. A commercial license exists for organizations whose counsel or
            procurement team requires a signed agreement with a named counterparty before third-party data goes
            into a product.
          </p>

          <div
            role="table"
            aria-label="Public use and licensed use compared"
            className="mt-10 border-t border-border-strong font-display text-[0.9375rem] leading-6"
          >
            <div role="row" className="hidden border-b border-border-strong sm:grid sm:grid-cols-[10rem_minmax(0,1fr)_minmax(0,1fr)]">
              <span role="columnheader" className="sr-only">Term</span>
              <span role="columnheader" className="col-start-2 px-4 py-3 font-medium text-foreground">Public use</span>
              <span role="columnheader" className="bg-malachite-tint px-4 py-3 font-medium text-foreground">Licensed use</span>
            </div>
            {USE_TERMS.map(([term, open, licensed]) => (
              <div key={term} role="row" className="grid border-b border-border sm:grid-cols-[10rem_minmax(0,1fr)_minmax(0,1fr)]">
                <span role="rowheader" className="pb-1 pt-4 text-sm font-medium text-foreground sm:py-4 sm:pr-4 sm:font-normal sm:text-muted">
                  {term}
                </span>
                <span role="cell" className="py-2 text-foreground sm:px-4 sm:py-4">
                  <span className="block text-xs leading-5 text-muted sm:hidden">Public use</span>
                  {open}
                </span>
                <span role="cell" className="mb-4 bg-malachite-tint px-3 py-2 text-foreground sm:mb-0 sm:px-4 sm:py-4">
                  <span className="block text-xs leading-5 text-muted sm:hidden">Licensed use</span>
                  {licensed}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 max-w-[44rem] space-y-4 font-display text-[0.9375rem] leading-7">
            <p className="text-foreground">
              A commercial license is agreed individually. It leaves the public terms exactly as
              they are, for you and for everyone else.
            </p>
            <p className="text-sm leading-6 text-muted">
              Price series on the <Link href="/markets" className="link-quiet text-foreground">Market Monitor</Link>{" "}
              are republished from the World Bank, the IMF, and USGS under each publisher&rsquo;s terms and are
              outside any Stratellar license. Quoted source text and photographs keep their own rights.
            </p>
          </div>
          <InquiryLink kind="licence" label="Request license terms" primary className="mt-8" />
        </Container>
      </section>

      <section id="records" aria-labelledby="records-heading" className="scroll-mt-24 border-t border-border bg-card">
        <Container width="wide" className="py-14 sm:py-20">
          <h2 id="records-heading" className="display-2">Also in the public record</h2>
          <ul className="m-0 mt-8 grid list-none gap-x-10 border-t border-border-strong p-0 md:grid-cols-3">
            {records.map((r) => (
              <li key={r.href} className="border-b border-border py-5 md:border-b-0">
                <p className="label">{r.layer}</p>
                <Link href={r.href} className="display-3 mt-2 inline-flex min-h-11 items-center hover:text-accent">
                  {r.name}
                </Link>
                <p className="tnum mt-1 font-display text-sm leading-6 text-muted">{r.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex flex-wrap gap-x-6 font-display text-sm text-muted">
            <Link href="/explore" className="link-quiet inline-flex min-h-11 items-center">Explore all records</Link>
            <Link href="/coverage" className="link-quiet inline-flex min-h-11 items-center">Coverage</Link>
            <Link href="/methodology" className="link-quiet inline-flex min-h-11 items-center">Methodology</Link>
            <Link href="/data" className="link-quiet inline-flex min-h-11 items-center">Data and API</Link>
          </p>
        </Container>
      </section>

      <CallBand
        id="license-inquiry"
        kicker="Licensing"
        title="Ask about a license"
        body="Send one email naming the dataset, the product or service it would go into, and how your users would see it."
        kind="licence"
        label="Request license terms"
      />
    </div>
  );
}
