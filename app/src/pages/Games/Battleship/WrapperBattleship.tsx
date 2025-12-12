import { Route, Routes } from 'react-router-dom'
import MainBattleships from './MainBattleship'
import BattleshipWrapperContext from './Game/Battleship'

const WrapperBattleship = () => {
  return (
    <Routes>
      <Route path="" element={<MainBattleships />} />
      <Route path="/room/:id" element={<BattleshipWrapperContext />} />
    </Routes>
  )
}

export default WrapperBattleship