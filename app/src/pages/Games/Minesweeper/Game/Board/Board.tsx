import { Dispatch, SetStateAction } from "react";
import {
  caseTypes,
  casePosition,
  caseInterface,
  minesweeperDifficulty,
  difficultyDetails,
} from "../../../../../@types/minesweeper";
import {
  checkIfGameIsEnded,
  getPositionArray,
} from "utils/Minesweeper/Minesweeper";
import { difficultyStyleBoard, difficultyStyleCase, styleCase } from "assets/Minesweeper/Board";

const Board = ({
  mineCases,
  setMineCases,
  difficulty,
  gameRules,
  changeNumberOfFlag,
  endGame,
  safeFlags,
  setSafeFlags,
  started,
  startGame,
}: {
  mineCases: caseInterface[],
  setMineCases: Dispatch<SetStateAction<caseInterface[]>>,
  difficulty: minesweeperDifficulty,
  gameRules: difficultyDetails,
  changeNumberOfFlag: (safeFlagArg: {used: number, max: number}, positive: boolean) => {
    flag: {
        used: number;
        max: number;
    };
    result: boolean;
},
  endGame: (won: boolean) => Promise<void>,
  safeFlags: { used: number, max: number },
  setSafeFlags: React.Dispatch<React.SetStateAction<{
    used: number;
    max: number;
}>>
  started: boolean,
  startGame: () => void,
}) => {

  const handleClickOnCase = (index: number) => {
    if (!started) startGame();
    if (!mineCases[index].showed) {
      const casesArrayTemp = [...mineCases];
      let safeFlagTemp = safeFlags;
      if (casesArrayTemp[index].flagPlaced) {
        safeFlagTemp = changeNumberOfFlag(safeFlags, false).flag
      };
      casesArrayTemp[index] = {
        type: casesArrayTemp[index].type,
        flagPlaced: casesArrayTemp[index].flagPlaced,
        text: casesArrayTemp[index].text,
        showed: true,
        placment: casesArrayTemp[index].placment,
        loosed: casesArrayTemp[index].type === caseTypes.MINE,
      };
      if (casesArrayTemp[index].type === caseTypes.MINE) {
        setTimeout(() => endGame(false), 1000);
      } else {
        if (casesArrayTemp[index].type === caseTypes.EMPTY) {
          const casesTempToDetect: boolean[] = Array(casesArrayTemp.length);
          safeFlagTemp = detectEmptyCases(
            index,
            casesArrayTemp[index].placment,
            casesTempToDetect,
            safeFlagTemp
          );
        }
        if (checkIfGameIsEnded(casesArrayTemp, gameRules.xcases, gameRules.ycases, safeFlags.max))
          endGame(true);
      }
      setSafeFlags(safeFlagTemp);
      setMineCases(casesArrayTemp);
    }
  };

  const handleRightClick = (event: any) => {
    if (!started) startGame();
    event.preventDefault();
    const id: number = parseInt((event.target as HTMLInputElement).id);
    if (mineCases.length > 0) {
      if (!mineCases[id].showed && safeFlags.max > safeFlags.used) {
        const casesArrayTemp = [...mineCases];
        const result = changeNumberOfFlag(safeFlags, !casesArrayTemp[id].flagPlaced);
        setSafeFlags(result.flag);
        if (result.result) {
          casesArrayTemp[id] = {
            type: casesArrayTemp[id].type,
            flagPlaced: !casesArrayTemp[id].flagPlaced,
            text: casesArrayTemp[id].text,
            showed: false,
            placment: casesArrayTemp[id].placment,
            loosed: false,
          };
          setMineCases(casesArrayTemp);
        }
      }
    }
  };

  const detectEmptyCases = (
    position: number,
    placment: casePosition | null,
    casesTempToDetect: boolean[],
    safeFlagsArg: {
    used: number;
    max: number;
}
  ) => {
    // ne se lance que quand on clique sur une case vide
    const arrayTemp = mineCases;
    if (placment) {
      // let caseToCheck: number[] = getPositionArrayForDetection(position, placment);
      let caseToCheck: number[] = getPositionArray(position, placment, gameRules.xcases);
      for (let index = 0; index < caseToCheck.length; index++) {
        const num = caseToCheck[index];
        if (!casesTempToDetect[num]) {
          casesTempToDetect[num] = true;
          arrayTemp[num].showed = true;
          if (arrayTemp[num].type === caseTypes.EMPTY) {
            if(arrayTemp[num].flagPlaced) {
              console.log(`delete flag ${arrayTemp[num]}`)
              safeFlagsArg = changeNumberOfFlag(safeFlagsArg, !arrayTemp[num].flagPlaced).flag;
            }
            safeFlagsArg = detectEmptyCases(num, arrayTemp[num].placment, casesTempToDetect, safeFlagsArg);
          }
        }
      }
      setMineCases(arrayTemp);
    }
    return safeFlagsArg;
  };

  const numberColor = (num: number): JSX.Element => {
    if(num >= 1 && num <=8) return <span style={{ color: `var(--color-number-${num})` }}>{num}</span>
    else return <span style={{ color: "black" }}>{num}</span>;
  };

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
    <div
      className={`flex-[3] grid`}
      style={{
        ...difficultyStyleBoard[difficulty],
        gridTemplateColumns: `repeat(${gameRules.xcases}, minmax(0, 1fr))`,
      }}
    >
      {mineCases.map((item, index) => (
        <div
          key={`case_minesweeper_${index}`}
          id={`${index}`}
          style={{ ...difficultyStyleCase[difficulty], ...styleCase }}
          className={`
            ${item.showed 
              ? 'bg-[#fff] border-[#F0EEFF] cursor-default'
              : 'bg-[#FBF9FF] border-[#E9E6FF] cursor-pointer'
            }
            ${item.showed && item.loosed ? 'bg-[var(--color-case-bombed)]' : ''}
            ${item.flagPlaced ? 'bg-[#FFF5F7] text-[var(--color-case-bombed)]' : '' }
            border-[1px] text-center place-items-center font-bold 
            select-none  flex justify-center
          `}
          onClick={() => handleClickOnCase(index)}
          onContextMenu={handleRightClick}
        >
          {item.showed
            ? item.type === caseTypes.NUMBER
              ? numberColor(parseInt(item.text))
              : item.text
            : item.flagPlaced
            ? "🚩"
            : ""}
        </div>
      ))}
    </div>
  );
};

export default Board;
