// Mentions légales : contenu FR/EN. Dernière mise à jour à tenir à jour avec le texte.
export const LEGAL_UPDATED_ON = "2026-10-21";

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface LegalContent {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}

const REPO = "https://github.com/gspch/model-quest";

export const LEGAL: Record<"fr" | "en", LegalContent> = {
  fr: {
    title: "Mentions légales",
    intro:
      "Informations prévues par l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN) et par le règlement général sur la protection des données (RGPD).",
    updated: "Dernière mise à jour : 21 octobre 2026.",
    sections: [
      {
        id: "editeur",
        title: "1. Éditeur du site",
        paragraphs: [
          "Le site model.quest est édité à titre personnel et non commercial par Gaspard Chameroy, personne physique.",
          "Directeur de la publication : Gaspard Chameroy.",
          `Contact : par un ticket public sur ${REPO}/issues. Aucune adresse postale n'est affichée : l'éditeur, personne physique non professionnelle, peut garder son domicile confidentiel en application de l'article 6, III, 2° de la LCEN, sous réserve d'avoir communiqué ses éléments d'identification à l'hébergeur.`,
        ],
      },
      {
        id: "hebergement",
        title: "2. Hébergement et services techniques",
        paragraphs: [
          "Hébergeur du site : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis (https://vercel.com).",
          "Base de données du classement : Supabase (Supabase, Inc.), https://supabase.com.",
          `Code source : hébergé sur GitHub (GitHub, Inc.), ${REPO}.`,
          "Les hébergeurs peuvent enregistrer des journaux techniques (adresse IP, date, page demandée, navigateur) pour assurer la sécurité et le fonctionnement du service, selon leurs propres politiques de confidentialité.",
        ],
      },
      {
        id: "propriete",
        title: "3. Propriété intellectuelle",
        paragraphs: [
          "Le code source et les textes du dépôt sont publiés sous licence MIT (voir le fichier LICENSE du dépôt). Vous pouvez les réutiliser en conservant la mention de licence et de copyright.",
          "Les noms, marques et logos des fournisseurs cités (OpenAI, Google, Anthropic, DeepSeek, Mistral AI, Meta, Alibaba, Cohere) appartiennent à leurs titulaires respectifs. Ils sont affichés à seule fin d'identification. Ce site n'est affilié à aucun d'eux, ne reçoit aucun partenariat ni rémunération de leur part.",
          "Polices Space Grotesk et JetBrains Mono, distribuées sous licence SIL Open Font License 1.1 et auto-hébergées via le paquet Fontsource.",
        ],
      },
      {
        id: "donnees",
        title: "4. Données personnelles",
        paragraphs: [
          "Responsable du traitement : Gaspard Chameroy (coordonnées à la section 1).",
          "Le site ne demande aucun compte et ne collecte aucune donnée sans action de votre part. Seule la publication volontaire d'un score au classement enregistre : le pseudo saisi (30 caractères maximum), le score, le titre de rang obtenu et la date. Ces données sont publiques : tout visiteur de la page Scores peut les lire. N'utilisez pas votre nom réel ni de donnée identifiante.",
          "Base légale : votre consentement, donné en cliquant sur le bouton de publication (article 6, 1, a du RGPD). Vous pouvez retirer ce consentement à tout moment.",
          "Durée de conservation : tant que le classement est en ligne, ou jusqu'à votre demande de suppression.",
          "Destinataires : le public (classement) et le prestataire de base de données Supabase en tant que sous-traitant. Les prestataires étant établis ou pouvant traiter des données hors de l'Union européenne, des transferts vers les États-Unis peuvent avoir lieu, encadrés par les mécanismes prévus par le RGPD (clauses contractuelles types, cadre de protection des données UE-États-Unis) selon les prestataires.",
          `Vos droits : accès, rectification, effacement, limitation, opposition et portabilité. Pour les exercer, ouvrez un ticket sur ${REPO}/issues en indiquant votre pseudo exact et le score concerné, sans autre donnée personnelle.`,
          "Réclamation : vous pouvez saisir la CNIL (https://www.cnil.fr) si vous estimez que vos droits ne sont pas respectés.",
          "Services tiers : l'affichage des logos des fournisseurs interroge le service de favicons de Google (www.google.com/s2/favicons), qui reçoit votre adresse IP et le nom de domaine du logo demandé. Si ce service est bloqué, une pastille de repli s'affiche. Aucune police n'est chargée depuis un service tiers.",
          "Le site n'utilise aucun outil de mesure d'audience, aucun traceur publicitaire et aucun cookie.",
        ],
      },
      {
        id: "stockage",
        title: "5. Stockage local du navigateur",
        paragraphs: [
          "Pour fonctionner, le site enregistre dans le navigateur (localStorage) vos préférences d'interface et votre progression : langue, ambiance de couleurs, niveau Débutant ou Expert, meilleur score et niveaux du parcours débloqués. Ces données restent sur votre appareil, ne sont envoyées à personne et sont nécessaires à un service que vous demandez. Elles ne requièrent pas de consentement. Vous pouvez les effacer depuis les réglages de votre navigateur.",
        ],
      },
      {
        id: "responsabilite",
        title: "6. Responsabilité et limites",
        paragraphs: [
          "Les prix, capacités et comparaisons du catalogue sont indicatifs, établis à partir de sources publiques à la date indiquée en bas de page. Les tarifs et modèles évoluent vite : vérifiez toujours les pages officielles des fournisseurs avant toute décision. Le contenu ne constitue ni un conseil financier, ni un conseil juridique, ni un engagement contractuel.",
          "Les modèles annoncés mais non publiés (« Bientôt ») sont signalés comme tels : leurs caractéristiques et leurs dates ne sont pas confirmées.",
          "Le classement est déclaratif : les scores sont envoyés par le navigateur du joueur et ne sont pas vérifiés. Un score affiché ne prouve pas qu'il a été obtenu loyalement.",
          "Le site est fourni sans garantie de disponibilité ni d'absence d'erreur. L'éditeur n'est pas responsable du contenu des sites externes vers lesquels des liens pointent.",
        ],
      },
      {
        id: "accessibilite",
        title: "7. Accessibilité",
        paragraphs: [
          `Le site vise un usage au clavier, des contrastes lisibles et le respect de la préférence « réduire les animations ». Pour signaler un défaut d'accessibilité, ouvrez un ticket sur ${REPO}/issues.`,
        ],
      },
      {
        id: "droit",
        title: "8. Droit applicable",
        paragraphs: [
          "Les présentes mentions et l'utilisation du site sont soumises au droit français. En cas de litige, et à défaut de règlement amiable, les juridictions françaises sont compétentes, sous réserve des règles impératives applicables aux consommateurs.",
        ],
      },
      {
        id: "credits",
        title: "9. Crédits",
        paragraphs: [
          "Construit avec TanStack Start, React, Tailwind CSS, Vite, Vitest et Supabase. Déployé sur Vercel.",
        ],
      },
    ],
  },
  en: {
    title: "Legal notice",
    intro:
      "Information required by article 6 of the French law n° 2004-575 of 21 June 2004 on trust in the digital economy (LCEN) and by the General Data Protection Regulation (GDPR).",
    updated: "Last updated: 21 October 2026.",
    sections: [
      {
        id: "editeur",
        title: "1. Site publisher",
        paragraphs: [
          "model.quest is published on a personal, non-commercial basis by Gaspard Chameroy, a private individual.",
          "Publication director: Gaspard Chameroy.",
          `Contact: through a public issue at ${REPO}/issues. No postal address is shown: as a non-professional individual, the publisher may keep a home address confidential under article 6, III, 2° of the LCEN, provided identification details have been given to the host.`,
        ],
      },
      {
        id: "hebergement",
        title: "2. Hosting and technical services",
        paragraphs: [
          "Site host: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA (https://vercel.com).",
          "Leaderboard database: Supabase (Supabase, Inc.), https://supabase.com.",
          `Source code: hosted on GitHub (GitHub, Inc.), ${REPO}.`,
          "Hosts may keep technical logs (IP address, date, requested page, browser) to secure and operate the service, under their own privacy policies.",
        ],
      },
      {
        id: "propriete",
        title: "3. Intellectual property",
        paragraphs: [
          "The source code and texts in the repository are published under the MIT license (see the LICENSE file). You may reuse them provided you keep the license and copyright notice.",
          "Names, trademarks and logos of the providers mentioned (OpenAI, Google, Anthropic, DeepSeek, Mistral AI, Meta, Alibaba, Cohere) belong to their respective owners. They appear for identification only. This site is not affiliated with any of them and receives no partnership or payment from them.",
          "Space Grotesk and JetBrains Mono fonts, distributed under the SIL Open Font License 1.1 and self-hosted through the Fontsource package.",
        ],
      },
      {
        id: "donnees",
        title: "4. Personal data",
        paragraphs: [
          "Data controller: Gaspard Chameroy (contact in section 1).",
          "The site requires no account and collects nothing without an action from you. Only the voluntary publication of a score to the leaderboard stores: the nickname you type (30 characters max), the score, the rank title earned and the date. This data is public: any visitor to the Scores page can read it. Do not use your real name or any identifying data.",
          "Legal basis: your consent, given by clicking the publish button (GDPR article 6(1)(a)). You may withdraw it at any time.",
          "Retention: as long as the leaderboard is online, or until you ask for deletion.",
          "Recipients: the public (leaderboard) and the database provider Supabase as a processor. As providers are established or may process data outside the European Union, transfers to the United States may occur, covered by the mechanisms provided by the GDPR (standard contractual clauses, EU-US data privacy framework) depending on the provider.",
          `Your rights: access, rectification, erasure, restriction, objection and portability. To exercise them, open an issue at ${REPO}/issues stating your exact nickname and the score concerned, without any other personal data.`,
          "Complaint: you may contact the CNIL (https://www.cnil.fr) if you believe your rights are not respected.",
          "Third-party services: displaying provider logos queries Google's favicon service (www.google.com/s2/favicons), which receives your IP address and the domain of the requested logo. If that service is blocked, a fallback badge is shown. No font is loaded from a third-party service.",
          "The site uses no analytics tool, no advertising tracker and no cookie.",
        ],
      },
      {
        id: "stockage",
        title: "5. Browser local storage",
        paragraphs: [
          "To work, the site saves in your browser (localStorage) your interface preferences and progress: language, color ambience, Beginner or Expert level, best score and unlocked journey levels. This data stays on your device, is sent to nobody, and is necessary for a service you requested. It does not require consent. You can erase it from your browser settings.",
        ],
      },
      {
        id: "responsabilite",
        title: "6. Liability and limits",
        paragraphs: [
          "Prices, capabilities and comparisons in the catalogue are indicative, based on public sources at the date shown in the footer. Prices and models change fast: always check the providers' official pages before any decision. The content is not financial advice, legal advice or a contractual commitment.",
          "Announced but unreleased models (“Soon”) are flagged as such: their specifications and dates are unconfirmed.",
          "The leaderboard is self-reported: scores are sent by the player's browser and are not verified. A displayed score does not prove it was earned fairly.",
          "The site is provided without any guarantee of availability or absence of errors. The publisher is not responsible for the content of external sites that are linked.",
        ],
      },
      {
        id: "accessibilite",
        title: "7. Accessibility",
        paragraphs: [
          `The site aims for keyboard use, readable contrast and respect of the “reduce motion” preference. To report an accessibility issue, open an issue at ${REPO}/issues.`,
        ],
      },
      {
        id: "droit",
        title: "8. Governing law",
        paragraphs: [
          "This notice and the use of the site are governed by French law. In case of dispute, and failing an amicable settlement, French courts have jurisdiction, subject to mandatory consumer protection rules.",
        ],
      },
      {
        id: "credits",
        title: "9. Credits",
        paragraphs: [
          "Built with TanStack Start, React, Tailwind CSS, Vite, Vitest and Supabase. Deployed on Vercel.",
        ],
      },
    ],
  },
};
