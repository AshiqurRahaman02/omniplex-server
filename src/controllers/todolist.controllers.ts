import { Request, Response } from "express";
import TodoListModel from "../models/todo-list/todolist.model";
import TeamModel from "../models/todo-list/team.model";
import GoalModel from "../models/todo-list/goal.model";
import TaskModel from "../models/todo-list/task.model";

export const getTodoList = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		let todolist = await TodoListModel.findOne({ userId }).populate(
			"workList projectList hobbies travelList"
		);

		if (!todolist) {
			todolist = new TodoListModel({
				userId,
				workList: [],
				projectList: [],
				personalList: [],
				hobbiesList: [],
				travelList: [],
			});

			await todolist.save();
		}

		res.status(200).json({ isError: false, todolist });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};

export const addWorkListTeam = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const { isPublic, name, password, details } = req.body;

		// Create a new team
		const newTeam = new TeamModel({
			isPublic,
			name,
			password,
			details,
			createdBy: { creatorId: userId, creatorName: req.user?.name },
			allMembers: [],
			dailyTasks: [],
			reminders: [],
			tasks: [],
			goals: [],
		});
		const savedTeam = await newTeam.save();

		const todoList = await TodoListModel.findOne({ userId });

		if (todoList) {
			todoList.workList.push(savedTeam._id);

			await todoList.save();
		}

		res.status(201).json({ isError: false, team: savedTeam });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};
export const addProjectListTeam = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const { isPublic, name, password, details } = req.body;

		// Create a new team
		const newTeam = new TeamModel({
			isPublic,
			name,
			password,
			details,
			createdBy: { creatorId: userId, creatorName: req.user?.name },
			allMembers: [],
			dailyTasks: [],
			reminders: [],
			tasks: [],
			goals: [],
		});
		const savedTeam = await newTeam.save();

		const todoList = await TodoListModel.findOne({ userId });

		if (todoList) {
			todoList.projectList.push(savedTeam._id);

			await todoList.save();
		}

		res.status(201).json({ isError: false, team: savedTeam });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};
export const addPersonalkListTeam = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const { isPublic, name, password, details } = req.body;

		// Create a new team
		const newTeam = new TeamModel({
			isPublic,
			name,
			password,
			details,
			createdBy: { creatorId: userId, creatorName: req.user?.name },
			allMembers: [],
			dailyTasks: [],
			reminders: [],
			tasks: [],
			goals: [],
		});
		const savedTeam = await newTeam.save();

		const todoList = await TodoListModel.findOne({ userId });

		if (todoList) {
			todoList.personalList.push(savedTeam._id);

			await todoList.save();
		}

		res.status(201).json({ isError: false, team: savedTeam });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};
export const addHobbiesListTeam = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const { isPublic, name, password, details } = req.body;

		// Create a new team
		const newTeam = new TeamModel({
			isPublic,
			name,
			password,
			details,
			createdBy: { creatorId: userId, creatorName: req.user?.name },
			allMembers: [],
			dailyTasks: [],
			reminders: [],
			tasks: [],
			goals: [],
		});
		const savedTeam = await newTeam.save();

		const todoList = await TodoListModel.findOne({ userId });

		if (todoList) {
			todoList.hobbiesList.push(savedTeam._id);

			await todoList.save();
		}

		res.status(201).json({ isError: false, team: savedTeam });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};
export const addTravelListTeam = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const { isPublic, name, password, details } = req.body;

		// Create a new team
		const newTeam = new TeamModel({
			isPublic,
			name,
			password,
			details,
			createdBy: { creatorId: userId, creatorName: req.user?.name },
			allMembers: [],
			dailyTasks: [],
			reminders: [],
			tasks: [],
			goals: [],
		});
		const savedTeam = await newTeam.save();

		const todoList = await TodoListModel.findOne({ userId });

		if (todoList) {
			todoList.travelList.push(savedTeam._id);

			await todoList.save();
		}

		res.status(201).json({ isError: false, team: savedTeam });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};

export const addDailyTask = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const { name, details, deadline, lastResetTime } = req.body;
		const teamId = req.params.teamId;

		// Create a new task
		const newTask = new TaskModel({
			name,
			details,
			createdBy: { creatorId: userId, creatorName: req.user?.name },
			deadline,
			lastResetTime,
		});

		const savedTask = await newTask.save();

		const team = await TeamModel.findById(teamId);

		if (team) {
			team.dailyTasks.push(savedTask._id);

			await team.save();
		}

		res.status(201).json({ isError: false, team });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};
export const addReminder = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const { name, details, deadline } = req.body;
		const teamId = req.params.teamId;

		// Create a new task
		const newTask = new TaskModel({
			name,
			details,
			createdBy: { creatorId: userId, creatorName: req.user?.name },
			deadline,
		});

		const savedTask = await newTask.save();

		const team = await TeamModel.findById(teamId);

		if (team) {
			team.reminders.push(savedTask._id);

			await team.save();
		}

		res.status(201).json({ isError: false, team });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};
