import './App.css';
import MenuDefault from './pages/Default/MenuDefault';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MainMinesweeper from './pages/Games/Minesweeper/MainMinesweeper';
import MainBattleship from './pages/Games/Battleship/MainBattleship';

function App() {
  return (
    <>
    <MenuDefault />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/minesweeper" element={<MainMinesweeper />} />
      <Route path="/battleship" element={<MainBattleship />} />
    </Routes>
    </>
  );
}

export default App;
