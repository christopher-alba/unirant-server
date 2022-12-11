import { getProfileByUsername } from "./../mongodb/db/profile";
import { Router, Request, Response } from "express";
import { jwtCheck } from "..";

const profileRouter = Router();

profileRouter.get(
  "/profile/:username",
  (req, res, next) => jwtCheck(req, res, next),
  async (req: Request, res: Response) => {
    const username = req.params.username;
    const profile = await getProfileByUsername(username as any).catch((err) => {
      res.status(500).send(err.message);
    });
    console.log(profile);

    res.status(200).send(profile);
  }
);

export default profileRouter;
