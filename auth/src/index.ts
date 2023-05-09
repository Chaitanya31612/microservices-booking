import express from 'express';
import 'express-async-errors';
import { NotFoundError } from './errors/notFound';
import { errorHandler } from './middleware/errorHandler';
import { currentUserRouter } from './routes/currentUser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();
app.use(express.json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", () => {
  throw new NotFoundError();
});

// catch errors from our app router
app.use(errorHandler);


app.listen(3000, () => {
  console.log('Listening on port 3000');
});
