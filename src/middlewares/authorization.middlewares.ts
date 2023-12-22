import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UserModel, { IUser } from '../models/user.model';
import dotenv from "dotenv";

dotenv.config();

const jwtSecretKey: string = process.env.jwt_secret_key!;

// Extend the Request type to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authorizedUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Assuming the authenticated user's ID is available on req.user.id
      const userId = req.user?.id;
  
      if (!req.user) {
        return res.status(401).json({isError: true, message: 'Unauthorized' });
      }

  
      // Check if the user is either a "creator" or an "admin"
      if (req.user.userType !== 'creator' && req.user.userType !== 'admin') {
        return res.status(403).json({isError: true, message: 'Unauthorized' });
      }
  
      // If the user is authorized, proceed to the next middleware or route handler
      next();
    } catch (error) {
      res.status(500).json({isError: true, message: 'Internal server error' });
    }
  };