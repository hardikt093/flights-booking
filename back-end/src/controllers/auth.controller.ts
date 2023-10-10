import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import { createAllUser, findAllUserByEmail } from '../services/all-users.service';
import { findUserRoleByName } from '../services/user-role.service';
import catchAsync from '../utils/catch-async';
import { loginUserWithEmailAndPassword, logout, refreshAuth } from '../services/auth.service';
import { generateAuthTokens } from '../services/token.service';

const registerHandler = catchAsync(async (req, res) => {
  const checkIfUserExist = await findAllUserByEmail(req.body.email);
  if (checkIfUserExist) {
    return res.status(httpStatus.CONFLICT).send('User already exist');
  }
  const userRole = await findUserRoleByName(req.body.type);
  req.body.userRole = userRole;
  req.body.password = await bcrypt.hash(req.body.password, 8);
  await createAllUser(req.body);
  res.status(httpStatus.CREATED).send({
    success: true
  });
});

const loginHandler = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const allUsers = await loginUserWithEmailAndPassword(email, password);
  if (!allUsers) {
    return res.status(httpStatus.NOT_FOUND).send('Incorrect email or password');
  }
  const tokens = await generateAuthTokens(allUsers);
  const data = {
    data: {
      user: allUsers,
      token: tokens.access.token,
      refreshToken: tokens.refresh.token
    }
  }
  res.send(data);
});

const logoutHandler = catchAsync(async (req, res) => {
  await logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokensHandler = catchAsync(async (req, res) => {
  const tokens = await refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

export { registerHandler, loginHandler, logoutHandler, refreshTokensHandler };
