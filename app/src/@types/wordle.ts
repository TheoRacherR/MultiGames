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

export interface casesInterface {
  letterPlaced: string;
  state: caseCurrentState;
  selected: boolean;
}

// Context
export interface WordleContextInterface {
  keyPressed: string,
  setKeyPressed: React.Dispatch<React.SetStateAction<string>>
  keyList: keyInterface[][],
  setKeyList: React.Dispatch<React.SetStateAction<keyInterface[][]>>

}

// Context
export interface keyInterface {
  key: string,
  state: keyState
}

// Context
export enum keyState {
  UNTOUCHED,
  RIGHT_PLACE,
  WRONG_PLACE,
  WRONG
}

export interface KeyListDictionary {
  [key: string]: { row: number; column: number };
}

export interface WordleLocalStorageInformations {
  nbTry: number,
  won: boolean,
  player: string,
  word: string,
}