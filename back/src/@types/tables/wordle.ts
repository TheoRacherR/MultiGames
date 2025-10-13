import { WordleDay } from 'src/tables/wordle_day/entities/wordle_day.entity';
import { UserLimitedInfos } from './user';

export interface WordleFormatedToday {
  id: string;
  nbTry: number;
  won: boolean;
  player: UserLimitedInfos;
  word: WordleDay;
}
