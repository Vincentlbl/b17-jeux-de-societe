# Carnet de bord J1 · Appareillage


Un carnet par binôme, rempli au fil de l'eau avec vos propres mots. Une phrase honnête (« j'ai essayé X, j'ai vu Y, je ne comprends pas pourquoi ») vaut mieux qu'une phrase parfaite recopiée. Aucune donnée personnelle, aucune clé ni jeton, ni l'adresse complète que `dsh web` affiche (elle contient un jeton). C'est aussi votre journal de décisions (astuce 13) : ce que vous avez demandé, ce qui a cassé, ce que vous avez refusé, et pourquoi.

Binôme : b17 — Vincent Lebel et Sami Hamizi

Thème provisoire et public visé : Assistant de jeux de société qui explique les règles et arbitre les désaccords, pour des joueurs autour d'une table.

Trois questions auxquelles l'assistant pourrait répondre :
1. Explique-moi les règles de ce jeu
2. Est-il possible de faire cette action dans le jeu ?
3. Que se passe-t-il en cas d'égalité ?

Rôles de départ et moments d'échange : Vincent manipule, Sami vérifie ; on échange toutes les 20 minutes (à 14h30, 14h50…).

## Cahier personnel (remis par le formateur en J1-01)

Recopiez les valeurs telles que le formateur vous les a remises. Ne les changez pas, ne les échangez pas avec un autre binôme.

- Limite de caractères d'un message (le nombre N) : 190
- Premier mot reconnu, en plus de « salut », « aide » et « test » : ponton
- Second mot reconnu : lanterne

## Commandes essayées

Notez le dossier de lancement, la commande et sa sortie exacte, surtout quand un outil a bloqué.

- Dossier : 
- Commande et résultat :

Pour chaque checkpoint : cochez la case quand toute la preuve de la fiche est réunie, collez la preuve (texte, commande ou phrase), puis notez ce que vous avez prédit, essayé, observé, et une difficulté qui reste.

## Le chat web (N0 Subir)

### J1-01 · 🧭 Équipage — [fiche](checkpoints/J1-01-equipage.md)

- [ ] Validé
- Preuve (page de départ affichée sur votre poste, cahier personnel recopié ci-dessus) :
- Le `p#status` est-il vide dans le HTML ? Qui écrit sa phrase ?
- Décision prise ensemble :
- Difficulté qui reste :

### J1-02 · 💬 Premier prompt — [fiche](checkpoints/J1-02-premier-prompt.md)

- [x] Validé
- Preuve : page de départ affichée sur http://127.0.0.1:3000, cahier personnel recopié plus haut.
- Le `p#status` est-il vide dans le HTML ? Oui, il est vide dans index.html. C'est app.js qui écrit sa phrase (« Votre point de départ est prêt. ») avec document.querySelector('#status').textContent.
- Décision prise ensemble : thème jeux de société.
- Difficulté qui reste : aucune 


### J1-03 · 💥 Ça marche… jusqu'à quand — [fiche](checkpoints/J1-03-jusqua-quand.md)
- [x] Validé
- Liste de contrôle de la version 1 (cinq à huit comportements essayés) :
  1. Entrée envoie le message
  2. Le message apparaît dans la liste (bulle à droite)
  3. Le bot répond après un petit délai
  4. « règles du Uno » donne les règles du Uno
  5. « regle » sans accent est compris
  6. Un message hors thème donne le message de repli
  7. Un message vide n'ajoute rien
  8. Le titre du bandeau est « 🎲 Chatbot Jeux de société »
