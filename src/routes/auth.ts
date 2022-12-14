import { jwtCheck } from "./../index";
import { Router, Request, Response } from "express";
import { Profile } from "../mongodb/models";
import { NewProfile } from "../types/profile";

const authRouter = Router();

authRouter.post(
  "/getuser",
  (req, res, next) => jwtCheck(req, res, next),
  async (req: Request, res: Response) => {
    try {
      console.log(req.body.user);
      let profile = await Profile.findOne({
        username: req.body.user.name + ":" + req.body.user.sub,
      });
      if (profile === null) {
        const newProfile: NewProfile = {
          username: req.body.user.name + ":" + req.body.user.sub,
          email: req.body.user.email,
          profilePicture: req.body.user.picture,
          displayName: req.body.user.name,
          wallpaper: `https://picsum.photos/2000/3000?random=${
            Math.random() * Number.MAX_VALUE
          }`,
          emailVerified: req.body.user.email_verified,
        };

        const mongoProfile = new Profile(newProfile);
        await mongoProfile.save();
      }

      let outdatedProfile = await Profile.findOne({
        $or: [
          {
            username: req.body.user.name + ":" + req.body.user.sub,
            email: undefined,
          },
          {
            username: req.body.user.name + ":" + req.body.user.sub,
            profilePicture: undefined,
          },
          {
            username: req.body.user.name + ":" + req.body.user.sub,
            displayName: undefined,
          },
          {
            username: req.body.user.name + ":" + req.body.user.sub,
            emailVerified: undefined,
          },
          {
            username: req.body.user.name + ":" + req.body.user.sub,
            wallpaper: undefined,
          },
        ],
      });
      if (outdatedProfile) {
        await outdatedProfile?.updateOne({
          username: req.body.user.name + ":" + req.body.user.sub,
          email: req.body.user.email,
          profilePicture: req.body.user.picture,
          displayName: req.body.user.name,
          emailVerified: req.body.user.email_verified,
          wallpaper: `https://picsum.photos/2000/3000?random=${
            Math.random() * Number.MAX_VALUE
          }`,
        });

        profile = await Profile.findOne({
          username: req.body.user.name + ":" + req.body.user.sub,
        });
      }
      res.send(profile);
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  }
);

export default authRouter;
