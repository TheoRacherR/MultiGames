import { Route, Routes } from 'react-router-dom'
import Battleship from './Game/Battleship'
import MainBattleships from './MainBattleship'

const WrapperBattleship = () => {
  return (
    <Routes>
      <Route path="" element={<MainBattleships />} />
      <Route path="/room/:id" element={<Battleship />} />
    </Routes>
  )
}

export default WrapperBattleship