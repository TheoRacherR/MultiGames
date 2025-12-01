import { FormatedScoreboard } from "../../../../@types/games";
import { useEffect, useState } from "react";
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

const QuizPlayed = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const [quizHistory, setQuizHistory] = useState<FormatedScoreboard[]>();

  const getInfos = async () => {
    try {
      const quizReq = await axios.get(`/quiz/user/${id}`);
      if (quizReq.status === 200) {
        setQuizHistory(quizReq.data);
      } else {
        // TODO Alerte quiz history not found
        return navigate("/");
      }
    } catch (e) {
      // TODO Alerte quiz history not found
      return navigate("/");
    }
  };

  useEffect(() => {
    getInfos();
  }, []);

  return (
    <>
      {quizHistory ? (
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Quiz games</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Scoreboard data={quizHistory} />
            </AccordionDetails>
          </Accordion>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default QuizPlayed;
