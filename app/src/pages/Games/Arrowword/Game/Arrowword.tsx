import React from 'react'
import Board from './Board'

const Arrowword = () => {

  /*
  * 4-10 lettres
  * grille carrée 10x10
  */

  return (
    <div className='w-3/5 mx-auto p-10'>
      <Board length={10}/>
    </div>
  )
}

export default Arrowword