import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { commentServices } from "./comment.service";


const createCommentIntoDb = catchAsync(async (req, res) => {

 
  
    const {userId,postId,commentText} = req.body
      const result = await commentServices.createComment(userId,postId,commentText);
    
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Create comment Successfully',
        data: result,
      });
    });


const deleteCommenFromDb = catchAsync(async (req, res) => {

      
  const commentId = req.params.id
console.log(commentId);

      const result = await commentServices.deleteComment(commentId);
    
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Delete comment Successfully',
        data: result,
      });
    });



    export const CommentControllers = {
        createCommentIntoDb,
        deleteCommenFromDb
    }