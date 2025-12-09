import { UserLimitedInfos } from "./user";

export interface BattleshipEloFormatedScoreboard {
  user: UserLimitedInfos,
  score: number
}

export enum battleshipButtonType {
  CREATE,
  JOIN
}

export interface ship {
  name: string;
  id: number;
  length: number;
  color: string;
}

export enum orientationCase {
  HORIZONTAL= 'horizontal',
  VERTICAL= 'vertical',
  UNSET= 'unset'
}

export interface boardCases {
  boardThisUser: boolean;
  board: shipCase[];
}

export interface shipCase {
  id: number;
  hasShip: boolean;
  ship: ship | null;
  shipCaseId: number;
  orientation: orientationCase;
  bombed: boolean;
  destroyed: boolean;
}

export interface opponentShipCase {
  id: number,
  hasBeenBombed: boolean,
  isBombedAndHasShip: boolean,
  whatRoundHasItBeenBombed: number,
  isTheShipDestroyed: boolean,
  coordinationNumber: string,
  coordinationAlphabet: string,
  shipDestroyed: boolean,
}

export interface shipPlacment {
  ship: ship;
  destroyed: boolean;
  cases: shipPlacmentCase[];
}

export interface shipPlacmentCase {
  caseNumber: number; //0 = tête du bateau etc...
  bombed: boolean;
  idCaseInBoard: number; //de 0 à 99
}