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
exports.authorizedUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtSecretKey = process.env.jwt_secret_key;
const authorizedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Assuming the authenticated user's ID is available on req.user.id
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!req.user) {
            return res
                .status(401)
                .json({ isError: true, message: "Unauthorized" });
        }
        // Check if the user is either a "creator" or an "admin"
        if (req.user.userType !== "creator" && req.user.userType !== "admin") {
            return res
                .status(403)
                .json({ isError: true, message: "Unauthorized" });
        }
        // If the user is authorized, proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        res.status(500).json({ isError: true, message: "Internal server error" });
    }
});
exports.authorizedUser = authorizedUser;
