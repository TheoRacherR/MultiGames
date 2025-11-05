import Scoreboard from "components/Scoreboard";
import { useNavigate } from "react-router-dom";
import axios from "axiosConfig";
import { useEffect, useState } from "react";
import { FormatedScoreboard } from "../../../@types/games";
import ButtonComponent from "components/ButtonComponent";
import { buttonComponentType } from "../../../@types/guiz";

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
    <div className="my-5 mx-auto" style={{ width: 700 }}>
      <h1 className="text-6xl text-center mb-14">🟩 Wordle 🟩</h1>

      <div className="w-2/3 h-500px mx-auto mb-28 flex justify-around">
        <ButtonComponent
          index="play"
          text="Play"
          type={buttonComponentType.RED}
          clickOn={() => navigate("game")}
        />
      </div>
      <div>
        <h2 className="text-center">Scoreboard :</h2>
        <Scoreboard data={dataScoreboard} />
      </div>
    </div>
  );
};

export default MainWordle;
