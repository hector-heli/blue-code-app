import Role from "../models/Role.js";
import User from "../models/User.js";
import { ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_TELEGRAM_CALL_ID } from "../config.js";

export const createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new Role({ name: "usuario" }).save(),
      new Role({ name: "moderador" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

export const createAdmin = async () => {
  // check for an existing admin user
  const userFound = await User.findOne({ email: ADMIN_EMAIL });
  if (userFound) return;

  // get roles _id
  const roles = await Role.find({ name: { $in: ["usuario", "moderador","admin" ] } });
  (()=>console.log(roles))();

  // create a new admin user
  const newUser = await User.create({
    username: ADMIN_USERNAME,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    telegramCallId: ADMIN_TELEGRAM_CALL_ID,
    roles: roles.map((role) => role._id),
  });

  console.log(`new user created: ${newUser.email}`);
};

createRoles();
createAdmin();