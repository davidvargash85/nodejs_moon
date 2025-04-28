import { Model, DataTypes, CreationOptional, Sequelize, Association, HasManyCreateAssociationMixin } from 'sequelize';
import { Product } from './product';

class User extends Model {
  public id!: CreationOptional<number>;  // 👈 id is optional during creation
  public name!: string;
  public email!: string;
  public static associations: {
    products: Association<User, Product>; // ✅ User hasMany products
  };
  // 👇 Add this line to tell TypeScript
  public createProduct!: HasManyCreateAssociationMixin<Product>;
}

function UserFactory(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: 'users'
    }
  );
  return User;
}

export { UserFactory, User };
