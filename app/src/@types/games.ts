import { UserLimitedInfos } from "./user";

export interface FormatedScoreboard {
  user: UserLimitedInfos,
  score: string,
}

export enum gameType {
  BATTLESHIP = 'battleship',
  MINESWEEPER = 'minesweeper',
  QUIZ_FLAG = 'quiz flag',
  QUIZ_COUNTRY = 'quiz country',
  WORDLE = 'wordle',
  TIMELINE = 'timeline',
}