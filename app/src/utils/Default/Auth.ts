import { checkIfLocalStorageWordleIsFine } from "utils/Wordle/Wordle";
import { UserInfos, userRole } from "../../@types/user";
import axios from "../../axiosConfig";

export const minLengthPassword: number = 12;

export const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      errorWithUserOrLogout();
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
      errorWithUserOrLogout();
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
          country: infos.data.country
        };
      }
      throw new Error("Error while getting user infos");
    } catch (e) {
      errorWithUserOrLogout();
      console.log("change jwtToken");
      throw new Error("No token found");
    }
  }
  else {
    throw new Error("No token found");
  }
};

export const errorWithUserOrLogout = () => {
  localStorage.setItem("jwtToken", "");
  console.log("change jwtToken");

  localStorage.setItem("dailyWordleDone", "");
}

export const createEntitesAtLogin = async (userID: string) => {
  try {
    if(checkIfLocalStorageWordleIsFine()) {
      const local = localStorage.getItem('dailyWordleDone');
      if(local) {
        await axios.post("/wordle/", {
          nbTry: JSON.parse(local).nbTry,
          won: JSON.parse(local).won,
          player: userID,
          word: JSON.parse(local).word,
        });
      }
    }
  }
  catch (e) {
    console.log(e);
  }
}