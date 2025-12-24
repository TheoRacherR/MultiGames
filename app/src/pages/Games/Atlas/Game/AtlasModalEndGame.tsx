import { useNavigate } from "react-router-dom";
import { categoryLine, finalScoreInterface } from "../../../../@types/atlas";
import ModalEndGame from "components/ModalEndGame";
import ButtonComponent from "components/ButtonComponent";
import { UserInfos } from "../../../../@types/user";
import {
  buttonComponentColor,
  buttonComponentSize,
  buttonComponentType,
} from "../../../../@types/default";

const AtlasModalEndGame = ({
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
      open: false,
    });
    navigate("/");
  };

  const closeModal = () => {
    setFinalScore({
      ...finalScore,
      open: false,
    });
  };

  return (
    <div>
      <ModalEndGame
        title={"End of the game"}
        content={
          <>
            <p className="text-2xl">
              {`Total score ${finalScore.listEnd.reduce((a: number, b: categoryLine) => a + (b.rank > 99 ? 100 : b.rank), 0)}`}
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

export default AtlasModalEndGame;
