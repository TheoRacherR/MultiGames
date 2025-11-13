import React from 'react'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Link } from 'react-router-dom';
import { purple, red } from '@mui/material/colors';

const games = [
  { title: 'Battleship', desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo officia animi vero eos culpa fuga', link: 'battleship' },
  { title: 'Minesweeper', desc: 'Deserunt ratione quo quibusdam. officia animi', link: 'minesweeper' },
  { title: 'Quiz', desc: 'Nemo officia animi vero eos culpa fuga', link: 'quiz' },
  { title: 'Time games', desc: 'Tempore ullam sapiente fugit deleniti expedita? Vel cumque dolorem pariatur necessitatibus', link: 'timegame' },
  { title: 'Wordle', desc: 'Ipsum dolor sit amet officia animi vero eos culpa fuga', link: 'wordle' },
]

const GamesList = () => {
  return (
    <div className='w-full'>
      <div className='w-[600px] mx-auto my-5 '>
        <h1
          className="text-6xl text-left my-7 font-bold"
          style={{ color: "var(--color-primary)" }}
        >{'All Games'.toUpperCase()}</h1>
        <div>
          <table className='w-full'>
            <tbody>
              {games.map((item, index) => (
                <tr className='text-xl border-b-2' key={`game_list_${index}`} style={{borderColor: 'var(--color-text-muted)'}}>
                  <td className='mr-4 p-[16px] pl-0'><h2>{item.title}</h2></td>
                  <td className='p-[16px]'><div className='italic'>{item.desc.substring(0, 40)}</div></td>
                  <Link to={`/${item.link}`}><td className='p-[16px]'><ArrowForwardRoundedIcon sx={{color: purple[700]}}/></td></Link>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default GamesList