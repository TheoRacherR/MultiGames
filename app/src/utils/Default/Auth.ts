import axios from "../../axiosConfig";

export const verifyIfLogged = async (): Promise<boolean> => {
  if (localStorage.getItem("jwtToken")) {
    try {
      const verifToken = await axios.get("/auth/verifyToken", {
        headers: {
          token: localStorage.getItem("jwtToken"),
        },
      });
      if (verifToken.status === 200) return true;
      else return false;
    } catch (e) {
      localStorage.setItem("jwtToken", "");
      console.log("change jwtToken");
      return false;
    }
  } else return false;
};
