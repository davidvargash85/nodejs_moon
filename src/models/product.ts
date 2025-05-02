import { Document, model, Schema } from "mongoose";

export interface IProduct extends Document {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, {
  timestamps: true,
})

export const Product = model<IProduct>('Product', productSchema);