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
  await community.save();
  const response = await Profile.updateOne(
    { _id: new Types.ObjectId(communityObj.adminIDs[0]) },
    {
      $push: { communitiesAdmin: community._id.toString() },
    }
  );
  console.log(response);
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

export const joinCommunity = async (communityID: string, userID: string) => {
  const community = await Community.findById(new Types.ObjectId(communityID));
  if (
    community?.adminIDs.includes(userID) ||
    community?.memberIDs.includes(userID)
  ) {
    throw new Error(
      "You are already part of this community and can no longer join again."
    );
  }
  const response = await Community.findByIdAndUpdate(
    new Types.ObjectId(communityID),
    {
      $push: { memberIDs: userID },
    }
  );
  const response2 = await Profile.findByIdAndUpdate(
    new Types.ObjectId(userID),
    {
      $push: { communitiesMember: communityID },
    }
  );
  console.log(response);
  console.log(response2);
  return;
};

export const leaveCommunity = async (communityID: string, userID: string) => {
  const community = await Community.findById(new Types.ObjectId(communityID));
  if (
    !community?.adminIDs.includes(userID) &&
    !community?.memberIDs.includes(userID)
  ) {
    throw new Error(
      "You are not part of this community and so you can't leave it."
    );
  }
  await Community.findByIdAndUpdate(new Types.ObjectId(communityID), {
    $pull: { memberIDs: userID },
  });
  await Profile.findByIdAndUpdate(new Types.ObjectId(userID), {
    $pull: { communitiesMember: communityID },
  });

  await Community.findByIdAndUpdate(new Types.ObjectId(communityID), {
    $pull: { adminIDs: userID },
  });
  await Profile.findByIdAndUpdate(new Types.ObjectId(userID), {
    $pull: { communitiesAdmin: communityID },
  });
  return;
};
