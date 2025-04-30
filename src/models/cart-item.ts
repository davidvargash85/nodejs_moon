import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Product } from './product';
import { Cart } from './cart';

export interface CartItemAttributes {
  id?: number;
  productId?: number;
  cartId?: number;
  quantity?: number;
};

@Table
export class CartItem extends Model<CartItemAttributes> {
  @ForeignKey(() => Cart)
  @Column
  cartId!: number;

  @ForeignKey(() => Product)
  @Column
  productId!: number;

  @Column({ defaultValue: 1 }) // 👈 Set default value here
  quantity!: number;

  @BelongsTo(() => Cart)
  cart!: Cart;

  @BelongsTo(() => Product)
  product!: Product;
}

export type CartItemCreationAttributes = CartItemAttributes;
