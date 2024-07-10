import { useEffect, useState } from 'react'
import Menu from './Menu'
import { minesweeperDifficulty } from '../../../../@types/minesweeper'
import Board from './Board'
import ModalEndGame from './ModalEndGame'

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
  const [safeFlagsUsed, setSafeFlagsUsed] = useState<number>(0);
  const [safeFlagsMax, setSafeFlagsMax] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [open, setOpen] = useState(false)
  const [finalScore, setFinalScore] = useState<{won: boolean, score: number}>({won: false, score: 0})
  const [timeOutID, setTimeOutID] = useState<NodeJS.Timeout>();
  const [reset, setReset] = useState<boolean>(false);

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
    setSafeFlagsUsed(0);
    setStart(false);
    initMines(difficulty);
    setReset(!reset)
  }

  const initMines = (diff: minesweeperDifficulty) => {
    if(diff === minesweeperDifficulty.EASY)
      setSafeFlagsMax(rules.easy.mine);
    else if(diff === minesweeperDifficulty.NORMAL)
      setSafeFlagsMax(rules.normal.mine);
    else
      setSafeFlagsMax(rules.hard.mine);
  }

  const changeDifficulty = (diff: minesweeperDifficulty) => {
    console.log(diff)
    setDifficulty(diff);
    resetParty();
    initMines(diff);
  }

  const changeNumberOfFlag = (positive: boolean) => {
    if(positive)
      if(safeFlagsMax > safeFlagsUsed) {
        setSafeFlagsUsed(safeFlagsUsed+1)
        return true;
      }
      else {
        console.log('error max flag used')
        return false;
      }
    else 
      if(safeFlagsUsed === 0) {
        console.log("error min flag used")
        return false;
      }
      else {
        setSafeFlagsUsed(safeFlagsUsed-1)
        return true;
      }
  }

  const endGame = (won: boolean) => {
    setFinalScore({won: won, score: timer});
    setOpen(true);
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
        setTimer={setTimer}
        safeFlagsUsed={safeFlagsUsed}
        safeFlagsMax={safeFlagsMax}
        start={start}
      />

      <Board
        xcases={difficulty === minesweeperDifficulty.EASY ? rules.easy.xcases : difficulty === minesweeperDifficulty.NORMAL ? rules.normal.xcases : rules.hard.xcases}
        ycases={difficulty === minesweeperDifficulty.EASY ? rules.easy.ycases : difficulty === minesweeperDifficulty.NORMAL ? rules.normal.ycases : rules.hard.ycases}
        safeFlagsMax={safeFlagsMax}
        safeFlagsUsed={safeFlagsUsed}
        difficulty={difficulty}
        changeNumberOfFlag={changeNumberOfFlag}
        endGame={endGame}
        start={start}
        setStart={setStart}
        reset={reset}
      />

      <ModalEndGame open={open} setOpen={setOpen} finalScore={finalScore} resetParty={resetParty}/>

      
    </div>
  )
}

export default Minesweeper