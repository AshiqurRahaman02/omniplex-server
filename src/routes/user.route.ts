import express from "express";
import { verifyToken } from "../middlewares/authentication.middlewares";
import {
	changePassword,
	deleteUser,
	forgotPassword,
	getUser,
	userLogin,
	userLogout,
	userRegister,
} from "../controllers/user.controller";

const userRouter = express.Router();

// Get user
userRouter.get("/get/:id", verifyToken, getUser);

// Register route
userRouter.post("/register", userRegister);

// Login route
userRouter.post("/login", userLogin);

// Change password route
userRouter.post("/change_password", verifyToken, changePassword);

// Forgot password route
userRouter.post("/forgot_password", forgotPassword);

// Logout route (protected with verifyToken middleware)
userRouter.post("/logout", verifyToken, userLogout);

// Delete route
userRouter.delete("/delete/:id", verifyToken, deleteUser);

export default userRouter;
