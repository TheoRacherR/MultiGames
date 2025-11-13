import ModalEndGame from 'components/ModalEndGame';
import { UserInfos } from '../../../../@types/user';
import { getUserInfos } from '../../../../utils/Default/Auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from 'components/ButtonComponent';
import { buttonComponentType } from '../../../../@types/default';

const MinesweeperModalEndGame = (
  { setOpen, finalScore, resetParty}: { setOpen: React.Dispatch<React.SetStateAction<boolean>>, finalScore: {won:boolean, score:number} | undefined, resetParty: Function}
) => {
  const navigate = useNavigate();
  const [userInfos, setUserInfos] = useState<UserInfos | null>(null);
  
    const getLogInfos = async () => {
      try {
        const userInfos = await getUserInfos();
        setUserInfos(userInfos);
        return;
      }
      catch (e) {
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
    navigate('/')
  }

  return (
    <div>
      <ModalEndGame
        title={finalScore?.won ? 'You won !' : 'You loose...'}
        content={
          <>
            {finalScore?.won ? 
                <>
                  <p>{`Here's your final score: ${finalScore.score} points`}</p>
                  {userInfos ? 
                    <p>{ `You're logged as ${userInfos.pseudo}, your score has been saved` }</p>
                  :
                    <>
                      <p>{ `You're not connected, you can login to save your score` }</p>
                      <ButtonComponent
                        index="login_button"
                        text="Login"
                        type={buttonComponentType.SUCCESS}
                        clickOn={() => navigate("/auth")}
                      />
                    </>
                  }
                </>
            :
              <p>{ `You can retry an another game` }</p>
            }
          </>
        }
        buttons={
          <>
            <ButtonComponent
              index="go_to_menu"
              text="Home"
              type={buttonComponentType.INFO}
              clickOn={() => gotoMenu()}
            />
            <ButtonComponent
              index="replay_button"
              text="Replay"
              type={buttonComponentType.WARNING}
              clickOn={() => replayTheGame()}
            />
          </>
        }
      />
    </div>
  )
}

export default MinesweeperModalEndGame