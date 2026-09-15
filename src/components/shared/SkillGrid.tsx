import { skills } from "@/content/skills";

export function SkillGrid() {
  return (
    <dl className="space-y-5">
      {skills.map((group) => (
        <div key={group.label}>
          <dt className="text-[11px] tracking-[0.18em] text-muted uppercase">{group.label}</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <span key={skill} className="rounded border border-border bg-panel-raised px-2.5 py-1 text-sm">
                {skill}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
