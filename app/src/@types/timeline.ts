import { UserLimitedInfos } from "./user";

export interface TimeLineEloFormatedScoreboard {
  user: UserLimitedInfos,
  score: number
}

export enum timelineButtonType {
  CREATE,
  JOIN
}

export interface finalScoreInterface {
  end: boolean;
  modalOpenned: boolean;
  listFound: number;
  finalTimer: number;
}

export interface cardType {
  id: number;
  title: string;
  description: string;
  img: string;
  date: Date;
}

export enum CardType {
  SORT,
  DRAG
}

export enum ItemType {
  CARD,
  BOARD
}

export enum BoardType {
  MIDDLE,
  PLAYER
}

export interface eventInterface {
  id: number;
  title: string;
  description: string;
  date: Date
}