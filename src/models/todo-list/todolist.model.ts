import mongoose, { Schema, Document } from "mongoose";

export interface ITodoList extends Document {
	userId: string;
	workList: [string];
	projectList: [string];
	personalList: string;
	hobbiesList: [string];
	travelList: [string];
}

const todolistSchema: Schema = new Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	workList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
	projectList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
	personalList: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
	hobbiesList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
	travelList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
});

const TodoListModel = mongoose.model<ITodoList>("Todolist", todolistSchema);

export default TodoListModel;
