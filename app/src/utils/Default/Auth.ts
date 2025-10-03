import { UserInfos, userRole } from "../../@types/user";
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

export const verifyRole = async (): Promise<userRole | string> => {
  if (localStorage.getItem("jwtToken")) {
    try {
      const verifToken = await axios.get("/auth/verifyToken", {
        headers: {
          token: localStorage.getItem("jwtToken"),
        },
      });
      if (verifToken.status === 200) return verifToken.data.role;
      else return "error";
    } catch (e) {
      localStorage.setItem("jwtToken", "");
      console.log(e)
      console.log("change jwtToken");
      return "not logged";
    }
  } else return "not logged";
};


export const getUserInfos = async (): Promise<UserInfos> => {
  if (localStorage.getItem("jwtToken")) {
    try {
      const token = localStorage.getItem("jwtToken");
      const verifToken = await axios.get("/auth/verifyToken", {
        headers: {
          token: token,
        },
      });
      if (verifToken.status === 200) {
        const infos: {
          data: UserInfos;
        } = await axios.get(`/user/${verifToken.data.id}`);
        return {
          id: infos.data.id,
          firstname: infos.data.firstname,
          lastname: infos.data.lastname,
          email: infos.data.email,
          role: infos.data.role,
          pseudo: infos.data.pseudo,
        };
      }
      throw new Error("Error while getting user infos");
    } catch (e) {
      localStorage.setItem("jwtToken", "");
      console.log("change jwtToken");
      throw new Error("No token found");
    }
  }
  else {
    throw new Error("No token found");
  }
};