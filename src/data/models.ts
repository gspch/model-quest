// Données indicatives (oct. 2026) : les prix et capacités évoluent vite.
// Objectif pédagogique : ordres de grandeur, pas valeurs exactes.

export type Effort = "none" | "low" | "medium" | "high";
export type Tier = "fast" | "balanced" | "flagship";

export interface ProviderInfo {
  id: string;
  name: string;
  badge: string; // court label mono
  glyph: string; // monogramme façon logo (1-2 caractères)
  tagline: string;
  strengths: string[];
  weaknesses: string[];
  compliance: string;
  hue: string; // classe de couleur de badge
}

export interface ModelInfo {
  id: string;
  providerId: string;
  name: string;
  tier: Tier;
  priceIn: number; // $ / million tokens entrée (indicatif)
  priceOut: number; // $ / million tokens sortie
  latency: 1 | 2 | 3 | 4 | 5; // 1 = très rapide
  quality: 1 | 2 | 3 | 4 | 5; // 5 = meilleur raisonnement
  contextK: number; // fenêtre de contexte en K tokens
  capabilities: string[];
  efforts: Effort[];
  bestFor: string;
  simpleNote: string;
  techNote: string;
  promo?: { until: string; priceInAfter: number; priceOutAfter: number };
}

export const EFFORTS: Record<
  Effort,
  {
    label: string;
    costMultiplier: number;
    latencyAdd: number;
    qualityAdd: number;
    simple: string;
    tech: string;
  }
> = {
  none: {
    label: "Aucun",
    costMultiplier: 1,
    latencyAdd: 0,
    qualityAdd: 0,
    simple: "Réponse directe, instantanée. Parfait pour les tâches simples.",
    tech: "Pas de chaîne de raisonnement (réflexion interne du modèle avant de répondre) : latence minimale, coût de base.",
  },
  low: {
    label: "Faible",
    costMultiplier: 1.3,
    latencyAdd: 0.5,
    qualityAdd: 0.3,
    simple: "Le modèle « réfléchit » un peu avant de répondre.",
    tech: "Court budget de raisonnement : +30 % de tokens de sortie en moyenne.",
  },
  medium: {
    label: "Moyen",
    costMultiplier: 2,
    latencyAdd: 1.2,
    qualityAdd: 0.7,
    simple: "Bon compromis pour les problèmes à plusieurs étapes.",
    tech: "Raisonnement intermédiaire : environ 2× les tokens de sortie (morceaux de texte produits), latence sensiblement plus élevée.",
  },
  high: {
    label: "Élevé",
    costMultiplier: 4,
    latencyAdd: 2.5,
    qualityAdd: 1.2,
    simple:
      "Réflexion profonde : plus lent et plus cher, mais bien plus fiable sur les problèmes difficiles.",
    tech: "Budget de raisonnement maximal : jusqu’à 4× les tokens de sortie (morceaux de texte produits), plusieurs secondes de latence en plus.",
  },
};

export const PROVIDERS: ProviderInfo[] = [
  {
    id: "openai",
    glyph: "✦",
    name: "OpenAI",
    badge: "GPT",
    tagline: "Le généraliste historique, écosystème le plus mature.",
    strengths: [
      "Écosystème d'outils immense",
      "Excellent en code et agents",
      "Texte et image en entrée ; audio via modèles Realtime dédiés",
    ],
    weaknesses: ["Parmi les plus chers", "Données traitées hors UE par défaut"],
    compliance:
      "RGPD (règlement européen de protection des données) via contrat DPA ; résidence UE en option sur les offres entreprise.",
    hue: "text-neon",
  },
  {
    id: "google",
    glyph: "◈",
    name: "Google (Gemini)",
    badge: "GEM",
    tagline: "Le champion du contexte géant et du multimodal natif.",
    strengths: [
      "Fenêtres de contexte énormes (1M+ tokens)",
      "Vidéo et audio natifs",
      "Très bon rapport qualité/prix",
    ],
    weaknesses: [
      "Beaucoup de versions en parallèle, à bien choisir",
      "Interface parfois changeante",
    ],
    compliance: "RGPD via Google Cloud ; options de résidence européenne.",
    hue: "text-cyan-glow",
  },
  {
    id: "anthropic",
    glyph: "◆",
    name: "Anthropic (Claude)",
    badge: "CLD",
    tagline: "La référence pour le raisonnement prudent et la rédaction.",
    strengths: [
      "Excellent raisonnement long",
      "Très bon en rédaction et analyse",
      "Réputation de fiabilité",
    ],
    weaknesses: ["Réflexion obligatoire sur Fable et Opus", "Pas de génération d'images"],
    compliance: "RGPD via DPA ; pas d'entraînement sur les données clients.",
    hue: "text-amber-glow",
  },
  {
    id: "deepseek",
    glyph: "≋",
    name: "DeepSeek",
    badge: "DSK",
    tagline: "La puissance open weights à prix cassé.",
    strengths: [
      "Prix très bas",
      "Open weights (poids téléchargeables, auto-hébergement possible)",
      "Fort en maths et code",
    ],
    weaknesses: ["API hébergée en Chine", "Moins d'outils autour"],
    compliance:
      "Attention RGPD : API hébergée en Chine ; auto-héberger (faire tourner sur vos serveurs) pour la conformité.",
    hue: "text-neon",
  },
  {
    id: "mistral",
    glyph: "▲",
    name: "Mistral AI",
    badge: "MST",
    tagline: "Le choix souverain européen.",
    strengths: ["Hébergement en France/UE", "Modèles ouverts et efficaces", "Très rapides"],
    weaknesses: [
      "Moins puissant que les flagships US sur le raisonnement",
      "Écosystème plus petit",
    ],
    compliance: "Idéal conformité UE : hébergement européen, poids ouverts.",
    hue: "text-cyan-glow",
  },
  {
    id: "meta",
    glyph: "∞",
    name: "Meta (Llama)",
    badge: "LLM",
    tagline: "Open weights (poids téléchargeables) à héberger soi-même.",
    strengths: [
      "Gratuit (poids ouverts)",
      "Contrôle total en auto-hébergement",
      "Grande communauté",
    ],
    weaknesses: ["Nécessite votre infrastructure", "Un cran sous les flagships propriétaires"],
    compliance:
      "Auto-hébergement : contrôle des données, conformité à organiser (sécurité, contrats et infrastructure).",
    hue: "text-amber-glow",
  },
  {
    id: "alibaba",
    glyph: "云",
    name: "Alibaba (Qwen)",
    badge: "QWN",
    tagline: "L'open weights chinois très fort en code et multilingue.",
    strengths: [
      "Excellent en code",
      "Très bon multilingue (dont asiatiques)",
      "Poids ouverts sur plusieurs tailles",
    ],
    weaknesses: [
      "API Model Studio hébergée à Singapour",
      "Image de marque moins établie en Europe",
    ],
    compliance:
      "API Model Studio Singapour (tarifs USD) : transfert hors UE à encadrer. Qwen3.8 27B auto-hébergeable sous Apache 2.0.",
    hue: "text-neon",
  },
  {
    id: "cohere",
    glyph: "◍",
    name: "Cohere",
    badge: "COH",
    tagline: "Le spécialiste entreprise de la recherche et du RAG.",
    strengths: [
      "Excellent en RAG (recherche augmentée par vos documents)",
      "Déploiement privé possible",
      "Forte culture entreprise",
    ],
    weaknesses: ["Moins bon généraliste que les flagships", "Communauté plus petite"],
    compliance: "Déploiement sur votre cloud (VPC) possible : bonne option conformité.",
    hue: "text-cyan-glow",
  },
];

