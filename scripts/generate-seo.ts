// Génère public/llms.txt et public/sitemap.xml à partir du catalogue.
// Usage : npm run seo
import { writeFileSync } from "node:fs";
import { MODELS, PROVIDERS, UPCOMING_MODELS, modelsOfProvider } from "../src/data/models";
import { DATA_VERIFIED_ON } from "../src/data/sources";

const SITE = "https://model-quest.vercel.app";
const pages = [
  { path: "", priority: "1.0" },
  { path: "/quiz", priority: "0.9" },
  { path: "/simulateur", priority: "0.9" },
  { path: "/parcours", priority: "0.8" },
  { path: "/guide", priority: "0.9" },
  { path: "/scores", priority: "0.5" },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) =>
      `  <url><loc>${SITE}${p.path}</loc><lastmod>${DATA_VERIFIED_ON}</lastmod><priority>${p.priority}</priority></url>`,
  )
  .join("\n")}
</urlset>
`;

const llms = `# model.quest

> Jeu interactif bilingue (FR/EN) pour apprendre à choisir le fournisseur, le modèle et l'effort de raisonnement d'une IA. ${PROVIDERS.length} fournisseurs, ${MODELS.length} modèles, prix indicatifs vérifiés le ${DATA_VERIFIED_ON}.

## Pages

- [Quiz](${SITE}/quiz): 8 scénarios, score maximum 64.
- [Simulateur](${SITE}/simulateur): coût mensuel, latence et qualité selon le modèle, l'effort et le volume de tokens.
- [Parcours](${SITE}/parcours): 4 niveaux, de débutant à expert.
- [Guide](${SITE}/guide): fiches de référence par fournisseur et par modèle.
- [Classement](${SITE}/scores): meilleurs scores du quiz.
- [Code source](https://github.com/gspch/model-quest): MIT, TanStack Start, React 19.

## Catalogue

${PROVIDERS.map(
  (p) =>
    `- ${p.name}: ${modelsOfProvider(p.id)
      .map((m) => m.name)
      .join(", ")}`,
).join("\n")}

## À venir

${UPCOMING_MODELS.map((u) => `- ${u.name} : hors catalogue tant que les poids ne sont pas publiés.`).join("\n")}

## Notes

- Les prix sont indicatifs. Vérifier les pages tarifaires officielles de chaque fournisseur avant toute décision.
`;

writeFileSync("public/sitemap.xml", sitemap);
writeFileSync("public/llms.txt", llms);
console.log("public/sitemap.xml et public/llms.txt générés");
