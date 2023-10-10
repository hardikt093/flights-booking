import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    FRONTEND_DOMAIN: Joi.string().required(),
    APP_NAME: Joi.string().required(),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().default(5432),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_ACCEPT_INVITE_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    AMADEUS_CLIENT_ID: Joi.string().required().description('Amadeus client id'),
    AMADEUS_CLIENT_SECRET: Joi.string().required().description('Amadeus client secret'),
    FIREBASE_API_KEY: Joi.string().required().description('Firebase API key'),
    FIREBASE_AUTH_DOMAIN: Joi.string().required().description('Firebase auth domain'),
    FIREBASE_PROJECT_ID: Joi.string().required().description('Firebase project id'),
    FIREBASE_STORAGE_BUCKET: Joi.string().required().description('Firebase storage bucket'),
    FIREBASE_MESSAGING_SENDER_ID: Joi.string().required().description('Firebase sender id'),
    FIREBASE_APP_ID: Joi.string().required().description('Firebase app id')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  frontendDomain: envVars.FRONTEND_DOMAIN,
  appName: envVars.APP_NAME,
  database: {
    databaseUsername: envVars.DATABASE_USERNAME,
    databasePassword: envVars.DATABASE_PASSWORD,
    databaseName: envVars.DATABASE_NAME,
    databaseHost: envVars.DATABASE_HOST,
    databasePort: envVars.DATABASE_PORT,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    acceptInviteExpirationMinutes: envVars.JWT_ACCEPT_INVITE_EXPIRATION_MINUTES,
  },
  amadeus: {
    clientId: envVars.AMADEUS_CLIENT_ID,
    clientSecret: envVars.AMADEUS_CLIENT_SECRET,
  },
  firebase: {
    firebaseApiKey: envVars.FIREBASE_API_KEY,
    firebaseAuthDomain: envVars.FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: envVars.FIREBASE_PROJECT_ID,
    firebaseStorageBucket: envVars.FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: envVars.FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: envVars.FIREBASE_APP_ID
  }
};

export default config;
