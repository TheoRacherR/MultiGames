import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainMinesweeper from './MainMinesweeper'
import Minesweeper from './Game/Minesweeper'

const WrapperMinesweeper = () => {
  return (
    <Routes>
      <Route path="" element={<MainMinesweeper />} />
      <Route path="/game" element={<Minesweeper />} />
    </Routes>
  )
}

export default WrapperMinesweeper