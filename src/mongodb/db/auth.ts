import { NewUser, UserArgs } from "../../types/user";
import { User as UserModel } from "../models";
import { encryptPassword } from "../../utils/auth";

export const register = async (user: UserArgs) => {
  const userFromDB = await UserModel.findOne({ username: user.username });

  if (userFromDB) {
    console.log("ERROR THROWING");
    throw new Error("Username already exists. Please use another one.");
  }

  const newUser: NewUser = {
    username: user.username,
    password: await encryptPassword(user.password),
    email: user.email,
    token: undefined,
  };
  const mongoUser = new UserModel(newUser);
  const res = await mongoUser.save();
  return res;
};
