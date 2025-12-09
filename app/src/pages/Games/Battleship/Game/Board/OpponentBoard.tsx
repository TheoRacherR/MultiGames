import React, { Dispatch, Fragment } from "react";
import { opponentShipCase } from "../../../../../@types/battleship";
import Board from "./Board";
import LineAtoJ from "./LineAtoJ";
import { styleCase } from "assets/Battleship/Board";
import { findStyleOfCaseOpponent } from "utils/Battleship/OpponentFunc";

const OpponentBoard = ({
  cases,
  setCases,
  attackACase,
  caseOver,
  setCaseOver
}: {
  cases: opponentShipCase[];
  setCases: Dispatch<React.SetStateAction<opponentShipCase[]>>;
  attackACase: Function;
  caseOver: opponentShipCase|null;
  setCaseOver: Dispatch<React.SetStateAction<opponentShipCase|null>>;
}) => {

  return (
    <Board playerBoard={false}>
      <>
        {cases.map((item, index) => (
          <Fragment key={`case_opponent_${index}`}>
            <LineAtoJ index={index}/>
            <div
              id={item.id.toString()}
              style={styleCase}
              className='relative'
              key={index}
              onMouseOver={() => setCaseOver(item)}
              onMouseLeave={() => setCaseOver(null)}
              onClick={() => attackACase()}
            >
              <div
                className={findStyleOfCaseOpponent(item)}
              >
                {caseOver === item && !item.hasBeenBombed ? <div className="text-center text-3xl">❌</div> : ''}
              </div>
            </div>
          </Fragment>
        ))}
      </>
    </Board>
  );
};

export default OpponentBoard;
