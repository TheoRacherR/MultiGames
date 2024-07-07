import React from 'react'
import './MainBattleship.css'

const MainBattleship = () => {
  return (
    <div className='m-5'>
      <h1>Battleship</h1>
      <div className='w-1/2 h-500px m-auto flex justify-around'>
        <div>
          <div id="toclick" className='rounded-md p-3 text-xl text-center my-auto cursor-pointer relative' style={{ top: 35, left: -10, backgroundColor: '#568eb8', color: 'white', userSelect: 'none'}}>Créer une partie</div>
          <div className='rounded-md p-3 text-xl text-center my-auto cursor-pointer' style={{ backgroundColor: '#436f91', color: '#436f91'}}>Créer une partie</div>
        </div>
        <div>
          <div id="toclick" className='rounded-md p-3 text-xl text-center my-auto cursor-pointer relative' style={{ top: 35, left: -10, backgroundColor: '#568eb8', color: 'white', userSelect: 'none'}}>Rejoindre une partie</div>
          <div className='rounded-md p-3 text-xl text-center my-auto cursor-pointer'  style={{ backgroundColor: '#436f91', color: '#436f91'}}>Rejoindre une partie</div>
        </div>
      </div>
    </div>
  )
}

export default MainBattleship;