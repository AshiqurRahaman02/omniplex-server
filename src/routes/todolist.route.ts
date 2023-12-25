import express from "express";
import { verifyToken } from "../middlewares/authentication.middlewares";
import {
	addDailyTask,
	addHobbiesListTeam,
	addPersonalkListTeam,
	addProjectListTeam,
	addReminder,
	addTask,
	addTravelListTeam,
	addWorkListTeam,
	getTodoList,
	updateGoal,
	updateTask,
	updateTeam,
} from "../controllers/todolist.controllers";

const todolistRouter = express.Router();

// Route to get or create a todo list by user ID
todolistRouter.get("/get-todolist", getTodoList);

// Routes to create team
todolistRouter.post("/work/add-team", addWorkListTeam);
todolistRouter.post("/project/add-team", addProjectListTeam);
todolistRouter.post("/personal/add-team", addPersonalkListTeam);
todolistRouter.post("/hobbies/add-team", addHobbiesListTeam);
todolistRouter.post("/travel/add-team", addTravelListTeam);

// Routes to create a task, update TeamModel, and return the team details
todolistRouter.post("/daily-task/createTask/:teamId", addDailyTask);
todolistRouter.post("/reminder/createTask/:teamId", addReminder);
todolistRouter.post("/task/createTask/:teamId", addTask);

// Route to update a team by ID
todolistRouter.put("/team/update/:teamId", updateTeam);
// Route to update a task by ID
todolistRouter.put("/task/update/:taskId", updateTask);
// Route to update a goal by ID
todolistRouter.put("/goal/update/:goalId", updateGoal);

export default todolistRouter;
