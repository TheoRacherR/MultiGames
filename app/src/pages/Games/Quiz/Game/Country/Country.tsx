import { useEffect, useRef, useState } from 'react'
import { countryGuess, finalScoreInterface, gameQuiz, modeQuiz } from '../../../../../@types/quiz'
import Map from './Map';
import { countryList } from "../CountryList";
import Timer from '../Timer/Timer';
import CountryList from './CountryList/CountryList';
import CountryModalEndGame from './CountryModalEndGame';
import { resetCountriesFound } from '../../../../../utils/Quiz/FunctionsForCountry';
import { getUserInfos } from 'utils/Default/Auth';
import { country, UserInfos, userRole, userStatus } from '../../../../../@types/user';
import axios from 'axios';
import world from './world.svg';


const Country = ({ mode }: { mode: modeQuiz }) => {
  const timerTotal = {
    minutes: 0,
    seconds: 15
  }
  const refInput = useRef<HTMLInputElement>(null);
  const [countryFound, setCountryFound] = useState<any[]>([]);
  const [countryToGuess, setCountryToGuess] = useState<countryGuess[]>([]);
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

  const countryToGuessInit: countryGuess[] = countryList.filter(cl => cl.location.contient === mode || mode === modeQuiz.ALL);
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
  const [minutes, setMinutes] = useState(timerTotal.minutes);
  const [seconds, setSeconds] = useState(timerTotal.seconds);

  const handleChangeInput = (text: any, countryListToGuess: countryGuess[]) => {
    const inputText = text.target.value.toLowerCase().trim();
    const countryFoundTempList = countryListToGuess.filter(cg => cg.nameList.some(n => n.toLowerCase() === inputText));
    if(countryFoundTempList.length > 0){
      let countryFoundTemp: countryGuess[] = countryFound;
      countryFoundTempList[0].found = true;
      countryFoundTemp.push(countryFoundTempList[0]);
      setCountryFound(countryFoundTemp);
      // Change en vert
      const newCountryFoundTemp = countryListToGuess.slice(0, countryListToGuess.indexOf(countryFoundTempList[0])).concat(countryListToGuess.slice(countryListToGuess.indexOf(countryFoundTempList[0])+1, countryListToGuess.length));
      setCountryToGuess(newCountryFoundTemp);
      // console.log(newCountryFoundTemp)

      setInputValue('');
      if(newCountryFoundTemp.length === 0){
        endGame();
      }
    }
    else {
      setInputValue(text.target.value);
    };
  };

  const clickStartTimer = () => {
    setStartTimer(true);
  };

  const clickStopTimer = () => {
    setStartTimer(false);
  };

  const endGame = async () => {
    setFinalScore({
      end: true,
      finalTimer: {
        seconds: timerTotal.seconds - seconds,
        minutes: timerTotal.minutes - minutes,
      },
      listFound: countryFound,
      listLeftToFind: countryToGuess,
    });
    try {
      const userInfosRequest = await getUserInfos();
      setUserInfos(userInfosRequest);
      if (userInfosRequest) {
        await axios.post("/quiz", {
          scoreFound: countryFound.length,
          scoreTotal: countryFound.length + countryToGuess.length,
          timerFinished: 0, //TODO calcul temps total
          type: gameQuiz.COUNTRY,
          player: userInfosRequest.id,
        });
      }
    } catch (e) {
      // return navigate("auth");
      console.log(e);
    }
  }

  useEffect(() => {
    setCountryToGuess(countryToGuessInit);
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
        // console.log('timeout')
        endGame();
        clickStopTimer();
      }
    }
    return () => clearInterval(interval);
  }, [seconds, minutes, startTimer]);

  const resetPage = () => {
    setCountryFound([]);
    setCountryToGuess(resetCountriesFound(countryList.filter(cl => cl.location.contient === mode || mode === modeQuiz.ALL)));
    setInputValue("");
    setFinalScore({
      end: false,
      finalTimer: {
        seconds: 0,
        minutes: 0,
      },
      listLeftToFind: [],
      listFound: [],
    });
    setMinutes(timerTotal.minutes);
    setSeconds(timerTotal.seconds);
    setStartTimer(false);
    if(refInput.current){
      refInput.current.focus();
    }
  }

  // useEffect(() => {
  //   console.log(countryFound)
  // }, [countryFound]);

  return (
    <div className="min-h-screen bg-[var(--color-primary)] text-white flex flex-col items-center p-10">

      {/* <div className='flex'>
        <Map countryListFound={countryFound} countryListToGuess={countryToGuess} isContent={mode !== modeQuiz.ALL}/>
        <Timer
          endGame={endGame}
          score={{ left: countryToGuess.length, total: countryToGuessInit.length }}
          startTimer={startTimer}
          clickStartTimer={clickStartTimer}
          clickStopTimer={clickStopTimer}
          seconds={seconds}
          minutes={minutes}
        />
      </div>
      <input
        className="input m-2 flex-1 h-12 fixed bottom-0 w-[calc(100%-1rem)] z-50"
        value={inputValue}
        type="text"
        name="flag"
        id="flag"
        placeholder="Type here"
        ref={refInput}
        autoFocus
        onChange={(e) => handleChangeInput(e, countryToGuess)}
        disabled={!startTimer}
      /> */}
      <main
        className="bg-white text-[#5533EA] rounded-2xl shadow-xl p-8 w-full max-w-6xl flex flex-col items-center"
      >
        <h2 className="text-3xl font-bold uppercase mb-6">Quiz - Carte du Monde</h2>

        {/* <!-- Timer --> */}
        <div
          id="timer"
          className="text-2xl font-bold text-[#6C4EF6] bg-[#F4F2FF] px-6 py-2 rounded-full mb-6 shadow-inner"
        >
          Temps : 02:00
        </div>

        {/* <!-- Input --> */}
        <div className="flex gap-4 items-center mb-8">
          <input
            id="countryInput"
            type="text"
            placeholder="Écris le nom d’un pays..."
            className="px-4 py-3 rounded-lg border border-[#D9D4F8] bg-[#F9F9FF] text-[#5533EA] placeholder-[#B6AEEB] focus:outline-none focus:ring-4 focus:ring-[#6C4EF6] transition"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg font-semibold bg-[#6C4EF6] text-white hover:bg-[#7D61F8] transition"
          >
            Valider
          </button>
        </div>

        {/* <!-- Carte du monde --> */}
        <div className="bg-[#F9F9FF] p-6 rounded-xl border border-[#D9D4F8] overflow-hidden">
          <Map countryListFound={countryFound} countryListToGuess={countryToGuess} isContent={mode !== modeQuiz.ALL}/>
        </div>

        {/* <!-- Score --> */}
        <div id="score" className="mt-8 text-lg font-semibold text-[#5533EA]">
          Pays trouvés : {countryFound.length} / {countryFound.length + countryToGuess.length}
        </div>
      </main>
      {/* <CountryList
        countryListFound={countryFound}
        countryListToGuess={countryToGuess}
      /> */}

      {/* <CountryModalEndGame
        finalScore={finalScore}
        setFinalScore={setFinalScore}
        resetPage={resetPage}
        userInfos={userInfos}
      /> */}
    </div>
  )
}

export default Country