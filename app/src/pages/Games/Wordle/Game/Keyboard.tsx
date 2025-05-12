const keyList = [['a','z','e','r','t','y','u','i','o','p'],['q','s','d','f','g','h','j','k','l','m'],['w','x','c','v','b','n']];

const Keyboard = ({handleKeyDown}: {handleKeyDown: Function}) => {
  return (
    <div className="w-3/4 fixed bottom-0 p-5 mx-auto">
      <div className='mx-auto flex flex-col gap-2'>
        {keyList.map((item) => (
          <div className="flex gap-2 mx-auto">
            {item.map((key) => (
              <div 
                key={`key_${key}`} 
                className='w-11 aspect-square border-2 border-black text-center items-center rounded-md text-xl cursor-pointer'
                onClick={() => handleKeyDown(key)}
              >{key}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Keyboard