import { boardCases, orientationCase, ship, shipCase, shipPlacementCase } from "../../@types/battleship";
import { lengthOfTheBoard, listOfShips, styleCaseDestroyed, styleCaseMissed, styleCaseTouched, styleCaseUnTouched } from 'assets/Battleship/Board';

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

// TODO: différence avec checkIfDestroyed ??
export const attackACase = (caseAttacked: shipCase, board: boardCases) => {
    let casesTemp = [...board.board];
    casesTemp[caseAttacked.id] = {
      ...caseAttacked,
      bombed: true,
    };
    if(checkIfShipIsDestroyed(casesTemp, caseAttacked) && caseAttacked.ship){
      const nextStep = caseAttacked.orientation === orientationCase.VERTICAL ? 10 : 1;
      const caseInitShip = caseAttacked.id - (caseAttacked.shipCaseId * (nextStep));
      for (let i = 0; i < caseAttacked.ship.length; i++) {
        casesTemp[(i*nextStep) + caseInitShip] = {
          ...casesTemp[(i*nextStep) + caseInitShip],
          destroyed: true,
        };
        // TODO update in global ship doc
      }
    }
    return casesTemp
  };


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

export const placeCaseShip = (cases: shipCase[], idCase: number, ship: ship, shipCaseID: number, orientation: orientationCase) => {
  let casesTemp = [...cases]
  casesTemp[idCase] = {
    ...casesTemp[idCase],
    shipCaseId: shipCaseID,
    hasShip: true,
    ship: ship,
    bombed: false,
    destroyed: false,
    orientation: orientation,
  };
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
        casesTemp = placeShip(casesTemp, row, column, ship, vertical);
        placed = true;
      }
    }
    if(attempts === 200) {
      console.log('error de placement')
    }
  }
  console.log(casesTemp)
  return casesTemp;
};


