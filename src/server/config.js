/* eslint-disable no-undef */
import { config } from "dotenv";
config();

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/apicompany";
export const PORT = process.env.PORT || 4000;
export const SECRET = "student23";

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "23.hectorheli@gmail.com";
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "Héctor Helí Ruiz García";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "adminStudent23";
export const ADMIN_TELEGRAM_CALL_ID = process.env.ADMIN_TELEGRAM_CALL_ || "callId";