- Journal des régressions, une entrée par modification : ce que j'ai demandé · ce qui marche maintenant · ce qui marchait et ne marche plus · ce que je n'avais pas vu, et comment je l'ai trouvé.
  - Modification 1 :
    - Demandé : Ajoute un bouton « Effacer » qui vide la conversation. Redonne-moi le fichier complet. (chatbot-v2.html)
    - Ce qui marche maintenant : le bouton « Effacer » du bandeau vide la liste et réaffiche le message d'accueil.
    - Ce qui marchait avant et ne marche plus : rien. J'ai retesté les 8 lignes de la liste, et comparé v1 et v2 avec `diff` (seuls le bandeau et le script ont changé).
    - Ce que je n'avais pas vu, et comment je l'ai trouvé : le chat a aussi changé le style du bandeau (flex) pour placer le bouton, et il a décidé tout seul de réafficher l'accueil après l'effacement ; vu avec `diff`.
  - Modification 2 :
    - Demandé : Garde les messages quand je recharge la page (F5). Redonne-moi le fichier complet. (chatbot-v3.html)
    - Ce qui marche maintenant : après F5, la conversation revient ; « Effacer » vide aussi la mémoire.
    - Ce qui marchait avant et ne marche plus : rien sur les 8 lignes.
    - Ce que je n'avais pas vu, et comment je l'ai trouvé : la conversation est enregistrée sous une clé de `localStorage` partagée entre les pages ouvertes en fichier, donc v4 s'ouvre avec la conversation de v3 (vu dans F12, Application, Local Storage).
  - Modification 3 :
    - Demandé : Refuse d'envoyer un message vide. Redonne-moi le fichier complet. (chatbot-v4.html)
    - Ce qui marche maintenant : un message vide ou fait d'espaces affiche en rouge « Écris un message avant d'envoyer. » et rien n'est ajouté.
    - Ce qui marchait avant et ne marche plus : rien. Mais la v1 ignorait déjà le message vide : la ligne 7 de ma liste était déjà vraie, la modification a seulement ajouté un message visible.
    - Ce que je n'avais pas vu, et comment je l'ai trouvé : le message rouge reste affiché tant que je n'envoie pas un message valide, même si je tape du texte ou si je clique sur « Effacer » ; vu en testant dans la page.
- Chasse à l'angle mort (ce qui a été trouvé, et par qui) : (par Vincent et Sami, sur chatbot-v4.html)
  - `<b>gras</b>` s'affiche tel quel, pas en gras (le texte passe par `textContent`).
  - Un message de 500 caractères est accepté sans limite ; un mot très long sans espace dépasse de la bulle.
  - Deux envois très rapides : les deux messages s'ajoutent, les réponses arrivent après 400 ms.
  - Valeur abîmée `{pas du json` dans `chatbot-jeux-messages` : la page s'ouvre quand même avec l'accueil (le `try/catch` la rattrape).
  - Valeur `{}` dans la même clé : la page ne réaffiche plus la conversation et l'envoi d'un message ne marche plus (erreur dans la console, F12). C'est le défaut le plus grave trouvé.
- Deux phrases de conclusion : La modification 2 (mémoire) a le plus cassé de choses : elle a rendu la page fragile face à une valeur inattendue dans `localStorage`. Sans ma liste de contrôle et la chasse à l'angle mort, je ne l'aurais pas vu, parce que la nouveauté marchait et que le plantage n'apparaît qu'avec une valeur que personne ne tape à la main.
- Difficulté qui reste : <ce qui t'a bloqué, ou « aucune »>

### J1-04 — Même prompt, trois fois

**Prompt de référence (identique pour les trois essais) :**
```text
fais-moi un chatbot sur les jeux de société, dans une seule page HTML que j'ouvre dans mon navigateur.
```

**Fichiers :** `essais-n0/essai-A.html` (BoardBot), `essai-B.html` (Ludo), `essai-C.html` (Meeple).
Trois conversations neuves, sans correction. Les réponses viennent de Claude (pas de Mistral).

