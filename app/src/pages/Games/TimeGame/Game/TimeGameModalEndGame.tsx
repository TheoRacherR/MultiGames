import { useNavigate } from "react-router-dom";
import { finalScoreInterface } from "../../../../@types/timegame";
import ModalEndGame from "components/ModalEndGame";
import ButtonComponent from "components/ButtonComponent";
import { UserInfos } from "../../../../@types/user";
import {
  buttonComponentColor,
  buttonComponentSize,
  buttonComponentType,
} from "../../../../@types/default";

const TimeGameModalEndGame = ({
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
      modalOpenned: false,
    });
    navigate("/");
  };

  const closeModal = () => {
    setFinalScore({
      ...finalScore,
      modalOpenned: false,
    });
  }

  return (
    <div>
      <ModalEndGame
        title={"End of the game"}
        content={
          <>
            <p className="text-2xl">
              You guested {finalScore.listFound}
              {finalScore.finalTimer > 0
                ? ` in 
                ${
                  Math.trunc(finalScore.finalTimer / 60) === 1
                    ? "1 minute and "
                    : Math.trunc(finalScore.finalTimer / 60) > 1
                    ? Math.trunc(finalScore.finalTimer / 60) + " minutes and "
                    : ""
                }
                ${
                  (finalScore.finalTimer % 60) === 1
                    ? "1 second"
                    : (finalScore.finalTimer % 60) > 1
                    ? (finalScore.finalTimer % 60) + " seconds"
                    : "0"
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
        closeModal={closeModal}
      />
    </div>
  );
};

export default TimeGameModalEndGame;
