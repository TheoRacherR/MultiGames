export interface countryGuess {
  name: string;
  nameList: string[];
  img: string;
  alt: string;
  svgPoints: {
    maintLocation: string;
    islands: string;
  };
  location: {
    contient: modeQuiz;
  };
  found: boolean;
}

export interface finalScoreInterface {
  end: boolean;
  listLeftToFind: countryGuess[];
  listFound: countryGuess[];
  finalTimer: {
    seconds: number;
    minutes: number;
  };
}

export enum gameQuiz {
  FLAG = "Flag",
  COUNTRY = "Country",
}
export const gameList = [gameQuiz.FLAG, gameQuiz.COUNTRY];

export enum modeQuiz {
  ALL = "All",
  FIVE = "5",
  TEN = "10",
  TWENTY = "20",
  NORTH_AMERICA = "North america",
  SOUTH_AMERICA = "South america",
  EUROPE = "Europe",
  AFRICA = "Africa",
  OCEANIA = "Oceania",
  ASIA = "Asia",
}
export const modeFlagList = [
  modeQuiz.ALL,
  modeQuiz.FIVE,
  modeQuiz.TEN,
  modeQuiz.TWENTY,
];
export const modeCountryList = [
  modeQuiz.ALL,
  modeQuiz.AFRICA,
  modeQuiz.ASIA,
  modeQuiz.EUROPE,
  modeQuiz.NORTH_AMERICA,
  modeQuiz.SOUTH_AMERICA,
  modeQuiz.OCEANIA,
];

export enum buttonComponentType {
  RED = "red",
  BLUE = "blue",
  ORANGE = "orange",
  GREEN = "green",
}

export interface countriesSortedInterface {
  type: modeQuiz;
  countries: countryGuess[];
}
