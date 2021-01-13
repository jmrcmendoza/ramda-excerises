/* eslint-disable no-shadow */
import { Schema, model, Document } from 'mongoose';

export type MemberDocument = Document & {
  username: string;
  password: string;
  realName: string | null;
};

export default model<MemberDocument>(
  'Member',
  new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      realName: {
        type: String,
      },
    },
    { timestamps: true },
  ),
);
