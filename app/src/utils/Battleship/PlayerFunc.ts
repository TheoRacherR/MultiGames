import { orientationCase, ship, shipCase } from "../../@types/battleship"
import { lengthOfTheBoard, listOfShips, styleCaseDestroyed, styleCaseMissed, styleCaseTouched, styleCaseUnTouched } from "assets/Battleship/Board"

export const findStyleOfCasePlayer = (item: shipCase) => {
  if(item.bombed && item.hasShip && item.destroyed){ 
    return styleCaseDestroyed //détruit
  }
  if(item.bombed && item.hasShip) {
    return styleCaseTouched //touché
  }
  if(item.bombed) {
    return styleCaseMissed //raté
  }
  return styleCaseUnTouched //rien
}

const canPlaceShip = (casesTemp: shipCase[], row: number, col: number, ship: ship, vertical: boolean) => {
  for (let i = 0; i < ship.length; i++) {
    const rowToPlace = row + (vertical ? i : 0);
    const colToPlace = col + (vertical ? 0 : i);
    if (
      rowToPlace < 0 ||
      rowToPlace >= lengthOfTheBoard ||
      colToPlace < 0 ||
      colToPlace >= lengthOfTheBoard
    )
      return false;
    const idx = rowToPlace * lengthOfTheBoard + colToPlace;
    if (casesTemp[idx].hasShip) return false;
  }
  return true;
};

const placeShip = (cases: shipCase[],row: number, col: number, ship: ship, vertical: boolean) => {
  let casesTemp = [...cases]
  for (let i = 0; i < ship.length; i++) {
    const rowToPlace = row + (vertical ? i : 0);
    const colToPlace = col + (vertical ? 0 : i);
    const idxInArray = rowToPlace * lengthOfTheBoard + colToPlace;
    casesTemp[idxInArray] = {
      id: casesTemp[idxInArray].id,
      shipCaseId: i,
      hasShip: true,
      ship: ship,
      bombed: false,
      destroyed: false,
      orientation: vertical
        ? orientationCase.VERTICAL
        : orientationCase.HORIZONTAL,
    };
  }
  return casesTemp;
};

export const placeRandomShips = () => {
    // Simple random placement algorithm for demo:
    // Ships lengths: 5,4,3,3,2
    
    // clear previous
    let casesTemp: shipCase[] = initCases();

    for (const ship of listOfShips) {
      let placed = false,
        attempts = 0;
      while (!placed && attempts < 200) {
        attempts++;
        const vertical = Math.random() < 0.5;
        const row = Math.floor(Math.random() * lengthOfTheBoard);
        const column = Math.floor(Math.random() * lengthOfTheBoard);
        if (canPlaceShip(casesTemp, row, column, ship, vertical)) {
          placeShip(casesTemp, row, column, ship, vertical);
          placed = true;
        }
      }
      if(attempts === 200) {
        console.log('error de placement')
      }
    }
    return casesTemp;
  };

const initCases = () => {
    const arr: shipCase[] = [];
    for (let c = 0; c < lengthOfTheBoard ** 2; c++) {
      arr.push({
        id: c,
        hasShip: false,
        ship: null,
        shipCaseId: -1,
        orientation: orientationCase.UNSET,
        bombed: false,
        destroyed: false,
      });
    }
    return arr;
  };