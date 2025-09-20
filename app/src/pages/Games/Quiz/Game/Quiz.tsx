import { gameQuiz, modeQuiz } from '../../../../@types/guiz';
import { caseCurrentState } from '../../../../@types/wordle';
import Country from './Country/Country';
import Flag from './Flag/Flag';

export interface casesInterface {
  letterPlaced: string,
  state: caseCurrentState;
  selected: boolean;
}

const Quiz = ({game, mode}: {game: gameQuiz, mode: modeQuiz}) => {
  

  return (
    <div>
      {game === gameQuiz.FLAG
        ? <Flag mode={mode}/>
        : <Country mode={mode}/>
      }
      
    </div>
  )
}

export default Quiz