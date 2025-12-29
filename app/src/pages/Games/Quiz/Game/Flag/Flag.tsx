import { useEffect, useRef, useState } from "react";
import {
  finalScoreInterface,
  countryGuess,
  modeQuiz,
  gameQuiz,
} from "../../../../../@types/quiz";
import { countryList } from "../CountryList";
import axios from "utils/Default/axiosConfig";
import { getUserInfos } from "utils/Default/Auth";
import {
  country,
  UserInfos,
  userRole,
  userStatus,
} from "../../../../../@types/user";
import {
  getTotalSecondByModeFlag,
  resetFlagFound,
  selectRandomInList,
} from "utils/Quiz/FunctionsForFlag";
import QuizModalEndGame from "../../QuizModalEndGame";
import ButtonComponent from "components/ButtonComponent";
import {
  buttonComponentColor,
  buttonComponentSize,
  buttonComponentType,
} from "../../../../../@types/default";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";

const Flag = ({ mode }: { mode: modeQuiz }) => {
  const maxTimer = getTotalSecondByModeFlag(mode);
  const refInput = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [finalScore, setFinalScore] = useState<finalScoreInterface>({
    end: false,
    modalOpenned: false,
    finalTimer: 0,
    listLeftToFind: [],
    listFound: [],
  });
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [flagToGuess, setFlagToGuess] = useState<countryGuess[]>([]);
  const [flagFound, setFlagFound] = useState<countryGuess[]>([]);
  const [userInfos, setUserInfos] = useState<UserInfos>({
    id: "",
    email: "",
    firstname: "",
    lastname: "",
    pseudo: "",
    role: userRole.USER,
    status: userStatus.TO_ACTIVE,
    country: country.FRANCE,
  });

  const [gamePaused, setGamePaused] = useState<boolean>(false);
  const [seconds, setSeconds] = useState(maxTimer);

  const handleChangeInput = (text: any, nameListPossible: string[]) => {
    if (!startTimer) {
      setStartTimer(true);
    }
    if (nameListPossible.includes(text.target.value.toLowerCase().trim())) {
      let flagTemp = flagFound;
      flagTemp.push(flagToGuess[selected]);
      setFlagFound(flagTemp);

      flagToGuess.splice(selected, 1);
      setFlagToGuess(flagToGuess);
      setInputValue("");
      // si pas l'index
      if (flagToGuess.length === 0) {
        endGame();
      } else if (selected > flagToGuess.length - 1) {
        setSelected(selected - 1);
      }
    } else {
      setInputValue(text.target.value);
    }
  };

  const clickStopTimer = () => {
    setStartTimer(false);
  };

  const endGame = async () => {
    setInputValue("");
    setFinalScore({
      end: true,
      modalOpenned: true,
      finalTimer: maxTimer - seconds,
      listFound: flagFound,
      listLeftToFind: flagToGuess,
    });
    try {
      const userInfosRequest = await getUserInfos();
      setUserInfos(userInfosRequest);
      if (userInfosRequest) {
        await axios.post("/quiz", {
          scoreFound: flagFound.length,
          scoreTotal: flagFound.length + flagToGuess.length,
          timerFinished: maxTimer - seconds, //TODO calcul temps total
          type: gameQuiz.FLAG,
          player: userInfosRequest.id,
        });
      }
    } catch (e) {
      // return navigate("auth");
    }
  };

  useEffect(() => {
    let interval: any;
    if (startTimer && !finalScore.end && !gamePaused) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        }
      }, 1000);
      if (seconds === 0) {
        endGame();
        clickStopTimer();
      }
    }
    return () => clearInterval(interval);
  }, [seconds, startTimer, gamePaused]);

  const resetPage = () => {
    setFlagFound([]);
    let tempCountryList = [...countryList];
    setFlagToGuess(resetFlagFound(selectRandomInList(tempCountryList, mode)));
    setInputValue("");
    setFinalScore({
      end: false,
      modalOpenned: false,
      finalTimer: 0,
      listLeftToFind: [],
      listFound: [],
    });
    setSeconds(maxTimer);
    setStartTimer(false);
    if (refInput.current) {
      refInput.current.focus();
    }
  };

  useEffect(() => {
    resetPage();
  }, []);

  return (
    <div
      className="min-h-screen text-white flex flex-col items-center p-10 bg-[var(--color-primary)]" /*bg-gradient-to-b from-[#6C4EF6] to-[#5B44E8]"*/
    >
      <div className="bg-white text-[#5533EA] rounded-2xl shadow-xl p-8 w-full max-w-5xl flex flex-col items-center">
        <div className="flex justify-between items-center w-full mb-6">
          <h2 className="text-3xl font-bold uppercase">Quiz - Drapeaux</h2>

          <div className="flex">
            <div
              id="timer"
              className="text-2xl font-bold bg-[#F4F2FF] px-6 py-2 rounded-full shadow-inner text-center"
              style={{ color: gamePaused ? "grey" : "#6C4EF6" }}
            >
              Temps :{" "}
              {Math.trunc(seconds / 60) < 10
                ? `0${Math.trunc(seconds / 60)}`
                : Math.trunc(seconds / 60)}
              :{seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
            </div>
            <ButtonComponent
              text="Stop"
              color={buttonComponentColor.ERROR}
              type={buttonComponentType.INLINE}
              size={buttonComponentSize.MEDIUM}
              clickOn={() => {
                clickStopTimer();
                endGame();
              }}
              clName="m-auto mr-0 ml-4"
              disabled={!startTimer || finalScore.end}
            />
            <ButtonComponent
              text={gamePaused ? <PlayArrowIcon /> : <PauseIcon />}
              color={
                gamePaused
                  ? buttonComponentColor.SUCCESS
                  : buttonComponentColor.WARNING
              }
              type={buttonComponentType.INLINE}
              size={buttonComponentSize.MEDIUM}
              clickOn={() => {
                setGamePaused(!gamePaused);
              }}
              clName="m-auto mr-0 ml-4"
              disabled={!startTimer || finalScore.end}
            />
            <ButtonComponent
              text={<ReplayIcon />}
              color={buttonComponentColor.INFO}
              type={buttonComponentType.INLINE}
              size={buttonComponentSize.MEDIUM}
              clickOn={() => {
                resetPage();
              }}
              clName="m-auto mr-0 ml-4"
              disabled={!startTimer}
            />
          </div>
        </div>

        <p className="text-center text-[#6B5BEA] mb-8">
          Sélectionne un drapeau, puis écris le nom du pays correspondant avant
          la fin du temps imparti.
        </p>

        <div className="flex mb-4">
          {/* <!-- Answer input --> */}
          <input
            autoFocus
            id="answerInput"
            type="text"
            placeholder="Écris le nom du pays ici..."
            className="w-[300px] flex-1 px-4 py-3 rounded-lg border border-[#D9D4F8] bg-[#F9F9FF] placeholder-[#B6AEEB] focus:outline-none focus:ring-4 focus:ring-[#6C4EF6] transition"
            onChange={(e) =>
              handleChangeInput(e, flagToGuess[selected].nameList)
            }
            ref={refInput}
            value={inputValue}
            style={{ color: gamePaused ? "grey" : "#5533EA" }}
            disabled={gamePaused || finalScore.end}
          />
          {/* <!-- Score --> */}
          <div
            id="score"
            className="m-auto ml-4 text-lg font-semibold text-[#5533EA]"
          >
            Pays trouvés : {flagFound.length} /{" "}
            {flagFound.length + flagToGuess.length}
          </div>
        </div>

        {/* <!-- Flags selection --> */}
        <div
          id="flagList"
          className="grid grid-cols-5 gap-6 mb-10 w-full justify-center"
        >
          {flagToGuess.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setSelected(index);
                refInput.current?.focus();
              }}
              className={`flex flex-col bg-[${
                selected === index ? "#EEE9FF ring-2 ring-[#6C4EF6] outline-none" : "#F9F9FF"
              }] ${
                gamePaused ? "" : "hover:bg-[#EEE9FF]"
              } border border-[#D9D4F8] rounded-xl p-6 transition focus:ring-4 focus:ring-[#6C4EF6] focus:outline-none`}
              disabled={gamePaused || finalScore.end}
            >
              <span className="text-5xl">{gamePaused ? "" : item?.img}</span>
              {finalScore.end ? <span>{item?.name}</span> : <></>}
            </button>
          ))}
        </div>
      </div>
      {finalScore.modalOpenned ? (
        <QuizModalEndGame
          finalScore={finalScore}
          setFinalScore={setFinalScore}
          resetPage={resetPage}
          userInfos={userInfos}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Flag;
