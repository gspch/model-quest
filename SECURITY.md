# Sécurité

## Signaler une vulnérabilité

Ouvrez un [signalement privé](https://github.com/gspch/model-quest/security/advisories/new) plutôt qu'une issue publique.
Réponse visée sous 7 jours.

## Périmètre

- L'application ne stocke aucun compte ni donnée personnelle. Les scores locaux restent dans le `localStorage` du navigateur.
- Le classement en ligne est optionnel. Il n'utilise que la clé publique (`anon`) de Supabase, protégée par la sécurité par ligne et des contraintes SQL (voir `supabase/migrations`).
- Le classement est déclaratif : un joueur peut envoyer un score arbitraire entre 0 et 64. Ce n'est pas une faille, c'est une limite connue.
- Ne commitez jamais de clé privée (`service_role`) ni de fichier `.env`.