| Critère | A (BoardBot) | B (Ludo) | C (Meeple) |
|---|---|---|---|
| Taille du fichier | 323 lignes | 452 lignes | 618 lignes |
| Usages de `innerHTML` | 2 | 0 | 3 |
| Message vide / espaces | ignoré | ignoré | ignoré |
| Question sur le thème (« règles de Catan ») | fiche Catan | règles de Catan | règles de Catan |
| Question hors thème (capitale de la France) | « Je n'ai pas bien compris » + 3 suggestions | « Je n'ai pas bien compris » + suggestions | « Je n'ai pas bien compris » + suggestions |
| Messages après F5 | perdus (7 → 1) | perdus (7 → 1) | perdus (7 → 1) |
| Injection `<img onerror>` tapée dans le champ | inerte | inerte | inerte |
| Affichage à 360 px | bouton « Envoyer » coupé (débordement de 46 px) | OK | OK |
| Requêtes réseau, erreurs console | aucune | aucune | aucune |

**Ce qui varie d'un essai à l'autre :** le nombre de lignes (323 / 452 / 618), le nom du bot et la structure (critères mémorisés et pastilles cliquables en C, boutons de suggestion en A et B).

**Ce qui ne varie pas :** aucun des trois ne garde l'historique après F5, et chacun répond au hors-thème par une phrase d'incompréhension suivie de suggestions.

**Conclusion :** avec le même prompt, trois essais donnent trois programmes différents mais identiques sur ce que le prompt n'a pas demandé (sauvegarde, limite de longueur), donc ce qu'on ne précise pas, on ne l'obtient pas.

**Difficulté / limites :** je n'ai pas relu le code ligne par ligne. Les tests ont été faits dans Chromium sans interface (le navigateur tourne sans fenêtre). Mon petit script de mesure repère les messages par leur classe CSS (`.msg` ou `.row`).

## L'agent (N1 Demander)

### J1-05 · 🛠 dsh en main — [fiche](checkpoints/J1-05-dsh-en-main.md)

