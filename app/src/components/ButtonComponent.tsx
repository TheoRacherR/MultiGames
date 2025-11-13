import { buttonComponentType } from "../@types/default";

const ButtonComponent = ({
  index,
  clickOn,
  text,
  type,
  clName
}: {
  index: string;
  clickOn: Function;
  text: string;
  type: buttonComponentType;
  clName?: string;
}) => {
  return (
    <div key={index}>
      <button onClick={() => clickOn()} className={`btn-inline btn-medium btn-${type} ${clName}`}>
        {text}
      </button>
    </div>
  );
};

export default ButtonComponent;
