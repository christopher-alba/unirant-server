import { verifyJWT } from "./../mongodb/db/auth";
import { Router, Request, Response } from "express";
import { register, setJWT } from "../mongodb/db/auth";
import passport from "passport";
import { NewUser } from "../types/user";

const authRouter = Router();

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
  passport.authenticate("google", { scope: ["profile"] })
);

authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000",
    session: true,
  }),
  function (req, res) {
    console.log("User stored: " + req.user);

    res.redirect("http://localhost:3000");
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
  try {
    if (
      await verifyJWT((req.user as NewUser)._id as string, req.body.localToken)
    ) {
      console.log(req.user);
      res.send(req.user);
    } else {
      res
        .status(401)
        .send("Cannot verify the JWT successfully from the server.");
    }
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

authRouter.get("/auth/logout", (req, res) => {
  if (req.user) {
    req.logout(() => {
      res.send("done");
    });
  }
});

export default authRouter;
