import alert from "alert";
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
  //console.log(req.params.Id);
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.Id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUserById = async (req, res) => {

  console.log(req.body);
  const { roles } = req.body;
  const updatedFields = req.body;

  try {
    const rolesFound = await Role.find({ name: { $in: roles }});

    req.body.roles= rolesFound.map((role) => role._id);

    console.log(roles);

    // encrypting password
    updatedFields.password = await User.encryptPassword(req.body.password);
    console.log(updatedFields);

    // saving the new user
    const updatedUser = await User.updateOne(
      {_id: req.params.Id},
      { $setOnInsert: updatedFields }, 
      { new: true, upsert: true } 
    ).populate('roles');

    console.log(updatedUser);
    alert('Usuario actualizado con exito');
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });

  }
};


