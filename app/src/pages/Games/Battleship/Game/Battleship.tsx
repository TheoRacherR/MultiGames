import PlayerBoard from './PlayerBoard/PlayerBoard';
import OpponentBoard from './OpponentBoard';
import { useState } from 'react';
import ModalGameFinished from './ModalGameFinished';
import { giveStartOrder } from '../MainBattleship';

export const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
export const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const lengthOfTheBoard = 10;

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
  bombed: boolean;
}

export interface opponentShipCase {
  id: number,
  hasBeenBombed: boolean,
  whatRoundHasItBeenBombed: number,
  isTheShipDestroyed: boolean,
  coordinationNumber: string,
  coordinationAlphabet: string
}

export interface shipPlacment {
  ship: ship;
  destroyed: boolean;
  cases: shipPlacmentCase[];
}

export interface shipPlacmentCase {
  caseNumber: number; //0 = tête du bateau etc...
  bombed: boolean;
  idCaseInBoard: number; //de 0 à 99
}


const Battleship = () => {
  // Player
  const [playerCases, setPlayerCases] = useState<shipCase[]>(Array(lengthOfTheBoard**2));
  const [playerShipsPlacment, setPlayerShipsPlacment] = useState<shipPlacment[]>([]);

  const [opponentCases, setOpponentCases] = useState<opponentShipCase[]>(Array(lengthOfTheBoard**2));

  const [openModalEnGame, setOpenModalEnGame] = useState<boolean>(false);

  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameEnded, setGameEnded] = useState<{ state: boolean, didIWon: boolean }>({ state: false, didIWon: false });


// socket call giveStartOrder

/* socket contient :
*  createur de la room: true ou false
*  je commence ? true ou false
*  room id
* 
*  function click:
*    case id
*    player id
* 
*  function retourClick:
*    touched: true ou false
*    boat sinked: true or false
* 
*  function gameEnded:
*    winner: player id
*    timer: number
*/ 

  // get socket: owner ?
  // const [ownerOfTheParty, setOwnerOfTheParty] = useState<boolean>(true);

  // true = my trun
  // false = opponent trun
  const [playersTurn, setPlayersTurn] = useState<boolean>(false);

  const initShipPlacments = () => {
    const arrTemp = [...playerShipsPlacment];
    for (let index = 0; index < playerCases.filter(pc => pc.hasShip).length; index++) {
      const playerCase = playerCases.filter(pc => pc.hasShip)[index];
      if(playerShipsPlacment?.filter(c => c.ship === playerCase.ship).length === 0) {
        const step = playerCase.orientation === orientationCase.HORIZONTAL ? 1 : 10;
        const boatHead = playerCases[playerCase.id - (playerCase.shipCaseId * step)];
        console.log(playerCase.ship?.name + ' ' + boatHead.id)
        if(boatHead.ship){
          const placmentCase: shipPlacmentCase[] = [];
          for (let index = 0; index < boatHead.ship?.length; index++) {
            const c = playerCases[boatHead.id + (index * step)];
            placmentCase.push({
              caseNumber: c.shipCaseId,
              bombed: c.bombed,
              idCaseInBoard: c.id
            })
            
          }
          arrTemp[boatHead.ship.id] = {
            ship: boatHead.ship,
            destroyed: false,
            cases: placmentCase
          }
        }
      }
    }
    console.log(arrTemp);
    setPlayerShipsPlacment(arrTemp);
  }

  const startTheGame = () => {
    // return socket game start
    setGameStarted(true);
    initShipPlacments();
    const starter = giveStartOrder();
    setPlayersTurn(starter);
    starter ? console.log('you start') : console.log('opponent starts')
  }

  // player attack opponent board
  const attackACase = (caseAttacked: opponentShipCase) => {
    if(playersTurn){
      console.log(`click on case ${caseAttacked.coordinationAlphabet}${caseAttacked.coordinationNumber}`)
      if(!caseAttacked.hasBeenBombed){
        const round = 0;
        const shipDestroyed = false;
        // vérifier si le bateau est completment supprimé
        const casesTemp = [...opponentCases];
        casesTemp[caseAttacked.id] = {
          id: caseAttacked.id,
          hasBeenBombed: true,
          whatRoundHasItBeenBombed: round,
          isTheShipDestroyed: shipDestroyed,
          coordinationNumber: caseAttacked.coordinationNumber,
          coordinationAlphabet: caseAttacked.coordinationAlphabet,
        }
        setOpponentCases(casesTemp);
        setPlayersTurn(false);
      }
    }
  }

  // random attack on player board
  const opponentPlayerMoove = () => {
    if(!playersTurn){
      let isOk = false;
      let count = 0;
      while(!isOk || count < 100) {
        const caseToSelect = Math.floor(Math.random() * 100);
        if(!playerCases[caseToSelect].bombed
          && playerCases[caseToSelect].ship !== null && playerCases[caseToSelect].ship?.id !== undefined
        ){
          console.log(`opponement clicked on case ${caseToSelect}`);
          const arrTemp = [...playerCases];
          arrTemp[caseToSelect] = {...arrTemp[caseToSelect], bombed: true}
          setPlayerCases(arrTemp);

          if(playerCases[caseToSelect].ship !== null && playerCases[caseToSelect].ship?.id !== undefined){
            const playerShipsPlacmentTemp = [...playerShipsPlacment];
            const casesArr = [...playerShipsPlacment[playerCases[caseToSelect].ship?.id || 0].cases];
            casesArr[playerCases[caseToSelect].shipCaseId] = {
              ...casesArr[playerCases[caseToSelect].shipCaseId],
              bombed: true
            }
            let destroyed = false;
            console.log('ship : ' + playerCases[caseToSelect].ship?.name)
            for (let index = 0; index < casesArr.length; index++) {
              const caseElement = casesArr[index];
              console.log(caseElement.bombed);
              if(!caseElement.bombed) {
                destroyed = false;
                console.log(`case ${caseElement.caseNumber} not bombed`)
                break;
              }
              else {
                destroyed = true;
                console.log(`case ${caseElement.caseNumber} bombed`)
              }
            }
            if(destroyed) console.log(`ship ${playerCases[caseToSelect].ship?.name} destroyed`)
            playerShipsPlacment[playerCases[caseToSelect].ship?.id || 0] = {
              ...playerShipsPlacment[playerCases[caseToSelect].ship?.id || 0],
              destroyed: destroyed,
              cases: casesArr
            }
            playerShipsPlacmentTemp[caseToSelect] = {
              ...playerShipsPlacmentTemp[caseToSelect],
              cases: casesArr
            };
            setPlayerShipsPlacment(playerShipsPlacmentTemp);
          }
          
          setPlayersTurn(true);
          isOk = true;
        }
        // count++;
      }
    }
  }

  return (
    <>
      <div className='mx-auto p-10 flex'>
        <PlayerBoard startTheGame={startTheGame} gameStarted={gameStarted} cases={playerCases} setCases={setPlayerCases} />

        {gameStarted ? 
        <>
          <div onClick={opponentPlayerMoove} className='cursor-pointer'>click</div> {/* temp */}
          <OpponentBoard cases={opponentCases} setCases={setOpponentCases} attackACase={attackACase}/> 
        </>
          : <></>
        }

      </div>
      <ModalGameFinished open={openModalEnGame} setOpen={setOpenModalEnGame} won={gameEnded.didIWon} />
    </>
  )
}

export default Battleship