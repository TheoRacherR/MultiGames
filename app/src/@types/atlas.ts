
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
  LARGER_SIZE='Larger Size',
  SMALLER_SIZE='Smaller Size',
  LARGER_POP='Larger Population',
  LOWER_POP='Low Population',
  FOOD='Cuisine',
  MILITARY='Military',
  FORREST_AREA='Forrest Area',
  ENERGY_CONSUMPTION='Energy Consumption',
}

export interface categoryRank {
  countryID: number,
  rank: number,
}