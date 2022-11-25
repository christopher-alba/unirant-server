import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  googleId: {
    required: false,
    type: String,
  },
  token: String,
});

export const profileSchema = new mongoose.Schema({
  displayName: String,
  profilePicture: String,
  email: String,
  username: {
    type: String,
    unique: true,
  },
});
