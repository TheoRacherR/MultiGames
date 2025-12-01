import {
  buttonComponentColor,
  buttonComponentSize,
  buttonComponentType,
} from "../../../@types/default";
import ButtonComponent from "components/ButtonComponent";
import { useEffect, useState } from "react";
import axios from "utils/Default/axiosConfig";
import { FormatedScoreboard, gameType } from "../../../@types/games";
import Surface from "components/Game/Presentation/Surface";
import Informations from "components/Game/Presentation/Informations";
import InfoBlock from "components/Game/Presentation/InfoBlock";
import Preview from "components/Game/Presentation/Preview";
import Ranking from "components/Game/Presentation/Ranking";

import imgPreview from "assets/preview_timeline.png";

import { games } from "pages/Games";
import { useNavigate } from "react-router-dom";

const gameInfos = games.filter((g) => g.type === gameType.TIMELINE)[0];

const MainTimeLine = () => {
  const navigate = useNavigate();
  const [dataScoreboard, setDataScoreboard] = useState<FormatedScoreboard[]>(
    []
  );

  const getScoreboardInfos = async () => {
    try {
      const req = await axios.post("/timeline/scoreboard", {
        length: 5,
      });
      console.log(req);
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
    <>
      <Surface>
        <>
          <Informations
            title={gameInfos.title}
            description={gameInfos.description}
            buttonPlay={
              <>
                <ButtonComponent
                  text="Play"
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
            <Preview link={imgPreview} alt="preview timeline" />

            <Ranking data={dataScoreboard} />
          </div>
        </>
      </Surface>
    </>
  );
};

export default MainTimeLine;
