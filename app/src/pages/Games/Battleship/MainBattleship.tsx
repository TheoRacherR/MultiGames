import { useEffect, useState } from "react";
import Scoreboard from "components/Scoreboard";
import ModalParty from "./ModalParty";
import axios from "axiosConfig";
import { FormatedScoreboard } from "../../../@types/games";
import ButtonComponent from "components/ButtonComponent";
import { buttonComponentColor, buttonComponentSize, buttonComponentType } from "../../../@types/default";
import { battleshipButtonType } from "../../../@types/battleship";
import TitleScoreboard from "components/TitleScoreboard";
import TitleGame from "components/TitleGame";
import Informations from "components/Game/Presentation/Informations";
import Surface from "components/Game/Presentation/Surface";
import InfoBlock from "components/Game/Presentation/InfoBlock";
import Preview from "components/Game/Presentation/Preview";
import Ranking from "components/Game/Presentation/Ranking";

import imgPreview from "assets/preview_battleship.png";

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
    <Surface>
      <>
        <Informations
          title="Bataille navale"
          description="Défie l'océan et débusque les navires ennemis. Place tes bateaux, anticipe les frappes et remporte la victoire. Mode solo ou en ligne à venir. Prends la mer — bonne chance, Capitaine !"
          buttonPlay={
            <>
              <ButtonComponent
                text="Jouer"
                color={buttonComponentColor.NONE}
                type={buttonComponentType.INLINE}
                size={buttonComponentSize.MEDIUM}
                clickOn={() => handleOpenModal(battleshipButtonType.CREATE)}
              />
              <ButtonComponent
                text="Comment jouer"
                color={buttonComponentColor.NONE}
                type={buttonComponentType.INLINE}
                size={buttonComponentSize.MEDIUM}
                clickOn={() => handleOpenModal(battleshipButtonType.CREATE)}
              />
            </>
          }
          estimatedTime="5–10 min"
          infoBlocks={
            <>
              <InfoBlock title="Modes" desc="Solo • 1v1 (bientôt) • Classements" />
              <InfoBlock title="Difficultés" desc="Facile, Moyen, Difficile — choisis ta tactique" />
            </>
          }
        />

        <div className="space-y-4">
          <Preview link={imgPreview} alt="preview battleship" />

          <Ranking data={dataScoreboard}/>
        </div>
      </>
    </Surface>


      // {/* <div className="w-1/2 mx-auto mb-28 flex justify-around">
      //   <ButtonComponent
      //     text="Create a party"
      //     color={buttonComponentColor.PRIMARY}
      //     type={buttonComponentType.INLINE}
      //     size={buttonComponentSize.MEDIUM}
      //     clickOn={() => handleOpenModal(battleshipButtonType.CREATE)}
      //   />
      //   <ButtonComponent
      //     text="Join a party"
      //     color={buttonComponentColor.PRIMARY}
      //     type={buttonComponentType.INLINE}
      //     size={buttonComponentSize.MEDIUM}
      //     clickOn={() => handleOpenModal(battleshipButtonType.JOIN)}
      //   />
      // </div>
      // <div>
      //   <TitleScoreboard />
      //   <Scoreboard data={dataScoreboard} />
      // </div>
      // {open ? <ModalParty setOpen={setOpen} selected={selected} /> : <></>} */}
  );
};

export default Battleships;
