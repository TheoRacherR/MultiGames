import { useEffect, useRef, useState } from "react";
import {
  countryGuess,
  finalScoreInterface,
  gameQuiz,
  modeQuiz,
} from "../../../../../@types/quiz";
import Map from "./Map";
import { countryList } from "../CountryList";
import CountryList from "./CountryList/CountryList";
import QuizModalEndGame from "../../QuizModalEndGame";
import { getTotalSecondByModeCountry, resetCountriesFound } from "utils/Quiz/FunctionsForCountry";
import { getUserInfos } from "utils/Default/Auth";
import {
  country,
  UserInfos,
  userRole,
  userStatus,
} from "../../../../../@types/user";
import axios from "axios";
import ButtonComponent from "components/ButtonComponent";
import {
  buttonComponentColor,
  buttonComponentSize,
  buttonComponentType,
} from "../../../../../@types/default";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';

const Country = ({ mode }: { mode: modeQuiz }) => {
  const maxTimer = getTotalSecondByModeCountry(mode);
  const refInput = useRef<HTMLInputElement>(null);
  const [countryFound, setCountryFound] = useState<any[]>([]);
  const [countryToGuess, setCountryToGuess] = useState<countryGuess[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [finalScore, setFinalScore] = useState<finalScoreInterface>({
    end: false,
    modalOpenned: false,
    finalTimer: 0,
    listLeftToFind: [],
    listFound: [],
  });

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
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [gamePaused, setGamePaused] = useState<boolean>(false);
  const [seconds, setSeconds] = useState(maxTimer);

  const handleChangeInput = (text: any, countryListToGuess: countryGuess[]) => {
    if (!startTimer) {
      setStartTimer(true);
    }
    const inputText = text.target.value.toLowerCase().trim();
    const countryFoundTempList = countryListToGuess.filter((cg) =>
      cg.nameList.some((n) => n.toLowerCase() === inputText)
    );
    if (countryFoundTempList.length > 0) {
      let countryFoundTemp: countryGuess[] = countryFound;
      countryFoundTempList[0].found = true;
      countryFoundTemp.push(countryFoundTempList[0]);
      setCountryFound(countryFoundTemp);
      // Change en vert
      const newCountryFoundTemp = countryListToGuess
        .slice(0, countryListToGuess.indexOf(countryFoundTempList[0]))
        .concat(
          countryListToGuess.slice(
            countryListToGuess.indexOf(countryFoundTempList[0]) + 1,
            countryListToGuess.length
          )
        );
      setCountryToGuess(newCountryFoundTemp);

      setInputValue("");
      if (newCountryFoundTemp.length === 0) {
        endGame(true);
      }
    } else {
      setInputValue(text.target.value);
    }
  };

  // TODO btn pause

  const clickStopTimer = () => {
    setStartTimer(false);
  };

  const endGame = async (won: boolean) => {
    setInputValue("");
    setFinalScore({
      end: true,
      modalOpenned: true,
      finalTimer: maxTimer - seconds,
      listFound: countryFound,
      listLeftToFind: won ? [] : countryToGuess,
    });
    try {
      const userInfosRequest = await getUserInfos();
      setUserInfos(userInfosRequest);
      if (userInfosRequest) {
        await axios.post("/quiz", {
          scoreFound: countryFound.length,
          scoreTotal: countryFound.length + countryToGuess.length,
          timerFinished: maxTimer - seconds,
          type: gameQuiz.COUNTRY,
          player: userInfosRequest.id,
        });
      }
    } catch (e) {
      // return navigate("auth");
    }
  };

  useEffect(() => {
    setCountryToGuess(resetCountriesFound(
      countryList.filter(
        (cl) => cl.location.contient === mode || mode === modeQuiz.ALL
      )
    ));
  }, []);

  useEffect(() => {
    let interval: any;
    if (startTimer && !finalScore.end && !gamePaused) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        }
      }, 1000);
      if (seconds === 0) {
        endGame(false);
        clickStopTimer();
      }
    }
    return () => clearInterval(interval);
  }, [seconds, startTimer, gamePaused]);

  const resetPage = () => {
    setCountryFound([]);
    setCountryToGuess(
      resetCountriesFound(
        countryList.filter(
          (cl) => cl.location.contient === mode || mode === modeQuiz.ALL
        )
      )
    );
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
    <div className="min-h-screen bg-[var(--color-primary)] text-white flex flex-col items-center p-10">
      <main className="bg-white text-[#5533EA] rounded-2xl shadow-xl p-8 w-full max-w-6xl flex flex-col items-center">
        <h2 className="text-3xl font-bold uppercase mb-6">
          Quiz - Carte du Monde
        </h2>

        {/* <!-- Timer --> */}
        <div className="w-[400px]">
          <div className="w-full flex mb-6">
            <div
              id="timer"
              className="text-2xl font-bold  bg-[#F4F2FF] px-6 py-2 rounded-full shadow-inner text-center"
              style={{color: gamePaused ? 'grey' : '#6C4EF6'}}

            >
              Temps : {Math.trunc(seconds / 60) < 10 ? `0${Math.trunc(seconds / 60)}` : Math.trunc(seconds / 60)}:
              {seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
            </div>
            <ButtonComponent
              text="Stop"
              color={buttonComponentColor.ERROR}
              type={buttonComponentType.INLINE}
              size={buttonComponentSize.MEDIUM}
              clickOn={() => {
                clickStopTimer();
                endGame(false);
              }}
              clName="m-auto mr-0"
              disabled={!startTimer || finalScore.end}
            />
            <ButtonComponent
              text={gamePaused ? <PlayArrowIcon/> : <PauseIcon/>}
              color={gamePaused ? buttonComponentColor.SUCCESS : buttonComponentColor.WARNING}
              type={buttonComponentType.INLINE}
              size={buttonComponentSize.MEDIUM}
              clickOn={() => {
                setGamePaused(!gamePaused);
              }}
              clName="m-auto mr-0"
              disabled={!startTimer || finalScore.end}
            />
            <ButtonComponent
              text={<ReplayIcon/>}
              color={buttonComponentColor.INFO}
              type={buttonComponentType.INLINE}
              size={buttonComponentSize.MEDIUM}
              clickOn={() => {
                resetPage();
              }}
              clName="m-auto mr-0"
              disabled={!startTimer}
            />
          </div>

          {/* <!-- Input --> */}
          <div className="flex gap-4 items-center mb-8">
            <input
              id="countryInput"
              type="text"
              placeholder="Écris le nom d’un pays..."
              className="w-full px-4 py-3 rounded-lg border border-[#D9D4F8] bg-[#F9F9FF] placeholder-[#B6AEEB] focus:outline-none focus:ring-4 focus:ring-[#6C4EF6] transition"
              style={{color: gamePaused ? 'grey' : '#5533EA'}}
              value={inputValue}
              autoFocus
              onChange={(e) => handleChangeInput(e, countryToGuess)}
              disabled={gamePaused || finalScore.end}
            />
          </div>
        </div>

        {/* <!-- Carte du monde --> */}
        <div className="bg-[#F9F9FF] p-6 rounded-xl border border-[#D9D4F8] overflow-hidden">
          <Map
            mode={mode}
            countryListFound={countryFound}
            countryListToGuess={countryToGuess}
            isContent={mode !== modeQuiz.ALL}
          />
        </div>

        {/* <!-- Score --> */}
        <div id="score" className="mt-8 text-lg font-semibold text-[#5533EA]">
          Pays trouvés : {countryFound.length} /{" "}
          {countryFound.length + countryToGuess.length}
        </div>
      </main>
      <div className="max-w-6xl">
        <CountryList
          end={finalScore.end}
          countryListFound={countryFound}
          countryListToGuess={countryToGuess}
        />
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

export default Country;
