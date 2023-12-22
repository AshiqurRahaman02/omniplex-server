"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const omniplex_mail_1 = require("../configs/omniplex.mail");
const sendMail = (req, res, next) => {
    const { to, subject, text, html } = req.body;
    // Set up email options
    const mailOptions = {
        from: "omniplex.vercel@gmail.com",
        to,
        subject,
        text,
        html
    };
    // Send email
    omniplex_mail_1.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({
                isError: true,
                massage: "Error sending email",
            });
        }
        else {
            console.log("Email sent: " + info.response);
            res.status(200).json({ isError: false, massage: "Email sent" });
        }
    });
};
exports.sendMail = sendMail;
