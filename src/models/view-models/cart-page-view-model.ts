import { Types } from "mongoose";

export interface ProductInCartViewModel {
  id: Types.ObjectId;
  title: string;
  price: Types.Decimal128;
  imageUrl: string;
  description: string;
  userId: Types.ObjectId;
  quantity: number;
}

export interface CartPageViewModel {
  products: ProductInCartViewModel[];
  pageTitle: string;
  path: string;
}