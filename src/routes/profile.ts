import { getProfileByUsername } from "./../mongodb/db/profile";
import { Router, Request, Response } from "express";

const profileRouter = Router();

profileRouter.get("/profile/:username", async (req: Request, res: Response) => {
  const username = req.params.username;
  if (username === (req.user as any)?.username) {
    const profile = await getProfileByUsername(username as any).catch((err) => {
      res.status(500).send(err.message);
    });
    res.status(200).send(profile);
  } else {
    res.status(401).send("Unauthenticated");
  }
});

export default profileRouter;
