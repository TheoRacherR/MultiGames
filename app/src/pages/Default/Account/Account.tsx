import UserInfosChange from "./UserInfosChange";
import PasswordChange from "./PasswordChange";
import ContainerUserInfos from "components/ContainerUserInfos";

const Account = () => {

  return (
    <ContainerUserInfos>
      <>
        <UserInfosChange/>
        <PasswordChange/>
      </>
    </ContainerUserInfos>
  );
};

export default Account;
