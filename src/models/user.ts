import { Table, Column, Model, HasMany, HasOne } from 'sequelize-typescript';
import { Product } from './product'; // Adjust path
import {
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasOneCreateAssociationMixin,
} from 'sequelize';
import { Cart } from './cart';

export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
}

@Table
export class User extends Model<UserAttributes> { // 👈 Very important! Extend generic Model<User>
  @Column
  name!: string;

  @Column
  email!: string;

  @HasMany(() => Product)
  products!: Product[];

  @HasOne(() => Cart)
  cart!: Cart;

  // 👇 Add this line to fix createProduct typing
  public createProduct!: HasManyCreateAssociationMixin<Product>;
  public getProducts!: HasManyGetAssociationsMixin<Product>;
  public addProduct!: HasManyAddAssociationMixin<Product, number>;
  public addProducts!: HasManyAddAssociationsMixin<Product, number>;
  public setProducts!: HasManySetAssociationsMixin<Product, number>;
  public countProducts!: HasManyCountAssociationsMixin;
  public hasProduct!: HasManyHasAssociationMixin<Product, number>;
  public hasProducts!: HasManyHasAssociationsMixin<Product, number>;
  public removeProduct!: HasManyRemoveAssociationMixin<Product, number>;
  public removeProducts!: HasManyRemoveAssociationsMixin<Product, number>;

  // cart utils
  public createCart!: HasOneCreateAssociationMixin<Cart>;
}

export type UserCreationAttributes = UserAttributes;
