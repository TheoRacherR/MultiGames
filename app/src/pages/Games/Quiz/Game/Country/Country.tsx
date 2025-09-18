import React, { useEffect, useRef, useState } from 'react'
import { countryGuess, finalScoreInterface, modeQuiz } from '../../../../../@types/guiz'
import Map from './Map';
import { countryList } from "../CountryList";
import Timer from '../Timer/Timer';
import CountryList from './CountryList/CountryList';
import CountryModalEndGame from './CountryModalEndGame';


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
      console.log(newCountryFoundTemp)

      setInputValue('');
      if(newCountryFoundTemp.length === 0){
        setFinalScore({
          end: true,
          finalTimer: {
            seconds: timerTotal.seconds - seconds,
            minutes: timerTotal.minutes - minutes,
          },
          listFound: countryFoundTemp,
          listLeftToFind: newCountryFoundTemp,
        });
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

  const timeOut = () => {
    setFinalScore({
      end: true,
      finalTimer: {
        seconds: timerTotal.seconds - seconds,
        minutes: timerTotal.minutes - minutes,
      },
      listFound: countryFound,
      listLeftToFind: countryToGuess,
    });
  };

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
        console.log('timeout')
        timeOut();
        clickStopTimer();
      }
    }
    return () => clearInterval(interval);
  }, [seconds, minutes, startTimer]);

  return (
    <div className='w-screen h-screen bg-white'>
      <div className='flex'>
        <Map countryListFound={countryFound} countryListToGuess={countryToGuess} isContent={mode !== modeQuiz.ALL}/>
        <Timer
          timeOut={timeOut}
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
        // disabled={!startTimer}
      />
      <CountryList
        countryListFound={countryFound}
        countryListToGuess={countryToGuess}
      />
      <CountryModalEndGame finalScore={finalScore} setFinalScore={setFinalScore}/>
    </div>
  )
}

export default Country