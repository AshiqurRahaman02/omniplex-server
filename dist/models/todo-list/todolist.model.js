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
const todolistSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    workList: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Team" }],
    projectList: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Team" }],
    personalList: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Team" },
    hobbiesList: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Team" }],
    travelList: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Team" }],
    notifications: [{ heading: String, text: String, link: String, isRead: { type: Boolean, default: false }, time: String }],
    notes: [{ title: String, note: String }]
});
const TodoListModel = mongoose_1.default.model("Todolist", todolistSchema);
exports.default = TodoListModel;
