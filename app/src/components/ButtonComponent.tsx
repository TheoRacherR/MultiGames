import { buttonComponentColor, buttonComponentSize, buttonComponentType } from "../@types/default";

const ButtonComponent = ({
  clickOn,
  text,
  color,
  type,
  size,
  clName,
}: {
  clickOn: Function;
  text: string;
  color: buttonComponentColor;
  type: buttonComponentType;
  size: buttonComponentSize;
  clName?: string;
}) => {
  return (
    <div>
      <button
        onClick={() => clickOn()}
        className={`btn-${type} btn-${size} btn-${color} ${clName}`}
      >
        {text}
      </button>
    </div>
  );
};

export default ButtonComponent;
