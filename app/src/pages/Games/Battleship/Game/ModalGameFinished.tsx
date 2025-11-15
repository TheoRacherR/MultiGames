import { buttonComponentColor, buttonComponentSize, buttonComponentType } from "../../../../@types/default";
import ButtonComponent from "components/ButtonComponent";
import ModalEndGame from "components/ModalEndGame";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

const ModalGameFinished = ({
  open,
  setOpen,
  won,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  won: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <ModalEndGame
      title={won ? "You won ! 🎉🎉🎉" : "Your opponent won..."}
      content={<></>}
      buttons={
        <>
          <ButtonComponent
            text="Go back to the homepage"
            color={buttonComponentColor.WARNING}
            type={buttonComponentType.INLINE}
            size={buttonComponentSize.MEDIUM}
            clickOn={() => {
              return navigate("/battleship");
            }}
          />
        </>
      }
    />
  );
};

export default ModalGameFinished;
