import React, { useEffect, useState } from 'react';
import ShipsBoard from './ShipsBoard';
import { Button } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export interface ship {
  name: string;
  id: number;
  length: number;
  color: string;
}
export interface shipCase {
  id: number;
  hasShip: boolean;
  ship: ship | null;
  shipCaseId: number;
}

const PlayerBoard = () => {
  const length = 10;
  const [cases, setCases] = useState<shipCase[]>(Array(length * length));
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
    for (let c = 0; c < length * length; c++) {
      arr.push({
        id: c,
        hasShip: false,
        ship: null,
        shipCaseId: -1,
      });
    }
    setCases(arr);
  }, []);

  const dragDrop = (arg: any) => {
    const caseId = parseInt(arg.target.id);
    console.log(caseId);
    console.log(shipSelected);
    console.log(caseShipSelected);
    const canTheShipLand: boolean = checkIfShipCanBePlacedHere(caseId, shipSelected, caseShipSelected);
    if(canTheShipLand) {
      const caseStart = caseId - (length * (caseShipSelected - 1));
      const arrTemp = [...cases];
      const casesToDelete = cases.filter((c) => c.ship === shipSelected)
      for (let step = 0; step < shipSelected.length; step++) {
        arrTemp[caseStart + (step * length)] = {
          id: arrTemp[caseStart + (step * length)].id,
          hasShip: true,
          ship: shipSelected,
          shipCaseId: step,
        };
      }
      for (let index = 0; index < casesToDelete.length; index++) {
        const c = casesToDelete[index];
        arrTemp[c.id] = {
          id: c.id,
          ship: null,
          hasShip: false,
          shipCaseId: -1
        }
      }
      // delete ships
      setCases(arrTemp);
      // deleteShipFromBoard(shipSelected);
      setListOfShips(listOfShips.filter((ship) => ship !== shipSelected))
    }
  };

  const checkIfShipCanBePlacedHere = (caseIdToDrop: number, shipSelect: ship, caseOfShipSelected: number): boolean => {
    // check si le bateau ne vas pas dépasser du board
    // check si le bateau ne vas pas empiéter sur un autre bateau
    // if(cases.filter((c) => c.ship === shipSelect).length === 0){
      if (caseIdToDrop < (caseOfShipSelected - 1) * length) {
        // trop haut
        return false;
      } else if (
        (shipSelect.length - caseOfShipSelected) * length + caseIdToDrop >
        length * length - 1
      ) {
        // trop bas
        return false;
      } else {
        const caseStart = caseIdToDrop - (length * (caseOfShipSelected - 1));
        let canTheShipLand = true;
        for (let step = 0; step < shipSelect.length; step++) {
          if(cases[caseStart + (step * length)].hasShip)
            canTheShipLand = false
        }
        if(canTheShipLand)
          return true;
        else
          return false;
      }
    // }
    // else
    //   return false;
  }

  const checkIfShipCanRotate = (shipToRotate: ship, topCase: shipCase, indexToAddLoop: number): boolean => {
    
    for (let index = 0; index < shipToRotate.length-1; index++) {
      if(cases[topCase.id + index + indexToAddLoop].hasShip)
        return false;
    }
    return true;
  }

  const rotateShip = (shipToRotate: ship) => {
    const topCase: shipCase = cases.filter((c) => c.ship === shipToRotate && c.shipCaseId === 0)[0];
    let indexToAddLoop: number = 1;
    let indexToRemoveLoop: number = 10;
    if(cases[topCase.id+1].ship === shipToRotate) {
      indexToAddLoop = 10;
      indexToRemoveLoop = 1;
    } // horizontal
    else {
      indexToAddLoop = 1;
      indexToRemoveLoop = 10;
    } // vertical

    if(checkIfShipCanRotate(shipToRotate, topCase, indexToAddLoop)){
      const casesTemp: shipCase[] = [...cases];
      for (let index = 1; index < shipToRotate.length; index++) {
        casesTemp[topCase.id + index * indexToAddLoop] = {
          id: casesTemp[topCase.id + index * indexToAddLoop].id,
          ship: casesTemp[topCase.id + index * indexToRemoveLoop].ship,
          hasShip: casesTemp[topCase.id + index * indexToRemoveLoop].hasShip,
          shipCaseId: casesTemp[topCase.id + index * indexToRemoveLoop].shipCaseId
        }
        casesTemp[topCase.id + index * indexToRemoveLoop] = {
          id: casesTemp[topCase.id + index * indexToRemoveLoop].id,
          ship: null,
          hasShip: false,
          shipCaseId: -1
        }
      }
      setCases(casesTemp);
    }
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
                  style={{ width: `calc(100% /${length})`, aspectRatio: 1, backgroundColor: `${item.ship ? item.ship.color : '#3B81F6'}` }}
                  onDragStart={(e) => {
                    setCaseOnBoardDropped(parseInt(e.currentTarget.id))
                    console.log(e.currentTarget.id)
                  }}
                  onMouseUp={() => {
                    if(item.ship) rotateShip(item.ship)
                  }}
                  onMouseDown={() => {
                    console.log(item.ship)
                    setShipSelected(item.ship as ship)
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={(e) => e.preventDefault()}
                  onDrop={(e) => dragDrop(e)}
                >
                  {item.ship === null ? 'yes' : 'no'}
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
