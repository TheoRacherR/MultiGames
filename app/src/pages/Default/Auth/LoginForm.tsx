import { useContext, useState } from "react";
import axios from "utils/Default/axiosConfig";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  createEntitesAtLogin,
  getUserInfos,
  mailRegex,
} from "utils/Default/Auth";
import ContainerUserInfos from "components/ContainerUserInfos";
import { userStatus } from "../../../@types/user";
import { AlertContextInterface, AlertTypeEnum } from "../../../@types/default";
import { AlertContext } from "utils/Context/AlertContext";

const LoginForm = ({ handleSwitchForm }: { handleSwitchForm: Function }) => {
  document.title = "MG - Login"
  const navigate = useNavigate();
  const { handleOpenAlert } = useContext(AlertContext) as AlertContextInterface;

  const [valuesLogin, setValuesLogin] = useState<{
    mail: string;
    password: string;
  }>({ mail: "", password: "" });

  const handleLogin = async () => {
    if (valuesLogin.mail.length === 0 || valuesLogin.password.length === 0)
      return;
    setError({ credentials: false, not_email: false });

    if (mailRegex.test(valuesLogin.mail)) {
      try {
        const res = await axios.post("/auth/login/", {
          email: valuesLogin.mail,
          password: valuesLogin.password,
        });
        localStorage.setItem("jwtToken", res.data);
        console.log("update jwt");
        const usrInfos = await getUserInfos();
        if (usrInfos) {
          if (usrInfos.status === userStatus.BANNED) {
            handleOpenAlert(AlertTypeEnum.ERROR, `Error: User banned`);
            setValuesLogin({ mail: "", password: "" });
            console.log("user banned");
            return;
          } else {
            createEntitesAtLogin(usrInfos.id);
          }
        }
        return navigate("/");
      } catch (e) {
        handleOpenAlert(AlertTypeEnum.ERROR, `Error when loading data`);
        console.log(e);
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
    <ContainerUserInfos>
      <>
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
                setValuesLogin((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
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
          <div style={{ color: "red" }}>Email or Password wrong</div>
        ) : error.not_email ? (
          <div style={{ color: "red" }}>Email Error</div>
        ) : (
          <></>
        )}
        <div>
          <Typography style={{ color: "hsl(var(--hue) 80% 30%)" }}>
            Don't have account ?
            <span
              style={{ color: "#ed6c0280", cursor: "pointer" }}
              onClick={() => handleSwitchForm(1)}
            >
              click here
            </span>
          </Typography>
        </div>
      </>
    </ContainerUserInfos>
  );
};

export default LoginForm;
