import { countryGuess } from "./quiz";

export interface finalScoreInterface {
  end: boolean;
  open: boolean;
  listEnd: categoryLine[];
}

export interface countryInterface {
  id: number,
  name: string,
  icon: string,
}

export interface categoryLine {
  category: categoryType;
  countrySelected: countryInterface | null;
  rank: number;
}

export interface categoryType {
  id: number;
  icon: string;
  type: categoryEnum;
  rankList: categoryRank[];
}

export enum categoryEnum {
  GDP='GPD',
  LARGER_SIZE='LARGER_SIZE',
  SMALLER_SIZE='SMALLER_SIZE',
  LARGER_POP='LARGER_POP',
  LOWER_POP='LOWER_POP',
  FOOD='FOOD',
  MILITARY='MILITARY',
  FORREST_AREA='FORREST_AREA',
  ENERGY_CONSUMPTION='ENERGY_CONSUMPTION',
}

export interface categoryRank {
  countryID: number,
  rank: number,
}