import "./App.css";
import MenuDefault from "./pages/Default/MenuDefault";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "pages/Default/Auth/Auth";
import Account from "pages/Default/Account/Account";
import UserPage from "pages/Default/UserPage/UserPage";
import WrapperWordle from "pages/Games/Wordle/WrapperWordle";
import WrapperQuiz from "pages/Games/Quiz/WrapperQuiz";
import WrapperMinesweeper from "pages/Games/Minesweeper/WrapperMinesweeper";
import WrapperBattleship from "pages/Games/Battleship/WrapperBattleship";
import WrapperTimeLine from "pages/Games/TimeLine/WrapperTimeLine";
import GamesList from "pages/GamesList";
import WrapperAtlas from "pages/Games/Atlas/WrapperAtlas";
import { Alert, Snackbar } from "@mui/material";
import { AlertContext, AlertContextProvider } from "utils/Context/AlertContext";
import { AlertContextInterface } from "./@types/default";
import { useContext } from "react";

function App() {

  const { openAlert, alertMsg, alertType, handleCloseAlert } = useContext(AlertContext) as AlertContextInterface;

  return (
    <div>
      <MenuDefault />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* User */}
        <Route path="/account" element={<Account />} />
        <Route path="/user/:id" element={<UserPage/>} />

        {/* Auth */}
        <Route path="/auth" element={<Auth />} />

        {/* Games */}
        <Route path="/games" element={<GamesList />} />
        <Route path="/minesweeper/*" element={<WrapperMinesweeper />} />
        <Route path="/battleship/*" element={<WrapperBattleship />} />
        <Route path="/wordle/*" element={<WrapperWordle />} />
        <Route path="/quiz/*" element={<WrapperQuiz />} />
        <Route path="/timeline/*" element={<WrapperTimeLine />} />
        <Route path="/atlas/*" element={<WrapperAtlas />} />
      </Routes>

      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertType} sx={{ width: '100%' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}

const AppWrapperContext = () => {
  return (
    <AlertContextProvider>
      <App/>
    </AlertContextProvider>
  )
}

export default AppWrapperContext;
