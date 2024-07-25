import PlayerBoard from './PlayerBoard/PlayerBoard';
import OpponentBoard from './OpponentBoard';
import { useState } from 'react';

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
}


const Battleship = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const startTheGame = () => {
    setGameStarted(true)
    console.log("first")
  }

  return (
    <div className='mx-auto p-10 flex'>
      <PlayerBoard startTheGame={startTheGame} gameStarted={gameStarted}/>
      {gameStarted ? <OpponentBoard/> : <></>}
    </div>
  )
}

export default Battleship