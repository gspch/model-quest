export interface Question {
  prompt: string;
  options: string[];
  answer: number;
  simple: string;
  tech: string;
}

export interface Level {
  id: number;
  name: string;
  tagline: string;
  questions: Question[];
}

export const LEVELS: Level[] = [
  {
    id: 1,
    name: "Le provider",
    tagline: "Chaque fournisseur a sa personnalité",
    questions: [
      {
        prompt:
          "Vous devez analyser des heures de vidéo de formation. Quel provider a un avantage décisif ?",
        options: ["OpenAI", "Google (Gemini)", "DeepSeek", "Meta (Llama)"],
        answer: 1,
        simple: "Gemini comprend la vidéo et l'audio nativement : c'est son super-pouvoir.",
        tech: "Gemini est le seul à ingérer vidéo et audio nativement dans la gamme comparée ici, sans conversion externe.",
      },
      {
        prompt:
          "Des données de santé françaises ne doivent jamais quitter l'UE. Le choix le plus simple ?",
        options: ["OpenAI", "DeepSeek", "Mistral AI", "Google"],
        answer: 2,
        simple: "Mistral est français et héberge en Europe : la conformité devient simple.",
        tech: "Mistral Large 3 : hébergement UE et poids Apache 2.0 auto-hébergeables. Les exigences de santé et sécurité restent à valider.",
      },
      {
        prompt:
          "Vous voulez le meilleur raisonnement possible à petit prix, sans contrainte de conformité.",
        options: ["DeepSeek", "Anthropic", "Meta (Llama)", "Mistral AI"],
        answer: 0,
        simple:
          "DeepSeek offre un raisonnement de haut niveau pour une fraction du prix des autres.",
        tech: "DeepSeek V4 Pro : 0,66/1,98 $ hors pointe, effort high, tarifs doublés aux heures de pointe.",
      },
    ],
  },
  {
    id: 2,
    name: "Le modèle",
    tagline: "Petit et rapide, ou gros et puissant ?",
    questions: [
      {
        prompt: "50 000 questions simples par jour sur un support client. Quel type de modèle ?",
        options: [
          "Flagship, pour être sûr",
          "Petit modèle rapide",
          "Le plus gros contexte possible",
        ],
        answer: 1,
        simple:
          "Des questions simples n'ont pas besoin d'un gros cerveau : un petit modèle coûte 10 à 50× moins cher.",
        tech: "Tâches simples + haut volume = GPT-6 Luna, Claude Haiku 5.5 ou Mistral Small 4, effort none.",
      },
      {
        prompt:
          "Détecter des clauses à risque dans des contrats de 300 pages, sans droit à l'erreur.",
        options: ["Petit modèle rapide", "Modèle moyen", "Flagship haut de gamme"],
        answer: 2,
        simple: "Quand l'erreur coûte des millions, on prend le meilleur modèle disponible.",
        tech: "Flagship + grande fenêtre de contexte (quantité de texte lisible d'un coup) : le coût est négligeable face au risque juridique.",
      },
      {
        prompt:
          "Résumer des articles de presse en 3 phrases, à la volée, pour des millions de lecteurs.",
        options: ["Flagship", "Petit modèle rapide", "Modèle de raisonnement"],
        answer: 1,
        simple:
          "Résumer est facile : un petit modèle rapide suffit largement et tient la latence (délai de réponse).",
        tech: "Latence < 1s + volume massif : modèle 'fast'. Le raisonnement n'apporte rien au résumé simple.",
      },
    ],
  },
  {
    id: 3,
    name: "L'effort",
    tagline: "Faire réfléchir le modèle… ou pas",
    questions: [
      {
        prompt:
          "Que se passe-t-il quand on augmente l'effort de raisonnement (temps de réflexion interne du modèle) ?",
        options: [
          "Qualité ↑, coût ↑, latence ↑",
          "Qualité ↑, coût ↓, latence ↓",
          "Qualité ↓, coût ↑, latence ↑",
        ],
        answer: 0,
        simple:
          "Faire réfléchir le modèle améliore la qualité, mais coûte plus cher et prend plus de temps.",
        tech: "Le raisonnement génère des tokens internes (morceaux de texte de réflexion) : +coût, +latence, +fiabilité sur les tâches difficiles.",
      },
      {
        prompt:
          "GPT-6 Luna répond « bonjour, quel est votre numéro de commande ? ». Effort recommandé ?",
        options: ["Élevé", "Moyen", "Aucun"],
        answer: 2,
        simple: "Pour des réponses simples et scriptées, le raisonnement est du gaspillage pur.",
        tech: "Effort 'none' : latence minimale, coût de base. Le raisonnement n'apporte rien aux réponses directes.",
      },
      {
        prompt: "Résoudre un problème de maths niveau olympiades. Effort recommandé ?",
        options: ["Aucun", "Faible", "Élevé"],
        answer: 2,
        simple:
          "Les problèmes très difficiles exigent une réflexion profonde : c'est là que l'effort élevé brille.",
        tech: "Maths/code difficiles : l'effort 'high' améliore drastiquement le taux de réussite.",
      },
    ],
  },
  {
    id: 4,
    name: "Le combo complet",
    tagline: "Provider + modèle + effort, d'un coup",
    questions: [
      {
        prompt:
          "Assistant de code pour refactorer une base vieille de 15 ans. Le meilleur combo parmi ces options ?",
        options: [
          "Mistral Small 4, effort aucun",
          "Claude Sonnet 5.5 ou GPT-6.1 Sol, effort élevé",
          "Ministral 3 8B, effort aucun",
        ],
        answer: 1,
        simple:
          "Le code difficile demande un excellent modèle avec beaucoup de réflexion. Un bug évité paie le surcoût.",
        tech: "Flagship ou raisonnement + effort 'high' : la chaîne de pensée (raisonnement interne étape par étape) excelle en code.",
      },
      {
        prompt:
          "Appli mobile hors-ligne qui résume des notes. Quel combo peut fonctionner localement parmi ces options ?",
        options: [
          "GPT-6 Astra, effort moyen",
          "Gemini 3.8 Flash, effort faible",
          "Ministral 3 8B open weights (poids téléchargeables), effort aucun",
        ],
        answer: 2,
        simple:
          "Sans internet, il faut un modèle téléchargeable qui tourne sur l'appareil : un petit modèle ouvert.",
        tech: "Ministral 3 8B, Apache 2.0 ; quantification (compression) et mémoire disponible à tester sur le téléphone.",
      },
      {
        prompt: "Indexer des milliers d'heures de vidéos de cours. Le combo gagnant ?",
        options: [
          "Gemini 4 Argon, effort moyen",
          "Claude Haiku 5.5, effort élevé",
          "DeepSeek V4.1 Flash, effort faible",
        ],
        answer: 0,
        simple:
          "Gemini lit la vidéo nativement : pas de conversion, pas de pipeline fragile. Effort moyen pour un bon chapitrage.",
        tech: "Gemini 4 Argon lit vidéo et audio nativement dans la gamme comparée ici. Effort medium pour le chapitrage.",
      },
    ],
  },
];
