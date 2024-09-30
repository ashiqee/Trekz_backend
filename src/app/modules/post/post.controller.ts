/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PostServices } from "./post.service";



const createPostIntoDB = catchAsync(async (req, res) => {


  let imagesUpload: string[] = [];

  if (Array.isArray(req?.files)) {
    imagesUpload = req.files.map((file: any) => file?.path) || [];
  }
 
    const post = await PostServices.createPost({
      ...JSON.parse(req.body.data),
      images: imagesUpload
    });
  
      sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Post Created Successfully',
      data: post,
    });
  });

//   get all post 
const getAllPosts = catchAsync(async (req, res) => {

    const data = await PostServices.getAllPostFromDB();
  
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