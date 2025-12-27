import { SyntheticEvent } from "react";

export enum buttonComponentColor {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  INFO = "info",
  NEUTRAL = "neutral",
  NONE = "none",
}

export enum buttonComponentType {
  INLINE = 'inline',
  OUTLINE = 'outline',
}

export enum buttonComponentSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

// Context
export interface AlertContextInterface {
  openAlert: boolean,
  alertMsg: string,
  alertType: AlertTypeEnum | undefined,
  handleOpenAlert: (type: AlertTypeEnum, msg: string) => void,
  handleCloseAlert: (event: Event | SyntheticEvent<any, Event>, reason?: string) => void,
}

export enum AlertTypeEnum {
  SUCCESS="success",
  INFO="info",
  WARNING="warning",
  ERROR="error",
}