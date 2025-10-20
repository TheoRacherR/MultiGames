import { minesweeperDifficulty } from '../../../../@types/minesweeper'
import { MenuItem, Select } from '@mui/material';
import { difficultyObj } from 'utils/Minesweepeer/Minesweeper';
import TimerRoundedIcon from '@mui/icons-material/TimerRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import { red, yellow } from '@mui/material/colors';

const Menu = ({ 
  changeDifficulty,
  difficulty,
  timer,
  safeFlagsUsed,
  safeFlagsMax,
  start
}: { 
  changeDifficulty: (diff: minesweeperDifficulty) => void;
  difficulty: minesweeperDifficulty;
  timer: number;
  safeFlagsUsed: number;
  safeFlagsMax: number;
  start: boolean;
}) => {
  

  return (
    <div className='w-full flex justify-between p-5 border-solid border border-gray-300'>
      <div>
        <Select
          label='Select a difficulty'
          value={difficulty}
          onChange={(e: any) => {
            changeDifficulty(
              Object.values(minesweeperDifficulty).filter((d) => d === e.target.value)[0] as minesweeperDifficulty
            )
          }}
          disabled={start}
        >
          {difficultyObj.map((item, index) => (
            <MenuItem key={`select_difficulty_${index}`} value={item.value}>{item.text}</MenuItem>
          ))}
        </Select>
      </div>
      <div className='p-2 text-center my-auto'>{timer} <TimerRoundedIcon sx={{ color: yellow[600] }}/> </div>
      <div className='p-2 text-center my-auto'>{safeFlagsMax - safeFlagsUsed} <FlagRoundedIcon sx={{ color: red[900] }}/></div>
    </div>
  )
}

export default Menu