import { caseInterface, casePosition, caseTypes } from "../../@types/minesweeper";

export const difficultyObj = [
  {text: 'easy', value: 'easy'},
  {text: 'normal', value: 'normal'},
  {text: 'hard', value: 'hard'},
]

/*********************************************/
/***************** Board.tsx *****************/
/*********************************************/
export const checkIfGameIsEnded = (casesList: caseInterface[], xcases: number, ycases: number, safeFlagsMax: number) => {
  let totalScoreToAim = (xcases * ycases) - safeFlagsMax;
  for (let c = 0; c < casesList.length; c++) {
    const ca = casesList[c];
    if(ca.type !== caseTypes.MINE && ca.showed)
      totalScoreToAim = totalScoreToAim - 1;
  }
  return totalScoreToAim === 1;
}

export const checkMinePosition = (nbCase: number, xcases: number, ycases: number) => {
  if(nbCase === 0)
    return casePosition.TOP_LEFT_CORNER
  
  else if(nbCase > 0 && nbCase < xcases-1)
    return casePosition.TOP
  
  else if(nbCase === xcases-1)
    return casePosition.TOP_RIGHT_CORNER
  
  else if(nbCase === xcases * (ycases-1))
    return casePosition.BOTTOM_LEFT_CORNER
  
  else if(nbCase === (xcases * ycases)-1)
    return casePosition.BOTTOM_RIGHT_CORNER
  
  else if((nbCase+1)%xcases === 0)
    return casePosition.RIGHT
  
  else if(nbCase%xcases === 0)
    return casePosition.LEFT
  
  else if(nbCase > (xcases * (ycases-1)) && nbCase < (xcases * ycases)-1) 
    return casePosition.BOTTOM
  
  else 
    return casePosition.MIDDLE
}

export const getPositionArray = (position: number, placment: casePosition | null, xcases: number) => {
  if(placment === casePosition.TOP_LEFT_CORNER)
    return [position+1,xcases,xcases+1] //top left corner
  else if(placment === casePosition.TOP)
    return [position+1, position+xcases+1, position+xcases, position+xcases-1, position-1] //top
  else if(placment === casePosition.TOP_RIGHT_CORNER)
    return [position-1, position+xcases, position+xcases-1] //top right corner
  else if(placment === casePosition.RIGHT)
    return [position+xcases, position+xcases-1, position-1, position-xcases-1, position-xcases] //right
  else if(placment === casePosition.BOTTOM_RIGHT_CORNER) //bottom left corner
    return [position-1, position-xcases, position-xcases-1] //bottom right corner
  else if(placment === casePosition.BOTTOM) 
    return [position+1, position-xcases+1, position-xcases, position-xcases-1, position-1] //bottom
  else if(placment === casePosition.BOTTOM_LEFT_CORNER)
    return [position+1, position-xcases+1, position-xcases] //bottom left corner
  else if(placment === casePosition.LEFT)
    return [position-xcases, position-xcases+1, position+1, position+xcases+1, position+xcases] //left
  else 
    return [position+1, position-xcases+1, position-xcases, position-xcases-1, position-1, position+xcases-1, position+xcases, position+xcases+1] //middle
}

export const initCases = (xcases: number, ycases: number, safeFlagsMax: number) => {
  const array: caseInterface[] = [];
  let flagLeft: number = safeFlagsMax;
  let caseLeft: number = ycases * xcases;
  for (let x = 0; x < caseLeft; x++) {
    array.push({type: caseTypes.EMPTY, flagPlaced: false, text: '', showed: false, placment: checkMinePosition(x, xcases, ycases), loosed: false});
  }

  const arrayOfMines: number[] = [];
  for (let c = 0; c < flagLeft; c++) {
    let position = Math.floor(Math.random() * caseLeft);
    if (arrayOfMines.includes(position)) {
      while (arrayOfMines.includes(position)) {
        position = Math.floor(Math.random() * caseLeft);
      }
      arrayOfMines.push(position);
      array[position] = {type: caseTypes.MINE, flagPlaced: false, text: '💣', showed: false, placment: array[position].placment, loosed: false};
    } else {
      arrayOfMines.push(position);
      array[position] = {type: caseTypes.MINE, flagPlaced: false, text: '💣', showed: false, placment: array[position].placment, loosed: false};
    }
  }

  for (let p = 0; p < array.length; p++) {
    let count = 0;
    const position = array[p];
    if(position.type === caseTypes.EMPTY){
      const arrPosition = getPositionArray(p, array[p].placment, xcases);
      for (let a = 0; a < arrPosition.length; a++) {
        const element = arrPosition[a];
        if(array[element].type === caseTypes.MINE){
          count=count+1;
        }
      }
      array[p] = {
        type: count > 0 ? caseTypes.NUMBER : caseTypes.EMPTY, flagPlaced: false,
        text: count > 0 ? count.toString() : '',
        showed: false,
        placment: array[p].placment,
        loosed: false
      }
    }
  }
  return array;
}
