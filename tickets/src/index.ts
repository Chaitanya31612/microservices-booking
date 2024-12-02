import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
  console.log("Starting up tickets service...");
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  // if (!process.env.MONGO_URI) {
  //   throw new Error("MONGO_URL must be defined");
  // }

  try {
    await mongoose.connect("mongodb://tickets-mongo-srv:27017/tickets");
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log("Listening to tickets on port 3000");
  });
};

start();
