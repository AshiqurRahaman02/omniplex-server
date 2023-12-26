"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const teamSchema = new mongoose_1.Schema({
    isPublic: {
        type: "boolean",
        default: false,
    },
    name: {
        type: String,
        required: true,
    },
    password: { type: String },
    details: {
        type: String,
    },
    createdBy: {
        creatorId: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        creatorName: {
            type: String,
            required: true,
        },
    },
    habits: {
        habitsId: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Task" }],
        tracks: [{}],
    },
    financialsPlans: { budget: String, spends: [{
                date: String,
                allSpends: [{ amount: String, amountType: String, usedFor: String, time: String }]
            }] },
    allMembers: [
        {
            userId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "User",
            },
            userName: {
                type: String,
            },
        },
    ],
    dailyTasks: [
        {
            taskId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Task",
            },
        },
    ],
    reminders: [
        {
            taskId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Task",
            },
        },
    ],
    tasks: [
        {
            taskId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Task",
            },
        },
    ],
    goals: [
        {
            goalId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Goal",
            },
        },
    ],
}, { timestamps: true });
const TeamModel = mongoose_1.default.model("Team", teamSchema);
exports.default = TeamModel;
