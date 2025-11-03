import React from "react";
import { Route, Routes } from "react-router-dom";
import WordleWrapperContext from "./Game/Wordle";
import WordleAlreadyDone from "./Game/Errors/WordleAlreadyDone";
import Wordday404 from "./Game/Errors/WordOfTheDay404";
import MainWordle from "./MainWordle";

const WrapperWordle = () => {
  return (
    <div>
      <Routes>
        <Route path="" element={<MainWordle />} />
        <Route path="/game" element={<WordleWrapperContext />} />
        <Route path="/game/already-done" element={<WordleAlreadyDone />} />
        <Route path="/game/word-dont-exists" element={<Wordday404 />} />
      </Routes>
    </div>
  );
};

export default WrapperWordle;
