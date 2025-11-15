import ModalEndGame from "components/ModalEndGame";
import { UserInfos } from "../../../../@types/user";
import { getUserInfos } from "../../../../utils/Default/Auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "components/ButtonComponent";
import { buttonComponentColor, buttonComponentSize, buttonComponentType } from "../../../../@types/default";

const MinesweeperModalEndGame = ({
  setOpen,
  finalScore,
  resetParty,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  finalScore: { won: boolean; score: number } | undefined;
  resetParty: Function;
}) => {
  const navigate = useNavigate();
  const [userInfos, setUserInfos] = useState<UserInfos | null>(null);

  const getLogInfos = async () => {
    try {
      const userInfos = await getUserInfos();
      setUserInfos(userInfos);
      return;
    } catch (e) {
      console.log(e);
      // TODO Alerte d'erreur de récupération des infos du user
    }
  };

  useEffect(() => {
    getLogInfos();
  }, []);

  const replayTheGame = () => {
    setOpen(false);
    resetParty();
  };
  const gotoMenu = () => {
    setOpen(false);
    navigate("/");
  };

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
      />
    </div>
  );
};

export default MinesweeperModalEndGame;
