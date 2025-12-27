import { useContext, useEffect, useState } from "react";
import axios from "utils/Default/axiosConfig";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../../../@types/user";
import { TextField } from "@mui/material";
import { countryObject } from "utils/Default/Default";
import { AlertContextInterface, AlertTypeEnum } from "../../../@types/default";
import { AlertContext } from "utils/Context/AlertContext";

const UserInfos = ({ id }: { id: string }) => {
  const navigate = useNavigate();
    const { handleOpenAlert } = useContext(AlertContext) as AlertContextInterface;
  const [userInfo, setUserInfo] = useState<UserProfile>();

  const getInfos = async () => {
    try {
      const userReq = await axios.get(`/user/${id}`);
      if (userReq.status === 200) {
        setUserInfo(userReq.data);
      } else {
        handleOpenAlert(AlertTypeEnum.ERROR, `Error when loading data`);
        return navigate("/");
      }
    } catch (e) {
      handleOpenAlert(AlertTypeEnum.ERROR, `Error when loading data`);
      return navigate("/");
    }
  };

  useEffect(() => {
    getInfos();
  }, []);

  return (
    <div>
      <h3>User informations: {id}</h3>

      {userInfo ? (
        <>
          <div className="my-6 flex flex-unset gap-6">
            <TextField
              disabled
              type="text"
              style={{ width: "50%", margin: 0 }}
              placeholder={"Firstname"}
              label={"Firstname"}
              value={userInfo.firstname}
            />
            <TextField
              disabled
              type="text"
              style={{ width: "50%", margin: "0 !important" }}
              placeholder={"Lastname"}
              label={"Lastname"}
              value={userInfo.lastname}
            />
          </div>

          <div className="my-6 flex flex-col">
            <TextField
              disabled
              type="mail"
              placeholder={"Mail"}
              label={"Mail"}
              value={userInfo.email}
            />
          </div>

          <div className="my-6 flex flex-unset gap-6">
            <TextField
              disabled
              type="text"
              style={{ width: "25%", margin: 0 }}
              placeholder={"Role"}
              label={"Role"}
              value={userInfo.role}
            />
            <TextField
              disabled
              type="text"
              style={{ width: "25%", margin: 0 }}
              placeholder={"Status"}
              label={"Status"}
              value={userInfo.status}
            />
            <TextField
              disabled
              type="text"
              style={{ width: "50%", margin: "0 !important" }}
              placeholder={"Country"}
              label={"Country"}
              value={`${countryObject[userInfo.country].flag} ${
                countryObject[userInfo.country].name
              }`}
            />
          </div>

          <div className="my-6 flex flex-col">
            <TextField
              disabled
              type="text"
              placeholder={"Pseudo"}
              label={"Pseudo"}
              value={userInfo.pseudo}
            />
          </div>

          <div className="my-6 flex flex-col">
            <TextField
              disabled
              type="text"
              placeholder={"Creation date"}
              label={"Creation date"}
              value={new Date(userInfo.created_at).toLocaleDateString()}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserInfos;
