import React, { Dispatch, Fragment, useState } from "react";
import { boardCases, opponentShipCase, orientationCase, shipCase } from "../../../../../@types/battleship";
import Board from "./Board";
import LineAtoJ from "./LineAtoJ";
import { styleCase } from "assets/Battleship/Board";
import { findStyleOfCasePlayer } from "utils/Battleship/BattleshipFunc";
import { attackACase } from "utils/Battleship/BattleshipFunc";

const OpponentBoard = ({
  board,
  setBoard,
}: {
  board: boardCases;
  setBoard: Dispatch<React.SetStateAction<boardCases>>;
}) => {

  // OpponentBoard
  const [caseOver, setCaseOver] = useState<shipCase | null>(null);
  

  const handleClickOnACase = (caseOver: shipCase) => {
    if (!caseOver.bombed) {
      const result = attackACase(caseOver, board);
      setBoard(prev => ({...prev, board: result}))
    }
  };

  return (
    <Board playerBoard={false}>
      <>
        {board.board.map((item, index) => (
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
