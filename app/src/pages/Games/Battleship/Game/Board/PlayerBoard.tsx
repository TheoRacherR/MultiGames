import { Dispatch, Fragment, useState } from 'react';
import Board from './Board';
import { orientationCase, shipCase } from '../../../../../@types/battleship'
import { styleCase } from 'assets/Battleship/Board';
import LineAtoJ from './LineAtoJ';
import { findStyleOfCasePlayer } from 'utils/Battleship/PlayerFunc';
const PlayerBoard = ({ cases, setCases }: { cases: shipCase[], setCases: Dispatch<React.SetStateAction<shipCase[]>> }) => {
    const [caseOver, setCaseOver] = useState<shipCase | null>(null);

  // const [caseShipSelected, setCaseShipSelected] = useState<number>(0);
  // const [caseOnBoardDropped, setCaseOnBoardDropped] = useState<number>(0);

  // const [boardValidated, setBoardValidated] = useState<boolean>(false);

  // const [opponentReady, setOpponentReady] = useState<boolean>(false);


  const attackACase = () => {
    const caseAttacked = caseOver;
    // if (playersTurn && caseAttacked) {
    if (caseAttacked) {
      console.log('click')
      if (!caseAttacked.bombed) {
        // TODO vérifier si le bateau est completment supprimé
        let casesTemp = [...cases];
        casesTemp[caseAttacked.id] = {
          ...caseAttacked,
          bombed: true,
        };
        if(checkIfShipIsDestroyed(casesTemp, caseAttacked) && caseAttacked.ship){
          const nextStep = caseAttacked.orientation === orientationCase.VERTICAL ? 10 : 1;
          const caseInitShip = caseAttacked.id - (caseAttacked.shipCaseId * (nextStep));
          for (let i = 0; i < caseAttacked.ship.length; i++) {
            casesTemp[(i*nextStep) + caseInitShip] = {
              ...casesTemp[(i*nextStep) + caseInitShip],
              destroyed: true,
            };
            // TODO update in global ship doc
          }
        }
        console.log(casesTemp)
        setCases(casesTemp);
        // setPlayersTurn(false);
      }
    }
  };

  const checkIfShipIsDestroyed = (cases: shipCase[], caseSelected: shipCase) => {
    if(caseSelected.ship){
      const nextStep = caseSelected.orientation === orientationCase.VERTICAL ? 10 : 1;
      const caseInitShip = caseSelected.id - (caseSelected.shipCaseId * (nextStep));
      for (let i = 0; i < caseSelected.ship.length; i++) {
        console.log(cases[(i*nextStep) + caseInitShip])
        if(cases[(i*nextStep) + caseInitShip].bombed) {
          continue;
        }
        else {
          return false;
        }
      }
      return true
    }
    return false;
  }

  /*
    - Ajouter un bateau sur le board :                                    OK
    - Pas possible de superposer deux bateau :                            OK
    - Quand un bateau est ajouté sur le board, il n'est plus à gauche :   OK
    - Possible d'enlever un bateau du board pour le remettre à gauche :   OK
    - Possibilité de faire une rotation de bateau :                       OK
    - Vérification de rotation :                                          OK
    - Possibilité de redéplacer le bateau sur le board après l'avoir posé OK
    - Quand on repositionne, faire attention à le remettre dans mm sens   OK
    - Validation du board :                                               OK
  */

  return (
    <Board playerBoard={true}>
      <>
        {cases.map((item, index) => (
          <Fragment key={`case_player_${index}`}>
            <LineAtoJ index={index}/>
            <div
              id={item.id.toString()}
              style={{...styleCase, backgroundColor: item.ship ? `var(${item.ship.color})` : ''}}
              className={`relative`}
              key={index}
              onMouseOver={() => setCaseOver(item)} //TODO temp
              onMouseLeave={() => setCaseOver(null)} //TODO temp
              onClick={() => attackACase()} //TODO temp
            >
              <div
                className={findStyleOfCasePlayer(item)}
              >
              </div>
            </div>
          </Fragment>
        ))}
      </>
    </Board>

  );
};

export default PlayerBoard;
