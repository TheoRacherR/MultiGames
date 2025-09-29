import { Button, InputAdornment, LinearProgress, TextField, Typography } from "@mui/material";
import axios from "../../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterForm = ({ handleSwitchForm }: { handleSwitchForm: Function }) => {
  const navigate = useNavigate();
  const [valuesRegister, setValuesRegister] = useState<{
    firstname: string;
    lastname: string;
    mail: string;
    password: string;
    confirmPassword: string;
  }>({
    firstname: "",
    lastname: "",
    mail: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<{
    passwordCooherence: boolean;
    emailAlreadyUsed: boolean;
  }>({ passwordCooherence: false, emailAlreadyUsed: false });

  const minLength: number = 12;

  const handleRegister = async () => {
    setError({ passwordCooherence: false, emailAlreadyUsed: false });
    try {
      await axios.post("/auth/register/", {
        firstname: valuesRegister.firstname,
        lastname: valuesRegister.lastname,
        email: valuesRegister.mail,
        password: valuesRegister.password,
      });
      return navigate("/");
    } catch (e: any) {
      if (e.response.status === 409)
        setError({ passwordCooherence: false, emailAlreadyUsed: true });
      else {
        console.log(e.response);
      }
    }
  };

  return (
    <div className="p-10 mx-auto w-[400px]">
      <div>
        <div className="my-6 flex flex-unset gap-6">
          <TextField
            type="text"
            style={{ width: "50%", margin: 0 }}
            placeholder={"firstname"}
            // startDecorator={<EmailRoundedIcon />}
            value={valuesRegister.firstname}
            onChange={(e) =>
              setValuesRegister((prev) => ({
                ...prev,
                firstname: e.target.value,
              }))
            }
          />
          <TextField
            type="text"
            style={{ width: "50%", margin: "0 !important" }}
            placeholder={"lastname"}
            // startDecorator={<EmailRoundedIcon />}
            value={valuesRegister.lastname}
            onChange={(e) =>
              setValuesRegister((prev) => ({
                ...prev,
                lastname: e.target.value,
              }))
            }
          />
        </div>

        <div className="my-6 flex flex-col">
          <TextField
            type="mail"
            placeholder={"mail.placeholder"}
            // startDecorator={<EmailRoundedIcon />}
            value={valuesRegister.mail}
            onChange={(e) =>
              setValuesRegister((prev) => ({ ...prev, mail: e.target.value }))
            }
          />
          {error.emailAlreadyUsed ? (
            <div style={{ color: "red" }}>{"mail.error"}</div>
          ) : (
            <></>
          )}
        </div>

        <div className="my-6 flex flex-col">
          <TextField
            type="password"
            placeholder={"password.placeholder"}
            // startDecorator={<Key />}
            value={valuesRegister.password}
            onChange={(e) =>
              setValuesRegister((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
          <LinearProgress
            variant="determinate"
            value={Math.min(
              (valuesRegister.password.length * 100) / minLength,
              100
            )}
            style={{color: "hsl(var(--hue) 80% 40%)", backgroundColor: "background.level3"}}
          />
          <Typography
            style={{ alignSelf: "flex-end", color: "hsl(var(--hue) 80% 30%)" }}
          >
            {valuesRegister.password.length < 3 && "very_weak"}
            {valuesRegister.password.length >= 3 &&
              valuesRegister.password.length < 6 &&
              "weak"}
            {valuesRegister.password.length >= 6 &&
              valuesRegister.password.length < 10 &&
              "strong"}
            {valuesRegister.password.length >= 10 && "very_strong"}
          </Typography>
        </div>

        <div className="my-6 flex flex-col">
          <TextField
            type="password"
            placeholder={"password.confirm_placeholder"}
            // startDecorator={<Key />}
            value={valuesRegister.confirmPassword}
            onChange={(e) =>
              setValuesRegister((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
          />
          <LinearProgress
            variant="determinate"
            value={Math.min((valuesRegister.confirmPassword.length * 100) / minLength, 100)}
            style={{
              backgroundColor: "background.level3",
              color: "hsl(var(--hue) 80% 40%)",
            }}
          />

          <Typography
            style={{ alignSelf: "flex-end", color: "hsl(var(--hue) 80% 30%)" }}
          >
            {valuesRegister.password.length < 3 && "very_weak"}
            {valuesRegister.password.length >= 3 &&
              valuesRegister.password.length < 6 &&
              "weak"}
            {valuesRegister.password.length >= 6 &&
              valuesRegister.password.length < 10 &&
              "strong"}
            {valuesRegister.password.length >= 10 && "very_strong"}
          </Typography>
          {error.passwordCooherence ? (
            <div style={{ color: "red" }}>{"password error"}</div>
          ) : (
            <></>
          )}
        </div>

        <Button
          style={{ margin: "10px 0", width: "100%" }}
          onClick={handleRegister}
          variant="contained"
          disabled={
            valuesRegister.mail.length === 0 ||
            valuesRegister.password.length === 0 ||
            valuesRegister.confirmPassword.length === 0
              ? true
              : false
          }
        >
          {"button_submit"}
        </Button>
      </div>
      <div>
        {"have_account"}{" "}
        <span
          style={{ color: "#ed6c0280", cursor: "pointer" }}
          onClick={() => handleSwitchForm(0)}
        >
          {"click"}
        </span>
      </div>
    </div>
  );
};

export default RegisterForm;
