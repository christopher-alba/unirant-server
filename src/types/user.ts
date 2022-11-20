export type UserArgs = {
  username: string;
  password: string;
  email: string;
};

export type NewUser = {
  username: string;
  password?: string;
  email?: string;
  token?: string;
  googleId?: string;
  __v?: number;
  _id?: string;
};
