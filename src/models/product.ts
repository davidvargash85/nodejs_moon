import { Schema, model, Types, Document, Model } from 'mongoose';

// Used when creating a product
export interface Product {
  title: string;
  price: Types.Decimal128;
  description: string;
  imageUrl: string;
  user: Types.ObjectId;
}

// A full product document returned by Mongoose
export interface ProductDoc extends Document {
  _id: Types.ObjectId;
  title: string;
  price: Types.Decimal128;
  description: string;
  imageUrl: string;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// (Optional) For custom static methods
interface ProductModel extends Model<ProductDoc> {
  build(attrs: Product): ProductDoc;
}

const productSchema = new Schema<ProductDoc>({
  title: { type: String, required: true },
  price: { type: Schema.Types.Decimal128, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true,
});

// Optional static builder for TS safety when creating
productSchema.statics.build = function(attrs: Product) {
  return new this(attrs);
};

// Fixes the TS error by not manually defining _id in ProductDoc
export const ProductModel = model<ProductDoc, ProductModel>('Product', productSchema);
