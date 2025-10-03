import { UserInfos } from '../../../../@types/user';
import { getUserInfos } from '../../../../utils/Default/Auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Modal,
} from 'semantic-ui-react'

const ModalEndGame = (
  { open, setOpen, finalScore, resetParty}: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, finalScore: {won:boolean, score:number} | undefined, resetParty: Function}
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
      <Modal
        onOpen={() => setOpen(true)}
        open={open}
      >
        <ModalHeader>{finalScore?.won ? 'You won !' : 'You loose...'}</ModalHeader>
        <ModalContent>
          {
            finalScore?.won ? 
              <ModalDescription>
                <p>{`Here's your final score: ${finalScore.score} points`}</p>
                {userInfos ? 
                  <p>{ `You're logged as ${userInfos.pseudo}, your score has been saved` }</p>
                :
                  <p>{ `You're not connected, you can login to save your score` }<Button style={{marginLeft: '10px'}} positive onClick={() => navigate('/auth')}>Login</Button></p>
                }
              </ModalDescription>
            :
              <ModalDescription>
                <p>{ `You can retry an another game` }</p>
              </ModalDescription>
          }
        </ModalContent>
        <ModalActions>
          <Button color='black' onClick={() => gotoMenu()}>
            Home
          </Button>
          <Button
            content='Replay'
            color='orange'
            labelPosition='left'
            icon='redo'
            onClick={() => replayTheGame()}
          />
        </ModalActions>
      </Modal>
    </div>
  )
}

export default ModalEndGame