// Gemini 3.5 Flash-Lite low/medium/high : à confirmer sur la page modèle.
// Qwen3.8 Max none/medium/high : grille pédagogique simplifiée.
export const MODELS: ModelInfo[] = [
  {
    id: "gpt-6-astra",
    providerId: "openai",
    name: "GPT-6 Astra",
    tier: "flagship",
    priceIn: 10,
    priceOut: 50,
    latency: 3,
    quality: 5,
    contextK: 1050,
    capabilities: ["Texte", "Vision", "Outils", "Code"],
    efforts: ["none", "low", "medium", "high"],
    bestFor: "Problèmes complexes à fort enjeu.",
    simpleNote: "Un grand cerveau à réserver aux décisions où une erreur coûte cher.",
    techNote:
      "Texte et image en entrée, texte en sortie (128K maximum). Audio via GPT Realtime / GPT Audio dédiés. GPT-6 propose six efforts (temps de réflexion interne) : none, low, medium, high, xhigh, max ; les deux derniers sont regroupés dans high ici. Tarif majoré au-delà de 272K tokens d'entrée (morceaux de texte).",
  },
  {
    id: "gpt-6-sol",
    providerId: "openai",
    name: "GPT-6.1 Sol",
    tier: "balanced",
    priceIn: 2,
    priceOut: 10,
    latency: 2,
    quality: 4,
    contextK: 1050,
    capabilities: ["Texte", "Vision", "Outils", "Code"],
    efforts: ["none", "low", "medium", "high"],
    bestFor: "Code, agents (enchaînements d’actions autonomes) et jugement.",
    simpleNote: "Le compagnon polyvalent qui sait avancer sans choisir le plus cher.",
    techNote:
      "Texte et image en entrée, texte en sortie (128K maximum). Audio via GPT Realtime / GPT Audio dédiés. GPT-6 propose six efforts (temps de réflexion interne) : none, low, medium, high, xhigh, max ; les deux derniers sont regroupés dans high ici. Tarif majoré au-delà de 272K tokens d'entrée (morceaux de texte).",
  },
  {
    id: "gpt-6-luna",
    providerId: "openai",
    name: "GPT-6 Luna",
    tier: "fast",
    priceIn: 0.1,
    priceOut: 0.5,
    latency: 1,
    quality: 3,
    contextK: 1050,
    capabilities: ["Texte", "Vision", "Outils", "Code"],
    efforts: ["none", "low", "medium", "high"],
    bestFor: "Classification, extraction et résumés à grand volume.",
    simpleNote: "Le petit rapide : il tranche vite sur les tâches répétitives, à prix plancher.",
    techNote:
      "Texte et image en entrée, texte en sortie (128K maximum). Audio via GPT Realtime / GPT Audio dédiés. GPT-6 propose six efforts (temps de réflexion interne) : none, low, medium, high, xhigh, max ; les deux derniers sont regroupés dans high ici. Tarif majoré au-delà de 272K tokens d'entrée (morceaux de texte).",
  },
  {
    id: "gemini-4-argon",
    promo: { until: "2026-11-30", priceInAfter: 4, priceOutAfter: 20 },
    providerId: "google",
    name: "Gemini 4 Argon",
    tier: "flagship",
    priceIn: 2,
    priceOut: 10,
    latency: 3,
    quality: 5,
    contextK: 1048,
    capabilities: ["Texte", "Vision", "Audio", "Vidéo", "Outils", "Code"],
    efforts: ["low", "medium", "high"],
    bestFor: "Raisonnement haut de gamme, code et agents (actions autonomes).",
    simpleNote: "Il prend le temps de comprendre aussi bien vos documents que vos vidéos.",
    techNote:
      "Texte, image, audio, vidéo et PDF en entrée ; texte en sortie (65K maximum). Réflexion low/medium/high, sans none. Gemini est le seul à ingérer vidéo et audio nativement dans la gamme comparée ici. Tarif introductif jusqu’au 30 novembre 2026 ; 4/20 $ au 1er décembre 2026.",
  },
  {
    id: "gemini-3-8-flash",
    promo: { until: "2026-12-31", priceInAfter: 1.5, priceOutAfter: 7.5 },
    providerId: "google",
    name: "Gemini 3.8 Flash",
    tier: "balanced",
    priceIn: 0.75,
    priceOut: 3.75,
    latency: 2,
    quality: 4,
    contextK: 1048,
    capabilities: ["Texte", "Vision", "Audio", "Vidéo", "Outils", "Code"],
    efforts: ["low", "medium", "high"],
    bestFor: "Compromis vitesse, code et analyse multimodale (plusieurs médias).",
    simpleNote: "Il passe du texte aux vidéos sans trop vous faire attendre.",
    techNote:
      "Texte, image, audio, vidéo et PDF en entrée ; texte en sortie (65K maximum). Réflexion low/medium/high, sans none. Gemini est le seul à ingérer vidéo et audio nativement dans la gamme comparée ici. Tarif introductif jusqu’au 31 décembre 2026, doublé au 1er janvier 2027.",
  },
  {
    id: "gemini-3-5-flash-lite",
    providerId: "google",
    name: "Gemini 3.5 Flash-Lite",
    tier: "fast",
    priceIn: 0.3,
    priceOut: 2.5,
    latency: 1,
    quality: 3,
    contextK: 1048,
    capabilities: ["Texte", "Vision", "Audio", "Vidéo", "Outils", "Code"],
    efforts: ["low", "medium", "high"],
    bestFor: "Volume, tri et classification.",
    simpleNote: "Il fait le premier tri quand les demandes arrivent par milliers.",
    techNote:
      "Texte, image, audio, vidéo et PDF en entrée ; texte en sortie (65K maximum). Réflexion low/medium/high, sans none. Gemini est le seul à ingérer vidéo et audio nativement dans la gamme comparée ici. Niveaux low/medium/high à confirmer sur la page modèle ; la grille reste provisoire.",
  },
  {
    id: "claude-fable-5-1",
    providerId: "anthropic",
    name: "Claude Fable 5.1",
    tier: "flagship",
    priceIn: 10,
    priceOut: 50,
    latency: 3,
    quality: 5,
    contextK: 1000,
    capabilities: ["Texte", "Vision", "Outils", "Code"],
    efforts: ["low", "medium", "high"],
    bestFor: "Analyse à fort enjeu et garde-fous renforcés.",
    simpleNote: "Le prudent de la famille, pour examiner les situations les plus délicates.",
    techNote:
      "Même base que Mythos, réservé à des organisations vérifiées. Réflexion toujours active, défaut high. Texte et image en entrée ; texte en sortie, maximum 128K. Pas de génération d’images ni d’audio ou vidéo natifs.",
  },
  {
    id: "claude-opus-5-5",
    providerId: "anthropic",
    name: "Claude Opus 5.5",
    tier: "flagship",
    priceIn: 4,
    priceOut: 20,
    latency: 3,
    quality: 5,
    contextK: 1000,
    capabilities: ["Texte", "Vision", "Outils", "Code"],
    efforts: ["low", "medium", "high"],
    bestFor: "Analyse longue, juridique et raisonnement prudent.",
    simpleNote: "Il creuse les dossiers difficiles plutôt que de répondre à la va-vite.",
    techNote:
      "Réflexion toujours active, défaut medium. Texte et image en entrée ; texte en sortie, maximum 128K. Pas de génération d’images ni d’audio ou vidéo natifs.",
  },
  {
    id: "claude-sonnet-5-5",
    providerId: "anthropic",
    name: "Claude Sonnet 5.5",
    tier: "balanced",
    priceIn: 2,
    priceOut: 10,
    latency: 2,
    quality: 4,
    contextK: 1000,
    capabilities: ["Texte", "Vision", "Outils", "Code"],
    efforts: ["none", "low", "medium", "high"],
    bestFor: "Code complexe, agents (actions autonomes) et analyse.",
    simpleNote: "Le collègue appliqué qui aide à démêler un travail compliqué.",
    techNote:
      "Réflexion adaptative (ajustée à la tâche). Texte et image en entrée ; texte en sortie, maximum 128K. Pas de génération d’images ni d’audio ou vidéo natifs.",
  },
  {
    id: "claude-haiku-5-5",
    providerId: "anthropic",
    name: "Claude Haiku 5.5",
    tier: "fast",
    priceIn: 0.1,
    priceOut: 0.5,
    latency: 1,
    quality: 3,
    contextK: 1000,
    capabilities: ["Texte", "Vision", "Outils", "Code"],
    efforts: ["none", "low", "medium", "high"],
    bestFor: "Extraction, assistance et résumés économiques.",
    simpleNote: "Un coup de main léger pour les petites demandes du quotidien.",
    techNote:
      "Réflexion adaptative (ajustée à la tâche). Texte et image en entrée ; texte en sortie, maximum 128K. Pas de génération d’images ni d’audio ou vidéo natifs.",
  },
  {
    id: "deepseek-v4-1-flash",
    providerId: "deepseek",
    name: "DeepSeek V4.1 Flash",
    tier: "fast",
    priceIn: 0.15,
    priceOut: 0.6,
    latency: 1,
    quality: 3,
    contextK: 1000,
    capabilities: ["Texte", "Outils", "Code", "Maths"],
    efforts: ["low", "high"],
    bestFor: "Maths et code à budget contenu ; auto-hébergement possible.",
    simpleNote: "Il réfléchit même sur les petites tâches, tout en restant économique.",
    techNote:
      "552 Md de paramètres (réglages internes du modèle) MoE (seuls certains experts travaillent à chaque token). Version actuelle : snapshot 1017 (17 octobre 2026). Réflexion active par défaut : low/high/max, max regroupé dans high. Tarifs heures creuses, doublés en semaine 01-04h et 06-10h UTC. API en Chine : vigilance RGPD (protection européenne des données), auto-hébergement possible. Anciens alias deepseek-chat et deepseek-reasoner retirés le 24 juillet 2026.",
  },
  {
    id: "deepseek-v4-pro",
    providerId: "deepseek",
    name: "DeepSeek V4 Pro",
    tier: "flagship",
    priceIn: 0.66,
    priceOut: 1.98,
    latency: 3,
    quality: 5,
    contextK: 1000,
    capabilities: ["Texte", "Outils", "Code", "Maths"],
    efforts: ["low", "high"],
    bestFor: "Maths et code à budget contenu ; auto-hébergement possible.",
    simpleNote: "Un gros cerveau à petit budget, si le lieu de traitement vous convient.",
    techNote:
      "1600 Md de paramètres (réglages internes du modèle). Réflexion active par défaut : low/high/max, max regroupé dans high. Tarifs heures creuses, doublés en semaine 01-04h et 06-10h UTC. API en Chine : vigilance RGPD (protection européenne des données), auto-hébergement possible. Anciens alias deepseek-chat et deepseek-reasoner retirés le 24 juillet 2026.",
  },
  {
    id: "mistral-large-3",
    providerId: "mistral",
    name: "Mistral Large 3",
    tier: "flagship",
    priceIn: 0.5,
    priceOut: 1.5,
    latency: 3,
    quality: 5,
    contextK: 262,
    capabilities: ["Texte", "Vision", "Outils", "Code"],
    efforts: ["none"],
    bestFor: "Analyse professionnelle, santé UE et auto-hébergement.",
    simpleNote: "Le costaud européen que vous pouvez aussi installer chez vous.",
    techNote:
      "Apache 2.0 ; 675 Md MoE (experts spécialisés), 41 Md actifs. Mistral Large 4 est annoncé pour fin octobre 2026 : pas encore dans ce catalogue. Texte et image en entrée. Hébergement API UE. Sortie texte ; pas de réglage d’effort.",
  },
  {
    id: "mistral-medium-3-5",
    providerId: "mistral",
    name: "Mistral Medium 3.5",
    tier: "balanced",
    priceIn: 1.5,
    priceOut: 7.5,
    latency: 2,
    quality: 4,
    contextK: 256,
    capabilities: ["Texte", "Vision", "Outils", "Code"],
    efforts: ["none"],
    bestFor: "Applications professionnelles et assistants en UE.",
    simpleNote: "Un partenaire de travail équilibré, avec un service basé en Europe.",
    techNote:
      "Poids ouverts sous licence MIT modifiée. Hébergement API UE. Sortie texte ; pas de réglage d’effort.",
  },
  {
    id: "mistral-small-4",
    providerId: "mistral",
    name: "Mistral Small 4",
    tier: "fast",
    priceIn: 0.15,
    priceOut: 0.6,
    latency: 1,
    quality: 3,
    contextK: 128,
    capabilities: ["Texte", "Vision", "Outils", "Code"],
    efforts: ["none"],
    bestFor: "Tri, résumés et support à grand volume en UE.",
    simpleNote: "Le petit européen qui absorbe beaucoup de demandes sans grosse facture.",
    techNote:
      "Poids ouverts ; taille non communiquée dans le catalogue fourni. Hébergement API UE. Sortie texte ; pas de réglage d’effort.",
  },
  {
    id: "devstral-2",
    providerId: "mistral",
    name: "Devstral 2",
    tier: "balanced",
    priceIn: 0.4,
    priceOut: 2,
    latency: 2,
    quality: 4,
    contextK: 256,
    capabilities: ["Texte", "Outils", "Code"],
    efforts: ["none"],
    bestFor: "Agent de code (assistant qui modifie et teste des fichiers).",
    simpleNote: "Il met les mains dans vos fichiers pour vous aider à réparer votre logiciel.",
    techNote:
      "Poids ouverts sous licence MIT modifiée ; 123 Md de paramètres (réglages internes), sans effort réglable. Hébergement API UE. Sortie texte ; pas de réglage d’effort.",
  },
  {
    id: "ministral-3-8b",
    providerId: "mistral",
    name: "Ministral 3 8B",
    tier: "fast",
    priceIn: 0.15,
    priceOut: 0.15,
    latency: 1,
    quality: 3,
    contextK: 128,
    capabilities: ["Texte", "Vision", "Outils", "Code"],
    efforts: ["none"],
    bestFor: "Petit modèle embarquable pour notes et résumés hors-ligne.",
    simpleNote: "Assez petit pour voyager avec votre appareil, même sans internet.",
    techNote:
      "Apache 2.0 ; 8 Md de paramètres (réglages internes). Quantification (compression) et mémoire disponible à vérifier sur l’appareil. Hébergement API UE. Sortie texte ; pas de réglage d’effort.",
  },
  {
    id: "llama-4-5-maverick",
    providerId: "meta",
    name: "Llama 4.5 Maverick",
    tier: "flagship",
    priceIn: 0.17,
    priceOut: 0.85,
    latency: 3,
    quality: 5,
    contextK: 512,
    capabilities: ["Texte", "Vision", "Outils", "Code"],
    efforts: ["none"],
    bestFor: "Open weights (poids téléchargeables) à héberger soi-même.",
    simpleNote: "Un grand modèle à installer soi-même, à condition d’avoir les machines adaptées.",
    techNote:
      "Licence communautaire Llama 4, pas open source au sens strict. 400 Md MoE (experts spécialisés), 17 Md actifs. Prix indicatif de l’API Meta pour Llama 4 Maverick : dépend de l’hébergeur.",
  },
  {
    id: "qwen3-8-max",
    providerId: "alibaba",
    name: "Qwen3.8 Max",
    tier: "flagship",
    priceIn: 2,
    priceOut: 6,
    latency: 3,
    quality: 5,
    contextK: 1000,
    capabilities: ["Texte", "Vision", "Outils", "Code"],
    efforts: ["none", "medium", "high"],
    bestFor: "Code, jugement et applications multilingues.",
    simpleNote: "Le plus ambitieux de sa famille pour venir à bout des demandes difficiles.",
    techNote:
      "Texte et image en entrée. Fermé côté API Model Studio Singapour, tarifs USD. Efforts none/medium/high : grille simplifiée.",
  },
  {
    id: "qwen3-8-flash",
    providerId: "alibaba",
    name: "Qwen3.8 Flash",
    tier: "fast",
    priceIn: 0.15,
    priceOut: 0.47,
    latency: 1,
    quality: 3,
    contextK: 1000,
    capabilities: ["Texte", "Outils", "Code"],
    efforts: ["none"],
    bestFor: "Tri et résumés économiques à grand volume.",
    simpleNote: "Il va droit au but lorsque vous avez surtout besoin de vitesse.",
    techNote: "API Model Studio Singapour, tarifs USD. Modèle fermé, sans effort réglable.",
  },
  {
    id: "qwen3-8-27b",
    providerId: "alibaba",
    name: "Qwen3.8 27B",
    tier: "balanced",
    priceIn: 0.5,
    priceOut: 3,
    latency: 2,
    quality: 4,
    contextK: 262,
    capabilities: ["Texte", "Outils", "Code"],
    efforts: ["none", "medium"],
    bestFor: "Code et personnalisation en auto-hébergement.",
    simpleNote: "Un format raisonnable qui se débrouille très bien pour écrire du logiciel.",
    techNote:
      "27 Md dense (tous les paramètres participent), Apache 2.0. Contexte 262K, extensible à 1M avec YaRN (extension de contexte). Excellent en code pour sa taille. API Model Studio Singapour, tarifs USD.",
  },
  {
    id: "command-a-plus",
    providerId: "cohere",
    name: "Command A+",
    tier: "balanced",
    priceIn: 2.5,
    priceOut: 10,
    latency: 2,
    quality: 4,
    contextK: 128,
    capabilities: ["Texte", "Vision", "Outils", "RAG"],
    efforts: ["none"],
    bestFor: "Recherche documentaire, vision et assistants entreprise.",
    simpleNote: "Il s’appuie sur vos documents pour construire des réponses utiles au travail.",
    techNote:
      "Texte et vision (lecture d’images), appels d’outils (fonctions externes), RAG (recherche augmentée par les documents). Pas de réglage d’effort. Taille non publiée.",
  },
  {
    id: "command-r",
    providerId: "cohere",
    name: "Command R",
    tier: "fast",
    priceIn: 0.15,
    priceOut: 0.6,
    latency: 1,
    quality: 3,
    contextK: 128,
    capabilities: ["Texte", "Outils", "RAG"],
    efforts: ["none"],
    bestFor: "RAG (recherche augmentée par les documents) économique.",
    simpleNote: "Il retrouve l’information dans vos documents sans viser le grand luxe.",
    techNote:
      "Texte et outils, sans vision native. RAG (recherche augmentée) et citations. 35 Md de paramètres (réglages internes).",
  },
];

