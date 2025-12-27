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

const WordlePlayed = ({ id }: { id: string }) => {
  const navigate = useNavigate();
    const { handleOpenAlert } = useContext(AlertContext) as AlertContextInterface;
  const [wordleHistory, setWordleHistory] = useState<FormatedScoreboard[]>();

  const getInfos = async () => {
    try {
      const wordleReq = await axios.get(`/wordle/user/${id}`);
      if (wordleReq.status === 200) {
        setWordleHistory(wordleReq.data);
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
      {wordleHistory ? (
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Wordle games</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Scoreboard data={wordleHistory} />
            </AccordionDetails>
          </Accordion>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default WordlePlayed;
