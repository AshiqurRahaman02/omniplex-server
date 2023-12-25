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
// Route to update a team by ID
todolistRouter.put("/team/update/:teamId", todolist_controllers_1.updateTeam);
// Route to update a task by ID
todolistRouter.put("/task/update/:taskId", todolist_controllers_1.updateTask);
// Route to update a goal by ID
todolistRouter.put("/goal/update/:goalId", todolist_controllers_1.updateGoal);
exports.default = todolistRouter;
