import { UserLimitedInfos } from "./user";

export enum caseCurrentState {
  UNUSED = 'unused',
  CORRECT = 'correct',
  PARTIALLY_RIGHT = 'partially right',
  WRONG = 'wrong',
}

export enum resultCompare {
  PERFECT = 'perfect',
  PARTIAL = 'partial',
  NONE = 'none',
}

export interface WordleFormatedScoreboard {
  user: UserLimitedInfos,
  score: number
}