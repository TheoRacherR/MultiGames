import { MenuItem, Select, TextField, Button } from "@mui/material";
import { UserInfos } from "../../../@types/user";
import { useState } from "react";
import { mailRegex } from "utils/Default/Auth";
import axios from "utils/Default/axiosConfig";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import InputAdornment from "@mui/material/InputAdornment";
import { countryList, countryObject } from "utils/Default/Default";

const UserInfosChange = ({
  userInfos,
  setUserInfos,
  userInfosInit,
}: {
  userInfos: UserInfos;
  setUserInfos: React.Dispatch<React.SetStateAction<UserInfos>>;
  userInfosInit: UserInfos;
}) => {
  const [errors, setErrors] = useState<{ mailFormat: boolean }>({
    mailFormat: false,
  });

  const handleUpdateUserInfos = async () => {
    if (!mailRegex.test(userInfos.email)) {
      // TODO Alerte mauvais format de mail
      setErrors({ ...errors, mailFormat: true });
      return;
    }
    setErrors({ ...errors, mailFormat: false });
    try {
      if (JSON.stringify(userInfos) === JSON.stringify(userInfosInit)) return;
      const res = await axios.patch(`/user/info/${userInfos.id}`, {
        firstname: userInfos.firstname,
        lastname: userInfos.lastname,
        email: userInfos.email,
        pseudo: userInfos.pseudo,
        country: userInfos.country,
      });
      console.log(res);
      if (res.status === 200) {
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
            if (mailRegex.test(e.target.value))
              setErrors({ ...errors, mailFormat: false });
            setUserInfos((prev) => ({
              ...prev,
              email: e.target.value,
            }));
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="start">
                  {mailRegex.test(userInfos.email) ? (
                    <CheckCircleRoundedIcon color="success" />
                  ) : (
                    <CancelRoundedIcon color="error" />
                  )}
                </InputAdornment>
              ),
            },
          }}
        />
        {errors.mailFormat ? (
          <div style={{ color: "red" }}>Email Format Error</div>
        ) : (
          <></>
        )}
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
          {countryList.map((key) => (
            <MenuItem key={key} value={key}>
              {countryObject[key].flag} {countryObject[key].name}
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
        Submit changes
      </Button>
    </div>
  );
};

export default UserInfosChange;
