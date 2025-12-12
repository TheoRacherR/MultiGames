import PlayerBoard from "./Board/PlayerBoard";
import OpponentBoard from "./Board/OpponentBoard";
import { useContext, useEffect, useState } from "react";
import {
  BattleshipContextInterface,
  // shipPlacment,
  gameStateEnum,
} from "../../../../@types/battleship";
import InformationBoard from "./Board/InformationBoard";
import HeadLine from "./BattleshipComponents/HeadLine";
import BattleshipContainer from "./BattleshipComponents/BattleshipContainer";
import { BattleshipContext, BattleshipContextProvider } from "utils/Context/BattleshipContext";

const Battleship = () => {
  // Player
    const { playerBoardSelected, setPlayerBoardSelected, gameState, resetShipBoardPlayer } = useContext(
      BattleshipContext
    ) as BattleshipContextInterface;

  // const [playerShipsPlacment, setPlayerShipsPlacment] = useState<
  //   shipPlacment[]
  // >([]);
  const [openModalEnGame, setOpenModalEnGame] = useState<boolean>(false);

  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameEnded, setGameEnded] = useState<{
    state: boolean;
    didIWon: boolean;
  }>({ state: false, didIWon: false });

  const [playersTurn, setPlayersTurn] = useState<boolean>(false);

  // socket call giveStartOrder

  /* socket contient :
   *  createur de la room: true ou false
   *  je commence ? true ou false
   *  room id
   *
   *  function click:
   *    case id
   *    player id
   *
   *  function retourClick:
   *    touched: true ou false
   *    boat sinked: true or false
   *
   *  function gameEnded:
   *    winner: player id
   *    timer: number
   */

  // get socket: owner ?
  // const [ownerOfTheParty, setOwnerOfTheParty] = useState<boolean>(true);

  // true = my trun
  // false = opponent trun

  // const initShipPlacments = () => {
  //   const arrTemp = [...playerShipsPlacment];
  //   for (
  //     let index = 0;
  //     index < playerCases.filter((pc) => pc.hasShip).length;
  //     index++
  //   ) {
  //     const playerCase = playerCases.filter((pc) => pc.hasShip)[index];
  //     if (
  //       playerShipsPlacment?.filter((c) => c.ship === playerCase.ship)
  //         .length === 0
  //     ) {
  //       const step =
  //         playerCase.orientation === orientationCase.HORIZONTAL ? 1 : 10;
  //       const boatHead =
  //         playerCases[playerCase.id - playerCase.shipCaseId * step];
  //       console.log(playerCase.ship?.name + " " + boatHead.id);
  //       if (boatHead.ship) {
  //         const placmentCase: shipPlacmentCase[] = [];
  //         for (let index = 0; index < boatHead.ship?.length; index++) {
  //           const c = playerCases[boatHead.id + index * step];
  //           placmentCase.push({
  //             caseNumber: c.shipCaseId,
  //             bombed: c.bombed,
  //             idCaseInBoard: c.id,
  //           });
  //         }
  //         arrTemp[boatHead.ship.id] = {
  //           ship: boatHead.ship,
  //           destroyed: false,
  //           cases: placmentCase,
  //         };
  //       }
  //     }
  //   }
  //   console.log(arrTemp);
  //   setPlayerShipsPlacment(arrTemp);
  // };

  // const startTheGame = () => {
  //   // return socket game start
  //   setGameStarted(true);
  //   initShipPlacments();
  //   const starter = giveStartOrder();
  //   setPlayersTurn(starter);
  //   starter ? console.log("you start") : console.log("opponent starts");
  // };


  // random attack on player board
  // const opponentPlayerMoove = () => {
  //   if (!playersTurn) {
  //     let isOk = false;
  //     let count = 0;
  //     while (!isOk || count < 100) {
  //       const caseToSelect = Math.floor(Math.random() * 100);
  //       if (
  //         !playerCases[caseToSelect].bombed &&
  //         playerCases[caseToSelect].ship !== null &&
  //         playerCases[caseToSelect].ship?.id !== undefined
  //       ) {
  //         console.log(`opponement clicked on case ${caseToSelect}`);
  //         const arrTemp = [...playerCases];
  //         arrTemp[caseToSelect] = { ...arrTemp[caseToSelect], bombed: true };
  //         setPlayerCases(arrTemp);

  //         if (
  //           playerCases[caseToSelect].ship !== null &&
  //           playerCases[caseToSelect].ship?.id !== undefined
  //         ) {
  //           const playerShipsPlacmentTemp = [...playerShipsPlacment];
  //           const casesArr = [
  //             ...playerShipsPlacment[playerCases[caseToSelect].ship?.id || 0]
  //               .cases,
  //           ];
  //           casesArr[playerCases[caseToSelect].shipCaseId] = {
  //             ...casesArr[playerCases[caseToSelect].shipCaseId],
  //             bombed: true,
  //           };
  //           let destroyed = false;
  //           console.log("ship : " + playerCases[caseToSelect].ship?.name);
  //           for (let index = 0; index < casesArr.length; index++) {
  //             const caseElement = casesArr[index];
  //             console.log(caseElement.bombed);
  //             if (!caseElement.bombed) {
  //               destroyed = false;
  //               console.log(`case ${caseElement.caseNumber} not bombed`);
  //               break;
  //             } else {
  //               destroyed = true;
  //               console.log(`case ${caseElement.caseNumber} bombed`);
  //             }
  //           }
  //           if (destroyed)
  //             console.log(
  //               `ship ${playerCases[caseToSelect].ship?.name} destroyed`
  //             );
  //           playerShipsPlacment[playerCases[caseToSelect].ship?.id || 0] = {
  //             ...playerShipsPlacment[playerCases[caseToSelect].ship?.id || 0],
  //             destroyed: destroyed,
  //             cases: casesArr,
  //           };
  //           playerShipsPlacmentTemp[caseToSelect] = {
  //             ...playerShipsPlacmentTemp[caseToSelect],
  //             cases: casesArr,
  //           };
  //           setPlayerShipsPlacment(playerShipsPlacmentTemp);
  //         }

  //         setPlayersTurn(true);
  //         isOk = true;
  //       }
  //       // count++;
  //     }
  //   }
  // };


  useEffect(() => {
    // setOpponentCases(prev => ({...prev, board: placeRandomShips()}))
    resetShipBoardPlayer();
    // setPlayerCases(prev => ({...prev, board: placeRandomShips()}));
  }, []);

  return (
    <>
      <BattleshipContainer>
        <>
          <HeadLine/>

          <div className="flex gap-[24px] items-start">
            <div className="flex-[1 1 auto]" style={{ flex: "1 1 auto" }}>
              <div
                id="board-title"
                className="flex items-center justify-between"
              >
                {playerBoardSelected ? (
                  <>
                    <div
                      className="bg-[var(--color-primary)] text-[var(--color-text-primary)] font-[700] inline-block p-3 cursor-pointer rounded-t-md"
                      onClick={() => setPlayerBoardSelected(true)}
                    >
                      Ton plateau
                    </div>
                    {gameState === gameStateEnum.ON_GAME || gameState === gameStateEnum.GAME_FINISHED ?
                      <div
                        className="font-[700] inline-block p-3 cursor-pointer rounded-t-md hover:bg-[var(--color-background)]"
                        onClick={() => setPlayerBoardSelected(false)}
                      >
                        L'autre plateau
                      </div>
                    :
                      <></>
                    }
                  </>
                ) : (
                  <>
                    <div
                      className="font-[700] inline-block p-3 cursor-pointer rounded-t-md hover:bg-[var(--color-background)]"
                      onClick={() => setPlayerBoardSelected(true)}
                    >
                      Ton plateau
                    </div>
                    {/* <div>Case ciblé: {caseOver?.coordinationAlphabet}{caseOver?.coordinationNumber}</div> */}
                    {gameState === gameStateEnum.ON_GAME || gameState === gameStateEnum.GAME_FINISHED ?
                      <div
                        className="bg-[var(--color-primary)] text-[var(--color-text-primary)] font-[700] inline-block p-3 cursor-pointer rounded-t-md"
                        onClick={() => setPlayerBoardSelected(false)}
                      >
                        L'autre plateau
                      </div>
                    :
                      <></>
                    }
                  </>
                )}
              </div>
              {playerBoardSelected ? (
                <PlayerBoard/>
              ) : (
                <OpponentBoard/>
              )}
            </div>
            <InformationBoard/>
          </div>
        </>
      </BattleshipContainer>
      {/* <ModalGameFinished open={openModalEnGame} setOpen={setOpenModalEnGame} won={gameEnded.didIWon} /> */}
    </>
  );
};

const BattleshipWrapperContext = () => {
  return (
    <BattleshipContextProvider>
      <Battleship />
    </BattleshipContextProvider>
  );
};

export default BattleshipWrapperContext;