import { useState } from "react";
import axios from "../../../axiosConfig";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { mailRegex } from "../../../utils/Default/Auth";

const LoginForm = ({ handleSwitchForm }: { handleSwitchForm: Function }) => {
  const navigate = useNavigate();

  const [valuesLogin, setValuesLogin] = useState<{
    mail: string;
    password: string;
  }>({ mail: "", password: "" });

  const handleLogin = async () => {
    if(valuesLogin.mail.length === 0 || valuesLogin.password.length === 0) return;
    setError({ credentials: false, not_email: false });

    if (mailRegex.test(valuesLogin.mail)) {
      try {
        const res = await axios.post("/auth/login/", {
          email: valuesLogin.mail,
          password: valuesLogin.password,
        });
        localStorage.setItem("jwtToken", res.data);
        console.log("update jwt");
        // TODO Alerte de connexion
        return navigate("/");
      } catch (e) {
        // TODO Alerte d'erreur de connexion
        console.log(e)
        setError({ ...error, credentials: true });
      }
    } else {
      setError({ ...error, not_email: true });
    }
  };
  const [error, setError] = useState<{
    credentials: boolean;
    not_email: boolean;
  }>({
    credentials: false,
    not_email: false,
  });

  return (
    <div className="p-10 mx-auto w-[400px]">
      <div>

        {/* mail */}
        <div className="my-6 flex flex-col">
          <TextField
            type="mail"
            placeholder={"mail"}
            value={valuesLogin.mail}
            onChange={(e) =>
              setValuesLogin((prev) => ({ ...prev, mail: e.target.value }))
            }
          />
        </div>

        {/* password */}
        <div className="my-6 flex flex-col">
          <TextField
            type="password"
            error={error.not_email}
            placeholder={"password"}
            value={valuesLogin.password}
            onChange={(e) =>
              setValuesLogin((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          {error.not_email ? (
            <div style={{ color: "red" }}>Email Error</div>
          ) : (
            <></>
          )}
        </div>

        {/* login button */}
        <Button
          style={{ margin: "10px 0", width: "100%" }}
          variant="contained"
          onClick={handleLogin}
          disabled={
            valuesLogin.mail.length === 0 || valuesLogin.password.length === 0
          }
        >
          {" "}
          Login
        </Button>
      </div>

      {/* errors */}
      {error.credentials ? (
        <div style={{ color: "red" }}>Credentials Error</div>
      ) : error.not_email ? (
        <div style={{ color: "red" }}>Email Error</div>
      ) : (
        <></>
      )}
      <div>
        <Typography
          style={{ color: "hsl(var(--hue) 80% 30%)" }}
        >
          Don't have account ? 
          <span
            style={{ color: "#ed6c0280", cursor: "pointer" }}
            onClick={() => handleSwitchForm(1)}
          >
            click here
          </span>
        </Typography>
      </div>
    </div>
  );
};

export default LoginForm;
