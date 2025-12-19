import React from 'react'
import Difficulty from './Difficulty'
import { minesweeperDifficulty } from '../../../../../../@types/minesweeper'
import ButtonComponent from 'components/ButtonComponent'
import { buttonComponentColor, buttonComponentSize, buttonComponentType } from '../../../../../../@types/default'

const Menu = (
  {
    difficulty,
    changeDifficulty,
    started,
    safeFlags,
    timer,
    resetParty,
    endGame,
  } :
  {
    difficulty: minesweeperDifficulty
    changeDifficulty: (diff: minesweeperDifficulty) => void,
    started: boolean,
    safeFlags: { used: number; max: number; },
    timer: number,
    resetParty: (diff: minesweeperDifficulty) => void,
    endGame: (won: boolean) => Promise<void>,
  }
) => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold uppercase">DÉMINEUR</h2>
      </div>
      <section className="flex justify-between mb-6">
        <div className='flex flex-wrap items-center gap-4 '>
          <Difficulty difficulty={difficulty} changeDifficulty={changeDifficulty} />

          {!started
          ? 
            <>
              <ButtonComponent
                text="Nouvelle partie"
                color={buttonComponentColor.PRIMARY}
                size={buttonComponentSize.MEDIUM}
                type={buttonComponentType.INLINE}
                clickOn={() => resetParty(minesweeperDifficulty.EASY)}
              />
              <div id="status" className="text-sm text-[#6B5BEA] ml-4">
                Clique sur une case pour commencer.
              </div>
            </>
          : 
            <>
              <div className="flex items-center gap-4">
                <div
                  id="timer"
                  className="text-white bg-[#6C4EF6] px-4 py-2 rounded-lg font-bold"
                >
                  {Math.trunc(timer/60) < 10 ? `0${Math.trunc(timer/60)}` : Math.trunc(timer/60)}:
                  {Math.trunc(timer%60) < 10 ? `0${Math.trunc(timer%60)}` : Math.trunc(timer%60)}
                </div>
                <div className="text-sm text-[#6B5BEA]">
                  <span id="flagsRemaining" className="font-bold text-[red]">
                    ⚑
                  </span>
                  {" : "}
                  <span id="flagsRemaining" className="font-bold">
                    {safeFlags.max - safeFlags.used}
                  </span>
                </div>
              </div>
            </>
          }
        </div>
        <div>
          <ButtonComponent
            text="Stop"
            color={buttonComponentColor.ERROR}
            size={buttonComponentSize.MEDIUM}
            type={buttonComponentType.INLINE}
            clickOn={() => endGame(false)}
          />
        </div>
        
      </section>
    </>
  )
}

export default Menu