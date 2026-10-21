# Changelog

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/).

## [Non publié]

### Ajouté

- Teasing de Mistral Large 4 (bandeau d'accueil et carte « Bientôt » dans le guide), hors quiz, simulateur et parcours.
- Bouton Débutant/Expert dans la barre de navigation : masque ou dévoile prix, contexte, paramètres, multiplicateurs d'effort et formule de coût.
- Quiz mélangé à chaque partie (ordre des scénarios, des fournisseurs et des modèles).
- Page Mentions légales (FR/EN), lien dans le pied de page, avertissement quand les données ont plus de 90 jours.
- Détail entrée/sortie du coût dans le simulateur (mode Expert).

### Modifié

- Polices auto-hébergées (Fontsource) : plus aucune requête vers Google Fonts.
- Logos des fournisseurs avec repli sur un glyphe si le service de favicons est bloqué.
- Page Scores : mention que le classement est déclaratif.

## [1.0.0] - 2026-10-21

### Ajouté

- Quiz de 8 scénarios, simulateur, parcours en 4 niveaux et guide de 8 fournisseurs et 23 modèles.
- Interface FR/EN et 4 thèmes visuels.
- Classement en ligne optionnel (Supabase) avec contraintes SQL.
- Promotions tarifaires à expiration automatique (Gemini 4 Argon, Gemini 3.8 Flash).
- Tests d'intégrité des données, de notation, de coût et du classement. CI GitHub Actions.

### Données

- Catalogue vérifié le 21 octobre 2026 : DeepSeek V4.1 Flash (snapshot 1017), Mistral Large 4 annoncé pour fin octobre.
