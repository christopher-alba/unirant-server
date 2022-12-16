import { Types } from "mongoose";
import { Community, Profile } from "../models";

export const createCommunity = async (communityObj: any) => {
  const duplicate = await Community.findOne({ name: communityObj.name });
  if (duplicate) {
    throw new Error(
      "This community name already exists. Please choose another one."
    );
  }
  console.log(communityObj);
  const community = new Community(communityObj);
  let profile = await Profile.findById(communityObj.adminIDs[0]);
  profile?.communitiesAdmin.push(community._id.toString());
  await community.save();
  await Profile.updateOne(
    { id: communityObj.adminIDs[0] },
    {
      communitiesAdmin: profile?.communitiesAdmin,
    }
  );
  
  return community;
};

export const getCommunities = async () => {
  return await Community.find();
};

export const getSpecificCommunities = async (communitiesIDs: string[]) => {
  console.log(communitiesIDs);
  return await Community.find({
    _id: {
      $in: communitiesIDs.map(
        (communityID: string) => new Types.ObjectId(communityID)
      ),
    },
  });
};
