import { arrayMove } from "@dnd-kit/sortable";
import { cardType } from "../../@types/timegame";

export const getIndexInArrById = (id: string, board: cardType[]): number=> {
  return board.indexOf(board.filter(c => c.id === parseInt(id))[0]);
}

// TODO TEST
export const removeAtIndex = (array: cardType[], index: number) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const insertAtIndex = (array: cardType[], index: number, item: cardType) => {
  return [...array.slice(0, index), item, ...array.slice(index)];
};

export const arrMove = (array: cardType[], oldIndex: number, newIndex: number) => {
  return arrayMove(array, oldIndex, newIndex);
};

export const moveBetweenContainers = (
    activeContainer: cardType[],
    activeIndex: number,
    overContainer: cardType[],
    overIndex: number,
    item: cardType
) => {
  return {
    activeContainer: removeAtIndex(activeContainer, activeIndex),
    overContainer: insertAtIndex(overContainer, overIndex, item),
  };
};

export const shuffleEvent = (cards: cardType[]) => {
  const cardsTemp = [...cards];
  for (var i = cardsTemp.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = cardsTemp[i];
    cardsTemp[i] = cardsTemp[j];
    cardsTemp[j] = temp;
  }
  return cardsTemp;
}

export const extractFirstEvents = (lengthToExtract: number, toGuess: cardType[], player: cardType[]): { toGuess: cardType[], player: cardType[]} => {
  const arrCardTemp = [...player];
  let eventsTemp = [...toGuess];
  for (let index = 0; index < lengthToExtract; index++) {
    arrCardTemp.push(eventsTemp[0]);
    eventsTemp.shift();
  }
  return {
    toGuess: eventsTemp,
    player: arrCardTemp
  }
}

export const checkIfOrderIsFine = (middle: cardType[]) => {
    let allFine = true;
    for (let index = 0; index < middle.length; index++) {
      if(isNaN(middle[index].date.getTime())) console.log(middle[index])
      if (index === middle.length -1){
        // last, not check
        console.log('last index')
        break;
      }
      if(middle[index].date.getTime() > middle[index+1].date.getTime()) {
        allFine = false;
        break;
      }
      // console.log(middle[index].date.getTime() + ' > ' +middle[index+1].date.getTime() + ': ' + (middle[index].date.getTime() > middle[index+1].date.getTime()))
    }
    return allFine;
  }