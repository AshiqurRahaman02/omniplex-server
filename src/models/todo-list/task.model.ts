import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
	name: string;
	details: string;
	createdBy: { creatorId: string; creatorName: string };
	assignedTo: [string];
	done: {
		isDone: boolean;
		doneBy: { userId: string; userName: string };
		time: string;
	};
	deadline: string;
}

const taskSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		details: {
			type: String,
		},
		createdBy: {
			creatorId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "user",
				required: true,
			},
			creatorName: {
				type: String,
				required: true,
			},
		},
		assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
		done: {
			isDone: {
				type: Boolean,
				default: false,
			},
			doneBy: {
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "user",
				},
				userName: {
					type: String,
				},
			},
			time: {
				type: String,
			},
		},
		deadline: {
			type: String,
		},
		lastResetTime: {
			type: String,
		},
	},
	{ timestamps: true }
);

const TaskModel = mongoose.model<ITask>("Task", taskSchema);

export default TaskModel;