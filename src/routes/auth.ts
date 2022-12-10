import { clearJWT, verifyJWT } from "./../mongodb/db/auth";
import { Router, Request, Response } from "express";
import { register, setJWT } from "../mongodb/db/auth";
import passport from "passport";
import { NewUser } from "../types/user";
import { Profile } from "../mongodb/models";

const authRouter = Router();
const redirectURL =
  process.env.NODE_ENV === "production"
    ? "https://unirant.netlify.app"
    : "http://localhost:3000";

authRouter.get("/users", (req: Request, res: Response) => {
  res.status(200).send("Received a get request at api/v1/users");
});
authRouter.post("/users", async (req: Request, res: Response) => {
  try {
    const userId = await register(req.body);
    res.status(200).send(userId);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: redirectURL,
    session: true,
  }),
  function (req, res) {
    console.log("User stored: " + req.user);

    res.redirect(redirectURL);
  }
);

authRouter.post(
  "/auth/default/login",
  passport.authenticate("local", {
    session: true,
  }),
  async function (req, res) {
    const token = await setJWT((req.user as NewUser)._id as string);
    res.status(200).send(token);
  }
);

authRouter.post("/auth/default/register", async (req, res) => {
  try {
    const user = await register(req.body);
    res.status(200).send(user);
  } catch (err: any) {
    console.log("ERROR THROWN: " + err);
    res.status(500).send(err.message);
  }
});

authRouter.post("/getuser", async (req: Request, res: Response) => {
  if (req.body.localToken?.length > 0) {
    try {
      if (
        await verifyJWT(
          (req.user as NewUser)._id as string,
          req.body.localToken
        )
      ) {
        console.log(req.user);
        const profile = await Profile.findOne({
          username: (req.user as NewUser).username,
        });
        res.send(profile);
      } else {
        res
          .status(401)
          .send("Cannot verify the JWT successfully from the server.");
      }
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  } else {
    try {
      console.log("REQ.USER:" + (req.user as NewUser).username);
      const profile = await Profile.findOne({
        username: (req.user as NewUser).username,
      });
      console.log("profileObj: " + profile);

      res.send(profile);
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  }
});

authRouter.post("/auth/logout", async (req, res) => {
  console.log("LOGGING OUT");
  if (req.user) {
    if ((req.user as NewUser).token) {
      const message = await clearJWT((req.user as NewUser)._id as string);
      req.logout(() => {
        res.send("User logged out. " + message);
      });
    } else {
      req.logout(() => {
        res.send("User logged out.");
      });
    }
  } else {
    res.status(500).send("Unable to log out user");
  }
});

export default authRouter;
