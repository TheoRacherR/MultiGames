import { Button, LinearProgress, TextField, Typography } from '@mui/material';
import { getUserInfos, minLengthPassword, verifyRole } from '../../../utils/Default/Auth';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PasswordChange = () => {
  const navigate = useNavigate();
  const [userPassword, setUserPassword] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState<boolean>(false);

  const handleUpdateUserPassword = async () => {
    if(userPassword.password !== userPassword.confirmPassword) {
      setError(true);
      return;
    }
    setError(false);
    let userID = '';
    try {
      const role = await verifyRole();
      if (role === "not logged") return navigate("/auth");
      // TODO Alerte d'erreur pas connecté
      else {
        const userInfosResponse = await getUserInfos();
        if (!userInfosResponse) return navigate("/auth");
        userID = userInfosResponse.id;
      }
    } catch (e) {
      return navigate("/auth");
      // TODO Alerte d'erreur de récupération des infos du user
    }
    try {
    const res = await axios.patch(`/user/password/${userID}`, {
      password: userPassword.password,
    });
    console.log(res)
    if(res.status === 200) {
      // TODO Alerte infos mis à jour
      // res.data.message
      setUserPassword({
        password: '',
        confirmPassword: ''
      })
    }
  } catch (e) {
    console.log(e);
  }
    
  }
  return (
    <div>
      <div className="my-6 flex flex-col">
        <TextField
          type="password"
          style={{ margin: 0 }}
          placeholder={"password"}
          value={userPassword.password}
          onChange={(e) => {
            setUserPassword((prev) => ({
              ...prev,
              password: e.target.value,
            }));
          }}
        />
        <LinearProgress
          variant="determinate"
          value={Math.min(
            (userPassword.password.length * 100) / minLengthPassword,
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
          {userPassword.password.length < 3 && "very_weak"}
          {userPassword.password.length >= 3 &&
            userPassword.password.length < 6 &&
            "weak"}
          {userPassword.password.length >= 6 &&
            userPassword.password.length < 10 &&
            "strong"}
          {userPassword.password.length >= 10 && "very_strong"}
        </Typography>
      </div>
      <div className="my-6 flex flex-col">
        <TextField
          type="password"
          style={{ margin: "0 !important" }}
          placeholder={"confirm password"}
          value={userPassword.confirmPassword}
          onChange={(e) => {
            setUserPassword((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }));
          }}
        />
        <LinearProgress
          variant="determinate"
          value={Math.min(
            (userPassword.confirmPassword.length * 100) / minLengthPassword,
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
          {userPassword.confirmPassword.length < 3 && "very weak"}
          {userPassword.confirmPassword.length >= 3 &&
            userPassword.confirmPassword.length < 6 &&
            "weak"}
          {userPassword.confirmPassword.length >= 6 &&
            userPassword.confirmPassword.length < 10 &&
            "strong"}
          {userPassword.confirmPassword.length >= 10 && "very strong"}
        </Typography>
        {error ? (
          <div style={{ color: "red" }}>{"confirm password should be the same as the password"}</div>
        ) : (
          <></>
        )}
        </div>

      <Button
        style={{ margin: "10px 0", width: "100%" }}
        onClick={handleUpdateUserPassword}
        variant="contained"
        disabled={userPassword.password !== userPassword.confirmPassword || userPassword.password.length === 0 || userPassword.confirmPassword.length === 0}
      >
        {"button_submit"}
      </Button>
    </div>
  )
}

export default PasswordChange