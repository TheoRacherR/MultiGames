import Scoreboard from "components/Scoreboard";
import { useNavigate } from "react-router-dom";
import axios from "axiosConfig";
import { useEffect, useState } from "react";
import { FormatedScoreboard } from "../../../@types/games";
import ButtonComponent from "components/ButtonComponent";
import { buttonComponentColor, buttonComponentSize, buttonComponentType } from "../../../@types/default";
import TitleGame from "components/TitleGame";
import TitleScoreboard from "components/TitleScoreboard";
import Surface from "components/Game/Presentation/Surface";
import Informations from "components/Game/Presentation/Informations";
import InfoBlock from "components/Game/Presentation/InfoBlock";
import Preview from "components/Game/Presentation/Preview";
import Ranking from "components/Game/Presentation/Ranking";

import imgPreview from "assets/preview_wordle.png"

const MainWordle = () => {
  const navigate = useNavigate();
  const [dataScoreboard, setDataScoreboard] = useState<FormatedScoreboard[]>(
    []
  );

  const getScoreboardInfos = async () => {
    try {
      const req = await axios.post("/wordle/scoreboard", {
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
          title="Wordle"
          description="Un mot secret t’attend. Teste tes hypothèses, décortique chaque réponse et avance lettre après lettre vers la solution. Entre flair et logique, sauras-tu deviner le mot du jour avant de manquer d’essais ? À toi de jouer !"
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

export default MainWordle;
