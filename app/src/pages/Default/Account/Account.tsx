import UserInfosChange from "./UserInfosChange";
import PasswordChange from "./PasswordChange";

const Account = () => {

  return (
    <div className="p-10 mx-auto w-[400px]">
      <UserInfosChange/>
      <PasswordChange/>
    </div>
  );
};

export default Account;
