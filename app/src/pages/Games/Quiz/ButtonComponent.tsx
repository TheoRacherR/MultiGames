import { buttonComponentType } from "../../../@types/guiz";

const ButtonComponent = ({index, clickOn, text, type}: {index: string, clickOn: Function, text: string, type: buttonComponentType}) => {

  return (
    <div key={index}>
      <button onClick={() => clickOn()} className={`btn btn-${type}`}>{text}</button>
    </div>
  )
}

export default ButtonComponent


