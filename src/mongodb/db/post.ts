import { ObjectId } from "mongodb";
import { NewPostObj, PostEditObj } from "./../../types/post";
import { Post, Community, Profile } from "../models";
import { Types } from "mongoose";

export const createCommunityPost = async (
  communityID: string,
  profileID: string,
  post: NewPostObj
) => {
  const newPost = new Post({
    ...post,
    profileID,
  });
  await newPost.save();

  const community = await Community.findById(new Types.ObjectId(communityID));
  await community?.update({
    $push: { postIDs: newPost._id },
  });

  await Profile.findByIdAndUpdate(new Types.ObjectId(profileID), {
    $push: { posts: newPost._id },
  });

  return newPost._id;
};

export const updateCommunityPost = async (post: PostEditObj) => {
  await Post.findByIdAndUpdate(new Types.ObjectId(post._id), post);
};

export const deleteCommunityPost = async (postID: ObjectId) => {
  await Post.findByIdAndRemove(postID);
};

export const getCommunityPosts = async (communityID: string) => {
  const community = await Community.findById(new Types.ObjectId(communityID));
  const communityPostIDs = community?.postIDs;
  return await Post.find({
    _id: communityPostIDs,
  });
};
