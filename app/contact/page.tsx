import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FirmHead } from "@/components/firm/firm-head";
import { StrataBand } from "@/components/ui/brand";
import { InquiryLink } from "@/components/inquiry-link";
import { site } from "@/lib/site";
import { jsonLdScript, organizationJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Write to Stratellar about a commercial data license, an advisory brief, or a research question or correction.",
  alternates: { canonical: "/contact" },
};

/** The three email pathways. `kind` selects the subject line in `lib/site.ts`; the key spelling is fixed there. */
const pathways = [
  {
    kind: "licence",
    title: "License the data",
    note: "For an organization that needs a signed agreement covering its use of Stratellar records inside a product or service. Name the dataset you need, where it would be used, and who would sign. Controls is the first dataset available. Public use under CC BY 4.0 needs no agreement.",
    label: "Ask about a license",
    more: { href: "/intelligence#licensing", label: "Public and licensed use" },
  },
  {
    kind: "advisory",
    title: "Commission advisory work",
    note: "For a decision that turns on policy, public financing, or project execution in strategic materials. Describe the decision, the materials and jurisdictions involved, and when you need an answer. Each engagement is scoped individually and accepted selectively.",
    label: "Send a brief",
    more: { href: "/advisory", label: "How advisory work is scoped" },
  },
  {
    kind: "research",
    title: "Research and corrections",
    note: "Questions about a study or a record, a source worth reading, or an error. To report an error, name the record or page and send the source that shows it.",
    label: "Write about research",
    more: { href: "/methodology", label: "Methodology" },
  },
] as const;

export default function ContactPage() {
  return (
    <div data-flush-footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd()) }} />

      <FirmHead
        kicker="Contact"
        title="License data, commission research, or correct the record."
        standfirst={`Every message is read by the founder, ${site.founder}.`}
      />

      <Container width="wide" className="py-14 sm:py-20">
        <ol className="m-0 list-none divide-y divide-border border-y border-border-strong p-0">
          {pathways.map((p, i) => (
            <li key={p.kind} className="grid gap-5 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-12">
              <div className="min-w-0">
                <p aria-hidden className="tnum font-editorial text-2xl leading-none text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="display-2 mt-3 text-foreground">{p.title}</h2>
                <p className="mt-2 font-display text-sm">
                  <Link href={p.more.href} className="link-quiet inline-flex min-h-11 items-center text-muted">
                    {p.more.label}
                  </Link>
                </p>
              </div>
              <div className="min-w-0">
                <p className="max-w-xl font-display text-[1.0625rem] leading-8 text-foreground">{p.note}</p>
                <InquiryLink kind={p.kind} label={p.label} className="mt-5" primary={i === 0} />
              </div>
            </li>
          ))}
        </ol>
      </Container>

      <section className="on-seam"><StrataBand ground="seam" className="h-10 sm:h-14" /></section>
    </div>
  );
}
