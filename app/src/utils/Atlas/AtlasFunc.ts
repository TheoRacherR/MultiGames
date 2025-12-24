import { categoryEnum, categoryLine, categoryType, countryInterface } from "../../@types/atlas";

export const initCategories = (categoriesArg: categoryType[]) => {
  let arrCategories: categoryLine[] = [];
  let categoriesTemp = [...categoriesArg];
  for (let index = 0; index < 5; index++) {
    const random = Math.trunc(Math.random() * categoriesTemp.length);
    arrCategories.push({
      category: categoriesTemp[random],
      countrySelected: null,
      rank: -1,
    })
    categoriesTemp.splice(random, 1);
  }
  return arrCategories;
}

export const initRandomCountry = (countriesArg: countryInterface[]) => {
  const random = Math.trunc(Math.random() * countriesArg.length);
  return countriesArg[random];
}

export const getCountryRank = (countryID: number, categCountryArg: categoryEnum, categoriesArg: categoryType[]) => {
  const rankList = categoriesArg.filter(cat => cat.type === categCountryArg)[0].rankList;
  const rank = rankList.filter(rl => rl.countryID === countryID);
  console.log(rank)
  if(rank.length === 0) return 101;
  return rank[0].rank;
}

export const checkIfGameIsEnded = (categoriesToSelectTemp: categoryLine[]) => {
    return categoriesToSelectTemp.filter(cts => !cts.countrySelected).length === 0;
  };