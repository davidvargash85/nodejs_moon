import { Schema, model, Types, Document } from 'mongoose';

export interface OrderedProduct {
    productId: Types.ObjectId;
    title: string;
    price: Types.Decimal128;
    quantity: number;
}

export interface Order {
    user: Types.ObjectId;
    products: OrderedProduct[];
    total: Types.Decimal128;
}

// A full product document returned by Mongoose
export interface OrderDoc extends Document, Order {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    total: Types.Decimal128;
    products: OrderedProduct[];
}

const orderSchema = new Schema<OrderDoc>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    total: { type: Schema.Types.Decimal128, required: true },
    products: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        title: { type: Schema.Types.String, required: true },
        price: { type: Schema.Types.String, required: true },
        quantity: { type: Schema.Types.Number, required: true },
    }]
}, {
    timestamps: true,
});

export const OrderModel = model<OrderDoc>('Order', orderSchema);
