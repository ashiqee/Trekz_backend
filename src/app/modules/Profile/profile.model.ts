import { Schema, model } from 'mongoose';
import { IPremiumProfile } from './profile.interface';

const premiumProfileSchema = new Schema<IPremiumProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    transactionId: {
        type: String,
        required: true,
        unique: true, 
      },
    subcriptionPlan:{
        type: String,
        enum: ['premium', 'gold', 'platinum'], 
        required: true
      },
    status: {
      type: String,
      enum: ['active', 'canceled', 'expired'],
      default: 'active',
    },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    paymentStatus: {
      type: String,
      default: 'Pending',
    },
   
  },
  {
    timestamps: true,
  }
);

export const PremiumProfile = model<IPremiumProfile>(
  'PremiumProfile',
  premiumProfileSchema
);
