import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getAllMaterials, getDatasetSummary } from "@/lib/data";
import { CapitalFlowExhibit } from "@/components/exhibits/capital-flow";
import { ResearchCover } from "@/components/editorial/research-cover";
import { FeaturedCase } from "@/components/home/featured-case";
import { HomeMarketPreview } from "@/components/home/home-market-preview";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { formatDateLongUS } from "@/lib/format";
import { getFinancingCase, getLegalControlCase, getTungstenCase } from "@/lib/homepage-cases";
import { journeys, site } from "@/lib/site";
import { datasetJsonLd, jsonLdScript, websiteJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  // `absolute`: the root layout's title template does not reach the page of its own segment.
  title: { absolute: `${site.name}: ${site.descriptor}` },
  description:
    "Stratellar documents export controls, public financing, and industrial projects in strategic materials, with licensed data, published research, and scoped advisory work.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name}: ${site.descriptor}`,
    description: "Strategic materials, traced to the source.",
  },
};

/** Recent publications other than the featured analysis, newest first. Categories are the two public ones. */
const featured = [
  {
    category: "Policy Research",
    date: "2026-11-09",
    title: "China Extends the Suspension of Six Export-Control Announcements Through January 10, 2027",
    href: "/research/china-export-control-suspension-extension",
  },
  {
    category: "Strategy & Finance",
    date: "2026-11-05",
    title: "Inside Tungsten West’s £71 Million Restart Financing",
    href: "/research/hemerdon-financing",
  },
  {
    category: "Strategy & Finance",
    date: "2026-11-04",
    title: "U.S. Antimony Supply Resilience, 2027–2031",
    href: "/research/antimony-supply-resilience",
  },
  {
    category: "Policy Research",
    date: "2026-11-03",
    title: "Tungsten Supply Security",
    href: "/research/tungsten-supply-security",
  },
] as const;

/**
 * The three capabilities, each with the same anatomy: what it is, what an organization can engage it for, and
 * where to go. Record counts are computed at build; no clients, prices, or license terms belong here.
 */
const capabilities = [
  {
    href: "/intelligence",
    name: "Intelligence",
    lead: "Clause-level records of who restricts what, who funds what, and what is being built.",
    engage:
      "License Controls, the dataset of export, import, investment, and production restrictions, for use inside a product or service under a written agreement. It arrives as a versioned snapshot with checksums, a data dictionary, and record IDs that join its four files. The public data is free under CC BY 4.0.",
    action: "Records and licensing",
  },
  {
    href: "/research",
    name: "Research",
    lead: "Published studies that test one decision against the documents.",
    engage:
      "Recent studies examine BHP’s $5.4–6.3 billion concentrator replacement at Escondida, the £71 million financing behind Tungsten West’s Hemerdon restart, and China’s suspension of six export-control announcements. Every study is free to read, with its sources and method.",
    action: "Research library",
  },
  {
    href: "/advisory",
    name: "Advisory",
    lead: "Founder-led research on one question your organization needs answered.",
    engage:
      "A brief might concern regulatory exposure in a supply chain, the public programs that could finance a project, a competitor’s financing, or the effect of a supply disruption. Each engagement is scoped individually.",
    action: "How engagements work",
  },
] as const;

/** One concrete line per record journey: what a reader finds there, in the record's own terms. */
const journeyNotes: Record<(typeof journeys)[number]["href"], string> = {
  "/events": "Export controls, laws, funding decisions, and official statements, with legal status by date.",
  "/capital": "Grants, loans, equity, and guarantees, each dated from announcement through contract to disbursement.",
  "/projects": "Mines, refineries, and plants, with their financing and reported milestones.",
  "/compare": "Governments side by side by instrument, material, and supply-chain stage.",
  "/sources": "The source register, methodology, coverage limits, and downloadable data.",
};

