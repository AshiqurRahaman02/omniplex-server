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
        ref: "user",
    },
	workList: [{ type: mongoose.Schema.Types.ObjectId, ref: "team" }],
	projectList: [{ type: mongoose.Schema.Types.ObjectId, ref: "team" }],
	personalList: { type: mongoose.Schema.Types.ObjectId, ref: "team" },
	hobbiesList: [{ type: mongoose.Schema.Types.ObjectId, ref: "team" }],
	travelList: [{ type: mongoose.Schema.Types.ObjectId, ref: "team" }],
});

const TodoListModel = mongoose.model<ITodoList>("Todolist", todolistSchema);

export default TodoListModel;
