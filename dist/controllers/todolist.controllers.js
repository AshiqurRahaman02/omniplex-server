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
exports.deleteTeam = exports.deleteGoal = exports.deleteTask = exports.addMessage = exports.updateTaskDone = exports.updateGoal = exports.updateTask = exports.updateTeam = exports.resetDailyTasks = exports.addSpends = exports.updateBudget = exports.addHabit = exports.addSteps = exports.addGoal = exports.addTask = exports.addReminder = exports.addDailyTask = exports.markNotificationAsRead = exports.joinTeam = exports.addMembers = exports.deleteNote = exports.updateNote = exports.addNote = exports.addTravelListTeam = exports.addHobbiesListTeam = exports.addPersonalkListTeam = exports.addProjectListTeam = exports.addWorkListTeam = exports.getTodoList = void 0;
const todolist_model_1 = __importDefault(require("../models/todo-list/todolist.model"));
const team_model_1 = __importDefault(require("../models/todo-list/team.model"));
const goal_model_1 = __importDefault(require("../models/todo-list/goal.model"));
const task_model_1 = __importDefault(require("../models/todo-list/task.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const getPopulatedTodoList = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const todoList = yield todolist_model_1.default.findOne({ userId })
        .populate({
        path: "workList",
        populate: {
            path: "dailyTasks reminders tasks",
            model: "Task",
        },
    })
        .populate({
        path: "workList",
        populate: {
            path: "goals",
            model: "Goal",
        },
    })
        .populate({
        path: "workList",
        populate: {
            path: "goals",
            populate: {
                path: "steps",
                model: "Task",
            },
        },
    })
        .exec();
    return todoList;
});
const getTodoList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        console.log("checking");
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        let todolist = yield getPopulatedTodoList(userId);
        if (!todolist) {
            todolist = new todolist_model_1.default({
                userId,
                workList: [],
                projectList: [],
                hobbiesList: [],
                travelList: [],
                notifications: [],
                notes: [],
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
            teamType: "work",
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
        const updatedTodolist = yield getPopulatedTodoList(userId);
        res.status(201).json({ isError: false, todoList: updatedTodolist });
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
            teamType: "project",
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
        const updatedTodolist = yield getPopulatedTodoList(userId);
        res.status(201).json({ isError: false, todoList: updatedTodolist });
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
        const { name, password, details } = req.body;
        // Create a new team
        const newTeam = new team_model_1.default({
            isPublic: false,
            name,
            password,
            details,
            teamType: "personal",
            createdBy: { creatorId: userId, creatorName: (_g = req.user) === null || _g === void 0 ? void 0 : _g.name },
            dailyTasks: [],
            reminders: [],
            tasks: [],
            goals: [],
            habits: { habitsId: [], tracks: [{}] },
            financialsPlans: { budget: "", spends: [{}] },
        });
        const savedTeam = yield newTeam.save();
        const todoList = yield todolist_model_1.default.findOne({ userId });
        if (todoList) {
            todoList.personalList = savedTeam._id;
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
            teamType: "hobbies",
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
            teamType: "travel",
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
const addNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _m;
    try {
        const userId = (_m = req.user) === null || _m === void 0 ? void 0 : _m._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const { title, note } = req.body;
        let todolist = yield todolist_model_1.default.findOne({ userId });
        if (!todolist) {
            todolist = new todolist_model_1.default({
                userId,
                workList: [],
                projectList: [],
                hobbiesList: [],
                travelList: [],
                notifications: [],
                notes: [{ title, note }],
            });
        }
        else {
            todolist.notes.push({ title, note });
        }
        yield todolist.save();
        const updatedTodolist = yield getPopulatedTodoList(userId);
        res.status(201).json({
            isError: false,
            message: "Note added successfully",
            todoList: updatedTodolist,
        });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            isError: true,
            message: "Internal Server Error",
        });
    }
});
exports.addNote = addNote;
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _o;
    try {
        const userId = (_o = req.user) === null || _o === void 0 ? void 0 : _o._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const { notes } = req.body;
        const todolist = yield todolist_model_1.default.findOne({ userId });
        if (!todolist) {
            return res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        todolist.notes = notes;
        yield todolist.save();
        const updatedTodolist = yield getPopulatedTodoList(userId);
        res.status(201).json({
            isError: false,
            message: "Note updated successfully",
            todoList: updatedTodolist,
        });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            isError: true,
            message: "Internal Server Error",
        });
    }
});
exports.updateNote = updateNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _p;
    try {
        const userId = (_p = req.user) === null || _p === void 0 ? void 0 : _p._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const { index } = req.params;
        // Find the user's todolist based on the provided userId
        const todolist = yield todolist_model_1.default.findOne({ userId });
        if (!todolist) {
            return res.status(404).json({
                isError: true,
                message: "Todolist not found",
            });
        }
        // Remove the note at the specified index
        if (+index >= 0 && +index < todolist.notes.length) {
            todolist.notes.splice(+index, 1);
        }
        else {
            return res.status(404).json({
                isError: true,
                message: "Note not found at the specified index",
            });
        }
        // Save the updated todolist
        yield todolist.save();
        const updatedTodolist = yield getPopulatedTodoList(userId);
        res.status(201).json({
            isError: false,
            message: "Note deleted successfully",
            todoList: updatedTodolist,
        });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            isError: true,
            message: "Internal Server Error",
        });
    }
});
exports.deleteNote = deleteNote;
const addMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _q, _r;
    try {
        const userId = (_q = req.user) === null || _q === void 0 ? void 0 : _q._id;
        console.log("checking");
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const teamId = req.params.teamId;
        const { membersEmails } = req.body;
        if (!membersEmails) {
            return res
                .status(401)
                .json({ isError: true, message: "Members emails needed" });
        }
        const team = yield team_model_1.default.findById(teamId);
        if (!team || team.createdBy.creatorId.toString() !== userId.toString()) {
            return res
                .status(401)
                .json({ isError: true, message: "Unauthorized action" });
        }
        const emailsForSendInvitation = membersEmails.filter((email) => !team.invitations.includes(email));
        const newMembers = yield user_model_1.default.find({
            email: { $in: emailsForSendInvitation },
        });
        if (newMembers.length === 0) {
            return res
                .status(401)
                .json({ isError: true, message: "No user found" });
        }
        for (const newMember of newMembers) {
            let newTodoList = yield todolist_model_1.default.findOne({
                userId: newMember._id,
            });
            if (!newTodoList) {
                newTodoList = new todolist_model_1.default({
                    userId: newMember._id,
                    workList: [],
                    projectList: [],
                    hobbiesList: [],
                    travelList: [],
                    notifications: [],
                    notes: [],
                });
                yield newTodoList.save();
            }
            const notification = {
                heading: "Team Invitation",
                text: `You have been invited to join the team "${team.name}"`,
                link: `/todolist/team/join/${teamId}`,
                isRead: false,
                time: new Date().toISOString(),
            };
            newTodoList.notifications.push(notification);
            team.invitations.push(newMember.email);
            yield newTodoList.save();
        }
        let newUpdate = {
            userId,
            userName: ((_r = req.user) === null || _r === void 0 ? void 0 : _r.name) || "",
            message: `Invitations sent successfully`,
            updateType: "update",
            time: new Date().toISOString(),
        };
        team.updates.push(newUpdate);
        yield team.save();
        const updatedTodolist = yield getPopulatedTodoList(userId);
        res.status(201).json({
            isError: false,
            message: "Invitations sent successfully",
            todoList: updatedTodolist,
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.addMembers = addMembers;
const joinTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _s, _t, _u, _v;
    try {
        const userId = (_s = req.user) === null || _s === void 0 ? void 0 : _s._id;
        const userEmail = ((_t = req.user) === null || _t === void 0 ? void 0 : _t.email) || "";
        if (!userId || !userEmail) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const teamId = req.params.teamId;
        // Find the user's TodoList
        let userTodoList = yield todolist_model_1.default.findOne({ userId });
        if (!userTodoList) {
            userTodoList = new todolist_model_1.default({
                userId: userId,
                workList: [],
                projectList: [],
                hobbiesList: [],
                travelList: [],
                notifications: [],
                notes: [],
            });
            yield userTodoList.save();
        }
        if (userTodoList.workList.includes(teamId)) {
            return res.status(401).json({
                isError: true,
                message: "Already joined in this team",
            });
        }
        // Check if the user's email is in team invitations
        const team = yield team_model_1.default.findById(teamId);
        console.log(team === null || team === void 0 ? void 0 : team.invitations, userEmail);
        if (!team || !team.invitations.includes(userEmail)) {
            return res.status(400).json({
                isError: true,
                message: "Invalid invitation to join the team",
            });
        }
        // Check the team type
        if (team.teamType === "personal") {
            return res.status(401).json({
                isError: true,
                message: "Unauthorized action for tring to join a personal team",
            });
        }
        switch (team.teamType) {
            case "work":
                userTodoList.workList.push(teamId);
                break;
            case "project":
                userTodoList.projectList.push(teamId);
                break;
            case "hobbies":
                userTodoList.hobbiesList.push(teamId);
                break;
            case "travel":
                userTodoList.travelList.push(teamId);
                break;
            default:
                return res.status(401).json({
                    isError: true,
                    message: "Unauthorized action for joining a invalid team",
                });
                break;
        }
        let newMember = { userId, userName: ((_u = req.user) === null || _u === void 0 ? void 0 : _u.name) || "" };
        team.allMembers.push(newMember);
        team.invitations = team.invitations.filter((email) => email !== userEmail);
        let newUpdate = {
            userId,
            userName: ((_v = req.user) === null || _v === void 0 ? void 0 : _v.name) || "",
            message: `joined`,
            updateType: "update",
            time: new Date().toISOString(),
        };
        team.updates.push(newUpdate);
        yield Promise.all([userTodoList.save(), team.save()]);
        const updatedTodolist = yield getPopulatedTodoList(userId);
        res.status(200).json({
            isError: false,
            message: "Successfully joined the team",
            todoList: updatedTodolist,
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.joinTeam = joinTeam;
const markNotificationAsRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _w;
    try {
        const userId = (_w = req.user) === null || _w === void 0 ? void 0 : _w._id;
        console.log("checking");
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const { time } = req.params;
        // Find the user's todo list
        const todoList = yield todolist_model_1.default.findOne({ userId });
        if (todoList) {
            const notificationToUpdate = todoList.notifications.find((notification) => notification.time === time);
            if (!notificationToUpdate) {
                return res
                    .status(404)
                    .json({ isError: true, message: "Notification not found" });
            }
            notificationToUpdate.isRead = true;
            yield todoList.save();
            return res.json({
                isError: false,
                message: "Notification marked as read",
            });
        }
        res.status(500).json({
            isError: true,
            message: "Internal Server Error",
        });
    }
    catch (error) {
        console.error("Error:", error);
        return res
            .status(500)
            .json({ isError: true, message: "Internal Server Error" });
    }
});
exports.markNotificationAsRead = markNotificationAsRead;
const addDailyTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _x, _y;
    try {
        const userId = (_x = req.user) === null || _x === void 0 ? void 0 : _x._id;
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
            createdBy: { creatorId: userId, creatorName: (_y = req.user) === null || _y === void 0 ? void 0 : _y.name },
            deadline,
            taskType: "dailytask",
        });
        const savedTask = yield newTask.save();
        const team = yield team_model_1.default.findById(teamId);
        if (team) {
            team.dailyTasks.push(savedTask._id);
            yield team.save();
        }
        const updatedTodolist = yield getPopulatedTodoList(userId);
        res.status(201).json({ isError: false, todoList: updatedTodolist });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.addDailyTask = addDailyTask;
const addReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _z, _0;
    try {
        const userId = (_z = req.user) === null || _z === void 0 ? void 0 : _z._id;
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
            createdBy: { creatorId: userId, creatorName: (_0 = req.user) === null || _0 === void 0 ? void 0 : _0.name },
            deadline,
            taskType: "reminder",
        });
        const savedTask = yield newTask.save();
        const team = yield team_model_1.default.findById(teamId);
        if (team) {
            team.reminders.push(savedTask._id);
            yield team.save();
        }
        const updatedTodolist = yield getPopulatedTodoList(userId);
        res.status(201).json({ isError: false, todoList: updatedTodolist });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.addReminder = addReminder;
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _1, _2;
    try {
        const userId = (_1 = req.user) === null || _1 === void 0 ? void 0 : _1._id;
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
            createdBy: { creatorId: userId, creatorName: (_2 = req.user) === null || _2 === void 0 ? void 0 : _2.name },
            assignedTo: [],
            deadline,
            taskType: "task",
        });
        const savedTask = yield newTask.save();
        const team = yield team_model_1.default.findById(teamId);
        if (team) {
            team.tasks.push(savedTask._id);
            yield team.save();
        }
        const updatedTodolist = yield getPopulatedTodoList(userId);
        res.status(201).json({ isError: false, todoList: updatedTodolist });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.addTask = addTask;
const addGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _3, _4;
    try {
        const userId = (_3 = req.user) === null || _3 === void 0 ? void 0 : _3._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        let { name, details, steps, deadline, finalGoal } = req.body;
        const teamId = req.params.teamId;
        if (!steps) {
            steps = [];
        }
        const createdTasks = yield Promise.all(steps.map((step) => __awaiter(void 0, void 0, void 0, function* () {
            var _5;
            const newTask = new task_model_1.default({
                name: step.name,
                details: step.details,
                createdBy: { creatorId: userId, creatorName: (_5 = req.user) === null || _5 === void 0 ? void 0 : _5.name },
                deadline: step.deadline,
                taskType: "step",
            });
            return yield newTask.save();
        })));
        // Create a new goal
        const newGoal = new goal_model_1.default({
            name,
            details,
            createdBy: { creatorId: userId, creatorName: (_4 = req.user) === null || _4 === void 0 ? void 0 : _4.name },
            steps: createdTasks.map((task) => ({ taskId: task._id })),
            deadline,
            finalGoal,
        });
        const savedGoal = yield newGoal.save();
        const team = yield team_model_1.default.findById(teamId);
        if (team) {
            team.goals.push(savedGoal._id);
            yield team.save();
        }
        const updatedTodolist = yield getPopulatedTodoList(userId);
        res.status(201).json({ isError: false, todoList: updatedTodolist });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.addGoal = addGoal;
const addSteps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _6;
    try {
        const userId = (_6 = req.user) === null || _6 === void 0 ? void 0 : _6._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const goalId = req.params.goalId;
        const { steps } = req.body;
        const goal = yield goal_model_1.default.findById(goalId);
        if (!goal) {
            return res
                .status(404)
                .json({ isError: true, message: "Goal not found" });
        }
        // Create tasks for the steps
        const createdTasks = yield Promise.all(steps.map((step) => __awaiter(void 0, void 0, void 0, function* () {
            var _7;
            const newTask = new task_model_1.default({
                name: step.name,
                details: step.details,
                createdBy: { creatorId: userId, creatorName: (_7 = req.user) === null || _7 === void 0 ? void 0 : _7.name },
                deadline: step.deadline,
                taskType: "step",
            });
            return yield newTask.save();
        })));
        goal.steps.push(...createdTasks.map((task) => task));
        yield goal.save();
        const updatedTodolist = yield getPopulatedTodoList(userId);
        res.status(201).json({ isError: false, todoList: updatedTodolist });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.addSteps = addSteps;
const addHabit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _8;
    try {
        const userId = (_8 = req.user) === null || _8 === void 0 ? void 0 : _8._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const teamId = req.params.teamId;
        const { habits } = req.body;
        // Find the team by ID
        const team = yield team_model_1.default.findById(teamId);
        if (!team) {
            return res
                .status(404)
                .json({ isError: true, message: "Team not found" });
        }
        // Create tasks for habits
        const createdTasks = yield Promise.all(habits.map((habit) => __awaiter(void 0, void 0, void 0, function* () {
            var _9;
            const newTask = new task_model_1.default({
                name: habit.name,
                details: habit.details,
                createdBy: { creatorId: userId, creatorName: (_9 = req.user) === null || _9 === void 0 ? void 0 : _9.name },
                deadline: habit.deadline,
                taskType: "habit",
            });
            return yield newTask.save();
        })));
        // Add the habit tasks to the team's habits collection
        team.habits.habitsId.push(...createdTasks.map((task) => task._id));
        // Save the updated team
        yield team.save();
        res.status(201).json({
            isError: false,
            message: "Habits added to the team successfully",
            team,
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.addHabit = addHabit;
const updateBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teamId = req.params.teamId;
        const { budget } = req.body;
        const team = yield team_model_1.default.findById(teamId);
        if (!team) {
            return res
                .status(404)
                .json({ isError: true, message: "Team not found" });
        }
        // Update the budget in financial plans
        team.financialsPlans.budget = budget;
        yield team.save();
        res.status(200).json({
            isError: false,
            message: "Budget updated successfully",
            team,
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.updateBudget = updateBudget;
const addSpends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teamId = req.params.teamId;
        const { spends } = req.body;
        const team = yield team_model_1.default.findById(teamId);
        if (!team) {
            return res
                .status(404)
                .json({ isError: true, message: "Team not found" });
        }
        const todayDate = new Date().toISOString().split("T")[0];
        const lastSpend = team.financialsPlans.spends.slice(-1)[0];
        if (lastSpend && lastSpend.date === todayDate) {
            lastSpend.allSpends.push(...spends);
        }
        else {
            team.financialsPlans.spends.push({
                date: todayDate,
                allSpends: spends,
            });
        }
        // Save the updated team
        yield team.save();
        res.status(200).json({
            isError: false,
            message: "Spends added successfully",
            team,
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.addSpends = addSpends;
const resetDailyTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    // Find daily tasks that need to be reset
    const tasksToReset = yield task_model_1.default.find({
        taskType: "dailytask",
        "done.isDone": true,
    });
    // Reset tasks
    tasksToReset.forEach((task) => __awaiter(void 0, void 0, void 0, function* () {
        task.done.isDone = false;
        task.done.doneBy = {};
        task.done.time = "";
        yield task.save();
    }));
    console.log("Daily tasks reset successfully.");
});
exports.resetDailyTasks = resetDailyTasks;
const updateTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _10;
    try {
        const userId = (_10 = req.user) === null || _10 === void 0 ? void 0 : _10._id;
        console.log("checking");
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const teamId = req.params.teamId;
        const updateData = req.body;
        // Update the team by ID
        const updatedTeam = yield team_model_1.default.updateOne({ _id: teamId }, { $set: updateData });
        const updatedTodolist = yield getPopulatedTodoList(userId);
        res.status(201).json({
            isError: false,
            message: "Team updated successfully",
            todoList: updatedTodolist,
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.updateTeam = updateTeam;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _11;
    try {
        const userId = (_11 = req.user) === null || _11 === void 0 ? void 0 : _11._id;
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const taskId = req.params.taskId;
        const updateData = req.body;
        // Update the task by ID
        const updatedTask = yield task_model_1.default.updateOne({ _id: taskId }, { $set: updateData });
        const updatedTodolist = yield getPopulatedTodoList(userId);
        res.status(201).json({
            isError: false,
            message: "Task updated successfully",
            todoList: updatedTodolist,
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
const updateTaskDone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _12, _13;
    try {
        const userId = (_12 = req.user) === null || _12 === void 0 ? void 0 : _12._id;
        const userName = (_13 = req.user) === null || _13 === void 0 ? void 0 : _13.name;
        if (!userId || !userName) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const taskId = req.params.taskId;
        const task = yield task_model_1.default.findById(taskId);
        if (!task) {
            return res
                .status(404)
                .json({ isError: true, message: "Task not found" });
        }
        // Check if the task is not done
        if (!task.done.isDone) {
            // Update task as done
            task.done.isDone = true;
            task.done.doneBy = {
                userId: userId,
                userName: userName || "",
            };
            task.done.time = new Date().toISOString();
            yield task.save();
            const updatedTodolist = yield getPopulatedTodoList(userId);
            return res.status(200).json({
                isError: false,
                message: "Task marked as done",
                todoList: updatedTodolist,
            });
        }
        // If the task is already done, allow admin to update
        if (task.createdBy.creatorId.toString() === userId.toString()) {
            task.done.isDone = false;
            task.done.doneBy = {
                userId: userId,
                userName: userName || "",
            };
            task.done.time = new Date().toISOString();
            yield task.save();
            const updatedTodolist = yield getPopulatedTodoList(userId);
            return res.status(200).json({
                isError: false,
                message: "Task marked as not done",
                todoList: updatedTodolist,
            });
        }
        return res
            .status(403)
            .json({ isError: true, message: "Permission denied to update task" });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ isError: true, message: "Internal Server Error" });
    }
});
exports.updateTaskDone = updateTaskDone;
const addMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _14, _15;
    try {
        const { teamId } = req.params;
        const { message } = req.body;
        const userId = (_14 = req.user) === null || _14 === void 0 ? void 0 : _14._id;
        const userName = (_15 = req.user) === null || _15 === void 0 ? void 0 : _15.name;
        // Check if userId and userName are present
        if (!userId || !userName) {
            return res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        // Find the team based on the provided teamId
        const team = yield team_model_1.default.findById(teamId);
        if (!team) {
            return res.status(404).json({
                isError: true,
                message: "Team not found",
            });
        }
        // Add the new message to the updates array
        team.updates.push({
            userId,
            userName,
            message,
            updateType: "message",
            time: new Date().toISOString(),
        });
        // Save the updated team
        yield team.save();
        const updatedTodolist = yield getPopulatedTodoList(userId);
        return res.status(200).json({
            isError: false,
            todoList: updatedTodolist,
        });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            isError: true,
            message: "Internal Server Error",
        });
    }
});
exports.addMessage = addMessage;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _16;
    try {
        const userId = (_16 = req.user) === null || _16 === void 0 ? void 0 : _16._id;
        console.log("checking");
        if (!userId) {
            res.status(500).json({
                isError: true,
                message: "Internal Server Error",
            });
        }
        const taskId = req.params.taskId;
        // Delete the task by ID
        const deletedTask = yield task_model_1.default.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res
                .status(404)
                .json({ isError: true, message: "Task not found" });
        }
        const updatedTodolist = yield getPopulatedTodoList(userId);
        res.status(201).json({
            isError: false,
            message: "Task deleted successfully",
            todoList: updatedTodolist,
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
        const taskIdsToDelete = goal.steps.map((step) => step);
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
            ...team.dailyTasks.map((task) => task),
            ...team.reminders.map((task) => task),
            ...team.tasks.map((task) => task),
        ];
        // Delete the tasks associated with the team
        yield task_model_1.default.deleteMany({ _id: { $in: taskIdsToDelete } });
        const goalIdsToDelete = team.goals.map((goal) => goal);
        // Delete goals and associated tasks
        yield Promise.all(goalIdsToDelete.map((goalId) => __awaiter(void 0, void 0, void 0, function* () {
            const goal = yield goal_model_1.default.findById(goalId);
            if (goal) {
                const taskIdsInGoal = goal.steps.map((step) => step);
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
