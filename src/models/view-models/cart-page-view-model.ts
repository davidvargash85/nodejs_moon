export interface ProductInCartViewModel {
  id  : number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  userId: number;
  quantity: number;
}

export interface CartPageViewModel {
  products: ProductInCartViewModel[];
  pageTitle: string;
  path: string;
}