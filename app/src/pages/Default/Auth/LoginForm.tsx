import { useState } from "react";
import axios from "../../../axiosConfig";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ handleSwitchForm }: { handleSwitchForm: Function }) => {
  const navigate = useNavigate();

  const [valuesLogin, setValuesLogin] = useState<{
    mail: string;
    password: string;
  }>({ mail: "", password: "" });

  const handleLogin = async () => {
    setError({ credentials: false, not_email: false });

    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (mailRegex.test(valuesLogin.mail)) {
      try {
        const res = await axios.post("/auth/login/", {
          email: valuesLogin.mail,
          password: valuesLogin.password,
        });
        localStorage.setItem("jwtToken", res.data);
        console.log("update jwt");
        return navigate("/");
      } catch (e) {
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
      <div className="">
        <div className="my-6 flex flex-col">
          <TextField
            type="mail"
            placeholder={"mail"}
            value={valuesLogin.mail}
            onChange={(e) => setValuesLogin((prev) => ({ ...prev, mail: e.target.value }))}
          />
        </div>
        <div className="my-6 flex flex-col">
          <TextField
            type="password"
            placeholder={"password"}
            value={valuesLogin.password}
            onChange={(e) => setValuesLogin((prev) => ({ ...prev, password: e.target.value }))}
          />
        </div>
        <Button
          style={{ margin: "10px 0", width: "100%" }}
          onClick={handleLogin}
          disabled={valuesLogin.mail.length === 0 || valuesLogin.password.length === 0}> button_login
        </Button>
      </div>
      {error.credentials ? (
        <div style={{ color: "red" }}>error</div>
      ) : error.not_email ? (
        <div style={{ color: "red" }}>not_email</div>
      ) : (
        <></>
      )}
      <div>
        have_account
        <span
          style={{ color: "#ed6c0280", cursor: "pointer" }}
          onClick={() => handleSwitchForm(1)}
        >
          click
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
