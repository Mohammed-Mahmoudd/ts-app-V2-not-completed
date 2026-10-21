import { Request, Response } from 'express';
import { User } from '@/models/user.model';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users', details: error });
  }
};
