import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { InquiryLink } from "@/components/inquiry-link";
import { StrataBand } from "@/components/ui/brand";
import type { contact } from "@/lib/site";

/**
 * The closing band of a firm page: one invitation, one email pathway, and optional small print. Pair it with `data-flush-footer` on the page wrapper so the band meets the footer.
 */
export function CallBand({
  id,
  kicker,
  title,
  body,
  kind,
  label,
  note,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  body: ReactNode;
  kind: keyof typeof contact.subjects;
  label: string;
  /** Small print under the button. */
  note?: ReactNode;
  /** Extra links beside the button. */
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="on-seam">
      <Container width="wide" className="grid gap-8 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
        <div className="min-w-0">
          <p className="kicker">{kicker}</p>
          <h2 id={id} className="display-2 mt-3 max-w-[18em]">{title}</h2>
          <p className="standfirst mt-4 max-w-xl">{body}</p>
        </div>
        <div className="min-w-0">
          <InquiryLink kind={kind} label={label} primary tone="seam" />
          {children ? <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-display text-sm">{children}</div> : null}
          {note ? <p className="seam-quiet mt-5 max-w-md font-display text-xs leading-5">{note}</p> : null}
        </div>
      </Container>
      <StrataBand ground="seam" className="h-10 sm:h-14" />
    </section>
  );
}
