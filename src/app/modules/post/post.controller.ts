import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PostServices } from "./post.service";



const createPostIntoDB = catchAsync(async (req, res) => {
    const post = await PostServices.createPost(req.body);
  
      sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Post Created Successfully',
      data: post,
    });
  });

//   get all post 
const getAllPosts = catchAsync(async (req, res) => {

    const data = await PostServices.getAllPostFromDB(req.query);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All posts retrived Successfully',
      data: data,
    });
  });




  export const  PostControllers = {
    createPostIntoDB,
    getAllPosts
  }