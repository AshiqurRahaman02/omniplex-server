import mongoose, { Schema, Document } from "mongoose";

export interface ITeam extends Document {
	isPublic: boolean;
	name: string;
	password: string;
	details: string;
	createdBy: { creatorId: string; creatorName: string };
	allMembers: [{ userId: string; userName: string }];
	dailyTasks: [{ taskId: string }];
	reminders: [{ taskId: string }];
	tasks: [{ taskId: string }];
	goals: [{ goalId: string }];
}

const teamSchema: Schema = new Schema(
	{
		isPublic: {
			type: "boolean",
			default: false,
		},
		name: {
			type: String,
			required: true,
		},
		password: {type: String},
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
		allMembers: [
			{
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "user",
				},
				userName: {
					type: String,
				},
			}
		],
		dailyTasks: [
			{
				taskId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "task",
				},
			},
		],
		reminders: [
			{
				taskId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "task",
				},
			},
		],
		tasks: [
			{
				taskId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "task",
				},
			},
		],
		goals: [
			{
				goalId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "goal",
				},
			},
		],
	},
	{ timestamps: true }
);

const TeamModel = mongoose.model<ITeam>("Team", teamSchema);

export default TeamModel;
