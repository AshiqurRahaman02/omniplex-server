import { Request, Response } from "express";
import RoomModel, { IRoom } from "../models/collabcraft/collabcraft.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecretKey: string = process.env.jwt_secret_key!;

export const getRoomDetails = async (req: Request, res: Response) => {
	const roomId = req.params.id;

	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}
		const room = await RoomModel.findById(roomId);

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
	} catch (error) {
		res.status(500).json({ isError: true, message: error });
	}
};

export const getUserRooms = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}
		const rooms = await RoomModel.find({
			users: {
				$in: [userId],
			},
		});

		res.status(200).json({ isError: false, rooms });
	} catch (error) {
		res.status(500).json({ isError: true, message: error });
	}
};

export const createRoom = async (req: Request, res: Response) => {
	const { name, password } = req.body;
	try {
		const userId = req.user?._id;
		const userName = req.user?.name;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		let room: IRoom | null = await RoomModel.findOne({
			adminId: userId,
			name: name,
		});
		if (room) {
			return res
				.status(404)
				.json({ isError: true, message: "Room name should unique" });
		}

		bcrypt.hash(password, 3, async (err, hash) => {
			if (err) throw err;
			const room = new RoomModel({
				name,
				password: hash,
				adminId: userId,
				adminName: userName,
				users: [userId],
			});
			await room.save();
			res.status(201).json({
				isError: false,
				token: jwt.sign({ roomId: room?._id }, jwtSecretKey),
				room,
			});
		});
	} catch (error: any) {
		res.status(404).json({ isError: true, message: error.message });
	}
};

export const joinRoom = async (req: Request, res: Response) => {
	const { roomId, password } = req.body;
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}
		let room = await RoomModel.findById(roomId);
		if (!room) {
			return res
				.status(404)
				.json({ isError: true, message: "Room not found" });
		}

		bcrypt.compare(password, room.password, async (err, result) => {
			if (result) {
				if (!room?.users.includes(userId)) {
					room?.users.push(userId);
					await room?.save();
				}

				res.status(200).json({
					isError: false,
					room,
				});
			} else {
				res.status(401).json({
					isError: true,
					message: "Invalid password",
				});
			}
		});
	} catch (error: any) {
		console.log(error);
		res.status(404).json({ isError: true, message: error.message });
	}
};
