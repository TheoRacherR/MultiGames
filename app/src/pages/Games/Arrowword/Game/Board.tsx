import React, { useState } from 'react'

interface casesInterface {
  type: string;//caseTypes;
  flagPlaced: boolean;
  text: string;
  showed: boolean;
  placment: string; //casePosition | null;
  loosed: boolean;
}

const Board = ({
  length
}: {length: number}) => {
    const [cases, setCases] = useState<casesInterface[]>(Array(100).fill(""));
  
  return (
    <div className="w-full flex flex-wrap">
      {cases.map((item, index) => (
        <div 
          key={index}
          id={`case_${index}`}
          className= ' text-white flex justify-center align-center box-border	border border-black cursor-pointer select-none' 
          style={{
            width: `calc(100% /${length})`, aspectRatio: 1,
            backgroundColor: item.showed ? item.loosed ? 'red' : 'rgb(173 178 186)' : 'rgb(107 114 128)'
          }}
          // onClick={(e) => handleClickOnCase(index)}
          // onContextMenu={handleRightClick}
        >
          <div className='h-auto w-auto m-auto'>{item.text}</div>
        </div>
      ))}
    </div>
  )
}

export default Board