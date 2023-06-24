/* eslint-disable no-unused-vars */
import { createContext } from "react"

export const ReportContext = createContext();
export const CallsContext = createContext();
export const UsersContext = createContext();
export const ScheduleContext = createContext();

export const initialCurrentUserState = {
  userId:"",
  username:"",
  email:"",
  password:"",
  telegramCallId:"",
  roles:["usuario","",""],
}

export const initialCurrentShiftState = {
  //shiftId:"",
  startDate:0,
  endDate:0,
  chief:"",
  doctor:""
}
