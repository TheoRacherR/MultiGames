import { Fragment, useContext, useState } from "react";
import { BattleshipContextInterface, shipCase } from "../../../../../@types/battleship";
import Board from "./Board";
import LineAtoJ from "./LineAtoJ";
import { styleCase } from "assets/Battleship/Board";
import { findStyleOfCasePlayer } from "utils/Battleship/BattleshipFunc";
import { attackACase } from "utils/Battleship/BattleshipFunc";
import { BattleshipContext } from "utils/Context/BattleshipContext";

const OpponentBoard = () => {

  const { opponentCases, setOpponentCases } = useContext(
    BattleshipContext
  ) as BattleshipContextInterface;

  const [caseOver, setCaseOver] = useState<shipCase | null>(null);

  const handleClickOnACase = (caseOver: shipCase) => {
    if (!caseOver.bombed) {
      const result = attackACase(caseOver, opponentCases);
      setOpponentCases(prev => ({...prev, board: result}))
    }
  };

  return (
    <Board playerBoard={false}>
      <>
        {opponentCases.board.map((item, index) => (
          <Fragment key={`case_opponent_${index}`}>
            <LineAtoJ index={index}/>
            <div
              id={item.id.toString()}
              style={styleCase}
              className='relative'
              key={index}
              onMouseOver={() => setCaseOver(item)}
              onMouseLeave={() => setCaseOver(null)}
              onClick={() => handleClickOnACase(item)}
            >
              <div
                className={findStyleOfCasePlayer(item)}
              >
                {caseOver === item && !item.bombed ? <div className="text-center text-3xl">❌</div> : ''}
              </div>
            </div>
          </Fragment>
        ))}
      </>
    </Board>
  );
};

export default OpponentBoard;
