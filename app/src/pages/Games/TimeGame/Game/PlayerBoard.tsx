import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { BoardType, cardType, ItemType } from '../../../../@types/timegame';
// import { CardDraggable } from './Card';
import { CardSortable } from './Card';
import { useDroppable } from '@dnd-kit/core';


const PlayerBoard = ({cards}: {cards: cardType[]}) => {
  const { setNodeRef } = useDroppable({ id: BoardType.PLAYER, data: { type: ItemType.BOARD } });
  return (
    <SortableContext
      items={cards}
      strategy={rectSortingStrategy}
    >
      <div className="flex flex-wrap gap-4 justify-center w-full min-h-[100px] max-w-3xl" ref={setNodeRef}>
        {cards.map((item, index) => (
          <CardSortable card={item} key={`myboard_card_${index}`} board={BoardType.PLAYER}/>
        ))}

      </div>
    </SortableContext>
  )
}

export default PlayerBoard