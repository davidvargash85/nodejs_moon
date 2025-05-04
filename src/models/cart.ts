import { model, Schema, Types } from 'mongoose';

export interface CartProduct {
  product: Types.ObjectId,
  quantity: number
}

export interface CartAttributes {
  user: Types.ObjectId,
  products: CartProduct[],
};

export interface CartDoc extends Document, CartAttributes { }

const cartSchema = new Schema<CartDoc>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Schema.Types.Number, default: 1, min: 1 }
    }
  ]
}, {
  timestamps: true,
});

export const Cart = model<CartDoc>('Cart', cartSchema);

