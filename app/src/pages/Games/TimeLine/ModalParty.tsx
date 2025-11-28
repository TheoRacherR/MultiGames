import { TextField } from "@mui/material";
import {
  buttonComponentColor,
  buttonComponentSize,
  buttonComponentType,
} from "../../../@types/default";
import ButtonComponent from "components/ButtonComponent";
import ModalEndGame from "components/ModalEndGame";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { timelineButtonType } from "../../../@types/timeline";

const ModalParty = ({
  setOpen,
  selected,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selected: timelineButtonType;
}) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");

  const handleSubmit = () => {
    if (selected === timelineButtonType.CREATE) {
      if (password.length > 0) {
        // axios post room
        const roomID = 1;
        return navigate(`room/${roomID}`);
      }
    } else {
      if (password.length > 0 || roomId.length > 0) {
        // socket io to join a room
        // password
      }
    }
    // return naviagte
    closeModal();
  };

  const closeModal = () => {
    setOpen(false);
    setPassword("");
    setRoomId("");
  };

  return (
    <ModalEndGame
      title={
        selected === timelineButtonType.CREATE
          ? "Create a party"
          : "Join a party"
      }
      content={
        <>
          {selected === timelineButtonType.CREATE ? (
            <>
              <TextField
                id="key"
                variant="outlined"
                label="Set a password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          ) : (
            <>
              <TextField
                id="room_id"
                variant="outlined"
                label="Room id"
                className="mr-3"
                type="number"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
              <TextField
                id="password"
                variant="outlined"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          )}
        </>
      }
      buttons={
        <>
          <ButtonComponent
            text="Cancel"
            color={buttonComponentColor.ERROR}
            type={buttonComponentType.INLINE}
            size={buttonComponentSize.MEDIUM}
            clickOn={() => closeModal()}
          />
          <ButtonComponent
            text="Submit"
            color={buttonComponentColor.INFO}
            type={buttonComponentType.INLINE}
            size={buttonComponentSize.MEDIUM}
            clickOn={() => handleSubmit()}
          />
        </>
      }
      closeModal={closeModal}
    />
  );
};

export default ModalParty;
