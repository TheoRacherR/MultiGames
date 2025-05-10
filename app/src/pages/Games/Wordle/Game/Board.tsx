import React, { useEffect } from 'react';
import { casesInterface } from './Wordle';
import { caseCurrentState, resultCompare } from '../../../../@types/wordle';

const alphabetic = 'abcdefghijklmnopqrstuvwxyz';

const Board = ({
  word,
  cases,
  setCases,
  endGame,
}: {
  word: string,
  cases: casesInterface[] | undefined
  setCases: React.Dispatch<React.SetStateAction<casesInterface[] | undefined>>;
  endGame: Function;
}) => {
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

  const getWordFromGrid = (grid: casesInterface[], caseSelected: casesInterface, wordSearched: string): string => {
    let stringWord = '';
    for (let index = 0; index < wordSearched.length; index++) {
      stringWord = grid[grid.indexOf(caseSelected) - index].letterPlaced + stringWord;
    }
    return stringWord;
  }

  const checkIfWordCorrespond = (wordSearched: string, wordGet: string): resultCompare[] => {
    if(wordGet.toLowerCase() === wordSearched.toLowerCase()) {
      return Array(wordGet.length).fill(resultCompare.PERFECT);
    }
    else {
      let wordSearchedTemp = wordSearched;
      let arrayReturn = Array(wordGet.length);
      for (let index = 0; index < wordGet.length; index++) {
        if(wordGet[index].toLowerCase() === wordSearched[index].toLowerCase()){
          arrayReturn[index] = resultCompare.PERFECT;
          wordSearchedTemp = wordSearchedTemp.slice(0, index) + wordSearchedTemp.slice(index+1, wordSearchedTemp.length)
          console.log(wordSearchedTemp);
        }
      }
      for (let index = 0; index < wordGet.length; index++) {
        if(arrayReturn[index]) continue;
        const letterFound = wordSearchedTemp.split('').find(ws => ws === wordGet[index]);
        console.log(letterFound)
        if(letterFound) {
          // lettre dans le mot que l'on doit
          arrayReturn[index] = resultCompare.PARICAL;
          wordSearchedTemp = wordSearchedTemp.slice(0, wordSearchedTemp.indexOf(letterFound)) + wordSearchedTemp.slice(wordSearchedTemp.indexOf(letterFound)+1, wordSearchedTemp.length)
        }
        else {
          arrayReturn[index] = resultCompare.NONE;
        }
      }
      return arrayReturn;
    }
  }

  // TODO check if the word exist

  const updateCaseColor = (grid: casesInterface[], caseSelected: casesInterface, wordSearched: string, resultComparison: resultCompare[]): casesInterface[] => {
    let gridTemp = grid;
      for (let index = 0; index < wordSearched.length; index++) {
        gridTemp[grid.indexOf(caseSelected) - wordSearched.length + index+1].state = resultComparison[index] === resultCompare.PERFECT ? caseCurrentState.CORRECT : resultComparison[index] === resultCompare.PARICAL ? caseCurrentState.PARTIALLY_RIGHT : caseCurrentState.WRONG;
      }
    return gridTemp;
  }

  const checkIfUniqueArray = (arr: any[]): boolean => {
    if(arr.length > 0){
      const initValue = arr[0];
      for (let index = 1; index < arr.length; index++) {
        if(arr[index] !== initValue) return false;
      }
    }
    return true;
  }

  /*
  * 6 essais
  * entre 4 et 10 lettres
  * pas de tiret / apostrophe
  */

  return (
    <div
      className="flex flex-wrap gap-[1rem] justify-center mx-auto"
      style={{
        // width: `calc(((2.75rem+1rem) * ${word.length})-1rem)`,
        width: `calc(
          (
            (3.75rem) * ${word.length}
          )
            - 1rem
        )`
      }}
    >
      {cases ? cases.map((item, index) => (
        <div
          key={`line_${Math.trunc(index / word.length)}_case_${index % word.length}`}
          id={`line_${Math.trunc(index / word.length)}_case_${index % word.length}`}
          className= {`
            flex justify-center text-center items-center text-2xl w-11 aspect-square
            ${item.selected ? 'border-[#73adff] border-4' : 'border-black	border-2'} 
            select-none rounded-md gap-4 box-border
            ${item.state === caseCurrentState.CORRECT ?
              'bg-green-600 text-white' 
                : item.state === caseCurrentState.PARTIALLY_RIGHT ?
                  'bg-orange-600 text-white' 
                    : item.state === caseCurrentState.WRONG ?
                      'bg-gray-600 text-white'
                        : 'bg-white text-black'
            }
          `}
          style={{
            width: `
              calc(
                (100% / ${word.length} ) - 1rem
              )
            `, aspectRatio: 1,
          }}
        >
          {item.letterPlaced}
        </div>
      )) : <></>}
    </div>
  );
};

export default Board;
