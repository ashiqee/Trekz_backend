import { Document, ObjectId, Types } from "mongoose";

// Post Interface
export interface IPost extends Document {
  user: ObjectId;
  postContent?: string;
  video?: string;
  images?: string[];
  isPremium: boolean;
  upVotes: Types.ObjectId[]; 
  downVotes: Types.ObjectId[]; 
  comments: IComment[];
  
}

// Comment Interface
export interface IComment extends Document {
  user: ObjectId;
  post: ObjectId;
  commentText: string;
 }

