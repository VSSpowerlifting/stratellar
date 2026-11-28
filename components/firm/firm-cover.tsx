import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { StrataBand } from "@/components/ui/brand";
import { cn } from "@/lib/utils";

/**
 * The Seam cover that opens a firm page: kicker, headline, standfirst, actions, and an optional aside (one
 * figure or a short fact list). The strata band closes the panel along its lower edge and never sits behind
 * text. Use it on the homepage, Intelligence and Advisory; workspaces and research pages keep their own heads.
 */
export function FirmCover({
  kicker,
  title,
  standfirst,
  actions,
  aside,
  children,
  headingId = "cover-heading",
}: {
  kicker: string;
  title: ReactNode;
  standfirst: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  /** Full-width content under the headline block, such as the framework strip. */
  children?: ReactNode;
  headingId?: string;
}) {
  return (
    <section aria-labelledby={headingId} className="on-seam overflow-hidden">
      <Container width="wide" className="pb-12 pt-14 sm:pb-16 sm:pt-20 lg:pt-24">
        <div className={cn("grid gap-10", aside && "lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-end lg:gap-16")}>
          <div className="settle min-w-0 max-w-4xl">
            <p className="kicker">{kicker}</p>
            <h1 id={headingId} className="cover-title mt-5 max-w-[16em]">{title}</h1>
            <p className="standfirst mt-7 max-w-2xl">{standfirst}</p>
            {actions ? <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-3">{actions}</div> : null}
          </div>
          {aside ? <div className="min-w-0">{aside}</div> : null}
        </div>
        {children}
      </Container>
      <StrataBand ground="seam" className="h-12 sm:h-16 lg:h-24" />
    </section>
  );
}
