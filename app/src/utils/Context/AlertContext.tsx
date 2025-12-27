import { AlertTypeEnum } from "../../@types/default";
import { createContext, SyntheticEvent, useState } from "react";

export const AlertContext = createContext<any>(undefined);

export const AlertContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>("");
  const [alertType, setAlertType] = useState<AlertTypeEnum | undefined>(undefined);


  const handleOpenAlert = (type: AlertTypeEnum, msg: string) => {
    setOpenAlert(true);
    setAlertMsg(msg)
    setAlertType(type)
  };

  const handleCloseAlert = (event: Event | SyntheticEvent<any, Event>, reason?: string) => {
    if (reason && reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };


  return (
    <AlertContext.Provider
      value={{ openAlert, alertMsg, alertType, handleOpenAlert, handleCloseAlert }}
    >
      {children}
    </AlertContext.Provider>
  );
};
