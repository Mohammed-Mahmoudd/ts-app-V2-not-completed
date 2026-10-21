import { logger } from '@/lib/logger';
import Branch from '@/models/branch.model';
import {
  createBranchValidator,
  deleteBranchValidator,
} from '@/validators/branch.validator';
import { Request, Response } from 'express';

export const getBranches = async (req: Request, res: Response) => {
  try {
    const branches = await Branch.find();
    res
      .status(200)
      .json({ message: 'Branches fetched successfully', branches });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Failed to fetch branches', error });
  }
};

export const createBranch = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = createBranchValidator.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ message: 'Invalid branch data', error });
    }

    const branch = await Branch.create(data);

    return res
      .status(201)
      .json({ message: 'Branch created successfully', branch });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Failed to create branch', error });
  }
};

export const deleteBranch = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = deleteBranchValidator.safeParse(
      req.params,
    );
    if (!success) {
      return res.status(400).json({ message: 'Invalid branch data', error });
    }

    const branch = await Branch.findByIdAndDelete(data.id);

    return res
      .status(204)
      .json({ message: 'Branch deleted successfully', branch });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Failed to delete branch', error });
  }
};
