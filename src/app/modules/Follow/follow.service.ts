import { User } from '../User/user.model';

//add follows
const addFollowToDB = async (payload: {
  userId: string;
  followId: string;
}) => {
  const { userId, followId } = payload;

  const user = await User.findById(userId);
  const followUser = await User.findById(followId);

  if (!user || !followUser) {
    throw new Error('One of the users not found');
  }

  if (user.follow?.includes(followId)) {
    throw new Error('Already follow this user');
  }

  // add follow
  if (!user.follow?.includes(followId)) {
    // Add followId to user's follow array
    await User.findByIdAndUpdate(userId, {
      $push: { follow: followId },
    });

    if (!followUser.followers?.includes(userId)) {
      // Add userId to followUser's followers array
      await User.findByIdAndUpdate(followId, {
        $push: { followers: userId },
      });
    }
  }

  return { message: 'Successfully following' };
};

const removeFollowFromDB = async (payload: {
  userId: string;
  followId: string;
}) => {
  const { userId, followId } = payload;

  const user = await User.findById(userId);
  const followUser = await User.findById(followId);

  if (!user || !followUser) {
    throw new Error('One of the users not found');
  }

  // Remove follow
  if (user.follow?.includes(followId)) {
    // Remove followId from user's follow array
    await User.findByIdAndUpdate(userId, {
      $pull: { follow: followId },
    });

    // Remove followers
    await User.findByIdAndUpdate(followId, { $pull: { followers: userId } });
  }

  return { user, followUser };
};

export const FollewerServices = {
  addFollowToDB,
  removeFollowFromDB,
};