/** The analytical framework, in the order each study and record follows it. */
const framework = [
  ["Policy", "What a measure requires, and from which date."],
  ["Capital", "Who commits money, through which instrument."],
  ["Industrial execution", "Permits, construction, and output."],
  ["Commercial outcomes", "What changed for supply, cost, and access, with anticipated implications kept apart from observed results."],
] as const;

export default function Home() {
  const materials = getAllMaterials();
  const legal = getLegalControlCase();
  const financing = getFinancingCase();
  const tungsten = getTungstenCase();
  const summary = getDatasetSummary();

  return (
    <div data-flush-footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(datasetJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(websiteJsonLd()) }}
      />

      {/* Title block, centered on the light sheet. The opening photograph below belongs to the flagship. */}
      <Container width="wide" className="pb-12 pt-14 sm:pb-16 sm:pt-20 lg:pt-24">
        <div className="title-block settle mx-auto max-w-5xl">
          <p className="kicker">{site.descriptor}</p>
          <h1 className="display-1 mx-auto mt-5 max-w-[14em] text-foreground">
            Strategic materials, traced to the source.
          </h1>
          <p className="standfirst mx-auto mt-7 max-w-2xl">
            Stratellar documents how export controls, public financing, and industrial projects change the supply
            of critical minerals, and links every record to the document it came from.
          </p>
          <p className="mx-auto mt-4 max-w-2xl font-display text-base font-medium text-foreground">
            License the data, read the research, or commission a study.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/research" className="research-button">Read research</Link>
            <Link href="/explore" className="research-button-secondary">Explore the data</Link>
          </div>
          <p className="mt-5 flex flex-wrap justify-center gap-x-6 font-display text-sm">
            <Link href="/intelligence#licensing" className="link-quiet inline-flex min-h-11 items-center text-muted">
              License the Controls dataset
            </Link>
            <Link href="/advisory" className="link-quiet inline-flex min-h-11 items-center text-muted">
              Commission a study
            </Link>
          </p>
          <p className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-1 font-display text-sm text-muted">
            <span>
              Founded and led by <Link href="/about" className="link-quiet text-foreground">{site.founder}</Link>
            </span>
            <span>
              Last revised <time dateTime={site.revisedOn}>{formatDateLongUS(site.revisedOn)}</time>
            </span>
          </p>
        </div>
      </Container>

      {/* The three capabilities: what each is and what an organization can engage it for. */}
      <section aria-labelledby="capabilities-heading" className="bg-card">
        <Container width="wide" className="py-14 sm:py-20">
          <h2 id="capabilities-heading" className="display-2 mx-auto max-w-[18em] text-center text-foreground">What you can engage Stratellar for</h2>
          <ul className="m-0 mt-10 grid list-none gap-x-12 gap-y-12 p-0 md:grid-cols-3">
            {capabilities.map((c) => (
              <li key={c.href} className="flex min-w-0 flex-col border-t border-border-strong pt-5">
                <h3 className="display-3 text-foreground">{c.name}</h3>
                <p className="mt-3 font-editorial text-[1.3125rem] leading-[1.3] text-foreground">{c.lead}</p>
                {c.href === "/intelligence" ? (
                  <p className="tnum mt-3 font-display text-sm leading-6 text-accent">
                    {summary.controlMeasures} control clauses · {summary.events} policy actions ·{" "}
                    {summary.financialCommitments} financial commitments · {summary.projects} projects
                  </p>
                ) : null}
                <p className="mt-3 font-display text-[0.9375rem] leading-7 text-muted">{c.engage}</p>
                <p className="mt-auto pt-3 font-display text-sm">
                  <Link href={c.href} className="inline-flex min-h-11 items-center text-accent underline underline-offset-4">{c.action}</Link>
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FeaturedCase />

      {/* Latest publications other than the flagship. */}
      <section aria-labelledby="latest-heading" className="border-t border-border-strong">
        <Container width="wide" className="py-14 sm:py-20">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="latest-heading" className="font-display text-base font-semibold">Latest research</h2>
            <Link href="/research" className="font-display text-sm text-accent underline underline-offset-4">
              All research
            </Link>
          </div>
          <ScrollReveal kind="cards" className="mt-6">
            <ol className="m-0 grid list-none gap-x-10 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((item, i) => (
                <li
                  key={item.href}
                  data-motion-item
                  style={{ "--reveal-order": i } as React.CSSProperties}
                  className="flex min-w-0 flex-col border-t border-border-strong pt-4"
                >
                  <ResearchCover data-cover={item.href.split("/").pop()!} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw" className="mb-4" />
                  <p className="label">{item.category}</p>
                  <h3 className="mt-3 font-editorial text-[1.3125rem] leading-[1.22] text-balance text-foreground">
                    <Link href={item.href} className="hover:text-accent">{item.title}</Link>
                  </h3>
                  <p className="mt-auto pt-4 font-display text-xs text-faint">
                    <time dateTime={item.date}>{formatDateLongUS(item.date)}</time>
                  </p>
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </Container>
      </section>

      {/* Signature exhibit: one event's financing, drawn by what has been paid, promised or made conditional. */}
      <section aria-label="Capital-flow exhibit" className="border-t border-border-strong bg-card [--capflow-surface:var(--surface)]">
        <Container width="wide" className="py-14 sm:py-20">
          <CapitalFlowExhibit eventId="evt-us-dod-mp-2025" density="summary" />
        </Container>
      </section>

      {/* Market Monitor preview: the chart is the section. */}
      <section aria-label="Mineral price trends" className="border-t border-border-strong">
        <Container width="wide" className="py-14 sm:py-20">
          <ScrollReveal kind="chart"><HomeMarketPreview /></ScrollReveal>
        </Container>
      </section>

      {/* Entry to the record: the five journeys, the materials, and three records as examples. */}
      <section id="tools" aria-labelledby="tools-heading" className="border-t border-border-strong">
        <Container width="wide" className="py-14 sm:py-20">
          <div className="title-block max-w-2xl">
            <h2 id="tools-heading" className="display-2 text-foreground">Explore</h2>
            <p className="mt-4 font-display text-[0.9375rem] leading-7 text-muted">
              Every record links to the document it comes from. Amounts stay in their original currency.
            </p>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
            <nav aria-label="Database sections" className="min-w-0">
              <ul className="m-0 list-none divide-y divide-border border-y border-border-strong p-0">
                {journeys.map((journey) => (
                  <li key={journey.href}>
                    <Link
                      href={journey.href}
                      className="group grid gap-1 py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6"
                    >
                      <span className="font-editorial text-xl leading-7 text-foreground group-hover:text-accent">
                        {journey.label}
                      </span>
                      <span className="font-display text-sm leading-6 text-muted">{journeyNotes[journey.href]}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Materials in scope" className="min-w-0">
              <h3 className="border-b border-border-strong pb-3 font-display text-base font-semibold">
                <Link href="/materials" className="hover:text-accent">Materials</Link>
              </h3>
              <ul className="m-0 mt-4 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 font-display text-sm leading-6">
                {materials.map((m) => (
                  <li key={m.id}>
                    <Link href={`/materials/${m.slug}`} className="link-quiet text-muted">
                      {m.nameEn}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div id="examples" className="mt-14">
            <h3 className="font-display text-base font-semibold">Examples</h3>
            <ScrollReveal kind="cards" className="mt-5 grid gap-x-10 gap-y-8 md:grid-cols-3">
              {legal ? (
                <article
                  data-motion-item
                  style={{ "--reveal-order": 0 } as React.CSSProperties}
                  className="border-t border-border-strong pt-4"
                >
                  <p className="label">Legal controls</p>
                  <h4 className="mt-2 font-display text-[0.9375rem] font-medium leading-6">
                    <Link href={`/events/${legal.event.id}`} className="hover:text-accent">
                      {legal.event.titleEn}
                    </Link>
                  </h4>
                  <ul className="mt-3 flex list-none flex-wrap gap-x-5 gap-y-1 p-0 font-display text-sm text-muted">
                    <li>{legal.status.label}</li>
                    <li>
                      <time dateTime={legal.event.date}>{formatDateLongUS(legal.event.date)}</time>
                    </li>
                    <li>
                      <Link href={`/controls/${legal.control.id}`} className="link-quiet">View clause</Link>
                    </li>
                  </ul>
                </article>
              ) : null}
              {financing.length ? (
                <article
                  data-motion-item
                  style={{ "--reveal-order": 1 } as React.CSSProperties}
                  className="border-t border-border-strong pt-4"
                >
                  <p className="label">Public financing</p>
                  <h4 className="mt-2 font-display text-[0.9375rem] font-medium leading-6">
                    <Link href={`/capital/${financing[0].commitment.id}`} className="hover:text-accent">
                      {financing[0].provider}: {financing[0].instrument.toLowerCase()}
                    </Link>
                  </h4>
                  <ul className="mt-3 flex list-none flex-wrap gap-x-5 gap-y-1 p-0 font-display text-sm text-muted">
                    <li>{financing[0].status.label}</li>
                    <li className="tnum">
                      {financing[0].amount.currency} {financing[0].amount.value}
                    </li>
                  </ul>
                </article>
              ) : null}
              {tungsten.length ? (
                <article
                  data-motion-item
                  style={{ "--reveal-order": 2 } as React.CSSProperties}
                  className="border-t border-border-strong pt-4"
                >
                  <p className="label">Tungsten comparison</p>
                  <h4 className="mt-2 font-display text-[0.9375rem] font-medium leading-6">
                    <Link href={tungsten[0].href} className="hover:text-accent">{tungsten[0].title}</Link>
                  </h4>
                  <ul className="mt-3 flex list-none flex-wrap gap-x-5 gap-y-1 p-0 font-display text-sm text-muted">
                    <li>{tungsten[0].jurisdiction}</li>
                    <li>{tungsten[0].status}</li>
                    <li>
                      <Link href="/materials/tungsten" className="link-quiet">Tungsten profile</Link>
                    </li>
                  </ul>
                </article>
              ) : null}
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Method and contact, kept short: the full method lives on /methodology. */}
      <section aria-labelledby="method-heading" className="border-t border-border-strong bg-card">
        <Container width="wide" className="py-14 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] lg:gap-16">
            <div className="min-w-0">
              <h2 id="method-heading" className="display-3 text-foreground">Method and evidence</h2>
              <ol className="m-0 mt-6 grid list-none gap-x-8 gap-y-6 p-0 sm:grid-cols-2 xl:grid-cols-4">
                {framework.map(([name, note], i) => (
                  <li key={name} className="border-t border-border-strong pt-3">
                    <p className="font-display text-sm font-semibold">
                      <span aria-hidden className="tnum mr-2 text-accent">{i + 1}</span>
                      {name}
                    </p>
                    <p className="mt-1 font-display text-sm leading-6 text-muted">{note}</p>
                  </li>
                ))}
              </ol>
              <ul className="m-0 mt-6 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 font-display text-sm text-muted">
                <li><Link href="/methodology" className="link-quiet">Methodology</Link></li>
                <li><Link href="/coverage" className="link-quiet">Coverage</Link></li>
                <li><Link href="/data" className="link-quiet">Data and API</Link></li>
              </ul>
            </div>

            <div className="min-w-0 lg:border-l lg:border-border-strong lg:pl-12">
              <h2 className="display-3 text-foreground">Bring a question</h2>
              <p className="mt-4 font-display text-[0.9375rem] leading-7 text-muted">
                Every inquiry goes to the founder by email.
              </p>
              <p className="mt-5">
                <Link href="/contact" className="research-button-secondary">Contact Stratellar</Link>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
