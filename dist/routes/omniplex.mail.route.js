"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const omniplex_mail_controller_1 = require("../controllers/omniplex.mail.controller");
const mailRouter = express_1.default.Router();
// Send mail
mailRouter.post("/send-mail", omniplex_mail_controller_1.sendMail);
exports.default = mailRouter;
