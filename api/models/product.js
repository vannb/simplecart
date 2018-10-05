/* jshint indent: 2 */
import Sequelize from 'sequelize';
import sequelizeClient from '../clients/mysql';


export default sequelizeClient.define('product', {
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING(250),
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: sequelizeClient.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: sequelizeClient.literal('CURRENT_TIMESTAMP'),
  },
}, {
  tableName: 'product',
});
