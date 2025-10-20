import React, { useEffect, useState } from 'react';
import { caseTypes, casePosition, caseInterface } from '../../../../@types/minesweeper';
import { checkIfGameIsEnded, getPositionArray, initCases } from 'utils/Minesweepeer/Minesweeper';

const Board = ({
  xcases, //8
  ycases, //7
  safeFlags,
  changeNumberOfFlag,
  endGame,
  start,
  setStart,
  reset
}: {
  xcases: number;
  ycases: number;
  safeFlags: {
    max: number;
    used: number;
  };
  changeNumberOfFlag: Function;
  endGame: Function;
  start: boolean;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  reset: boolean;
}) => {
  const [cases, setCases] = useState<caseInterface[]>([]);

  useEffect(() => {
    setCases(initCases(xcases, ycases, safeFlags.max));
  }, [safeFlags.max, reset]);


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
      if(casesArrayTemp[index].type === caseTypes.MINE){
        setTimeout(() => endGame(false), 1000)
      }
      else{
        if(casesArrayTemp[index].type === caseTypes.EMPTY){
          const casesTempToDetect: boolean[] = Array(casesArrayTemp.length);
          detectEmptyCases(index, casesArrayTemp[index].placment, casesTempToDetect)
        }
        if(checkIfGameIsEnded(casesArrayTemp, xcases, ycases, safeFlags.max)) endGame(true)
      }
      setCases(casesArrayTemp);
    }
  }

  const handleRightClick = (event: any) => {
    if(!start) setStart(true);
    event.preventDefault();
    const id: number = parseInt((event.target  as HTMLInputElement).id.substring(5));
    if(cases.length > 0) {
      if(!cases[id].showed && (safeFlags.max > safeFlags.used)){
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

  const detectEmptyCases = (position: number, placment: casePosition | null, casesTempToDetect: boolean[]) => {
    // ne se lance que quand on clique sur une case vide
    const arrayTemp = cases;
    if(placment){
      // let caseToCheck: number[] = getPositionArrayForDetection(position, placment);
      let caseToCheck: number[] = getPositionArray(position, placment, xcases);
      for (let index = 0; index < caseToCheck.length; index++) {
        const num = caseToCheck[index];
        if(!casesTempToDetect[num]){
          casesTempToDetect[num] = true;
          arrayTemp[num].showed = true;
          if(arrayTemp[num].type === caseTypes.EMPTY)
            detectEmptyCases(num, arrayTemp[num].placment, casesTempToDetect);
        }
      }
      setCases(arrayTemp)
    }
  }

  const numberColor = (num: number): JSX.Element => {
    if(num === 1){
      return <span style={{color: 'blue'}}>{num}</span>}
    else if(num === 2){
      return <span style={{color: 'green'}}>{num}</span>}
    else if(num === 3){
      return <span style={{color: 'red'}}>{num}</span>}
    else if(num === 4)
      return <span style={{color: 'darkblue'}}>{num}</span>
    else if(num === 5)
      return <span style={{color: 'darkred'}}>{num}</span>
    else if(num === 6)
      return <span style={{color: 'darkcyan'}}>{num}</span>
    else if(num === 7)
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
          onClick={() => handleClickOnCase(index)}
          onContextMenu={handleRightClick}
        >
          <div className='h-auto w-auto m-auto'>{item.showed ? item.type === caseTypes.NUMBER ? numberColor(parseInt(item.text)): item.text : item.flagPlaced ? '🚩' : ''}</div>
        </div>
      ))}
    </div>
  );
};

export default Board;
