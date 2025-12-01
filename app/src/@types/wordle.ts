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
  initKeys: () => void
}

// Context
export interface keyInterface {
  key: string,
  state: keyState,
  type: keyType
}

// Context
export enum keyState {
  UNTOUCHED,
  RIGHT_PLACE,
  WRONG_PLACE,
  WRONG
}

export enum keyType {
  LETTER,
  ENTER,
  DELETE
}

export enum caseStyle {
  UNTOUCHED="bg-[#FBF9FF] text-[#5533EA]",
  RIGHT_PLACE="bg-[#4CAF50] text-[#FFFFFF]",
  WRONG_PLACE="bg-[#FFC107] text-[#FFFFFF]",
  WRONG="bg-[#E6E6F7] text-[#5533EA]"
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

export interface finalScoreInterface {
  ended: boolean;
  won: boolean;
  modalOpenned: boolean;
  nbTry: number;
  wordSearched: string;
}