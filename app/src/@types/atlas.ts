
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
  categoryType: categoryType;
  countrySelected: countryInterface | null;
  rank: number;
}

export interface categoryType {
  id: number;
  icon: string;
  type: categoryEnum;
  rankObject: categoryRankObject;
}

export type categoryObject = {
  [key in categoryEnum]: categoryType
}
export interface categoryRank {
  countryID: number,
  rank: number,
}

export interface categoryRankObject {
  [rank: number]: categoryRank,
}

export enum categoryEnum {
  FOOD='Cuisine', //2025: https://worldpopulationreview.com/country-rankings/what-country-has-the-best-food
  GDP='GPD',
  LOWER_POP='Low Population', //2025: https://www.worldometers.info/world-population/population-by-country/
  LARGER_POP='Larger Population', //2025: https://www.worldometers.info/world-population/population-by-country/
  SMALLER_SIZE='Smaller Size', //2025: https://www.worldometers.info/geography/largest-countries-in-the-world/
  LARGER_SIZE='Larger Size', //2025: https://www.worldometers.info/geography/largest-countries-in-the-world/
  MILITARY='Military', //2025: https://worldpopulationreview.com/country-rankings/military-strength-index-by-country
  FORREST_AREA='Forrest Area', //2025: https://www.worldometers.info/food-agriculture/forest-by-country/
  ENERGY_CONSUMPTION='Energy Consumption', //2025: https://www.worldometers.info/energy/
  
  ALCOOL_CONSUMPTION='Alcool Consumption', //https://worldpopulationreview.com/country-rankings/alcohol-consumption-by-country
  FOOD_WASTE='Food Waste', //2025 https://worldpopulationreview.com/country-rankings/food-waste-by-country
  SINGLE_PARENT="Single Parent", //2010-2018 https://worldpopulationreview.com/country-rankings/single-parent-rates-by-country
  OLYMPIC_MEDAL="Olympic Medals", //2025 https://worldpopulationreview.com/country-rankings/olympic-medals-by-country
  AVOCADO_CONSUMPTION="Avocado consumption", //2025 https://worldpopulationreview.com/country-rankings/avocado-consumption-by-country
  POLLUTION="Pollution", //2025 https://worldpopulationreview.com/country-rankings/pollution-by-country
  TOURSIM="Toursim", //TODO 2024 https://en.wikipedia.org/wiki/World_Tourism_rankings
  FOOD_WASTE_CAPITA='Food Waste per Capita', //2025 https://worldpopulationreview.com/country-rankings/avocado-consumption-by-country
  AIRPORTS='Airports', //2025 https://worldpopulationreview.com/country-rankings/airports-by-country
}

export enum categoryGroupName {
  DEFAULT="Default",
  LIFESTYLE="Lifestyle",
}

export type categoryGroupInterface = {
  name: categoryGroupName,
  categoryList: categoryType[],
}

export type categoryGroupObject= {
  [key in categoryGroupName]: categoryGroupInterface
}