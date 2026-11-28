import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { CallBand } from "@/components/firm/call-band";
import { FirmCover } from "@/components/firm/firm-cover";
import { InquiryLink } from "@/components/inquiry-link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Advisory",
  description:
    "Founder-led research engagements on strategic-materials regulation, public financing, competing projects, and supply disruption. Each one is scoped to a single decision and built from primary sources.",
  alternates: { canonical: "/advisory" },
};

/**
 * The four kinds of engagement. The questions show scope and the deliverables name formats; the page says so
 * once, above the list. The ids are stable anchors that other pages link to.
 */
const engagements = [
  {
    id: "regulatory",
    title: "Regulatory exposure",
    audience: "For manufacturers, procurement teams, and trade-compliance leads.",
    situation:
      "A licensing rule, export control, or suspension has changed, and you need to know which of your materials, suppliers, and shipments it reaches before the next purchase order or contract renewal.",
    questions: [
      "We buy magnets containing dysprosium and terbium from two suppliers in China. Which of the April 2025 rare-earth licensing requirements apply to our grades while the six October 2025 announcements are suspended through January 10, 2027?",
      "Our tungsten carbide powder ships from China to a plant in Germany. Which control clauses name it, what does each require of the exporter, and what status does each carry today?",
    ],
    approach:
      "Read the operative text in the original language, clause by clause. Map each clause to the materials, items, and destinations it names. Date every status. List the points your counsel needs to confirm.",
    deliverable:
      "Regulatory exposure brief: a clause-level table, a dated status timeline, and a list of open legal questions for counsel.",
  },
  {
    id: "capital",
    title: "Public capital",
    audience: "For mining, processing, and industrial companies and their strategy and finance teams.",
    situation:
      "A project needs government money, or a competitor has just received it. An announced figure can include amounts that are not yet committed, drawable, or repayable on the terms the headline suggests.",
    questions: [
      "We are developing a tungsten processing plant in the United Kingdom. Which public instruments have financed tungsten or comparable critical-mineral projects, on what disclosed terms, and what conditions did each funder state?",
      "A competitor announced a government-backed financing for a processing project. How much of the headline is committed, what conditions attach, and when does repayment begin?",
    ],
    approach:
      "Separate announcement, commitment, disbursement, and repayment from filings and agency records. Keep each instrument and currency apart. Attribute every term to the party that stated it.",
    deliverable:
      "Financing map and memorandum: the capital stack by instrument and status, key conditions and dates, and an editable model where the terms support one.",
  },
  {
    id: "competitive",
    title: "Projects and competitors",
    audience: "For corporate strategy functions, business development teams, and specialist consultancies.",
    situation:
      "You are weighing an investment, a partnership, or a market entry, and the answer depends on which announced projects will be producing material, at what stage, and with whose backing.",
    questions: [
      "Which rare-earth separation projects have recorded financing, permits, and construction milestones, and which rest on operator statements alone?",
      "How does government support for tungsten mining and processing compare across the EU, the United Kingdom, and Japan, by instrument and by what has been spent?",
    ],
    approach:
      "Build the landscape project by project from filings, permits, and agency awards. Mark what an operator reports apart from what a government or a filing confirms. Compare by supply-chain stage.",
    deliverable:
      "Competitive landscape: project profiles, a stage-by-stage comparison, and a watch list of dated milestones that would change the picture.",
  },
  {
    id: "disruption",
    title: "Supply disruption",
    audience: "For procurement, operations, and risk teams with a single-source material.",
    situation:
      "You depend on one supplier country for a material, and the board wants to know what an interruption would cost and what to do now.",
    questions: [
      "If our antimony trioxide supply stops for eight months, how much inventory covers the gap, what does holding it cost, and which alternative sources could qualify in time?",
      "Our gallium comes through one trader. Which restrictions sit upstream of that trader, and what is the earliest date a second origin could be under contract?",
    ],
    approach:
      "Start from the recorded controls and the sourced supply picture. Build scenarios with every assumption listed and kept apart from evidence. Test each option against cost, lead time, and qualification.",
    deliverable:
      "Scenario model and decision memorandum: an editable spreadsheet, the options with what each depends on, and a short briefing for executives.",
  },
] as const;

/** Published studies, one figure each, taken from the standfirsts on the research index. */
type Study = {
  href: string;
  title: string;
  figure: string;
  line: string;
  demonstrates?: (typeof engagements)[number];
};

