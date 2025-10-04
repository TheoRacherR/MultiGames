import "./MainMinesweeper.css";
import Scoreboard from "../../../components/Scoreboard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const choices: { type: string; text: string }[] = [
  { type: "create", text: "Create a party" },
  // {type: 'join',text: 'Join a party'}
];

const data = [
  { user: "Theo", score: 394 },
  { user: "Léon", score: 96 },
  { user: "Franck", score: 374 },
  { user: "Theo", score: 5843 },
  { user: "Theo", score: 895 },
];

const MainMinesweeper = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="my-5 mx-auto" style={{ width: 700 }}>
      <h1 className="text-6xl text-center mb-14">💣 Minesweeper 💣</h1>

      <div className="w-2/3 h-500px mx-auto mb-28 flex justify-around">
        {choices.map((item, index) => (
          <div key={index}>
            <div
              id="toclick"
              className="rounded-md p-3 text-xl text-center my-auto cursor-pointer relative"
              style={{
                top: 35,
                left: -10,
                backgroundColor: "#B85656",
                color: "white",
                userSelect: "none",
              }}
              onClick={() => navigate("game")}
            >
              {item.text}
            </div>
            <div
              className="rounded-md p-3 text-xl text-center my-auto cursor-pointer"
              style={{ backgroundColor: "#914343", color: "#914343" }}
            >
              {item.text}
            </div>
          </div>
        ))}
      </div>
      <Scoreboard data={data}/>
    </div>
  );
};

export default MainMinesweeper;
