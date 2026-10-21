import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '@/lib/jwt';
import { User } from '@/models/user.model';

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({ message: 'You are not logged in' });
      return;
    }

    const decoded = verifyAccessToken(token);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      res.status(401).json({ message: 'The user no longer exists' });
      return;
    }

    req.user = {
      id: currentUser._id.toString(),
      role: currentUser.role,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error });
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res
        .status(403)
        .json({ message: 'You do not have permission to perform this action' });
      return;
    }
    next();
  };
};
