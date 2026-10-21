import { logger } from '@/lib/logger';
import { Session } from '@/models/session.model';
import {
  createFeedback,
  getFeedbacks,
  updateFeedback as updateFeedbackService,
  deleteFeedback as deleteFeedbackService,
} from '@/services/feedback.service';
import {
  addFeedbackValidator,
  updateFeedbackValidator,
} from '@/validators/feedback.validator';
import { objectIdSchema } from '@/validators/validator.util';
import { Request, Response } from 'express';
import { Types } from 'mongoose';

export const addFeedback = async (req: Request, res: Response) => {
  try {
    const {
      success: sessionSuccess,
      data: sessionId,
      error: sessionError,
    } = objectIdSchema.safeParse(req.params);
    if (!sessionSuccess) {
      return res
        .status(400)
        .json({ message: 'Invalid session ID', error: sessionError });
    }
    const { success, data, error } = addFeedbackValidator.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ message: 'Invalid feedback data', error });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    const feedback = await createFeedback({
      session: sessionId,
      user: new Types.ObjectId(req.user!.id),
      comment: data.comment,
      rating: data.rating,
      HWComment: data.HWComment,
      HWRating: data.HWRating,
    });

    return res
      .status(201)
      .json({ message: 'Feedback added successfully', feedback });
  } catch (error) {
    logger.error(error, 'Error adding feedback');
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllFeedbacks = async (req: Request, res: Response) => {
  try {
    const feedbacks = await getFeedbacks({
      userId: new Types.ObjectId(req.user!.id),
      role: req.user!.role,
    });
    return res
      .status(200)
      .json({ message: 'Feedbacks fetched successfully', feedbacks });
  } catch (error) {
    logger.error(error, 'Error fetching feedbacks');
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateFeedback = async (req: Request, res: Response) => {
  try {
    const {
      success: feedbackSuccess,
      data: feedbackId,
      error: feedbackError,
    } = objectIdSchema.safeParse(req.params.feedbackId);
    if (!feedbackSuccess) {
      return res
        .status(400)
        .json({ message: 'Invalid feedback ID', error: feedbackError });
    }
    const { success, data, error } = updateFeedbackValidator.safeParse(
      req.body,
    );
    if (!success) {
      return res.status(400).json({ message: 'Invalid feedback data', error });
    }

    const feedback = await updateFeedbackService({
      feedbackId: new Types.ObjectId(feedbackId),
      data,
    });

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    return res
      .status(201)
      .json({ message: 'Feedback updated successfully', feedback });
  } catch (error) {
    logger.error(error, 'Error adding feedback');
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteFeedback = async (req: Request, res: Response) => {
  try {
    const {
      success: feedbackSuccess,
      data: feedbackId,
      error: feedbackError,
    } = objectIdSchema.safeParse(req.params.feedbackId);
    if (!feedbackSuccess) {
      return res
        .status(400)
        .json({ message: 'Invalid feedback ID', error: feedbackError });
    }

    const feedback = await deleteFeedbackService({
      feedbackId: new Types.ObjectId(feedbackId),
    });

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    return res
      .status(204)
      .json({ message: 'Feedback deleted successfully', feedback });
  } catch (error) {
    logger.error(error, 'Error adding feedback');
    return res.status(500).json({ message: 'Internal server error' });
  }
};
