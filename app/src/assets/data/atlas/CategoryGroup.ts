import {
  categoryEnum,
  categoryGroupName,
  categoryGroupObject,
} from "./../../../@types/atlas";
import { categoriesObject } from "./Categories";
export const categoryGroups: categoryGroupObject = {
  [categoryGroupName.DEFAULT]: {
    name: categoryGroupName.DEFAULT,
    categoryList: [
      categoriesObject[categoryEnum.ALCOOL_CONSUMPTION],
      categoriesObject[categoryEnum.OLYMPIC_MEDAL],
      categoriesObject[categoryEnum.AVOCADO_CONSUMPTION],
      categoriesObject[categoryEnum.FOOD_WASTE],
      categoriesObject[categoryEnum.SINGLE_PARENT],
      categoriesObject[categoryEnum.POLLUTION],
      categoriesObject[categoryEnum.AIRPORTS],
    ],
  },
  [categoryGroupName.LIFESTYLE]: {
    name: categoryGroupName.LIFESTYLE,
    categoryList: [
      categoriesObject[categoryEnum.ALCOOL_CONSUMPTION],
      categoriesObject[categoryEnum.OLYMPIC_MEDAL],
      categoriesObject[categoryEnum.AVOCADO_CONSUMPTION],
      categoriesObject[categoryEnum.FOOD_WASTE],
      categoriesObject[categoryEnum.SINGLE_PARENT],
      categoriesObject[categoryEnum.POLLUTION],
      categoriesObject[categoryEnum.AIRPORTS],
    ],
  },
};
