import User from "../models/User.js";
import Role from "../models/Role.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, password, telegramCallId, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });
    console.log(rolesFound);

    // creating a new User
    const user = new User({
      username,
      email,
      password,
      telegramCallId,
      roles: rolesFound.map((role) => role.name),
    });

    // encrypting password
    user.password = await User.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      telegramCallId: savedUser.telegramCallId,
      roles: savedUser.roles.name,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async (req, res) => {
  const users = await User.find().populate('roles');
  console.log(users);

  return res.json(users);
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.userId);
  return res.json(user);
};

export const deleteUserById = async (req, res) => {
  return res.json('Deleting user')
};

