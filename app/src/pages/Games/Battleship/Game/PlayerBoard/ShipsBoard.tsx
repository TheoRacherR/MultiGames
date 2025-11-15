import { orientationCase, ship, shipCase } from '../../../../../@types/battleship';

const ShipsBoard = ({
  listOfShips,
  cases,
  setCases,
  setShipSelected,
  setCaseShipSelected,
  setListOfShips,
  caseOnBoardDropped,
}: {
  listOfShips: ship[];
  cases: shipCase[];
  setCases: React.Dispatch<React.SetStateAction<shipCase[]>>;
  setShipSelected: React.Dispatch<React.SetStateAction<ship>>;
  setCaseShipSelected: React.Dispatch<React.SetStateAction<number>>;
  setListOfShips: React.Dispatch<React.SetStateAction<ship[]>>;
  caseOnBoardDropped: number;
}) => {

  const dropShipBack = () => {
    // console.log(e.target)
    if (cases[caseOnBoardDropped].ship) {
      const listOfShipsTemp = [...listOfShips];
      listOfShipsTemp.push(cases[caseOnBoardDropped].ship as ship);
      setListOfShips(listOfShipsTemp);

      let casesFiltered: shipCase[] = cases.filter((c) => c.ship === cases[caseOnBoardDropped].ship);
      let casesTemp: shipCase[] = [...cases];
      for (let index = 0; index < casesFiltered.length; index++) {
        const element = casesFiltered[index];
        casesTemp[element.id] = {
          id: casesTemp[element.id].id,
          hasShip: false,
          ship: null,
          shipCaseId: -1,
          orientation: orientationCase.UNSET,
          bombed: false
        }
      }
      setCases(casesTemp);
      
    }
  };

  return (
    <div
      className="w-full h-full p-5 overflow-y-auto flex flex-wrap"
      onDragEnter={(e) => e.preventDefault()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={dropShipBack}
    >
      {listOfShips.map((item: ship, index: number) => (
        <div
          key={index}
          className="w-1/2 border border-solid border-black"
          draggable
          style={{
            height: `calc(${10 * item.length}%)`,
            backgroundColor: `${item.color}`,
          }}
          onDragStart={(e) => {
            setShipSelected(item);
            const target: any = e.target;
            const rect = target.getBoundingClientRect();
            const y = e.clientY - rect.top;
            for (let i = 0; i < item.length; i++) {
              const caseLength = rect.height / item.length;
              if (y >= caseLength * i && y < caseLength * (i + 1)) 
                setCaseShipSelected(i);
            }
          }}
        >
        </div>
      ))}
    </div>
  );
};

export default ShipsBoard;
