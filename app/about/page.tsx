import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { CallBand } from "@/components/firm/call-band";
import { FirmHead } from "@/components/firm/firm-head";
import { getAllSources } from "@/lib/data";
import { formatDateLongUS } from "@/lib/format";
import { site } from "@/lib/site";
import { jsonLdScript, organizationJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Stratellar LLC is an independent strategic-materials intelligence and advisory firm, founded in 2026 and led by Benjamin Yang.",
  alternates: { canonical: "/about" },
};

/** The three capabilities, in the order the header lists them. */
const capabilities = [
  {
    href: "/intelligence",
    label: "Intelligence",
    note: "Source-linked records of control clauses, policy actions, financial commitments, and industrial projects. Free to use under CC BY 4.0; Controls is also available under a commercial license.",
  },
  { href: "/research", label: "Research", note: "Published studies, free to read, each with its sources and method." },
  { href: "/advisory", label: "Advisory", note: "Scoped research for one decision, led by the founder and accepted selectively." },
] as const;

/** The four questions every record and study follows. */
const framework = [
  { step: "Policy", line: "What a government has decided, in what legal form, and whether it is in force." },
  { step: "Capital", line: "What money is committed, by whom, on what terms, and at what status." },
  { step: "Industrial execution", line: "What is financed, permitted, built, and operating." },
  { step: "Commercial outcomes", line: "What changed for supply, cost, and access, with anticipated implications kept apart from observed results." },
] as const;

/** Where the evidence behind the research is kept. Each entry is an existing page at its existing URL. */
const evidence = [
  { href: "/methodology", label: "Methodology", note: "Definitions, counting rules, and what each status means." },
  { href: "/sources", label: "Sources", note: "The register of official documents, filings, and disclosures." },
  { href: "/coverage", label: "Coverage", note: "What the records include and where they stop." },
  { href: "/data", label: "Data and API", note: "Downloads in JSON and CSV, with the public endpoints." },
] as const;

export default function AboutPage() {
  const sourceCount = getAllSources().length;

  return (
    <div data-flush-footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd()) }} />

      <FirmHead
        kicker="About"
        title="An independent firm for strategic-materials decisions."
        standfirst={`${site.legalName} tracks how governments control, finance, and build strategic-material supply chains.`}
        aside={
          <dl className="fact-grid">
            <div>
              <dt>Company</dt>
              <dd>{site.legalName}</dd>
            </div>
            <div>
              <dt>Founded</dt>
              <dd className="tnum">2026</dd>
            </div>
            <div className="col-span-full">
              <dt>Founder &amp; CEO</dt>
              <dd>{site.founder}</dd>
            </div>
          </dl>
        }
      />

      <section aria-labelledby="firm-heading" className="bg-background">
        <Container width="wide" className="py-14 sm:py-20">
          <h2 id="firm-heading" className="display-2 text-foreground">The firm</h2>
          <div className="mt-6 max-w-[38rem] space-y-6 font-display text-[1.0625rem] leading-8">
            <p>
              Export controls, public financing, and industrial projects now decide who can buy, process, and
              sell rare earths, tungsten, antimony, gallium, and copper. The facts sit in ministry
              announcements, loan agreements, securities filings, and company disclosures, published in
              different languages and on different dates.
            </p>
            <p>
              Stratellar reads those documents and connects them. Each record names the instrument, its legal
              status, its terms, and the source it came from. The firm publishes that work in three forms.
            </p>
          </div>
          <ul className="m-0 mt-10 grid list-none gap-x-10 border-t border-border-strong p-0 md:grid-cols-3">
            {capabilities.map((c) => (
              <li key={c.href} className="border-b border-border">
                <Link href={c.href} className="group block min-h-11 py-5">
                  <span className="display-3 block text-foreground group-hover:text-accent">{c.label}</span>
                  <span className="mt-1 block font-display text-sm leading-6 text-muted">{c.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="framework-heading" className="border-y border-border bg-malachite-tint">
        <Container width="wide" className="py-14 sm:py-20">
          <h2 id="framework-heading" className="display-2 text-foreground">Policy, capital, industrial execution, commercial outcomes</h2>
          <p className="mt-4 max-w-xl font-display text-[1.0625rem] leading-8 text-foreground">
            Every record and study follows the same four questions.
          </p>
          <ol className="m-0 mt-10 grid list-none gap-x-10 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {framework.map((f, i) => (
              <li key={f.step} className="border-t border-border-strong py-5">
                <p className="label tnum">{i + 1}</p>
                <h3 className="display-3 mt-2 text-foreground">{f.step}</h3>
                <p className="mt-2 font-display text-[0.9375rem] leading-7 text-muted">{f.line}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-2xl border-t border-border-strong pt-4 font-display text-sm leading-6 text-muted">
            Anticipated commercial implications are labeled as analysis. Observed outcomes are recorded only
            when a source reports them.
          </p>
        </Container>
      </section>

      <section aria-labelledby="independence-heading" className="border-y border-border bg-card">
        <Container width="wide" className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <p className="m-0">
            <span className="figure-xxl block">{sourceCount}</span>
            <span className="mt-3 block max-w-[16rem] font-display text-sm leading-6 text-muted">
              sources in the{" "}
              <Link href="/sources" className="link-quiet text-foreground">public register</Link>
            </span>
          </p>
          <div className="min-w-0">
            <h2 id="independence-heading" className="display-2 text-foreground">Founder-led and independent</h2>
            <div className="mt-6 max-w-[38rem] space-y-6 font-display text-[1.0625rem] leading-8">
              <p>
                {site.founder} founded Stratellar and leads it as Founder &amp; CEO. He maintains the records,
                leads the research, and conducts the advisory work personally.
              </p>
              <p>
                Stratellar is an independent company. No university, institution, or outside organization
                sponsors it or directs its research.
              </p>
              <p className="text-muted">
                The public record and the published studies carry their sources, method, and coverage limits.
                Government and company disclosures are attributed to their publishers,
                and reported progress is kept apart from independently verified outcomes.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="evidence-heading" className="bg-background">
        <Container width="wide" className="py-14 sm:py-20">
          <h2 id="evidence-heading" className="display-2 text-foreground">Evidence</h2>
          <ul className="m-0 mt-8 grid list-none gap-x-10 border-t border-border-strong p-0 sm:grid-cols-2">
            {evidence.map((e) => (
              <li key={e.href} className="border-b border-border">
                <Link href={e.href} className="group block min-h-11 py-5">
                  <span className="display-3 block text-foreground group-hover:text-accent">{e.label}</span>
                  <span className="mt-1 block font-display text-sm leading-6 text-muted">{e.note}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-display text-sm text-faint">
            Last revised <time dateTime={site.revisedOn}>{formatDateLongUS(site.revisedOn)}</time>.
          </p>
        </Container>
      </section>

      <CallBand
        id="contact-heading"
        kicker="Contact"
        title="Write to the founder"
        body={`License inquiries, advisory briefs, research questions, and corrections all reach ${site.founder} directly.`}
        kind="advisory"
        label="Email Stratellar"
      >
        <Link href="/contact" className="link-quiet inline-flex min-h-11 items-center">All contact routes</Link>
      </CallBand>
    </div>
  );
}
