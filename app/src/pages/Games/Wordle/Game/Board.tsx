import { caseCurrentState, casesInterface, caseStyle } from '../../../../@types/wordle';


const Board = ({ word, cases }: { word: string, cases: casesInterface[] | undefined }) => {

  /*
  * 6 essais
  * entre 4 et 10 lettres
  * pas de tiret / apostrophe
  */

  return (
    <div
      className="flex flex-wrap gap-[8px] justify-center mx-auto w-fit"
      style={{
        // width: `calc(((2.75rem+1rem) * ${word.length})-1rem)`,
        width: `calc(((64px + 8px) * ${word.length}) - 8px)`
      }}
    >
      {cases ? cases.map((item, index) => (
        <div
          key={`line_${Math.trunc(index / word.length)}_case_${index % word.length}`}
          id={`line_${Math.trunc(index / word.length)}_case_${index % word.length}`}
          className= {`border border-[#E9E6FF]
            rounded-[10px] inline-grid place-items-center font-bold
            select-none backface-hidden transform-3d size-[64px] text-[22px]
            ${item.state === caseCurrentState.CORRECT ?
                caseStyle.RIGHT_PLACE
                : item.state === caseCurrentState.PARTIALLY_RIGHT ?
                  caseStyle.WRONG_PLACE
                    : item.state === caseCurrentState.WRONG ?
                      caseStyle.WRONG
                        : caseStyle.UNTOUCHED
            }
            `}
        >
          {item.letterPlaced}
        </div>
      )) : <></>}
    </div>
  );
};

export default Board;


// CASE CLASSNAME
// flex justify-center text-center items-center text-2xl w-11 aspect-square
//   ${item.selected ? 'border-[#73adff] border-4' : 'border-black	border-2'} 
//   select-none rounded-md gap-4 box-border
//   ${item.state === caseCurrentState.CORRECT ?
//     'bg-green-600 text-white' 
//       : item.state === caseCurrentState.PARTIALLY_RIGHT ?
//         'bg-orange-600 text-white' 
//           : item.state === caseCurrentState.WRONG ?
//             'bg-gray-600 text-white'
//               : 'bg-white text-black'
//   }

// .tile {
//   width:64px;
//   height:64px;
//   border-radius:10px;
//   display:inline-grid;
//   place-items:center;
//   font-weight:700;
//   font-size:22px;
//   user-select:none;
//   -webkit-user-select:none;
//   backface-visibility:hidden;
//   transform-style:preserve-3d;
// }
// .tile.flip {
//   transform: rotateX(0);
//   animation: flip .55s ease forwards;
// }
// @keyframes flip {
//   0% { transform: rotateX(0); }
//   50% { transform: rotateX(90deg); background: #F3F2FF; }
//   100% { transform: rotateX(0); }
// }
// .keyboard button { min-width:44px; }