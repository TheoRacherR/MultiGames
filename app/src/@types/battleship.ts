import { UserLimitedInfos } from "./user";

export interface BattleshipEloFormatedScoreboard {
  user: UserLimitedInfos,
  score: number
}

export enum battleshipButtonType {
  CREATE,
  JOIN
}