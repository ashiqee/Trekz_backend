import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FollewerServices } from "./follow.service";




const addFollow = catchAsync(async (req, res) => {
  const payload = req.body
    const result = await FollewerServices.addFollowToDB(payload);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Add Follewer Successfully',
      data: result,
    });
  });

const removeFollow = catchAsync(async (req, res) => {
  const payload = req.body
    const result = await FollewerServices.removeFollowFromDB(payload);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Remove Follewer Successfully',
      data: result,
    });
  });


  export const FollewerControllers ={
    addFollow,
    removeFollow
  }