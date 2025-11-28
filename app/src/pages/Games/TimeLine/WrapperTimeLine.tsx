import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainTimeLine from './MainTimeLine'
import TimeLine from './Game/TimeLine'

const WrapperTimeLine = () => {
  return (
    <Routes>
      <Route path='' element={<MainTimeLine/>} />
      <Route path='/room/:id' element={<TimeLine/>} />
    </Routes>
  )
}

export default WrapperTimeLine