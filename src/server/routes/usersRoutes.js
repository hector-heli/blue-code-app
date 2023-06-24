import { Router } from "express";
import { createUser, getUsers, getUserById, deleteUserById, updateUserById } from "../controllers/userController.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";

const router = Router();

router.post("/", createUser, [verifyToken, isAdmin, checkExistingUser]);
router.get('/', getUsers)
router.get('/:id', getUserById);
router.delete('/:Id', deleteUserById);
router.put('/:Id', updateUserById);

export default router;
