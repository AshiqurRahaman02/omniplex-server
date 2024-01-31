"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const collabcraft_controller_1 = require("../controllers/collabcraft.controller");
const roomRouter = express_1.default.Router();
// Get users rooms
roomRouter.get("/getUserRooms", collabcraft_controller_1.getUserRooms);
// Get room details
roomRouter.get("/getRoomDetails/:id", collabcraft_controller_1.getRoomDetails);
// Create room
roomRouter.post("/createRoom", collabcraft_controller_1.createRoom);
// Join room
roomRouter.post("/joinRoom", collabcraft_controller_1.joinRoom);
exports.default = roomRouter;
