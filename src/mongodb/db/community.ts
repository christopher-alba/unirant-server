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
  profile?.communitiesAdmin.push(community.name);
  await Profile.updateOne(
    { id: communityObj.adminIDs[0] },
    {
      communitiesAdmin: profile?.communitiesAdmin,
    }
  );
  await community.save();
  return community;
};

export const getCommunities = async () => {
  return await Community.find();
};
