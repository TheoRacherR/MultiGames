import Scoreboard from "components/Scoreboard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axiosConfig";
import { FormatedScoreboard } from "../../../@types/games";
import ButtonComponent from "components/ButtonComponent";
import { buttonComponentColor, buttonComponentSize, buttonComponentType } from "../../../@types/default";
import TitleScoreboard from "components/TitleScoreboard";
import TitleGame from "components/TitleGame";

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
    <div className="my-5 mx-auto" style={{ width: 700 }}>
      <TitleGame title="Minesweeper" />

      <div className="w-2/3 h-500px mx-auto mb-28 flex justify-center">
        <ButtonComponent
          text="Create a party"
          color={buttonComponentColor.PRIMARY}
          type={buttonComponentType.INLINE}
          size={buttonComponentSize.MEDIUM}
          clickOn={() => navigate("game")}
        />
      </div>
      <div>
        <TitleScoreboard />
        <Scoreboard data={dataScoreboard} />
      </div>
    </div>
  );
};

export default MainMinesweeper;
