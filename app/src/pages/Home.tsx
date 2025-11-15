import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={`w-full bg-[--color-primary] h-screen`}>
      <div className="min-w-[400px] flex flex-col m-auto text-center pt-[150px]">
        <h1
          className={`text-[140px] font-bold text-center`}
          style={{ color: "var(--color-text-primary)" }}
        >
          MULTI
        </h1>
        <h1
          className={`text-[140px] font-bold text-center -mt-20`}
          style={{ color: "var(--color-text-primary)" }}
        >
          GAMES
        </h1>
        <div key={"button_homepage"}>
          <button
            onClick={() => navigate("/games")}
            className={`btn-large-rounded btn-outline font-bold`}
            style={{
              borderColor: "var(--color-text-primary)",
              color: "var(--color-text-primary)",
            }}
          >
            PLAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
