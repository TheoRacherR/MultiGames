import { useContext, useEffect, useRef, useState } from "react";
import Board, { checkIfUniqueArray, getWordFromGrid } from "./Board";
import ModalEndGame from "./WordleModalEndGame";
import {
  caseCurrentState,
  casesInterface,
  resultCompare,
  WordleContextInterface,
} from "../../../../@types/wordle";
import Keyboard from "./Keyboard";
import axios from "axiosConfig";
import { getUserInfos } from "utils/Default/Auth";
import { UserInfos } from "../../../../@types/user";
import { Route, useNavigate } from "react-router-dom";
import {
  WordleContext,
  WordleContextProvider,
} from "utils/Context/WordleContext";
import {
  checkIfLocalStorageWordleIsFine,
  checkIfWordCorrespond,
  updateCaseColor,
  updateKeyboardStates,
} from "utils/Wordle/Wordle";

const alphabetic = "abcdefghijklmnopqrstuvwxyz";

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
        userInfo.current = uInfos;
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
          return navigate("/already-done");
        }
      } else {
        return navigate("/word-dont-exists");
      }
    } catch (e) {
      logged.current = false;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, {
      capture: true,
      once: true,
    });
    document.removeEventListener("keydown", handleKeyDown);
  });

  // useEffect(() => {
  //   document.addEventListener(
  //     "keyup",
  //     () => {
  //       setKeyPressed("");
  //     },
  //     {
  //       capture: true,
  //       once: true,
  //     }
  //   );
  //   document.removeEventListener("keyup", (e) => {
  //     console.log(e);
  //   });
  // });

  const handleKeyDown = async (event: KeyboardEvent) => {
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
      const casesTemp = [...cases];
      const caseSelected = casesTemp.find((c) => c.selected);
      if (caseSelected) {
        if (
          (cases.indexOf(caseSelected) + 1) % wordDay.current.word.length ===
            0 &&
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
        if (
          (cases.indexOf(caseSelected) + 1) % wordDay.current.word.length ===
          0
        ) {
          const typedWord = getWordFromGrid(
            casesTemp,
            caseSelected,
            wordDay.current.word
          );
          try {
            const searchWord = await axios.post("wordle/checkWord", {
              word: typedWord.toLowerCase(),
            });
            console.log(searchWord.data);
            if (!searchWord.data) {
              console.log("word doesn't exist");
              return;
            }
          } catch (e) {
            console.log(e);
            setCases(cases);
            return;
          }
          //TODO end of the line, test it
          const comparison: resultCompare[] = checkIfWordCorrespond(
            wordDay.current.word,
            typedWord
          );
          casesTemp = updateCaseColor(
            casesTemp,
            caseSelected,
            wordDay.current.word,
            comparison
          );
          const keyListTemp = updateKeyboardStates(
            keyList,
            casesTemp,
            caseSelected,
            wordDay.current.word,
            comparison
          );
          console.log(keyListTemp);
          setKeyList(keyListTemp);
          if (
            checkIfUniqueArray(comparison) &&
            comparison[0] === resultCompare.PERFECT
          ) {
            // won
            gameWon(cases, caseSelected);
          } else {
            // continue
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
    for (let lineIndex = 0; lineIndex < nbTry * wordArg.length; lineIndex++) {
      arrGridTemp.push({
        letterPlaced: "",
        state: caseCurrentState.UNUSED,
        selected: lineIndex === 0 ? true : false,
      });
    }
    setCases(arrGridTemp);
  };

  const gameWon = async (
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
          player: userInfo.current ? userInfo.current.id : "",
          word: wordDay.current.id,
        })
      );
      if (userInfo.current) {
        await axios.post("/wordle/", {
          nbTry: nbTry,
          won: true,
          player: userInfo.current.id,
          word: wordDay.current.id,
        });
      }
      setFinalScore({
        won: true,
        nbTry: nbTry,
      });
      setOpen(true);
    } catch (e) {
      // TODO Alerte d'erreur de récupération des infos du user
    }
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
      if (userInfo.current && wordDay.current.word.length > 0) {
        const wordleInfos = await axios.get(
          `/wordle/today/${userInfo.current.id}/${wordDay.current.id}`
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
                  <div className="text-sm text-[#6B5BEA]">Tu as 6 essais pour deviner un mot de 5 lettres</div>
                </div>

                <section id="board" className="mx-auto mb-6" aria-label="Grille Wordle" style={{width:'max-content'}}>
                </section>

                <div id="message" className="h-8 text-center text-sm font-medium text-[#6B5BEA] mb-4" role="status" aria-live="polite"></div>

                <div className="keyboard grid gap-2 mt-4">
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
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-[#6B5BEA]">Mot du jour (démo) : <span id="hint" className="font-semibold">5 lettres</span></div>
                  <div className="flex gap-2">
                    <button id="newGame" className="px-3 py-2 rounded-md bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]">Nouvelle partie</button>
                  </div>
                </div>
              </main>
            </div>
            </div>
          {/* <Board word={wordDay.current.word} cases={cases} /> */}
          {/* <Keyboard handleKeyDown={handleKeyDown} /> */}
          {/* <ModalEndGame open={open} setOpen={setOpen} finalScore={finalScore} /> */}
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
