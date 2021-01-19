/* eslint-disable no-shadow */
import { Schema, model, Document } from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

export enum PromoEnrollmentRequestStatus {
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Processing = 'PROCESSING',
  Approved = 'APPROVED',
}

export type PromoEnrollmentRequestDocument = Document & {
  promo: string;
  member: string;
  status: PromoEnrollmentRequestStatus;
};

export default model<PromoEnrollmentRequestDocument>(
  'PromoEnrollmentRequests',
  new Schema(
    {
      promo: {
        type: String,
        required: true,
      },
      member: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: [
          PromoEnrollmentRequestStatus.Pending,
          PromoEnrollmentRequestStatus.Rejected,
          PromoEnrollmentRequestStatus.Processing,
          PromoEnrollmentRequestStatus.Approved,
        ],
        default: PromoEnrollmentRequestStatus.Pending,
        required: true,
      },
    },
    { timestamps: true },
  ).plugin(mongooseLeanVirtuals),
);
