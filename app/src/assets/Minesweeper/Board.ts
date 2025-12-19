import { minesweeperDifficulty } from "../../@types/minesweeper"

export const difficultyObj = [
  {text: 'Facile (8x7, 10 mines)', value: 'easy'},
  {text: 'Moyen (16x16, 24 mines)', value: 'normal'},
  {text: 'Difficile (22x22, 40 mines)', value: 'hard'},
]

export const difficultyStyleBoard = {
  [minesweeperDifficulty.EASY]: { gap: '8px'},
  [minesweeperDifficulty.NORMAL]: { gap: '4px'},
  [minesweeperDifficulty.HARD]: { gap: '2px'},
}

export const difficultyStyleCase = {
  [minesweeperDifficulty.EASY]: { borderRadius: '8px', fontSize: 'x-large'},
  [minesweeperDifficulty.NORMAL]: { borderRadius: '4px', fontSize: 'medium'},
  [minesweeperDifficulty.HARD]: { borderRadius: '2px', fontSize: 'small'},
}

export const styleCase = {
  width: '100%',
  aspectRatio: '1 / 1',
  overflow: 'hidden',
  border: '1px solid rgba(85,51,234, 19%)',
}