import { useState } from 'react';
import './MainBattleship.css';
import Scoreboard from '../../../components/Scoreboard';
import ModalParty from './ModalParty';

const choices: { type: string; text: string }[] = [
  { type: 'create', text: 'Create a party' },
  { type: 'join', text: 'Join a party' },
];

const data = [
  { user: 'Theo', score: 394 },
  { user: 'Léon', score: 96 },
  { user: 'Franck', score: 374 },
  { user: 'Theo', score: 5843 },
  { user: 'Theo', score: 895 },
];

export const giveStartOrder = () => {
  const starter = Math.floor(Math.random()*2);
  return starter === 0;
  // if(starter === 0)
  //   setSocketStarter to owner
  // else
  //  setSocketStarter to other
}

const Battleships = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('create');

  const handleOpenModal = (type: string) => {
    setOpen(true);
    setSelected(type);
  };


  return (
    <div className="my-5 mx-auto" style={{ width: 700 }}>
      <h1 className="text-6xl text-center mb-14">⛴️ Battleship ⛴️</h1>

      <div className="w-2/3 h-500px mx-auto mb-28 flex justify-around">
        {choices.map((item, index) => (
          <div key={index}>
            <div
              id="toclick"
              className="rounded-md p-3 text-xl text-center my-auto cursor-pointer relative"
              style={{
                top: 35,
                left: -10,
                backgroundColor: '#568eb8',
                color: 'white',
                userSelect: 'none',
              }}
              onClick={() => handleOpenModal(item.type)}
            >
              {item.text}
            </div>
            <div
              className="rounded-md p-3 text-xl text-center my-auto cursor-pointer"
              style={{ backgroundColor: '#436f91', color: '#436f91' }}
            >
              {item.text}
            </div>
          </div>
        ))}
      </div>
      {/* <Scoreboard data={data}/> */}
      <ModalParty open={open} setOpen={setOpen} selected={selected} />
    </div>
  );
};

export default Battleships;
