import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainTimeGame from './MainTimeGame'
import TimeGame from './Game/TimeGame'

const WrapperTimeGame = () => {
  return (
    <Routes>
      <Route path='' element={<MainTimeGame/>} />
      <Route path='/room/:id' element={<TimeGame/>} />
    </Routes>
  )
}

export default WrapperTimeGame