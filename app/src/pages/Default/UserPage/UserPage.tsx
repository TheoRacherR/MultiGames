import { useParams } from "react-router-dom";
import UserInfos from "./UserInfos";
import WordlePlayed from "./Games/WordlePlayed";
import BattleshipPlayed from "./Games/BattleshipPlayed";
import MinesweeperPlayed from "./Games/MinesweeperPlayed";
import QuizPlayed from "./Games/QuizPlayed";
import ContainerUserInfos from "components/ContainerUserInfos";

const UserPage = () => {
  const { id } = useParams();

  return (
    <ContainerUserInfos>
      {id ? (
        <>
          <UserInfos id={id} />

          <h3>Games history</h3>
          <div>
            <WordlePlayed id={id} />
            <BattleshipPlayed id={id} />
            <MinesweeperPlayed id={id} />
            <QuizPlayed id={id} />
          </div>
        </>
      ) : (
        <></>
      )}
    </ContainerUserInfos>
  );
};

export default UserPage;
