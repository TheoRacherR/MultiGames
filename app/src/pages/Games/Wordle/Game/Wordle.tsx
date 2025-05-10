import { useEffect, useState } from 'react'
import Board from './Board'
import ModalEndGame from './ModalEndGame'
import { caseCurrentState } from '../../../../@types/wordle';

export interface casesInterface {
  letterPlaced: string,
  state: caseCurrentState;
  selected: boolean;
}

const Wordle = () => {
  const [open, setOpen] = useState(false)
  const [finalScore, setFinalScore] = useState<{won: boolean, score: Date | null}>({won: false, score: null})
  
  const [cases, setCases] = useState<casesInterface[]>();
  const [gridInit, setGridInit] = useState<boolean>(false);
  const nbTry: number = 6;
  const word = 'taxiphone'; //TODO


  const initGrid = () => {
    let arrGridTemp: casesInterface[] = [];
    for (let lineIndex = 0; lineIndex < (nbTry * word.length); lineIndex++) {
      arrGridTemp.push({
        letterPlaced: '',
        state: caseCurrentState.UNUSED,
        selected: lineIndex === 0 ? true : false
      });
    }
    setCases(arrGridTemp);
    console.log('init')
  }

  useEffect(() => {
    if(!gridInit) {
      initGrid();
      setGridInit(true);
    }
  }, []);

  const endGame = (won: boolean) => {
    setFinalScore({won: won, score: new Date()});
    setOpen(true);
  }

  return (
    <div className='w-4/5 mx-auto p-10'>
      <Board
        word={word}
        cases={cases}
        setCases={setCases}
        endGame={endGame}
      />
      <ModalEndGame open={open} setOpen={setOpen} finalScore={finalScore}/>
    </div>
  )
}

export default Wordle