export const addTask = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const { name, details, deadline } = req.body;
		const teamId = req.params.teamId;

		// Create a new task
		const newTask = new TaskModel({
			name,
			details,
			createdBy: { creatorId: userId, creatorName: req.user?.name },
			assignedTo: [],
			deadline,
		});

		const savedTask = await newTask.save();

		const team = await TeamModel.findById(teamId);

		if (team) {
			team.tasks.push(savedTask._id);

			await team.save();
		}

		res.status(201).json({ isError: false, team });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};
export const addGoal = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const { name, details, createdBy, steps, deadline } = req.body;
		const teamId = req.params.teamId;

		const createdTasks = await Promise.all(
			steps.map(async (step: any) => {
				const newTask = new TaskModel({
					name: step.name,
					details: step.details,
					createdBy: { creatorId: userId, creatorName: req.user?.name },
					deadline: step.deadline,
				});
				return await newTask.save();
			})
		);

		// Create a new goal
		const newGoal = new GoalModel({
			name,
			details,
			createdBy,
			steps: createdTasks.map((task) => ({ taskId: task._id })),
			deadline,
		});

		const savedGoal = await newGoal.save();

		const team = await TeamModel.findById(teamId);

		if (team) {
			team.goals.push(savedGoal._id);

			await team.save();
		}

		res.status(201).json({ isError: false, team });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};

export const resetDailyTasks = async () => {
	const currentTime = new Date();
	const midnight = new Date(currentTime);
	midnight.setHours(0, 0, 0, 0);

	// Find tasks that need to be reset
	const tasksToReset = await TaskModel.find({
		lastResetTime: { $lt: midnight.toISOString() },
	});

	// Reset tasks
	tasksToReset.forEach(async (task: any) => {
		task.done.isDone = false;
		task.done.doneBy = {};
		task.done.time = "";
		task.lastResetTime = currentTime.toISOString();
		await task.save();
	});

	console.log("Daily tasks reset successfully.");
};

export const updateTeam = async (req: Request, res: Response) => {
	try {
		const teamId = req.params.teamId;
		const updateData = req.body;

		// Update the team by ID
		const updatedTeam = await TeamModel.updateOne(
			{ _id: teamId },
			{ $set: updateData }
		);

		res.status(200).json({
			isError: false,
			message: "Team updated successfully",
			updatedTeam,
		});
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};
export const updateTask = async (req: Request, res: Response) => {
	try {
		const taskId = req.params.taskId;
		const updateData = req.body;

		// Update the task by ID
		const updatedTask = await TaskModel.updateOne(
			{ _id: taskId },
			{ $set: updateData }
		);

		res.status(200).json({
			isError: false,
			message: "Task updated successfully",
			updatedTask,
		});
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};
export const updateGoal = async (req: Request, res: Response) => {
	try {
		const goalId = req.params.goalId;
		const updateData = req.body;

		// Update the goal by ID
		const updatedGoal = await GoalModel.updateOne(
			{ _id: goalId },
			{ $set: updateData }
		);

		res.status(200).json({
			isError: false,
			message: "Goal updated successfully",
			updatedGoal,
		});
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};

export const deleteTask = async (req: Request, res: Response) => {
	try {
		const taskId = req.params.taskId;

		// Delete the task by ID
		const deletedTask = await TaskModel.findByIdAndDelete(taskId);

		if (!deletedTask) {
			return res
				.status(404)
				.json({ isError: true, message: "Task not found" });
		}

		res.status(200).json({
			isError: false,
			message: "Task deleted successfully",
		});
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};
export const deleteGoal = async (req: Request, res: Response) => {
	try {
		const goalId = req.params.goalId;

		const goal = await GoalModel.findById(goalId);

		if (!goal) {
			return res
				.status(404)
				.json({ isError: true, message: "Goal not found" });
		}

		const taskIdsToDelete = goal.steps.map((step) => step.taskId);

		// Delete the tasks associated with the goal's steps
		await TaskModel.deleteMany({ _id: { $in: taskIdsToDelete } });

		// Delete the goal by ID
		const deletedGoal = await GoalModel.findByIdAndDelete(goalId);

		res.status(200).json({
			isError: false,
			message: "Goal deleted successfully",
		});
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};
export const deleteTeam = async (req: Request, res: Response) => {
	try {
		const teamId = req.params.teamId;

		const team = await TeamModel.findById(teamId);

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
		await TaskModel.deleteMany({ _id: { $in: taskIdsToDelete } });

		const goalIdsToDelete = team.goals.map((goal) => goal.goalId);

		// Delete goals and associated tasks
		await Promise.all(
			goalIdsToDelete.map(async (goalId) => {
				const goal = await GoalModel.findById(goalId);

				if (goal) {
					const taskIdsInGoal = goal.steps.map((step) => step.taskId);

					await TaskModel.deleteMany({ _id: { $in: taskIdsInGoal } });

					await GoalModel.findByIdAndDelete(goalId);
				}
			})
		);

		// Delete the team by ID
		const deletedTeam = await TeamModel.findByIdAndDelete(teamId);

		res.status(200).json({
			isError: false,
			message: "Team deleted successfully",
			deletedTeam,
		});
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};
