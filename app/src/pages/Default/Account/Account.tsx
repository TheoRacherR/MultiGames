import UserInfosChange from "./UserInfosChange";
import PasswordChange from "./PasswordChange";
import ContainerUserInfos from "components/ContainerUserInfos";
import { getUserInfos, verifyRole } from "utils/Default/Auth";
import { useContext, useEffect, useState } from "react";
import { country, UserInfos, userRole, userStatus } from "../../../@types/user";
import { useNavigate } from "react-router-dom";
import DesactivateAccount from "./DesactivateAccount";
import { AlertContextInterface, AlertTypeEnum } from "../../../@types/default";
import { AlertContext } from "utils/Context/AlertContext";

const Account = () => {
  document.title = "MG - Account"
  const { handleOpenAlert } = useContext(AlertContext) as AlertContextInterface;
  const [userInfos, setUserInfos] = useState<UserInfos>({
    id: "",
    email: "",
    firstname: "",
    lastname: "",
    pseudo: "",
    role: userRole.USER,
    status: userStatus.TO_ACTIVE,
    country: country.FRANCE,
  });
  const [userInfosInit, setUserInfosInit] = useState<UserInfos>({
    id: "",
    email: "",
    firstname: "",
    lastname: "",
    pseudo: "",
    role: userRole.USER,
    status: userStatus.TO_ACTIVE,
    country: country.FRANCE,
  });
  const navigate = useNavigate();

  const getLogInfos = async () => {
    try {
      const role = await verifyRole();
      if (role === "not logged") {
        handleOpenAlert(AlertTypeEnum.ERROR, `Not logged`);
        return navigate("/auth");
      }
      else {
        const userInfosResponse = await getUserInfos();
        if (!userInfosResponse) {
          handleOpenAlert(AlertTypeEnum.ERROR, `Error when loading data`);
          return navigate("/auth")
        };
        setUserInfos(userInfosResponse);
        setUserInfosInit(userInfosResponse);
      }
    } catch (e) {
      handleOpenAlert(AlertTypeEnum.ERROR, `Error when loading data`);
      return navigate("/auth");
    }
  };

  useEffect(() => {
    getLogInfos();
  }, []);

  return (
    <ContainerUserInfos>
      <>
        <UserInfosChange userInfos={userInfos} setUserInfos={setUserInfos} userInfosInit={userInfosInit}/>
        <PasswordChange/>
        <DesactivateAccount userInfos={userInfos} setUserInfos={setUserInfos} />
      </>
    </ContainerUserInfos>
  );
};

export default Account;
