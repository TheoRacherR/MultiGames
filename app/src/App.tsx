import './App.css';
import MenuDefault from './pages/Default/MenuDefault';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MainMinesweeper from './pages/Games/Minesweeper/MainMinesweeper';
import Battleships from './pages/Games/Battleship/MainBattleship';
import Minesweeper from './pages/Games/Minesweeper/Game/Minesweeper';

function App() {
  return (
    <>
    <MenuDefault />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/minesweeper" element={<MainMinesweeper />} />
      <Route path="/minesweeper/game" element={<Minesweeper />} />
      <Route path="/battleship" element={<Battleships />} />
    </Routes>
    </>
  );
}

export default App;
