import { useEffect, useState } from "react";
import {
  gameList,
  gameQuiz,
  modeFlagList,
  modeCountryList,
  modeQuiz,
} from "../../../@types/quiz";
import { useNavigate } from "react-router-dom";
import axios from "axiosConfig";
import { FormatedScoreboard, gameType } from "../../../@types/games";
import InputComponent from "components/InputComponent";
import Surface from "components/Game/Presentation/Surface";
import Informations from "components/Game/Presentation/Informations";
import InfoBlock from "components/Game/Presentation/InfoBlock";
import Preview from "components/Game/Presentation/Preview";
import Ranking from "components/Game/Presentation/Ranking";

import imgPreviewCountry from "assets/preview_quiz_country.png"
import imgPreviewFlag from "assets/preview_quiz_flag.png"

import { games } from "pages/Games";

const MainQuiz = () => {
  const navigate = useNavigate();
  const [game, setGame] = useState<gameQuiz>(gameQuiz.FLAG);
  const [mode, setMode] = useState<modeQuiz>(modeQuiz.ALL);
  const [dataScoreboard, setDataScoreboard] = useState<FormatedScoreboard[]>(
    []
  );

  // useEffect(() => {
  //   console.log(game);
  // }, [game]);

  // useEffect(() => {
  //   console.log(mode);
  // }, [mode]);

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: string
  ): { game: gameQuiz, mode: modeQuiz } => {
    const value = e.target.value;
    if (type === "mode") {
      if (game !== value) {
        switch (value) {
          case "Flag":
            return { game: gameQuiz.FLAG, mode: modeQuiz.ALL };
          case "Country":
            return { game: gameQuiz.COUNTRY, mode: modeQuiz.ALL };
        }
      } else return { game: gameQuiz.FLAG, mode: modeQuiz.ALL };
    } else if (type === "difficulty" && game === gameQuiz.FLAG) {
      switch (value) {
        case "All": return { game: game, mode: modeQuiz.ALL };
        case "5": return { game: game, mode: modeQuiz.FIVE };
        case "10": return { game: game, mode: modeQuiz.TEN };
        case "20": return { game: game, mode: modeQuiz.TWENTY };
      }
    } else if (type === "difficulty" && game === gameQuiz.COUNTRY) {
      switch (value) {
        case "All": return { game: game, mode: modeQuiz.ALL };
        case "North america": return { game: game, mode: modeQuiz.NORTH_AMERICA };
        case "South america": return { game: game, mode: modeQuiz.SOUTH_AMERICA };
        case "Europe": return { game: game, mode: modeQuiz.EUROPE };
        case "Africa": return { game: game, mode: modeQuiz.AFRICA };
        case "Oceania": return { game: game, mode: modeQuiz.OCEANIA };
        case "Asia": return { game: game, mode: modeQuiz.ASIA };
      }
    }
    return { game: game, mode: mode }
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
    <Surface>
      <>
        <Informations
          title={game === gameQuiz.FLAG ? games.filter(g => g.type === gameType.QUIZ_FLAG)[0].title : games.filter(g => g.type === gameType.QUIZ_COUNTRY)[0].title}
          description={game === gameQuiz.FLAG ? games.filter(g => g.type === gameType.QUIZ_FLAG)[0].description : games.filter(g => g.type === gameType.QUIZ_COUNTRY)[0].description}
          buttonPlay={
            <>
              <div className="h-500px mx-auto mb-6 flex justify-center">
                <InputComponent
                  change={(e) => {
                    const result = handleChangeInput(e, "mode");
                    setGame(result.game);
                    setMode(result.mode);
                  }}
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
                  change={(e) => {
                    const result = handleChangeInput(e, "difficulty");
                    setGame(result.game);
                    setMode(result.mode);
                  }}
                  cl="rounded-none"
                >
                  <>
                    {game === gameQuiz.FLAG
                      ? modeFlagList.map((item: modeQuiz, index: number) => (
                          <option key={`option_mode_${index}`} value={item} selected={item === mode}>
                            {item}
                          </option>
                        ))
                      : modeCountryList.map((item: modeQuiz, index: number) => (
                          <option key={`option_mode_${index}`} value={item} selected={item === mode}>
                            {item}
                          </option>
                    ))}
                  </>
                </InputComponent>

                {/* <div className="h-auto w-[1px] bg-black"></div> */}

                <button
                  className={"btn-outline btn-medium"}
                  type="submit"
                  style={{
                    borderRadius: "0px 10px 10px 0px",
                    borderWidth: "1px",
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-text-primary)",
                    borderColor: "var(--color-text-primary)",
                    height: 50
                  }}
                  onClick={() =>
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
                >
                  {"Jouer"}
                </button>
              </div>
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
          <Preview link={game === gameQuiz.FLAG ? imgPreviewFlag : imgPreviewCountry} alt="preview quiz" />

          <Ranking data={dataScoreboard}/>
        </div>
      </>
    </Surface>
  );
};

export default MainQuiz;
