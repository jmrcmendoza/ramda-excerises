import { Schema, model, Document } from 'mongoose';

export enum VendorType {
  Seamless = 'SEAMLESS',
  Transfer = 'TRANSFER',
}

export type VendorDocument = Document & {
  name: string;
  type: VendorType;
};

export default model<VendorDocument>(
  'Vendor',
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
    },
    { timestamps: true },
  ),
);
