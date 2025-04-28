import { Sequelize } from 'sequelize';
import { ProductFactory } from './product';
import { UserFactory } from './user';

const sequelize = new Sequelize('node-complete', 'root', 'P4$$w0rd', {
  dialect: 'mysql',
  host: 'localhost'
});

// Initialize models
const Product = ProductFactory(sequelize);
const User = UserFactory(sequelize);

// Associations 
User.hasMany(Product, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Product.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

export { sequelize, Product, User };
