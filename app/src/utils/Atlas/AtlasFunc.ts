import { categoryEnum, categoryGroupInterface, categoryLine, categoryObject, categoryType, countryInterface } from "../../@types/atlas";

export const initCategoryGroup = (categoryGroupArg: categoryGroupInterface): categoryLine[] => {
  let arrCategories: categoryLine[] = [];
  let categoriesTemp = [...categoryGroupArg.categoryList];
  for (let index = 0; index < categoryGroupArg.categoryList.length; index++) {
    arrCategories.push({
      categoryType: categoriesTemp[index],
      countrySelected: null,
      rank: -1,
    })
  }
  return arrCategories;
}

export const initRandomCountry = (countriesArg: countryInterface[]) => {
  const random = Math.trunc(Math.random() * countriesArg.length);
  return countriesArg[random];
}

export const getCountryRank = (countryID: number, categCountryArg: categoryEnum, categoriesArg: categoryObject): number => {
  const rankObject = categoriesArg[categCountryArg].rankObject;
  const rank = rankObject[countryID];
  if(rank === undefined) return 101;
  return rank.rank;
}

export const checkIfGameIsEnded = (categoriesToSelectTemp: categoryLine[]): boolean => {
  return categoriesToSelectTemp.filter(cts => !cts.countrySelected).length === 0;
};

export const getTheBestRank = (categoryLineArg: categoryLine[], countryID: number, categoriesArg: categoryObject): { rank: number, type: categoryEnum | null } => {
  const catLinesTemp = [...categoryLineArg];
  let bestRank:{ rank: number, type: categoryEnum | null } = {rank: 102, type: null };
  for (let index = 0; index < catLinesTemp.length; index++) {
    if(catLinesTemp[index].countrySelected !== null) continue;

    const rankFound: number = getCountryRank(countryID, catLinesTemp[index].categoryType.type, categoriesArg);
    if(rankFound < bestRank.rank) bestRank = { rank: rankFound, type: catLinesTemp[index].categoryType.type };
  }
  return bestRank;
}

export const calcScore = (categoryLineArg: categoryLine[]): number => {
  return categoryLineArg
    .filter((cts) => cts.countrySelected)
    .reduce(
      (a: number, b: categoryLine) =>
        a + (b.rank > 99 ? 100 : b.rank),
      0
    )
}