// ============= Scénarios du quiz : plusieurs réponses valables =============

export type Verdict = "ideal" | "valid" | "risky";

export interface ScenarioChoice {
  modelId: string;
  effort: Effort;
  verdict: Verdict;
  note: string; // pourquoi ce choix convient (ou pas)
}

export interface Scenario {
  id: string;
  title: string;
  story: string;
  choices: ScenarioChoice[];
  explainSimple: string;
  explainTech: string;
}

export const SCENARIOS: Scenario[] = [
  {
    id: "support-bot",
    title: "Chatbot support client",
    story:
      "Votre site e-commerce reçoit 50 000 questions par jour : suivi de colis, retours, horaires. Les réponses doivent être instantanées et le coût maîtrisé.",
    choices: [
      {
        modelId: "gpt-6-luna",
        effort: "none",
        verdict: "ideal",
        note: "Prix bas et réponse directe, avec outils (fonctions externes).",
      },
      {
        modelId: "claude-haiku-5-5",
        effort: "none",
        verdict: "valid",
        note: "Même tarif que Luna ; bon assistant pour des questions simples.",
      },
      {
        modelId: "mistral-small-4",
        effort: "none",
        verdict: "valid",
        note: "Hébergement UE et poids téléchargeables ; faible coût.",
      },
      {
        modelId: "deepseek-v4-1-flash",
        effort: "low",
        verdict: "valid",
        note: "Économique hors pointe, mais réflexion obligatoire et API chinoise.",
      },
      {
        modelId: "gpt-6-astra",
        effort: "high",
        verdict: "risky",
        note: "Trop coûteux pour des réponses répétitives et simples.",
      },
    ],
    explainSimple:
      "Pour des réponses simples, privilégiez un modèle rapide et une réponse directe quand elle est proposée.",
    explainTech: "GPT-6 Luna et Haiku 5.5 : 0,10/0,50 $. Gemini et DeepSeek n’offrent pas none.",
  },
  {
    id: "legal-docs",
    title: "Analyse de contrats juridiques",
    story:
      "Un cabinet d'avocats veut analyser des contrats de 300 pages et détecter les clauses à risque. Une erreur peut coûter des millions.",
    choices: [
      {
        modelId: "claude-fable-5-1",
        effort: "high",
        verdict: "ideal",
        note: "Garde-fous renforcés et réflexion profonde, sans remplacer la validation juridique.",
      },
      {
        modelId: "claude-opus-5-5",
        effort: "high",
        verdict: "ideal",
        note: "Analyse longue et prudente à un tarif inférieur à Fable.",
      },
      {
        modelId: "gpt-6-astra",
        effort: "high",
        verdict: "valid",
        note: "Raisonnement haut de gamme ; attention au tarif majoré des entrées longues.",
      },
      {
        modelId: "gemini-4-argon",
        effort: "high",
        verdict: "valid",
        note: "Grand contexte (texte lisible à la fois) pour les contrats longs.",
      },
      {
        modelId: "mistral-large-3",
        effort: "none",
        verdict: "valid",
        note: "Hébergement UE ou auto-hébergement ; pas de réglage d’effort.",
      },
      {
        modelId: "gpt-6-luna",
        effort: "none",
        verdict: "risky",
        note: "Un modèle rapide peut manquer des clauses subtiles à fort enjeu.",
      },
    ],
    explainSimple:
      "Choisissez un modèle prudent et faites toujours valider les résultats par un juriste.",
    explainTech:
      "Fable, Opus, Astra ou Argon avec high ; Mistral Large 3 sans effort réglable si l’UE prime.",
  },
  {
    id: "code-gen",
    title: "Génération de code complexe",
    story:
      "Votre équipe veut un assistant qui refactorise des modules entiers et corrige des bugs subtils dans une base de code de 15 ans.",
    choices: [
      {
        modelId: "claude-sonnet-5-5",
        effort: "high",
        verdict: "ideal",
        note: "Bon compromis pour modifier plusieurs fichiers et raisonner sur les bugs.",
      },
      {
        modelId: "gpt-6-sol",
        effort: "high",
        verdict: "ideal",
        note: "Code et agents (actions autonomes) à prix intermédiaire.",
      },
      {
        modelId: "deepseek-v4-pro",
        effort: "high",
        verdict: "valid",
        note: "Alternative budget hors pointe ; vérifier l’hébergement des données.",
      },
      {
        modelId: "qwen3-8-27b",
        effort: "medium",
        verdict: "valid",
        note: "Excellent code pour 27 Md de paramètres (réglages internes), auto-hébergeable.",
      },
      {
        modelId: "devstral-2",
        effort: "none",
        verdict: "valid",
        note: "Agent de code spécialisé ; pas de réglage d’effort.",
      },
      {
        modelId: "ministral-3-8b",
        effort: "none",
        verdict: "risky",
        note: "8 Md de paramètres (réglages internes) : trop limité pour cette complexité.",
      },
    ],
    explainSimple: "Le code difficile bénéficie de modèles solides et d’une réflexion approfondie.",
    explainTech:
      "Sonnet 5.5 ou GPT-6.1 Sol avec high ; DeepSeek V4 Pro, Qwen3.8 27B et Devstral 2 sont des alternatives.",
  },
  {
    id: "realtime-summary",
    title: "Résumés en temps réel",
    story:
      "Une app d'actualités résume chaque article en 3 phrases, à la volée, pour des millions de lecteurs. La latence (délai avant la réponse) doit rester sous la seconde.",
    choices: [
      {
        modelId: "gpt-6-luna",
        effort: "none",
        verdict: "ideal",
        note: "Tarif bas et pas de réflexion pour trois phrases simples.",
      },
      {
        modelId: "claude-haiku-5-5",
        effort: "none",
        verdict: "valid",
        note: "Même tarif que Luna, contexte 1M et réponse directe.",
      },
      {
        modelId: "mistral-small-4",
        effort: "none",
        verdict: "valid",
        note: "Rapide et hébergé en UE.",
      },
      {
        modelId: "command-r",
        effort: "none",
        verdict: "valid",
        note: "Économique pour les résumés documentaires.",
      },
      {
        modelId: "gemini-3-5-flash-lite",
        effort: "low",
        verdict: "valid",
        note: "Grand contexte, mais réflexion minimale obligatoire et sortie plus chère.",
      },
      {
        modelId: "claude-opus-5-5",
        effort: "high",
        verdict: "risky",
        note: "Réflexion profonde coûteuse et inutile pour un résumé simple.",
      },
    ],
    explainSimple:
      "Un petit modèle rapide suffit souvent ; la vitesse réelle doit être mesurée, jamais garantie par une note.",
    explainTech:
      "Luna ou Haiku avec none ; Flash-Lite nécessite low. La latence (délai de réponse) dépend aussi du service et du volume.",
  },
  {
    id: "health-eu",
    title: "Données de santé européennes",
    story:
      "Un hôpital français veut un assistant pour pré-remplir des comptes rendus. Les données patients ne doivent jamais quitter l'Union européenne.",
    choices: [
      {
        modelId: "mistral-large-3",
        effort: "none",
        verdict: "ideal",
        note: "Hébergement UE ou poids Apache 2.0 auto-hébergés ; encadrer les données de santé.",
      },
      {
        modelId: "llama-4-5-maverick",
        effort: "none",
        verdict: "valid",
        note: "Sur les serveurs UE de l’hôpital, avec infrastructure et licence adaptées.",
      },
      {
        modelId: "mistral-small-4",
        effort: "none",
        verdict: "valid",
        note: "Option UE économique, avec validation médicale des comptes rendus.",
      },
      {
        modelId: "mistral-medium-3-5",
        effort: "none",
        verdict: "valid",
        note: "Déploiement UE, licence MIT modifiée à vérifier pour l’auto-hébergement.",
      },
      {
        modelId: "qwen3-8-max",
        effort: "medium",
        verdict: "risky",
        note: "API à Singapour : ne respecte pas l’exigence de rester en UE.",
      },
      {
        modelId: "deepseek-v4-pro",
        effort: "high",
        verdict: "risky",
        note: "API hébergée en Chine ; seuls des poids déployés localement changent ce risque.",
      },
    ],
    explainSimple:
      "Choisissez un déploiement en UE, puis validez les exigences de santé et de sécurité.",
    explainTech:
      "Mistral Large 3 : Apache 2.0 et hébergement UE. Auto-hébergement (vos propres serveurs) possible ; il ne garantit pas à lui seul la conformité RGPD (protection des données).",
  },
  {
    id: "video-analysis",
    title: "Analyse de vidéos",
    story:
      "Une plateforme de formation veut indexer automatiquement des milliers d'heures de vidéos de cours : transcription, chapitrage, quiz.",
    choices: [
      {
        modelId: "gemini-4-argon",
        effort: "medium",
        verdict: "ideal",
        note: "Vidéo et audio natifs dans la gamme comparée, contexte 1 048K.",
      },
      {
        modelId: "gemini-3-8-flash",
        effort: "low",
        verdict: "valid",
        note: "Vidéo native à tarif inférieur, pour un chapitrage simple.",
      },
      {
        modelId: "gemini-3-5-flash-lite",
        effort: "low",
        verdict: "valid",
        note: "Vidéo native pour le tri simple ; niveaux de réflexion à confirmer.",
      },
      {
        modelId: "gpt-6-sol",
        effort: "medium",
        verdict: "valid",
        note: "Possible après transcription audio et extraction d’images (conversion préalable).",
      },
      {
        modelId: "claude-opus-5-5",
        effort: "medium",
        verdict: "risky",
        note: "Sans conversion, texte et image seulement : ne lit pas la vidéo ni l’audio natifs.",
      },
      {
        modelId: "deepseek-v4-1-flash",
        effort: "low",
        verdict: "risky",
        note: "Texte seulement dans ce catalogue : ne voit ni n’entend les cours.",
      },
    ],
    explainSimple:
      "Dans cette gamme, Gemini lit vidéo et audio directement ; d’autres modèles nécessitent une conversion.",
    explainTech:
      "Gemini est le seul à ingérer vidéo et audio nativement dans la gamme comparée ici. GPT-6 et Claude : texte et image uniquement, avec transcription et images extraites en amont.",
  },
  {
    id: "math-olympics",
    title: "Tuteur de maths niveau concours",
    story:
      "Une startup EdTech veut un tuteur qui résout des problèmes de maths niveau olympiades, avec un budget très serré.",
    choices: [
      {
        modelId: "deepseek-v4-pro",
        effort: "high",
        verdict: "ideal",
        note: "Raisonnement budget à 0,66/1,98 $ hors pointe ; tarifs doublés aux créneaux de pointe.",
      },
      {
        modelId: "gpt-6-sol",
        effort: "high",
        verdict: "valid",
        note: "Alternative code et raisonnement à 2/10 $, plus chère.",
      },
      {
        modelId: "claude-sonnet-5-5",
        effort: "high",
        verdict: "valid",
        note: "Alternative de raisonnement à 2/10 $, avec réflexion adaptative.",
      },
      {
        modelId: "qwen3-8-max",
        effort: "high",
        verdict: "valid",
        note: "Alternative multilingue à 2/6 $, API à Singapour.",
      },
      {
        modelId: "mistral-small-4",
        effort: "none",
        verdict: "risky",
        note: "Trop limité pour des problèmes de concours à plusieurs étapes.",
      },
    ],
    explainSimple:
      "DeepSeek V4 Pro reste un choix budget, avec des alternatives plus coûteuses chez OpenAI et Anthropic.",
    explainTech:
      "Effort high pour les problèmes difficiles ; comparer aussi les tarifs de pointe et le lieu d’hébergement.",
  },
  {
    id: "on-device",
    title: "Appli hors-ligne sur téléphone",
    story:
      "Vous développez une appli de notes qui doit résumer du texte sans connexion internet, directement sur l'appareil de l'utilisateur.",
    choices: [
      {
        modelId: "ministral-3-8b",
        effort: "none",
        verdict: "ideal",
        note: "8 Md, Apache 2.0 : candidat le plus léger ; tester mémoire et compression sur le téléphone.",
      },
      {
        modelId: "mistral-small-4",
        effort: "none",
        verdict: "valid",
        note: "Poids ouverts : alternative seulement si la mémoire disponible suffit.",
      },
      {
        modelId: "qwen3-8-27b",
        effort: "none",
        verdict: "valid",
        note: "27 Md : envisageable sur un appareil très puissant après compression, pas sur tout téléphone.",
      },
      {
        modelId: "llama-4-5-maverick",
        effort: "none",
        verdict: "risky",
        note: "400 Md totaux : irréaliste sur un téléphone malgré ses 17 Md actifs.",
      },
      {
        modelId: "gemini-3-8-flash",
        effort: "low",
        verdict: "risky",
        note: "API distante : sans connexion, aucune réponse.",
      },
    ],
    explainSimple:
      "Il faut des poids téléchargeables et assez de mémoire : Ministral 3 8B est le candidat le plus léger ici.",
    explainTech:
      "Quantification (compression des poids) et test sur l’appareil obligatoires ; 8 Md ne garantit pas une exécution sur chaque téléphone.",
  },
];

