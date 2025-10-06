import { UserLimitedInfos } from './user';

export enum levels {
  EASY = 'easy',
  NORMAL = 'normal',
  HARD = 'hard',
}

export interface MinesweeperFormatedScoreboard {
  user: UserLimitedInfos;
  score: number;
  level: levels;
}
