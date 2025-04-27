import { Model, DataTypes, CreationOptional } from 'sequelize';
import { sequelize } from '../util/database';

class User extends Model {
  public id!: CreationOptional<number>;  // 👈 id is optional during creation
  public name!: string;
  public email!: string;
}

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
      type: DataTypes.DOUBLE,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'users'
  }
);

export { User };
