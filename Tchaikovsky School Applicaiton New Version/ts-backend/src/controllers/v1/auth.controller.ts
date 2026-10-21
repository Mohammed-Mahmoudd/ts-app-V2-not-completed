import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createUser } from '@/services/user.service';
import { IUser, User } from '@/models/user.model';
import { RefreshToken } from '@/models/token.model';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  getRefreshTokenExpirationDate,
} from '@/lib/jwt';
import { logger } from '@/lib/logger';
import {
  loginValidator,
  logoutValidator,
  refreshValidator,
  registerValidator,
} from '@/validators/auth.validator';

export const register = async (req: Request, res: Response) => {
  try {
    const {
      success,
      data,
      error: validationError,
    } = registerValidator.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ error: validationError });
    }
    const { user, error } = await createUser(data);
    if (error || !user) {
      return res.status(400).json({ message: error });
    }

    const accessToken = signAccessToken({
      id: String(user._id),
      role: user.role,
    });
    const refreshToken = signRefreshToken({
      id: String(user._id),
      role: user.role,
    });

    await RefreshToken.create({
      token: refreshToken,
      user: user._id,
      expiresAt: getRefreshTokenExpirationDate(),
    });

    res.status(201).json({
      message: 'User registered successfully',
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Register failed', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const {
      success,
      data,
      error: validationError,
    } = loginValidator.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ error: validationError });
    }

    const user = await User.findOne({ phone: data.phone }).select('+password');

    // Prevent timing attacks
    const DUMMY_HASH =
      '$2b$12$CwTycUXWue0Thq9StjUM0uJ8sP0B4J4kZK9t2t6U6d7nZ0T3vhG/G';
    const passwordHash = user ? user.password : DUMMY_HASH;
    const isValidPassword = await bcrypt.compare(data.password, passwordHash);

    if (!user || !isValidPassword) {
      return res.status(401).json({ message: 'Invalid phone or password' });
    }

    const accessToken = signAccessToken({
      id: String(user._id),
      role: user.role,
    });
    const refreshToken = signRefreshToken({
      id: String(user._id),
      role: user.role,
    });

    await RefreshToken.create({
      token: refreshToken,
      user: user._id,
      expiresAt: getRefreshTokenExpirationDate(),
    });

    res.json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const {
      success,
      data,
      error: validationError,
    } = refreshValidator.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ error: validationError });
    }

    const { token: providedToken } = data;

    let decoded;
    try {
      decoded = verifyRefreshToken(providedToken);
    } catch {
      res.status(401).json({ message: 'Invalid refresh token' });
      return;
    }

    const foundToken = await RefreshToken.findOne({ token: providedToken });

    if (foundToken?.isUsed) {
      logger.warn(`[REFRESH TOKEN REUSE DETECTED] User: ${decoded.id}`);
      // Revoke all tokens for this user for security
      await RefreshToken.deleteMany({ user: decoded.id });
      res
        .status(403)
        .json({ message: 'Token reuse detected. All sessions revoked.' });
      return;
    }

    if (!foundToken || foundToken.isRevoked) {
      res.status(401).json({ message: 'Token is invalid or revoked' });
      return;
    }

    // Mark current token as used
    const newAccessToken = signAccessToken({
      id: decoded.id,
      role: decoded.role,
    });
    const newRefreshTokenString = signRefreshToken({
      id: decoded.id,
      role: decoded.role,
    });

    foundToken.isUsed = true;
    foundToken.replacedBy = newRefreshTokenString;
    await foundToken.save();

    // Create new refresh token record
    await RefreshToken.create({
      token: newRefreshTokenString,
      user: decoded.id,
      expiresAt: getRefreshTokenExpirationDate(),
    });

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshTokenString,
    });
  } catch (error) {
    res.status(500).json({ message: 'Refresh failed', error });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = logoutValidator.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ error });
    }

    if (data.token) {
      await RefreshToken.deleteOne({ token: data.token });
    }

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed', error });
  }
};
