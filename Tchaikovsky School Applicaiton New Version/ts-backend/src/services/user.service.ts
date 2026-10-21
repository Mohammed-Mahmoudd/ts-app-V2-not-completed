import { logger } from '@/lib/logger';
import Branch from '@/models/branch.model';
import Instrument from '@/models/instrument.model';
import { IUser, User } from '@/models/user.model';

export const createUser = async (userData: Partial<IUser>) => {
  try {
    if (
      userData.student?.instrument ||
      userData.instructor?.instruments.length
    ) {
      const instrumentsToLookup = userData.student?.instrument
        ? [userData.student?.instrument]
        : userData.instructor?.instruments || [];
      const instruments = await Instrument.find({
        _id: { $in: instrumentsToLookup },
      });
      if (instruments.length !== instrumentsToLookup.length) {
        return { user: null, error: 'Unknown instrument/instruments' };
      }
    }
    if (userData.student?.branchLocation) {
      const branch = await Branch.findById(userData.student.branchLocation);
      if (!branch) {
        return { user: null, error: 'Unknown branch' };
      }
    }
    const user = await User.create(userData);
    return { user: { ...user.toObject(), password: undefined }, error: null };
  } catch (error: any) {
    if (error.code === 11000) {
      console.log(error);
      return { user: null, error: 'User already exists' };
    }
    logger.error(error);
    return { user: null, error: 'Something went wrong' };
  }
};
