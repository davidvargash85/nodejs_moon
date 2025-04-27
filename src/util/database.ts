import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('node-complete', 'root', 'P4$$w0rd', {
  dialect: 'mysql',
  host: 'localhost'
});
