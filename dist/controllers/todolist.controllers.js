"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeam = exports.deleteGoal = exports.deleteTask = exports.updateGoal = exports.updateTask = exports.updateTeam = exports.resetDailyTasks = exports.addGoal = exports.addTask = exports.addReminder = exports.addDailyTask = exports.addTravelListTeam = exports.addHobbiesListTeam = exports.addPersonalkListTeam = exports.addProjectListTeam = exports.addWorkListTeam = exports.getTodoList = void 0;
const todolist_model_1 = __importDefault(require("../models/todo-list/todolist.model"));
const team_model_1 = __importDefault(require("../models/todo-list/team.model"));
const goal_model_1 = __importDefault(require("../models/todo-list/goal.model"));
const task_model_1 = __importDefault(require("../models/todo-list/task.model"));
const getTodoList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        let todolist = yield todolist_model_1.default.findOne({ userId }).populate("workList projectList hobbies travelList");
        if (!todolist) {
            todolist = new todolist_model_1.default({
                userId,
                workList: [],
                projectList: [],
                personalList: [],
                hobbiesList: [],
                travelList: [],
            });
            yield todolist.save();
        }
        res.status(200).json({ isError: false, todolist });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.getTodoList = getTodoList;
const addWorkListTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const { isPublic, name, password, details } = req.body;
        // Create a new team
        const newTeam = new team_model_1.default({
            isPublic,
            name,
            password,
            details,
            createdBy: { creatorId: userId, creatorName: (_c = req.user) === null || _c === void 0 ? void 0 : _c.name },
            allMembers: [],
            dailyTasks: [],
            reminders: [],
            tasks: [],
            goals: [],
        });
        const savedTeam = yield newTeam.save();
        const todoList = yield todolist_model_1.default.findOne({ userId });
        if (todoList) {
            todoList.workList.push(savedTeam._id);
            yield todoList.save();
        }
        res.status(201).json({ isError: false, team: savedTeam });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.addWorkListTeam = addWorkListTeam;
const addProjectListTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    try {
        const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const { isPublic, name, password, details } = req.body;
        // Create a new team
        const newTeam = new team_model_1.default({
            isPublic,
            name,
            password,
            details,
            createdBy: { creatorId: userId, creatorName: (_e = req.user) === null || _e === void 0 ? void 0 : _e.name },
            allMembers: [],
            dailyTasks: [],
            reminders: [],
            tasks: [],
            goals: [],
        });
        const savedTeam = yield newTeam.save();
        const todoList = yield todolist_model_1.default.findOne({ userId });
        if (todoList) {
            todoList.projectList.push(savedTeam._id);
            yield todoList.save();
        }
        res.status(201).json({ isError: false, team: savedTeam });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.addProjectListTeam = addProjectListTeam;
const addPersonalkListTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    try {
        const userId = (_f = req.user) === null || _f === void 0 ? void 0 : _f._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const { isPublic, name, password, details } = req.body;
        // Create a new team
        const newTeam = new team_model_1.default({
            isPublic,
            name,
            password,
            details,
            createdBy: { creatorId: userId, creatorName: (_g = req.user) === null || _g === void 0 ? void 0 : _g.name },
            allMembers: [],
            dailyTasks: [],
            reminders: [],
            tasks: [],
            goals: [],
        });
        const savedTeam = yield newTeam.save();
        const todoList = yield todolist_model_1.default.findOne({ userId });
        if (todoList) {
            todoList.personalList.push(savedTeam._id);
            yield todoList.save();
        }
        res.status(201).json({ isError: false, team: savedTeam });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.addPersonalkListTeam = addPersonalkListTeam;
const addHobbiesListTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j;
    try {
        const userId = (_h = req.user) === null || _h === void 0 ? void 0 : _h._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const { isPublic, name, password, details } = req.body;
        // Create a new team
        const newTeam = new team_model_1.default({
            isPublic,
            name,
            password,
            details,
            createdBy: { creatorId: userId, creatorName: (_j = req.user) === null || _j === void 0 ? void 0 : _j.name },
            allMembers: [],
            dailyTasks: [],
            reminders: [],
            tasks: [],
            goals: [],
        });
        const savedTeam = yield newTeam.save();
        const todoList = yield todolist_model_1.default.findOne({ userId });
        if (todoList) {
            todoList.hobbiesList.push(savedTeam._id);
            yield todoList.save();
        }
        res.status(201).json({ isError: false, team: savedTeam });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.addHobbiesListTeam = addHobbiesListTeam;
const addTravelListTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l;
    try {
        const userId = (_k = req.user) === null || _k === void 0 ? void 0 : _k._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const { isPublic, name, password, details } = req.body;
        // Create a new team
        const newTeam = new team_model_1.default({
            isPublic,
            name,
            password,
            details,
            createdBy: { creatorId: userId, creatorName: (_l = req.user) === null || _l === void 0 ? void 0 : _l.name },
            allMembers: [],
            dailyTasks: [],
            reminders: [],
            tasks: [],
            goals: [],
        });
        const savedTeam = yield newTeam.save();
        const todoList = yield todolist_model_1.default.findOne({ userId });
        if (todoList) {
            todoList.travelList.push(savedTeam._id);
            yield todoList.save();
        }
        res.status(201).json({ isError: false, team: savedTeam });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.addTravelListTeam = addTravelListTeam;
const addDailyTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _m, _o;
    try {
        const userId = (_m = req.user) === null || _m === void 0 ? void 0 : _m._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const { name, details, deadline, lastResetTime } = req.body;
        const teamId = req.params.teamId;
        // Create a new task
        const newTask = new task_model_1.default({
            name,
            details,
            createdBy: { creatorId: userId, creatorName: (_o = req.user) === null || _o === void 0 ? void 0 : _o.name },
            deadline,
            lastResetTime,
        });
        const savedTask = yield newTask.save();
        const team = yield team_model_1.default.findById(teamId);
        if (team) {
            team.dailyTasks.push(savedTask._id);
            yield team.save();
        }
        res.status(201).json({ isError: false, team });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.addDailyTask = addDailyTask;
const addReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _p, _q;
    try {
        const userId = (_p = req.user) === null || _p === void 0 ? void 0 : _p._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const { name, details, deadline } = req.body;
        const teamId = req.params.teamId;
        // Create a new task
        const newTask = new task_model_1.default({
            name,
            details,
            createdBy: { creatorId: userId, creatorName: (_q = req.user) === null || _q === void 0 ? void 0 : _q.name },
            deadline,
        });
        const savedTask = yield newTask.save();
        const team = yield team_model_1.default.findById(teamId);
        if (team) {
            team.reminders.push(savedTask._id);
            yield team.save();
        }
        res.status(201).json({ isError: false, team });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.addReminder = addReminder;
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _r, _s;
    try {
        const userId = (_r = req.user) === null || _r === void 0 ? void 0 : _r._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const { name, details, deadline } = req.body;
        const teamId = req.params.teamId;
        // Create a new task
        const newTask = new task_model_1.default({
            name,
            details,
            createdBy: { creatorId: userId, creatorName: (_s = req.user) === null || _s === void 0 ? void 0 : _s.name },
            assignedTo: [],
            deadline,
        });
        const savedTask = yield newTask.save();
        const team = yield team_model_1.default.findById(teamId);
        if (team) {
            team.tasks.push(savedTask._id);
            yield team.save();
        }
        res.status(201).json({ isError: false, team });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.addTask = addTask;
const addGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _t;
    try {
        const userId = (_t = req.user) === null || _t === void 0 ? void 0 : _t._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const { name, details, createdBy, steps, deadline } = req.body;
        const teamId = req.params.teamId;
        const createdTasks = yield Promise.all(steps.map((step) => __awaiter(void 0, void 0, void 0, function* () {
            var _u;
            const newTask = new task_model_1.default({
                name: step.name,
                details: step.details,
                createdBy: { creatorId: userId, creatorName: (_u = req.user) === null || _u === void 0 ? void 0 : _u.name },
                deadline: step.deadline,
            });
            return yield newTask.save();
        })));
        // Create a new goal
        const newGoal = new goal_model_1.default({
            name,
            details,
            createdBy,
            steps: createdTasks.map((task) => ({ taskId: task._id })),
            deadline,
        });
        const savedGoal = yield newGoal.save();
        const team = yield team_model_1.default.findById(teamId);
        if (team) {
            team.goals.push(savedGoal._id);
            yield team.save();
        }
        res.status(201).json({ isError: false, team });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.addGoal = addGoal;
const resetDailyTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentTime = new Date();
    const midnight = new Date(currentTime);
    midnight.setHours(0, 0, 0, 0);
    // Find tasks that need to be reset
    const tasksToReset = yield task_model_1.default.find({
        lastResetTime: { $lt: midnight.toISOString() },
    });
    // Reset tasks
    tasksToReset.forEach((task) => __awaiter(void 0, void 0, void 0, function* () {
        task.done.isDone = false;
        task.done.doneBy = {};
        task.done.time = "";
        task.lastResetTime = currentTime.toISOString();
        yield task.save();
    }));
    console.log("Daily tasks reset successfully.");
});
exports.resetDailyTasks = resetDailyTasks;
const updateTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teamId = req.params.teamId;
        const updateData = req.body;
        // Update the team by ID
        const updatedTeam = yield team_model_1.default.updateOne({ _id: teamId }, { $set: updateData });
        res.status(200).json({
            isError: false,
            message: "Team updated successfully",
            updatedTeam,
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.updateTeam = updateTeam;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.taskId;
        const updateData = req.body;
        // Update the task by ID
        const updatedTask = yield task_model_1.default.updateOne({ _id: taskId }, { $set: updateData });
        res.status(200).json({
            isError: false,
            message: "Task updated successfully",
            updatedTask,
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.updateTask = updateTask;
const updateGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const goalId = req.params.goalId;
        const updateData = req.body;
        // Update the goal by ID
        const updatedGoal = yield goal_model_1.default.updateOne({ _id: goalId }, { $set: updateData });
        res.status(200).json({
            isError: false,
            message: "Goal updated successfully",
            updatedGoal,
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.updateGoal = updateGoal;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.taskId;
        // Delete the task by ID
        const deletedTask = yield task_model_1.default.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res
                .status(404)
                .json({ isError: true, message: "Task not found" });
        }
        res.status(200).json({
            isError: false,
            message: "Task deleted successfully",
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.deleteTask = deleteTask;
const deleteGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const goalId = req.params.goalId;
        const goal = yield goal_model_1.default.findById(goalId);
        if (!goal) {
            return res
                .status(404)
                .json({ isError: true, message: "Goal not found" });
        }
        const taskIdsToDelete = goal.steps.map((step) => step.taskId);
        // Delete the tasks associated with the goal's steps
        yield task_model_1.default.deleteMany({ _id: { $in: taskIdsToDelete } });
        // Delete the goal by ID
        const deletedGoal = yield goal_model_1.default.findByIdAndDelete(goalId);
        res.status(200).json({
            isError: false,
            message: "Goal deleted successfully",
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.deleteGoal = deleteGoal;
const deleteTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teamId = req.params.teamId;
        const team = yield team_model_1.default.findById(teamId);
        if (!team) {
            return res
                .status(404)
                .json({ isError: true, message: "Team not found" });
        }
        const taskIdsToDelete = [
            ...team.dailyTasks.map((task) => task.taskId),
            ...team.reminders.map((task) => task.taskId),
            ...team.tasks.map((task) => task.taskId),
        ];
        // Delete the tasks associated with the team
        yield task_model_1.default.deleteMany({ _id: { $in: taskIdsToDelete } });
        const goalIdsToDelete = team.goals.map((goal) => goal.goalId);
        // Delete goals and associated tasks
        yield Promise.all(goalIdsToDelete.map((goalId) => __awaiter(void 0, void 0, void 0, function* () {
            const goal = yield goal_model_1.default.findById(goalId);
            if (goal) {
                const taskIdsInGoal = goal.steps.map((step) => step.taskId);
                yield task_model_1.default.deleteMany({ _id: { $in: taskIdsInGoal } });
                yield goal_model_1.default.findByIdAndDelete(goalId);
            }
        })));
        // Delete the team by ID
        const deletedTeam = yield team_model_1.default.findByIdAndDelete(teamId);
        res.status(200).json({
            isError: false,
            message: "Team deleted successfully",
            deletedTeam,
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.deleteTeam = deleteTeam;
