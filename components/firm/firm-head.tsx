import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { StrataBand } from "@/components/ui/brand";
import { cn } from "@/lib/utils";

/** The light head for About and Contact: the same anatomy as the cover, on the sheet, with a low plaster band. */
export function FirmHead({
  kicker,
  title,
  standfirst,
  actions,
  aside,
}: {
  kicker: string;
  title: ReactNode;
  standfirst: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="firm-head border-b border-border-strong bg-card">
      <Container width="wide" className="pb-12 pt-14 sm:pb-16 sm:pt-20 lg:pt-24">
        <div className={cn("grid gap-10", aside && "lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end lg:gap-16")}>
          <div className="settle min-w-0">
            <p className="kicker">{kicker}</p>
            <h1 className="cover-title mt-4 max-w-[16em] text-foreground">{title}</h1>
            <p className="standfirst mt-6 max-w-2xl">{standfirst}</p>
            {actions ? <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div> : null}
          </div>
          {aside ? <div className="min-w-0 lg:border-l lg:border-border-strong lg:pl-12">{aside}</div> : null}
        </div>
      </Container>
      <StrataBand ground="plaster" className="h-10 sm:h-14" />
    </header>
  );
}
