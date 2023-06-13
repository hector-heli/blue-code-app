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
      roles: rolesFound.map((role) => role.id),
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
  //console.log(users);

  return res.json(users);
};

export const getUserById = async (req, res) => {
  //console.log(req.params);
  try {
    const user = await User.findById(req.params.id);
    return res.json(user);
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const user = await User.deleteOne(req.params.id);
    return res.json(user);
  } catch (error) {
    console.error(error);
  }};

export const updateUserById = async (req, res) => {

  console.log(req.body);
  const { username, email, password, telegramCallId, roles } = req.body;

  try {
    const rolesFound = await Role.find({ name: { $in: roles } });
    console.log(rolesFound);

    // creating a new User
    const updatedFields = new User({
      username,
      email,
      password,
      telegramCallId,
      roles: rolesFound.map((role) => role.id),
    });

    // encrypting password
    updatedFields.password = await User.encryptPassword(req.body.password);
    console.log(updatedFields);

    // saving the new user
    const updatedUser = await User.findOneAndUpdate(
      {_id: req.params.id },
      {updatedFields}, 
      { new: true }
    ).populate('roles');

    console.log(updatedUser);

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });

  }
};


