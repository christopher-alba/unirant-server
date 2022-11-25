import { NewUser, UserArgs } from "../../types/user";
import { User as UserModel } from "../models";
import { encryptPassword } from "../../utils/auth";
import jwt from "jsonwebtoken";

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
    token: "invalid token",
  };
  const mongoUser = new UserModel(newUser);
  const res = await mongoUser.save();
  return res;
};

export const setJWT = async (userId: string) => {
  const token = jwt.sign({ userId }, "secret");
  try {
    const response = await UserModel.updateOne(
      {
        _id: userId,
      },
      {
        token,
      }
    );
    if (response.acknowledged && response.modifiedCount === 1) {
      return token;
    } else {
      return new Error("Unable to update user.");
    }
  } catch (err: any) {
    return err;
  }
};

export const verifyJWT = async (userId: string, localToken: string) => {
  try {
    const user: NewUser | null = await UserModel.findOne({
      _id: userId,
    });
    jwt.verify(localToken, "secret");
    if (user?.token === localToken) {
      return true;
    } else {
      return false;
    }
  } catch (err: any) {
    return false;
  }
};

export const clearJWT = async (userId: string) => {
  try {
    const response = await UserModel.updateOne(
      {
        _id: userId,
      },
      {
        token: "",
      }
    );
    console.log(response);
    if (response.acknowledged && response.modifiedCount === 1) {
      return "Successfully cleared JWT from user.";
    } else {
      return new Error("Unable to clear user token.");
    }
  } catch (err: any) {
    return err;
  }
};
