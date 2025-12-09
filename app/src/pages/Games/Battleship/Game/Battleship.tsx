import PlayerBoard from "./Board/PlayerBoard";
import OpponentBoard from "./Board/OpponentBoard";
import { useEffect, useState } from "react";
import {
  boardCases,
  opponentShipCase,
  shipCase,
  shipPlacment,
} from "../../../../@types/battleship";
import InformationBoard from "./Board/InformationBoard";
import ButtonComponent from "components/ButtonComponent";
import {
  buttonComponentColor,
  buttonComponentSize,
  buttonComponentType,
} from "../../../../@types/default";
import { lengthOfTheBoard } from "assets/Battleship/Board";
import { placeRandomShips } from "utils/Battleship/BattleshipFunc";

const Battleship = () => {
  // Player
  const [playerCases, setPlayerCases] = useState<boardCases>({boardThisUser: true, board: Array(lengthOfTheBoard ** 2)});
  const [opponentCases, setOpponentCases] = useState<boardCases>({boardThisUser: false, board: Array(lengthOfTheBoard ** 2)});


  const [playerShipsPlacment, setPlayerShipsPlacment] = useState<
    shipPlacment[]
  >([]);
  const [openModalEnGame, setOpenModalEnGame] = useState<boolean>(false);

  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameEnded, setGameEnded] = useState<{
    state: boolean;
    didIWon: boolean;
  }>({ state: false, didIWon: false });

  const [playersTurn, setPlayersTurn] = useState<boolean>(false);

  const [playerBoardSelected, setPlayerBoardSelected] = useState<boolean>(true);

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
    setOpponentCases({boardThisUser: false, board: placeRandomShips()});
    setPlayerCases({boardThisUser: true, board: placeRandomShips()});
  }, []);

  return (
    <>
      <div className="mx-auto flex">
        <div
          id="wrapper"
          className="flex-auto m-0 min-h-screen text-[var(--color-text-primary)] flex items-start justify-center p-[48px]"
          style={{ background: "linear-gradient(180deg, var(--color-primary) 0%, #5B44E8 100%)" }}
        >
          <div
            id="app"
            className="max-w-[calc(100% - 96px)] rounded-[20px] shadow-[var(--shadow)] grid grid-cols-[1fr 360px] gap-[28px] bg-[linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))]"
            role="main"
            aria-label="Page du jeu Bataille Navale"
          >
            <section
              id="main"
              aria-label="Tableau de jeu du joueur"
              className="bg-[var(--color-surface)] text-[var(--color-text-dark)] rounded-[14px] p-[24px] shadow-[0 6px 20px rgba(44,26,121,0.06)] min-h-[620px]"
            >
              <div
                id="game-header"
                className="flex items-center justify-between mb-[18px] gap-[12px]"
              >
                <div
                  id="game-title"
                  className="text-[28px] font-[700] uppercase text-[var(--color-primary-dark)] traking-[0.06em]"
                >
                  BATAILLE NAVALE
                </div>
                <div id="controls" className="flex gap-[10px] items-center">
                  <ButtonComponent
                    text="Placer aléatoire"
                    color={buttonComponentColor.PRIMARY}
                    size={buttonComponentSize.MEDIUM}
                    type={buttonComponentType.INLINE}
                    clickOn={() => setPlayerCases(prev => ({...prev, board: placeRandomShips()}))}
                  />
                  <ButtonComponent
                    text="Réinitialiser"
                    color={buttonComponentColor.PRIMARY}
                    size={buttonComponentSize.MEDIUM}
                    type={buttonComponentType.INLINE}
                    clickOn={() => {}}
                  />
                  <ButtonComponent
                    text="Jouer"
                    color={buttonComponentColor.PRIMARY}
                    size={buttonComponentSize.MEDIUM}
                    type={buttonComponentType.INLINE}
                    clickOn={() => {}}
                  />
                </div>
              </div>

              <div id="board-container" className="flex gap-[24px] items-start">
                <div
                  id="board-panel"
                  className="flex-[1 1 auto]"
                  style={{ flex: "1 1 auto" }}
                >
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
                        <div
                          className="font-[700] inline-block p-3 cursor-pointer rounded-t-md hover:bg-[var(--color-background)]"
                          onClick={() => setPlayerBoardSelected(false)}
                        >
                          L'autre plateau
                        </div>
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
                        <div
                          className="bg-[var(--color-primary)] text-[var(--color-text-primary)] font-[700] inline-block p-3 cursor-pointer rounded-t-md"
                          onClick={() => setPlayerBoardSelected(false)}
                        >
                          L'autre plateau
                        </div>
                      </>
                    )}
                  </div>
                  {playerBoardSelected ? (
                    <PlayerBoard
                      board={playerCases}
                      setBoard={setPlayerCases}
                    />
                  ) : (
                    <OpponentBoard
                      board={opponentCases}
                      setBoard={setOpponentCases}
                    />
                  )}
                </div>
                <InformationBoard />
              </div>
            </section>

            {/* <!-- Right side: scores / leaderboard --> */}
            {/* <aside className="side" aria-label="Tableau des scores">
              <h3>Tableau des parties</h3>
              <table className="score-table" aria-hidden="false">
                <thead>
                  <tr><th>Joueur</th><th>Score</th><th>Niveau</th></tr>
                </thead>
                <tbody id="score-body">
                  <tr><td>Marine</td><td>320</td><td>Facile</td></tr>
                  <tr><td>Léo</td><td>290</td><td>Moyen</td></tr>
                  <tr><td>Paul</td><td>260</td><td>Difficile</td></tr>
                </tbody>
              </table>

              <div className="small">Dernières parties — triées par score</div>

              <div className="instructions" role="note" aria-live="polite">
                Cette interface montre **ton plateau**. Les attaques de l'adversaire ne sont pas affichées ici (simple vue joueur).
              </div>
            </aside> */}
          </div>
        </div>

        {/* {gameStarted ? 
        <>
          <div onClick={opponentPlayerMoove} className='cursor-pointer'>click</div>
          <OpponentBoard cases={opponentCases} setCases={setOpponentCases} attackACase={attackACase}/> 
        </>
          : <></>
        } */}
      </div>
      {/* <ModalGameFinished open={openModalEnGame} setOpen={setOpenModalEnGame} won={gameEnded.didIWon} /> */}
    </>
  );
};

export default Battleship;
