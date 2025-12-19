import { difficultyObj } from 'assets/Minesweeper/Board';
import { minesweeperDifficulty } from '../../../../../../@types/minesweeper';

const Difficulty = (
  {
    difficulty,
    changeDifficulty
  } :
  {
    difficulty: minesweeperDifficulty
    changeDifficulty: (diff: minesweeperDifficulty) => void
  }
) => {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-[#6B5BEA]">Difficulté :</span>
      <select
        className="px-3 py-2 rounded-lg bg-[#F9F9FF] text-[#5533EA] border border-[#D9D4F8]"
        value={difficulty}
        onChange={(e: any) => {
          changeDifficulty(
            Object.values(minesweeperDifficulty).filter(
              (d) => d === e.target.value
            )[0] as minesweeperDifficulty
          );
        }}
      >
        {difficultyObj.map((item, index) => (
          <option key={`select_difficulty_${index}`} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </label>
  )
}

export default Difficulty