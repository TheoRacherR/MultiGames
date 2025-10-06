import { Button, LinearProgress, TextField, Typography, Select, MenuItem } from "@mui/material";
import axios from "../../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { country } from "../../../@types/user";
import { mailRegex, minLengthPassword } from "../../../utils/Default/Auth";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import InputAdornment from '@mui/material/InputAdornment';
import { countryList, countryObject } from "../../../utils/Default/Default";

const RegisterForm = ({ handleSwitchForm }: { handleSwitchForm: Function }) => {
  const navigate = useNavigate();
  const [valuesRegister, setValuesRegister] = useState<{
    firstname: string;
    lastname: string;
    mail: string;
    password: string;
    confirmPassword: string;
    pseudo: string;
    country: string;
  }>({
    firstname: "Theo",
    lastname: "RACHER RAULIN",
    mail: "theo@gmail.com",
    password: "root",
    confirmPassword: "root",
    pseudo: "TheoRR",
    country: country.FRANCE,
  });
  const [error, setError] = useState<{
    passwordCooherence: boolean;
    emailAlreadyUsed: boolean;
    not_email: boolean;
  }>({ passwordCooherence: false, emailAlreadyUsed: false, not_email: false });

  const handleRegister = async () => {
    if(valuesRegister.mail.length === 0 || valuesRegister.password.length === 0 || valuesRegister.confirmPassword.length === 0) return;
    if(valuesRegister.password !== valuesRegister.confirmPassword) return setError({ ...error, passwordCooherence: true }); 

    if (mailRegex.test(valuesRegister.mail)) return setError({ ...error, not_email: true });

    setError({ passwordCooherence: false, emailAlreadyUsed: false, not_email: false });
    try {
      await axios.post("/auth/register/", {
        firstname: valuesRegister.firstname,
        lastname: valuesRegister.lastname,
        email: valuesRegister.mail,
        password: valuesRegister.password,
        pseudo: valuesRegister.pseudo,
        country: valuesRegister.country,
      });
      return navigate("/");
      // TODO Alerte d'inscription
    } catch (e: any) {
      // TODO Alerte d'erreur d'inscription
      if (e.response) {
        if (e.response.status === 409)
          setError({ ...error, emailAlreadyUsed: true });
        else {
          console.log(e.response);
        }
      } else {
        console.log(e);
      }
    }
  };

  return (
    <div className="p-10 mx-auto w-[400px]">
      <div>
        {/* firstname / lastname */}
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

        {/* mail */}
        <div className="my-6 flex flex-col">
          <TextField
            type="mail"
            placeholder={"mail.placeholder"}
            // startDecorator={<EmailRoundedIcon />}
            error={error.emailAlreadyUsed}
            value={valuesRegister.mail}
            onChange={(e) =>
              setValuesRegister((prev) => ({ ...prev, mail: e.target.value }))
            }
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">
                    {
                      mailRegex.test(valuesRegister.mail) ?
                      <CheckCircleRoundedIcon color='success' />
                      :
                      <CancelRoundedIcon color='error'/>
                    }
                  </InputAdornment>
                ),
              },
            }}
          />
          {error.emailAlreadyUsed ? (
            <div style={{ color: "red" }}>{"mail.error"}</div>
          ) : (
            <></>
          )}
        </div>

        {/* pseudo / country */}
        <div className="my-6 flex flex-unset gap-6">
          <TextField
            type="text"
            style={{ width: "70%", margin: 0 }}
            placeholder={"pseudo"}
            value={valuesRegister.pseudo}
            onChange={(e) =>
              setValuesRegister((prev) => ({
                ...prev,
                pseudo: e.target.value,
              }))
            }
          />
          <Select
            value={valuesRegister.country}
            style={{ width: "30%", margin: 0 }}
            onChange={(e: any) => {
              setValuesRegister((prev) => ({
                ...prev,
                country: e.target.value,
              }));
              console.log(valuesRegister);
              console.log(e.target.value);
            }}
          >
            {countryList.map((key) => (
              <MenuItem key={key} value={key}>
                {countryObject[key].flag} {countryObject[key].name}
              </MenuItem>
            ))}
          </Select>
        </div>

        {/* password */}
        <div className="my-6 flex flex-col">
          <TextField
            type="password"
            placeholder={"password.placeholder"}
            // startDecorator={<Key />}
            error={error.passwordCooherence}
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
              (valuesRegister.password.length * 100) / minLengthPassword,
              100
            )}
            style={{
              color: "hsl(var(--hue) 80% 40%)",
              backgroundColor: "background.level3",
            }}
          />
          <Typography
            style={{ alignSelf: "flex-end", color: "hsl(var(--hue) 80% 30%)" }}
          >
            {valuesRegister.password.length < 3 && "very weak"}
            {valuesRegister.password.length >= 3 &&
              valuesRegister.password.length < 6 &&
              "weak"}
            {valuesRegister.password.length >= 6 &&
              valuesRegister.password.length < 10 &&
              "strong"}
            {valuesRegister.password.length >= 10 && "very strong"}
          </Typography>
        </div>

        {/* confirm password */}
        <div className="my-6 flex flex-col">
          <TextField
            type="password"
            placeholder={"password.confirm_placeholder"}
            // startDecorator={<Key />}
            error={error.passwordCooherence}
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
            value={Math.min(
              (valuesRegister.confirmPassword.length * 100) / minLengthPassword,
              100
            )}
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
            <div style={{ color: "red" }}>{"confirm password should be the same as the password"}</div>
          ) : (
            <></>
          )}
        </div>

        {/* submit button */}
        <Button
          style={{ margin: "10px 0", width: "100%" }}
          onClick={handleRegister}
          variant="contained"
          disabled={
            valuesRegister.mail.length === 0 ||
            valuesRegister.password.length === 0 ||
            valuesRegister.confirmPassword.length === 0
          }
        >
          {"Submit"}
        </Button>
      </div>

      <div>
        <Typography
          style={{ color: "hsl(var(--hue) 80% 30%)" }}
        >
          Have account ? 
          <span
            style={{ color: "#ed6c0280", cursor: "pointer" }}
            onClick={() => handleSwitchForm(0)}
          >
            click here
          </span>
        </Typography>
      </div>
    </div>
  );
};

export default RegisterForm;
