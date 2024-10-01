import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { commentServices } from "./comment.service";


const createCommentIntoDb = catchAsync(async (req, res) => {
    const {userId,postId,commnetText} = req.body
      const result = await commentServices.createComment(userId,postId,commnetText);
    
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Remove Follewer Successfully',
        data: result,
      });
    });



    export const CommentControllers = {
        createCommentIntoDb
    }