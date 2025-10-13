import { keyInterface, KeyListDictionary, keyState } from "../../@types/wordle";
import { createContext, useEffect, useState } from "react";

export const WordleContext = createContext<any>(undefined);

const keyListInit: keyInterface[][] = [
  [
    { key: "a", state: keyState.UNTOUCHED },
    { key: "z", state: keyState.UNTOUCHED },
    { key: "e", state: keyState.UNTOUCHED },
    { key: "r", state: keyState.UNTOUCHED },
    { key: "t", state: keyState.UNTOUCHED },
    { key: "y", state: keyState.UNTOUCHED },
    { key: "u", state: keyState.UNTOUCHED },
    { key: "i", state: keyState.UNTOUCHED },
    { key: "o", state: keyState.UNTOUCHED },
    { key: "p", state: keyState.UNTOUCHED },
  ],
  [
    { key: "q", state: keyState.UNTOUCHED },
    { key: "s", state: keyState.UNTOUCHED },
    { key: "d", state: keyState.UNTOUCHED },
    { key: "f", state: keyState.UNTOUCHED },
    { key: "g", state: keyState.UNTOUCHED },
    { key: "h", state: keyState.UNTOUCHED },
    { key: "j", state: keyState.UNTOUCHED },
    { key: "k", state: keyState.UNTOUCHED },
    { key: "l", state: keyState.UNTOUCHED },
    { key: "m", state: keyState.UNTOUCHED },
  ],
  [
    { key: "ENTER", state: keyState.UNTOUCHED },
    { key: "w", state: keyState.UNTOUCHED },
    { key: "x", state: keyState.UNTOUCHED },
    { key: "c", state: keyState.UNTOUCHED },
    { key: "v", state: keyState.UNTOUCHED },
    { key: "b", state: keyState.UNTOUCHED },
    { key: "n", state: keyState.UNTOUCHED },
    { key: "DELETE", state: keyState.UNTOUCHED },
  ],
];

export const keyListDictionnary: KeyListDictionary = {
  'a': { row: 0, column: 0},
  'z': { row: 0, column: 1},
  'e': { row: 0, column: 2},
  'r': { row: 0, column: 3},
  't': { row: 0, column: 4},
  'y': { row: 0, column: 5},
  'u': { row: 0, column: 6},
  'i': { row: 0, column: 7},
  'o': { row: 0, column: 8},
  'p': { row: 0, column: 9},

  'q': { row: 1, column: 0 },
  's': { row: 1, column: 1 },
  'd': { row: 1, column: 2 },
  'f': { row: 1, column: 3 },
  'g': { row: 1, column: 4 },
  'h': { row: 1, column: 5 },
  'j': { row: 1, column: 6 },
  'k': { row: 1, column: 7 },
  'l': { row: 1, column: 8 },
  'm': { row: 1, column: 9 },

  'w': { row: 2, column: 1 },
  'x': { row: 2, column: 2 },
  'c': { row: 2, column: 3 },
  'v': { row: 2, column: 4 },
  'b': { row: 2, column: 5 },
  'n': { row: 2, column: 6 },
}

export const WordleContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [keyPressed, setKeyPressed] = useState<string>("");
  const [keyList, setKeyList] = useState<keyInterface[][]>(keyListInit);

  useEffect(() => {
    console.log(keyPressed);
  }, [keyPressed]);

  useEffect(() => {
    console.log('keyList');
    console.log(keyList);
  }, [keyList]);

  return (
    <WordleContext.Provider
      value={{ keyPressed, setKeyPressed, keyList, setKeyList }}
    >
      {children}
    </WordleContext.Provider>
  );
};
