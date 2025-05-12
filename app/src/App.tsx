import './App.css';
import MenuDefault from './pages/Default/MenuDefault';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MainMinesweeper from './pages/Games/Minesweeper/MainMinesweeper';
import MainBattleships from './pages/Games/Battleship/MainBattleship';
import Minesweeper from './pages/Games/Minesweeper/Game/Minesweeper';
import Battleship from './pages/Games/Battleship/Game/Battleship';
import MainWordle from './pages/Games/Wordle/MainWordle';
import Wordle from './pages/Games/Wordle/Game/Wordle';

function App() {
  return (
    <>
    <MenuDefault />
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/minesweeper" element={<MainMinesweeper />} />
      <Route path="/minesweeper/game" element={<Minesweeper />} />

      <Route path="/battleship" element={<MainBattleships />} />
      <Route path="/battleship/room/:id" element={<Battleship />} />

      <Route path="/wordle" element={<MainWordle />} />
      <Route path="/wordle/game" element={<Wordle />} />
    </Routes>
    </>
  );
}

export default App;