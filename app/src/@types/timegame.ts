import { UserLimitedInfos } from "./user";

export interface TimeGameEloFormatedScoreboard {
  user: UserLimitedInfos,
  score: number
}

export enum timegameButtonType {
  CREATE,
  JOIN
}