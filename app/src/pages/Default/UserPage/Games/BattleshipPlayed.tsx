import { FormatedScoreboard } from "../../../../@types/games";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "utils/Default/axiosConfig";
import Scoreboard from "components/Scoreboard";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AlertContextInterface, AlertTypeEnum } from "../../../../@types/default";
import { AlertContext } from "utils/Context/AlertContext";

const BattleshipPlayed = ({ id }: { id: string }) => {
  const navigate = useNavigate();
    const { handleOpenAlert } = useContext(AlertContext) as AlertContextInterface;
  const [battleshipHistory, setBattleshipHistory] =
    useState<FormatedScoreboard[]>();

  const getInfos = async () => {
    try {
      const battleshipReq = await axios.get(`/battleship-elo/user/${id}`);
      if (battleshipReq.status === 200) {
        setBattleshipHistory(battleshipReq.data);
      } else {
        handleOpenAlert(AlertTypeEnum.ERROR, `Error when loading data`);
        return navigate("/");
      }
    } catch (e) {
      handleOpenAlert(AlertTypeEnum.ERROR, `Error when loading data`);
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
