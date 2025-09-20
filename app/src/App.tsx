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
import MainQuiz from './pages/Games/Quiz/MainQuiz';
import Quiz from './pages/Games/Quiz/Game/Quiz';
import { gameQuiz, modeQuiz } from './@types/guiz';

function App() {
  return (
    <div>
    <MenuDefault />
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/minesweeper" element={<MainMinesweeper />} />
      <Route path="/minesweeper/game" element={<Minesweeper />} />

      <Route path="/battleship" element={<MainBattleships />} />
      <Route path="/battleship/room/:id" element={<Battleship />} />

      <Route path="/wordle" element={<MainWordle />} />
      <Route path="/wordle/game" element={<Wordle />} />

      <Route path="/quiz" element={<MainQuiz />} />
      <Route path="/quiz/country/all" element={<Quiz game={gameQuiz.COUNTRY} mode={modeQuiz.ALL}/>} />
      <Route path="/quiz/country/africa" element={<Quiz game={gameQuiz.COUNTRY} mode={modeQuiz.AFRICA}/>} />
      <Route path="/quiz/country/asia" element={<Quiz game={gameQuiz.COUNTRY} mode={modeQuiz.ASIA}/>} />
      <Route path="/quiz/country/europe" element={<Quiz game={gameQuiz.COUNTRY} mode={modeQuiz.EUROPE}/>} />
      <Route path="/quiz/country/north_america" element={<Quiz game={gameQuiz.COUNTRY} mode={modeQuiz.NORTH_AMERICA}/>} />
      <Route path="/quiz/country/south_america" element={<Quiz game={gameQuiz.COUNTRY} mode={modeQuiz.SOUTH_AMERICA}/>} />
      <Route path="/quiz/country/oceania" element={<Quiz game={gameQuiz.COUNTRY} mode={modeQuiz.OCEANIA}/>} />
      <Route path="/quiz/country" element={<Quiz game={gameQuiz.COUNTRY} mode={modeQuiz.ALL}/>} />

      <Route path="/quiz/flag/all" element={<Quiz game={gameQuiz.FLAG} mode={modeQuiz.ALL}/>} />
      <Route path="/quiz/flag/5" element={<Quiz game={gameQuiz.FLAG} mode={modeQuiz.FIVE}/>} />
      <Route path="/quiz/flag/10" element={<Quiz game={gameQuiz.FLAG} mode={modeQuiz.TEN}/>} />
      <Route path="/quiz/flag/20" element={<Quiz game={gameQuiz.FLAG} mode={modeQuiz.TWENTY}/>} />
      <Route path="/quiz/flag" element={<Quiz game={gameQuiz.FLAG} mode={modeQuiz.ALL}/>} />
    </Routes>
    </div>
  );
}

export default App;