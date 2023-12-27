import express from "express";
import { verifyToken } from "../middlewares/authentication.middlewares";
import {
	addDailyTask,
	addGoal,
	addHabit,
	addHobbiesListTeam,
	addPersonalkListTeam,
	addProjectListTeam,
	addReminder,
	addSpends,
	addSteps,
	addTask,
	addTravelListTeam,
	addWorkListTeam,
	deleteGoal,
	deleteTask,
	deleteTeam,
	getTodoList,
	updateGoal,
	updateTask,
	updateTaskDone,
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
todolistRouter.post("/goal/createTask/:teamId", addGoal)
todolistRouter.post("/goal/addSteps/:goalId", addSteps)

// Route to add habits to a team by Id
todolistRouter.post("/habit/createHabit/:teamId", addHabit)

// Route to update spends in financial plans
todolistRouter.put("/financial/addSpend/:teamId", addSpends)

// Route to update a team by ID
todolistRouter.put("/team/update/:teamId", updateTeam);
// Route to update a task by ID
todolistRouter.put("/task/update/:taskId", updateTask);
// Route to update done tasks by ID
todolistRouter.put("/task/updateTaskDone/:taskId", updateTaskDone)
// Route to update a goal by ID
todolistRouter.put("/goal/update/:goalId", updateGoal);

// Route to delete a team by ID
todolistRouter.delete("/team/delete/:teamId", deleteTeam);
// Route to delete a goal by ID
todolistRouter.delete("/goal/delete/:goalId", deleteGoal);
// Route to delete a task by ID
todolistRouter.delete("/task/delete/:taskId", deleteTask);

export default todolistRouter;
