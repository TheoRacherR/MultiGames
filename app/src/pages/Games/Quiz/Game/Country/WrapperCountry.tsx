import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Quiz from '../Quiz'
import { gameQuiz, modeQuiz } from '../../../../../@types/quiz'

const WrapperCountry = () => {
  return (
    <Routes>
      <Route path="/all" element={<Quiz game={gameQuiz.COUNTRY} mode={modeQuiz.ALL} />} />
      <Route path="/africa" element={<Quiz game={gameQuiz.COUNTRY} mode={modeQuiz.AFRICA} />} />
      <Route path="/asia" element={<Quiz game={gameQuiz.COUNTRY} mode={modeQuiz.ASIA} />} />
      <Route path="/europe" element={<Quiz game={gameQuiz.COUNTRY} mode={modeQuiz.EUROPE} />} />
      <Route path="/north_america" element={ <Quiz game={gameQuiz.COUNTRY} mode={modeQuiz.NORTH_AMERICA} />} />
      <Route path="/south_america" element={<Quiz game={gameQuiz.COUNTRY} mode={modeQuiz.SOUTH_AMERICA} />} />
      <Route path="/oceania" element={<Quiz game={gameQuiz.COUNTRY} mode={modeQuiz.OCEANIA} />} />
      <Route path="" element={<Quiz game={gameQuiz.COUNTRY} mode={modeQuiz.ALL} />} />
    </Routes>
  )
}

export default WrapperCountry