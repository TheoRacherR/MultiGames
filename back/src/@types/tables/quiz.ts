import { UserLimitedInfos } from './user';

export enum typeQuizEnum {
  FLAG = 'Flag',
  COUNTRY = 'Country',
}

export interface QuizFormatedScoreboard {
  user: UserLimitedInfos;
  score: number;
}
