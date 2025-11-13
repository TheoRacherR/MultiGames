import { useEffect, useState } from "react";
import Scoreboard from "components/Scoreboard";
import {
  gameList,
  gameQuiz,
  modeFlagList,
  modeCountryList,
  modeQuiz,
} from "../../../@types/quiz";
import ButtonComponent from "components/ButtonComponent";
import { useNavigate } from "react-router-dom";
import axios from "axiosConfig";
import { FormatedScoreboard } from "../../../@types/games";
import TitleScoreboard from "components/TitleScoreboard";
import TitleGame from "components/TitleGame";
import InputComponent from "components/InputComponent";

const MainQuiz = () => {
  const navigate = useNavigate();
  const [game, setGame] = useState<gameQuiz>(gameQuiz.FLAG);
  const [mode, setMode] = useState<modeQuiz>(modeQuiz.ALL);
  const [dataScoreboard, setDataScoreboard] = useState<FormatedScoreboard[]>(
    []
  );

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
      if (game !== value) {
        switch (value) {
          case "Flag":
            setGame(gameQuiz.FLAG);
            break;
          case "Country":
            setGame(gameQuiz.COUNTRY);
            break;
        }
      } else return;
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
      console.log(game);
      const req = await axios.post("/quiz/scoreboard", {
        type: game,
        length: 5,
      });
      if (req.status === 201) {
        console.log(req.data);
        setDataScoreboard(req.data);
        return;
      } else {
        // TODO Alerte error
        console.log("err");
      }
    } catch (e) {
      console.log(e);
      // TODO Alerte error
    }
  };

  useEffect(() => {
    getScoreboardInfos();
  }, [game]);

  return (
    <div className="my-5 mx-auto" style={{ width: 700 }}>
      <TitleGame title='Quiz'/>

      <div className="w-2/3 h-500px mx-auto mb-28 flex justify-center">
        <InputComponent
          change={(e) => handleChangeInput(e, "mode")}
          cl="rounded-l-[10px]"
        >
          <>
            {gameList.map((item, index) => (
              <option key={`option_game_${index}`} value={item}>
                {item}
              </option>
            ))}
          </>
        </InputComponent>
        

        <div className="h-auto w-[1px] bg-black"></div>

        <InputComponent
          change={(e) => handleChangeInput(e, "difficulty")}
          cl="rounded-none"
        >
          <>
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
          </>
        </InputComponent>

        <div className="h-auto w-[1px] bg-black"></div>

        <button
          className={"btn-outline btn-medium"}
          type="submit"
          style={{
            borderRadius: "0px 10px 10px 0px",
            borderWidth: "0px",
            backgroundColor: "var(--color-primary)",
            color: "var(--color-text-primary)",
            borderColor: "var(--color-text-primary)",
          }}
        >
          {"Create a party"}
        </button>
      </div>

      <div>
        <TitleScoreboard />
        <Scoreboard data={dataScoreboard} />
      </div>
    </div>
  );
};

export default MainQuiz;
