import { buttonComponentColor, buttonComponentSize, buttonComponentType } from "../../../@types/default";
import { timegameButtonType } from "../../../@types/timegame";
import ButtonComponent from "components/ButtonComponent";
import { useState } from "react";
// import axios from "../../../axiosConfig";
import { gameType } from "../../../@types/games";
import Surface from "components/Game/Presentation/Surface";
import Informations from "components/Game/Presentation/Informations";
import InfoBlock from "components/Game/Presentation/InfoBlock";
import Preview from "components/Game/Presentation/Preview";
// import Ranking from "components/Game/Presentation/Ranking";

import imgPreview from "assets/preview_timeline.png"

import { games } from "pages/Games";
import ModalParty from "./ModalParty";

const gameInfos = games.filter(g => g.type === gameType.TIMEGAME)[0];

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
    <>
      <Surface>
        <>
          <Informations
            title={gameInfos.title}
            description={gameInfos.description}
            buttonPlay={
              <>
                <ButtonComponent
                  text="Create a party"
                  color={buttonComponentColor.NONE}
                  type={buttonComponentType.INLINE}
                  size={buttonComponentSize.MEDIUM}
                  clickOn={() => handleOpenModal(timegameButtonType.CREATE)}
                />
                <ButtonComponent
                  text="Join a party"
                  color={buttonComponentColor.NONE}
                  type={buttonComponentType.INLINE}
                  size={buttonComponentSize.MEDIUM}
                  clickOn={() => handleOpenModal(timegameButtonType.JOIN)}
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
            <Preview link={imgPreview} alt="preview timeline" />

            {/* <Ranking data={dataScoreboard}/> */}
          </div>
        </>
      </Surface>
      {open ? <ModalParty setOpen={setOpen} selected={selected} /> : <></>}
    </>
  );
};

export default MainTimeGame;
