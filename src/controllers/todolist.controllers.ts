import { Request, Response } from "express";
import TodoListModel from "../models/todo-list/todolist.model";
import TeamModel from "../models/todo-list/team.model";
import GoalModel from "../models/todo-list/goal.model";
import TaskModel from "../models/todo-list/task.model";
import UserModel from "../models/user.model";

const getPopulatedTodoList = async (userId: string) => {
	const todoList = await TodoListModel.findOne({ userId })
		.populate({
			path: "workList projectList personalList",
			populate: {
				path: "dailyTasks reminders tasks",
				model: "Task",
			},
		})
		.populate({
			path: "workList projectList personalList",
			populate: {
				path: "goals",
				model: "Goal",
			},
		})
		.populate({
			path: "workList projectList personalList",
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
};

export const getTodoList = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		const userName = req.user?.name
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		let todolist = await getPopulatedTodoList(userId);

		if (!todolist ) {
			const newTeam = new TeamModel({
				isPublic: false,
				name:userName,
				details:"",
				teamType: "personal",
				createdBy: { creatorId: userId, creatorName: userName },
				dailyTasks: [],
				reminders: [],
				tasks: [],
				goals: [],
				habits: { habitsId: [], tracks: [{}] },
				financialsPlans: { budget: "", spends: [{}] },
			});
			const savedTeam = await newTeam.save();

			todolist = new TodoListModel({
				userId,
				workList: [],
				projectList: savedTeam._id,
				hobbiesList: [],
				travelList: [],
				notifications: [],
				notes: [],
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
			teamType: "work",
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

		const updatedTodolist = await getPopulatedTodoList(userId);

		res.status(201).json({ isError: false, todoList: updatedTodolist });
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
			teamType: "project",
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
		const updatedTodolist = await getPopulatedTodoList(userId);

		res.status(201).json({ isError: false, todoList: updatedTodolist });
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

		const { name, password, details } = req.body;

		// Create a new team
		const newTeam = new TeamModel({
			isPublic: false,
			name,
			password,
			details,
			teamType: "personal",
			createdBy: { creatorId: userId, creatorName: req.user?.name },
			dailyTasks: [],
			reminders: [],
			tasks: [],
			goals: [],
			habits: { habitsId: [], tracks: [{}] },
			financialsPlans: { budget: "", spends: [{}] },
		});
		const savedTeam = await newTeam.save();

		const todoList = await TodoListModel.findOne({ userId });

		if (todoList) {
			todoList.personalList = savedTeam._id;

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
			teamType: "hobbies",
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
			teamType: "travel",
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

export const addNote = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}
		const { title, note } = req.body;

		let todolist = await TodoListModel.findOne({ userId });

		if (!todolist) {
			todolist = new TodoListModel({
				userId,
				workList: [],
				projectList: [],
				hobbiesList: [],
				travelList: [],
				notifications: [],
				notes: [{ title, note }],
			});
		} else {
			todolist.notes.push({ title, note });
		}

		await todolist.save();

		const updatedTodolist = await getPopulatedTodoList(userId);

		res.status(201).json({
			isError: false,
			message: "Note added successfully",
			todoList: updatedTodolist,
		});
	} catch (error) {
		console.error("Error:", error);
		return res.status(500).json({
			isError: true,
			message: "Internal Server Error",
		});
	}
};
export const updateNote = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}
		const { notes } = req.body;


		const todolist = await TodoListModel.findOne({ userId });

		if (!todolist) {
			return res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		todolist.notes=notes

		await todolist.save();

		const updatedTodolist = await getPopulatedTodoList(userId);

		res.status(201).json({
			isError: false,
			message: "Note updated successfully",
			todoList: updatedTodolist,
		});
	} catch (error) {
		console.error("Error:", error);
		return res.status(500).json({
			isError: true,
			message: "Internal Server Error",
		});
	}
};
export const deleteNote = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}
		const { index } = req.params;

		// Find the user's todolist based on the provided userId
		const todolist = await TodoListModel.findOne({ userId });

		if (!todolist) {
			return res.status(404).json({
				isError: true,
				message: "Todolist not found",
			});
		}

		// Remove the note at the specified index
		if (+index >= 0 && +index < todolist.notes.length) {
			todolist.notes.splice(+index, 1);
		} else {
			return res.status(404).json({
				isError: true,
				message: "Note not found at the specified index",
			});
		}

		// Save the updated todolist
		await todolist.save();

		const updatedTodolist = await getPopulatedTodoList(userId);

		res.status(201).json({
			isError: false,
			message: "Note deleted successfully",
			todoList: updatedTodolist,
		});
	} catch (error) {
		console.error("Error:", error);
		return res.status(500).json({
			isError: true,
			message: "Internal Server Error",
		});
	}
};

