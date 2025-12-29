import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainTimeLine from './MainTimeLine'
import TimeLine from './Game/TimeLine'

const WrapperTimeLine = () => {
  document.title = "MG - Timeline";

  return (
    <Routes>
      <Route path='' element={<MainTimeLine/>} />
      <Route path='/game' element={<TimeLine/>} />
    </Routes>
  )
}

export default WrapperTimeLine