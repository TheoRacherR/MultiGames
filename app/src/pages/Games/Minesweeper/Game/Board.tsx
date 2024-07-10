import React, { useEffect, useState } from 'react';
import { caseTypes, minesweeperDifficulty, casePosition } from '../../../../@types/minesweeper';

interface casesInterface {
  type: caseTypes;
  flagPlaced: boolean;
  text: string;
  showed: boolean;
  placment: casePosition | null;
  loosed: boolean;
}

const Board = ({
  xcases, //8
  ycases, //7
  safeFlagsMax,
  safeFlagsUsed,
  difficulty,
  changeNumberOfFlag,
  endGame,
  start,
  setStart,
  reset
}: {
  xcases: number;
  ycases: number;
  safeFlagsMax: number;
  safeFlagsUsed: number
  difficulty: minesweeperDifficulty;
  changeNumberOfFlag: Function;
  endGame: Function;
  start: boolean;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  reset: boolean;
}) => {
  const [cases, setCases] = useState<casesInterface[]>([]);
  const array: casesInterface[] = [];


  const initCases = () => {
    console.log("init cases")
    let flagLeft: number = safeFlagsMax;
    let caseLeft: number = ycases * xcases;
    for (let x = 0; x < caseLeft; x++) {
      array.push({type: caseTypes.EMPTY, flagPlaced: false, text: '', showed: false, placment: checkMinePosition(x), loosed: false});
    }

    const arrayOfMines: number[] = [];
    for (let c = 0; c < flagLeft; c++) {
      let position = Math.floor(Math.random() * caseLeft);
      if (arrayOfMines.includes(position)) {
        while (arrayOfMines.includes(position)) {
          position = Math.floor(Math.random() * caseLeft);
        }
        arrayOfMines.push(position);
        array[position] = {type: caseTypes.MINE, flagPlaced: false, text: '💣', showed: false, placment: array[position].placment, loosed: false};
      } else {
        arrayOfMines.push(position);
        array[position] = {type: caseTypes.MINE, flagPlaced: false, text: '💣', showed: false, placment: array[position].placment, loosed: false};
      }
    }

    for (let p = 0; p < array.length; p++) {
      let count = 0;
      const position = array[p];
      if(position.type === caseTypes.EMPTY){
        const arrPosition = getPositionArray(p, array[p].placment);
        for (let a = 0; a < arrPosition.length; a++) {
          const element = arrPosition[a];
          if(array[element].type === caseTypes.MINE){
            count=count+1;
          }
        }
        // console.log(p + ' = ' + count);
        array[p] = {
          type: count > 0 ? caseTypes.NUMBER : caseTypes.EMPTY, flagPlaced: false,
          text: count > 0 ? count.toString() : '',
          showed: false,
          placment: array[p].placment,
          loosed: false
        }
      }
    }
    setCases(array)
  }

  const getPositionArray = (position: number, placment: casePosition | null) => {
    if(placment === casePosition.TOP_LEFT_CORNER)
      return [position+1,xcases,xcases+1] //top left corner
    else if(placment === casePosition.TOP)
      return [position+1, position+xcases+1, position+xcases, position+xcases-1, position-1] //top
    else if(placment === casePosition.TOP_RIGHT_CORNER)
      return [position-1, position+xcases, position+xcases-1] //top right corner
    else if(placment === casePosition.RIGHT)
      return [position+xcases, position+xcases-1, position-1, position-xcases-1, position-xcases] //right
    else if(placment === casePosition.BOTTOM_RIGHT_CORNER) //bottom left corner
      return [position-1, position-xcases, position-xcases-1] //bottom right corner
    else if(placment === casePosition.BOTTOM) 
      return [position+1, position-xcases+1, position-xcases, position-xcases-1, position-1] //bottom
    else if(placment === casePosition.BOTTOM_LEFT_CORNER)
      return [position+1, position-xcases+1, position-xcases] //bottom left corner
    else if(placment === casePosition.LEFT)
      return [position-xcases, position-xcases+1, position+1, position+xcases+1, position+xcases] //left
    else 
      return [position+1, position-xcases+1, position-xcases, position-xcases-1, position-1, position+xcases-1, position+xcases, position+xcases+1] //middle
  }

  // const getPositionArrayForDetection = (position: number, placment: casePosition | null) => {
  //   if(placment === casePosition.TOP_LEFT_CORNER)
  //     return [position+1,xcases] //top left corner
  //   else if(placment === casePosition.TOP)
  //     return [position+1, position+xcases, position-1] //top
  //   else if(placment === casePosition.TOP_RIGHT_CORNER)
  //     return [position-1, position+xcases] //top right corner
  //   else if(placment === casePosition.RIGHT)
  //     return [position+xcases, position-1, position-xcases] //right
  //   else if(placment === casePosition.BOTTOM_RIGHT_CORNER)
  //     return [position-1, position-xcases] //bottom right corner
  //   else if(placment === casePosition.BOTTOM) 
  //     return [position+1, position-xcases, position-1] //bottom
  //   else if(placment === casePosition.BOTTOM_LEFT_CORNER)
  //     return [position+1, position-xcases] //bottom left corner
  //   else if(placment === casePosition.LEFT)
  //     return [position-xcases, position+1, position+xcases] //left
  //   else 
  //     return [position+1, position-xcases, position-1, position+xcases ] //middle
  // }

  const checkMinePosition = (nbCase: number) => {
      if(nbCase === 0)
        return casePosition.TOP_LEFT_CORNER
      
      else if(nbCase > 0 && nbCase < xcases-1)
        return casePosition.TOP
      
      else if(nbCase === xcases-1)
        return casePosition.TOP_RIGHT_CORNER
      
      else if(nbCase === xcases * (ycases-1))
        return casePosition.BOTTOM_LEFT_CORNER
      
      else if(nbCase === (xcases * ycases)-1)
        return casePosition.BOTTOM_RIGHT_CORNER
      
      else if((nbCase+1)%xcases === 0)
        return casePosition.RIGHT
      
      else if(nbCase%xcases === 0)
        return casePosition.LEFT
      
      else if(nbCase > (xcases * (ycases-1)) && nbCase < (xcases * ycases)-1) 
        return casePosition.BOTTOM
      
      else 
        return casePosition.MIDDLE
  }

  useEffect(() => {
    initCases();
  }, [safeFlagsMax, reset]);


  const handleClickOnCase = (index: number) => {
    if(!start) setStart(true);
    if(!cases[index].showed){
      const casesArrayTemp = [...cases];
      if(casesArrayTemp[index].flagPlaced) changeNumberOfFlag(false);
      casesArrayTemp[index] = { 
        type: casesArrayTemp[index].type,
        flagPlaced: casesArrayTemp[index].flagPlaced,
        text: casesArrayTemp[index].text,
        showed: true,
        placment: casesArrayTemp[index].placment,
        loosed: casesArrayTemp[index].type === caseTypes.MINE
      }
      console.log(`case ${index} set to true`);
      setCases(casesArrayTemp);
      if(cases[index].type === caseTypes.MINE){
        console.log('boom');
        setTimeout(() => endGame(false), 1000)
      }
      else{
        if(cases[index].type === caseTypes.EMPTY){
          const casesTempToDetect: boolean[] = Array(cases.length);
          detectEmptyCases(index, cases[index].placment, casesTempToDetect)
        }
        console.log('pas boom');
        checkIfGameIsEnded();
      }
    }
  }

  const handleRightClick = (event: any) => {
    if(!start) setStart(true);
    event.preventDefault();
    const id: number = parseInt((event.target  as HTMLInputElement).id.substring(5));
    if(cases.length > 0) {
      if(!cases[id].showed && (safeFlagsMax > safeFlagsUsed)){
        const casesArrayTemp = [...cases];
        const result = changeNumberOfFlag(!casesArrayTemp[id].flagPlaced)
        if(result) {
          casesArrayTemp[id] = { 
            type: casesArrayTemp[id].type,
            flagPlaced: !casesArrayTemp[id].flagPlaced,
            text: casesArrayTemp[id].text,
            showed: false,
            placment: casesArrayTemp[id].placment,
            loosed: false,
          }
          setCases(casesArrayTemp);
        }
      }
    }
  }

  const checkIfGameIsEnded = () => {
    let totalScoreToAim = (xcases * ycases) - safeFlagsMax;
    console.log(totalScoreToAim)
    for (let c = 0; c < cases.length; c++) {
      const ca = cases[c];
      if(ca.type !== caseTypes.MINE && ca.showed)
        totalScoreToAim = totalScoreToAim - 1;
    }
    console.log(totalScoreToAim)
    if(totalScoreToAim === 1) endGame(true)
  }

  const detectEmptyCases = (position: number, placment: casePosition | null, casesTempToDetect: boolean[]) => {
    // ne se lance que quand on clique sur une case vide
    const arrayTemp = cases;
    if(placment){
      console.log(position);
      console.log(placment)
      // let caseToCheck: number[] = getPositionArrayForDetection(position, placment);
      let caseToCheck: number[] = getPositionArray(position, placment);
      console.log(caseToCheck);
      for (let index = 0; index < caseToCheck.length; index++) {
        const num = caseToCheck[index];
        if(!casesTempToDetect[num]){
          casesTempToDetect[num] = true;
          arrayTemp[num].showed = true;
          console.log(`-case ${num} set to true`);
          if(arrayTemp[num].type === caseTypes.EMPTY)
            detectEmptyCases(num, arrayTemp[num].placment, casesTempToDetect);
        }
      }
      setCases(arrayTemp)
    }
  }

  const numberColor = (num: number) => {
    if(num === 1)
      return <span style={{color: 'blue'}}>{num}</span>
    else if(num === 2)
      return <span style={{color: 'green'}}>{num}</span>
    else if(num === 2)
      return <span style={{color: 'red'}}>{num}</span>
    else if(num === 2)
      return <span style={{color: 'darkblue'}}>{num}</span>
    else if(num === 2)
      return <span style={{color: 'darkred'}}>{num}</span>
    else if(num === 2)
      return <span style={{color: 'darkcyan'}}>{num}</span>
    else if(num === 2)
      return <span style={{color: 'purple'}}>{num}</span>
    else
      return <span style={{color: 'black'}}>{num}</span>
  }

  
/*
intacte
click droit: pas assez de flag > rien
click droit: flag placed > -1 flag
click gauche: bomb > perdu fin recap
click gauche: vide > rien
click gauche: nombre
click gauche: sur un drapeau: -1 drapeau

OK
case showed : show text
case !showed : flag placed ? drapeau : ''


*/

  return (
    <div className="w-full flex flex-wrap">
      {cases.map((item, index) => (
        <div 
          key={index}
          id={`case_${index}`}
          className= ' text-white flex justify-center align-center box-border	border border-black cursor-pointer select-none' 
          style={{
            width: `calc(100% /${xcases})`, aspectRatio: 1,
            backgroundColor: item.showed ? item.loosed ? 'red' : 'rgb(173 178 186)' : 'rgb(107 114 128)'
          }}
          onClick={(e) => handleClickOnCase(index)}
          onContextMenu={handleRightClick}
        >
          {/* <div className='h-auto w-auto m-auto'>{item.showed ? item.type === caseTypes.NUMBER ? numberColor(parseInt(item.text)): item.text : item.flagPlaced ? '🚩' : ''}</div> */}
          <div className='h-auto w-auto m-auto'>{item.text} {item.showed ? 'o' : 'n'}</div>
        </div>
      ))}
    </div>
  );
};

export default Board;
