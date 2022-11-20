import { NewUser, UserArgs } from "../../types/user";
import { User as UserModel } from "../models";

export const register = async (user: UserArgs) => {
  const newUser: NewUser = {
    username: user.username,
    password: user.password,
    email: user.email,
    token: undefined,
  };
  const mongoUser = new UserModel(newUser);
  const res = await mongoUser.save();
  return res._id;
};
