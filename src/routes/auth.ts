import { Router, Request, Response } from "express";
import { register } from "../mongodb/db/auth";
import passport from "passport";

const authRouter = Router();

authRouter.get("/users", (req: Request, res: Response) => {
  res.status(200).send("Received a get request at api/v1/users");
});
authRouter.post("/users", async (req: Request, res: Response) => {
  try {
    const userId = await register(req.body);
    res.status(200).send(userId);
  } catch (err) {
    res.status(500).send(err);
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

authRouter.get("/getuser", (req: any, res: any) => {
  console.log(req.user);
  res.send(req.user);
});

authRouter.get("/auth/logout", (req, res) => {
  if (req.user) {
    req.logout(() => {
      res.send("done");
    });
  }
});

export default authRouter;
