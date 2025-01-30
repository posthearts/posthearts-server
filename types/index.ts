import { Request } from 'express';

export interface User {
  id: any;
  name: string;
  profile_picture: string;
  // Add other properties if needed
}

export interface AuthenticatedRequest extends Request {
  user?: User;
}