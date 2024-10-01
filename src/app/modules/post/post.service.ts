
import { IPost } from "./post.interface";
import { Post } from "./post.model";
import { QueryBuilder } from "../../builder/QueryBuilder";



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


  const getMyPostFormDB = async(
    query: Record<string, unknown>, 
    id: string 
  ) => {
    try {
   
      let postQuery = Post.find({ user: id }).populate("user","name profilePhoto isVerified");
  
     
      postQuery = new QueryBuilder(postQuery, query).build(); 
  
   
      const posts = await postQuery.exec(); 
  
   
  
      return posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Failed to get posts from the database.");
    }
  };



  export const PostServices = {
    createPost,
    getAllPostFromDB,
    getMyPostFormDB
  }