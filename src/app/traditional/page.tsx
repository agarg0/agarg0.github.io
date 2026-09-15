import type { Metadata } from "next";
import Link from "next/link";
import { about } from "@/content/about";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { Markdown } from "@/components/shared/Markdown";
import { ContactSection } from "@/components/shared/ContactSection";
import { SkillGrid } from "@/components/shared/SkillGrid";
import { Timeline } from "@/components/shared/Timeline";

export const metadata: Metadata = {
  title: `${profile.name} — Portfolio`,
  description: profile.tagline,
};

const bookshelf = about.find((panel) => panel.id === "bookshelf")!;
const setup = about.find((panel) => panel.id === "setup")!;

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="mx-auto w-full max-w-3xl px-4 py-12">
      <h2 id={`${id}-heading`} className="text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function TraditionalPage() {
  return (
    <>
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-6">
        <Link href="/" className="text-sm text-muted transition-colors hover:text-fg">
          ← Battle version
        </Link>
        <nav aria-label="Sections" className="flex gap-4 text-sm text-muted">
          <a href="#projects" className="hover:text-fg">Projects</a>
          <a href="#experience" className="hover:text-fg">Resume</a>
          <a href="#about" className="hover:text-fg">About</a>
          <a href="#contact" className="hover:text-fg">Contact</a>
        </nav>
      </header>

      <main className="flex-1">
        <section className="mx-auto w-full max-w-3xl px-4 pt-16 pb-8">
          <h1 className="text-4xl font-semibold tracking-tight">{profile.name}</h1>
          <p className="mt-4 max-w-xl text-lg text-muted">{profile.tagline}</p>
        </section>

        <Section id="projects" title="Projects">
          <ul className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <li key={project.id} className="rounded-lg border border-border bg-panel p-5">
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
              </li>
            ))}
          </ul>
        </Section>

        <Section id="experience" title="Experience">
          <p className="mb-6 text-sm">
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="underline underline-offset-4">
              Download resume (PDF)
            </a>
          </p>
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

        <ContactSection />
      </main>
    </>
  );
}
