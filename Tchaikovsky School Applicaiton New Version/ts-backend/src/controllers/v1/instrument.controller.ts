import { logger } from '@/lib/logger';
import Instrument from '@/models/instrument.model';
import {
  createInstrumentValidator,
  deleteInstrumentValidator,
} from '@/validators/instrument.validator';
import { Request, Response } from 'express';

export const getInstruments = async (req: Request, res: Response) => {
  try {
    const instruments = await Instrument.find();
    res
      .status(200)
      .json({ message: 'Instruments fetched successfully', instruments });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Failed to create instrument', error });
  }
};

export const createInstrument = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = createInstrumentValidator.safeParse(
      req.body,
    );
    if (!success) {
      return res
        .status(400)
        .json({ message: 'Invalid instrument data', error });
    }

    const instrument = await Instrument.create({ name: data.name });

    return res
      .status(201)
      .json({ message: 'Instrument created successfully', instrument });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Failed to create instrument', error });
  }
};

export const deleteInstrument = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = deleteInstrumentValidator.safeParse(
      req.params,
    );
    if (!success) {
      return res
        .status(400)
        .json({ message: 'Invalid instrument data', error });
    }

    const instrument = await Instrument.findByIdAndDelete(data.id);

    return res
      .status(204)
      .json({ message: 'Instrument deleted successfully', instrument });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Failed to delete instrument', error });
  }
};
