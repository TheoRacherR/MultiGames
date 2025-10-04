import { MenuItem, Select, TextField, Button } from '@mui/material';
import { country, UserInfos, userRole } from '../../../@types/user';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfos, verifyRole } from '../../../utils/Default/Auth';
import axios from '../../../axiosConfig';

const UserInfosChange = () => {
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [userInfos, setUserInfos] = useState<UserInfos>({
    id: "",
    email: "",
    firstname: "",
    lastname: "",
    pseudo: "",
    role: userRole.USER,
    country: country.FRANCE,
  });
  const [userInfosInit, setUserInfosInit] = useState<UserInfos>({
    id: "",
    email: "",
    firstname: "",
    lastname: "",
    pseudo: "",
    role: userRole.USER,
    country: country.FRANCE,
  });
  const [errors, setErrors] = useState<{mailFormat: boolean}>({ mailFormat: false })

  const navigate = useNavigate();

  const getLogInfos = async () => {
    console.log("test");
    try {
      const role = await verifyRole();
      if (role === "not logged") return navigate("/auth");
      // TODO Alerte d'erreur pas connecté
      else {
        const userInfosResponse = await getUserInfos();
        if (!userInfosResponse) return navigate("/auth");
        setUserInfos(userInfosResponse);
        setUserInfosInit(userInfosResponse);
      }
    } catch (e) {
      return navigate("/auth");
      // TODO Alerte d'erreur de récupération des infos du user
    }
  };

  useEffect(() => {
    getLogInfos();
  }, []);

  const handleUpdateUserInfos = async () => {
    if (!mailRegex.test(userInfos.email)) {
      // TODO Alerte mauvais format de mail
      setErrors({...errors, mailFormat: true})
      return
    };
    setErrors({...errors, mailFormat: false})
    try {
      if (JSON.stringify(userInfos) === JSON.stringify(userInfosInit)) return;
      const res = await axios.patch(`/user/info/${userInfos.id}`, {
        firstname: userInfos.firstname,
        lastname: userInfos.lastname,
        email: userInfos.email,
        pseudo: userInfos.pseudo,
        country: userInfos.country,
      });
      console.log(res)
      if(res.status === 200) {
        // TODO Alerte infos mis à jour
        // res.data.message
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      {/* Firstname / Lastname */}
      <div className="my-6 flex flex-unset gap-6">
        <TextField
          type="text"
          style={{ width: "50%", margin: 0 }}
          placeholder={"firstname"}
          value={userInfos.firstname}
          onChange={(e) => {
            setUserInfos((prev) => ({
              ...prev,
              firstname: e.target.value,
            }));
          }}
        />
        <TextField
          type="text"
          style={{ width: "50%", margin: "0 !important" }}
          placeholder={"lastname"}
          value={userInfos.lastname}
          onChange={(e) => {
            setUserInfos((prev) => ({
              ...prev,
              lastname: e.target.value,
            }));
          }}
        />
      </div>

      <div className="my-6 flex flex-col">
        <TextField
          type="mail"
          placeholder={"mail"}
          error={errors.mailFormat}
          value={userInfos.email}
          onChange={(e) => {
            if (mailRegex.test(e.target.value)) setErrors({...errors, mailFormat: false});
            setUserInfos((prev) => ({
              ...prev,
              email: e.target.value,
            }));
          }}
        />
        {errors.mailFormat
        ? <div style={{ color: "red" }}>Email Format Error</div>
        : <></>
        }
      </div>

      <div className="my-6 flex flex-unset gap-6">
        <TextField
          type="text"
          style={{ width: "50%", margin: 0 }}
          placeholder={"pseudo"}
          value={userInfos.pseudo}
          onChange={(e) => {
            setUserInfos((prev) => ({
              ...prev,
              pseudo: e.target.value,
            }));
          }}
        />
        <Select
          value={userInfos.country}
          style={{ width: "50%", margin: 0 }}
          onChange={(e: any) => {
            setUserInfos((prev) => ({
              ...prev,
              country: e.target.value,
            }));
          }}
        >
          {Object.keys(country).map((key) => (
            <MenuItem key={key} value={country[key as keyof typeof country]}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </div>
      <Button
        style={{ margin: "10px 0", width: "100%" }}
        onClick={handleUpdateUserInfos}
        variant="contained"
        disabled={JSON.stringify(userInfos) === JSON.stringify(userInfosInit)}
      >
        Submit
      </Button>
    </div>
  )
}

export default UserInfosChange