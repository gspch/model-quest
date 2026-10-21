import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { LEGAL } from "../data/legal";
import { useLang } from "../lib/i18n";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/mentions-legales")({
  head: () =>
    seo({
      path: "/mentions-legales",
      title: "Mentions légales | model.quest",
      description:
        "Éditeur, hébergeur, données personnelles, stockage local, propriété intellectuelle et responsabilité du site model.quest.",
    }),
  component: LegalPage,
});

function LegalPage() {
  const { lang } = useLang();
  const doc = LEGAL[lang];
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
        <p className="font-mono text-sm text-primary">$ cat /legal</p>
        <h1 className="mt-2 text-3xl font-bold text-foreground">{doc.title}</h1>
        <p className="mt-2 text-muted-foreground">{doc.intro}</p>
        <p className="mt-2 font-mono text-xs text-muted-foreground">{doc.updated}</p>
        <nav aria-label={doc.title} className="mt-6 flex flex-wrap gap-2">
          {doc.sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-md border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
            >
              {s.title.replace(/^\d+\.\s*/, "")}
            </a>
          ))}
        </nav>
        <div className="mt-8 space-y-6">
          {doc.sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              className="scroll-mt-20 rounded-xl border border-border bg-card p-5"
            >
              <h2 className="font-mono text-sm font-semibold text-primary">{s.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
