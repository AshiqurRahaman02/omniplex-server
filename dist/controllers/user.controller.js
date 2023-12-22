"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.userLogout = exports.forgotPassword = exports.changePassword = exports.userLogin = exports.userRegister = exports.getUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtSecretKey = process.env.jwt_secret_key;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ isError: true, message: "User not found" });
        }
        res.status(200).json({ isError: false, user });
    }
    catch (error) {
        res.status(500).json({ isError: true, message: error });
    }
});
exports.getUser = getUser;
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    try {
        let user = yield user_model_1.default.findOne({ email });
        let firstName = name.split(" ")[0].toLowerCase();
        let tag = `@${firstName}${Math.floor(1000 + Math.random() * 9000)}`;
        if (user) {
            return res.status(201).json({
                isError: true,
                message: "Email already used in this website.",
            });
        }
        bcrypt_1.default.hash(password, 5, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                throw err;
            const user = new user_model_1.default({ email, password: hash, name, tag });
            yield user.save();
            res.status(201).json({
                isError: false,
                message: "Welcome to our website",
                token: jsonwebtoken_1.default.sign({ userId: user === null || user === void 0 ? void 0 : user._id }, jwtSecretKey),
                user,
            });
        }));
    }
    catch (error) {
        res.status(404).json({ isError: true, message: error.message });
    }
});
exports.userRegister = userRegister;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ isError: true, message: "User not found" });
        }
        bcrypt_1.default.compare(password, user.password, (err, result) => {
            if (result) {
                res.status(200).json({
                    isError: false,
                    message: "Welcome Back to our website",
                    token: jsonwebtoken_1.default.sign({ userId: user === null || user === void 0 ? void 0 : user._id }, jwtSecretKey),
                    user,
                });
            }
            else {
                res.status(401).json({
                    isError: true,
                    message: "Invalid password",
                });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ isError: true, message: error.message });
    }
});
exports.userLogin = userLogin;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, oldPassword, newPassword } = req.body;
    try {
        let user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ isError: true, message: "User not found" });
        }
        bcrypt_1.default.compare(oldPassword, user.password, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res
                    .status(500)
                    .json({ isError: true, message: "Internal server error" });
            }
            if (result) {
                try {
                    if (user) {
                        const hashedNewPassword = yield bcrypt_1.default.hash(newPassword, 5);
                        user.password = hashedNewPassword;
                        yield user.save();
                        res.status(200).json({
                            isError: false,
                            message: "Password updated successfully",
                        });
                    }
                    else {
                        return res
                            .status(404)
                            .json({ isError: true, message: "User not found" });
                    }
                }
                catch (error) {
                    console.log(error);
                    res.status(500).json({
                        isError: true,
                        message: "Internal server error",
                    });
                }
            }
            else {
                res.status(401).json({
                    isError: true,
                    message: "Invalid old password",
                });
            }
        }));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            isError: true,
            message: "Internal server error",
        });
    }
});
exports.changePassword = changePassword;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        let user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ isError: true, message: "Email not found" });
        }
        const temporaryPassword = Math.random().toString(36).slice(-8);
        const hashedTemporaryPassword = yield bcrypt_1.default.hash(temporaryPassword, 5);
        user.password = hashedTemporaryPassword;
        yield user.save();
        res.status(200).json({
            isError: false,
            message: "Your password has been changed successfully",
            password: temporaryPassword,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ isError: true, message: "Internal server error" });
    }
});
exports.forgotPassword = forgotPassword;
const userLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            isError: false,
            message: "User logedout successfully",
        });
    }
    catch (error) {
        res.status(404).json({ isError: true, message: error.message });
    }
});
exports.userLogout = userLogout;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { password } = req.body;
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ isError: true, message: "User not found" });
        }
        // Compare the provided password with the user's actual password
        const passwordMatches = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatches) {
            return res
                .status(401)
                .json({ isError: true, message: "Invalid password" });
        }
        // If the password is correct, proceed with user deletion
        yield user_model_1.default.findByIdAndDelete(userId);
        res.status(200).json({
            isError: false,
            message: "User deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({ isError: true, message: error.message });
    }
});
exports.deleteUser = deleteUser;
