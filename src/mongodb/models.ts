import { profileSchema, userSchema } from "./schema";
import mongoose from "mongoose";

export const User = mongoose.model("User", userSchema);
export const Profile = mongoose.model("Profile", profileSchema);
