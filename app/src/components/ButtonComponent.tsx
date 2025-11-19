import { buttonComponentColor, buttonComponentSize, buttonComponentType } from "../@types/default";

const ButtonComponent = ({
  clickOn,
  text,
  color,
  type,
  size,
  clName,
  disabled,
}: {
  clickOn: Function;
  text: JSX.Element | string;
  color: buttonComponentColor;
  type: buttonComponentType;
  size: buttonComponentSize;
  clName?: string;
  disabled?: boolean;
}) => {
  return (
    // <div>
      <button
        onClick={() => clickOn()}
        className={`btn-${type} btn-${size} btn-${disabled ? 'disabled' : color} ${clName}`}
        disabled={disabled}
      >
        {text}
      </button>
    // </div>
  );
};

export default ButtonComponent;
