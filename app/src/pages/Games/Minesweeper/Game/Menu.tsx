import { Dropdown, Icon } from 'semantic-ui-react'
import { minesweeperDifficulty } from '../../../../@types/minesweeper'

const difficultyObj = [
  {text: 'easy', value: 'easy'},
  {text: 'normal', value: 'normal'},
  {text: 'hard', value: 'hard'},
]
const Menu = ({ 
  changeDifficulty,
  difficulty,
  timer,
  setTimer,
  safeFlagsUsed,
  safeFlagsMax,
  start
}: { 
  changeDifficulty: Function;
  difficulty: minesweeperDifficulty;
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  safeFlagsUsed: number;
  safeFlagsMax: number;
  start: boolean;
}) => {
  

  return (
    <div className='w-full flex justify-between p-5 border-solid border border-gray-300'>
      <div>
        <Dropdown
          placeholder='Select a difficulty'
          fluid
          selection
          options={difficultyObj}
          value={difficulty}
          onChange={(e) => 
            changeDifficulty(
              Object.values(minesweeperDifficulty).filter((d) => d === e.currentTarget.childNodes[0].textContent)[0] as minesweeperDifficulty
            )
          }
          disabled={start}
        />
      </div>
      <div className='p-2 text-center my-auto'>{timer} <Icon name='clock' color='yellow'/></div>
      <div className='p-2 text-center my-auto'>{safeFlagsMax - safeFlagsUsed} <Icon name='flag' color='red'/></div>
    </div>
  )
}

export default Menu