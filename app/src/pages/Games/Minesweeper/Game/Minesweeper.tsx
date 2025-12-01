import { useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import { minesweeperDifficulty } from "../../../../@types/minesweeper";
import Board from "./Board";
import MinesweeperModalEndGame from "./MinesweeperModalEndGame";
import { UserInfos } from "../../../../@types/user";
import { getUserInfos } from "utils/Default/Auth";
import axios from "utils/Default/axiosConfig";

interface difficultyDetails {
  mine: number;
  total_cases: number;
  xcases: number;
  ycases: number;
}

const rules: {
  easy: difficultyDetails;
  normal: difficultyDetails;
  hard: difficultyDetails;
} = {
  easy: {
    mine: 10,
    total_cases: 56, //7x8,
    xcases: 8,
    ycases: 7,
  },
  normal: {
    mine: 40,
    total_cases: 256, //16x16
    xcases: 16,
    ycases: 16,
  },
  hard: {
    mine: 99,
    total_cases: 484, //22x22
    xcases: 22,
    ycases: 22,
  },
};

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
  const [open, setOpen] = useState<boolean>(false);
  const [finalScore, setFinalScore] = useState<{
    won: boolean;
    score: number;
    end: boolean;
  }>({ won: false, score: 0, end: false });
  const [timeOutID, setTimeOutID] = useState<NodeJS.Timeout>();
  const [reset, setReset] = useState<boolean>(false);
  const userInfo = useRef<UserInfos | null>(null);

  useEffect(() => {
    if (start) {
      const timeOutID = setTimeout(() => setTimer(timer + 1), 1000);
      setTimeOutID(timeOutID);
    }
  }, [start, timer]);

  const resetTimer = () => {
    clearTimeout(timeOutID);
  };

  const resetParty = () => {
    resetTimer();
    setTimer(0);
    setSafeFlags((prev) => ({ ...prev, used: 0 }));
    setStart(false);
    initMines(difficulty);
    setReset(!reset);
  };

  const initMines = (diff: minesweeperDifficulty) => {
    if (diff === minesweeperDifficulty.EASY)
      setSafeFlags((prev) => ({ ...prev, max: rules.easy.mine }));
    else if (diff === minesweeperDifficulty.NORMAL)
      setSafeFlags((prev) => ({ ...prev, max: rules.normal.mine }));
    else setSafeFlags((prev) => ({ ...prev, max: rules.hard.mine }));
  };

  const changeDifficulty = (diff: minesweeperDifficulty) => {
    console.log(diff);
    setDifficulty(diff);
    resetParty();
    initMines(diff);
  };

  const changeNumberOfFlag = (positive: boolean) => {
    if (positive)
      if (safeFlags.max > safeFlags.used) {
        setSafeFlags((prev) => ({ ...prev, used: safeFlags.used + 1 }));
        return true;
      } else {
        console.log("error max flag used");
        return false;
      }
    else if (safeFlags.used === 0) {
      console.log("error min flag used");
      return false;
    } else {
      setSafeFlags((prev) => ({ ...prev, used: safeFlags.used - 1 }));
      return true;
    }
  };

  const endGame = async (won: boolean) => {
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
      setOpen(true);
    } catch (e) {
      // TODO Alerte d'erreur de récupération des infos du user
    }
  };

  useEffect(() => {
    resetParty();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-primary)] text-white flex items-start justify-center p-8">
      <div className="w-full max-w-6xl">
        <div className="bg-white text-[#5533EA] rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold uppercase">DÉMINEUR</h2>
            <div className="flex items-center gap-4">
              <div
                id="timer"
                className="text-white bg-[#6C4EF6] px-4 py-2 rounded-lg font-bold"
              >
                00:00
              </div>
              <div className="text-sm text-[#6B5BEA]">
                Drapeaux restants:{" "}
                <span id="flagsRemaining" className="font-bold">
                  0
                </span>
              </div>
            </div>
          </div>

          <section className="flex flex-wrap items-center gap-4 mb-6 controls">
            <label className="flex items-center gap-2 text-sm">
              <span className="text-[#6B5BEA]">Difficulté :</span>
              <select
                id="difficulty"
                className="px-3 py-2 rounded-lg bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]"
              >
                <option value="easy">Facile (8x8, 10 mines)</option>
                <option value="medium" selected>
                  Moyen (12x12, 24 mines)
                </option>
                <option value="hard">Difficile (16x16, 40 mines)</option>
              </select>
            </label>

            <button
              id="newGameBtn"
              className="btn px-4 py-2 rounded-lg bg-[#6C4EF6] text-white font-semibold"
            >
              Nouvelle partie
            </button>
            <button
              id="autoPlaceBtn"
              className="btn px-3 py-2 rounded-lg bg-white text-[#5533EA] border border-[#D9D4F8] font-semibold"
            >
              Placer aléatoire
            </button>
            <div id="status" className="text-sm text-[#6B5BEA] ml-4">
              Clique sur une case pour commencer.
            </div>
          </section>

          <section className="grid grid-cols-2 gap-6">
            <div className="grid-wrap">
              <div
                id="gridContainer"
                className="inline-block"
                role="grid"
                aria-label="Grille du démineur"
              ></div>
            </div>

            <aside className="bg-[#FBF9FF] p-4 rounded-lg border border-[#EDE9FF] text-[#5533EA]">
              <h3 className="font-bold mb-2">Instructions</h3>
              <ul className="text-sm space-y-2 mb-4">
                <li>• Clic gauche : révéler une case.</li>
                <li>• Clic droit : placer/enlever un drapeau.</li>
                <li>• Le minuteur démarre au premier clic.</li>
                <li>• Trouve toutes les cases sans mines pour gagner.</li>
              </ul>

              <div className="mb-4">
                <h4 className="font-semibold">Statistiques</h4>
                <div className="text-sm mt-2">
                  Temps écoulé :{" "}
                  <span id="elapsed" className="font-medium">
                    00:00
                  </span>
                </div>
                <div className="text-sm">
                  Mines :{" "}
                  <span id="mineCount" className="font-medium">
                    0
                  </span>
                </div>
                <div className="text-sm">
                  Cases restantes :{" "}
                  <span id="cellsLeft" className="font-medium">
                    0
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Légende</h4>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 cell unrevealed inline-grid place-items-center rounded-md">
                    {" "}
                  </div>
                  <div className="text-sm">Non révélé</div>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 cell revealed inline-grid place-items-center rounded-md bg-white border">
                    1
                  </div>
                  <div className="text-sm">Chiffre = mines adjacentes</div>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-md inline-grid place-items-center bg-[#FFF5F7] text-[#E53935]">
                    ⚑
                  </div>
                  <div className="text-sm">Drapeau</div>
                </div>
              </div>
            </aside>
          </section>
        </div>
      </div>
      {/* <Menu
        changeDifficulty={changeDifficulty}
        difficulty={difficulty}
        timer={timer}
        safeFlags={safeFlags}
        start={start}
      /> */}

      {/* <Board
        xcases={difficulty === minesweeperDifficulty.EASY ? rules.easy.xcases : difficulty === minesweeperDifficulty.NORMAL ? rules.normal.xcases : rules.hard.xcases}
        ycases={difficulty === minesweeperDifficulty.EASY ? rules.easy.ycases : difficulty === minesweeperDifficulty.NORMAL ? rules.normal.ycases : rules.hard.ycases}
        safeFlags={safeFlags}
        changeNumberOfFlag={changeNumberOfFlag}
        endGame={endGame}
        start={start}
        setStart={setStart}
        reset={reset}
      /> */}

      {open ? (
        <MinesweeperModalEndGame
          setOpen={setOpen}
          finalScore={finalScore}
          resetParty={resetParty}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Minesweeper;
