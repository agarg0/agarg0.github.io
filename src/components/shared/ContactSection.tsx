import { contact } from "@/content/contact";
import { profile } from "@/content/profile";

const linkClass =
  "inline-flex items-center gap-2 rounded border border-border px-4 py-2.5 text-sm text-fg transition-colors hover:border-border-strong hover:bg-panel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="mx-auto w-full max-w-3xl px-4 py-20">
      <h2 id="contact-heading" tabIndex={-1} className="text-2xl font-semibold tracking-tight outline-none">
        Contact
      </h2>
      <p className="mt-3 max-w-xl text-muted">
        The fastest way to reach {profile.name === "TRAINER" ? "me" : profile.name} is email. I read
        everything.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={`mailto:${contact.email}`} className={linkClass}>
          {contact.email}
        </a>
        <a href={contact.github} target="_blank" rel="noreferrer" className={linkClass}>
          GitHub ↗
        </a>
        <a href={contact.linkedin} target="_blank" rel="noreferrer" className={linkClass}>
          LinkedIn ↗
        </a>
      </div>
    </section>
  );
}
