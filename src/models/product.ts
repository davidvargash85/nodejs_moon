import { Model, DataTypes, CreationOptional } from 'sequelize';
import { sequelize } from '../util/database';

class Product extends Model {
  public id!: CreationOptional<number>;  // 👈 id is optional during creation
  public title!: string;
  public price!: number;
  public imageUrl!: string;
  public description!: string;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'products'
  }
);

export { Product };
