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

- Dossier : atelier
- Commande et résultat : `npm start` — le serveur démarre, la page de départ s'affiche sur http://127.0.0.1:3000 ; `dsh --profile headless "Reponds uniquement OK"` → `OK`.

Pour chaque checkpoint : cochez la case quand toute la preuve de la fiche est réunie, collez la preuve (texte, commande ou phrase), puis notez ce que vous avez prédit, essayé, observé, et une difficulté qui reste.

## Le chat web (N0 Subir)

### J1-01 · 🧭 Équipage — [fiche](checkpoints/J1-01-equipage.md)

- [x] Validé
- Preuve (page de départ affichée sur votre poste, cahier personnel recopié ci-dessus) : page de départ affichée sur http://127.0.0.1:3000, cahier personnel recopié plus haut.
- Le `p#status` est-il vide dans le HTML ? Qui écrit sa phrase ? Oui, il est vide dans index.html. C'est app.js qui écrit sa phrase (« Votre point de départ est prêt. ») avec `document.querySelector('#status').textContent`.
- Décision prise ensemble : thème jeux de société.
- Difficulté qui reste : aucune

### J1-02 · 💬 Premier prompt — [fiche](checkpoints/J1-02-premier-prompt.md)

- [x] Validé
- Preuve : `essais-n0/chatbot-v1.html` s'ouvre dans le navigateur ; le prompt et la première réponse sont collés ci-dessous, en entier, sans donnée personnelle. Chat utilisé : Claude (et non Mistral). Code non corrigé à la main.
- Mon prompt, tel quel :

```text
fais-moi un chatbot sur les jeux de société, dans une seule page HTML que j'ouvre dans mon navigateur.
```

- La première réponse du chat (texte et code), telle quelle :

Texte : « Voilà chatbot-v1.html : une page unique avec les règles de 9 jeux (Monopoly, Scrabble, Uno…), quelques réponses sur les égalités et les désaccords, et un message de repli. »

