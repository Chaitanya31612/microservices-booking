import express from "express";
import morgan from "morgan";
// express-async-errors package is used, if we throw error inside async function, it will be caught by express and passed to error handler middleware
import "express-async-errors";
import cookieSession from "cookie-session";

import { NotFoundError, errorHandler } from "@cgticketingproject/common";

const app = express();
app.set("trust proxy", true); // trust traffic from ingress-nginx proxy
app.use(express.json());
app.use(
  cookieSession({
    signed: false, // disable encryption
    // secure: true, // only use cookies over https connection
  })
);

app.use(morgan("tiny"));

app.all("*", () => {
  throw new NotFoundError();
});

// catch errors from our app router
app.use(errorHandler);

export { app };

// *Note - this export is done to make sure that we just configure app in this file and not start listening to incoming requests. This is done so that we can write tests for this file without starting up the server. This will help in writing tests for the routes and middlewares using supertest.
