import { useNavigate } from "react-router-dom";
import { finalScoreInterface } from "../../../../../@types/quiz";
import { buttonComponentColor, buttonComponentSize, buttonComponentType } from "../../../../../@types/default";
import { useEffect } from "react";
import { UserInfos } from "../../../../../@types/user";
import ModalEndGame from "components/ModalEndGame";
import ButtonComponent from "components/ButtonComponent";

const FlagModalEndGame = ({
  finalScore,
  setFinalScore,
  userInfos,
}: {
  finalScore: finalScoreInterface;
  setFinalScore: React.Dispatch<React.SetStateAction<finalScoreInterface>>;
  userInfos: UserInfos;
}) => {
  const navigate = useNavigate();

  const replayTheGame = () => {
    setFinalScore({
      ...finalScore,
      end: false,
    });
  };
  const gotoMenu = () => {
    setFinalScore({
      ...finalScore,
      end: false,
    });
    navigate("/");
  };

  useEffect(() => {
    console.log(finalScore);
  }, [finalScore]);

  return (
    <div>
      <ModalEndGame
        title={
          finalScore.listLeftToFind.length === 0
            ? "You won !"
            : "End of the game"
        }
        content={
          <>
            <p className="text-2xl">
              You guested {finalScore.listFound.length}/
              {finalScore.listFound.length + finalScore.listLeftToFind.length}
              {finalScore.finalTimer.seconds > 0 ||
              finalScore.finalTimer.minutes > 0
                ? ` in 
                ${
                  14 - finalScore.finalTimer.minutes === 1
                    ? "1 minute and "
                    : 14 - finalScore.finalTimer.minutes > 1
                    ? 14 - finalScore.finalTimer.minutes + " minutes and "
                    : ""
                }
                ${
                  60 - finalScore.finalTimer.seconds === 1
                    ? "1 second"
                    : 60 - finalScore.finalTimer.seconds > 1
                    ? 60 - finalScore.finalTimer.seconds + " seconds"
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
              color={buttonComponentColor.INFO}
              type={buttonComponentType.INLINE}
              size={buttonComponentSize.MEDIUM}
              clickOn={() => gotoMenu()}
            />
            <ButtonComponent
              text="Replay"
              color={buttonComponentColor.WARNING}
              type={buttonComponentType.INLINE}
              size={buttonComponentSize.MEDIUM}
              clickOn={() => replayTheGame()}
            />
          </>
        }
      />
    </div>
  );
};

export default FlagModalEndGame;
