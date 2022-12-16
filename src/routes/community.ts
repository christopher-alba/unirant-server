import { createCommunity, getCommunities } from "./../mongodb/db/community";
import { jwtCheck } from "./../index";
import { Router, Request, Response } from "express";

const communityRouter = Router();

communityRouter.post(
  "/community",
  (req, res, next) => jwtCheck(req, res, next),
  async (req: Request, res: Response) => {
    try {
      const community = await createCommunity(req.body);
      console.log(community);
      res.status(200).send("Community successfully created");
    } catch (err: any) {
      res.status(500).send("Community creation failed. " + err.message);
    }
  }
);

communityRouter.get("/community/all", async (req: Request, res: Response) => {
  try {
    const communities = await getCommunities();
    console.log(communities);
    res.status(200).send(communities);
  } catch (err: any) {
    res.status(500).send("Community fetching failed. " + err.message);
  }
});

export default communityRouter;
