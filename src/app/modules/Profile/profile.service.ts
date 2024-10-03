import { JwtPayload } from "jsonwebtoken";
import { User } from "../User/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { USER_STATUS } from "../User/user.constant";
import { TImageFile } from "../../interfaces/image.interface";
import { TUserProfileUpdate } from "./profile.interface";
import { Post } from "../Post/post.model";


const getMyProfile = async (user: JwtPayload) => {
    const profile = await User.findOne({
        email: user.email,
        status: USER_STATUS.ACTIVE
    });

    if (!profile) {
        throw new AppError(httpStatus.NOT_FOUND, "User does not exixts!")
    };

    return profile;
};

// Other profile 
const getOtherProfile = async (userId:string) => {
    const getUser = await User.findById(userId).populate("follow followers","name profilePhoto");

    if (!getUser) {
        throw new AppError(httpStatus.NOT_FOUND, "User does not exixts!")
    };

    const userPosts = await Post.find({user:userId})
    .populate({
        path:"user",
        select:"name profilePhoto"
    })

    return {getUser,userPosts  };
};

const updateMyProfile = async (
    user: JwtPayload,
    data: Partial<TUserProfileUpdate>,
    profilePhoto: TImageFile
) => {
    const filter = {
        email: user.email,
        status: USER_STATUS.ACTIVE
    };
   
    
    

    const profile = await User.findOne(filter);

    
    
    if (!profile) {
        throw new AppError(httpStatus.NOT_FOUND, "User profile does not exixts!")
    };

    if (profilePhoto) {
        data.profilePhoto = profilePhoto.path
    }
    else {
        delete data.profilePhoto;
    };
  
    

        const res= await User.findOneAndUpdate(filter, data, { new: true });


    return res;
};



export const ProfileServices = {
    getMyProfile,
    updateMyProfile,
    getOtherProfile
}