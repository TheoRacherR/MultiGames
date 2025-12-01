import { MinesweeperFormatedScoreboard } from "../../../../@types/minesweeper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "utils/Default/axiosConfig";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Scoreboard from "components/Scoreboard";
import { FormatedScoreboard } from "../../../../@types/games";

const MinesweeperPlayed = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const [minesweeperHistory, setMinesweeperHistory] =
    useState<FormatedScoreboard[]>();

  const getInfos = async () => {
    try {
      const minesweeperReq = await axios.get(`/minesweeper/user/${id}`);
      if (minesweeperReq.status === 200) {
        setMinesweeperHistory(minesweeperReq.data);
      } else {
        // TODO Alerte minesweeper history not found
        return navigate("/");
      }
    } catch (e) {
      // TODO Alerte minesweeper history not found
      return navigate("/");
    }
  };

  useEffect(() => {
    getInfos();
  }, []);

  return (
    <>
      {minesweeperHistory ? (
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Minesweeper games</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Scoreboard data={minesweeperHistory} />
            </AccordionDetails>
          </Accordion>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MinesweeperPlayed;
