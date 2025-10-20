import ButtonComponent from "../../../../../components/ButtonComponent";
import { buttonComponentType } from "../../../../../@types/guiz";
import { useNavigate } from "react-router-dom";

const Timer = ({
  timeOut,
  score,
  startTimer,
  clickStartTimer,
  clickStopTimer,
  seconds,
  minutes,
}: {
  timeOut: Function;
  score: { left: number; total: number };
  startTimer: boolean;
  clickStartTimer: () => void;
  clickStopTimer: () => void;
  seconds: number;
  minutes: number;
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex-1 p-8 flex flex-col gap-8">
      <div className="flex justify-between" style={{ fontSize: "xxx-large" }}>
        <div className="flex flex-col justify-center">
          <div>
            ✅ {score.total - score.left}/{score.total}
          </div>
        </div>
        <div>
          <div className="w-[238px] h-[238px] text-black text-center">
            <div className="w-[238px] h-[238px] bg-[#D9D9D9] rounded-full absolute flex flex-col justify-center font-extrabold">
              {minutes < 10 ? "0" + minutes : minutes}:
              {seconds < 10 ? "0" + seconds : seconds}
            </div>
            <div
              className={`w-[238px] h-[238px] bg-[#ffffff00] absolute flex ${
                startTimer ? "animate-spin-slow" : ""
              }`}
            >
              <div className="border-[20px] border-r-0 w-[119px] h-[238px] border-[#526baa] absolute rounded-l-full"></div>
              <div className="border-[20px] border-l-0 w-[119px] ml-[119px] h-[238px] border-[#953030] absolute rounded-r-full"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-around">
        {startTimer ? (
          <ButtonComponent
            index="button_quiz_timer_give_up"
            text="Give Up"
            clickOn={() => {
              clickStopTimer();
              timeOut();
            }}
            type={buttonComponentType.RED}
          />
        ) : (
          <ButtonComponent
            index="button_quiz_timer_start"
            text="Start"
            clickOn={() => clickStartTimer()}
            type={buttonComponentType.GREEN}
          />
        )}
        <ButtonComponent
          index="button_quiz_timer_report"
          text="Report"
          clickOn={() => navigate("")}
          type={buttonComponentType.ORANGE}
        />
      </div>
    </div>
  );
};

export default Timer;
