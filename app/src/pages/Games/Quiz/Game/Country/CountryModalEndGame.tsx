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

const CountryModalEndGame = (
  { finalScore, setFinalScore}: { finalScore: finalScoreInterface, setFinalScore: React.Dispatch<React.SetStateAction<finalScoreInterface>> }
) => {
  const navigate = useNavigate();

  const replayTheGame = () => {
    setFinalScore({
      end: false,
      finalTimer: {
        seconds: finalScore.finalTimer.seconds,
        minutes: finalScore.finalTimer.minutes
      },
      listFound: finalScore.listFound,
      listLeftToFind: finalScore.listLeftToFind
    })
  };
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

  useEffect(() => {
    console.log(finalScore)
  }, [finalScore])

  return (
    <div>
      <Modal
        onOpen={() => setFinalScore({
          end: true,
          finalTimer: {
            seconds: finalScore.finalTimer.seconds,
            minutes: finalScore.finalTimer.minutes
          },
          listFound: finalScore.listFound,
          listLeftToFind: finalScore.listLeftToFind
        })}
        open={finalScore.end}
      >
        {finalScore.listLeftToFind.length === 0 ? <ModalHeader>You won !</ModalHeader> : <ModalHeader>End of the game</ModalHeader>}
        <ModalContent>
          <ModalDescription>
            <p className='text-2xl'>
              You guested {finalScore.listFound.length}/{finalScore.listFound.length + finalScore.listLeftToFind.length} 
              {finalScore.finalTimer.seconds > 0 || finalScore.finalTimer.minutes > 0 ? ` in 
                ${finalScore.finalTimer.minutes === 1 ? '1 minute and ' : finalScore.finalTimer.minutes > 1 ? finalScore.finalTimer.minutes +' minutes and ' : ''}
                ${finalScore.finalTimer.seconds === 1 ? '1 second' : finalScore.finalTimer.seconds > 1 ? finalScore.finalTimer.seconds +' seconds' : ''}
              🎉` : ''}
            </p>
            <p>{ `You're not connected, you can login to save your score` }<Button style={{marginLeft: '10px'}} positive onClick={() => navigate('/auth')}>Login</Button></p> {/* //TODO if logged */}
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

export default CountryModalEndGame