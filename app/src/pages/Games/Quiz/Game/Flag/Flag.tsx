import { useEffect, useRef, useState } from "react";
import FlagModalEndGame from "./FlagModalEndGame";
import {
  finalScoreInterface,
  countryGuess,
  modeQuiz,
  gameQuiz,
} from "../../../../../@types/quiz";
import { countryList } from "../CountryList";
import Timer from "../Timer/Timer";
import axios from "axiosConfig";
import { getUserInfos } from "../../../../../utils/Default/Auth";
import { country, UserInfos, userRole, userStatus } from "../../../../../@types/user";

const Flag = ({ mode }: { mode: modeQuiz }) => {
  const refInput = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [finalScore, setFinalScore] = useState<finalScoreInterface>({
    end: false,
    finalTimer: {
      seconds: 0,
      minutes: 0,
    },
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

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(15);

  const selectRandomInList = (
    list: countryGuess[],
    mode: modeQuiz
  ): countryGuess[] => {
    let listTemp = list;
    let returnList: countryGuess[] = [];
    let len =
      mode === modeQuiz.ALL
        ? 182
        : mode === modeQuiz.FIVE
        ? 5
        : mode === modeQuiz.TEN
        ? 10
        : 20;
    for (let index = 0; index < len; index++) {
      let ranNum = Math.floor(Math.random() * listTemp.length);
      returnList.push(listTemp[ranNum]);
      listTemp.splice(ranNum, 1);
    }
    return returnList;
  };

  const flagToGuessInit: countryGuess[] = selectRandomInList(countryList, mode);

  const handleChangeInput = (text: any, nameListPossible: string[]) => {
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
      console.log("nope: " + text.target.value.toLowerCase());
      console.log(nameListPossible);
      setInputValue(text.target.value);
    }
  };

  const clickStartTimer = () => {
    setStartTimer(true);
    // setGameStarted(true);
  };

  const clickStopTimer = () => {
    setStartTimer(false);
  };

  const endGame = async () => {
    setFinalScore({
      end: true,
      finalTimer: {
        seconds: seconds,
        minutes: minutes,
      },
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
          timerFinished: 0, //TODO calcul temps total
          type: gameQuiz.FLAG,
          player: userInfosRequest.id,
        });
      }
    } catch (e) {
      // return navigate("auth");
      console.log(e);
    }
  };

  useEffect(() => {
    setFlagToGuess(flagToGuessInit);
  }, []);

  useEffect(() => {
    let interval: any;
    if (startTimer && !finalScore.end) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
        }
      }, 1000);
      if (minutes === 0 && seconds === 0) {
        endGame();
        clickStopTimer();
      }
    }
    return () => clearInterval(interval);
  }, [seconds, minutes, startTimer]);

  return (
    <div className="min-h-screen text-white flex flex-col items-center p-10 bg-[var(--color-primary)]" /*bg-gradient-to-b from-[#6C4EF6] to-[#5B44E8]"*/>
      <div
      className="bg-white text-[#5533EA] rounded-2xl shadow-xl p-8 w-full max-w-5xl flex flex-col items-center"
    >
      <div className="flex justify-between items-center w-full mb-6">
        <h2 className="text-3xl font-bold uppercase">Quiz - Drapeaux</h2>

        {/* <!-- Timer --> */}
        <div
          id="timer"
          className="text-2xl font-bold bg-[#6C4EF6] text-white px-5 py-2 rounded-lg shadow-md"
        >
          30s
        </div>
      </div>

      <p className="text-center text-[#6B5BEA] mb-8">
        Sélectionne un drapeau, puis écris le nom du pays correspondant avant la
        fin du temps imparti.
      </p>

      {/* <!-- Flags selection --> */}
      <div id="flagList" className="grid grid-cols-5 gap-6 mb-10 w-full justify-center">
        {['🇫🇷', '🇩🇪', '🇯🇵', '🇨🇦', '🇧🇷'].map((item, index) => (
          <button key={index} className="bg-[#F9F9FF] hover:bg-[#EEE9FF] border border-[#D9D4F8] rounded-xl p-6 text-5xl transition focus:ring-4 focus:ring-[#6C4EF6] focus:outline-none">
            {item}
          </button>
        ))}
      </div>

      {/* <!-- Answer input --> */}
      <form id="quizForm" className="flex flex-col sm:flex-row gap-4 items-center w-full justify-center">
        <input
          id="answerInput" type="text"
          placeholder="Écris le nom du pays ici..."
          className="flex-1 px-4 py-3 rounded-lg border border-[#D9D4F8] bg-[#F9F9FF] text-[#5533EA] placeholder-[#B6AEEB] focus:outline-none focus:ring-4 focus:ring-[#6C4EF6] transition"
        />
        <button className="px-6 py-3 rounded-lg font-semibold bg-[#6C4EF6] text-white hover:bg-[#7D61F8] transition"
        >
          Valider
        </button>
      </form>

      {/* <!-- Feedback message --> */}
      <div
        id="feedback"
        className="mt-6 text-lg font-medium opacity-0 transition-opacity"
      ></div>
      </div>
      {finalScore.end ? (
        <FlagModalEndGame
          finalScore={finalScore}
          setFinalScore={setFinalScore}
          userInfos={userInfos}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Flag;
