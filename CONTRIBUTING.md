# Contribuer

## Démarrer

```sh
nvm use          # Node 22
npm install
npm run dev      # http://localhost:5173
npm run check    # format, lint, typecheck, tests
```

## Mettre à jour le catalogue

1. Vérifier prix et capacités sur les pages officielles listées dans `src/data/sources.ts`.
2. Modifier `src/data/models.ts` (FR), puis `src/data/en.ts` (EN) avec les mêmes identifiants.
3. Adapter `src/data/parcours.ts` si une question cite un modèle modifié.
4. Mettre à jour `DATA_VERIFIED_ON` dans `src/data/sources.ts`.
5. Lancer `npm test` : les tests contrôlent l'alignement FR/EN, les efforts supportés et le score maximal (8 points par scénario).

Les promotions utilisent `promo.until` (jour UTC inclus) : le prix bascule le lendemain à 00:00 UTC.

## Conventions

- Prettier fait foi (`npm run format`). Pas de commentaire qui répète le code.
- Un commit = un sujet. Message court à l'impératif, en français ou en anglais.
- Toute chaîne visible existe en FR et en EN.
- Changer le nombre de scénarios impose de mettre à jour la contrainte `max_score = 64` du classement.
