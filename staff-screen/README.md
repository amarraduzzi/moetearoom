# Moë Tea Room — écran caisse/cuisine

Écran pour l'imprimante/tablette en salle : les commandes passées sur le
site (WhatsApp + Supabase) apparaissent ici en direct, et cet écran permet
aussi de marquer un plat épuisé ou de changer son prix — ça s'applique tout
de suite sur la page Menu que voient les clients.

C'est un seul fichier HTML, sans build ni dépendances — pensé pour rester
ouvert toute la journée sur un écran/tablette dédié dans le restaurant.

## Installation (5 minutes)

1. Utilisez le **même projet Supabase** que le site principal (voir
   `../SUPABASE_SETUP.md` du dossier `moerabat`) — les deux doivent pointer
   vers le même projet pour que les commandes/le menu se synchronisent.
2. Ouvrez `index.html` dans un éditeur de texte, tout en haut dans la
   balise `<script>` : remplissez `supabaseUrl` et `supabaseAnonKey` (les
   mêmes valeurs que dans `site.config.ts`, jamais la clé `service_role`).
3. Déployez ce dossier comme site statique séparé (Cloudflare Pages, même
   méthode que pour le site principal) — ou ouvrez simplement `index.html`
   directement sur l'écran/tablette du restaurant si une connexion internet
   fixe est disponible.
4. Ouvrez la page sur l'écran de la cuisine/caisse et laissez-la affichée —
   elle se rafraîchit toute seule (commandes toutes les 4 secondes, menu
   toutes les 12 secondes).

## Deux onglets

- **Commandes** — nouvelles / en préparation / prêtes, avec un bouton pour
  faire avancer une commande à l'étape suivante ou l'annuler.
- **Menu** — la liste des plats ; décocher "Disponible" marque le plat
  épuisé sur le site, et changer le prix + "Enregistrer" met à jour le prix
  affiché aux clients immédiatement.

## À savoir

- La liste des plats en haut du fichier (`MENU_ITEMS`) est une copie de la
  vraie carte (`menu-highlights.ts` du site principal). Si un plat est
  renommé/ajouté/supprimé sur le site, il faut mettre à jour cette liste ici
  à la main — le nom exact du plat est ce qui relie les deux.
- Pas de connexion/mot de passe dans cette v1 : quiconque a l'URL de cet
  écran peut changer le menu ou les statuts de commande. Convient pour un
  écran physique dans un espace non accessible aux clients ; si l'écran
  doit être accessible depuis n'importe où, il faudra ajouter une
  authentification avant de le déployer publiquement.
