import { Dispatch, useEffect, useState } from 'react';
import ShipsBoard from './ShipsBoard';
import { Button } from '@mui/material';
import { alphabet, lengthOfTheBoard, numbers, orientationCase, ship, shipCase } from '../Battleship';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import Board from './Board';
import InformationBoard from './InformationBoard';

const PlayerBoard = ({ startTheGame, gameStarted, cases, setCases }: { startTheGame: Function, gameStarted: boolean, cases: shipCase[], setCases: Dispatch<React.SetStateAction<shipCase[]>> }) => {
  const [listOfShips, setListOfShips] = useState<ship[]>([
    { name: 'Tanker', id: 0, length: 4, color: 'red' },
    { name: 'Submarine', id: 1, length: 3, color: 'blue' },
    { name: 'Boat', id: 2, length: 2, color: 'green' },
  ]);
  const [shipSelected, setShipSelected] = useState<ship>({
    id: 0,
    name: '',
    length: 1,
    color: '#3B81F6',
  });
  const [caseShipSelected, setCaseShipSelected] = useState<number>(0);
  const [caseOnBoardDropped, setCaseOnBoardDropped] = useState<number>(0);

  const [boardValidated, setBoardValidated] = useState<boolean>(false);

  const [opponentReady, setOpponentReady] = useState<boolean>(false);

  const initCases = () => {
    const arr: shipCase[] = [];
    for (let c = 0; c < lengthOfTheBoard**2; c++) {
      arr.push({
        id: c,
        hasShip: false,
        ship: null,
        shipCaseId: -1,
        orientation: orientationCase.UNSET,
        bombed: false
      });
    }
    return arr;
  }

  useEffect(() => {
    // setCases(initCases());
    setCases(placeRandomShips());
  }, []);

  const styleCase = {
    width: '100%',
    aspectRatio: '1 / 1',
    // position: 'relative',
    paddingTop: '100%',
    background: 'transparent',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'default',
    border: '1px solid rgba(85,51,234,0.06)',
  }

  const checkIfShipCanBePlacedHere = (caseIdToDrop: number, shipSelect: ship, caseOfShipSelected: number, step: number): boolean => {
    const idTopCase = caseIdToDrop - (caseOfShipSelected * step);
    const idCaseEnd = caseIdToDrop + (step * (shipSelect.length-caseOfShipSelected-1));
    if (idTopCase < 0) {
      console.log('trop haut')
      return false;
    }
    else if(idCaseEnd >= lengthOfTheBoard**2){
      console.log('trop bas')
      return false
    }
    else {
      // on va regarder pour chaque case qui vont être changé, s'il possède un bateau, si non OK
      const caseStart = caseIdToDrop - (step * caseOfShipSelected);
      for (let index = 0; index < shipSelect.length; index++) {
        const caseToCheck = caseStart + (step * index);
        if(cases[caseToCheck].hasShip && cases[caseToCheck].ship !== shipSelect) {
          console.log(`case ${caseToCheck} is not clean`)
          return false
        }
      }
      return true;
    }
  }

  const dragDrop = (caseId: number) => {
    if(!gameStarted && !boardValidated) {
      const stepToTheNestCase = cases[caseOnBoardDropped].orientation === orientationCase.HORIZONTAL ? 1 : 10;
      const casesToDelete = cases.filter((c) => c.ship === shipSelected)
      // if(casesToDelete[1]?.id - casesToDelete[0]?.id === 1) stepToTheNestCase = 1;
      if(checkIfShipCanBePlacedHere(caseId, shipSelected, caseShipSelected, stepToTheNestCase)) {
        const arrTemp = [...cases];
        if(casesToDelete.length > 0){
          for (let index = 0; index < casesToDelete.length; index++) {
            const c = casesToDelete[index];
            arrTemp[c.id] = {
              id: c.id,
              hasShip: false,
              ship: null,
              shipCaseId: -1,
              orientation: orientationCase.UNSET,
              bombed: false
            }
          }
        }
        const caseStart = caseId - (stepToTheNestCase * caseShipSelected);
        for (let step = 0; step < shipSelected.length; step++) {
          arrTemp[caseStart + (step * stepToTheNestCase)] = {
            id: arrTemp[caseStart + (step * stepToTheNestCase)].id,
            hasShip: true,
            ship: shipSelected,
            shipCaseId: step,
            orientation: cases[caseOnBoardDropped].orientation === orientationCase.UNSET ? orientationCase.VERTICAL : cases[caseOnBoardDropped].orientation,
            bombed: false
          };
        }
        setCases(arrTemp);
        setListOfShips(listOfShips.filter((ship) => ship !== shipSelected))
      }
      // console.log('-------------------')
    }
  };

  const checkIfShipCanRotate = (shipToRotate: ship, topCase: shipCase, indexToAddLoop: number): boolean => {
    for (let index = 1; index < shipToRotate.length; index++) {
      const caseToCheck = topCase.id + (index * indexToAddLoop);
      // console.log((caseToCheck) % lengthOfTheBoard);
      if(caseToCheck > (lengthOfTheBoard**2)-1) {
        // console.log('dépasse le bord du bas')
        return false //dépasse le bord du bas
      }
      else if((caseToCheck) % lengthOfTheBoard === 0) {
        // console.log('dépasse le bord de droite')
        return false //dépasse le bord de droite
      }
      if(cases[caseToCheck].hasShip) {
        // console.log(`la case ${caseToCheck} possède déjà un bateau`)
        return false; // une case possède déjà un bateau
      }
    }
    return true;
  }

  const rotateShip = (shipToRotate: ship) => {
    if(!gameStarted && !boardValidated){
      const topCase: shipCase = cases.filter((c) => c.ship === shipToRotate && c.shipCaseId === 0)[0];
      let indexToAddLoop: number = 1;
      let indexToRemoveLoop: number = 10;
      if(cases[topCase.id].orientation === orientationCase.VERTICAL) {
        indexToAddLoop = 1;
        indexToRemoveLoop = 10;
      } // vertical
      else {
        indexToAddLoop = 10;
        indexToRemoveLoop = 1;
      } // horizontal
      if(checkIfShipCanRotate(shipToRotate, topCase, indexToAddLoop)){
        const casesTemp: shipCase[] = [...cases];
        casesTemp[topCase.id] = {
          id: casesTemp[topCase.id].id,
          ship: casesTemp[topCase.id].ship,
          hasShip: casesTemp[topCase.id].hasShip,
          shipCaseId: casesTemp[topCase.id].shipCaseId,
          orientation: casesTemp[topCase.id].orientation === orientationCase.HORIZONTAL ? orientationCase.VERTICAL : orientationCase.HORIZONTAL,
          bombed: false
        }
        // console.log(casesTemp[topCase.id])
        for (let index = 1; index < shipToRotate.length; index++) {
          casesTemp[topCase.id + index * indexToAddLoop] = {
            id: casesTemp[topCase.id + index * indexToAddLoop].id,
            ship: casesTemp[topCase.id + index * indexToRemoveLoop].ship,
            hasShip: casesTemp[topCase.id + index * indexToRemoveLoop].hasShip,
            shipCaseId: casesTemp[topCase.id + index * indexToRemoveLoop].shipCaseId,
            orientation: casesTemp[topCase.id + index * indexToRemoveLoop].orientation === orientationCase.HORIZONTAL ? orientationCase.VERTICAL : orientationCase.HORIZONTAL,
            bombed: false
          }
          // console.log(casesTemp[topCase.id + index * indexToAddLoop])
          casesTemp[topCase.id + index * indexToRemoveLoop] = {
            id: casesTemp[topCase.id + index * indexToRemoveLoop].id,
            ship: null,
            hasShip: false,
            shipCaseId: -1,
            orientation: orientationCase.UNSET,
            bombed: false
          }
        }
        setCases(casesTemp);
      }
      // console.log('-------------------')
    }
  }

  const resetBoard = () => {
    initCases();
    setListOfShips([
      { name: 'Tanker', id: 0, length: 4, color: 'red' },
      { name: 'Submarine', id: 1, length: 3, color: 'blue' },
      { name: 'Boat', id: 2, length: 2, color: 'green' },
    ]);
    setShipSelected({
      id: 0,
      name: '',
      length: 1,
      color: '#3B81F6',
    });
    setCaseShipSelected(0);
    setCaseOnBoardDropped(0);
    setBoardValidated(false);
  }

  useEffect(() => {
    if(opponentReady && boardValidated) startTheGame();
  }, [opponentReady, boardValidated])

  const validate = () => {
    console.log('go')
    setBoardValidated(true);
  }
  const cancel = () => {
    console.log('canel')
    setBoardValidated(false);
  }

function placeRandomShips() {
    // Simple random placement algorithm for demo:
    // Ships lengths: 5,4,3,3,2
    const shipLengths = [5, 4, 3, 3, 2]; //TODO temp
    // clear previous
    let casesTemp: shipCase[] = initCases();
    console.log('first')

    function canPlace(r: number, c: number, len: number, vertical: boolean) {
      for (let i = 0; i < len; i++) {
        const rr = r + (vertical ? i : 0);
        const cc = c + (vertical ? 0 : i);
        if (
          rr < 0 ||
          rr >= lengthOfTheBoard ||
          cc < 0 ||
          cc >= lengthOfTheBoard
        )
          return false;
        const idx = rr * lengthOfTheBoard + cc;
        if (casesTemp[idx].hasShip) return false;
      }
      return true;
    }

    function doPlace(r: number, c: number, len: number, vertical: boolean) {
      for (let i = 0; i < len; i++) {
        const rr = r + (vertical ? i : 0);
        const cc = c + (vertical ? 0 : i);
        const idx = rr * lengthOfTheBoard + cc;
        casesTemp[idx].hasShip = true;
      }
    }

    for (const len of shipLengths) {
      let placed = false,
        attempts = 0;
      while (!placed && attempts < 200) {
        attempts++;
        const vertical = Math.random() < 0.5;
        const row = Math.floor(Math.random() * lengthOfTheBoard);
        const column = Math.floor(Math.random() * lengthOfTheBoard);
        if (canPlace(row, column, len, vertical)) {
          doPlace(row, column, len, vertical);
          placed = true;
        }
      }
    }
    console.log(casesTemp)
    return casesTemp;
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
    <div id='wrapper' 
      className='flex-auto m-0 min-h-screen text-[var(--color-text-primary)] flex items-start justify-center p-[48px]'
      /*bg-linear-to-r from-[var(--color-primary) 0%] to-[#5B44E8 100%)]'*/
      style={{background: 'linear-gradient(180deg, var(--color-primary) 0%, #5B44E8 100%)'}}
    >
      <div id='app' className="w-[1200px] max-w-[calc(100% - 96px)] rounded-[20px] shadow-[var(--shadow)] grid grid-cols-[1fr 360px] gap-[28px] bg-[linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))]" role="main" aria-label="Page du jeu Bataille Navale">
        {/* <!-- Left: main game panel --> */}
        <section 
          id="main" aria-label="Tableau de jeu du joueur"
          className="bg-[var(--color-surface)] text-[var(--color-text-dark)] rounded-[14px] p-[24px] shadow-[0 6px 20px rgba(44,26,121,0.06)] min-h-[620px]"
        >
          <div id="game-header" className="flex items-center justify-between mb-[18px] gap-[12px]">
            <div id="game-title" className='text-[28px] font-[700] uppercase text-[var(--color-primary-dark)] traking-[0.06em]'>BATAILLE NAVALE</div>
            <div id="controls" className='flex gap-[10px] items-center'>
              <button className="butn" id="auto-place" onClick={() => setCases(placeRandomShips())}>Placer aléatoire</button>
              <button className="butn secondary" id="reset">Réinitialiser</button>
              <button className="butn" id="start">Jouer</button>
            </div>
          </div>

          <div id="board-container" className='flex gap-[24px] items-start'>
            <Board cases={cases} style={styleCase}/>
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
  );
};

export default PlayerBoard;
