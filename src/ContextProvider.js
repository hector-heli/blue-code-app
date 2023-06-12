/* eslint-disable no-unused-vars */
import { createContext } from "react"

export const ReportContext = createContext();
export const CallsContext = createContext();
export const UsersContext = createContext();

export const initialCurrentUserState = {
  userId:"",
  username:"",
  email:"",
  password:"",
  telegramCallId:"",
  roles:["usuario","",""],
}
