import { CONTACT, SITE } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="label">
          © {new Date().getFullYear()} · {CONTACT.footer}
        </p>
        <nav className="flex items-center gap-5">
          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            className="label transition-colors hover:text-ink"
          >
            GitHub
          </a>
          <span aria-hidden="true" className="text-muted">
            ·
          </span>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="label transition-colors hover:text-ink"
          >
            LinkedIn
          </a>
          <span aria-hidden="true" className="text-muted">
            ·
          </span>
          <a
            href={`mailto:${SITE.email}`}
            className="label transition-colors hover:text-ink"
          >
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
}
