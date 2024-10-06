/* eslint-disable no-unused-vars */
import { IPost } from './post.interface';
import { Post } from './post.model';
import { QueryBuilder } from '../../builder/QueryBuilder';
import mongoose from 'mongoose';

const createPost = async (payload: IPost) => {
  const post = await Post.create(payload);

  return post;
};

const getAllPostFromDB = async (query: Record<string, unknown>) => {
  const posts = new QueryBuilder(Post.find(), query)
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(['postContent', 'categories', 'tags'])
    .build();

  const result = await posts
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
        select: 'name profilePhoto isVerified',
      },
    })
    .populate({
      path: 'user',
      select: 'name profilePhoto isVerified',
    });

  return result;
};
const searchPosts = async (query: Record<string, unknown>) => {
  const posts = new QueryBuilder(Post.find(), query)
        .search(['postContent', 'category', 'tags'])
        .build();

        const result = await posts.select('_id postContent images category tags');
        const formattedResult = result.map((post) => ({
          _id: post._id,
          postContent: post?.postContent!.slice(0,70), 
          image: post.images?.[0], 
          categories: post?.category,
          tags: post.tags
        }));

  return formattedResult;
};

const getAPostFromDB = async (id: string) => {
  const posts = await Post.findById(id).populate('user');

  return posts;
};

// delete post 
const deleteAPostFromDB = async (id: string) => {


  
  const posts = await Post.deleteOne({_id:id});

  return posts;
};

// edit a post

const updateAPostFromDB = async (
  id: string,
  payload:IPost
) => {
  const {postId ,...upPayload } = payload;

 
  if(postId!==id){
      throw new Error("post not found")
  }

  const filteredPayload = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(upPayload).filter(([_, value]) => {
   return value !== null && value !== undefined && 
             (typeof value !== 'string' || value.trim() !== '') && 
             (Array.isArray(value) ? value.length > 0 : true);
    })
  );


  if (Object.keys(filteredPayload).length === 0) {
    throw new Error("No valid fields to update");
  }
  
  const posts = await Post.findOneAndUpdate(
    { _id: id },
    { ...filteredPayload },
    { new: true }
  );

  return posts;
};

const getMyPostFormDB = async (query: Record<string, unknown>, id: string) => {
  try {
    let postQuery = Post.find({ user: id }).populate(
      'user',
      'name profilePhoto isVerified'
    );

    postQuery = new QueryBuilder(postQuery, query).build();

    const posts = await postQuery.exec();

    return posts;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

const upvotePost = async (postId: string, userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const post = await Post.findById(postId).session(session);

    if (!post) {
      throw new Error('Post not found');
    }

    if (post.upVotes.includes(userId)) {
      await Post.updateOne(
        { _id: postId },
        { $pull: { upVotes: userId } },
        { session }
      );
    } else {
      await Post.updateOne(
        { _id: postId },
        {
          $pull: { downVotes: userId },
          $addToSet: { upVotes: userId },
        },
        { session }
      );
    }

    await session.commitTransaction();
    return post;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

const downVotesPost = async (postId: string, userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const post = await Post.findById(postId).session(session);

    if (!post) {
      throw new Error('Post not found');
    }

    if (post.downVotes.includes(userId)) {
      await Post.updateOne(
        { _id: postId },
        { $pull: { downVotes: userId } },
        { session }
      );
    } else {
      await Post.updateOne(
        { _id: postId },
        {
          $pull: { upVotes: userId },
          $addToSet: { downVotes: userId },
        },
        { session }
      );
    }

    await session.commitTransaction();
    return post;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

export const PostServices = {
  createPost,
  getAllPostFromDB,
  getAPostFromDB,
  getMyPostFormDB,
  upvotePost,
  downVotesPost,
  updateAPostFromDB,
  deleteAPostFromDB,
  searchPosts
};
