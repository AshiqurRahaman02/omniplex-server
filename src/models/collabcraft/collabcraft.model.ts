import mongoose, { Schema, Document } from "mongoose";

export interface IRoom extends Document {
	name: string;
	password: string;
    adminId: string;
    adminName: string;
    users: [string];
}

const roomSchema: Schema = new Schema({
	name: { type: String, required: true },
	password: { type: String, required: true },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    adminName: {
        type: String,
        required: true,
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const RoomModel = mongoose.model<IRoom>("Room", roomSchema);

export default RoomModel;