export const TIER_LABELS: Record<Tier, string> = {
  fast: "Rapide / économique",
  balanced: "Équilibré",
  flagship: "Haut de gamme",
};

export const VERDICT_LABELS: Record<Verdict, string> = {
  ideal: "Choix idéal",
  valid: "Alternative valable",
  risky: "Déconseillé",
};

// Glossaire : définitions courtes réutilisables
export const GLOSSARY: Record<string, string> = {
  effort: "effort de raisonnement (temps de réflexion interne du modèle avant de répondre)",
  openWeights:
    "open weights (poids du modèle téléchargeables librement, auto-hébergement possible)",
  context: "fenêtre de contexte (quantité maximale de texte que le modèle peut lire d'un coup)",
  latency: "latence (délai entre la question et la réponse)",
  token: "token (morceau de texte, unité de facturation : environ 0,75 mot)",
  rgpd: "RGPD (règlement européen de protection des données personnelles)",
  multimodal: "multimodal (capable de lire texte, images, audio ou vidéo)",
  rag: "RAG (recherche augmentée : le modèle puise dans vos documents avant de répondre)",
  finetuning: "fine-tuning (ré-entraînement spécialisé du modèle sur vos données)",
  selfhost: "auto-hébergement (faire tourner le modèle sur vos propres serveurs)",
};

