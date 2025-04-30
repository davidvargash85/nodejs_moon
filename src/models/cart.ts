import { Table, Column, Model, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { User } from './user';
import { CartItem } from './cart-item';
import { Product } from './product';
import { BelongsToManyRemoveAssociationMixin } from 'sequelize';

export interface CartAttributes {
  id?: number;
  cartId?: number;
  userId?: number;
};

@Table
export class Cart extends Model<CartAttributes> { // 👈 Important
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsToMany(() => Product, () => CartItem)
  products!: Product[]

  public removeProduct!: BelongsToManyRemoveAssociationMixin<Product, number>;
}

export type CartCreationAttributes = CartAttributes;

