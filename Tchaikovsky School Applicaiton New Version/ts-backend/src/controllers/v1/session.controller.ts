import { Request, Response } from 'express';
import { logger } from '@/lib/logger';
import {
  createSession as createSessionService,
  updateSession as updateSessionService,
  deleteSession as deleteSessionService,
  getSessions,
} from '@/services/session.service';
import { Types } from 'mongoose';
import {
  createSessionValidator,
  updateSessionValidator,
} from '@/validators/session.validator';
import { objectIdSchema } from '@/validators/validator.util';

export const getAllSessions = async (req: Request, res: Response) => {
  try {
    let sessions;
    switch (req.user?.role) {
      case 'admin':
        sessions = await getSessions();
        break;

      case 'instructor':
        sessions = await getSessions({
          instructor: new Types.ObjectId(req.user.id),
        });
        break;

      case 'student':
        sessions = await getSessions({
          student: new Types.ObjectId(req.user.id),
        });
        break;
    }
    res.status(200).json({ sessions });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Failed to get sessions', error });
  }
};

export const createSession = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = createSessionValidator.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ message: 'Invalid session data', error });
    }

    const session = await createSessionService(data);
    res.status(201).json({ session });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Failed to create session', error });
  }
};

export const updateSession = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = updateSessionValidator.safeParse(req.body);
    const {
      success: idSuccess,
      data: idData,
      error: idError,
    } = objectIdSchema.safeParse(req.params.id);
    if (!idSuccess || !idData) {
      return res
        .status(400)
        .json({ message: 'Invalid session id', error: idError });
    }
    if (!success) {
      return res.status(400).json({ message: 'Invalid session data', error });
    }

    const session = await updateSessionService(idData.toString(), data);

    res.status(201).json({ session });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Failed to create session', error });
  }
};

export const deleteSession = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = objectIdSchema.safeParse(req.params.id);
    if (!success || !data) {
      return res
        .status(400)
        .json({ message: 'Invalid session id', error: error });
    }
    const session = await deleteSessionService(data.toString());
    res.status(200).json({ session });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Failed to delete session', error });
  }
};
