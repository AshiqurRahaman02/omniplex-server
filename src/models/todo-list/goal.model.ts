import mongoose, { Schema, Document } from "mongoose";

export interface IGoal extends Document {
	name: string;
	details: string;
	createdBy: { creatorId: string; creatorName: string };
	steps: [{ taskId: string }];
	deadline: string;
}

const GoalSchema: Schema = new Schema(
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
		steps: [
			{
				taskId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "task",
					required: true,
				},
			},
		],
		deadline: {
			type: String,
		},
	},
	{ timestamps: true }
);

const GoalModel = mongoose.model<IGoal>("Goal", GoalSchema);

export default GoalModel;