// ============= Profils détaillés par modèle =============
// Ce qui distingue vraiment un modèle d'un autre, au-delà du provider.

export type Modality = "text" | "image" | "audio" | "video";

export interface ModelProfile {
  modalitiesIn: Modality[]; // ce que le modèle sait lire
  modalitiesOut: Modality[]; // ce qu'il sait produire
  openWeights: boolean; // poids téléchargeables, auto-hébergement possible
  toolUse: number; // qualité de l'appel d'outils (function calling), 1-5
  coding: number; // niveau en programmation, 1-5
  releaseTag: string; // génération du modèle (le marché évolue vite)
  paramsB: number | null; // milliards de paramètres (null = non publié par le provider)
}

export const MODEL_PROFILES: Record<string, ModelProfile> = {
  "gpt-6-astra": {
    modalitiesIn: ["text", "image"],
    modalitiesOut: ["text"],
    openWeights: false,
    toolUse: 5,
    coding: 5,
    releaseTag: "2026",
    paramsB: null,
  },
  "gpt-6-sol": {
    modalitiesIn: ["text", "image"],
    modalitiesOut: ["text"],
    openWeights: false,
    toolUse: 4,
    coding: 4,
    releaseTag: "2026",
    paramsB: null,
  },
  "gpt-6-luna": {
    modalitiesIn: ["text", "image"],
    modalitiesOut: ["text"],
    openWeights: false,
    toolUse: 3,
    coding: 3,
    releaseTag: "2026",
    paramsB: null,
  },
  "gemini-4-argon": {
    modalitiesIn: ["text", "image", "audio", "video"],
    modalitiesOut: ["text"],
    openWeights: false,
    toolUse: 5,
    coding: 5,
    releaseTag: "2026",
    paramsB: null,
  },
  "gemini-3-8-flash": {
    modalitiesIn: ["text", "image", "audio", "video"],
    modalitiesOut: ["text"],
    openWeights: false,
    toolUse: 4,
    coding: 4,
    releaseTag: "2026",
    paramsB: null,
  },
  "gemini-3-5-flash-lite": {
    modalitiesIn: ["text", "image", "audio", "video"],
    modalitiesOut: ["text"],
    openWeights: false,
    toolUse: 3,
    coding: 3,
    releaseTag: "2026",
    paramsB: null,
  },
  "claude-fable-5-1": {
    modalitiesIn: ["text", "image"],
    modalitiesOut: ["text"],
    openWeights: false,
    toolUse: 5,
    coding: 5,
    releaseTag: "2026",
    paramsB: null,
  },
  "claude-opus-5-5": {
    modalitiesIn: ["text", "image"],
    modalitiesOut: ["text"],
    openWeights: false,
    toolUse: 5,
    coding: 5,
    releaseTag: "2026",
    paramsB: null,
  },
  "claude-sonnet-5-5": {
    modalitiesIn: ["text", "image"],
    modalitiesOut: ["text"],
    openWeights: false,
    toolUse: 4,
    coding: 4,
    releaseTag: "2026",
    paramsB: null,
  },
  "claude-haiku-5-5": {
    modalitiesIn: ["text", "image"],
    modalitiesOut: ["text"],
    openWeights: false,
    toolUse: 3,
    coding: 3,
    releaseTag: "2026",
    paramsB: null,
  },
  "deepseek-v4-1-flash": {
    modalitiesIn: ["text"],
    modalitiesOut: ["text"],
    openWeights: true,
    toolUse: 3,
    coding: 3,
    releaseTag: "2026",
    paramsB: 552,
  },
  "deepseek-v4-pro": {
    modalitiesIn: ["text"],
    modalitiesOut: ["text"],
    openWeights: true,
    toolUse: 5,
    coding: 5,
    releaseTag: "2026",
    paramsB: 1600,
  },
  "mistral-large-3": {
    modalitiesIn: ["text", "image"],
    modalitiesOut: ["text"],
    openWeights: true,
    toolUse: 5,
    coding: 5,
    releaseTag: "2025-12",
    paramsB: 675,
  },
  "mistral-medium-3-5": {
    modalitiesIn: ["text", "image"],
    modalitiesOut: ["text"],
    openWeights: true,
    toolUse: 4,
    coding: 4,
    releaseTag: "2026",
    paramsB: null,
  },
  "mistral-small-4": {
    modalitiesIn: ["text", "image"],
    modalitiesOut: ["text"],
    openWeights: true,
    toolUse: 3,
    coding: 3,
    releaseTag: "2026",
    paramsB: null,
  },
  "devstral-2": {
    modalitiesIn: ["text"],
    modalitiesOut: ["text"],
    openWeights: true,
    toolUse: 4,
    coding: 4,
    releaseTag: "2025-12",
    paramsB: 123,
  },
  "ministral-3-8b": {
    modalitiesIn: ["text", "image"],
    modalitiesOut: ["text"],
    openWeights: true,
    toolUse: 3,
    coding: 3,
    releaseTag: "2025-12",
    paramsB: 8,
  },
  "llama-4-5-maverick": {
    modalitiesIn: ["text", "image"],
    modalitiesOut: ["text"],
    openWeights: true,
    toolUse: 5,
    coding: 5,
    releaseTag: "2026-06",
    paramsB: 400,
  },
  "qwen3-8-max": {
    modalitiesIn: ["text", "image"],
    modalitiesOut: ["text"],
    openWeights: false,
    toolUse: 5,
    coding: 5,
    releaseTag: "2026",
    paramsB: null,
  },
  "qwen3-8-flash": {
    modalitiesIn: ["text"],
    modalitiesOut: ["text"],
    openWeights: false,
    toolUse: 3,
    coding: 3,
    releaseTag: "2026",
    paramsB: null,
  },
  "qwen3-8-27b": {
    modalitiesIn: ["text"],
    modalitiesOut: ["text"],
    openWeights: true,
    toolUse: 4,
    coding: 5,
    releaseTag: "2026",
    paramsB: 27,
  },
  "command-a-plus": {
    modalitiesIn: ["text", "image"],
    modalitiesOut: ["text"],
    openWeights: false,
    toolUse: 4,
    coding: 3,
    releaseTag: "2026-05",
    paramsB: null,
  },
  "command-r": {
    modalitiesIn: ["text"],
    modalitiesOut: ["text"],
    openWeights: false,
    toolUse: 3,
    coding: 2,
    releaseTag: "2024",
    paramsB: 35,
  },
};

