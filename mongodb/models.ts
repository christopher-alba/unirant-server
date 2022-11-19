import { userSchema } from "./schema";
import mongoose from "mongoose";

export const User = mongoose.model("User", userSchema);
