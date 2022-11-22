import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  email: String,
  googleId: {
    required: false,
    type: String,
  },
});