export function profileOf(modelId: string): ModelProfile {
  return (
    MODEL_PROFILES[modelId] ?? {
      modalitiesIn: ["text"],
      modalitiesOut: ["text"],
      openWeights: false,
      toolUse: 1,
      coding: 1,
      releaseTag: "?",
      paramsB: null,
    }
  );
}

export function modelsOfProvider(providerId: string): ModelInfo[] {
  return MODELS.filter((m) => m.providerId === providerId);
}

export function modelById(id: string): ModelInfo | undefined {
  return MODELS.find((m) => m.id === id);
}

export function currentPrice(model: ModelInfo, now = new Date()) {
  const expired =
    model.promo && now.getTime() >= Date.parse(`${model.promo.until}T00:00:00Z`) + 86400000;
  return expired && model.promo
    ? { priceIn: model.promo.priceInAfter, priceOut: model.promo.priceOutAfter }
    : { priceIn: model.priceIn, priceOut: model.priceOut };
}

export function estimateCost(
  model: ModelInfo,
  effort: Effort,
  millionsOfTokens: number,
  inputShare = 0.75,
  now = new Date(),
) {
  const { priceIn, priceOut } = currentPrice(model, now);
  return (
    millionsOfTokens *
    (inputShare * priceIn + (1 - inputShare) * priceOut * EFFORTS[effort].costMultiplier)
  );
}

