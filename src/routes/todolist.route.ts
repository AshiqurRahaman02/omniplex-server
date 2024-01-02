import express from "express";
import { verifyToken } from "../middlewares/authentication.middlewares";
import {
	addDailyTask,
	addGoal,
	addHabit,
	addHobbiesListTeam,
	addMembers,
	addMessage,
	addNote,
	addPersonalkListTeam,
	addProjectListTeam,
	addReminder,
	addSavings,
	addSpends,
	addSteps,
	addTask,
	addTravelListTeam,
	addWorkListTeam,
	deleteGoal,
	deleteNote,
	deleteTask,
	deleteTeam,
	getTodoList,
	joinTeam,
	markNotificationAsRead,
	updateGoal,
	updateHabit,
	updateNote,
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
// todolistRouter.post("/personal/add-team", addPersonalkListTeam);
todolistRouter.post("/hobbies/add-team", addHobbiesListTeam);
todolistRouter.post("/travel/add-team", addTravelListTeam);

// Routes to create,update or delete Note
todolistRouter.post('/note/addNote', addNote);
todolistRouter.put('/note/updateNote',updateNote);
todolistRouter.delete('/note/deleteNote/:index',deleteNote)

// Routes to create a task, update TeamModel, and return the team details
todolistRouter.post("/daily-task/createTask/:teamId", addDailyTask);
todolistRouter.post("/reminder/createTask/:teamId", addReminder);
todolistRouter.post("/task/createTask/:teamId", addTask);
todolistRouter.post("/goal/createTask/:teamId", addGoal)
todolistRouter.post("/goal/addSteps/:goalId", addSteps)

// Route to add habits to a team by Id
todolistRouter.post("/habit/createHabit/:teamId", addHabit)
todolistRouter.put('/habit/updateHabit/:teamId/:habitId',updateHabit)

// Route to update spends in financial plans
todolistRouter.put("/financial/addSpend/:teamId", addSpends)
todolistRouter.put("/financial/addSaving/:teamId", addSavings)

// Route to update a team by ID
todolistRouter.put("/team/update/:teamId", updateTeam);
// Route to update a task by ID
todolistRouter.put("/task/update/:taskId", updateTask);
// Route to update done tasks by ID
todolistRouter.put("/task/updateTaskDone/:taskId", updateTaskDone)
// Route to update a goal by ID
todolistRouter.put("/goal/update/:goalId", updateGoal);

// Route to add members to a team
todolistRouter.post('/team/addMembers/:teamId',addMembers)
// Route to join a team
todolistRouter.post('/team/joinTeam/:teamId',joinTeam)
// Route to update isRead for a notification
todolistRouter.put('/markNotificationAsRead/:time', markNotificationAsRead)
// Route to add a message to updates in a team
todolistRouter.post('/team/addMessage/:teamId', addMessage)

// Route to delete a team by ID
todolistRouter.delete("/team/delete/:teamId", deleteTeam);
// Route to delete a goal by ID
todolistRouter.delete("/goal/delete/:goalId", deleteGoal);
// Route to delete a task by ID
todolistRouter.delete("/task/delete/:taskId", deleteTask);

export default todolistRouter;
