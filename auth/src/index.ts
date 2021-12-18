import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

let app = express();

app.set("trust proxy", true); //because traffic is going to be proxy from ingress-nginx into our express app
//and by default express when sees any proxies not going to trust that connection

app.use(json());
app.use(cookieSession({ signed: false, secure: true }));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

let start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
  app.listen(3000, () => console.log("Auth listening on 3000"));
};

start();
