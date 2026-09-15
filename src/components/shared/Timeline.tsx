import { timeline } from "@/content/timeline";

export function Timeline() {
  return (
    <ol className="space-y-6 border-l border-border pl-5">
      {timeline.map((entry) => (
        <li key={entry.id} className="relative">
          <span className="absolute -left-[25px] top-1.5 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          <div className="text-xs text-muted">
            {entry.start} — {entry.end}
          </div>
          <div className="mt-1 font-medium">
            {entry.role} · <span className="text-muted">{entry.org}</span>
          </div>
          <p className="mt-1 text-sm text-muted">{entry.summary}</p>
        </li>
      ))}
    </ol>
  );
}
