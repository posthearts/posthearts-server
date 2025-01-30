import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface User {
  name: string;
  profile_picture: string;
  // Add other properties if needed
}

const generateJWT = (user: any): string => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};

export const googleAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const user = req.user as User;
    const token = generateJWT(user);
    res.json({
      token,
      user: {
        name: user.name,
        profile_picture: user.profile_picture
      }
    });
  } catch (err) {
    next(err);
  }
};