export const initCases = () => {
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

export const checkIfShipIsDestroyed = (cases: shipCase[], caseSelected: shipCase) => {
  if(caseSelected.ship){
    const nextStep = caseSelected.orientation === orientationCase.VERTICAL ? 10 : 1;
    const caseInitShip = caseSelected.id - (caseSelected.shipCaseId * (nextStep));
    for (let i = 0; i < caseSelected.ship.length; i++) {
      console.log(cases[(i*nextStep) + caseInitShip])
      if(cases[(i*nextStep) + caseInitShip].bombed) {
        continue;
      }
      else {
        return false;
      }
    }
    return true
  }
  return false;
}

export const initShipPlacement = () => {
  let stepTemp: shipPlacementCase[] = [];
  for (let i = 0; i < listOfShips.length; i++) {
    let ship = listOfShips[i];
    for (let j = 0; j < ship.length; j++) {
      stepTemp.push({ship: ship, shipNumber: j})
    }
  }
  return stepTemp;
}

export const checkIfCaseNextToIsShip = (caseMiddle: shipCase, shipID: number, cases: shipCase[]): {isNextTo: boolean, caseShip: shipCase | null, orientation: orientationCase} => {
  let position = {left: false, right: false, top: false, bottom: false};
  if(caseMiddle.id > 0 && caseMiddle.id < lengthOfTheBoard-1) position.top = true;
  if(caseMiddle.id % lengthOfTheBoard === 0) position.left = true
  if((caseMiddle.id+1) % lengthOfTheBoard === 0) position.right = true
  if(caseMiddle.id > (lengthOfTheBoard * (lengthOfTheBoard-1)) && caseMiddle.id < (lengthOfTheBoard * lengthOfTheBoard)-1) position.bottom = true;
  
  if(position.top) {
    // check +10
    if(cases[caseMiddle.id+10].hasShip && cases[caseMiddle.id+10].ship?.id === shipID) return {isNextTo: true, caseShip: cases[caseMiddle.id+10], orientation: orientationCase.VERTICAL};
    if(position.left || !position.right){
      // check +1
      if(cases[caseMiddle.id+1].hasShip && cases[caseMiddle.id+1].ship?.id === shipID) return {isNextTo: true, caseShip: cases[caseMiddle.id+1], orientation: orientationCase.HORIZONTAL};

    }
    if(!position.left || position.right){
      // check -1
      if(cases[caseMiddle.id-1].hasShip && cases[caseMiddle.id-1].ship?.id === shipID) return {isNextTo: true, caseShip: cases[caseMiddle.id-1], orientation: orientationCase.HORIZONTAL};
    }
  }
  else if(position.bottom){
    // check -10
    if(cases[caseMiddle.id-10].hasShip && cases[caseMiddle.id-10].ship?.id === shipID) return {isNextTo: true, caseShip: cases[caseMiddle.id-10], orientation: orientationCase.VERTICAL};

    if(position.left || !position.right){
      // check +1
      if(cases[caseMiddle.id+1].hasShip && cases[caseMiddle.id+1].ship?.id === shipID) return {isNextTo: true, caseShip: cases[caseMiddle.id+1], orientation: orientationCase.HORIZONTAL};
    }
    if(!position.left || position.right){
      // check -1
      if(cases[caseMiddle.id-1].hasShip && cases[caseMiddle.id-1].ship?.id === shipID) return {isNextTo: true, caseShip: cases[caseMiddle.id-1], orientation: orientationCase.HORIZONTAL};
    }
  }
  else if(position.left){
    // check-10
    if(cases[caseMiddle.id-10].hasShip && cases[caseMiddle.id-10].ship?.id === shipID) return {isNextTo: true, caseShip: cases[caseMiddle.id-10], orientation: orientationCase.VERTICAL};
    // check+10
    if(cases[caseMiddle.id+10].hasShip && cases[caseMiddle.id+10].ship?.id === shipID) return {isNextTo: true, caseShip: cases[caseMiddle.id+10], orientation: orientationCase.VERTICAL};
    // check+1
    if(cases[caseMiddle.id+1].hasShip && cases[caseMiddle.id+1].ship?.id === shipID) return {isNextTo: true, caseShip: cases[caseMiddle.id+1], orientation: orientationCase.HORIZONTAL};
  }
  else if(position.right){
    // check-10
    if(cases[caseMiddle.id-10].hasShip && cases[caseMiddle.id-10].ship?.id === shipID) return {isNextTo: true, caseShip: cases[caseMiddle.id-10], orientation: orientationCase.VERTICAL};
    // check+10
    if(cases[caseMiddle.id+10].hasShip && cases[caseMiddle.id+10].ship?.id === shipID) return {isNextTo: true, caseShip: cases[caseMiddle.id+10], orientation: orientationCase.VERTICAL};
    // check-1
    if(cases[caseMiddle.id-1].hasShip && cases[caseMiddle.id-1].ship?.id === shipID) return {isNextTo: true, caseShip: cases[caseMiddle.id-1], orientation: orientationCase.HORIZONTAL};
  }
  else {
    // check-10
    if(cases[caseMiddle.id-10].hasShip && cases[caseMiddle.id-10].ship?.id === shipID) return {isNextTo: true, caseShip: cases[caseMiddle.id-10], orientation: orientationCase.VERTICAL};
    // check+10
    if(cases[caseMiddle.id+10].hasShip && cases[caseMiddle.id+10].ship?.id === shipID) return {isNextTo: true, caseShip: cases[caseMiddle.id+10], orientation: orientationCase.VERTICAL};
    // check-1
    if(cases[caseMiddle.id-1].hasShip && cases[caseMiddle.id-1].ship?.id === shipID) return {isNextTo: true, caseShip: cases[caseMiddle.id-1], orientation: orientationCase.HORIZONTAL};
    // check+1
    if(cases[caseMiddle.id+1].hasShip && cases[caseMiddle.id+1].ship?.id === shipID) return {isNextTo: true, caseShip: cases[caseMiddle.id+1], orientation: orientationCase.HORIZONTAL};
  }
  return {
    isNextTo: false,
    caseShip: null,
    orientation: orientationCase.UNSET
  };
}

export const checkIfCaseIsSameOrientation = (caseMiddle: shipCase, caseNextTo: shipCase, cases: shipCase[]) => {
  if(caseNextTo.orientation === orientationCase.HORIZONTAL){
    if(caseMiddle.id === caseNextTo.id-1 || caseMiddle.id === caseNextTo.id+1) {
      return true;
    }
  }
  else if(caseNextTo.orientation === orientationCase.VERTICAL){
    if(caseMiddle.id === caseNextTo.id-10 || caseMiddle.id === caseNextTo.id+10) {
      return true;
    }
  }
  return false;
}