const studies: readonly Study[] = [
  {
    href: "/research/china-export-control-suspension-extension",
    title: "China Extends the Suspension of Six Export-Control Announcements Through January 10, 2027",
    figure: "6",
    line: "export-control announcements suspended through January 10, 2027, while the April 2025 rare-earth licensing rules remain in force.",
    demonstrates: engagements[0],
  },
  {
    href: "/research/hemerdon-financing",
    title: "Inside Tungsten West’s £71 Million Restart Financing",
    figure: "£71m",
    line: "financing headline, of which £10 million is uncommitted borrowing.",
    demonstrates: engagements[1],
  },
  {
    href: "/research/escondida-copper",
    title: "Goldman Sachs’ Copper Outlook and BHP’s $6 Billion Escondida Decision",
    figure: "$5.4–6.3bn",
    line: "planned replacement concentrator, tested against the yearly benefit it must deliver.",
  },
  {
    href: "/research/tungsten-supply-security",
    title: "Tungsten Supply Security",
    figure: "4",
    line: "markets compared on tungsten export controls, financing, and industrial projects: China, the European Union, the United Kingdom, and Japan.",
    demonstrates: engagements[2],
  },
  {
    href: "/research/antimony-supply-resilience",
    title: "U.S. Antimony Supply Resilience, 2027–2031",
    figure: "8 months",
    line: "of interrupted antimony supply, modeled for a hypothetical defense manufacturer.",
    demonstrates: engagements[3],
  },
];

const steps = [
  ["Brief", "Email a few lines: the decision, the materials and jurisdictions, and your timing."],
  [
    "Scope",
    "You receive a proposed scope: the question, the sources, the deliverable, and the timetable. Briefs outside what Stratellar takes on are declined.",
  ],
  ["Agreement", "Terms are set in writing before work begins."],
  [
    "Delivery",
    "The analysis arrives with a source appendix, ready to hand to your counsel and advisers. Evidence, issuer statements, assumptions, and scenarios are labeled separately.",
  ],
] as const;

const partRow = "grid gap-1 border-t border-border py-4 first:border-t-0 first:pt-0 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-6";
const partBody = "m-0 font-display text-[0.9375rem] leading-7 text-foreground";

