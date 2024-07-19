import PlayerBoard from './PlayerBoard/PlayerBoard';
import OpponentBoard from './OpponentBoard';

const Battleship = () => {

  return (
    <div className='mx-auto p-10 flex'>
      <PlayerBoard/>
      {/* <OpponentBoard/> */}
    </div>
  )
}

export default Battleship