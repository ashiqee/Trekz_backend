import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { ProfileServices } from "./profile.service";
import { TImageFile } from "../../interfaces/image.interface";




const createPremiumUser = catchAsync(async (req,res)=>{
    const userId = req.user;
    const payload=req.body;

const result = await ProfileServices.createPremiumUserIntoDB(payload,userId);


    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Subcription created Successfully',
        data: result,
    });
})


const getMyProfile = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const result = await ProfileServices.getMyProfile(user);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'My Profile Retrive Successfully',
        data: result,
    });
});

const getOtherProfileFromDB = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const result = await ProfileServices.getOtherProfile(userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Other Profile Retrive Successfully',
        data: result,
    });
});

const updateMyProfile = catchAsync(async (req, res) => {


    const result = await ProfileServices.updateMyProfile(
        req.user,
        req.body,
        req.file as TImageFile
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Profile updated successfully',
        data: result,
    });
});

export const ProfileController = {
    getMyProfile,
    updateMyProfile,
    getOtherProfileFromDB,
    createPremiumUser
}