```html
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Chatbot Jeux de société</title>
<style>
  * { box-sizing: border-box; }
  body {
    font-family: system-ui, sans-serif;
    background: #f3efe6;
    margin: 0;
    display: flex;
    justify-content: center;
    padding: 20px;
  }
  .chat {
    width: 100%;
    max-width: 600px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0,0,0,.15);
    display: flex;
    flex-direction: column;
    height: 90vh;
    overflow: hidden;
  }
  header {
    background: #8b4513;
    color: #fff;
    padding: 14px 18px;
    font-size: 1.2rem;
    font-weight: bold;
  }
  #messages {
    flex: 1;
    overflow-y: auto;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .msg {
    max-width: 80%;
    padding: 10px 14px;
    border-radius: 14px;
    line-height: 1.4;
    white-space: pre-wrap;
  }
  .bot { background: #eee3d0; align-self: flex-start; }
  .user { background: #8b4513; color: #fff; align-self: flex-end; }
  form {
    display: flex;
    gap: 8px;
    padding: 12px;
    border-top: 1px solid #ddd;
  }
  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
  }
  button {
    padding: 10px 16px;
    border: none;
    background: #8b4513;
    color: #fff;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
  }
</style>
</head>
<body>
<div class="chat">
  <header>🎲 Chatbot Jeux de société</header>
  <div id="messages"></div>
  <form id="form">
    <input id="input" type="text" placeholder="Pose ta question sur un jeu…" autocomplete="off">
    <button type="submit">Envoyer</button>
  </form>
</div>

<script>
  const messages = document.getElementById('messages');
  const form = document.getElementById('form');
  const input = document.getElementById('input');

  const jeux = {
    monopoly: "Monopoly : 2 à 8 joueurs. On lance les dés, on avance, on achète les propriétés et on fait payer des loyers aux adversaires. Le dernier joueur non ruiné gagne.",
    scrabble: "Scrabble : 2 à 4 joueurs. On forme des mots sur la grille avec ses 7 lettres. Chaque lettre rapporte des points, avec des cases bonus (mot compte double ou triple). Le plus de points gagne.",
    uno: "Uno : 2 à 10 joueurs. Il faut poser une carte de même couleur ou même chiffre que celle du dessus. Le premier à se débarrasser de toutes ses cartes gagne. N'oublie pas de dire « Uno » avec une carte restante !",
    catan: "Catan : 3 à 4 joueurs. On construit routes, colonies et villes pour produire des ressources et les échanger. Le premier à atteindre 10 points de victoire gagne.",
    echecs: "Échecs : 2 joueurs. Chacun déplace ses pièces à tour de rôle. Le but est de mettre le roi adverse en échec et mat.",
    dames: "Dames : 2 joueurs. On déplace ses pions en diagonale et on capture en sautant par-dessus un pion adverse. On gagne en capturant ou bloquant tous les pions adverses.",
    "cluedo": "Cluedo : 3 à 6 joueurs. On mène l'enquête pour trouver qui a commis le meurtre, avec quelle arme et dans quelle pièce. Le premier qui accuse juste gagne.",
    "dobble": "Dobble : 2 à 8 joueurs. Chaque paire de cartes a exactement un symbole en commun. Le premier à le trouver et à le nommer gagne la carte.",
    "tarot": "Tarot : 3 à 5 joueurs. Un joueur prend une enchère et joue seul ou avec un partenaire pour atteindre un nombre de points selon le nombre de bouts qu'il possède."
  };

  function normaliser(t) {
    return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function repondre(texte) {
    const t = normaliser(texte);

    for (const nom in jeux) {
      if (t.includes(normaliser(nom))) return jeux[nom];
    }
    if (t.includes('egalite') || t.includes('egal')) {
      return "En cas d'égalité, regarde d'abord les règles du jeu : souvent on départage avec un critère secondaire (cartes restantes, ressources, tour de jeu). À défaut, on rejoue une manche ou on partage la victoire.";
    }
    if (t.includes('triche') || t.includes('dispute') || t.includes('desaccord') || t.includes('litige')) {
      return "En cas de désaccord, relisez ensemble la règle écrite. Si elle est ambiguë, décidez à la majorité, appliquez la décision à tout le monde et notez-la pour la prochaine partie.";
    }
    if (t.includes('regle') || t.includes('jouer') || t.includes('comment')) {
      return "Dis-moi de quel jeu tu parles (Monopoly, Scrabble, Uno, Catan, Échecs, Dames, Cluedo, Dobble, Tarot) et je t'explique les règles de base.";
    }
    if (t.includes('bonjour') || t.includes('salut') || t.includes('coucou')) {
      return "Salut ! Je peux t'expliquer les règles d'un jeu de société ou t'aider à trancher une dispute. Que veux-tu savoir ?";
    }
    return "Je n'ai pas bien compris. Essaie par exemple : « règles du Uno » ou « que faire en cas d'égalité ? ».";
  }

  function ajouter(texte, auteur) {
    const div = document.createElement('div');
    div.className = 'msg ' + auteur;
    div.textContent = texte;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const texte = input.value.trim();
    if (!texte) return;
    ajouter(texte, 'user');
    input.value = '';
    setTimeout(() => ajouter(repondre(texte), 'bot'), 400);
  });

  ajouter("Bonjour ! Je suis ton assistant jeux de société. Demande-moi les règles d'un jeu ou comment régler un désaccord.", 'bot');
</script>
</body>
</html>
```

- Trois lignes d'observation (ce que j'ai vu en utilisant la page) :
  1. Message sur le thème (« règles du Uno ») : le bot répond avec les règles du Uno (2 à 10 joueurs, même couleur ou même chiffre, dire « Uno »).
  2. Message hors thème (« quel temps fait-il ? ») : le bot répond « Je n'ai pas bien compris. Essaie par exemple : « règles du Uno » ou « que faire en cas d'égalité ? ». »
  3. Message vide : rien ne se passe, aucune ligne n'est ajoutée.
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
- Difficulté qui reste : aucune

### J1-04 · 🎲 Même prompt, autre réponse — [fiche](checkpoints/J1-04-meme-prompt.md)

