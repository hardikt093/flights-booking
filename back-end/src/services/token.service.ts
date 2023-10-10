import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../config/config';
import { Token } from '../entities/token.entity';
import AppDataSource from '../db/app-data-source';
import tokenTypes from '../utils/types/token.types';

const tokenRepository = AppDataSource.getRepository(Token);

// To find token
const findToken = async (token: string, type: string, blacklisted: boolean): Promise<Token | null> => {
  return await tokenRepository.findOneBy({ token, type, blacklisted });
};

// To generate token
const generateToken = (userRole: string, userId: string, expires, type: string, userEmail?: string) => {
  const payload = {
    sub: userId,
    userRole: userRole,
    userEmail: userEmail,
    iat: moment().unix(),
    exp: expires.unix(),
    type
  };
  return jwt.sign(payload, config.jwt.secret);
};

// To save token
const saveToken = async (token, allUsersId, expires, type, blacklisted = false): Promise<Token> => {
  return await tokenRepository.save(
    tokenRepository.create({
      token,
      allUsers: allUsersId,
      expires: expires.toDate(),
      type,
      blacklisted,
    })
  );
};

// To verify token
const verifyToken = async (token, type) => {
  const tokenDoc = await findToken(token, type, false);
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

// To generate auth token
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.userRole.name, user.id, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.userRole.name, user.id, refreshTokenExpires, tokenTypes.REFRESH);
  await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

// To remove token
const removeToken = async (token: Token) => {
  return await tokenRepository.remove(token);
};

// To delete many tokens at a time
const deleteManyTokens = async (userId: string, tokenType: string) => {
  await tokenRepository
    .createQueryBuilder()
    .delete()
    .where('allUsersId = :id AND type = :type', { id: userId, type: tokenType })
    .execute();
};

export {
  findToken,
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  removeToken,
  deleteManyTokens
};
