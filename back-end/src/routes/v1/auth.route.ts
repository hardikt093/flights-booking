import express from 'express';
import validate from '../../middlewares/validate';
import { loginValidation, logoutValidation, registerValidation } from '../../validations/auth.validation';
import { loginHandler, logoutHandler, refreshTokensHandler, registerHandler } from '../../controllers/auth.controller';

const authRoute = express.Router();

// Register user
authRoute.post('/register', validate(registerValidation), registerHandler);

// Login user
authRoute.post('/login', validate(loginValidation), loginHandler);

// Logout user
authRoute.post('/logout', validate(logoutValidation), logoutHandler);

// Refresh token
authRoute.post('/refresh-tokens', validate(logoutValidation), refreshTokensHandler);

export default authRoute;