export const addMembers = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
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

		const team = await TeamModel.findById(teamId);
		if (!team || team.createdBy.creatorId.toString() !== userId.toString()) {
			return res
				.status(401)
				.json({ isError: true, message: "Unauthorized action" });
		}

		const emailsForSendInvitation = membersEmails.filter(
			(email: string) => !team.invitations.includes(email)
		);

		const newMembers = await UserModel.find({
			email: { $in: emailsForSendInvitation },
		});

		if (newMembers.length === 0) {
			return res
				.status(401)
				.json({ isError: true, message: "No user found" });
		}

		for (const newMember of newMembers) {
			let newTodoList = await TodoListModel.findOne({
				userId: newMember._id,
			});

			if (!newTodoList) {
				newTodoList = new TodoListModel({
					userId: newMember._id,
					workList: [],
					projectList: [],
					hobbiesList: [],
					travelList: [],
					notifications: [],
					notes: [],
				});
				await newTodoList.save();
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

			await newTodoList.save();
		}

		let newUpdate = {
			userId,
			userName: req.user?.name || "",
			message: `Invitations sent successfully`,
			updateType: "update",
			time: new Date().toISOString(),
		};
		team.updates.push(newUpdate);

		await team.save();

		const updatedTodolist = await getPopulatedTodoList(userId);

		res.status(201).json({
			isError: false,
			message: "Invitations sent successfully",
			todoList: updatedTodolist,
		});
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};
export const joinTeam = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		const userEmail = req.user?.email || "";
		if (!userId || !userEmail) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}
		const teamId = req.params.teamId;

		// Find the user's TodoList
		let userTodoList = await TodoListModel.findOne({ userId });

		if (!userTodoList) {
			userTodoList = new TodoListModel({
				userId: userId,
				workList: [],
				projectList: [],
				hobbiesList: [],
				travelList: [],
				notifications: [],
				notes: [],
			});
			await userTodoList.save();
		}

		if (userTodoList.workList.includes(teamId)) {
			return res.status(401).json({
				isError: true,
				message: "Already joined in this team",
			});
		}

		// Check if the user's email is in team invitations
		const team = await TeamModel.findById(teamId);
		console.log(team?.invitations, userEmail);
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

		let newMember = { userId, userName: req.user?.name || "" };
		team.allMembers.push(newMember);
		team.invitations = team.invitations.filter(
			(email) => email !== userEmail
		) as [string];

		let newUpdate = {
			userId,
			userName: req.user?.name || "",
			message: `joined`,
			updateType: "update",
			time: new Date().toISOString(),
		};
		team.updates.push(newUpdate);

		await Promise.all([userTodoList.save(), team.save()]);

		const updatedTodolist = await getPopulatedTodoList(userId);

		res.status(200).json({
			isError: false,
			message: "Successfully joined the team",
			todoList: updatedTodolist,
		});
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};

