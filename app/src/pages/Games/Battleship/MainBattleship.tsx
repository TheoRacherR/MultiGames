import { useEffect, useState } from "react";
import Scoreboard from "components/Scoreboard";
import ModalParty from "./ModalParty";
import axios from "axiosConfig";
import { FormatedScoreboard } from "../../../@types/games";
import ButtonComponent from "components/ButtonComponent";
import { buttonComponentType } from "../../../@types/default";
import { battleshipButtonType } from "../../../@types/battleship";
import TitleScoreboard from "components/TitleScoreboard";
import TitleGame from "components/TitleGame";

export const giveStartOrder = () => {
  const starter = Math.floor(Math.random() * 2);
  return starter === 0;
  // if(starter === 0)
  //   setSocketStarter to owner
  // else
  //  setSocketStarter to other
};

const Battleships = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<battleshipButtonType>(
    battleshipButtonType.CREATE
  );
  const [dataScoreboard, setDataScoreboard] = useState<FormatedScoreboard[]>(
    []
  );

  const handleOpenModal = (type: battleshipButtonType) => {
    setOpen(true);
    setSelected(type);
  };

  const getScoreboardInfos = async () => {
    try {
      const req = await axios.post("/battleship-elo/scoreboard", {
        length: 5,
      });
      if (req.status === 201) {
        setDataScoreboard(req.data);
        return;
      } else {
        // TODO Alerte error
      }
    } catch (e) {
      console.log(e);
      // TODO Alerte error
    }
  };

  useEffect(() => {
    getScoreboardInfos();
  }, []);

  return (
    <div className="my-5 mx-auto" style={{ width: 700 }}>
      <TitleGame title='Battleship' />

      <div className="w-1/2 mx-auto mb-28 flex justify-around">
        <ButtonComponent
          index="Create a party"
          text="Create a party"
          type={buttonComponentType.PRIMARY}
          clickOn={() => handleOpenModal(battleshipButtonType.CREATE)}
        />
        <ButtonComponent
          index="Join a party"
          text="Join a party"
          type={buttonComponentType.PRIMARY}
          clickOn={() => handleOpenModal(battleshipButtonType.JOIN)}
        />
      </div>
      <div>
        <TitleScoreboard />
        <Scoreboard data={dataScoreboard} />
      </div>
      {open ? <ModalParty setOpen={setOpen} selected={selected} /> : <></>}
    </div>
  );
};

export default Battleships;
