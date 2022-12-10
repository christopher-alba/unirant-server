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

export const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  creationDate: { type: Date, default: Date.now },
  memberIDs: { type: [String], required: false },
  postIDs: { type: [String], required: false },
});

export const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  profileID: String,
  userID: String,
  likes: Number,
  dislikes: Number,
  images: [String],
  creationDate: { type: Date, default: Date.now },
  commentIDs: [String],
});

export const commentSchema = new mongoose.Schema({
  comment: String,
  creationDate: { type: Date, default: Date.now },
  likes: Number,
  dislikes: Number,
  isImage: Boolean,
  userID: String,
  profileID: String,
});
