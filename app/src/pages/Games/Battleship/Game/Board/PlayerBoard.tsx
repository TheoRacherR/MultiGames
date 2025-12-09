import { Dispatch, Fragment, useState } from 'react';
import Board from './Board';
import { boardCases, shipCase } from '../../../../../@types/battleship'
import { styleCase } from 'assets/Battleship/Board';
import LineAtoJ from './LineAtoJ';
import { findStyleOfCasePlayer } from 'utils/Battleship/BattleshipFunc';
import { attackACase } from 'utils/Battleship/BattleshipFunc';
const PlayerBoard = ({ board, setBoard }: { board: boardCases, setBoard: Dispatch<React.SetStateAction<boardCases>> }) => {
    // const [caseOver, setCaseOver] = useState<shipCase | null>(null);

  // const [caseShipSelected, setCaseShipSelected] = useState<number>(0);
  // const [caseOnBoardDropped, setCaseOnBoardDropped] = useState<number>(0);

  // const [boardValidated, setBoardValidated] = useState<boolean>(false);

  // const [opponentReady, setOpponentReady] = useState<boolean>(false);

  console.log(board)

  const handleClickOnACase = (caseOver: shipCase) => {
    if (!caseOver.bombed) {
      const result = attackACase(caseOver, board);
      setBoard(prev => ({...prev, board: result}))
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
        {board.board.map((item, index) => (
          <Fragment key={`case_player_${index}`}>
            <LineAtoJ index={index}/>
            <div
              id={item.id.toString()}
              style={{...styleCase, backgroundColor: item.ship ? `var(${item.ship.color})` : ''}}
              className={`relative`}
              key={index}
              // onMouseOver={() => setCaseOver(item)}
              // onMouseLeave={() => setCaseOver(null)}
              onClick={() => handleClickOnACase(item)}
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
