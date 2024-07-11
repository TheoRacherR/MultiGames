import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Modal,
  Input
} from 'semantic-ui-react'

const ModalParty = ({ open, setOpen, selected }: { open:boolean, setOpen:React.Dispatch<React.SetStateAction<boolean>>, selected:string }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');

  const handleSubmit = () => {
    if(selected === 'create') {
      if(password.length > 0){
        // axios post room
        const roomID = 1;
        return navigate(`room/${roomID}`)
      }
    }
    else {
      if(password.length > 0 || roomId.length > 0) {
        // socket io to join a room
        // password
      }
    }
    // return naviagte
    closeModal();
  }

  const closeModal = () => {
    setOpen(false);
    setPassword('')
    setRoomId('')
  }

  return (
    <Modal
      onClose={() => closeModal()}
      onOpen={() => setOpen(true)}
      open={open}
      dimmer='blurring'
    >
      <ModalHeader>{selected === 'create' ? 'Create a party' : 'Join a party'}</ModalHeader>
      <ModalContent className='justify-around flex'>
        {
          selected === 'create' ?
            <>
              <Input
                icon='key'
                placeholder='Set a password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          :
            <>
              <Input 
                placeholder='Room id'
                className='mr-3'
                type='number'
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
              <Input 
                icon='key'
                placeholder='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>

        }
      </ModalContent>
      <ModalActions>
        <Button color='red' onClick={closeModal}>
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition='right'
          icon='checkmark'
          onClick={handleSubmit}
          positive
        />
      </ModalActions>
    </Modal>
  )
}

export default ModalParty