- [x] Validé
- Le prompt de référence (identique aux trois essais) :

  ```text
  fais-moi un chatbot sur les jeux de société, dans une seule page HTML que j'ouvre dans mon navigateur.
  ```

  Fichiers : `essais-n0/essai-A.html` (BoardBot), `essai-B.html` (Ludo), `essai-C.html` (Meeple). Trois conversations neuves, sans correction. Les réponses viennent de Claude (pas de Mistral).

- Le tableau des écarts (trois colonnes A, B, C ; au moins quatre critères ; des faits, pas des impressions) :

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

  Ce qui varie : le nombre de lignes (323 / 452 / 618), le nom du bot et la structure (critères mémorisés et pastilles cliquables en C, boutons de suggestion en A et B).
  Ce qui ne varie pas : aucun des trois ne garde l'historique après F5, et chacun répond au hors-thème par une phrase d'incompréhension suivie de suggestions.

- Une phrase de conclusion (ce que ces écarts autorisent, ce qu'ils interdisent de supposer) : avec le même prompt, trois essais donnent trois programmes différents mais identiques sur ce que le prompt n'a pas demandé (sauvegarde, limite de longueur) ; ce qu'on ne précise pas, on ne l'obtient pas, et on ne peut pas supposer que le prochain essai ressemblera à celui-ci.
- Difficulté qui reste : je n'ai pas relu le code ligne par ligne. Les mesures ont été faites dans Chromium sans interface (le navigateur tourne sans fenêtre).

## L'agent (N1 Demander)

### J1-05 · 🛠 dsh en main — [fiche](checkpoints/J1-05-dsh-en-main.md)

- [x] Validé
- Preuve (`dsh --version`, mode Read Only, modèle `capweb-ia`, `git status -- atelier` propre ; **jamais la clé**) : `dsh --version` → `0.1.5-rc.2` ; session ouverte sur le dossier `atelier`, mode Read Only, modèle `capweb-ia` ; `git status -- atelier` → `nothing to commit, working tree clean` avant et après. Test de la barrière : au premier essai, j'ai cliqué « Allow » par erreur et l'agent a créé `public/essai-dsh.txt` ; je l'ai supprimé à la main, puis refait le test en cliquant « Reject » sur la demande `escalate sandbox to workspace-write: Création du fichier public/essai-dsh.txt demandé par l'utilisateur.` ; `git status -- atelier` est resté propre. La clé n'est que dans `~/dsh-capweb/.credentials.yaml` (jamais ici).
- La consigne exacte envoyée à l'agent et sa réponse :

  Consigne :

  ```text
  Liste les fichiers de ce dossier et dis ce que fait chacun. Donne le chemin de chaque fichier. Si tu ne sais pas ce que fait un fichier, écris « je ne sais pas ». N'écris rien et ne modifie rien.
  ```

  Réponse : l'agent liste 13 fichiers avec leur chemin complet (`package.json`, `package-lock.json`, `README.md`, `server/app.js`, `server/start.js`, `public/index.html`, `public/styles.css`, `public/js/app.js`, `tests/server.test.js`, `browser/depart.spec.js`, `playwright.config.js`, `eslint.config.js`, `.gitignore`) et décrit chacun en une ligne. Il écrit « 12 fichiers » dans sa première phrase alors qu'il en liste 13. Il n'a répondu « je ne sais pas » pour aucun fichier.

- Pour chaque fichier cité : existe ou non, description juste ou fausse, pourquoi ; et un fichier qu'il n'a pas cité :

  | Fichier | Existe ? | Description | Pourquoi |
  |---|---|---|---|
  | `package.json` | oui | juste mais incomplète | il oublie `@axe-core/playwright` dans les devDependencies et `"type": "module"` |
  | `package-lock.json` | oui | juste | fichier généré par npm, fige les versions |
  | `README.md` | oui | juste | démarrer sur `http://127.0.0.1:3000`, lancer `npm test`, renvoi vers J1-01 et le carnet |
  | `server/app.js` | oui | juste | liste blanche de 4 chemins, `/version.json`, GET/HEAD seulement (405 sinon), 404 neutre |
  | `server/start.js` | oui | juste | port validé (défaut 3000), écoute sur `127.0.0.1`, arrêt sur SIGINT/SIGTERM |
  | `public/index.html` | oui | juste | `h1` « Cap Web », zone `#status`, liens CSS et JS |
  | `public/styles.css` | oui | juste | 2 règles : police, marges, largeur max centrée |
  | `public/js/app.js` | oui | juste | écrit « Votre point de départ est prêt. » dans `#status` |
  | `tests/server.test.js` | oui | juste | 9 tests (comptés dans le fichier) |
  | `browser/depart.spec.js` | oui | juste | test Playwright : `h1` visible, `status` présent, aucune erreur JS |
  | `playwright.config.js` | oui | juste | Chromium headless, port 4173, démarre `node server/start.js` |
  | `eslint.config.js` | oui | juste mais incomplète | il oublie la règle `no-undef` |
  | `.gitignore` | oui | juste | ignore `node_modules/`, `dist/`, `preuves/`, `test-results/`, `playwright-report/`, `coverage/` |

  Fichier non cité : aucun parmi les fichiers ; seul le dossier `node_modules/` (s'il est présent) n'est pas mentionné.

- Difficulté qui reste : l'agent s'est trompé de compte (12 au lieu de 13) tout en étant exact sur le fond : il faut donc vérifier même ses affirmations les plus plausibles. Pas de blocage technique.

### J1-06 · 🧱 Anatomie d'un prompt — [fiche](checkpoints/J1-06-anatomie-dun-prompt.md)

- [x] Validé
- Preuve (deux prompts, deux résultats, grille remplie, commit du squelette) : deux prompts et deux résultats collés ci-dessous ; grille remplie (6 critères) ; `npm test` → 9 tests réussis ; page vérifiée sur http://127.0.0.1:3000 ; squelette commité (`git log --oneline` : « J1 : squelette de Cap Web (prompt structuré) »).
- Prompt vague et ce que montre la page (trois lignes, fichiers touchés) :

  Prompt envoyé tel quel :

  ```text
  Écris la page de Cap Web : un formulaire, une liste de messages et un statut.
  ```

  Fichiers touchés : `atelier/public/index.html`, `atelier/public/styles.css`, `atelier/public/js/app.js` (20 lignes ajoutées, 3 supprimées), aucun fichier nouveau.
  La page montre : le titre « Cap Web », le champ « Votre message », le bouton « Envoyer », une liste vide et un statut vide au départ. Clic sur « Envoyer » : la page ne se recharge pas et le statut affiche « Message envoyé. ». `app.js` écrit « Message envoyé. » dans le statut (d'après l'agent). Le champ n'a pas de `maxlength` (la limite de 190 n'était pas demandée).
  Note : l'agent a lu les fiches `../checkpoints/J1-06` à `J1-09` avant d'écrire : il a donc eu un contexte que mon prompt ne lui donnait pas (les quatre identifiants `chat-form`, `message`, `messages`, `status` en viennent sans doute).

- Prompt structuré, en six parties, tel qu'envoyé :

  ```text
  RÔLE : Tu es développeur web. Tu écris du HTML, du CSS et du JavaScript sans bibliothèque, pour des débutants.
  TÂCHE : Écris le squelette de la page de « Cap Web », un assistant sur les jeux de société : un formulaire, une liste de messages, une ligne de statut.
  CONTRAINTES :
  - Modifie uniquement public/index.html, public/styles.css et public/js/app.js. Le serveur ne sert que ces trois fichiers : n'en crée aucun autre.
  - Garde ces identifiants : form#chat-form, textarea#message, ul#messages, p#status.
  - Le champ #message est limité à 190 caractères (maxlength).
  - Le contenu de la page est dans un main. Un seul h1 (« Cap Web »), un label lié au champ, un bouton « Envoyer », p#status avec role="status", html lang="fr". Aucune bibliothèque, aucune adresse https://.
  FORMAT DE SORTIE : d'abord la liste de tes hypothèses (cinq au plus), puis tu t'arrêtes. Après mon « ok », tu écris les trois fichiers, puis tu réponds par la liste des fichiers écrits.
  EXEMPLES ET CONTRE-EXEMPLES : voulu : <button type="submit">Envoyer</button>. Refusé : <div onclick="envoyer()">Envoyer</div> (ce n'est pas un bouton) ; un fichier script.js à côté de app.js (le serveur répondrait 404).
  CRITÈRE D'ARRÊT : app.js empêche seulement le rechargement de la page à l'envoi et écrit alors « Interface prête. » dans le statut ; il n'ajoute aucun message à la liste. Quand les trois fichiers sont écrits, tu t'arrêtes.
  ```

  Fichiers touchés : `atelier/public/index.html` (+6 lignes), `atelier/public/js/app.js` (+4, −1), `atelier/public/styles.css` (+2) ; aucun fichier nouveau (12 lignes ajoutées, 1 supprimée au total). La page montre le titre « Cap Web », la liste vide, le champ « Votre message » (limité à 190 caractères) avec son bouton « Envoyer », et un statut vide qui affiche « Interface prête. » à l'envoi, sans recharger la page.
- Les hypothèses de l'agent, et ma réponse :

  Hypothèses de l'agent (il en a listé quatre, sans rien écrire) :
  1. Les fichiers `public/index.html`, `public/styles.css` et `public/js/app.js` existent déjà et peuvent être écrasés.
  2. `index.html` charge `styles.css` en CSS et `js/app.js` en script sans bibliothèque.
  3. Aucun appel réseau ni backend n'est attendu pour ce squelette.
  4. Page en français, encodée en UTF-8, testée en local.

  Ma réponse : « ok. Précision sur ton hypothèse 1 : modifie les trois fichiers existants au lieu de tout réécrire. Garde ce qui existe déjà (lang="fr", viewport, le title, le script chargé en type="module"). Ne crée aucun autre fichier. » J'ai corrigé l'hypothèse 1 parce qu'« écraser » pouvait faire perdre ce qui marchait déjà ; les trois autres étaient vraies (vérifié dans les fichiers). L'agent a répondu « je garde l'existant » et a modifié les fichiers.
- La grille (✔ ou ✘ et un mot, pour « vague » puis « structuré ») :

  | Critère | Prompt vague | Prompt structuré |
  |---|---|---|
  | La page s'affiche sans erreur (F12, onglet Console) | ✔ : aucune erreur, « No issues » | ✔ : aucune erreur dans la Console |
  | Formulaire, liste et statut sont là, avec les quatre identifiants | ✔ : `chat-form`, `message`, `messages`, `status` | ✔ : les quatre, plus `maxlength="190"`, `lang="fr"` et `role="status"` |
  | Seuls les trois fichiers autorisés ont changé (`git status -- atelier`) | ✔ : 3 fichiers modifiés, aucun nouveau | ✔ : 3 fichiers modifiés, aucun nouveau |
  | `npm test` reste vert | ✔ : 9/9 | ✔ : 9/9 |
  | Aucune bibliothèque, aucune adresse `https://` | ✔ : le `grep` ne trouve rien | ✔ : le `grep` ne trouve rien |
  | Vous savez expliquer chaque partie de la page en une phrase | ✘ : pas encore relu les trois fichiers | ✔ : j'ai relu le diff (13 lignes) et je sais dire ce que fait chaque partie |

- Une phrase : entre les deux résultats, ce qui a le plus changé, c'est la limite de 190 caractères et le comportement exact de l'envoi (statut « Interface prête. », aucun message ajouté), parce que la partie CONTRAINTES (maxlength 190) et la partie CRITÈRE D'ARRÊT de mon prompt les disaient ; avec le prompt vague, l'agent n'avait ni limite ni arrêt précis, et il avait écrit « Message envoyé. » de lui-même.
- Difficulté qui reste : le prompt vague a profité des fiches lues par l'agent, donc la comparaison avec le prompt structuré est moins nette que prévu (les quatre identifiants étaient déjà bons dans les deux essais). Je n'ai fait qu'un essai de chaque : je ne sais pas si le même prompt structuré redonnerait le même résultat.

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