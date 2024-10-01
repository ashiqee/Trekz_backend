import { QueryBuilder } from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: TUser) => {
  const user = await User.create(payload);

  return user;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const users = new QueryBuilder(User.find(), query)
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(UserSearchableFields);

  const result = await users.modelQuery;

  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await User.findById(id);

  return user;
};


//add follows

const addFollowToDB = async(id:string,playLoad:{followId:string})=>{
  // add follow
  const user = await User.findByIdAndUpdate(id,
    {$push:{follow: playLoad.followId}}
  )

  // add Followers
  const followeUser = await User.findByIdAndUpdate(playLoad.followId,
    {$push:{followers:id}}
  )

  return { user, followeUser}

}

export const UserServices = {
  createUser,
  getAllUsersFromDB,
  getSingleUserFromDB,
  addFollowToDB
};
