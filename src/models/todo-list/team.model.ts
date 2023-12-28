import mongoose, { Schema, Document } from "mongoose";

export interface ITeam extends Document {
	isPublic: boolean;
	name: string;
	password: string;
	details: string;
	teamType: "work" | "project" | "personal" | "hobbies" | "travel";
	createdBy: { creatorId: string; creatorName: string };
	allMembers: [{ userId: string; userName: string }];
	invitations: [string];
	dailyTasks: [string];
	reminders: [string];
	tasks: [string];
	goals: [string];
	habits: { habitsId: [string]; tracks: [{}] };
	financialsPlans: {
		budget: string;
		spends: [
			{
				date: string;
				allSpends: [
					{
						amount: string;
						amountType: string;
						usedFor: string;
						time: string;
					}
				];
			}
		];
	};
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
		password: { type: String },
		details: {
			type: String,
		},
		teamType: {
			type: String,
			enum: ["work", "project", "personal", "hobbies", "travel"],
			required: true,
		},
		createdBy: {
			creatorId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
			creatorName: {
				type: String,
				required: true,
			},
		},
		habits: {
			habitsId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
			tracks: [{}],
		},
		financialsPlans: {
			budget: String,
			spends: [
				{
					date: String,
					allSpends: [
						{
							amount: String,
							amountType: String,
							usedFor: String,
							time: String,
						},
					],
				},
			],
		},
		allMembers: [
			{
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
				userName: {
					type: String,
				},
			},
		],
		invitations: [String],
		dailyTasks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Task",
			},
		],
		reminders: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Task",
			},
		],
		tasks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Task",
			},
		],
		goals: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Goal",
			},
		],
	},
	{ timestamps: true }
);

const TeamModel = mongoose.model<ITeam>("Team", teamSchema);

export default TeamModel;
