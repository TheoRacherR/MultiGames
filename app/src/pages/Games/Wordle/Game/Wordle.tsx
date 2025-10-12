import { useEffect, useRef, useState } from "react";
import Board, {
  checkIfUniqueArray,
  checkIfWordCorrespond,
  getWordFromGrid,
  updateCaseColor,
} from "./Board";
import ModalEndGame from "./ModalEndGame";
import { caseCurrentState, resultCompare } from "../../../../@types/wordle";
import Keyboard from "./Keyboard";
import axios from "../../../../axiosConfig";
import { getUserInfos } from "utils/Default/Auth";
import { UserInfos } from "../../../../@types/user";
import { useNavigate } from "react-router-dom";

const alphabetic = "abcdefghijklmnopqrstuvwxyz";

export interface casesInterface {
  letterPlaced: string;
  state: caseCurrentState;
  selected: boolean;
}

const Wordle = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [finalScore, setFinalScore] = useState<{ won: true; nbTry: number }>({
    won: true,
    nbTry: 0,
  });
  const userInfo = useRef<UserInfos | null>(null);
  const logged = useRef<boolean>();

  const [cases, setCases] = useState<casesInterface[]>();
  const gridInit = useRef<boolean>(false);
  const nbTry: number = 6;
  const wordDay = useRef<{id: string, word: string}>({
    id: "",
    word: ""
  });
  const wordleOfTodayDone = useRef<boolean>(false);

  const asyncGetInfo = async () => {
    let uInfos;
    try {
      uInfos = await getUserInfos();
    }
      catch(e) {
      console.log(e)
      logged.current = false;
    }
    try {
      if(uInfos) {
        userInfo.current = uInfos;
        console.log(userInfo.current);
        logged.current = true;
        console.log(logged.current);
      }
      else {
        logged.current = false;
      }
      const today = await getTodaysWord();
      if(today) {
        console.log('today')
        const check = await checkIfWordleIsDoneByUser();
        if(!check) {
          console.log('ckeck false')
          gridInit.current = !check;
        }
        else {
          console.log('navigate')
          // TODO Alerte wordle du jour deja fait
          return navigate('/');
        }
      }
    }
    catch(e) {
      console.log(e)
      logged.current = false;
    }
  }


  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, {
      capture: true,
      once: true,
    });
    document.removeEventListener("keydown", handleKeyDown);
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    if (alphabetic.includes(event.key.toLowerCase()) && cases) {
      let casesTemp = [...cases];
      const caseSelected = casesTemp.find((c) => c.selected);
      if (caseSelected) {
        casesTemp[cases.indexOf(caseSelected)].letterPlaced =
          event.key.toUpperCase();
        if ((cases.indexOf(caseSelected) + 1) % wordDay.current.word.length === 0) {
          //
        } else {
          casesTemp[cases.indexOf(caseSelected)].selected = false;
          casesTemp[casesTemp.indexOf(caseSelected) + 1].selected = true;
        }
        setCases(casesTemp);
      }
    } else if (event.key === "Backspace" && cases) {
      const casesTemp = [...cases];
      const caseSelected = casesTemp.find((c) => c.selected);
      if (caseSelected) {
        if (
          (cases.indexOf(caseSelected) + 1) % wordDay.current.word.length === 0 &&
          casesTemp[cases.indexOf(caseSelected)].letterPlaced !== ""
        ) {
          casesTemp[cases.indexOf(caseSelected)].letterPlaced = "";
        } else if (
          cases.indexOf(caseSelected) > 0 &&
          casesTemp[cases.indexOf(caseSelected) - 1].state ===
            caseCurrentState.UNUSED
        ) {
          casesTemp[cases.indexOf(caseSelected) - 1].selected = true;
          casesTemp[cases.indexOf(caseSelected) - 1].letterPlaced = "";
          casesTemp[cases.indexOf(caseSelected)].selected = false;
        }
        setCases(casesTemp);
      }
    } else if (event.key === "Enter" && cases) {
      let casesTemp = [...cases];
      const caseSelected = casesTemp.find((c) => c.selected);
      if (caseSelected) {
        if ((cases.indexOf(caseSelected) + 1) % wordDay.current.word.length === 0) {
          //TODO end of the line, test it
          const comparison: resultCompare[] = checkIfWordCorrespond(
            wordDay.current.word,
            getWordFromGrid(casesTemp, caseSelected, wordDay.current.word)
          );
          casesTemp = updateCaseColor(
            casesTemp,
            caseSelected,
            wordDay.current.word,
            comparison
          );
          if (
            checkIfUniqueArray(comparison) &&
            comparison[0] === resultCompare.PERFECT
          ) {
            // won
            gameWon(cases, caseSelected);
          } else {
            // continue
            console.log("continue");
            casesTemp[cases.indexOf(caseSelected)].selected = false;
            casesTemp[casesTemp.indexOf(caseSelected) + 1].selected = true;
          }
        }
        setCases(casesTemp);
      }
    } else {
      setCases(cases);
    }
  };

  const getTodaysWord = async (): Promise<boolean> => {
    try {
      const wordReq = await axios.get(
        `/wordle-day/${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`
      );
      console.log('wordReq done')
      if (wordReq.status === 200) {
        console.log('wordReq status ok')
        const wordNotSpaces = wordReq.data.word.replaceAll(/\s/g,'');
        wordDay.current = {
          id: wordReq.data.id,
          word: wordNotSpaces
        };
        initGrid(wordNotSpaces);
      }
      // TODO Alerte pas de wordDay ajd
    } catch (e) {
      console.log(e);
      // TODO Alerte pas de wordDay ajd
    }
    return true;
  };

  const initGrid = async (wordArg: string) => {;
    let arrGridTemp: casesInterface[] = [];
    for (let lineIndex = 0; lineIndex < nbTry * wordArg.length; lineIndex++) {
      arrGridTemp.push({
        letterPlaced: "",
        state: caseCurrentState.UNUSED,
        selected: lineIndex === 0 ? true : false,
      });
    }
    setCases(arrGridTemp);
  };

  const gameWon = async (totalCases: casesInterface[], caseSelected: casesInterface) => {
    console.log("finished");
    const nbTry: number = (totalCases.indexOf(caseSelected) + 1) / wordDay.current.word.length;
    try {
      if(userInfo.current) {
        await axios.post('/wordle/', {
          nbTry: nbTry,
          won: true,
          player: userInfo.current.id,
          word: wordDay.current.id
        })
      }
      setFinalScore({
        won: true,
        nbTry: nbTry,
      });
      setOpen(true);
    }
    catch (e) {
      console.log(e);
      // TODO Alerte d'erreur de récupération des infos du user
    }
  }

  const checkIfWordleIsDoneByUser = async (): Promise<boolean> => {
    try {
      console.log(userInfo.current)
      console.log(wordDay.current.word)
      if(userInfo.current && wordDay.current.word.length > 0) {
        await axios.get(`/wordle/today/${userInfo.current.id}/${wordDay.current.id}`);
        wordleOfTodayDone.current = true;
        return true;
      }
    }
    catch(e) {
      console.log(e)
    }
    console.log('second')
    return false;
  }

  useEffect(() => {
    asyncGetInfo();
  }, [])


  return (
    <div className="w-4/5 mx-auto p-10">
      {wordDay.current.word.length > 0 ? (
        <>
          <Board word={wordDay.current.word} cases={cases} />
          {/* <Keyboard handleKeyDown={handleKeyDown}/> */}
          <ModalEndGame open={open} setOpen={setOpen} finalScore={finalScore} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Wordle;
