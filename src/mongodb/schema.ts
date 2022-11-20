import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  googleId: {
    required: false,
    type: String,
  },
});
