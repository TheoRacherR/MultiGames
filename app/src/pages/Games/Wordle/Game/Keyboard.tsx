import { keyInterface, keyState, WordleContextInterface } from "../../../../@types/wordle";
import { useContext } from "react";
import { WordleContext } from "utils/Context/WordleContext";

// const  keyList = [['a','z','e','r','t','y','u','i','o','p'],['q','s','d','f','g','h','j','k','l','m'],['w','x','c','v','b','n']];


const Keyboard = ({handleKeyDown}: {handleKeyDown: Function}) => {
  const keyBackgroundColor = (key: keyInterface): string => {
    if(keyPressed.toUpperCase() === key.key.toUpperCase()) {
      return 'bg-[grey]'
    }
    else {
      switch (key.state) {
        case keyState.RIGHT_PLACE:
          return 'bg-green-600 text-white'
        
        case keyState.WRONG_PLACE:
          return 'bg-orange-600 text-white'
        
        case keyState.WRONG:
          return 'bg-gray-600 text-white'
          
        case keyState.UNTOUCHED:
          return 'bg-white text-black'
          
        default:
          return 'bg-white text-black'
      }
    }
  }
  const { keyPressed, keyList } = useContext(WordleContext) as WordleContextInterface;
  return (
    <div className="w-3/4 fixed bottom-0 p-5 mx-auto">
      <div className='mx-auto flex flex-col gap-2'>
        {keyList.map((item, index) => (
          <div className="flex gap-2 mx-auto" key={`key_row_${index}`}>
            {item.map((it) => (
              <div 
                key={`key_${it.key}`} 
                className={`border-2 py-2 px-4 border-black text-center items-center rounded-md text-xl cursor-pointer ${keyBackgroundColor(it)}`}
                onClick={() => handleKeyDown(it.key)}
              >{it.key}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Keyboard