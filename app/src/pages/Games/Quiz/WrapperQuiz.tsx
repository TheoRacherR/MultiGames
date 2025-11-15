import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WrapperFlag from './Game/Flag/WrapperFlag'
import WrapperCountry from './Game/Country/WrapperCountry'
import MainQuiz from './MainQuiz'

const WrapperQuiz = () => {
  return (
    <Routes>
      <Route path="" element={<MainQuiz />} />
      <Route path="/country/*" element={<WrapperCountry />}/>
      <Route path="/flag/*" element={<WrapperFlag />} />
    </Routes>
  )
}

export default WrapperQuiz