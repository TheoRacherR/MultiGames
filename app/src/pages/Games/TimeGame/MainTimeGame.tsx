import { buttonComponentType } from '../../../@types/guiz';
import { timegameButtonType } from '../../../@types/timegame';
import ButtonComponent from 'components/ButtonComponent';
import { useEffect, useState } from 'react'
import ModalParty from './ModalParty';
import Scoreboard from 'components/Scoreboard';
import axios from '../../../axiosConfig';
import { FormatedScoreboard } from '../../../@types/games';

const MainTimeGame = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<timegameButtonType>(
    timegameButtonType.CREATE
  );
  // const [dataScoreboard, setDataScoreboard] = useState<FormatedScoreboard[]>(
  //   []
  // );

  const handleOpenModal = (type: timegameButtonType) => {
    setOpen(true);
    setSelected(type);
  };

  // const getScoreboardInfos = async () => {
  //   try {
  //     const req = await axios.post("/battleship-elo/scoreboard", {
  //       length: 5,
  //     });
  //     if (req.status === 201) {
  //       setDataScoreboard(req.data);
  //       return;
  //     } else {
  //       // TODO Alerte error
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     // TODO Alerte error
  //   }
  // };

  // useEffect(() => {
  //   getScoreboardInfos();
  // }, []);

  return (
    <div className="my-5 mx-auto" style={{ width: 700 }}>
      <h1 className="text-6xl text-center mb-14">⏳ Time Game ⏳</h1>

      <div className="w-2/3 h-500px mx-auto mb-28 flex justify-around">
        <ButtonComponent
          index="Create a party"
          text="Create a party"
          type={buttonComponentType.BLUE}
          clickOn={() => handleOpenModal(timegameButtonType.CREATE)}
        />
        <ButtonComponent
          index="Join a party"
          text="Join a party"
          type={buttonComponentType.BLUE}
          clickOn={() => handleOpenModal(timegameButtonType.JOIN)}
        />
      </div>
      {/* <div>
        <h2 className="text-center">Scoreboard :</h2>
        <Scoreboard data={dataScoreboard} />
      </div> */}
      {open ? <ModalParty setOpen={setOpen} selected={selected} /> : <></>}
    </div>
  );
}

export default MainTimeGame