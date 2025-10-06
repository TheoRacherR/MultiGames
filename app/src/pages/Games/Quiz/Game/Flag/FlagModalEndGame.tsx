import { useNavigate } from 'react-router-dom';
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Modal,
} from 'semantic-ui-react'
import { finalScoreInterface } from '../../../../../@types/guiz';
import { useEffect } from 'react';
import { UserInfos } from '../../../../../@types/user';

const FlagModalEndGame = (
  { finalScore, setFinalScore, userInfos}: { finalScore: finalScoreInterface, setFinalScore: React.Dispatch<React.SetStateAction<finalScoreInterface>>, userInfos: UserInfos }
) => {
  const navigate = useNavigate();

  const replayTheGame = () => {
    setFinalScore({
      ...finalScore,
      end: false,
    })
  };
  const gotoMenu = () => {
    setFinalScore({
      ...finalScore,
      end: false,
    })
    navigate('/')
  }

  useEffect(() => {
    console.log(finalScore)
  }, [finalScore])

  return (
    <div>
      <Modal
        onOpen={() => setFinalScore({
          ...finalScore,
          end: true,
        })}
        open={finalScore.end}
      >
        {finalScore.listLeftToFind.length === 0 ? <ModalHeader>You won !</ModalHeader> : <ModalHeader>End of the game</ModalHeader>}
        <ModalContent>
          <ModalDescription>
            <p className='text-2xl'>
              You guested {finalScore.listFound.length}/{finalScore.listFound.length + finalScore.listLeftToFind.length} 
              {finalScore.finalTimer.seconds > 0 || finalScore.finalTimer.minutes > 0 ? ` in 
                ${(14 - finalScore.finalTimer.minutes) === 1 ? '1 minute and ' : (14 - finalScore.finalTimer.minutes) > 1 ? (14 - finalScore.finalTimer.minutes) +' minutes and ' : ''}
                ${(60 - finalScore.finalTimer.seconds) === 1 ? '1 second' : (60 - finalScore.finalTimer.seconds) > 1 ? (60 - finalScore.finalTimer.seconds) +' seconds' : ''}
              🎉` : ''}
            </p>
            {userInfos.id === '' ?
              <p>{ `You're not connected, you can login to save your score` }<Button style={{marginLeft: '10px'}} positive onClick={() => navigate('/auth')}>Login</Button></p>
            :
              <></>
            }
          </ModalDescription>
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

export default FlagModalEndGame