# Moë Tea Room — écran caisse/cuisine (archive)

> **Ce dossier n'est plus déployé séparément.** Depuis Sept 2026, l'écran
> tourne en direct sur **moetearoom.pages.dev/screen**, protégé par un
> vrai login — voir `SUPABASE_SETUP.md` (étape 6) pour la configuration. Ce
> dossier reste comme copie source/archive ; si tu modifies l'écran,
> modifie aussi (ou surtout) `public/screen/index.html`.

Écran pour l'imprimante/tablette en salle : les commandes ET les
réservations passées sur le site (Supabase) apparaissent ici en direct, et
cet écran permet aussi de marquer un plat épuisé, changer son prix, ou
ajouter un tout nouveau plat — ça s'applique tout de suite sur la page Menu
que voient les clients.

C'est un seul fichier HTML, sans build ni dépendances — pensé pour rester
ouvert toute la journée sur un écran/tablette dédié dans le restaurant.

## Installation (5 minutes)

1. Utilisez le **même projet Supabase** que le site principal (voir
   `../SUPABASE_SETUP.md` du dossier `moetearoom`) — les deux doivent
   pointer vers le même projet pour que les commandes/réservations/le menu
   se synchronisent.
2. Ouvrez `index.html` dans un éditeur de texte, tout en haut dans la
   balise `<script>` : remplissez `supabaseUrl` et `supabaseAnonKey` (les
   mêmes valeurs que dans `site.config.ts`, jamais la clé `service_role`).
3. Déployez ce dossier comme site statique séparé (Cloudflare Pages, même
   méthode que pour le site principal) — ou ouvrez simplement `index.html`
   directement sur l'écran/tablette du restaurant si une connexion internet
   fixe est disponible.
4. Ouvrez la page sur l'écran de la cuisine/caisse et laissez-la affichée —
   elle se rafraîchit toute seule (commandes et réservations toutes les 4
   secondes, menu toutes les 12 secondes).

## Trois onglets

- **Commandes** — nouvelles / en préparation / prêtes, avec un bouton pour
  faire avancer une commande à l'étape suivante ou l'annuler.
- **Réservations** — les demandes faites sur le site apparaissent ici en
  "En attente" ; un badge rouge sur l'onglet indique le nombre en attente.
  Regroupées par jour, avec Confirmer/Refuser pour une demande en attente,
  Annuler pour une réservation déjà confirmée. Le bouton "+ Nouvelle
  réservation" permet d'ajouter directement une réservation prise par
  téléphone ou sur place — elle est enregistrée déjà confirmée (pas
  d'étape "en attente" pour celles-là, c'est le personnel qui confirme en
  la créant).
- **Menu** — deux parties :
  - la liste des plats existants du site ; décocher "Disponible" marque le
    plat épuisé sur le site, et changer le prix + "Enregistrer" met à jour
    le prix affiché aux clients immédiatement. Renommer un plat existant ou
    changer sa description n'est **pas** possible depuis cet écran — ça
    reste dans le code du site (demandez-le à Amplify) ;
  - "Plats ajoutés depuis cet écran" : le bouton "+ Ajouter un plat" crée
    un tout nouveau plat (nom, catégorie, prix, description) qui
    n'existait pas dans le code du site — il apparaît automatiquement sur
    la page Menu, dans une section "Nouveautés" (ou dans la catégorie
    existante si le nom tapé correspond exactement à une catégorie du
    site). Ces plats peuvent être marqués épuisés ou supprimés directement
    depuis cet écran, contrairement aux plats du code du site.

## À savoir

- La liste des plats existants en haut du fichier (`MENU_ITEMS`) est une
  copie de la vraie carte (`menu-highlights.ts` du site principal). Si un
  plat est renommé/ajouté/supprimé dans le CODE du site, il faut mettre à
  jour cette liste ici à la main — le nom exact du plat est ce qui relie
  les deux. Les plats ajoutés depuis cet écran (section séparée) n'ont pas
  ce problème : ils vivent entièrement dans Supabase.
- Un plat ajouté depuis cet écran n'est affiché qu'en français sur le
  site — pas de traduction EN/AR automatique, contrairement aux plats du
  code source. Une limite acceptable pour un ajout rapide/temporaire ; pour
  un plat durable, mieux vaut l'ajouter proprement dans le code (demandez
  à Amplify) pour qu'il ait ses trois langues comme le reste du menu.
- Sur `moetearoom.pages.dev/screen` (la version réellement en ligne),
  l'écran est protégé par un login (voir `SUPABASE_SETUP.md`, étape 6). Ce
  fichier archivé ici, s'il est un jour redéployé séparément de son côté,
  n'a PAS cette protection intégrée — il faudrait la remettre en place.
