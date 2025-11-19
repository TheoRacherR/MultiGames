import { countryGuess, modeQuiz } from "../../@types/quiz";
import { timerTotalQuizFlag, timerTotalQuizFlagFIVE, timerTotalQuizFlagTEN, timerTotalQuizFlagTWENTY,  } from "./Rules";

// Country.tsx
export const resetFlagFound = (flagListArg: countryGuess[]): countryGuess[] => {
  console.log(flagListArg)
  flagListArg.forEach(cf => cf.found = false);
  return flagListArg;
};

export const selectRandomInList = (
    list: countryGuess[],
    mode: modeQuiz
  ): countryGuess[] => {
    let listTemp = list;
    let returnList: countryGuess[] = [];
    let len =
      mode === modeQuiz.ALL
        ? 182
        : mode === modeQuiz.FIVE
        ? 5
        : mode === modeQuiz.TEN
        ? 10
        : 20;
    for (let index = 0; index < len; index++) {
      let ranNum = Math.floor(Math.random() * listTemp.length);
      returnList.push(listTemp[ranNum]);
      listTemp.splice(ranNum, 1);
    }
    console.log(returnList);
    return returnList;
  };

export const getTotalSecondByModeFlag = (mode: modeQuiz): number => {
  switch (mode) {
    case modeQuiz.ALL: 
      return timerTotalQuizFlag;
    case modeQuiz.FIVE: 
      return timerTotalQuizFlagFIVE
    case modeQuiz.TEN: 
      return timerTotalQuizFlagTEN;
    case modeQuiz.TWENTY: 
      return timerTotalQuizFlagTWENTY
    default:
      return timerTotalQuizFlag
  }
}
