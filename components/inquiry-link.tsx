import { cn } from "@/lib/utils";
import { contact, inquiryHref } from "@/lib/site";

/**
 * One email pathway: a `mailto:` link with the pathway's subject line, and the address printed beside it as
 * selectable text for a reader whose device has no mail client configured. There is no form behind it.
 */
export function InquiryLink({
  kind,
  label,
  primary = false,
  tone = "sheet",
  className,
}: {
  kind: keyof typeof contact.subjects;
  label: string;
  primary?: boolean;
  /** `seam` when the link sits on a Seam cover or call band, where the muted ink fails contrast. */
  tone?: "sheet" | "seam";
  className?: string;
}) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", className)}>
      <a href={inquiryHref(kind)} className={primary ? "research-button" : "research-button-secondary"}>
        {label}
      </a>
      <span className={cn("select-all font-mono text-[0.8125rem]", tone === "seam" ? "text-on-malachite" : "text-muted")}>{contact.email}</span>
    </p>
  );
}
