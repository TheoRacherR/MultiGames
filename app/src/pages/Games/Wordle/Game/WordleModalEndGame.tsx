import ModalEndGame from 'components/ModalEndGame';
import { UserInfos } from '../../../../@types/user';
import { getUserInfos } from '../../../../utils/Default/Auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from 'components/ButtonComponent';
import { buttonComponentType } from '../../../../@types/default';

const WordleModalEndGame = (
  { open, setOpen, finalScore}: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, finalScore: {nbTry: number}}
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

  const gotoMenu = () => {
    setOpen(false);
    navigate('/')
  }

  return (
    <div>
      <ModalEndGame
        title= {"You won !"}
        content={
          <>
            <p>{`You guested it in ${finalScore.nbTry} try`}</p>
            {userInfos ? 
              <p>{ `You're logged as ${userInfos.pseudo}, your score has been saved` }</p>
            :
              <p>{ `You're not connected, you can login to save your score` }<ButtonComponent
                  index="login_button"
                  text="Login"
                  type={buttonComponentType.SUCCESS}
                  clickOn={() => navigate("/auth")}
                /></p>
            }
          </>
        }
        buttons={
          <ButtonComponent
            index="home_button"
            text="Home"
            type={buttonComponentType.INFO}
            clickOn={() => gotoMenu()}
          />
        }
      />
    </div>
  )
}

export default WordleModalEndGame