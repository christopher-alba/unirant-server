import { ObjectId } from "mongodb";
import { Types } from "mongoose";

export const convertToObjectIDs = (arrayOfStrings: string[]) => {
  let objectIDs: ObjectId[] = [];
  for (let i = 0; i < arrayOfStrings.length; i++) {
    const string = arrayOfStrings[i];
    objectIDs = objectIDs.concat(new Types.ObjectId(string));
  }
  console.log(objectIDs);

  return objectIDs;
};
