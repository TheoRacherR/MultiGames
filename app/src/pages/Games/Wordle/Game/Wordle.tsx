import { useContext, useEffect, useRef, useState } from "react";
import Board from "./Board";
import ModalEndGame from "./WordleModalEndGame";
import {
  caseCurrentState,
  casesInterface,
  finalScoreInterface,
  resultCompare,
  WordleContextInterface,
} from "../../../../@types/wordle";
import Keyboard from "./Keyboard";
import axios from "axiosConfig";
import { getUserInfos } from "utils/Default/Auth";
import { country, UserInfos, userRole, userStatus } from "../../../../@types/user";
import { useNavigate } from "react-router-dom";
import {
  WordleContext,
  WordleContextProvider,
} from "utils/Context/WordleContext";
import {
  checkIfLocalStorageWordleIsFine,
  checkIfUniqueArray,
  checkIfWordCorrespond,
  getWordFromGrid,
  nbTryMax,
  pressBackspace,
  updateCaseColor,
  updateKeyboardStates,
} from "utils/Wordle/Wordle";
import { wordList } from "assets/data/wordle/wordleList";

const alphabetic = "abcdefghijklmnopqrstuvwxyz";

const Wordle = () => {
  const navigate = useNavigate();
  const [finalScore, setFinalScore] = useState<finalScoreInterface>({
    ended: false,
    won: true,
    modalOpenned: false,
    nbTry: 0,
    wordSearched: ''
  });
  const [userInfos, setUserInfos] = useState<UserInfos>({
      id: "",
      email: "",
      firstname: "",
      lastname: "",
      pseudo: "",
      role: userRole.USER,
      status: userStatus.TO_ACTIVE,
      country: country.FRANCE,
    });
  const logged = useRef<boolean>();

  const [cases, setCases] = useState<casesInterface[]>();
  const gridInit = useRef<boolean>(false);
  const wordDay = useRef<{ id: string; word: string }>({
    id: "",
    word: "",
  });
  const wordleOfTodayDone = useRef<boolean>(false);

  const { /*setKeyPressed,*/ keyList, setKeyList, initKeys } = useContext(
    WordleContext
  ) as WordleContextInterface;

  const asyncGetInfo = async () => {
    let uInfos;
    try {
      uInfos = await getUserInfos();
    } catch (e) {
      logged.current = false;
    }
    try {
      if (uInfos) {
        setUserInfos(uInfos);
        logged.current = true;
      } else {
        logged.current = false;
      }
      const today = await getTodaysWord();
      if (today) {
        const check = await checkIfWordleIsDoneByUser();
        if (!check) {
          gridInit.current = !check;
        } else {
          // TODO Alerte wordle du jour deja fait
          return navigate("/wordle/game/already-done");
        }
      } else {
        return navigate("/wordle/game/word-dont-exists");
      }
    } catch (e) {
      logged.current = false;
    }
  };

  useEffect(() => {
    if(!finalScore.ended) {
      document.addEventListener("keydown", handleKeyDown, {
        capture: true,
        once: true,
      });
    }
  });

  const handleKeyDown = async (event: KeyboardEvent) => {
    if(finalScore.ended) return;
    if (alphabetic.includes(event.key.toLowerCase()) && cases) {
      let casesTemp = [...cases];
      const caseSelected = casesTemp.find((c) => c.selected);
      if (caseSelected) {
        casesTemp[cases.indexOf(caseSelected)].letterPlaced =
          event.key.toUpperCase();
        if (
          (cases.indexOf(caseSelected) + 1) % wordDay.current.word.length ===
          0
        ) {
          //
        } else {
          casesTemp[cases.indexOf(caseSelected)].selected = false;
          casesTemp[casesTemp.indexOf(caseSelected) + 1].selected = true;
        }
        setCases(casesTemp);
        // setKeyPressed(event.key.toUpperCase());
      }
    } else if (event.key === "Backspace" && cases) {
      setCases(await pressBackspace(wordDay.current.word, cases));
    } else if (event.key === "Enter" && cases) {
      await pressEnter(cases);
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
      if (wordReq.status === 200) {
        const wordNotSpaces = wordReq.data.word.replaceAll(/\s/g, "");
        wordDay.current = {
          id: wordReq.data.id,
          word: wordNotSpaces,
        };
        initGrid(wordNotSpaces);
      }
      // TODO Alerte pas de wordDay ajd
    } catch (e) {
      // TODO Alerte pas de wordDay ajd
    }
    return true;
  };

  const initGrid = async (wordArg: string) => {
    initKeys();
    let arrGridTemp: casesInterface[] = [];
    for (let lineIndex = 0; lineIndex < nbTryMax * wordArg.length; lineIndex++) {
      arrGridTemp.push({
        letterPlaced: "",
        state: caseCurrentState.UNUSED,
        selected: lineIndex === 0 ? true : false,
      });
    }
    setCases(arrGridTemp);
  };

  const endGame = async (
    gameWon: boolean,
    totalCases: casesInterface[],
    caseSelected: casesInterface
  ) => {
    const nbTry: number =
      (totalCases.indexOf(caseSelected) + 1) / wordDay.current.word.length;
    try {
      localStorage.setItem(
        "dailyWordleDone",
        JSON.stringify({
          nbTry: nbTry,
          won: true,
          player: userInfos ? userInfos.id : "",
          word: wordDay.current.id,
        })
      );
      if (userInfos) {
        await axios.post("/wordle/", {
          nbTry: nbTry,
          won: gameWon,
          player: userInfos.id,
          word: wordDay.current.id,
        });
      }
    } catch (e) {
      // TODO Alerte d'erreur de récupération des infos du user
    }
    setFinalScore({
      ended: true,
      won: gameWon,
      modalOpenned: true,
      nbTry: nbTry,
      wordSearched: wordDay.current.word
    });
  };

  const checkIfWordleIsDoneByUser = async (): Promise<boolean> => {
    try {
      if (checkIfLocalStorageWordleIsFine()) wordleOfTodayDone.current = true;
    } catch (e) {
      console.log(e);
    }
    try {
      if (wordleOfTodayDone.current) {
        console.log("already done");
        return true;
      }
      if (userInfos && wordDay.current.word.length > 0) {
        const wordleInfos = await axios.get(
          `/wordle/today/${userInfos.id}/${wordDay.current.id}`
        );
        if (wordleInfos) {
          wordleOfTodayDone.current = true;
          localStorage.setItem(
            "dailyWordleDone",
            JSON.stringify({
              nbTry: wordleInfos.data.nbTry,
              won: wordleInfos.data.won,
              player: wordleInfos.data.player.id,
              word: wordleInfos.data.word.id,
            })
          );
        }
        return true;
      }
    } catch (e) {}
    return false;
  };

  const pressEnter = async (casesList: casesInterface[]) => {
    let casesTemp = [...casesList];
    const caseSelected = casesTemp.find((c) => c.selected);
    if (caseSelected) {
      console.log(caseSelected);
      if (
        ((casesList.indexOf(caseSelected) + 1) % wordDay.current.word.length === 0)
        && caseSelected.letterPlaced !== ''
      ) {
          const typedWord = getWordFromGrid(
          casesTemp,
          caseSelected,
          wordDay.current.word
        );
        if(!wordList.some(w => w === typedWord.toLowerCase())){
          console.log("word doesn't exist");
          setCases(casesTemp);
          return;
        }
        //TODO end of the line, test it
        const comparison: resultCompare[] = checkIfWordCorrespond(
          wordDay.current.word,
          typedWord
        );
        casesTemp = updateCaseColor(casesTemp,caseSelected,wordDay.current.word,comparison);
        setKeyList(updateKeyboardStates(keyList,casesTemp,caseSelected,wordDay.current.word,comparison));

        if (
          checkIfUniqueArray(comparison) &&
          comparison[0] === resultCompare.PERFECT
        ) {
          // won
          endGame(true, casesList, caseSelected);
          document.removeEventListener("keydown", handleKeyDown)
        } else {
          // continue
          if(casesTemp.indexOf(caseSelected) === casesTemp.length-1){
            // loosed
            endGame(false, casesList, caseSelected);
          }
          else {
            casesTemp[casesList.indexOf(caseSelected)].selected = false;
            casesTemp[casesTemp.indexOf(caseSelected) + 1].selected = true;
          }
        }
        console.log(casesTemp)
      }
      setCases(casesTemp);
    }
  }


  useEffect(() => {
    asyncGetInfo();
  }, []);

  return (
    <>
      {wordDay.current.word.length > 0 ? (
        <>
          <div className="min-h-screen bg-[var(--color-primary)] text-white flex items-center justify-center p-8">

            <div className="w-full max-w-4xl">

              <main className="bg-white text-[#5533EA] rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold uppercase">WORDLE</h2>
                  <div className="text-sm text-[#6B5BEA]">Tu as {nbTryMax} essai{nbTryMax > 1 ? 's' : ''} pour deviner un mot de {wordDay.current.word.length} lettres</div>
                </div>

                <Board word={wordDay.current.word} cases={cases} />

                {/* <div className="keyboard grid gap-2 mt-4">
                  <div className="flex justify-center gap-2">
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">Q</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">W</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">E</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">R</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">T</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">Y</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">U</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">I</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">O</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">P</button>
                  </div>
                  <div className="flex justify-center gap-2">
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">A</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">S</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">D</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">F</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">G</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">H</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">J</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">K</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">L</button>
                  </div>
                  <div className="flex justify-center gap-2">
                    <button id="enter" className="inline-block px-4 py-2 rounded-md font-semibold bg-[#6C4EF6] text-white">ENTRER</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">Z</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">X</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">C</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">V</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">B</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">N</button>
                    <button className="key-btn inline-block px-3 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">M</button>
                    <button id="backspace" className="inline-block px-4 py-2 rounded-md font-semibold bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">⌫</button>
                  </div>
                </div> */}
                <Keyboard handleKeyDown={handleKeyDown} />
              </main>
            </div>
            </div>
            {finalScore.modalOpenned ?
              <ModalEndGame finalScore={finalScore} setFinalScore={setFinalScore} userInfos={userInfos} />
              :
              <></>
            }
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const WordleWrapperContext = () => {
  return (
    <WordleContextProvider>
      <Wordle />
    </WordleContextProvider>
  );
};

export default WordleWrapperContext;
