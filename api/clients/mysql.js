import Sequelize from 'sequelize';

import {
  DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER,
} from '../constants';

const client = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  dialectOptions: {
    multipleStatements: true,
  },
  pool: {
    max: 50,
    min: 0,
  },
  logging: false,
});

export default client;