- Preuve : `dsh --version` → `0.1.5-rc.2` ; session ouverte sur le dossier `atelier`, mode Read Only, modèle `capweb-ia` ; `git status -- atelier` → `nothing to commit, working tree clean` avant et après. Test de la barrière : au premier essai, j'ai cliqué « Allow » par erreur et l'agent a créé `public/essai-dsh.txt` ; je l'ai supprimé à la main, puis refait le test en cliquant « Reject » sur la demande `escalate sandbox to workspace-write: Création du fichier public/essai-dsh.txt demandé par l'utilisateur.` ; `git status -- atelier` est resté propre. La clé n'est que dans `~/dsh-capweb/.credentials.yaml` (jamais ici).

### J1-06 · 🧱 Anatomie d'un prompt — [fiche](checkpoints/J1-06-anatomie-dun-prompt.md)

- [ ] Validé
- Preuve (deux prompts, deux résultats, grille remplie, commit du squelette) :
- Prompt vague et ce que montre la page (trois lignes, fichiers touchés) :
- Prompt structuré, en six parties, tel qu'envoyé :
- Les hypothèses de l'agent, et ma réponse :
- La grille (✔ ou ✘ et un mot, pour « vague » puis « structuré ») :
- Une phrase : entre les deux résultats, ce qui a le plus changé, c'est… parce que la partie… de mon prompt disait…
- Difficulté qui reste :

### J1-07 · 👣 Petits pas — [fiche](checkpoints/J1-07-petits-pas.md)

- [ ] Validé
- Preuve (découpage écrit avant la première demande, trois diffs relus, un refus écrit, un commit par étape acceptée, trois boutons de questions qui fonctionnent) :
- La tâche, mes trois questions et mon découpage en trois étapes (écrit avant la première demande d'écriture) :
- Ce que l'agent a proposé comme découpage, ce que j'ai gardé, pourquoi :
- Mon refus écrit : ce que l'agent avait fait, pourquoi je le refuse, ce que j'ai demandé à la place :
- Difficulté qui reste :

**Journal des décisions.** Une ligne par demande faite à l'agent, de J1-07 à J1-09 (les trois étapes de J1-07, puis la correction de J1-08, puis les six demandes de J1-09) : la demande copiée, le diff relu (fichiers, nombre de lignes, une chose que je n'avais pas demandée ?), le verdict et pourquoi.

| N° | Demande | Diff relu | Verdict et pourquoi |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |
| 7 | | | |
| 8 | | | |
| 9 | | | |
| 10 | | | |

### J1-08 · 🔎 Revue de la page — [fiche](checkpoints/J1-08-revue-de-la-page.md)

- [ ] Validé
- Preuve (trois défauts, un corrigé avec son avant et son après, diff relu, revue adverse vérifiée) :
- Mes défauts, un par ligne :

  | Lentille (structure, clavier, écrans) | Où (élément ou fichier) | Comment je l'ai vu |
  |---|---|---|
  | | | |
  | | | |
  | | | |

- La revue adverse : trois affirmations de l'agent, la référence qu'il a donnée (fichier, ligne), mon verdict (vrai, faux, rejeté sans référence) et comment j'ai vérifié :
- Le défaut corrigé : l'avant (capture ou valeur), ma demande ciblée (copiée), le diff relu (fichiers, lignes, changement non demandé ?), l'après (même geste, même mesure) :
- Difficulté qui reste :

### J1-09 · 🧠 Un cerveau à règles, par prompts — [fiche](checkpoints/J1-09-cerveau-a-regles.md)

- [ ] Validé
- Preuve (comportements vérifiés : « Vous : … », message vide, `<b>gras</b>`, mes deux mots, ma limite ; `/js/brain.js` et `/js/view.js` affichés ; F5 ; « Effacer ») :
- Mes six demandes et leurs verdicts : dans le journal des décisions ci-dessus.
- Le rôle de chaque fichier, en une phrase chacun :
  - `app.js` :
  - `brain.js` :
  - `view.js` :
- Ce que j'ai vu quand j'ai mis `{pas du json` dans la mémoire :
- Difficulté qui reste :

### J1-10 · 🧪 Épreuve de l'explication — [fiche](checkpoints/J1-10-epreuve-explication.md)

- [ ] Validé
- Preuve (`npm test` vert avec cinq tests dont ma limite, commit de sauvegarde, remise faite) :
- Le test rouge : son nom, son message exact, et ce qu'il m'a appris :
- Épreuve de l'explication, éditeur fermé :
  - Ce que je n'ai pas su expliquer :
  - Ce que mon binôme n'a pas su expliquer :
- Difficulté qui reste :

## Quatre questions pour finir

1. Pourquoi `textContent` et pas `innerHTML` ?
2. Pourquoi trois fichiers plutôt qu'un seul ?
3. L'agent a écrit le code : comment savez-vous qu'il est juste, et qu'est-ce qui l'a vu échouer ?
4. Quelle astuce avez-vous le plus utilisée aujourd'hui, et laquelle avez-vous oubliée ?

## Aides utilisées

- Indices, aide-mémoire, voisins :
- Ce que j'ai demandé à une IA, et comment j'ai vérifié sa réponse :

## Notes personnelles (chacun)

Pour préparer l'explication de votre part du code. Chacun écrit avec ses mots.

- Nom :
- Ce que j'ai compris :
- Ce que je n'ai pas encore compris :

- Nom :
- Ce que j'ai compris :
- Ce que je n'ai pas encore compris :

Git sert à sauvegarder chaque étape acceptée : lisez les différences et nommez les fichiers à enregistrer, jamais `git add -A`. Attendez la consigne du formateur avant tout envoi vers un dépôt commun.

[README du jour](README.md) · [Aide-mémoire HTML/CSS](ressources/aide-memoire.md) · [Aide-mémoire JavaScript](ressources/aide-memoire-js.md) · [Notice dsh](ressources/dsh.md)
