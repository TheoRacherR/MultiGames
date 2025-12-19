import { UserLimitedInfos } from "./user";

export enum minesweeperDifficulty {
  EASY = 'easy',
  NORMAL = 'normal',
  HARD = 'hard',
}

export enum caseTypes {
  MINE = 'mine',
  EMPTY = 'empty',
  NUMBER = 'number',
  // ONE = 1,
  // TWO = 2,
  // THREE = 3,
  // FOUR = 4,
  // FIVE = 5,
  // SIX = 6,
  // SEVEN = 7,
  // EIGHT = 8
}

export enum casePosition {
  TOP_LEFT_CORNER='top_left_corner',
  TOP='top',
  TOP_RIGHT_CORNER='top_right_corner',
  RIGHT='right',
  BOTTOM_RIGHT_CORNER='bottom_right_corner',
  BOTTOM='bottom',
  BOTTOM_LEFT_CORNER='bottom_left_corner',
  LEFT='left',
  MIDDLE='middle'
}

export interface MinesweeperFormatedScoreboard {
  user: UserLimitedInfos,
  score: number,
  level: minesweeperDifficulty;
}

export interface caseInterface {
  type: caseTypes;
  flagPlaced: boolean;
  text: string;
  showed: boolean;
  placment: casePosition | null;
  loosed: boolean;
}

export interface difficultyDetails {
  mine: number;
  total_cases: number;
  xcases: number;
  ycases: number;
}

export const rules: {
  easy: difficultyDetails;
  normal: difficultyDetails;
  hard: difficultyDetails;
} = {
  easy: {
    mine: 10,
    total_cases: 56, //7x8,
    xcases: 8,
    ycases: 7,
  },
  normal: {
    mine: 40,
    total_cases: 256, //16x16
    xcases: 16,
    ycases: 16,
  },
  hard: {
    mine: 99,
    total_cases: 484, //22x22
    xcases: 22,
    ycases: 22,
  },
};