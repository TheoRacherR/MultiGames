import ModalEndGame from "components/ModalEndGame";
import { UserInfos } from "../../../../@types/user";
import { getUserInfos } from "utils/Default/Auth";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "components/ButtonComponent";
import { AlertContextInterface, AlertTypeEnum, buttonComponentColor, buttonComponentSize, buttonComponentType } from "../../../../@types/default";
import { minesweeperDifficulty } from "../../../../@types/minesweeper";
import { AlertContext } from "utils/Context/AlertContext";

const MinesweeperModalEndGame = ({
  finalScore,
  setFinalScore,
  resetParty,
}: {
  finalScore: { end: boolean, won: boolean; score: number };
  setFinalScore: Dispatch<SetStateAction<{ end: boolean, won: boolean; score: number }>>;
  resetParty: (diff: minesweeperDifficulty) => void,
}) => {
  const navigate = useNavigate();
  const { handleOpenAlert } = useContext(AlertContext) as AlertContextInterface;
  const [userInfos, setUserInfos] = useState<UserInfos | null>(null);

  const getLogInfos = async () => {
    try {
      const userInfos = await getUserInfos();
      setUserInfos(userInfos);
      return;
    } catch (e) {
      console.log(e);
      handleOpenAlert(AlertTypeEnum.ERROR, `Error when loading data`);
    }
  };

  useEffect(() => {
    getLogInfos();
  }, []);

  const replayTheGame = () => {
    closeModal();
    resetParty(minesweeperDifficulty.EASY);
  };
  const gotoMenu = () => {
    closeModal();
    navigate("/");
  };

  const closeModal = () => {
    setFinalScore({
      ...finalScore,
      end: false,
    });
  }

  return (
    <div>
      <ModalEndGame
        title={finalScore?.won ? "You won !" : "You loose..."}
        content={
          <>
            {finalScore?.won ? (
              <>
                <p>{`Here's your final score: ${finalScore.score} points`}</p>
                {userInfos ? (
                  <p>{`You're logged as ${userInfos.pseudo}, your score has been saved`}</p>
                ) : (
                  <>
                    <p>{`You're not connected, you can login to save your score`}</p>
                    <ButtonComponent
                      text="Login"
                      color={buttonComponentColor.SUCCESS}
                      type={buttonComponentType.INLINE}
                      size={buttonComponentSize.MEDIUM}
                      clickOn={() => navigate("/auth")}
                    />
                  </>
                )}
              </>
            ) : (
              <p>{`You can retry an another game`}</p>
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
        closeModal={closeModal}
      />
    </div>
  );
};

export default MinesweeperModalEndGame;
