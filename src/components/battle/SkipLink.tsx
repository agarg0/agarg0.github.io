import Link from "next/link";
import { strings } from "@/content/strings";

export function SkipLink() {
  return (
    <Link
      href="/traditional"
      className="rounded border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-border-strong hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {strings.skipToSite} →
    </Link>
  );
}
