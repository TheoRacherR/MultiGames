import { keyListDictionnary } from "utils/Context/WordleContext";
import { caseCurrentState, casesInterface, keyInterface, keyState, resultCompare } from "../../@types/wordle";

export const minLengthWord = 5;
export const maxLengthWord = 12;

export const checkIfWordCorrespond = (wordSearched: string, wordGet: string): resultCompare[] => {
  if(wordGet.toLowerCase() === wordSearched.toLowerCase()) {
    return Array(wordGet.length).fill(resultCompare.PERFECT);
  }
  else {
    let wordSearchedTemp = "";
    let wordGetTemp = "";
    let arrayReturn = Array(wordGet.length).fill(undefined);
    for (let index = 0; index < wordGet.length; index++) {
      if(wordGet[index].toLowerCase() === wordSearched[index].toLowerCase()){
        arrayReturn[index] = resultCompare.PERFECT;
      }
      else {
        wordSearchedTemp += wordSearched[index]
        wordGetTemp += wordGet[index]
      }
    }

    for (let i = 0; i < wordGetTemp.length; i++) {
      const letterFound = wordSearchedTemp.toLowerCase().split('').find(ws => ws === wordGetTemp[i].toLowerCase());
      if(letterFound) {
        arrayReturn[arrayReturn.indexOf(undefined)] = resultCompare.PARTIAL
        wordSearchedTemp = wordSearchedTemp.slice(0, wordSearchedTemp.indexOf(letterFound)) + wordSearchedTemp.slice(wordSearchedTemp.indexOf(letterFound)+1, wordSearchedTemp.length)
      }
      else {
        arrayReturn[arrayReturn.indexOf(undefined)] = resultCompare.NONE;
      }
    }
    return arrayReturn;
  }
}

export const updateCaseColor = (grid: casesInterface[], caseSelected: casesInterface, wordSearched: string, resultComparison: resultCompare[]): casesInterface[] => {
  let gridTemp = grid;
    for (let index = 0; index < wordSearched.length; index++) {
      gridTemp[grid.indexOf(caseSelected) - wordSearched.length + index+1].state = resultComparison[index] === resultCompare.PERFECT ? caseCurrentState.CORRECT : resultComparison[index] === resultCompare.PARTIAL ? caseCurrentState.PARTIALLY_RIGHT : caseCurrentState.WRONG;
    }
  return gridTemp;
}

export const updateKeyboardStates = (keyList: keyInterface[][], grid: casesInterface[], caseSelected: casesInterface, wordSearched: string, resultComparison: resultCompare[]) => {
  let listTemp = keyList;
    for (let index = 0; index < wordSearched.length; index++) {
      const letter = grid[grid.indexOf(caseSelected) - wordSearched.length + index+1].letterPlaced.toLowerCase();
      let keyStateTemp = keyState.UNTOUCHED;
      if(keyListDictionnary[letter] !== undefined) {
        const currentKeyState = keyList[keyListDictionnary[letter].row][keyListDictionnary[letter].column].state;
        if(currentKeyState === keyState.RIGHT_PLACE) continue;
        if(resultComparison[index] === resultCompare.PERFECT) keyStateTemp = keyState.RIGHT_PLACE;
        else if (resultComparison[index] === resultCompare.PARTIAL) keyStateTemp = keyState.WRONG_PLACE;
        else if(currentKeyState === keyState.WRONG_PLACE) continue
        else keyStateTemp = keyState.WRONG

        keyList[keyListDictionnary[letter].row][keyListDictionnary[letter].column].state = keyStateTemp;
      }
    }
  return listTemp;
  // for each letter
  // > 

  // miaoix
  // mairie
  // m: vert / a: orange / i: orange / r: gris / i: vert / e: gris

  // si deja vert => aucun changement
  // si 
}