import { FormatedScoreboard } from "../../../../@types/games";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axiosConfig";
import Scoreboard from "components/Scoreboard";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const BattleshipPlayed = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const [battleshipHistory, setBattleshipHistory] =
    useState<FormatedScoreboard[]>();

  const getInfos = async () => {
    try {
      const battleshipReq = await axios.get(`/battleship-elo/user/${id}`);
      if (battleshipReq.status === 200) {
        setBattleshipHistory(battleshipReq.data);
      } else {
        // TODO Alerte battleship history not found
        return navigate("/");
      }
    } catch (e) {
      // TODO Alerte battleship history not found
      return navigate("/");
    }
  };

  useEffect(() => {
    getInfos();
  }, []);

  return (
    <>
      {battleshipHistory ? (
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Battleship games</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Scoreboard data={battleshipHistory} />
            </AccordionDetails>
          </Accordion>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default BattleshipPlayed;
