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
    res.redirect("http://localhost:3000");
  }
);

export default authRouter;
