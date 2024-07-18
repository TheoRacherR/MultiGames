import React, { useEffect, useState } from 'react';
import ShipsBoard from './ShipsBoard';

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

    if(cases.filter((c) => c.ship === shipSelected).length === 0){
      if (caseId < (caseShipSelected - 1) * length) {
        console.log('trop haut');
      } else if (
        (shipSelected.length - caseShipSelected) * length + caseId >
        length * length - 1
      )
        console.log('trop bas');
      else {
        const caseStart = caseId - (length * (caseShipSelected - 1));
        const arrTemp = [...cases];
        let canTheShipLand = true;
        for (let step = 0; step < shipSelected.length; step++) {
          if(cases[caseStart + (step * length)].hasShip)
            canTheShipLand = false
        }
        if(canTheShipLand){
          for (let step = 0; step < shipSelected.length; step++) {
            arrTemp[caseStart + (step * length)] = {
              id: arrTemp[caseStart + (step * length)].id,
              hasShip: true,
              ship: shipSelected,
              shipCaseId: step,
            };
          }
          setCases(arrTemp);
          setListOfShips(listOfShips.filter((ship) => ship !== shipSelected))
        }
      }
    }
  };

  /*
    - Ajouter un bateau sur le board :                                    OK
    - Pas possible de superposer deux bateau :                            OK
    - Quand un bateau est ajouté sur le board, il n'est plus à gauche :   OK
    - Possible d'enlever un bateau du board pour le remettre à gauche :   OK
    - Possibilité de faire une rotation de bateau :                       NON
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
            {/* <div className="bg-blue-500 w-full aspect-square flex flex-col flex-1 h-full" id='board'> */}
            <div
              className=" w-full aspect-square flex flex-wrap h-full"
              id="board"
            >
              {/* {data.map((item, index) => (
                  <div
                    id={index.toString()}
                    key={index}
                    className="flex w-full"
                    style={{ height: '10%' }}
                  >
                    {item.map((it, indexd) => (
                      <div
                        key={indexd}
                        id={}
                        style={{textAlign: 'center'}}
                        className="bg-green-300 border-solid border-black flex-1 justify-center box-border border cursor-pointer select-none"
                        onClick={() => {handleUpdateCase(index, indexd)}}
                        // onDragOver={(e) => console.log(e)}
                        onDragOver={e => e.preventDefault()}
                        onDragEnter={e => e.preventDefault()}
                        onDrop={e => dragDrop(e)}
                      >
                        {it}
                      </div>
                    ))}
                  </div>
                ))} */}
              {cases.map((item, index) => (
                <div
                  id={item.id.toString()}
                  key={index}
                  draggable={item.hasShip}
                  className="flex border-solid border-black border"
                  style={{ width: `calc(100% /${length})`, aspectRatio: 1, backgroundColor: `${item.ship ? item.ship.color : '#3B81F6'}` }}
                  onMouseDown={(e) => setCaseOnBoardDropped(parseInt(e.currentTarget.id))}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={(e) => e.preventDefault()}
                  onDrop={(e) => dragDrop(e)}
                >
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
