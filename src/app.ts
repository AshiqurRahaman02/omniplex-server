import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


import userRouter from './routes/user.route';
import mailRouter from './routes/omniplex.mail.route';

const app = express();

// Middleware
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routers
app.use("/user", userRouter)
app.use("/mail", mailRouter)

export default app;