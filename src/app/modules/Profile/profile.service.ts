import { JwtPayload } from "jsonwebtoken";
import { User } from "../User/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { USER_STATUS } from "../User/user.constant";
import { TImageFile } from "../../interfaces/image.interface";
import { TUserProfileUpdate } from "./profile.interface";
import { Post } from "../Post/post.model";
import { PremiumProfile } from "./profile.model";
import { initiatePayment } from "../Payment/payment.utils";


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
    const getUser = await User.findById(userId).populate("follow followers","name profilePhoto isVerified");

    if (!getUser) {
        throw new AppError(httpStatus.NOT_FOUND, "User does not exixts!")
    };

    const userPosts = await Post.find({user:userId})
    .populate({
        path:"user",
        select:"name profilePhoto isVerified"
    })
    .sort({createdAt : -1 })

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



// Profile verification and premium user 

const createPremiumUserIntoDB = async (payload:{plan:string},userId:JwtPayload) => {
    const transactionId = `txn-${Date.now()}`;
  
    const orderData = { ...payload, transactionId }; 
  
    // Create Premium Profile record in DB
    const createOrder = await PremiumProfile.create({
      user: userId,
      status: 'active',
      startDate: new Date(),
      paymentStatus: 'Pending',
      subcriptionPlan:orderData.plan,
      transactionId: orderData.transactionId,
    });
  
    if (createOrder) {
      try {
       
        const user = await User.findById(userId);
  
        if (!user) {
          throw new Error('User not found');
        }
  
        // Define total price based on the subscription plan
        let totalPrice;
        switch (orderData.plan) {
          case 'premium':
            totalPrice = 99.99; 
            break;
          case 'gold':
            totalPrice = 199.99; 
            break;
          case 'platinum':
            totalPrice = 299.99; 
            break;
          default:
            totalPrice = 0;
        }
  
        // Prepare the payment data
        const paymentData = {
            transactionId,
          totalPrice,
          customerName: user.name,
          customerEmail: user.email,
          customerPhone: user.mobileNumber,
          customerAddress: user.address,
        };
  
        
        const paymentSession = await initiatePayment(paymentData);
  
        return paymentSession;
      } catch (err) {
         return err;
      }
    }
  };

export const ProfileServices = {
    getMyProfile,
    updateMyProfile,
    getOtherProfile,
    createPremiumUserIntoDB
}