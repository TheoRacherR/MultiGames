import { lengthOfTheBoard } from "assets/Battleship/Board";
import { boardCases, gameStateEnum, shipPlacementCase } from "../../@types/battleship";
import { createContext, useEffect, useState } from "react";
import { initCases, placeRandomShips } from "utils/Battleship/BattleshipFunc";

export const BattleshipContext = createContext<any>(undefined);

export const BattleshipContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [playerBoardSelected, setPlayerBoardSelected] = useState<boolean>(true);
  const [gameState, setGameState] = useState<gameStateEnum>(gameStateEnum.WATIING);
  const [playerCases, setPlayerCases] = useState<boardCases>({boardThisUser: true, board: Array(lengthOfTheBoard ** 2)});
  const [opponentCases, setOpponentCases] = useState<boardCases>({boardThisUser: false, board: Array(lengthOfTheBoard ** 2)});
  const [shipPlacementPhase, setShipPlacementPhase] = useState<shipPlacementCase[]>([]);

  const resetShipBoardPlayer = () => {
    setPlayerCases(prev => ({...prev, board: initCases()}))
  }
  
  const handleClickOnRandom = () => {
    setPlayerCases(prev => ({...prev, board: placeRandomShips()}));
  }

  useEffect(() => {
    resetShipBoardPlayer();
  }, []);

  return (
    <BattleshipContext.Provider
      value={{
        playerBoardSelected, setPlayerBoardSelected,
        gameState, setGameState,
        resetShipBoardPlayer, handleClickOnRandom,
        playerCases, setPlayerCases,
        opponentCases, setOpponentCases,
        shipPlacementPhase, setShipPlacementPhase,
      }}
    >
      {children}
    </BattleshipContext.Provider>
  );
};
