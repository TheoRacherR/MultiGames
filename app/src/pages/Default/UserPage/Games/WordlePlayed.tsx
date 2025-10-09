import { FormatedScoreboard } from "../../../../@types/games";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../../axiosConfig";
import Scoreboard from "../../../../components/Scoreboard";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const WordlePlayed = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const [wordleHistory, setWordleHistory] = useState<FormatedScoreboard[]>();

  const getInfos = async () => {
    try {
      const wordleReq = await axios.get(`/wordle/user/${id}`);
      if (wordleReq.status === 200) {
        setWordleHistory(wordleReq.data);
      } else {
        // TODO Alerte wordle history not found
        return navigate("/");
      }
    } catch (e) {
      // TODO Alerte wordle history not found
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
