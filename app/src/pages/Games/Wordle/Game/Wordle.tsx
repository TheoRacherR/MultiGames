import { useEffect, useState } from 'react'
import Board, { checkIfUniqueArray, checkIfWordCorrespond, getWordFromGrid, updateCaseColor } from './Board'
import ModalEndGame from './ModalEndGame'
import { caseCurrentState, resultCompare } from '../../../../@types/wordle';

const alphabetic = 'abcdefghijklmnopqrstuvwxyz';

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


  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, {capture: true, once: true});
    document.removeEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    if(alphabetic.includes(event.key.toLowerCase()) && cases) {
      let casesTemp = [...cases];
      const caseSelected = casesTemp.find(c => c.selected);
      if(caseSelected){
        casesTemp[cases.indexOf(caseSelected)].letterPlaced = event.key.toUpperCase();
        if((cases.indexOf(caseSelected)+1) % word.length === 0){
          //TODO end of the line, test it
          const comparison: resultCompare[] = checkIfWordCorrespond(word, getWordFromGrid(casesTemp, caseSelected, word));
          console.log(comparison);
          casesTemp = updateCaseColor(casesTemp, caseSelected, word, comparison);
          if(checkIfUniqueArray(comparison) && comparison[0] === resultCompare.PERFECT){
            // won
            console.log('finished');
          }
          else {
            // continue
            console.log('continue');
          }
        }
        casesTemp[cases.indexOf(caseSelected)].selected = false;
        casesTemp[casesTemp.indexOf(caseSelected)+1].selected = true;
        setCases(casesTemp);
      }
    }
    else if(event.key === 'Backspace' && cases) {
      const casesTemp = [...cases];
      const caseSelected = casesTemp.find(c => c.selected);
      if(caseSelected){
        if(cases.indexOf(caseSelected) > 0 && casesTemp[cases.indexOf(caseSelected)-1].state === caseCurrentState.UNUSED){
          casesTemp[cases.indexOf(caseSelected)-1].selected = true;
          casesTemp[cases.indexOf(caseSelected)-1].letterPlaced = '';
          casesTemp[cases.indexOf(caseSelected)].selected = false;
        }
        setCases(casesTemp);
      }
    }
    else {
      setCases(cases)
    }
  }

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
        endGame={endGame}
      />
      <ModalEndGame open={open} setOpen={setOpen} finalScore={finalScore}/>
    </div>
  )
}

export default Wordle