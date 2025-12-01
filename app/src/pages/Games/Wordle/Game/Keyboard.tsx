import { caseStyle, keyInterface, keyState, keyType, WordleContextInterface } from "../../../../@types/wordle";
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
          return caseStyle.RIGHT_PLACE
        
        case keyState.WRONG_PLACE:
          return caseStyle.WRONG_PLACE
        
        case keyState.WRONG:
          return caseStyle.WRONG
          
        case keyState.UNTOUCHED:
          return caseStyle.UNTOUCHED
          
        default:
          return caseStyle.UNTOUCHED
      }
    }
  }
  const { keyPressed, keyList } = useContext(WordleContext) as WordleContextInterface;
  return (
    <div className="w-3/4 bottom-0 p-5 mx-auto bg-white">
      <div className='grid gap-2 mt-4'>
        {keyList.map((item, index) => (
          <div className="flex justify-center gap-2" key={`key_row_${index}`}>
            {item.map((it) => (
              <div 
                key={`key_${it.key}`} 
                // className={`border-2 py-2 px-4 border-black text-center items-center rounded-md text-xl cursor-pointer ${keyBackgroundColor(it)}`}
                className={
                  it.type === keyType.ENTER ?
                  `inline-block px-4 py-2 rounded-md font-semibold bg-[#6C4EF6] text-[#FFFFFF]`
                  : `key-btn inline-block px-3 py-2 rounded-md font-semibold ${keyBackgroundColor(it)} border border-[#D9D4F8]`
                }
                
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