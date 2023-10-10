import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import config from './config/config';
import successHandler from './config/success-handler';
import errorHandler from './config/error-handler';
import routes from './routes/v1';
import jwtStrategy from './config/passport';
import bodyParser from 'body-parser';

const app = express();

if (config.env !== 'test') {
  app.use(successHandler);
  app.use(errorHandler);
}

// set security HTTP headers
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// parse json request body
app.use(express.json({ limit: '10kb' }));

// parse urlencoded request body
app.use(express.urlencoded({ extended: false }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// v1 api routes
app.use('/v1', routes);

app.get('/v1', (req, res) => {
  res.send('Hello');
})

export default app;
