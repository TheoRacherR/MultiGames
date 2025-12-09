import { opponentShipCase } from "../../@types/battleship"
import { alphabet, lengthOfTheBoard, styleCaseDestroyed, styleCaseMissed, styleCaseTouched, styleCaseUnTouched } from "assets/Battleship/Board"

export const findStyleOfCaseOpponent = (item: opponentShipCase) => {
  if(item.hasBeenBombed && item.isBombedAndHasShip && item.shipDestroyed){ 
    return styleCaseDestroyed //détruit
  }
  if(item.hasBeenBombed && item.isBombedAndHasShip) {
    return styleCaseTouched //touché
  }
  if(item.hasBeenBombed) {
    return styleCaseMissed //raté
  }
  return styleCaseUnTouched //rien
}

export const initOpponentCases = () => {
    const arr: opponentShipCase[] = [];
    for (let c = 0; c < lengthOfTheBoard**2; c++) {
      arr.push({
        id: c,
        hasBeenBombed: false,
        isBombedAndHasShip: false,
        whatRoundHasItBeenBombed: -1,
        isTheShipDestroyed: false,
        coordinationNumber: JSON.stringify((c%10)+1),
        coordinationAlphabet: alphabet[Math.trunc(c/lengthOfTheBoard)],
        shipDestroyed: false,
      });
    }
    return arr;
  }