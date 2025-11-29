import { BoardType, cardType, ItemType } from "../../../../@types/timeline";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

export const CardSortable = ({
  card,
  board,
  gameEnded
}: {
  card: cardType;
  board: BoardType;
  gameEnded: boolean;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id, data: { type: ItemType.CARD, board: board }, disabled: gameEnded });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <Item card={card} gameEnded={gameEnded}/>
    </div>
  );
};

export const Item = ({
  card,
  dragOverlay,
  gameEnded
}: {
  card: cardType;
  dragOverlay?: boolean;
  gameEnded: boolean;
}) => {
  const style = {
    cursor: dragOverlay ? "grabbing" : "grab",
  };

  return (
    <div
      style={style}
      className="flex flex-col justify-center select-none w-[250px] h-[150px] bg-[#F4F2FF] border-2 border-[#D9D4F8] text-[#5533EA] rounded-xl p-4 text-center font-semibold shadow hover:shadow-lg hover:border-[#6C4EF6]"
    >
      <div className="m-auto">
        {card?.title}
      </div>
      {
        gameEnded ? 
          <div className="m-auto">
            {card.date.toLocaleDateString()}
          </div>
        :
          <></>
      }
    </div>
  );
};
