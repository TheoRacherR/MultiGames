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
  { open, setOpen, finalScore}: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, finalScore: {nbTry: number}}
) => {
  const navigate = useNavigate();

  const replayTheGame = () => {
    setOpen(false);
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
        <ModalHeader>You won !</ModalHeader>
        <ModalContent>
          <ModalDescription>
            <p>{`You guested it in ${finalScore.nbTry} try`}</p>
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

export default ModalEndGame