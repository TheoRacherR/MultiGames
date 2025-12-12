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

export interface shipPlacementCase {
  shipNumber: number; //0 = tête du bateau etc...
  ship: ship;
}

export enum gameStateEnum {
  WATIING,
  SHIP_PLACEMENT,
  SHIP_OK,
  ON_GAME,
  GAME_FINISHED,
}

// Context
export interface BattleshipContextInterface {
  playerBoardSelected: boolean;
  setPlayerBoardSelected: React.Dispatch<React.SetStateAction<boolean>>;
  gameState: gameStateEnum;
  setGameState: React.Dispatch<React.SetStateAction<gameStateEnum>>;
  playerCases: boardCases;
  setPlayerCases: React.Dispatch<React.SetStateAction<boardCases>>;
  opponentCases: boardCases;
  setOpponentCases: React.Dispatch<React.SetStateAction<boardCases>>;
  resetShipBoardPlayer: () => void;
  handleClickOnRandom: () => void;
  shipPlacementPhase: shipPlacementCase[];
  setShipPlacementPhase: React.Dispatch<React.SetStateAction<shipPlacementCase[]>>;
}