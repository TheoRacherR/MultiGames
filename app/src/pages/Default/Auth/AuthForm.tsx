import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
const AuthForm = () => {
  const [value, setValue] = useState<number>(0);

  const handleSwitchForm = (id: number) => {
    setValue(id);
  };

  return (
    <div className="p-[40pxpx] flex">
      {value === 0 ? (
        <LoginForm handleSwitchForm={handleSwitchForm} />
      ) : (
        <RegisterForm handleSwitchForm={handleSwitchForm} />
      )}
    </div>
  );
};

export default AuthForm;
