import ModalEndGame from "components/ModalEndGame";
import { UserInfos } from "../../../../@types/user";
import { getUserInfos } from "../../../../utils/Default/Auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "components/ButtonComponent";
import { buttonComponentColor, buttonComponentSize, buttonComponentType } from "../../../../@types/default";

const WordleModalEndGame = ({
  open,
  setOpen,
  finalScore,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  finalScore: { nbTry: number };
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

  const gotoMenu = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <div>
      <ModalEndGame
        title={"You won !"}
        content={
          <>
            <p>{`You guested it in ${finalScore.nbTry} try`}</p>
            {userInfos ? (
              <p>{`You're logged as ${userInfos.pseudo}, your score has been saved`}</p>
            ) : (
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
            )}
          </>
        }
        buttons={
          <ButtonComponent
            text="Home"
            color={buttonComponentColor.INFO}
            type={buttonComponentType.INLINE}
            size={buttonComponentSize.MEDIUM}
            clickOn={() => gotoMenu()}
          />
        }
      />
    </div>
  );
};

export default WordleModalEndGame;
