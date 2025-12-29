import { verifyIfLogged } from "utils/Default/Auth";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Auth = () => {
  
  const navigate = useNavigate();
  const checkIfLogged = async () => {
    const logged = await verifyIfLogged();
    if (logged) {
      console.log("Logged, redirect");
      return navigate("/");
    }
  };

  useEffect(() => {
    checkIfLogged();
  });

  return (
    <div className="">
      <div className="w-screen my-0 mx-auto pt-[10vh]">
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;