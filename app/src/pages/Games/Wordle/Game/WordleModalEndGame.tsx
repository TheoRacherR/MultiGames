import ModalEndGame from "components/ModalEndGame";
import { UserInfos } from "../../../../@types/user";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "components/ButtonComponent";
import { buttonComponentColor, buttonComponentSize, buttonComponentType } from "../../../../@types/default";
import { finalScoreInterface } from "../../../../@types/wordle";

const WordleModalEndGame = ({
  finalScore,
  setFinalScore,
  userInfos,
}: {
  finalScore: finalScoreInterface;
    setFinalScore: React.Dispatch<React.SetStateAction<finalScoreInterface>>;
    userInfos: UserInfos;
}) => {
  const navigate = useNavigate();
  console.log(userInfos)

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
  };

  return (
    <div>
      <ModalEndGame
        title={finalScore.won ? "You won !" : "End of the game for today"}
        content={
          <>
            <p>{finalScore.won ? `You guested it in ${finalScore.nbTry} try` : `You used all of your tries, the word was "${finalScore.wordSearched}"`}</p>
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
              <p>{`You're logged as "${userInfos.pseudo}", your score has been saved`}</p>
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
          </>
        }
        closeModal={closeModal}
      />
    </div>
  );
};

export default WordleModalEndGame;
