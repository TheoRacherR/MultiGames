import { caseCurrentState, casesInterface, keyInterface, KeyListDictionary, keyState, keyType, resultCompare } from "../../@types/wordle";

/********************************************************************/
/***************************** KEYBOARD *****************************/
/********************************************************************/
export const minLengthWord = 5;
export const maxLengthWord = 12;

export const nbTryMax = 6;

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

export const checkIfLocalStorageWordleIsFine = () => {
  const local = localStorage.getItem('dailyWordleDone');
  if(local) {
    const formated = JSON.parse(local);
    if(formated.nbTry > 0 && (formated.won || !formated.won) && (typeof formated.player === 'number' || typeof formated.player === 'string') && typeof formated.word === 'number') {
      return true;
    }
  }
  return false;
}

export const initialiseKeyList = (): keyInterface[][] => {
  const arrKeyExport: keyInterface[][] = [];
  for (let i = 0; i < keyListInit.length; i++) {
    const key = keyListInit[i];
    const arrTemp: keyInterface[] = [];
    for (let j = 0; j < key.length; j++) {
      arrTemp.push(key[j])
    }
    arrKeyExport.push(arrTemp)
  }
  return arrKeyExport;
}

const keyListInit: keyInterface[][] = [
  [
    { key: "a", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "z", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "e", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "r", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "t", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "y", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "u", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "i", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "o", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "p", state: keyState.UNTOUCHED, type: keyType.LETTER },
  ],
  [
    { key: "q", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "s", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "d", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "f", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "g", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "h", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "j", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "k", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "l", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "m", state: keyState.UNTOUCHED, type: keyType.LETTER },
  ],
  [
    { key: "ENTER", state: keyState.UNTOUCHED, type: keyType.ENTER },
    { key: "w", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "x", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "c", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "v", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "b", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "n", state: keyState.UNTOUCHED, type: keyType.LETTER },
    { key: "⌫", state: keyState.UNTOUCHED, type: keyType.DELETE },
  ],
];

const keyListDictionnary: KeyListDictionary = {
  'a': { row: 0, column: 0},
  'z': { row: 0, column: 1},
  'e': { row: 0, column: 2},
  'r': { row: 0, column: 3},
  't': { row: 0, column: 4},
  'y': { row: 0, column: 5},
  'u': { row: 0, column: 6},
  'i': { row: 0, column: 7},
  'o': { row: 0, column: 8},
  'p': { row: 0, column: 9},

  'q': { row: 1, column: 0 },
  's': { row: 1, column: 1 },
  'd': { row: 1, column: 2 },
  'f': { row: 1, column: 3 },
  'g': { row: 1, column: 4 },
  'h': { row: 1, column: 5 },
  'j': { row: 1, column: 6 },
  'k': { row: 1, column: 7 },
  'l': { row: 1, column: 8 },
  'm': { row: 1, column: 9 },

  'w': { row: 2, column: 1 },
  'x': { row: 2, column: 2 },
  'c': { row: 2, column: 3 },
  'v': { row: 2, column: 4 },
  'b': { row: 2, column: 5 },
  'n': { row: 2, column: 6 },
}

/*****************************************************************/
/***************************** BOARD *****************************/
/*****************************************************************/
export const getWordFromGrid = (grid: casesInterface[], caseSelected: casesInterface, wordSearched: string): string => {
  let stringWord = '';
  for (let index = 0; index < wordSearched.length; index++) {
    stringWord = grid[grid.indexOf(caseSelected) - index].letterPlaced + stringWord;
  }
  return stringWord;
}

// TODO check if the word exist

export const checkIfUniqueArray = (arr: any[]): boolean => {
  if(arr.length > 0){
    const initValue = arr[0];
    for (let index = 1; index < arr.length; index++) {
      if(arr[index] !== initValue) return false;
    }
  }
  return true;
}



export const pressBackspace = async (wordDay: string, casesList: casesInterface[]) => {
  const casesTemp = [...casesList];
    const caseSelected = casesTemp.find((c) => c.selected);
    if (caseSelected) {
      if (
        (casesList.indexOf(caseSelected) + 1) % wordDay.length ===
          0 &&
        casesTemp[casesList.indexOf(caseSelected)].letterPlaced !== ""
      ) {
        casesTemp[casesList.indexOf(caseSelected)].letterPlaced = "";
      } else if (
        casesList.indexOf(caseSelected) > 0 &&
        casesTemp[casesList.indexOf(caseSelected) - 1].state ===
          caseCurrentState.UNUSED
      ) {
        casesTemp[casesList.indexOf(caseSelected) - 1].selected = true;
        casesTemp[casesList.indexOf(caseSelected) - 1].letterPlaced = "";
        casesTemp[casesList.indexOf(caseSelected)].selected = false;
      }
    }
    return casesTemp;
}