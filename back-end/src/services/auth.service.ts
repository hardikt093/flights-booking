import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import ApiError from '../utils/api-error';
import { findAllUserByEmail, findAllUserById } from './all-users.service';
import { findToken, generateAuthTokens, removeToken, verifyToken } from './token.service';
import tokenTypes from '../utils/types/token.types';
import { AllUsers } from '../entities/all-users.entity';

// To authenticate user
const loginUserWithEmailAndPassword = async (email: string, password: string): Promise<AllUsers | null> => {
  const user = await findAllUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null;
  }
  return user;
};

// To remove user token
const logout = async (refreshToken: string): Promise<void> => {
  const tokenDoc = await findToken(refreshToken, tokenTypes.REFRESH, false);
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  await removeToken(tokenDoc);
};

// To refresh token
const refreshAuth = async (refreshToken: string): Promise<{
  access: {
    token: string,
    expires: Date,
  },
  refresh: {
    token: string,
    expires: Date,
  },
}> => {
  try {
    const refreshTokenDoc = await verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await findAllUserById(refreshTokenDoc.allUsers.id);
    if (!user) {
      throw new Error('User not found');
    }
    await removeToken(refreshTokenDoc);
    return generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

export { loginUserWithEmailAndPassword, logout, refreshAuth };
