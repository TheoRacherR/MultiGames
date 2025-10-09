import { useEffect, useState } from "react";
import Scoreboard from "../../../components/Scoreboard";
import {
  buttonComponentType,
  gameList,
  gameQuiz,
  modeFlagList,
  modeCountryList,
  modeQuiz,
} from "../../../@types/guiz";
import ButtonComponent from "./ButtonComponent";
import { useNavigate } from "react-router-dom";
import axios from "../../../axiosConfig"
import { FormatedScoreboard } from "../../../@types/games";

const MainQuiz = () => {
  const navigate = useNavigate();
  const [game, setGame] = useState<gameQuiz>(gameQuiz.FLAG);
  const [mode, setMode] = useState<modeQuiz>(modeQuiz.ALL);
  const [dataScoreboard, setDataScoreboard] = useState<FormatedScoreboard[]>([]);

  useEffect(() => {
    console.log(game);
  }, [game]);

  useEffect(() => {
    console.log(mode);
  }, [mode]);

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: string
  ) => {
    console.log("first");
    const value = e.target.value;
    if (type === "mode") {
      if(game !== value) {
        switch (value) {
          case "Flag":
            setGame(gameQuiz.FLAG);
            break;
          case "Country":
            setGame(gameQuiz.COUNTRY);
            break;
        }
      }
      else return;
    } else if (type === "difficulty" && game === gameQuiz.FLAG) {
      switch (value) {
        case "All":
          setMode(modeQuiz.ALL);
          break;
        case "5":
          setMode(modeQuiz.FIVE);
          break;
        case "10":
          setMode(modeQuiz.TEN);
          break;
        case "20":
          setMode(modeQuiz.TWENTY);
          break;
      }
    } else if (type === "difficulty" && game === gameQuiz.COUNTRY) {
      console.log("change");
      switch (value) {
        case "All":
          setMode(modeQuiz.ALL);
          break;
        case "North america":
          setMode(modeQuiz.NORTH_AMERICA);
          break;
        case "South america":
          setMode(modeQuiz.SOUTH_AMERICA);
          break;
        case "Europe":
          setMode(modeQuiz.EUROPE);
          break;
        case "Africa":
          setMode(modeQuiz.AFRICA);
          break;
        case "Oceania":
          setMode(modeQuiz.OCEANIA);
          break;
        case "Asia":
          setMode(modeQuiz.ASIA);
          break;
      }
    }
  };

  const getScoreboardInfos = async () => {
    try {
      const req = await axios.post('/quiz/scoreboard', {
        type: game,
        length: 5
      })
      if(req.status === 201) {
        setDataScoreboard(req.data);
        return;
      }
      else {
        // TODO Alerte error
      }
    }
    catch (e) {
      console.log(e)
      // TODO Alerte error
    }
  }

  useEffect(() => {
    getScoreboardInfos();
  }, [game])

  return (
    <div className="my-5 mx-auto" style={{ width: 700 }}>
      <h1 className="text-6xl text-center mb-14">❓ Quiz ❓</h1>

      <div className="w-2/3 h-500px mx-auto mb-28 flex justify-around">
        <select
          className="bg-slate-200 min-w-20 pl-2 rounded-md"
          onChange={(e) => handleChangeInput(e, "mode")}
        >
          {gameList.map((item, index) => (
            <option key={`option_game_${index}`} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          className="bg-slate-200 min-w-20 pl-2 rounded-md"
          onChange={(e) => handleChangeInput(e, "difficulty")}
        >
          {game === gameQuiz.FLAG
            ? modeFlagList.map((item: modeQuiz, index: number) => (
                <option key={`option_mode_${index}`} value={item}>
                  {item}
                </option>
              ))
            : modeCountryList.map((item: modeQuiz, index: number) => (
                <option key={`option_mode_${index}`} value={item}>
                  {item}
                </option>
              ))}
        </select>
        <ButtonComponent
          index={"index_quiz_button_create_party"}
          text={"Create a party"}
          type={buttonComponentType.GREEN}
          clickOn={() =>
            navigate(
              `${game === gameQuiz.FLAG ? "flag" : "country"}/${
                mode === modeQuiz.NORTH_AMERICA
                  ? "north_america"
                  : mode === modeQuiz.SOUTH_AMERICA
                  ? "south_america"
                  : mode.toLowerCase()
              }`
            )
          }
        />
      </div>
      <div>
        <h2 className="text-center">Scoreboard :</h2>
        <Scoreboard data={dataScoreboard} />
      </div>
    </div>
  );
};

export default MainQuiz;
