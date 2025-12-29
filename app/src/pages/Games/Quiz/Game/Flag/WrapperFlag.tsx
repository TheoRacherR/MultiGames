import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Quiz from '../Quiz'
import { gameQuiz, modeQuiz } from '../../../../../@types/quiz'

const WrapperFlag = () => {
  document.title = "MG - Quiz Flag";

  return (
    <Routes>
      <Route path="/all" element={<Quiz game={gameQuiz.FLAG} mode={modeQuiz.ALL} />} />
      <Route path="/5" element={<Quiz game={gameQuiz.FLAG} mode={modeQuiz.FIVE} />} />
      <Route path="/10" element={<Quiz game={gameQuiz.FLAG} mode={modeQuiz.TEN} />} />
      <Route path="/20" element={<Quiz game={gameQuiz.FLAG} mode={modeQuiz.TWENTY} />} />
      <Route path="" element={<Quiz game={gameQuiz.FLAG} mode={modeQuiz.ALL} />} />
    </Routes>
  )
}

export default WrapperFlag