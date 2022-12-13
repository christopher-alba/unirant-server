import { NewProfile, ProfileEditObj } from "../../types/profile";
import { Profile } from "../models";

export const getProfileByUsername = async (username: string) => {
  return await Profile.findOne({ username }).catch((err: any) => err.message);
};

export const updateProfile = async (
  username: string,
  profileObj: ProfileEditObj
) => {
  return await Profile.updateOne({ username }, profileObj);
};
