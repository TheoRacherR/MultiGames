import { BoardType, cardType, ItemType } from '../../../../@types/timegame'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable';

export const CardSortable = ({ card, board }: { card: cardType, board: BoardType}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({id: card.id, data: { type: ItemType.CARD, board: board }});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <Item card={card}/>
    </div>
  )
};

export const Item = ({ card, dragOverlay }: { card: cardType, dragOverlay?: boolean }) => {
  const style = {
    cursor: dragOverlay ? "grabbing" : "grab",
  };

  return (
    <div style={style}
      className="flex flex-col justify-center w-[250px] h-[150px] bg-[#F4F2FF] border-2 border-[#D9D4F8] text-[#5533EA] rounded-xl p-4 text-center font-semibold shadow hover:shadow-lg hover:border-[#6C4EF6]"
    >
      <div className='m-auto'>
        {card?.title}
      </div>
    </div>
  );
};