import { useNavigate } from "react-router-dom";
import axios from "utils/Default/axiosConfig";
import { useEffect, useState } from "react";
import { FormatedScoreboard, gameType } from "../../../@types/games";
import ButtonComponent from "components/ButtonComponent";
import {
  buttonComponentColor,
  buttonComponentSize,
  buttonComponentType,
} from "../../../@types/default";
import Surface from "components/Game/Presentation/Surface";
import Informations from "components/Game/Presentation/Informations";
import InfoBlock from "components/Game/Presentation/InfoBlock";
import Preview from "components/Game/Presentation/Preview";
import Ranking from "components/Game/Presentation/Ranking";

import imgPreview from "assets/preview_atlas.png";
import { games } from "pages/Games";

const gameInfos = games.filter((g) => g.type === gameType.CATEGCOUNTRY)[0];

const MainAtlas = () => {
  const navigate = useNavigate();
  const [dataScoreboard, setDataScoreboard] = useState<FormatedScoreboard[]>(
    []
  );

  const getScoreboardInfos = async () => {
    try {
      const req = await axios.post("/atlas/scoreboard", {
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
          title={gameInfos.title}
          description={gameInfos.description}
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
              <InfoBlock
                title="Modes"
                desc="Solo • 1v1 (bientôt) • Classements"
              />
              <InfoBlock
                title="Difficultés"
                desc="Facile, Moyen, Difficile — choisis ta tactique"
              />
            </>
          }
        />

        <div className="space-y-4">
          <Preview link={imgPreview} alt="preview categcountry" />

          <Ranking data={dataScoreboard} />
        </div>
      </>
    </Surface>
  );
};

export default MainAtlas;
