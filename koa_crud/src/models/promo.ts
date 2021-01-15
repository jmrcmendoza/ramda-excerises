/* eslint-disable no-shadow */
import { Schema, model, Document } from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

export enum Template {
  Deposit = 'DEPOSIT',
  SignUp = 'SIGN_UP',
}

export enum Status {
  Draft = 'DRAFT',
  Active = 'ACTIVE',
  Inactve = 'INACTIVE',
}

export enum MemberFields {
  EMAIL,
  REAL_NAME,
  BANK_ACCOUNT,
}

export type PromoDocument = Document & {
  name: string;
  template: Template;
  title: string;
  description: string;
  submitted: boolean;
  enabled: boolean;
  status: Status;
  minimumBalance: number | null;
  requiredMemberFields: [MemberFields];
};

export default model<PromoDocument>(
  'Promo',
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      template: {
        type: String,
        enum: [Template.Deposit, Template.SignUp],
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      submitted: {
        type: Boolean,
      },
      enabled: {
        type: Boolean,
      },
      status: {
        type: String,
        enum: [Status.Draft, Status.Active, Status.Inactve],
        default: Status.Draft,
        required: true,
      },
      minimumBalance: {
        type: Number,
      },
      requiredMemberFields: {
        type: [String],
      },
    },
    { timestamps: true },
  ).plugin(mongooseLeanVirtuals),
);
