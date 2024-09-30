
import { IPost } from "./post.interface";
import { Post } from "./post.model";



const createPost = async (payload: IPost) => {


    const post = await Post.create(payload);
  
    return post;
  };
  
  const getAllPostFromDB = async () => {
    // const posts = new QueryBuilder(Post.find(), query)
    //   .fields()
    //   .paginate()
    //   .sort()
    //   .filter()
    //   .search(UserSearchableFields);
    const posts = await Post.find().populate("user")
    
  
    // const result = await posts.modelQuery;
  
    return posts;
  };




  export const PostServices = {
    createPost,
    getAllPostFromDB
  }