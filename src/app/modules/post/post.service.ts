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
        path: 'user', // Populate the user inside each comment
        select: 'name profilePhoto', // Choose the fields you want to retrieve
      },
    })
    .populate({
      path: 'user', // Populate the user of the post
      select: 'name profilePhoto', // Choose the fields you want to retrieve
    });

  return result;
};

const getAPostFromDB = async (id: string) => {
  const posts = await Post.findById(id).populate('user');

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
};
