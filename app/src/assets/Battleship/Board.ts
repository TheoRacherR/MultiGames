import { ship } from "../../@types/battleship";

export const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
export const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const lengthOfTheBoard = 10;

export const styleCase = {
    width: '100%',
    aspectRatio: '1 / 1',
    // position: 'relative',
    paddingTop: '100%',
    // background: 'transparent',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    border: '1px solid rgba(85,51,234, 19%)',
}
const baseStyle = 'absolute inset-[6px] rounded-[6px] duration-[.12s] ease-in opacity-[1]'
export const styleCaseMissed = baseStyle + ' bg-[var(--color-battleship-missed)] border-[1px] border-dashed border-[var(--color-border)]';
export const styleCaseTouched = baseStyle + ' bg-[var(--color-battleship-hit)]';
export const styleCaseDestroyed = baseStyle + ' bg-[var(--color-battleship-destroyed)]';
export const styleCaseWithBoard = baseStyle + ' bg-[var(--color-primary)]';
export const styleCaseUnTouched = baseStyle;

// --color-battleship-destroyed
export const legendList = [
  {title: 'Navire', color: 'bg-[var(--color-primary-dark)]'},
  {title: 'Touché', color: 'bg-[var(--color-battleship-hit)]'},
  {title: 'Raté', color: 'bg-[var(--color-battleship-missed)]'},
]

export const listOfShips: ship[] = [
  { name: "Tanker", id: 0, length: 4, color: "--color-ship-tanker" },
  { name: "Submarine", id: 1, length: 3, color: "--color-ship-submarine" },
  { name: "Boat", id: 2, length: 2, color: "--color-ship-boat" },
];