import mongoose from "mongoose";

export const profileSchema = new mongoose.Schema({
  displayName: String,
  profilePicture: String,
  wallpaper: String,
  email: String,
  username: {
    type: String,
    unique: true,
  },
  emailVerified: Boolean,
  communitiesMember: {
    type: [
      {
        type: String,
      },
    ],
    required: false,
  },
  communitiesAdmin: {
    type: [
      {
        type: String,
      },
    ],
    required: false,
  },
  posts: {
    type: [
      {
        type: String,
      },
    ],
    required: false,
  },
  comments: {
    type: [
      {
        type: String,
      },
    ],
    required: false,
  },
});

export const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  adminIDs: { type: [String], required: false },
  creationDate: { type: Date, default: Date.now },
  memberIDs: { type: [String], required: false },
  postIDs: { type: [String], required: false },
  wallpaper: {
    type: String,
    default: () =>
      `https://picsum.photos/2000/3000?random=${
        Math.random() * Number.MAX_VALUE
      }`,
  },
});

export const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  profileID: { type: String, required: true },
  images: [String],
  creationDate: { type: Date, default: Date.now },
  commentIDs: { type: [String], default: [] },
  likesArray: {
    type: [String],
    default: [],
  },
  dislikesArray: {
    type: [String],
    default: [],
  },
});

export const commentSchema = new mongoose.Schema({
  comment: String,
  creationDate: { type: Date, default: Date.now },
  likesArray: {
    type: [String],
    default: [],
  },
  dislikesArray: {
    type: [String],
    default: [],
  },
  isImage: Boolean,
  profileID: String,
});
