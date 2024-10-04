import { Document, Schema } from "mongoose";

export type TUserProfileUpdate = {
    name: string;
    mobileNumber: string;
    profilePhoto?: string | null;
};


export interface IPremiumProfile extends Document {
    user: Schema.Types.ObjectId; 
    subcriptionPlan:'premium'|'gold'|'platinum';
    status: 'active' | 'canceled' | 'expired'; 
    startDate: Date;
    endDate?: Date;
    paymentStatus: string;
    transactionId?: string; 
  }