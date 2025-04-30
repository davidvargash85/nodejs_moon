import { Table, Column, Model, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { User } from './user';
import { Cart } from './cart';
import { CartItem } from './cart-item';

export interface ProductAttributes {
  id?: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  userId: number;
}

@Table
export class Product extends Model<ProductAttributes> { // 👈 Important
  @Column
  title!: string;

  @Column
  price!: number;

  @Column
  imageUrl!: string;

  @Column
  description!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsToMany(() => Cart, () => CartItem)
  carts!: Cart[]
}

export type ProductCreationAttributes = ProductAttributes;

