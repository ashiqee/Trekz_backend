import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FollewerServices } from "./follow.service";




const addFollow = catchAsync(async (req, res) => {
    const result = await FollewerServices.addFollowToDB(req.params.id,req.body);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Add Follewer Successfully',
      data: result,
    });
  });


  export const FollewerControllers ={
    addFollow
  }