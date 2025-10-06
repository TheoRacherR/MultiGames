import { User } from 'src/tables/user/entities/user.entity';
import { UserLimitedInfos } from './user';

export enum typeQuizEnum {
  FLAG = 'Flag',
  COUNTRY = 'Country',
}

export interface QuizEntity {
  id: string;
  scoreFound: number;
  scoreTotal: number;
  timerFinished: number;
  created_at: Date;
  type: typeQuizEnum;
  player: User;
}

export interface QuizFormatedScoreboard {
  user: UserLimitedInfos;
  score: number;
}