export default function AdvisoryPage() {
  return (
    <div data-flush-footer>
      <FirmCover
        kicker="Advisory"
        title="Research for one strategic-materials decision."
        standfirst="Stratellar takes on a small number of research engagements for companies with a decision that turns on strategic-materials policy, public financing, or a competitor’s project. Each one is scoped to a single question and delivered with every claim tied to the document behind it."
        actions={
          <>
            <InquiryLink kind="advisory" label="Send a brief" primary tone="seam" />
            <a href="#engagements" className="link-quiet inline-flex min-h-11 items-center font-display text-sm">
              See the four engagement types
            </a>
          </>
        }
      />

      <section id="engagements" aria-labelledby="engagements-heading" className="scroll-mt-24 bg-background">
        <Container width="wide" className="py-14 sm:py-20">
          <h2 id="engagements-heading" className="display-2 text-foreground">Four kinds of engagement</h2>
          <p className="mt-4 max-w-[40rem] font-display text-[0.9375rem] leading-7 text-muted">
            The questions below are illustrative, written to show scope. The deliverables are representative formats.
          </p>
          <div id="research-support" className="mt-8 max-w-[40rem] scroll-mt-24">
            <h3 className="font-display text-[0.9375rem] font-semibold text-foreground">
              Research support for consultancies
            </h3>
            <p className="mt-2 font-display text-[0.9375rem] leading-7 text-muted">
              A consultancy or intelligence platform can commission any of the four as research support for its own
              analysis, delivered under the same sourcing standard and scoped the same way.
            </p>
          </div>

          <div className="mt-10 border-b border-border-strong">
            {engagements.map((e, i) => (
              <article
                key={e.id}
                id={e.id}
                aria-labelledby={`${e.id}-heading`}
                className="grid scroll-mt-24 gap-6 border-t border-border-strong py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16 sm:py-12"
              >
                <div className="min-w-0">
                  <p aria-hidden className="tnum font-editorial text-2xl leading-none text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 id={`${e.id}-heading`} className="display-3 mt-3 text-foreground">{e.title}</h3>
                  <p className="mt-3 max-w-[26rem] font-display text-sm leading-6 text-muted">{e.audience}</p>
                </div>
                <dl className="m-0 min-w-0">
                  <div className={partRow}>
                    <dt className="label">Situation</dt>
                    <dd className={partBody}>{e.situation}</dd>
                  </div>
                  <div className={partRow}>
                    <dt className="label">Questions</dt>
                    <dd className="m-0">
                      <ul role="list" className="m-0 list-none space-y-3 p-0">
                        {e.questions.map((q) => (
                          <li key={q} className="font-editorial text-[1.0625rem] italic leading-7 text-foreground">
                            “{q}”
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div className={partRow}>
                    <dt className="label">Approach</dt>
                    <dd className={partBody}>{e.approach}</dd>
                  </div>
                  <div className={partRow}>
                    <dt className="label">Deliverable</dt>
                    <dd className={partBody}>{e.deliverable}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

        </Container>
      </section>

      <section id="studies" aria-labelledby="studies-heading" className="on-seam scroll-mt-24">
        <Container width="wide" className="py-14 sm:py-20">
          <p className="kicker">Published research</p>
          <h2 id="studies-heading" className="display-2 mt-3">Five published studies show the standard</h2>
          <p className="standfirst mt-4 max-w-2xl">
            Stratellar’s published studies are independent research, written from public sources and free to read.
            Each shows the standard of sourcing an engagement of that kind would carry.
          </p>

          <ul role="list" className="m-0 mt-10 list-none p-0">
            {studies.map((s) => (
              <li
                key={s.href}
                className="seam-rule grid gap-x-10 gap-y-3 py-7 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)_minmax(0,14rem)] lg:items-baseline"
              >
                <p className="article-figure tnum m-0 whitespace-nowrap">
                  {s.figure}
                </p>
                <div className="min-w-0">
                  <p className="seam-quiet m-0 max-w-[36rem] font-display text-[0.9375rem] leading-7">{s.line}</p>
                  <h3 className="mt-2 font-editorial text-xl leading-7">
                    <Link href={s.href} className="link-quiet inline-block py-1">{s.title}</Link>
                  </h3>
                </div>
                <p className="seam-quiet m-0 font-display text-sm leading-6 md:col-start-2 lg:col-start-3 lg:whitespace-nowrap">
                  {s.demonstrates ? (
                    <>
                      Shows{" "}
                      <a href={`#${s.demonstrates.id}`} className="link-quiet inline-block py-1">
                        {s.demonstrates.title.toLowerCase()}
                      </a>
                    </>
                  ) : (
                    "Shows how one investment case is tested"
                  )}
                </p>
              </li>
            ))}
          </ul>

          <p className="seam-rule m-0 pt-6 font-display text-sm">
            <Link href="/research" className="link-quiet inline-flex min-h-11 items-center">All research</Link>
          </p>
        </Container>
      </section>

      <section id="scoping" aria-labelledby="scoping-heading" className="scroll-mt-24 bg-card">
        <Container width="wide" className="py-14 sm:py-20">
          <h2 id="scoping-heading" className="display-2 text-foreground">From brief to delivery</h2>
          <p className="mt-4 max-w-[40rem] font-display text-[0.9375rem] leading-7 text-muted">
            Every engagement is carried out by the founder,{" "}
            <Link href="/about" className="link-quiet text-foreground">{site.founder}</Link>, who maintains the records
            and writes the published research.
          </p>
          <ol role="list" className="m-0 mt-10 grid list-none gap-x-8 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([name, text], i) => (
              <li key={name} className="border-t border-border-strong pt-4">
                <p className="m-0 flex items-baseline gap-3">
                  <span className="tnum font-editorial text-xl leading-none text-accent">
                    <span className="sr-only">Step </span>
                    {i + 1}
                  </span>
                  <span className="font-display text-[0.9375rem] font-semibold text-foreground">{name}</span>
                </p>
                <p className="mt-2 font-display text-sm leading-6 text-foreground">{text}</p>
              </li>
            ))}
          </ol>

          <p id="boundaries" className="mt-14 max-w-[40rem] scroll-mt-24 border-t border-border-strong pt-8 font-display text-[0.9375rem] leading-7 text-foreground">
            Stratellar provides research and analysis. Legal, investment, engineering, lobbying, and transaction
            advice stays with your licensed advisers. The{" "}
            <Link href="/methodology" className="link-quiet">methodology</Link> sets out how entries are sourced,
            translated, classified, and counted.
          </p>
        </Container>
      </section>

      <CallBand
        id="advisory-call"
        kicker="Advisory"
        title="What decision are you facing?"
        body="A short email is enough to begin."
        kind="advisory"
        label="Send a brief"
        note="Leave out anything confidential in a first message."
      >
        <Link href="/intelligence" className="link-quiet inline-flex min-h-11 items-center">
          Data licensing
        </Link>
      </CallBand>
    </div>
  );
}
