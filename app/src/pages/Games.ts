import { gameType } from "../@types/games";

export const games = [
  {
    title: "Bataille navale",
    description: "Défie l'océan et débusque les navires ennemis. Place tes bateaux, anticipe les frappes et remporte la victoire. Mode solo ou en ligne à venir. Prends la mer — bonne chance, Capitaine !",
    gameLink: "battleship",
    type: gameType.BATTLESHIP
  },
  {
    title: "Démineur",
    description: "Avance avec prudence et explore un terrain piégé. Analyse chaque indice, ouvre les bonnes cases et marque les bombes avant qu’il ne soit trop tard. Chaque coup compte — garde ton sang-froid et triomphe du champ de mines !",
    gameLink: "minesweeper",
    type: gameType.MINESWEEPER
  },
  {
    title: "Quiz : Drapeaux",
    description: "Tour du monde express ! Observe les drapeaux, fouille ta mémoire et devine la nation qui se cache derrière chaque couleur. Plus tu vas vite, plus tu brilles — embarque pour un défi géographique haut en couleurs !",
    gameLink: "quiz",
    type: gameType.QUIZ_FLAG
  },
  {
    title: "Quiz : Pays",
    description: "La planète entière s’offre à toi. Parcours chaque continent, identifie les pays et révèle-les sur la carte en trouvant leur nom. Un défi parfait pour prouver que tu es un véritable maître de la géographie mondiale !",
    gameLink: "quiz",
    type: gameType.QUIZ_COUNTRY
  },
  {
    title: "Wordle",
    description: "Un mot secret t’attend. Teste tes hypothèses, décortique chaque réponse et avance lettre après lettre vers la solution. Entre flair et logique, sauras-tu deviner le mot du jour avant de manquer d’essais ? À toi de jouer !",
    gameLink: "wordle",
    type: gameType.WORDLE
  },
  {
    title: "TimeLine",
    description: "Remonte le fil du temps et replace les grands événements de l’Histoire dans le bon ordre. Du passé lointain aux moments les plus récents, fais appel à ton sens de la chronologie et compose la frise parfaite. L’Histoire n’attend plus que toi !",
    gameLink: "timeline",
    type: gameType.TIMELINE
  },
  
]