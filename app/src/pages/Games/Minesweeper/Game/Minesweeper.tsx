import { useEffect, useRef, useState } from "react";
import {
  caseInterface,
  difficultyDetails,
  minesweeperDifficulty,
  rules,
} from "../../../../@types/minesweeper";
import MinesweeperModalEndGame from "./MinesweeperModalEndGame";
import { UserInfos } from "../../../../@types/user";
import { getUserInfos } from "utils/Default/Auth";
import axios from "utils/Default/axiosConfig";
import { initCases } from "utils/Minesweeper/Minesweeper";
import {
  difficultyObj,
  difficultyStyleCase,
  difficultyStyleBoard,
  styleCase,
} from "assets/Minesweeper/Board";
import Informations from "./Board/Informations";
import Board from "./Board/Board";
import Menu from "./Board/Menu/Menu";

const Minesweeper = () => {
  const [difficulty, setDifficulty] = useState<minesweeperDifficulty>(
    minesweeperDifficulty.EASY
  );
  const [timer, setTimer] = useState<number>(0);
  const [safeFlags, setSafeFlags] = useState<{ used: number; max: number }>({
    used: 0,
    max: 0,
  });
  const [start, setStart] = useState<boolean>(false);
  const [finalScore, setFinalScore] = useState<{
    end: boolean;
    won: boolean;
    score: number;
  }>({ won: false, score: 0, end: false });
  const [timeOutID, setTimeOutID] = useState<NodeJS.Timeout>();
  const [reset, setReset] = useState<boolean>(false);
  const userInfo = useRef<UserInfos | null>(null);

  const [mineCases, setMineCases] = useState<caseInterface[]>([]);
  const [gameRules, setGameRules] = useState<difficultyDetails>(rules.easy);

  useEffect(() => {
    if (start) {
      const timeOutID = setTimeout(() => setTimer(timer + 1), 1000);
      setTimeOutID(timeOutID);
    }
  }, [start, timer]);

  const resetTimer = () => {
    clearTimeout(timeOutID);
  };

  const resetParty = (diff: minesweeperDifficulty) => {
    resetTimer();
    setTimer(0);
    setStart(false);
    changeDifficultyRules(diff);
    setReset(!reset);
  };

  const changeDifficultyRules = (diff: minesweeperDifficulty) => {
    console.log(diff);
    if (diff === minesweeperDifficulty.EASY) {
      setSafeFlags({ used: 0, max: rules.easy.mine });
      setGameRules(rules.easy);
      setMineCases(
        initCases(rules.easy.xcases, rules.easy.ycases, rules.easy.mine)
      );
      console.log(rules.easy);
    } else if (diff === minesweeperDifficulty.NORMAL) {
      setSafeFlags({ used: 0, max: rules.normal.mine });
      setGameRules(rules.normal);
      setMineCases(
        initCases(rules.normal.xcases, rules.normal.ycases, rules.normal.mine)
      );
      console.log(rules.normal);
    } else {
      setSafeFlags({ used: 0, max: rules.hard.mine });
      setGameRules(rules.hard);
      setMineCases(
        initCases(rules.hard.xcases, rules.hard.ycases, rules.hard.mine)
      );
      console.log(rules.hard);
    }
  };

  const changeDifficulty = (diff: minesweeperDifficulty) => {
    console.log(diff);
    setDifficulty(diff);
    resetParty(diff);
  };

  const changeNumberOfFlag = (safeFlagArg: {used: number, max: number}, positive: boolean) => {
    let safeFlagTemp = safeFlagArg;
    if (positive)
      if (safeFlags.max > safeFlags.used) {
        safeFlagTemp.used = safeFlagTemp.used + 1;
        return {flag: safeFlagTemp, result: true};
      }
      else {
        return {flag: safeFlagTemp, result: false};
      }
    else if (safeFlags.used === 0) {
      return {flag: safeFlagTemp, result: false};
    }
    else {
      safeFlagTemp.used = safeFlagTemp.used - 1;
      return {flag: safeFlagTemp, result: true};
    }
  };

  const endGame = async (won: boolean) => {
    setStart(false);
    // TODO Alerte Game gagné
    let uInfos;
    try {
      uInfos = await getUserInfos();
    } catch (e) {}
    if (uInfos) userInfo.current = uInfos;

    try {
      if (userInfo.current) {
        await axios.post("/minesweeper", {
          score: timer,
          won: won,
          level: difficulty,
          player: userInfo.current.id,
        });
      }
      setFinalScore({ won: won, score: timer, end: true });
    } catch (e) {
      // TODO Alerte d'erreur de récupération des infos du user
    }
  };

  const startGame = () => {
    setStart(true);
  }

  useEffect(() => {
    resetParty(minesweeperDifficulty.EASY);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-primary)] text-white flex items-start justify-center p-8">
      <div className="w-full max-w-6xl">
        <div className="bg-white text-[#5533EA] rounded-2xl shadow-xl p-6">;

          <Menu
            difficulty={difficulty} timer={timer}
            changeDifficulty={changeDifficulty}
            started={start} safeFlags={safeFlags}
            resetParty={resetParty} endGame={endGame}
          />

          <section className="flex gap-6">
            <Board
              mineCases={mineCases}
              setMineCases={setMineCases}
              difficulty={difficulty}
              gameRules={gameRules}
              changeNumberOfFlag={changeNumberOfFlag}
              endGame={endGame}
              safeFlags={safeFlags}
              setSafeFlags={setSafeFlags}
              started={start}
              startGame={startGame}
            />
            <Informations/>
          </section>
        </div>
      </div>

      {finalScore.end ? (
        <MinesweeperModalEndGame
          finalScore={finalScore}
          setFinalScore={setFinalScore}
          resetParty={resetParty}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Minesweeper;
