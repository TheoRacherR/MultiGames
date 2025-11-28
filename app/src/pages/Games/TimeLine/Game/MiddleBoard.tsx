import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { BoardType, cardType, ItemType } from "../../../../@types/timeline";
import { CardSortable } from "./Card";

const MiddleBoard = ({ cards }: { cards: cardType[] }) => {
  const { setNodeRef } = useDroppable({
    id: BoardType.MIDDLE,
    data: { type: ItemType.BOARD },
  });

  return (
    <SortableContext items={cards} strategy={rectSortingStrategy}>
      <div
        id="board"
        ref={setNodeRef}
        className={`w-full min-h-[200px] bg-[#F9F9FF] border border-[#D9D4F8] rounded-xl mb-8`}
      >
        <div className="w-full h-full p-4 flex flex-wrap justify-center gap-3">
          {cards.length > 0 ? (
            cards.map((item, index) => (
              <CardSortable
                card={item}
                key={`myboard_card_${index}`}
                board={BoardType.MIDDLE}
              />
            ))
          ) : (
            <p id="board-hint" className="text-[#A29AE3] italic text-center">
              Glisse les cartes ici dans le bon ordre chronologique 📜
            </p>
          )}
        </div>
      </div>
    </SortableContext>
  );
};

export default MiddleBoard;
