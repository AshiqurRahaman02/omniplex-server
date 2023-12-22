import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


import userRouter from './routes/user.route';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routers
app.use("/user", userRouter)

export default app;