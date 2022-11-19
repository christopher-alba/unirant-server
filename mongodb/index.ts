import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://admin:admin@unirant.ig0yum9.mongodb.net/?retryWrites=true&w=majority"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connect succesfully to db.");
});
