import UserInfosChange from "./UserInfosChange";
import PasswordChange from "./PasswordChange";
import ContainerUserInfos from "components/ContainerUserInfos";
import { getUserInfos, verifyRole } from "utils/Default/Auth";
import { useEffect, useState } from "react";
import { country, UserInfos, userRole, userStatus } from "../../../@types/user";
import { useNavigate } from "react-router-dom";
import DesactivateAccount from "./DesactivateAccount";

const Account = () => {
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
