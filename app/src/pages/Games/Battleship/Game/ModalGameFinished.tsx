import { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ModalHeader,
  ModalActions,
  Button,
  Modal,
} from 'semantic-ui-react'

const ModalGameFinished = ({ open, setOpen, won }: { open:boolean, setOpen: Dispatch<SetStateAction<boolean>>, won: boolean }) => {
  const navigate = useNavigate();


  return (
    <Modal
      onOpen={() => setOpen(true)}
      open={open}
      dimmer='blurring'
    >
      <ModalHeader>Game finished, {won ? 'You won ! 🎉🎉🎉' : 'Your opponent won...'}</ModalHeader>
      <ModalActions>
        <Button color='orange' onClick={() => {
          return navigate('/battleship')
        }}>
          Go back to the homepage
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default ModalGameFinished