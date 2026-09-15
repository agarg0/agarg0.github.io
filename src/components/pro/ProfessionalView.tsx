import Link from "next/link";
import { about } from "@/content/about";
import { contact } from "@/content/contact";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { strings } from "@/content/strings";
import { Markdown } from "@/components/shared/Markdown";
import { SkillGrid } from "@/components/shared/SkillGrid";
import { Timeline } from "@/components/shared/Timeline";

const bookshelf = about.find((panel) => panel.id === "bookshelf")!;
const setup = about.find((panel) => panel.id === "setup")!;

const primaryLink =
  "inline-flex items-center gap-2 rounded-md border border-border bg-panel px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-border-strong hover:bg-panel-raised focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function Section({ id, title, children, className = "" }: { id: string; title: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`mx-auto w-full max-w-3xl scroll-mt-20 px-4 py-14 ${className}`}>
      <h2 id={`${id}-heading`} tabIndex={-1} className="text-2xl font-semibold tracking-tight outline-none">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function LinkRow() {
  return (
    <div className="flex flex-wrap gap-3">
      <a href="/resume.pdf" target="_blank" rel="noreferrer" className={primaryLink}>
        Resume (PDF) ↗
      </a>
      <a href={contact.github} target="_blank" rel="noreferrer" className={primaryLink}>
        GitHub ↗
      </a>
      <a href={contact.linkedin} target="_blank" rel="noreferrer" className={primaryLink}>
        LinkedIn ↗
      </a>
      <a href={`mailto:${contact.email}`} className={primaryLink}>
        {contact.email}
      </a>
    </div>
  );
}

interface ProfessionalViewProps {
  onFlee?: () => void;
}

export function ProfessionalView({ onFlee }: ProfessionalViewProps) {
  return (
    <div className="font-body min-h-dvh bg-canvas text-fg">
      <header className="sticky top-0 z-10 border-b border-border bg-canvas/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-3">
          <a href="#top" className="text-sm font-semibold tracking-tight">
            {profile.name}
          </a>
          <nav aria-label="Sections" className="hidden gap-4 text-sm text-muted sm:flex">
            <a href="#projects" className="hover:text-fg">Projects</a>
            <a href="#resume" className="hover:text-fg">Resume</a>
            <a href="#about" className="hover:text-fg">About</a>
            <a href="#contact" className="hover:text-fg">Contact</a>
          </nav>
          {onFlee ? (
            <button
              type="button"
              onClick={onFlee}
              className="rounded-md border border-border px-3 py-1.5 text-sm text-muted transition-colors hover:border-border-strong hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              ← {strings.backToBattle}
            </button>
          ) : (
            <Link href="/" className="text-sm text-muted transition-colors hover:text-fg">
              ← {strings.backToBattle}
            </Link>
          )}
        </div>
      </header>

      <main id="top">
        <section className="mx-auto w-full max-w-3xl px-4 pt-16 pb-6">
          <h1 className="text-4xl font-semibold tracking-tight">{profile.name}</h1>
          <p className="mt-4 max-w-xl text-lg text-muted">{profile.tagline}</p>
          <div className="mt-8">
            <LinkRow />
          </div>
        </section>

        <Section id="projects" title="Projects">
          <ul className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <li key={project.id} id={`project-${project.id}`} className="rounded-lg border border-border bg-panel p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-medium">{project.title}</h3>
                  <span className="rounded border border-border px-1.5 py-0.5 text-[10px] tracking-wider text-muted">
                    {project.tag}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted">{project.summary}</p>
                <div className="mt-4 flex gap-4 text-sm">
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                      Source
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                      Live
                    </a>
                  )}
                </div>
                <details className="mt-4 text-sm">
                  <summary className="cursor-pointer text-muted hover:text-fg">Details</summary>
                  <Markdown className="mt-3">{project.body}</Markdown>
                </details>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="resume" title="Resume">
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className={primaryLink}>
            Download resume (PDF) ↗
          </a>
          <h3 className="mt-10 mb-4 text-lg font-medium">Experience</h3>
          <Timeline />
          <h3 className="mt-10 mb-4 text-lg font-medium">Skills</h3>
          <SkillGrid />
        </Section>

        <Section id="about" title="About">
          <Markdown>{profile.bio}</Markdown>
          <h3 className="mt-10 text-lg font-medium">{bookshelf.title}</h3>
          <Markdown className="mt-3">{bookshelf.body}</Markdown>
          <h3 className="mt-10 text-lg font-medium">{setup.title}</h3>
          <Markdown className="mt-3">{setup.body}</Markdown>
        </Section>

        <Section id="contact" title="Contact" className="min-h-[70dvh]">
          <p className="mb-6 max-w-xl text-muted">The fastest way to reach me is email. I read everything.</p>
          <LinkRow />
        </Section>
      </main>
    </div>
  );
}
