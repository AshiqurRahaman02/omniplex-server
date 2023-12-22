"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_middlewares_1 = require("../middlewares/authentication.middlewares");
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
// Get user
userRouter.get("/get/:id", authentication_middlewares_1.verifyToken, user_controller_1.getUser);
// Register route
userRouter.post("/register", user_controller_1.userRegister);
// Login route
userRouter.post("/login", user_controller_1.userLogin);
// Change password route
userRouter.post("/change_password", authentication_middlewares_1.verifyToken, user_controller_1.changePassword);
// Forgot password route
userRouter.post("/forgot_password", user_controller_1.forgotPassword);
// Logout route (protected with verifyToken middleware)
userRouter.post("/logout", authentication_middlewares_1.verifyToken, user_controller_1.userLogout);
// Delete route
userRouter.delete("/delete/:id", authentication_middlewares_1.verifyToken, user_controller_1.deleteUser);
exports.default = userRouter;
