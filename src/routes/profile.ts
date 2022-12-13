import { getProfileByUsername, updateProfile } from "./../mongodb/db/profile";
import { Router, Request, Response } from "express";
import { jwtCheck } from "..";

const profileRouter = Router();

profileRouter.get(
  "/profile/:username",
  (req, res, next) => jwtCheck(req, res, next),
  async (req: Request, res: Response) => {
    const username = req.params.username;
    try {
      const profile = await getProfileByUsername(username);
      res.status(200).send(profile);
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  }
);

profileRouter.post(
  "/profile/:username",
  (req, res, next) => jwtCheck(req, res, next),
  async (req: Request, res: Response) => {
    const username = req.params.username;
    try {
      const response = await updateProfile(username, req.body);
      console.log(response);

      res.status(200).send("Profile successfully updated.");
    } catch (err: any) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
);

export default profileRouter;
