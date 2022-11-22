import bcrypt from "bcrypt";

export const encryptPassword = (password: string) => {
  return new Promise<string>((resolve, reject) => {
    bcrypt.genSalt(10, (err: Error | undefined, salt: string) => {
      if (err) {
        reject(err.stack?.toString());
      }
      bcrypt.hash(password, salt, (err: Error | undefined, hash: string) => {
        if (err) {
          reject(err.stack?.toString());
        }
        resolve(hash);
      });
    });
  });
};

export const verifyPassword = (password: string, encryptedPassword: string) =>
  new Promise<boolean>(async (resolve, reject) => {
    try {
      const isMatch = await bcrypt.compare(password, encryptedPassword);
      resolve(isMatch);
    } catch (err) {
      reject(false);
    }
  });
