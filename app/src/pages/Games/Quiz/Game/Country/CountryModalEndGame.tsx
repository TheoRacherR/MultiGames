import { useNavigate } from 'react-router-dom';
import { finalScoreInterface } from '../../../../../@types/quiz';
import ModalEndGame from 'components/ModalEndGame';
import ButtonComponent from 'components/ButtonComponent';
import { UserInfos } from '../../../../../@types/user';
import { buttonComponentType } from '../../../../../@types/default';

const CountryModalEndGame = (
  {
    finalScore,
    setFinalScore,
    resetPage,
    userInfos
  }: {
    finalScore: finalScoreInterface,
    setFinalScore: React.Dispatch<React.SetStateAction<finalScoreInterface>>,
    resetPage: Function,
    userInfos: UserInfos;
  }
) => {
  const navigate = useNavigate();

  const gotoMenu = () => {
    setFinalScore({
      end: false,
      finalTimer: {
        seconds: finalScore.finalTimer.seconds,
        minutes: finalScore.finalTimer.minutes
      },
      listFound: finalScore.listFound,
      listLeftToFind: finalScore.listLeftToFind
    })
    navigate('/')
  }

  return (
    <div>
      <ModalEndGame
        title={finalScore.listLeftToFind.length === 0 ? "You won !" : "End of the game"}
        content={
          <>
            <p className='text-2xl'>
              You guested {finalScore.listFound.length}/{finalScore.listFound.length + finalScore.listLeftToFind.length} 
              {finalScore.finalTimer.seconds > 0 || finalScore.finalTimer.minutes > 0 ? ` in 
                ${finalScore.finalTimer.minutes === 1 ? '1 minute and ' : finalScore.finalTimer.minutes > 1 ? finalScore.finalTimer.minutes +' minutes and ' : ''}
                ${finalScore.finalTimer.seconds === 1 ? '1 second' : finalScore.finalTimer.seconds > 1 ? finalScore.finalTimer.seconds +' seconds' : ''}
              🎉` : ''}
            </p>
            {userInfos.id === "" ? (
              <p>
                {`You're not connected, you can login to save your score`}
                <ButtonComponent
                  index="login_button"
                  text="Login"
                  type={buttonComponentType.SUCCESS}
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
              index="go_to_menu"
              text="Home"
              type={buttonComponentType.PRIMARY}
              clickOn={() => gotoMenu()}
            />
            <ButtonComponent
              index="replay_button"
              text="Replay"
              type={buttonComponentType.WARNING}
              clickOn={() => resetPage()}
            />
          </>
        }
      />
    </div>
  )
}

export default CountryModalEndGame