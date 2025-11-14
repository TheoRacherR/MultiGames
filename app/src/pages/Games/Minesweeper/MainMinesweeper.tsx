import Scoreboard from "components/Scoreboard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axiosConfig";
import { FormatedScoreboard } from "../../../@types/games";
import ButtonComponent from "components/ButtonComponent";
import { buttonComponentColor, buttonComponentSize, buttonComponentType } from "../../../@types/default";
import TitleScoreboard from "components/TitleScoreboard";
import TitleGame from "components/TitleGame";
import Ranking from "components/Game/Presentation/Ranking";
import Preview from "components/Game/Presentation/Preview";
import InfoBlock from "components/Game/Presentation/InfoBlock";
import Informations from "components/Game/Presentation/Informations";
import Surface from "components/Game/Presentation/Surface";

import imgPreview from "assets/preview_minesweeper.png";


const MainMinesweeper = () => {
  const navigate = useNavigate();
  const [dataScoreboard, setDataScoreboard] = useState<FormatedScoreboard[]>(
    []
  );

  const getScoreboardInfos = async () => {
    try {
      const req = await axios.post("/minesweeper/scoreboard", {
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
          title="Démineur"
          description="Avance avec prudence et explore un terrain piégé. Analyse chaque indice, ouvre les bonnes cases et marque les bombes avant qu’il ne soit trop tard. Chaque coup compte — garde ton sang-froid et triomphe du champ de mines !"
          buttonPlay={
            <>
              <ButtonComponent
                text="Jouer"
                color={buttonComponentColor.NONE}
                type={buttonComponentType.INLINE}
                size={buttonComponentSize.MEDIUM}
                clickOn={() => navigate("game")}
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
  );
};

export default MainMinesweeper;
