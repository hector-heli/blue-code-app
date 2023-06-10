import {Schema, model} from "mongoose";

export const ROLES = ["usuario", "moderador", "admin"];

const roleSchema = new Schema(
  {
    _user: { type: Number, ref: "User" },
    name: String,
  },
  {
    versionKey: false,
  }
);

export default model("Role", roleSchema);