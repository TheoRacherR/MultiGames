import React from 'react'
import './MainMinesweeper.css'
import Scoreboard from './Scoreboard/Scoreboard';
import logo from "../../../assets/boat.png"

const MainMinesweeper = () => {
  return (
    <div className='my-5 mx-auto' style={{width: 700}}>
      {/* <img src={logo} alt="logo" className='h-40 mx-auto'/> */}
      <h1 className='text-6xl text-center mb-14'>⛴️ Minesweeper ⛴️</h1>

      <div className='w-2/3 h-500px mx-auto mb-28 flex justify-around'>
        <div>
          <div id="toclick" className='rounded-md p-3 text-xl text-center my-auto cursor-pointer relative' style={{ top: 35, left: -10, backgroundColor: '#B85656', color: 'white', userSelect: 'none'}}>Créer une partie</div>
          <div className='rounded-md p-3 text-xl text-center my-auto cursor-pointer' style={{ backgroundColor: '#914343', color: '#914343'}}>Créer une partie</div>
        </div>
        <div>
          <div id="toclick" className='rounded-md p-3 text-xl text-center my-auto cursor-pointer relative' style={{ top: 35, left: -10, backgroundColor: '#B85656', color: 'white', userSelect: 'none'}}>Rejoindre une partie</div>
          <div className='rounded-md p-3 text-xl text-center my-auto cursor-pointer'  style={{ backgroundColor: '#914343', color: '#914343'}}>Rejoindre une partie</div>
        </div>
      </div>
      <Scoreboard/>
    </div>
  )
}

export default MainMinesweeper;