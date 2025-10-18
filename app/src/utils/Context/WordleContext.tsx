import { initialiseKeyList } from "utils/Wordle/Wordle";
import { keyInterface } from "../../@types/wordle";
import { createContext, useEffect, useState } from "react";

export const WordleContext = createContext<any>(undefined);

export const WordleContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [keyPressed, setKeyPressed] = useState<string>("");
  const [keyList, setKeyList] = useState<keyInterface[][]>(initialiseKeyList());

  const initKeys = () => {
    const keyListInit = initialiseKeyList();
    setKeyList(keyListInit);
    console.log('init keys')
  }

  useEffect(() => {
    initKeys();
  }, [])

  useEffect(() => {
    console.log(keyPressed);
  }, [keyPressed]);

  useEffect(() => {
    console.log('keyList');
    console.log(keyList);
  }, [keyList]);

  return (
    <WordleContext.Provider
      value={{ keyPressed, setKeyPressed, keyList, setKeyList, initKeys }}
    >
      {children}
    </WordleContext.Provider>
  );
};
