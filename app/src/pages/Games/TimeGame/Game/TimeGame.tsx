import { useEffect, useState } from 'react';
import { buttonComponentColor, buttonComponentSize, buttonComponentType } from '../../../../@types/default';
import ButtonComponent from 'components/ButtonComponent';
import { BoardType, cardType, ItemType } from '../../../../@types/timegame';
import { getIndexInArrById, moveBetweenContainers, arrMove, shuffleEvent, extractFirstEvents, checkIfOrderIsFine } from 'utils/TimeGame/TimeGameFunc';
import {DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, KeyboardSensor, MouseSensor, rectIntersection, TouchSensor, useSensor, useSensors} from '@dnd-kit/core';
import PlayerBoard from './PlayerBoard';
import MiddleBoard from './MiddleBoard';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Item } from './Card';
import { events } from 'assets/data/timegame/events';
import TimeGameModalEndGame from './TimeGameModalEndGame';
import { finalScoreInterface } from '../../../../@types/timegame';
import { getUserInfos } from 'utils/Default/Auth';
import { country, UserInfos, userRole, userStatus } from '../../../../@types/user';
import axios from 'axios';

const TimeGame = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const [playerBoard, setPlayerBoard] = useState<cardType[]>([]);
  const [middleBoard, setMiddleBoard] = useState<(cardType)[]>([]);
  const [activeItemID, setActiveItemID] = useState<number>(-1);

  const [eventsToGuess, setEventToGuess] = useState<cardType[]>([]);

  const [finalScore, setFinalScore] = useState<finalScoreInterface>({
    end: false,
    modalOpenned: false,
    finalTimer: 0,
    listFound: 0,
  });
  const [userInfos, setUserInfos] = useState<UserInfos>({
    id: "",
    email: "",
    firstname: "",
    lastname: "",
    pseudo: "",
    role: userRole.USER,
    status: userStatus.TO_ACTIVE,
    country: country.FRANCE,
  });

  const startGame = () => {
    setGameStarted(true);
  };

  const endGame = async () => {
    console.log('end')
    setGameStarted(false);
    setFinalScore({
      end: true,
      modalOpenned: true,
      finalTimer: 0 ,// maxTimer - seconds,
      listFound: middleBoard.length-1, //flagFound,
    });
    // TODO Send to DB
    // try {
    //   const userInfosRequest = await getUserInfos();
    //   setUserInfos(userInfosRequest);
    //   if (userInfosRequest) {
    //     await axios.post("/timegame", {
    //       scoreFound: middleBoard.length-1,//flagFound.length,
    //       // timerFinished: 0,//maxTimer - seconds, //TODO calcul temps total
    //       player: userInfosRequest.id,
    //     });
    //   }
    // } catch (e) {
    //   // return navigate("auth");
    // }
  };

  useEffect(() => {
    resetPage();
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  /* DRAGGING GESTION */
  const handleDragStart = (e: DragStartEvent) => {
    if(e.active && e.active.data.current){
      setActiveItemID(parseInt(e.active.id.toString()))
    }
  };
  const handleDragCancel = () => setActiveItemID(-1);
  const handleDragOver = (e: DragOverEvent) => {
    // console.log('OVER')
    const overId = e.over?.id;
    // console.log('overId: '+overId);
    // console.log(overId + ' ' + overId === undefined)

    if (overId === undefined) {
      return;
    }

    if(e.over?.data.current?.type === ItemType.BOARD){
      // console.log('Type: ' + (e.over?.data.current?.type === ItemType.BOARD ? 'Board' : 'Card'));
      if(overId === BoardType.MIDDLE) { //From PlayerBoard to MiddleBoard

        // console.log('From PlayerBoard to MiddleBoard');
        if(playerBoard[getIndexInArrById(activeItemID.toString(), playerBoard)] === undefined){
          return;
        }
        const { activeContainer, overContainer} = moveBetweenContainers(
          playerBoard,
          getIndexInArrById(activeItemID.toString(), playerBoard),
          middleBoard,
          middleBoard.length,
          playerBoard[getIndexInArrById(activeItemID.toString(), playerBoard)]
        );
        setPlayerBoard(activeContainer);
        setMiddleBoard(overContainer);
      }
      else if(overId === BoardType.PLAYER) { //From MiddleBoard to PlayerBoard
        // console.log('From MiddleBoard to PlayerBoard')
        // console.log(middleBoard)
        // console.log(middleBoard[getIndexInArrById(activeItemID.toString(), middleBoard)])
        if(middleBoard[getIndexInArrById(activeItemID.toString(), middleBoard)] === undefined){
          return;
        }
        const { activeContainer, overContainer} = moveBetweenContainers(
          middleBoard,
          getIndexInArrById(activeItemID.toString(), middleBoard),
          playerBoard,
          playerBoard.length,
          middleBoard[getIndexInArrById(activeItemID.toString(), middleBoard)]
        );
        setMiddleBoard(activeContainer); 
        setPlayerBoard(overContainer);
      }
      else {
        // console.log(overId)
      }
      return;
    }
    
    // console.log('Type: ' + (e.over?.data.current?.type === ItemType.BOARD ? 'Board' : 'Card'));
    if(activeItemID === overId) return //Item dragged into itself, nothing to do here
    else if(getIndexInArrById(overId.toString(), middleBoard) >= 0 && getIndexInArrById(activeItemID.toString(), middleBoard) >= 0) { // item dragged in the same board (middleboard), just change the position
      // console.log('here')
      setMiddleBoard(arrMove(
        middleBoard,
        getIndexInArrById(activeItemID.toString(), middleBoard),
        getIndexInArrById(overId.toString(), middleBoard)
      ));
    }
    else if(getIndexInArrById(overId.toString(), playerBoard) >= 0 && getIndexInArrById(activeItemID.toString(), playerBoard) >= 0) { // item dragged in the same board (playerboard), just change the position
      // console.log('here')
      setPlayerBoard(arrMove(
        playerBoard,
        getIndexInArrById(activeItemID.toString(), playerBoard),
        getIndexInArrById(overId.toString(), playerBoard)
      ));
    }
    else if(getIndexInArrById(overId.toString(), middleBoard) === -1) { // item dragged in the middleboard board, add it at the over index
      // console.log('here')
      // console.log(middleBoard)
      // console.log(middleBoard[getIndexInArrById(activeItemID.toString(), middleBoard)])
      const { activeContainer, overContainer} = moveBetweenContainers(
        middleBoard,
        getIndexInArrById(activeItemID.toString(), middleBoard),
        playerBoard,
        getIndexInArrById(overId.toString(), playerBoard),
        middleBoard[getIndexInArrById(activeItemID.toString(), middleBoard)]
      );
      setMiddleBoard(activeContainer);
      setPlayerBoard(overContainer);
    }
    else if (getIndexInArrById(overId.toString(), playerBoard) === -1) { // item dragged in the playerboard board, add it at the over index
      // console.log('here')
      // console.log(playerBoard)
      // console.log(playerBoard[getIndexInArrById(activeItemID.toString(), playerBoard)])
      const { activeContainer, overContainer} = moveBetweenContainers(
        playerBoard,
        getIndexInArrById(activeItemID.toString(), playerBoard),
        middleBoard,
        getIndexInArrById(overId.toString(), middleBoard),
        playerBoard[getIndexInArrById(activeItemID.toString(), playerBoard)]
      );
      setPlayerBoard(activeContainer);
      setMiddleBoard(overContainer);
    }
    else {
      // console.log('here')
      // console.log(overId)
    }
  };
  const handleDragEnd = (e: DragEndEvent) => {
    if (!e.over) {
      setActiveItemID(-1);
      return;
    }
    else {
      const check = checkIfOrderIsFine(middleBoard);
      if(!check) endGame();
      else if(playerBoard.length === 0){
        const { toGuess, player } = extractFirstEvents(1, eventsToGuess, playerBoard);
        setEventToGuess(toGuess);
        setPlayerBoard(player);
      }
    }
  };

  const resetPage = () => {
    const allEvents = shuffleEvent(events);
    const { toGuess, player } = extractFirstEvents(5, allEvents, []);
    console.log(toGuess)
    console.log(player)
    setEventToGuess(toGuess);
    setMiddleBoard([]);
    setPlayerBoard(player);
    setFinalScore({
      end: false,
      modalOpenned: false,
      finalTimer: 0,
      listFound: 0,
    });
    // TODO Timer ?
  }

  return (
    <div  className="min-h-screen bg-[var(--color-primary)] text-white flex flex-col items-center p-10">
      <main
        className="bg-white text-[#5533EA] rounded-2xl shadow-xl p-8 w-full max-w-5xl flex flex-col items-center"
      >
        <h2 className="text-3xl font-bold uppercase mb-6">
          Timeline Historique
        </h2>

        <div className='flex mb-6'>
          <div
            id="timer"
            className="text-2xl font-bold text-[#6C4EF6] bg-[#F4F2FF] px-6 py-2 rounded-full shadow-inner"
          >
            Temps : 02:00
          </div>
          {
            gameStarted ?
              <ButtonComponent
                text="Stop"
                color={buttonComponentColor.ERROR}
                type={buttonComponentType.INLINE}
                size={buttonComponentSize.MEDIUM}
                clickOn={endGame}
                clName="m-auto mr-0 ml-4"
                // disabled={!startTimer || finalScore.end}
              />
            :
              <ButtonComponent
                text="Start"
                color={buttonComponentColor.SUCCESS}
                type={buttonComponentType.INLINE}
                size={buttonComponentSize.MEDIUM}
                clickOn={startGame}
                clName="m-auto mr-0 ml-4"
                // disabled={!startTimer || finalScore.end}
              />
          }
          

        </div>

        <DndContext
          sensors={sensors}
          onDragStart={(event: DragStartEvent) => handleDragStart(event)} //GOOD
          onDragCancel={() => handleDragCancel()} //GOOD
          onDragOver={(event: DragOverEvent) => handleDragOver(event)} //GOOD
          onDragEnd={(event: DragEndEvent) => handleDragEnd(event)} //GOOD
          collisionDetection={rectIntersection}
        >
          <MiddleBoard
            cards={middleBoard}
          />

          <PlayerBoard
            cards={playerBoard}
          />
          <DragOverlay>
            {activeItemID > 0
            ? <Item
                card={
                  getIndexInArrById(activeItemID.toString(), middleBoard) >= 0
                  ? middleBoard[getIndexInArrById(activeItemID.toString(), middleBoard)] 
                  : playerBoard[getIndexInArrById(activeItemID.toString(), playerBoard)]
                }
                dragOverlay
              />
            : null}
          </DragOverlay>

        </DndContext>

        <div id="score" className="mt-8 text-lg font-semibold text-[#5533EA]">
          Événements placés : {middleBoard.length}
        </div>
      </main>
      {finalScore.modalOpenned ? (
        <TimeGameModalEndGame
          finalScore={finalScore}
          setFinalScore={setFinalScore}
          resetPage={resetPage}
          userInfos={userInfos}
        />
      ) : (
        <></>
      )}
    </div>
  )
}

export default TimeGame