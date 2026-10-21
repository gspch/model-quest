export const SITE_URL = "https://model-quest.vercel.app";
export const SITE_NAME = "model.quest";
export const OG_IMAGE = `${SITE_URL}/og.png`;
export const OG_ALT = "model.quest : quiz, simulateur et guide pour choisir un modèle d'IA";

interface SeoInput {
  path: string;
  title: string;
  description: string;
  ogTitle?: string;
}

// Balises communes : canonical, Open Graph, Twitter, image de partage.
export function seo({ path, title, description, ogTitle }: SeoInput) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: ogTitle ?? title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:locale:alternate", content: "en_US" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: OG_ALT },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: ogTitle ?? title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:image:alt", content: OG_ALT },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

// Données structurées (GEO) : permet aux moteurs et aux assistants IA d'identifier le site.
export const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: ["fr", "en"],
      description:
        "Jeu interactif pour apprendre à choisir le fournisseur, le modèle et l'effort de raisonnement d'une IA.",
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#app`,
      name: SITE_NAME,
      url: SITE_URL,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      inLanguage: ["fr", "en"],
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "Quiz de 8 scénarios",
        "Simulateur de coût, de latence et de qualité",
        "Parcours en 4 niveaux",
        "Guide de 8 fournisseurs et 23 modèles",
        "Classement en ligne",
      ],
    },
  ],
};
