import React, { useEffect, useState } from 'react'
import { alphabet, lengthOfTheBoard, numbers, shipCase } from './Battleship'

interface opponentShipCase {
  id: number,
  hasBeenBombed: boolean,
  whatRoundHasItBeenBombed: number,
  isTheShipDestroyed: boolean,
  coordinationNumber: string,
  coordinationAlphabet: string
}

const OpponentBoard = () => {
  const [cases, setCases] = useState<opponentShipCase[]>(Array(lengthOfTheBoard**2));
  const initOpponentCases = () => {
    const arr: opponentShipCase[] = [];
    for (let c = 0; c < lengthOfTheBoard**2; c++) {
      arr.push({
        id: c,
        hasBeenBombed: false,
        whatRoundHasItBeenBombed: -1,
        isTheShipDestroyed: false,
        coordinationNumber: JSON.stringify((c%10)+1),
        coordinationAlphabet: alphabet[Math.trunc(c/lengthOfTheBoard)],
      });
    }
    setCases(arr);
  }

  useEffect(() => {
    initOpponentCases();
  }, [])

  const attackACase = (caseAttacked: opponentShipCase) => {
    console.log(`click on case ${caseAttacked.coordinationAlphabet}${caseAttacked.coordinationNumber}`)
    if(!caseAttacked.hasBeenBombed){
      const round = 0;
      const shipDestroyed = false;
      // vérifier si le bateau est completment supprimé
      const casesTemp = [...cases];
      casesTemp[caseAttacked.id] = {
        id: caseAttacked.id,
        hasBeenBombed: true,
        whatRoundHasItBeenBombed: round,
        isTheShipDestroyed: shipDestroyed,
        coordinationNumber: caseAttacked.coordinationNumber,
        coordinationAlphabet: caseAttacked.coordinationAlphabet,
      }
      setCases(casesTemp);
    }
  }

  return (
    <div className="w-4/5 flex select-none">
      <div className="w-3/5 h-full bg-gray-400 pr-5 pb-5">
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
                  className='flex border-solid border-black border hover:border-4'
                  style={{ 
                    width: `calc(100% /${lengthOfTheBoard})`,
                    aspectRatio: 1,
                    cursor: item.hasBeenBombed ? 'default' : 'crosshair',
                    backgroundColor: `${item.isTheShipDestroyed ? 'black' : item.hasBeenBombed ? 'grey' :'#3B81F6'}`
                  }}
                  onMouseUp={() => attackACase(item)}
                >
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpponentBoard