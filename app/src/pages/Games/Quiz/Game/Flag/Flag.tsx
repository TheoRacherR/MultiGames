import { useEffect, useRef, useState } from "react";
import FlagModalEndGame from "./FlagModalEndGame";
import {
  finalScoreInterface,
  countryGuess,
  modeQuiz,
} from "../../../../../@types/guiz";
import { countryList } from "../CountryList";
import Timer from "../Timer/Timer";

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

  const [minutes, setMinutes] = useState(15);
  const [seconds, setSeconds] = useState(0);

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
        setFinalScore({
          end: true,
          finalTimer: {
            seconds: seconds,
            minutes: minutes,
          },
          listFound: flagFound,
          listLeftToFind: flagToGuess,
        });
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

  const timeOut = () => {
    setFinalScore({
      end: true,
      finalTimer: {
        seconds: seconds,
        minutes: minutes,
      },
      listFound: flagFound,
      listLeftToFind: flagToGuess,
    });
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
        timeOut();
        clickStopTimer();
      }
    }
    return () => clearInterval(interval);
  }, [seconds, minutes, startTimer]);

  return (
    <div className="flex">
      <div className="flex gap-2 mx-auto p-10 overflow-auto flex-col flex-1">
        {startTimer ? (
          flagToGuess.map((item, index) => (
            <img
              key={`flag_${index}`}
              src={item.img}
              alt={item.alt}
              className={`max-h-48 border-4 border-solid ${
                selected === index ? "border-black" : "border-white"
              } cursor-pointer`}
              onClick={() => {
                setSelected(index);
                refInput.current?.focus();
              }}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      <input
        className="input m-2 flex-1 h-12"
        value={inputValue}
        type="text"
        name="flag"
        id="flag"
        placeholder="Type here"
        ref={refInput}
        autoFocus
        onChange={(e) => handleChangeInput(e, flagToGuess[selected].nameList)}
        disabled={!startTimer}
      />
      <Timer
        timeOut={timeOut}
        score={{ left: flagToGuess.length, total: flagToGuessInit.length }}
        startTimer={startTimer}
        clickStartTimer={clickStartTimer}
        clickStopTimer={clickStopTimer}
        seconds={seconds}
        minutes={minutes}
      />
      {
        finalScore.end ?
          <FlagModalEndGame finalScore={finalScore} setFinalScore={setFinalScore} />
        :
        <></>
      }
    </div>
  );
};

export default Flag;
