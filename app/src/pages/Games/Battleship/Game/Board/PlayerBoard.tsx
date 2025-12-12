import { Fragment, useContext } from 'react';
import Board from './Board';
import { BattleshipContextInterface, gameStateEnum, orientationCase, shipCase } from '../../../../../@types/battleship'
import { styleCase } from 'assets/Battleship/Board';
import LineAtoJ from './LineAtoJ';
import { checkIfCaseIsSameOrientation, checkIfCaseNextToIsShip, findStyleOfCasePlayer, placeCaseShip } from 'utils/Battleship/BattleshipFunc';
import { BattleshipContext } from 'utils/Context/BattleshipContext';
const PlayerBoard = () => {
  const { playerCases, setPlayerCases, gameState, setGameState, shipPlacementPhase, setShipPlacementPhase } = useContext(
    BattleshipContext
  ) as BattleshipContextInterface;
  // const [caseOver, setCaseOver] = useState<shipCase | null>(null);

  // const [caseShipSelected, setCaseShipSelected] = useState<number>(0);
  // const [caseOnBoardDropped, setCaseOnBoardDropped] = useState<number>(0);

  // const [boardValidated, setBoardValidated] = useState<boolean>(false);

  // const [opponentReady, setOpponentReady] = useState<boolean>(false);

  const handleClickOnACase = (caseOver: shipCase) => {
  //   if (!caseOver.bombed) {
  //     const result = attackACase(caseOver, playerCases);
  //     setPlayerCases(prev => ({...prev, playerCases: result}))
  //   }
  if(gameState === gameStateEnum.ON_GAME) {

  }
  else if(gameState === gameStateEnum.SHIP_PLACEMENT) {
    let caseTemp = [...playerCases.board];
    let shipPlacementTemp = [...shipPlacementPhase];
    if(caseOver.hasShip) return;
    if(shipPlacementTemp.length === 0) return; //TODO Alerte
    if(shipPlacementTemp[0].shipNumber === 0 && caseOver) {
    }
    const result = checkIfCaseNextToIsShip(caseOver, shipPlacementTemp[0].ship.id, playerCases.board);
    if(!result.isNextTo && shipPlacementTemp[0].shipNumber > 0) return;
    if(shipPlacementTemp[0].shipNumber === 0 && caseOver) {
      caseTemp = placeCaseShip(caseTemp, caseOver.id, shipPlacementTemp[0].ship, shipPlacementTemp[0].shipNumber, orientationCase.UNSET);
      shipPlacementTemp.shift();
    }
    if(shipPlacementTemp[0].shipNumber === 1 && caseOver) {
      if(result && result.caseShip && result.caseShip.shipCaseId === 0){
        caseTemp = placeCaseShip(caseTemp, caseOver.id, shipPlacementTemp[0].ship, shipPlacementTemp[0].shipNumber, result.orientation);
        caseTemp[result.caseShip.id] = {
          ...caseTemp[result.caseShip.id],
          orientation: result.orientation,
        }
        shipPlacementTemp.shift();
      }
    }
    else if(shipPlacementTemp[0].shipNumber > 1 && caseOver) {
      if(result && result.caseShip && result.caseShip.shipCaseId === shipPlacementTemp[0].shipNumber-1){
        if(checkIfCaseIsSameOrientation(caseOver, result.caseShip, caseTemp)){
          caseTemp = placeCaseShip(caseTemp, caseOver.id, shipPlacementTemp[0].ship, shipPlacementTemp[0].shipNumber, result.orientation);
          shipPlacementTemp.shift();
        }
      }
    }
    setShipPlacementPhase(shipPlacementTemp);
    setPlayerCases(prev => ({...prev, board: caseTemp}));

    if(shipPlacementTemp.length === 0){
      setGameState(gameStateEnum.SHIP_OK);
    }
    // (more, highlight case that can be placed)
}
  };


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
        {playerCases.board.map((item, index) => (
          <Fragment key={`case_player_${index}`}>
            <LineAtoJ index={index}/>
            <div
              id={item.id.toString()}
              style={{...styleCase, backgroundColor: item.ship ? `var(${item.ship.color})` : ''}}
              className={`relative`}
              key={index}
              // onMouseOver={() => setCaseOver(item)}
              // onMouseLeave={() => setCaseOver(null)}
              onClick={() => gameState === gameStateEnum.SHIP_PLACEMENT ? handleClickOnACase(item) : {}}
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
