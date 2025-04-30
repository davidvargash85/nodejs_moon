import { Sequelize } from 'sequelize-typescript';
import { Product } from './product';
import { User } from './user';
import { Cart } from './cart';
import { CartItem } from './cart-item';

const sequelize = new Sequelize({
  database: 'david-test',
  username: 'root',
  password: 'P4$$w0rd',
  host: 'localhost',
  dialect: 'mysql',
  models: [Product, User, Cart, CartItem] // ✅ Pass models here — no factories needed
});

export { sequelize, Product, User, Cart, CartItem };
