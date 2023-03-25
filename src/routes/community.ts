import {
  createCommunity,
  getCommunities,
  getSpecificCommunities,
  joinCommunity,
  leaveCommunity,
} from "./../mongodb/db/community";
import { jwtCheck } from "./../index";
import { Router, Request, Response } from "express";
import {
  createCommunityPost,
  deleteCommunityPost,
  getCommunityPosts,
  updateCommunityPost,
} from "../mongodb/db/post";

const communityRouter = Router();

communityRouter.post(
  "/community",
  (req, res, next) => jwtCheck(req, res, next),
  async (req: Request, res: Response) => {
    try {
      const community = await createCommunity(req.body);
      res.status(200).send("Community successfully created");
    } catch (err: any) {
      res.status(500).send("Community creation failed. " + err.message);
    }
  }
);

communityRouter.get("/community/all", async (req: Request, res: Response) => {
  try {
    const communities = await getCommunities();
    res.status(200).send(communities);
  } catch (err: any) {
    res.status(500).send("Community fetching failed. " + err.message);
  }
});

communityRouter.post(
  "/community/specific",
  async (req: Request, res: Response) => {
    try {
      const communities = await getSpecificCommunities(req.body.communitiesIDs);
      res.status(200).send(communities);
    } catch (err: any) {
      res
        .status(500)
        .send("Specific communities fetching failed. " + err.message);
    }
  }
);

communityRouter.post(
  "/community/join",
  (req, res, next) => jwtCheck(req, res, next),
  async (req: Request, res: Response) => {
    try {
      await joinCommunity(req.body.communityID, req.body.userID);
      res.status(200).send("Successfully joined community");
    } catch (err: any) {
      res.status(500).send("Could not join community. " + err.message);
    }
  }
);

communityRouter.post(
  "/community/leave",
  (req, res, next) => jwtCheck(req, res, next),
  async (req: Request, res: Response) => {
    try {
      await leaveCommunity(req.body.communityID, req.body.userID);
      res.status(200).send("Successfully left community");
    } catch (err: any) {
      res.status(500).send("Could not leave community. " + err.message);
    }
  }
);

communityRouter.post(
  "/community/post/create",
  (req, res, next) => jwtCheck(req, res, next),
  async (req: Request, res: Response) => {
    try {
      await createCommunityPost(
        req.body.communityID,
        req.body.profileID,
        req.body.post
      );
      res.status(200).send("Successfully created post");
    } catch (err: any) {
      res.status(500).send("Could not create post. " + err.message);
    }
  }
);

communityRouter.post(
  "/community/post/update",
  // (req, res, next) => jwtCheck(req, res, next),
  async (req: Request, res: Response) => {
    try {
      await updateCommunityPost(req.body.post);
      res.status(200).send("Successfully updated post");
    } catch (err: any) {
      res.status(500).send("Could not update post. " + err.message);
    }
  }
);

communityRouter.delete(
  "/community/post/:id",
  (req, res, next) => jwtCheck(req, res, next),
  async (req: Request, res: Response) => {
    try {
      await deleteCommunityPost(req.body.post);
      res.status(200).send("Successfully deleted post");
    } catch (err: any) {
      res.status(500).send("Could not delete post. " + err.message);
    }
  }
);

communityRouter.get(
  "/community/:id/posts",
  (req, res, next) => jwtCheck(req, res, next),
  async (req: Request, res: Response) => {
    try {
      const communityPosts = await getCommunityPosts(req.params.id);
      res.status(200).send(communityPosts);
    } catch (err: any) {
      res.status(500).send("Could not get posts. " + err.message);
    }
  }
);

export default communityRouter;
