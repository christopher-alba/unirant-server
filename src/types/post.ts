import { ObjectId } from "mongodb";
export type NewPostObj = {
  title: string;
  description: string;
  likes: number;
  dislikes: number;
  images: string[];
  creationDate: Date;
  commentIDs: string[];
};

export type PostEditObj = {
  _id: ObjectId;
  profileID: string;
  title: string;
  description: string;
  likes: number;
  dislikes: number;
  images: string[];
  creationDate: Date;
  commentIDs: string[];
};