export function effectiveLatency(model: ModelInfo, effort: Effort): number {
  return Math.min(5, model.latency + EFFORTS[effort].latencyAdd);
}

export function effectiveQuality(model: ModelInfo, effort: Effort): number {
  return Math.min(5, model.quality + EFFORTS[effort].qualityAdd);
}

// ============= Notation des scénarios =============
// Modèle idéal : 5 pts, alternative valable : 3 pts, déconseillé : 1 pt, non listé : 1 pt.
// Effort exact : +3 pts, adjacent : +1 pt, sinon 0. Max 8 pts par scénario.

const EFFORT_ORDER: Effort[] = ["none", "low", "medium", "high"];

export function scoreChoice(
  modelId: string,
  effort: Effort,
  scenario: Scenario,
): { points: number; choice: ScenarioChoice | null } {
  const choice = scenario.choices.find((c) => c.modelId === modelId) ?? null;
  let points = choice ? (choice.verdict === "ideal" ? 5 : choice.verdict === "valid" ? 3 : 1) : 1;
  const target = choice?.effort ?? scenario.choices[0]?.effort ?? "none";
  if (effort === target) points += 3;
  else if (Math.abs(EFFORT_ORDER.indexOf(effort) - EFFORT_ORDER.indexOf(target)) === 1) points += 1;
  return { points, choice };
}
