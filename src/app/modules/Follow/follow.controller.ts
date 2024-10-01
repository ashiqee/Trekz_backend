import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FollewerServices } from "./follow.service";




const addFollow = catchAsync(async (req, res) => {
  const playload = req.body
    const result = await FollewerServices.addFollowToDB(playload);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Add Follewer Successfully',
      data: result,
    });
  });

const removeFollow = catchAsync(async (req, res) => {
  const playload = req.body
    const result = await FollewerServices.removeFollowFromDB(playload);
  
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