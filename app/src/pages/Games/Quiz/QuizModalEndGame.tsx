import { useNavigate } from "react-router-dom";
import { finalScoreInterface } from "../../../@types/quiz";
import ModalEndGame from "components/ModalEndGame";
import ButtonComponent from "components/ButtonComponent";
import { UserInfos } from "../../../@types/user";
import {
  buttonComponentColor,
  buttonComponentSize,
  buttonComponentType,
} from "../../../@types/default";

const QuizModalEndGame = ({
  finalScore,
  setFinalScore,
  resetPage,
  userInfos,
}: {
  finalScore: finalScoreInterface;
  setFinalScore: React.Dispatch<React.SetStateAction<finalScoreInterface>>;
  resetPage: Function;
  userInfos: UserInfos;
}) => {
  const navigate = useNavigate();

  const gotoMenu = () => {
    setFinalScore({
      ...finalScore,
      end: false,
    });
    navigate("/");
  };

  return (
    <div>
      <ModalEndGame
        title={"End of the game"}
        content={
          <>
            <p className="text-2xl">
              You guested {finalScore.listFound.length}/
              {finalScore.listFound.length + finalScore.listLeftToFind.length}
              {finalScore.finalTimer.seconds > 0 ||
              finalScore.finalTimer.minutes > 0
                ? ` in 
                ${
                  finalScore.finalTimer.minutes === 1
                    ? "1 minute and "
                    : finalScore.finalTimer.minutes > 1
                    ? finalScore.finalTimer.minutes + " minutes and "
                    : ""
                }
                ${
                  finalScore.finalTimer.seconds === 1
                    ? "1 second"
                    : finalScore.finalTimer.seconds > 1
                    ? finalScore.finalTimer.seconds + " seconds"
                    : ""
                }
              🎉`
                : ""}
            </p>
            {userInfos.id === "" ? (
              <p>
                {`You're not connected, you can login to save your score`}
                <ButtonComponent
                  text="Login"
                  color={buttonComponentColor.SUCCESS}
                  type={buttonComponentType.INLINE}
                  size={buttonComponentSize.MEDIUM}
                  clickOn={() => navigate("/auth")}
                  clName="ml-4"
                />
              </p>
            ) : (
              <></>
            )}
          </>
        }
        buttons={
          <>
            <ButtonComponent
              text="Home"
              color={buttonComponentColor.PRIMARY}
              type={buttonComponentType.INLINE}
              size={buttonComponentSize.MEDIUM}
              clickOn={() => gotoMenu()}
            />
            <ButtonComponent
              text="Replay"
              color={buttonComponentColor.WARNING}
              type={buttonComponentType.INLINE}
              size={buttonComponentSize.MEDIUM}
              clickOn={() => resetPage()}
            />
          </>
        }
      />
    </div>
  );
};

export default QuizModalEndGame;
