import { caseCurrentState, casesInterface } from '../../../../@types/wordle';

export const getWordFromGrid = (grid: casesInterface[], caseSelected: casesInterface, wordSearched: string): string => {
  let stringWord = '';
  for (let index = 0; index < wordSearched.length; index++) {
    stringWord = grid[grid.indexOf(caseSelected) - index].letterPlaced + stringWord;
  }
  return stringWord;
}

// TODO check if the word exist

export const checkIfUniqueArray = (arr: any[]): boolean => {
  if(arr.length > 0){
    const initValue = arr[0];
    for (let index = 1; index < arr.length; index++) {
      if(arr[index] !== initValue) return false;
    }
  }
  return true;
}

const Board = ({ word, cases }: { word: string, cases: casesInterface[] | undefined }) => {

  /*
  * 6 essais
  * entre 4 et 10 lettres
  * pas de tiret / apostrophe
  */

  return (
    <div
      className="flex flex-wrap gap-[1rem] justify-center mx-auto"
      style={{
        // width: `calc(((2.75rem+1rem) * ${word.length})-1rem)`,
        width: `calc(
          (
            (3.75rem) * ${word.length}
          )
            - 1rem
        )`
      }}
    >
      {cases ? cases.map((item, index) => (
        <div
          key={`line_${Math.trunc(index / word.length)}_case_${index % word.length}`}
          id={`line_${Math.trunc(index / word.length)}_case_${index % word.length}`}
          className= {`
            flex justify-center text-center items-center text-2xl w-11 aspect-square
            ${item.selected ? 'border-[#73adff] border-4' : 'border-black	border-2'} 
            select-none rounded-md gap-4 box-border
            ${item.state === caseCurrentState.CORRECT ?
              'bg-green-600 text-white' 
                : item.state === caseCurrentState.PARTIALLY_RIGHT ?
                  'bg-orange-600 text-white' 
                    : item.state === caseCurrentState.WRONG ?
                      'bg-gray-600 text-white'
                        : 'bg-white text-black'
            }
          `}
          style={{
            width: `
              calc(
                (100% / ${word.length} ) - 1rem
              )
            `, aspectRatio: 1,
          }}
        >
          {item.letterPlaced}
        </div>
      )) : <></>}
    </div>
  );
};

export default Board;
