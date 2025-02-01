import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Adjust the import based on your project structure

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
    if (!user) {
      throw new Error('No user provided');
    }
    console.log('User:', user); // Log the user object
    const token = generateJWT(user);
    console.log('Generated Token:', token); // Log the generated token
    const redirectUrl = `https://posthearts.vercel.app/api/auth?token=${token}&name=${encodeURIComponent(user.name)}&profile_picture=${encodeURIComponent(user.profile_picture)}`;
    console.log('Redirect URL:', redirectUrl); // Log the redirect URL
    res.redirect(redirectUrl);
  } catch (err) {
    next(err);
  }
};