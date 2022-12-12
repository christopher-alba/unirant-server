import {
  commentSchema,
  communitySchema,
  postSchema,
  profileSchema,
} from "./schema";
import mongoose from "mongoose";

export const Profile = mongoose.model("Profile", profileSchema);
export const Community = mongoose.model("Community", communitySchema);
export const Post = mongoose.model("Post", postSchema);
export const Comment = mongoose.model("Comment", commentSchema);
