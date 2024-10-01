import mongoose, { Schema } from 'mongoose';
import { IComment, IPost, IReplies } from './post.interface';



const replySchema = new Schema<IReplies>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    replyText: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


// comment Schema
const commentSchema = new Schema<IComment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    commentText: {
      type: String,
      required: true,
    },
    replies: [replySchema] ,
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

// Post Schemaa

const postSchema = new Schema<IPost>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postContent: {
    type: String,
  },
  categories:{
    type: [String],
  },
  
  tags:{
    type: [String],
  },

  video: { type: String },
  images: [{ type: String }],
  isPremium: { type: Boolean, default: false },
  upVotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downVotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [commentSchema],
},{
    timestamps:true,

});



export const Post = mongoose.model<IPost>("Post", postSchema);
export const Comment = mongoose.model<IComment>("Comment",commentSchema);