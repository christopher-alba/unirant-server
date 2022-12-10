import { Profile } from "../models";

export const getProfileByUsername = async (username: string) => {
  return await Profile.findOne({ username }).catch((err: any) => err.message);
};
