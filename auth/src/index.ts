import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { NotFoundError } from './errors/notFound';
import { errorHandler } from './middleware/errorHandler';
import { currentUserRouter } from './routes/currentUser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();
app.set('trust proxy', true); // trust traffic from ingress-nginx proxy
app.use(express.json());
app.use(cookieSession({
  signed: false, // disable encryption
  secure: true // only use cookies over https connection
}));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", () => {
  throw new NotFoundError();
});

// catch errors from our app router
app.use(errorHandler);

const start = async () => {
  console.log('Starting up auth service...');
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
};

start();
