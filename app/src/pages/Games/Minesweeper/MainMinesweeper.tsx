import "./MainMinesweeper.css";
import Scoreboard from "../../../components/Scoreboard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../axiosConfig";
import { FormatedScoreboard } from "../../../@types/games";

const choices: { type: string; text: string }[] = [
  { type: "create", text: "Create a party" },
  // {type: 'join',text: 'Join a party'}
];

const MainMinesweeper = () => {
  const navigate = useNavigate();
    const [dataScoreboard, setDataScoreboard] = useState<FormatedScoreboard[]>([]);

  const getScoreboardInfos = async () => {
    try {
      const req = await axios.post('/minesweeper/scoreboard', {
        length: 5
      })
      if(req.status === 201) {
        setDataScoreboard(req.data);
        return;
      }
      else {
        // TODO Alerte error
      }
    }
    catch (e) {
      console.log(e)
      // TODO Alerte error
    }
  }

  useEffect(() => {
    getScoreboardInfos();
  }, [])

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
      <div>
        <h2 className="text-center">Scoreboard :</h2>
        <Scoreboard data={dataScoreboard} />
      </div>
    </div>
  );
};

export default MainMinesweeper;
