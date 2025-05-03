import { Decimal128, Document, model, Schema } from "mongoose";

export interface ProductAttrs {
  title: string;
  price: Decimal128;
  description: string;
  imageUrl: string;
  user: Schema.Types.ObjectId
}

export interface ProductDoc extends Document, ProductAttrs { }

const productSchema = new Schema<ProductDoc>({
  title: { type: String, required: true },
  price: { type: Schema.Types.Decimal128, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true,
});

export const Product = model<ProductDoc>('Product', productSchema);
