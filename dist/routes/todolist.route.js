"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todolist_controllers_1 = require("../controllers/todolist.controllers");
const todolistRouter = express_1.default.Router();
// Route to get or create a todo list by user ID
todolistRouter.get("/get-todolist", todolist_controllers_1.getTodoList);
// Routes to create team
todolistRouter.post("/work/add-team", todolist_controllers_1.addWorkListTeam);
todolistRouter.post("/project/add-team", todolist_controllers_1.addProjectListTeam);
todolistRouter.post("/personal/add-team", todolist_controllers_1.addPersonalkListTeam);
todolistRouter.post("/hobbies/add-team", todolist_controllers_1.addHobbiesListTeam);
todolistRouter.post("/travel/add-team", todolist_controllers_1.addTravelListTeam);
// Routes to create a task, update TeamModel, and return the team details
todolistRouter.post("/daily-task/createTask/:teamId", todolist_controllers_1.addDailyTask);
todolistRouter.post("/reminder/createTask/:teamId", todolist_controllers_1.addReminder);
todolistRouter.post("/task/createTask/:teamId", todolist_controllers_1.addTask);
todolistRouter.post("/goal/createTask/:teamId", todolist_controllers_1.addGoal);
todolistRouter.post("/goal/addSteps/:goalId", todolist_controllers_1.addSteps);
// Route to add habits to a team by Id
todolistRouter.post("/habit/createHabit/:teamId", todolist_controllers_1.addHabit);
// Route to update spends in financial plans
todolistRouter.put("/financial/addSpend/:teamId", todolist_controllers_1.addSpends);
// Route to update a team by ID
todolistRouter.put("/team/update/:teamId", todolist_controllers_1.updateTeam);
// Route to update a task by ID
todolistRouter.put("/task/update/:taskId", todolist_controllers_1.updateTask);
// Route to update done tasks by ID
todolistRouter.put("/task/updateTaskDone/:taskId", todolist_controllers_1.updateTaskDone);
// Route to update a goal by ID
todolistRouter.put("/goal/update/:goalId", todolist_controllers_1.updateGoal);
// Route to delete a team by ID
todolistRouter.delete("/team/delete/:teamId", todolist_controllers_1.deleteTeam);
// Route to delete a goal by ID
todolistRouter.delete("/goal/delete/:goalId", todolist_controllers_1.deleteGoal);
// Route to delete a task by ID
todolistRouter.delete("/task/delete/:taskId", todolist_controllers_1.deleteTask);
exports.default = todolistRouter;
