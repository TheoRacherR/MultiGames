import { useEffect, useState } from 'react';
import ShipsBoard from './ShipsBoard';

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export interface ship {
  name: string;
  id: number;
  length: number;
  color: string;
}

export enum orientationCase {
  HORIZONTAL= 'horizontal',
  VERTICAL= 'vertical',
  UNSET= 'unset'
}
export interface shipCase {
  id: number;
  hasShip: boolean;
  ship: ship | null;
  shipCaseId: number;
  orientation: orientationCase;
}

const PlayerBoard = () => {
  const lengthOfTheBoard = 10;
  const [cases, setCases] = useState<shipCase[]>(Array(lengthOfTheBoard**2));
  const [listOfShips, setListOfShips] = useState<ship[]>([
    { name: 'Tanker', id: 0, length: 4, color: 'red' },
    { name: 'Submarine', id: 1, length: 3, color: 'blue' },
    { name: 'Boat', id: 2, length: 2, color: 'green' },
  ]);
  const [shipSelected, setShipSelected] = useState<ship>({
    id: 0,
    name: '',
    length: 1,
    color: '#3B81F6',
  });
  const [caseShipSelected, setCaseShipSelected] = useState<number>(0);
  const [caseOnBoardDropped, setCaseOnBoardDropped] = useState<number>(0);

  useEffect(() => {
    const arr: shipCase[] = [];
    for (let c = 0; c < lengthOfTheBoard**2; c++) {
      arr.push({
        id: c,
        hasShip: false,
        ship: null,
        shipCaseId: -1,
        orientation: orientationCase.UNSET
      });
    }
    setCases(arr);
  }, []);

  const dragDrop = (caseId: number) => {
    const stepToTheNestCase = cases[caseOnBoardDropped].orientation === orientationCase.HORIZONTAL ? 1 : 10;
    const casesToDelete = cases.filter((c) => c.ship === shipSelected)
    // if(casesToDelete[1]?.id - casesToDelete[0]?.id === 1) stepToTheNestCase = 1;
    if(checkIfShipCanBePlacedHere(caseId, shipSelected, caseShipSelected, stepToTheNestCase)) {
      const arrTemp = [...cases];
      if(casesToDelete.length > 0){
        for (let index = 0; index < casesToDelete.length; index++) {
          const c = casesToDelete[index];
          arrTemp[c.id] = {
            id: c.id,
            hasShip: false,
            ship: null,
            shipCaseId: -1,
            orientation: orientationCase.UNSET
          }
        }
      }
      const caseStart = caseId - (stepToTheNestCase * caseShipSelected);
      for (let step = 0; step < shipSelected.length; step++) {
        arrTemp[caseStart + (step * stepToTheNestCase)] = {
          id: arrTemp[caseStart + (step * stepToTheNestCase)].id,
          hasShip: true,
          ship: shipSelected,
          shipCaseId: step,
          orientation: cases[caseOnBoardDropped].orientation === orientationCase.UNSET ? orientationCase.VERTICAL : cases[caseOnBoardDropped].orientation
        };
      }
      setCases(arrTemp);
      setListOfShips(listOfShips.filter((ship) => ship !== shipSelected))
    }
    console.log('-------------------')
  };

  const checkIfShipCanBePlacedHere = (caseIdToDrop: number, shipSelect: ship, caseOfShipSelected: number, step: number): boolean => {
    const idTopCase = caseIdToDrop - (caseOfShipSelected * step);
    const idCaseEnd = caseIdToDrop + (step * (shipSelect.length-caseOfShipSelected-1));
    if (idTopCase < 0) {
      console.log('trop haut')
      return false;
    }
    else if(idCaseEnd >= lengthOfTheBoard**2){
      console.log('trop bas')
      return false
    }
    else {
      // on va regarder pour chaque case qui vont être changé, s'il possède un bateau, si non OK
      const caseStart = caseIdToDrop - (step * caseOfShipSelected);
      for (let index = 0; index < shipSelect.length; index++) {
        const caseToCheck = caseStart + (step * index);
        console.log(cases[caseToCheck].orientation)
        if(cases[caseToCheck].hasShip && cases[caseToCheck].ship !== shipSelect) {
          console.log(`case ${caseToCheck} is not clean`)
          return false
        }
        else if (step === 1 && caseToCheck % lengthOfTheBoard === 0){
          console.log('dépasse à droite')
          return false;
        }
        else
          console.log(`case ${caseToCheck} is clean`)
      }
      console.log('OK')
      return true;
    }
  }

  const checkIfShipCanRotate = (shipToRotate: ship, topCase: shipCase, indexToAddLoop: number): boolean => {
    for (let index = 1; index < shipToRotate.length-1; index++) {
      const caseToCheck = topCase.id + (index * indexToAddLoop);
      if(caseToCheck > (lengthOfTheBoard**2)-1) {
        console.log('dépasse le bord du bas')
        return false //dépasse le bord du bas
      }
      else if((caseToCheck) % lengthOfTheBoard === 0) {
        console.log('dépasse le bord de droite')
        return false //dépasse le bord de droite
      }
      if(cases[caseToCheck].hasShip) {
        console.log(`la case ${caseToCheck} possède déjà un bateau`)
        return false; // une case possède déjà un bateau
      }
    }
    return true;
  }

  const rotateShip = (shipToRotate: ship) => {
    const topCase: shipCase = cases.filter((c) => c.ship === shipToRotate && c.shipCaseId === 0)[0];
    let indexToAddLoop: number = 1;
    let indexToRemoveLoop: number = 10;
    if(cases[topCase.id].orientation === orientationCase.VERTICAL) {
      indexToAddLoop = 1;
      indexToRemoveLoop = 10;
    } // vertical
    else {
      indexToAddLoop = 10;
      indexToRemoveLoop = 1;
    } // horizontal
    if(checkIfShipCanRotate(shipToRotate, topCase, indexToAddLoop)){
      const casesTemp: shipCase[] = [...cases];
      casesTemp[topCase.id] = {
        id: casesTemp[topCase.id].id,
        ship: casesTemp[topCase.id].ship,
        hasShip: casesTemp[topCase.id].hasShip,
        shipCaseId: casesTemp[topCase.id].shipCaseId,
        orientation: casesTemp[topCase.id].orientation === orientationCase.HORIZONTAL ? orientationCase.VERTICAL : orientationCase.HORIZONTAL
      }
      console.log(casesTemp[topCase.id])
      for (let index = 1; index < shipToRotate.length; index++) {
        casesTemp[topCase.id + index * indexToAddLoop] = {
          id: casesTemp[topCase.id + index * indexToAddLoop].id,
          ship: casesTemp[topCase.id + index * indexToRemoveLoop].ship,
          hasShip: casesTemp[topCase.id + index * indexToRemoveLoop].hasShip,
          shipCaseId: casesTemp[topCase.id + index * indexToRemoveLoop].shipCaseId,
          orientation: casesTemp[topCase.id + index * indexToRemoveLoop].orientation === orientationCase.HORIZONTAL ? orientationCase.VERTICAL : orientationCase.HORIZONTAL
        }
        console.log(casesTemp[topCase.id + index * indexToAddLoop])
        casesTemp[topCase.id + index * indexToRemoveLoop] = {
          id: casesTemp[topCase.id + index * indexToRemoveLoop].id,
          ship: null,
          hasShip: false,
          shipCaseId: -1,
          orientation: orientationCase.UNSET
        }
      }
      setCases(casesTemp);
    }
    console.log('-------------------')
  }

  /*
    - Ajouter un bateau sur le board :                                    OK
    - Pas possible de superposer deux bateau :                            OK
    - Quand un bateau est ajouté sur le board, il n'est plus à gauche :   OK
    - Possible d'enlever un bateau du board pour le remettre à gauche :   OK
    - Possibilité de faire une rotation de bateau :                       OK
    - Possibilité de redéplacer le bateau sur le board après l'avoir posé OK
    - Quand on repositionne, faire attention à le remettre dans mm sens   NON
    - Validation du board :                                               NON
  */

  return (
    <div className="w-3/5 flex bg-red-200 select-none">
      <ShipsBoard
        listOfShips={listOfShips}
        cases={cases}
        setCases={setCases}
        setShipSelected={setShipSelected}
        setCaseShipSelected={setCaseShipSelected}
        setListOfShips={setListOfShips}
        caseOnBoardDropped={caseOnBoardDropped}
      />
      <div className="w-4/5 h-full bg-gray-400 pr-5 pb-5">
        <div>
          <div className="h-5 w-full pl-5 flex">
            {numbers.map((item, index) => (
              <div key={index} className="flex-1 text-center text-white">
                {item}
              </div>
            ))}
          </div>
          <div className="flex">
            <div className="w-5 h-auto text-white text-center flex flex-col">
              {alphabet.map((item, index) => (
                <div key={index} className="flex justify-center my-auto">
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div
              className=" w-full aspect-square flex flex-wrap h-full"
              id="board"
            >
              {cases.map((item, index) => (
                <div
                  id={item.id.toString()}
                  key={index}
                  draggable={item.hasShip}
                  className="flex border-solid border-black border"
                  style={{ width: `calc(100% /${lengthOfTheBoard})`, aspectRatio: 1, backgroundColor: `${item.ship ? item.ship.color : '#3B81F6'}` }}
                  onDragStart={() => {
                    setCaseShipSelected(item.shipCaseId)
                    console.log(index)
                    setCaseOnBoardDropped(index)
                  }}
                  onMouseUp={() => {
                    if(item.ship) rotateShip(item.ship)
                  }}
                  onMouseDown={() => setShipSelected(item.ship as ship)}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={(e) => e.preventDefault()}
                  onDrop={() => dragDrop(index)}
                >
                  {/* {item.ship === null ? 'yes' : 'no'} */}
                  {item.id}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBoard;
