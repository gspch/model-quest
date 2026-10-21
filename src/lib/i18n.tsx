import { DATA_VERIFIED_ON, formatDataDate } from "../data/sources";
// Bilinguisme FR/EN : contexte + dictionnaire d'interface, persisté en localStorage.
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "en";

const KEY = "modelquest:lang:v1";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof STRINGS.fr) => string;
}

const STRINGS = {
  fr: {
    "error.notFound": "Page introuvable",
    "error.notFoundBody": "Cette page n’existe pas ou a été déplacée.",
    "error.home": "Retour à l’accueil",
    "error.load": "Cette page n’a pas pu être chargée",
    "error.loadBody": "Un problème est survenu. Réessayez ou revenez à l’accueil.",
    "error.retry": "Réessayer",

    "quiz.reminder": "$ rappel :",
    "quiz.saveError": "Échec de la sauvegarde : vérifiez votre connexion et réessayez.",
    "scores.unconfigured": "Classement indisponible : ce déploiement n’a pas de base configurée",
    "sim.inputShare": "Part de tokens en entrée",
    "sim.inputHelp":
      "L’entrée est ce que vous envoyez ; la sortie est ce que le modèle écrit. La réflexion augmente seulement la sortie estimée.",
    "sim.costFormula":
      "Estimation : volume × (part entrée × prix entrée + part sortie × prix sortie × réflexion). Multiplicateurs pédagogiques, hors remises et majorations.",
    "effort.output": "sortie",
    "promo.badge": "Tarif promo jusqu’au {date}, puis {in}/{out} $",
    "model.price": "Prix entrée/sortie",
    "model.context": "Contexte",
    "model.quality": "Qualité",
    "unit.month": "mois",
    "unit.billion": "Md",
    "footer.commands": "Commandes expliquées",
    "guide.note": "note :",
    "home.langNotice": "Interface disponible en français et en anglais, ambiance personnalisable.",
    "share.download": "↓ Télécharger le badge (PNG)",
    "share.x": "Ouvrir X ↗",
    "share.linkedin": "Ouvrir LinkedIn ↗",
    "share.canvasCommand": "$ quiz --resultats",
    "share.canvasSubtitle": "Quel modèle d’IA choisir ?",

    "nav.home": "Accueil",
    "nav.quiz": "Quiz",
    "nav.sim": "Simulateur",
    "nav.journey": "Parcours",
    "nav.guide": "Guide",
    "nav.scores": "Scores",
    "home.tagline": "$ whoami → futur expert en choix de modèles",
    "home.title1": "Quel modèle d'IA",
    "home.title2": "choisir ?",
    "home.intro":
      "OpenAI, Google, Anthropic, DeepSeek, Mistral, Meta, Alibaba, Cohere… puis quel modèle, puis quel effort de raisonnement (temps de réflexion interne du modèle avant de répondre) ? Apprenez à arbitrer entre coût, vitesse, qualité et conformité, en jouant.",
    "home.ctaQuiz": "Lancer le quiz →",
    "home.ctaSim": "Ouvrir le simulateur",
    "home.recordQuiz": "★ record quiz",
    "home.journeyLevel": "parcours : niveau débloqué",
    "home.rules": "$ cat /etc/regles-du-jeu",
    "home.rule1t": "Choisir le provider",
    "home.rule1d":
      "OpenAI, Google, Anthropic, DeepSeek, Mistral, Meta, Alibaba, Cohere : chacun a ses forces, ses prix et ses contraintes de conformité.",
    "home.rule2t": "Choisir le modèle",
    "home.rule2d":
      "Au sein d'un provider : petit et rapide, ou flagship (haut de gamme) puissant ? Le bon niveau dépend de la difficulté de la tâche.",
    "home.rule3t": "Choisir l'effort",
    "home.rule3d":
      "L'effort de raisonnement (temps de réflexion interne) peut améliorer la qualité mais augmente le texte de sortie facturé et la latence (délai de réponse). Savoir quand l'activer… ou pas.",
    "home.disclaimer":
      "modèles référencés · prix et capacités indicatifs : le marché évolue vite, vérifiez toujours les tarifs officiels.",
    "mode.quiz.title": "Quiz par scénarios",
    "mode.quiz.desc":
      "8 cas d'usage réels : chatbot, contrats juridiques, code, vidéo… Choisissez provider, modèle et effort, puis découvrez toutes les réponses valables et pourquoi.",
    "mode.quiz.cta": "Jouer",
    "mode.sim.title": "Simulateur libre",
    "mode.sim.desc":
      "Configurez librement provider, modèle et effort. Voyez en direct l'impact sur le coût, la latence, la qualité et la conformité.",
    "mode.sim.cta": "Expérimenter",
    "mode.journey.title": "Parcours progressif",
    "mode.journey.desc":
      "4 niveaux déblocables : d'abord le provider, puis le modèle, puis l'effort, enfin le combo complet. Progression sauvegardée.",
    "mode.journey.cta": "Commencer",
    "mode.guide.title": "Guide de référence",
    "mode.guide.desc":
      "Les fiches complètes de chaque provider et modèle : forces, faiblesses, prix indicatifs, contexte, capacités et conformité.",
    "mode.guide.cta": "Consulter",
    "mode.scores.title": "Classement en ligne",
    "mode.scores.desc":
      "Vos scores sont sauvegardés en ligne : comparez-vous au classement mondial et partagez votre badge sur LinkedIn ou X.",
    "mode.scores.cta": "Voir le classement",
    "quiz.scenario": "scénario",
    "quiz.score": "score",
    "quiz.record": "record",
    "quiz.step1": "Quel provider (fournisseur de modèles) ?",
    "quiz.step2": "Quel modèle chez",
    "quiz.step3": "Quel effort de raisonnement (temps de réflexion interne avant de répondre) ?",
    "quiz.backProvider": "← changer de provider",
    "quiz.backModel": "← changer de modèle",
    "quiz.notOffered": "non proposé",
    "quiz.excellent": "✔ Excellent choix",
    "quiz.defensible": "◑ Choix défendable",
    "quiz.risky": "✘ Choix risqué",
    "quiz.yourChoice": "Votre choix",
    "quiz.notListed": "Ce modèle n'est pas adapté à ce scénario : voyez les options ci-dessous.",
    "quiz.allAnswers":
      "TOUTES LES RÉPONSES POSSIBLES (plusieurs modèles conviennent, selon vos priorités)",
    "quiz.next": "Scénario suivant →",
    "quiz.seeScore": "Voir mon score →",
    "quiz.results": "$ quiz --results",
    "quiz.newRecord": "★ Nouveau record personnel",
    "quiz.replay": "Rejouer",
    "quiz.readGuide": "Lire le guide",
    "quiz.gamesPlayed": "partie(s) jouée(s)",
    "quiz.verdictHigh": "Architecte IA confirmé : vous savez arbitrer comme un pro.",
    "quiz.verdictMid": "Bon instinct ! Encore quelques subtilités à maîtriser.",
    "quiz.verdictLow":
      "Le marché des modèles n'a plus de secret à venir : rejouez après un tour dans le guide !",
    "quiz.saveOnline": "Sauvegarder en ligne",
    "quiz.yourName": "Votre pseudo…",
    "quiz.publish": "Publier mon score",
    "quiz.published": "Score publié au classement mondial !",
    "quiz.shareBadge": "Partager mon badge",
    "quiz.shareText":
      "J'ai obtenu {score}/{max} au quiz model.quest : saurez-vous choisir le bon modèle d'IA ?",
    effort: "effort",
    "sim.title": "Simulateur libre",
    "sim.sub": "Changez un paramètre, observez l'impact. C'est en manipulant qu'on comprend.",
    "sim.provider": "PROVIDER",
    "sim.model": "MODÈLE",
    "sim.effort": "EFFORT DE RAISONNEMENT (temps de réflexion interne du modèle)",
    "sim.volume": "VOLUME MENSUEL",
    "sim.impact": "IMPACT ESTIMÉ",
    "sim.cost": "COÛT MENSUEL",
    "sim.latency": "LATENCE (délai de réponse)",
    "sim.quality": "QUALITÉ DE RAISONNEMENT",
    "sim.context": "FENÊTRE DE CONTEXTE (texte lisible d'un coup)",
    "sim.latencyFast": "quasi instantané",
    "sim.latencyMid": "quelques secondes",
    "sim.latencySlow": "patience…",
    "sim.costRank": "rang coût",
    "sim.ofModels": "modèles (du moins cher au plus cher)",
    "sim.capabilities": "CAPACITÉS",
    "sim.compliance": "CONFORMITÉ",
    "sim.insightLow":
      "vous privilégiez la vitesse et le coût. Si les réponses manquent de fiabilité sur des tâches complexes, montez l'effort avant de changer de modèle.",
    "sim.insightHigh":
      "augmente les tokens de sortie (texte produit) estimés, pas le prix de l’entrée, et peut améliorer le raisonnement. Sur des tâches simples, redescendez l'effort : c'est de l'argent gratuit.",
    "sim.withEffort": "Avec un effort",
    "sim.theEffort": "L'effort",
    "journey.title": "Parcours progressif",
    "journey.sub":
      "Réussissez chaque niveau pour débloquer le suivant. Votre progression est sauvegardée sur cet appareil.",
    "journey.back": "← retour aux niveaux",
    "journey.level": "niveau",
    "journey.question": "question",
    "journey.good": "bonnes réponses",
    "journey.nextQ": "Question suivante →",
    "journey.finish": "Terminer le niveau →",
    "journey.passed": "Niveau réussi !",
    "journey.failed": "Encore un effort",
    "journey.unlocked": "est débloqué",
    "journey.allDone": "Vous avez terminé tous les niveaux : essayez le quiz complet !",
    "journey.need": "il en faut",
    "journey.toUnlock": "pour débloquer la suite",
    "journey.replay": "Rejouer",
    "journey.levels": "Niveaux →",
    "journey.locked": "🔒 verrouillé",
    "journey.questions": "questions",
    "journey.record": "record",
    "journey.saved": "progression sauvegardée localement sur cet appareil",
    "guide.title": "Guide de référence",
    "guide.sub":
      "Tout ce qu'il faut savoir sur chaque provider et chaque modèle. Prix indicatifs par million de tokens (morceaux de texte, unité de facturation), entrée/sortie : vérifiez les tarifs officiels, ils évoluent vite.",
    "guide.concepts": "$ man concepts",
    "guide.effort": "$ man effort",
    "guide.effortSub":
      "L'effort de raisonnement (temps de réflexion interne du modèle avant de répondre) se règle sur 4 niveaux :",
    "guide.effortNote":
      "Ce réglage est réel : GPT-6 propose six niveaux (xhigh et max regroupés dans high ici), Gemini trois sans none, Fable et Opus une réflexion toujours active, Sonnet et Haiku une réflexion adaptative, DeepSeek low/high/max (max regroupé dans high). Mistral, Llama et Command n'ont pas de réglage d'effort dans ce catalogue. Les multiplicateurs sont pédagogiques, pas des tarifs officiels.",
    "catalogue.notice":
      "Données indicatives vérifiées le {date}. Les prix et capacités évoluent vite : vérifiez toujours la page officielle du provider.",
    "catalogue.pricing": "Tarifs officiels",
    "guide.pickProvider": "$ ls /providers : cliquez pour sauter à une fiche",
    "model.params": "paramètres (taille du modèle, en milliards)",
    "params.undisclosed": "non publié",
    "guide.strengths": "FORCES",
    "guide.weaknesses": "FAIBLESSES",
    "guide.compliance": "CONFORMITÉ",
    "guide.models": "modèles référencés · données indicatives",
    "scores.title": "Classement mondial",
    "scores.sub": "Les meilleurs scores du quiz, sauvegardés en ligne. À vous de jouer !",
    "scores.empty": "Aucun score pour l'instant : soyez le premier !",
    "scores.player": "Joueur",
    "scores.score": "Score",
    "scores.rank": "Rang",
    "scores.date": "Date",
    "scores.play": "Jouer au quiz →",
    "cost.legend":
      "$ : coût estimé en dollars par million de tokens (un token ≈ 0,75 mot ; 1M tokens ≈ 750 000 mots traités en entrée ou en sortie).",
    "footer.title": "$ --help : petit lexique du terminal",
    "footer.legend":
      "Ces lignes imitent un terminal (écran de commandes des développeurs). Le $ est l'invite (le signe qui attend vos ordres), man = manual (affiche la documentation), cat = affiche le contenu d'un fichier, et --global est une option (elle modifie le comportement de la commande). Ici, inutile de taper : cliquez !",
    "footer.cmd.scores": "affiche le classement mondial (commande inventée pour ce jeu)",
    "footer.cmd.guide": "affiche tout le contenu du guide, comme cat affiche un fichier",
    "footer.cmd.journey": "lance le parcours progressif, avec l'option --start",
    "footer.disclaimer":
      "Prix et capacités indicatifs : les tarifs évoluent vite, vérifiez les sources officielles.",
    "explain.simple": "Simple",
    "explain.tech": "Technique",
    "theme.label": "Ambiance",
    "lang.label": "Langue",
    "mod.text": "texte",
    "mod.image": "image",
    "mod.audio": "audio",
    "mod.video": "vidéo",
    "sim.profile": "PROFIL DU MODÈLE",
    "sim.modalitiesIn": "lit",
    "sim.modalitiesOut": "produit",
    "sim.toolUse": "APPEL D'OUTILS (fonctions externes déclenchées par le modèle)",
    "sim.coding": "NIVEAU EN CODE",
    "sim.openWeights": "open weights (poids téléchargeables, auto-hébergement possible)",
    "sim.closedWeights": "propriétaire (API uniquement, pas d'auto-hébergement)",
    "sim.release": "génération",
    "quiz.copyText": "Copier le texte du post",
    "quiz.copied": "✔ Texte copié !",
    "quiz.shareTip":
      "Les posts avec image obtiennent bien plus de vues : téléchargez le badge, collez le texte copié, et joignez l'image à votre post LinkedIn ou X.",
    "quiz.yourRank": "Vous êtes n°{rank} sur {total} joueurs",
  },
  en: {
    "error.notFound": "Page not found",
    "error.notFoundBody": "This page does not exist or has moved.",
    "error.home": "Go home",
    "error.load": "This page did not load",
    "error.loadBody": "Something went wrong. Try again or head home.",
    "error.retry": "Try again",

    "quiz.reminder": "$ reminder:",
    "quiz.saveError": "Save failed: check your connection and retry.",
    "scores.unconfigured": "Leaderboard unavailable: this deployment has no database configured",
    "sim.inputShare": "Share of input tokens",
    "sim.inputHelp":
      "Input is what you send; output is what the model writes. Thinking increases only estimated output.",
    "sim.costFormula":
      "Estimate: volume × (input share × input price + output share × output price × thinking). Educational multipliers, excluding discounts and surcharges.",
    "effort.output": "output",
    "promo.badge": "Promo price until {date}, then ${in}/{out}",
    "model.price": "Input/output price",
    "model.context": "Context",
    "model.quality": "Quality",
    "unit.month": "mo",
    "unit.billion": "B",
    "footer.commands": "Explained commands",
    "guide.note": "note:",
    "home.langNotice": "Interface available in French and English, customizable lighting.",
    "share.download": "↓ Download badge (PNG)",
    "share.x": "Open X ↗",
    "share.linkedin": "Open LinkedIn ↗",
    "share.canvasCommand": "$ quiz --results",
    "share.canvasSubtitle": "Which AI model should you pick?",

    "nav.home": "Home",
    "nav.quiz": "Quiz",
    "nav.sim": "Simulator",
    "nav.journey": "Journey",
    "nav.guide": "Guide",
    "nav.scores": "Scores",
    "home.tagline": "$ whoami → future expert in model selection",
    "home.title1": "Which AI model",
    "home.title2": "should you pick?",
    "home.intro":
      "OpenAI, Google, Anthropic, DeepSeek, Mistral, Meta, Alibaba, Cohere… then which model, then which reasoning effort (the model's internal thinking time before answering)? Learn to trade off cost, speed, quality and compliance, by playing.",
    "home.ctaQuiz": "Start the quiz →",
    "home.ctaSim": "Open the simulator",
    "home.recordQuiz": "★ quiz record",
    "home.journeyLevel": "journey: level unlocked",
    "home.rules": "$ cat /etc/game-rules",
    "home.rule1t": "Pick the provider",
    "home.rule1d":
      "OpenAI, Google, Anthropic, DeepSeek, Mistral, Meta, Alibaba, Cohere: each has its strengths, prices and compliance constraints.",
    "home.rule2t": "Pick the model",
    "home.rule2d":
      "Within a provider: small and fast, or a powerful flagship (top-tier)? The right level depends on task difficulty.",
    "home.rule3t": "Pick the effort",
    "home.rule3d":
      "Reasoning effort (internal thinking time) may improve quality but increases billed output text and latency (response delay). Know when to enable it… or not.",
    "home.disclaimer":
      "models listed · indicative prices and capabilities: the market moves fast, always check official pricing.",
    "mode.quiz.title": "Scenario quiz",
    "mode.quiz.desc":
      "8 real use cases: chatbot, legal contracts, code, video… Pick provider, model and effort, then discover all valid answers and why.",
    "mode.quiz.cta": "Play",
    "mode.sim.title": "Free simulator",
    "mode.sim.desc":
      "Freely configure provider, model and effort. See the live impact on cost, latency, quality and compliance.",
    "mode.sim.cta": "Experiment",
    "mode.journey.title": "Progressive journey",
    "mode.journey.desc":
      "4 unlockable levels: provider first, then model, then effort, finally the full combo. Progress is saved.",
    "mode.journey.cta": "Start",
    "mode.guide.title": "Reference guide",
    "mode.guide.desc":
      "Full fact sheets for every provider and model: strengths, weaknesses, indicative prices, context, capabilities and compliance.",
    "mode.guide.cta": "Browse",
    "mode.scores.title": "Online leaderboard",
    "mode.scores.desc":
      "Your scores are saved online: compare yourself to the global leaderboard and share your badge on LinkedIn or X.",
    "mode.scores.cta": "View leaderboard",
    "quiz.scenario": "scenario",
    "quiz.score": "score",
    "quiz.record": "record",
    "quiz.step1": "Which provider (model supplier)?",
    "quiz.step2": "Which model at",
    "quiz.step3": "Which reasoning effort (internal thinking time before answering)?",
    "quiz.backProvider": "← change provider",
    "quiz.backModel": "← change model",
    "quiz.notOffered": "not offered",
    "quiz.excellent": "✔ Excellent choice",
    "quiz.defensible": "◑ Defensible choice",
    "quiz.risky": "✘ Risky choice",
    "quiz.yourChoice": "Your choice",
    "quiz.notListed": "This model does not fit this scenario: see the options below.",
    "quiz.allAnswers": "ALL POSSIBLE ANSWERS (several models work, depending on your priorities)",
    "quiz.next": "Next scenario →",
    "quiz.seeScore": "See my score →",
    "quiz.results": "$ quiz --results",
    "quiz.newRecord": "★ New personal record",
    "quiz.replay": "Play again",
    "quiz.readGuide": "Read the guide",
    "quiz.gamesPlayed": "game(s) played",
    "quiz.verdictHigh": "Confirmed AI architect: you trade off like a pro.",
    "quiz.verdictMid": "Good instinct! A few subtleties left to master.",
    "quiz.verdictLow":
      "The model market holds no more secrets soon: replay after a tour of the guide!",
    "quiz.saveOnline": "Save online",
    "quiz.yourName": "Your nickname…",
    "quiz.publish": "Publish my score",
    "quiz.published": "Score published to the global leaderboard!",
    "quiz.shareBadge": "Share my badge",
    "quiz.shareText":
      "I scored {score}/{max} on the model.quest quiz: can you pick the right AI model?",
    effort: "effort",
    "sim.title": "Free simulator",
    "sim.sub": "Change a parameter, watch the impact. You learn by playing.",
    "sim.provider": "PROVIDER",
    "sim.model": "MODEL",
    "sim.effort": "REASONING EFFORT (model's internal thinking time)",
    "sim.volume": "MONTHLY VOLUME",
    "sim.impact": "ESTIMATED IMPACT",
    "sim.cost": "MONTHLY COST",
    "sim.latency": "LATENCY (response delay)",
    "sim.quality": "REASONING QUALITY",
    "sim.context": "CONTEXT WINDOW (text readable at once)",
    "sim.latencyFast": "near instant",
    "sim.latencyMid": "a few seconds",
    "sim.latencySlow": "be patient…",
    "sim.costRank": "cost rank",
    "sim.ofModels": "models (cheapest to priciest)",
    "sim.capabilities": "CAPABILITIES",
    "sim.compliance": "COMPLIANCE",
    "sim.insightLow":
      "you favor speed and cost. If answers lack reliability on complex tasks, raise the effort before switching models.",
    "sim.insightHigh":
      "increases estimated output tokens (produced text), not input pricing, and may improve reasoning. On simple tasks, lower the effort: it's free money.",
    "sim.withEffort": "With effort",
    "sim.theEffort": "Effort",
    "journey.title": "Progressive journey",
    "journey.sub": "Pass each level to unlock the next. Your progress is saved on this device.",
    "journey.back": "← back to levels",
    "journey.level": "level",
    "journey.question": "question",
    "journey.good": "correct answers",
    "journey.nextQ": "Next question →",
    "journey.finish": "Finish level →",
    "journey.passed": "Level passed!",
    "journey.failed": "One more effort",
    "journey.unlocked": "is unlocked",
    "journey.allDone": "You finished all levels: try the full quiz!",
    "journey.need": "you need",
    "journey.toUnlock": "to unlock the next one",
    "journey.replay": "Replay",
    "journey.levels": "Levels →",
    "journey.locked": "🔒 locked",
    "journey.questions": "questions",
    "journey.record": "record",
    "journey.saved": "progress saved locally on this device",
    "guide.title": "Reference guide",
    "guide.sub":
      "Everything you need to know about each provider and model. Indicative prices per million tokens (pieces of text, the billing unit), input/output: check official pricing, it changes fast.",
    "guide.concepts": "$ man concepts",
    "guide.effort": "$ man effort",
    "guide.effortSub":
      "Reasoning effort (the model's internal thinking time before answering) comes in 4 levels:",
    "guide.effortNote":
      "This setting is real: GPT-6 has six levels (xhigh and max map to high here), Gemini three without none, Fable and Opus always-on thinking, Sonnet and Haiku adaptive thinking, DeepSeek low/high/max (max maps to high). Mistral, Llama and Command have no effort setting in this catalogue. Multipliers are educational, not official rates.",
    "catalogue.notice":
      "Indicative data verified on {date}. Prices and capabilities change fast: always check the provider's official page.",
    "catalogue.pricing": "Official pricing",
    "guide.pickProvider": "$ ls /providers: click to jump to a fact sheet",
    "model.params": "parameters (model size, in billions)",
    "params.undisclosed": "undisclosed",
    "guide.strengths": "STRENGTHS",
    "guide.weaknesses": "WEAKNESSES",
    "guide.compliance": "COMPLIANCE",
    "guide.models": "models listed · indicative data",
    "scores.title": "Global leaderboard",
    "scores.sub": "The best quiz scores, saved online. Your turn!",
    "scores.empty": "No scores yet: be the first!",
    "scores.player": "Player",
    "scores.score": "Score",
    "scores.rank": "Rank",
    "scores.date": "Date",
    "scores.play": "Play the quiz →",
    "cost.legend":
      "$: estimated cost in dollars per million tokens (one token ≈ 0.75 word; 1M tokens ≈ 750,000 words processed as input or output).",
    "footer.title": "$ --help: a tiny terminal glossary",
    "footer.legend":
      "These lines mimic a terminal (the developers' command screen). The $ is the prompt (the sign waiting for your orders), man = manual (shows the documentation), cat = prints a file's contents, and --global is an option (it changes the command's behavior). No typing needed here: just click!",
    "footer.cmd.scores": "shows the global leaderboard (a command invented for this game)",
    "footer.cmd.guide": "prints the whole guide, just like cat prints a file",
    "footer.cmd.journey": "starts the progressive journey, with the --start option",
    "footer.disclaimer":
      "Indicative prices and capabilities: pricing moves fast, check official sources.",
    "explain.simple": "Simple",
    "explain.tech": "Technical",
    "theme.label": "Ambience",
    "lang.label": "Language",
    "mod.text": "text",
    "mod.image": "image",
    "mod.audio": "audio",
    "mod.video": "video",
    "sim.profile": "MODEL PROFILE",
    "sim.modalitiesIn": "reads",
    "sim.modalitiesOut": "produces",
    "sim.toolUse": "TOOL CALLING (external functions triggered by the model)",
    "sim.coding": "CODING SKILL",
    "sim.openWeights": "open weights (downloadable, self-hosting possible)",
    "sim.closedWeights": "proprietary (API only, no self-hosting)",
    "sim.release": "generation",
    "quiz.copyText": "Copy post text",
    "quiz.copied": "✔ Text copied!",
    "quiz.shareTip":
      "Posts with an image get far more views: download the badge, paste the copied text, and attach the image to your LinkedIn or X post.",
    "quiz.yourRank": "You are #{rank} out of {total} players",
  },
} as const;

const Ctx = createContext<LangCtx>({
  lang: "fr",
  setLang: () => {},
  t: (k) => STRINGS.fr[k],
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY) as Lang | null;
      if (saved === "fr" || saved === "en") setLangState(saved);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function setLang(l: Lang) {
    setLangState(l);
    try {
      window.localStorage.setItem(KEY, l);
    } catch {
      // ignore
    }
  }

  const t = (key: keyof typeof STRINGS.fr) =>
    key === "catalogue.notice"
      ? STRINGS[lang][key].replace("{date}", formatDataDate(DATA_VERIFIED_ON, lang))
      : STRINGS[lang][key];

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}

/** Choix d'une chaîne selon la langue : pick(lang, fr, en) */
export function pick(lang: Lang, fr: string, en: string): string {
  return lang === "en" ? en : fr;
}