export const markNotificationAsRead = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const { time } = req.params;

		// Find the user's todo list
		const todoList = await TodoListModel.findOne({ userId });

		if (todoList) {
			const notificationToUpdate = todoList.notifications.find(
				(notification) => notification.time === time
			);

			if (!notificationToUpdate) {
				return res
					.status(404)
					.json({ isError: true, message: "Notification not found" });
			}

			notificationToUpdate.isRead = true;

			await todoList.save();

			return res.json({
				isError: false,
				message: "Notification marked as read",
			});
		}

		res.status(500).json({
			isError: true,
			message: "Internal Server Error",
		});
	} catch (error) {
		console.error("Error:", error);
		return res
			.status(500)
			.json({ isError: true, message: "Internal Server Error" });
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

		const { name, details, deadline } = req.body;
		const teamId = req.params.teamId;

		// Create a new task
		const newTask = new TaskModel({
			name,
			details,
			createdBy: { creatorId: userId, creatorName: req.user?.name },
			deadline,
			taskType: "dailytask",
		});

		const savedTask = await newTask.save();

		const team = await TeamModel.findById(teamId);

		if (team) {
			team.dailyTasks.push(savedTask._id);

			await team.save();
		}

		const updatedTodolist = await getPopulatedTodoList(userId);
		res.status(201).json({ isError: false, todoList: updatedTodolist });
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
			taskType: "reminder",
		});

		const savedTask = await newTask.save();

		const team = await TeamModel.findById(teamId);

		if (team) {
			team.reminders.push(savedTask._id);

			await team.save();
		}

		const updatedTodolist = await getPopulatedTodoList(userId);

		res.status(201).json({ isError: false, todoList: updatedTodolist });
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
			taskType: "task",
		});

		const savedTask = await newTask.save();

		const team = await TeamModel.findById(teamId);

		if (team) {
			team.tasks.push(savedTask._id);

			await team.save();
		}

		const updatedTodolist = await getPopulatedTodoList(userId);

		res.status(201).json({ isError: false, todoList: updatedTodolist });
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

		let { name, details, steps, deadline, finalGoal } = req.body;
		const teamId = req.params.teamId;

		if (!steps) {
			steps = [];
		}

		const createdTasks = await Promise.all(
			steps.map(async (step: any) => {
				const newTask = new TaskModel({
					name: step.name,
					details: step.details,
					createdBy: { creatorId: userId, creatorName: req.user?.name },
					deadline: step.deadline,
					taskType: "step",
				});
				return await newTask.save();
			})
		);

		// Create a new goal
		const newGoal = new GoalModel({
			name,
			details,
			createdBy: { creatorId: userId, creatorName: req.user?.name },
			steps: createdTasks.map((task) => ({ taskId: task._id })),
			deadline,
			finalGoal,
		});

		const savedGoal = await newGoal.save();

		const team = await TeamModel.findById(teamId);

		if (team) {
			team.goals.push(savedGoal._id);

			await team.save();
		}

		const updatedTodolist = await getPopulatedTodoList(userId);

		res.status(201).json({ isError: false, todoList: updatedTodolist });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};
export const addSteps = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const goalId = req.params.goalId;
		const { steps } = req.body;

		const goal = await GoalModel.findById(goalId);

		if (!goal) {
			return res
				.status(404)
				.json({ isError: true, message: "Goal not found" });
		}

		// Create tasks for the steps
		const createdTasks = await Promise.all(
			steps.map(async (step: any) => {
				const newTask = new TaskModel({
					name: step.name,
					details: step.details,
					createdBy: { creatorId: userId, creatorName: req.user?.name },
					deadline: step.deadline,
					taskType: "step",
				});
				return await newTask.save();
			})
		);

		goal.steps.push(...createdTasks.map((task) => task));

		await goal.save();

		const updatedTodolist = await getPopulatedTodoList(userId);

		res.status(201).json({ isError: false, todoList: updatedTodolist });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};

