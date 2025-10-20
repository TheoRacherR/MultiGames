import { useEffect, useRef, useState } from 'react'
import Menu from './Menu'
import { minesweeperDifficulty } from '../../../../@types/minesweeper'
import Board from './Board'
import MinesweeperModalEndGame from './MinesweeperModalEndGame'
import { UserInfos } from '../../../../@types/user'
import { getUserInfos } from 'utils/Default/Auth'
import axios from 'axiosConfig'

interface difficultyDetails {
  mine: number;
  total_cases: number;
  xcases: number;
  ycases: number;
}


const rules:{easy: difficultyDetails, normal: difficultyDetails, hard: difficultyDetails} = {
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
}

const Minesweeper = () => {
  const [difficulty, setDifficulty] = useState<minesweeperDifficulty>(minesweeperDifficulty.EASY)
  const [timer, setTimer] = useState<number>(0);
  const [safeFlags, setSafeFlags] = useState<{ used: number, max: number }>({used: 0, max: 0});
  const [start, setStart] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false)
  const [finalScore, setFinalScore] = useState<{won: boolean, score: number, end: boolean}>({won: false, score: 0, end: false})
  const [timeOutID, setTimeOutID] = useState<NodeJS.Timeout>();
  const [reset, setReset] = useState<boolean>(false);
  const userInfo = useRef<UserInfos | null>(null);

  useEffect(() => {
    if(start){
      const timeOutID = setTimeout(() => setTimer(timer+1), 1000);
      setTimeOutID(timeOutID)
    }
  }, [start, timer])

  const resetTimer = () => {
    clearTimeout(timeOutID);
  }

  const resetParty = () => {
    resetTimer();
    setTimer(0);
    setSafeFlags(prev => ({ ...prev, used: 0 }));
    setStart(false);
    initMines(difficulty);
    setReset(!reset)
  }

  const initMines = (diff: minesweeperDifficulty) => {
    if(diff === minesweeperDifficulty.EASY)
      setSafeFlags(prev => ({...prev, max: rules.easy.mine}));
    else if(diff === minesweeperDifficulty.NORMAL)
      setSafeFlags(prev => ({...prev, max: rules.normal.mine}));
    else
      setSafeFlags(prev => ({...prev, max: rules.hard.mine}));
  }

  const changeDifficulty = (diff: minesweeperDifficulty) => {
    console.log(diff)
    setDifficulty(diff);
    resetParty();
    initMines(diff);
  }

  const changeNumberOfFlag = (positive: boolean) => {
    if(positive)
      if(safeFlags.max > safeFlags.used) {
        setSafeFlags(prev => ({ ...prev, used: safeFlags.used+1 }))
        return true;
      }
      else {
        console.log('error max flag used')
        return false;
      }
    else 
      if(safeFlags.used === 0) {
        console.log("error min flag used")
        return false;
      }
      else {
        setSafeFlags(prev => ({ ...prev, used: safeFlags.used-1 }))
        return true;
      }
  }

  const endGame = async (won: boolean) => {
    // TODO Alerte Game gagné
    let uInfos;
    try {
      uInfos = await getUserInfos();
    } catch (e) {
    }
    if(uInfos) userInfo.current = uInfos;

    try {
      if (userInfo.current) {
        await axios.post("/minesweeper", {
          score: timer,
          won: won,
          level: difficulty,
          player: userInfo.current.id
        });
      }
      setFinalScore({won: won, score: timer, end: true});
      setOpen(true);
    } catch (e) {
      // TODO Alerte d'erreur de récupération des infos du user
    }
    
  }

  useEffect(() => {
    resetParty();
  }, [])

  return (
    <div className='w-3/5 mx-auto p-10'>
      <Menu
        changeDifficulty={changeDifficulty}
        difficulty={difficulty}
        timer={timer}
        safeFlags={safeFlags}
        start={start}
      />

      <Board
        xcases={difficulty === minesweeperDifficulty.EASY ? rules.easy.xcases : difficulty === minesweeperDifficulty.NORMAL ? rules.normal.xcases : rules.hard.xcases}
        ycases={difficulty === minesweeperDifficulty.EASY ? rules.easy.ycases : difficulty === minesweeperDifficulty.NORMAL ? rules.normal.ycases : rules.hard.ycases}
        safeFlags={safeFlags}
        changeNumberOfFlag={changeNumberOfFlag}
        endGame={endGame}
        start={start}
        setStart={setStart}
        reset={reset}
      />

      {
        open ?
        <MinesweeperModalEndGame setOpen={setOpen} finalScore={finalScore} resetParty={resetParty}/>
        :
        <></>
      }

      
    </div>
  )
}

export default Minesweeper