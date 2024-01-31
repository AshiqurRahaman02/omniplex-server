import express from "express";
import { verifyToken } from "../middlewares/authentication.middlewares";
import {
	createRoom,
	getRoomDetails,
	getUserRooms,
	joinRoom,
} from "../controllers/collabcraft.controller";

const roomRouter = express.Router();

// Get users rooms
roomRouter.get("/getUserRooms", getUserRooms);

// Get room details
roomRouter.get("/getRoomDetails/:id", getRoomDetails);

// Create room
roomRouter.post("/createRoom", createRoom);

// Join room
roomRouter.post("/joinRoom", joinRoom);

export default roomRouter;