export const addHabit = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const teamId = req.params.teamId;
		const { habits } = req.body;

		// Find the team by ID
		const team = await TeamModel.findById(teamId);

		if (!team) {
			return res
				.status(404)
				.json({ isError: true, message: "Team not found" });
		}

		// Create tasks for habits
		const createdTasks = await Promise.all(
			habits.map(async (habit: any) => {
				const newTask = new TaskModel({
					name: habit.name,
					details: habit.details,
					createdBy: { creatorId: userId, creatorName: req.user?.name },
					deadline: habit.deadline,
					taskType: "habit",
				});
				return await newTask.save();
			})
		);

		// Add the habit tasks to the team's habits collection
		team.habits.habitsId.push(...createdTasks.map((task) => task._id));

		// Save the updated team
		await team.save();

		res.status(201).json({
			isError: false,
			message: "Habits added to the team successfully",
			team,
		});
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};
export const updateBudget = async (req: Request, res: Response) => {
	try {
		const teamId = req.params.teamId;
		const { budget } = req.body;

		const team = await TeamModel.findById(teamId);

		if (!team) {
			return res
				.status(404)
				.json({ isError: true, message: "Team not found" });
		}

		// Update the budget in financial plans
		team.financialsPlans.budget = budget;

		await team.save();

		res.status(200).json({
			isError: false,
			message: "Budget updated successfully",
			team,
		});
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};
export const addSpends = async (req: Request, res: Response) => {
	try {
		const teamId = req.params.teamId;
		const { spends } = req.body;

		const team = await TeamModel.findById(teamId);

		if (!team) {
			return res
				.status(404)
				.json({ isError: true, message: "Team not found" });
		}

		const todayDate = new Date().toISOString().split("T")[0];

		const lastSpend = team.financialsPlans.spends.slice(-1)[0];

		if (lastSpend && lastSpend.date === todayDate) {
			lastSpend.allSpends.push(...spends);
		} else {
			team.financialsPlans.spends.push({
				date: todayDate,
				allSpends: spends,
			});
		}

		// Save the updated team
		await team.save();

		res.status(200).json({
			isError: false,
			message: "Spends added successfully",
			team,
		});
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};

export const resetDailyTasks = async () => {
	// Find daily tasks that need to be reset
	const tasksToReset = await TaskModel.find({
		taskType: "dailytask",
		"done.isDone": true,
	});

	// Reset tasks
	tasksToReset.forEach(async (task: any) => {
		task.done.isDone = false;
		task.done.doneBy = {};
		task.done.time = "";
		await task.save();
	});

	console.log("Daily tasks reset successfully.");
};

export const updateTeam = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const teamId = req.params.teamId;
		const updateData = req.body;

		// Update the team by ID
		const updatedTeam = await TeamModel.updateOne(
			{ _id: teamId },
			{ $set: updateData }
		);

		const updatedTodolist = await getPopulatedTodoList(userId);

		res.status(201).json({
			isError: false,
			message: "Team updated successfully",
			todoList: updatedTodolist,
		});
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};
export const updateTask = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const taskId = req.params.taskId;
		const updateData = req.body;

		// Update the task by ID
		const updatedTask = await TaskModel.updateOne(
			{ _id: taskId },
			{ $set: updateData }
		);

		const updatedTodolist = await getPopulatedTodoList(userId);
		res.status(201).json({
			isError: false,
			message: "Task updated successfully",
			todoList: updatedTodolist,
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

export const updateTaskDone = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		const userName = req.user?.name;
		if (!userId || !userName) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const taskId = req.params.taskId;

		const task = await TaskModel.findById(taskId);

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

			await task.save();

			const updatedTodolist = await getPopulatedTodoList(userId);

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

			await task.save();

			const updatedTodolist = await getPopulatedTodoList(userId);
			return res.status(200).json({
				isError: false,
				message: "Task marked as not done",
				todoList: updatedTodolist,
			});
		}

		return res
			.status(403)
			.json({ isError: true, message: "Permission denied to update task" });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ isError: true, message: "Internal Server Error" });
	}
};

export const addMessage = async (req: Request, res: Response) => {
	try {
		const { teamId } = req.params;
		const { message } = req.body;

		const userId = req.user?._id;
		const userName = req.user?.name;

		// Check if userId and userName are present
		if (!userId || !userName) {
			return res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		// Find the team based on the provided teamId
		const team = await TeamModel.findById(teamId);

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
		await team.save();

		const updatedTodolist = await getPopulatedTodoList(userId);

		return res.status(200).json({
			isError: false,
			todoList: updatedTodolist,
		});
	} catch (error) {
		console.error("Error:", error);
		return res.status(500).json({
			isError: true,
			message: "Internal Server Error",
		});
	}
};

export const deleteTask = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const taskId = req.params.taskId;

		// Delete the task by ID
		const deletedTask = await TaskModel.findByIdAndDelete(taskId);

		if (!deletedTask) {
			return res
				.status(404)
				.json({ isError: true, message: "Task not found" });
		}

		const updatedTodolist = await getPopulatedTodoList(userId);
		res.status(201).json({
			isError: false,
			message: "Task deleted successfully",
			todoList: updatedTodolist,
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

		const taskIdsToDelete = goal.steps.map((step) => step);

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
			...team.dailyTasks.map((task) => task),
			...team.reminders.map((task) => task),
			...team.tasks.map((task) => task),
		];

		// Delete the tasks associated with the team
		await TaskModel.deleteMany({ _id: { $in: taskIdsToDelete } });

		const goalIdsToDelete = team.goals.map((goal) => goal);

		// Delete goals and associated tasks
		await Promise.all(
			goalIdsToDelete.map(async (goalId) => {
				const goal = await GoalModel.findById(goalId);

				if (goal) {
					const taskIdsInGoal = goal.steps.map((step) => step);

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
