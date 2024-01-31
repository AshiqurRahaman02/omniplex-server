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
exports.joinRoom = exports.createRoom = exports.getUserRooms = exports.getRoomDetails = void 0;
const collabcraft_model_1 = __importDefault(require("../models/collabcraft/collabcraft.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtSecretKey = process.env.jwt_secret_key;
const getRoomDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const roomId = req.params.id;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const room = yield collabcraft_model_1.default.findById(roomId);
        if (!room) {
            return res
                .status(404)
                .json({ isError: true, message: "Room not found" });
        }
        if (!room.users.includes(userId)) {
            return res.status(404).json({
                isError: true,
                joinRequired: "true",
                message: "Please join the room first",
            });
        }
        res.status(200).json({ isError: false, room });
    }
    catch (error) {
        res.status(500).json({ isError: true, message: error });
    }
});
exports.getRoomDetails = getRoomDetails;
const getUserRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const rooms = yield collabcraft_model_1.default.find({
            users: {
                $in: [userId],
            },
        });
        res.status(200).json({ isError: false, rooms });
    }
    catch (error) {
        res.status(500).json({ isError: true, message: error });
    }
});
exports.getUserRooms = getUserRooms;
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const { name, password } = req.body;
    try {
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
        const userName = (_d = req.user) === null || _d === void 0 ? void 0 : _d.name;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        let room = yield collabcraft_model_1.default.findOne({
            adminId: userId,
            name: name,
        });
        if (room) {
            return res
                .status(404)
                .json({ isError: true, message: "Room name should unique" });
        }
        bcrypt_1.default.hash(password, 3, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                throw err;
            const room = new collabcraft_model_1.default({
                name,
                password: hash,
                adminId: userId,
                adminName: userName,
                users: [userId],
            });
            yield room.save();
            res.status(201).json({
                isError: false,
                token: jsonwebtoken_1.default.sign({ roomId: room === null || room === void 0 ? void 0 : room._id }, jwtSecretKey),
                room,
            });
        }));
    }
    catch (error) {
        res.status(404).json({ isError: true, message: error.message });
    }
});
exports.createRoom = createRoom;
const joinRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const { roomId, password } = req.body;
    try {
        const userId = (_e = req.user) === null || _e === void 0 ? void 0 : _e._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        let room = yield collabcraft_model_1.default.findById(roomId);
        if (!room) {
            return res
                .status(404)
                .json({ isError: true, message: "Room not found" });
        }
        bcrypt_1.default.compare(password, room.password, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (result) {
                if (!(room === null || room === void 0 ? void 0 : room.users.includes(userId))) {
                    room === null || room === void 0 ? void 0 : room.users.push(userId);
                    yield (room === null || room === void 0 ? void 0 : room.save());
                }
                res.status(200).json({
                    isError: false,
                    room,
                });
            }
            else {
                res.status(401).json({
                    isError: true,
                    message: "Invalid password",
                });
            }
        }));
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ isError: true, message: error.message });
    }
});
exports.joinRoom = joinRoom;
