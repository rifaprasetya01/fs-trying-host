import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const {DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS, NODE_ENV} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST || '127.0.0.1',
  port: DB_PORT ? Number(DB_PORT) : 3306,
  dialect: 'mysql',
  logging: NODE_ENV === 'development' ? console.log : false,
  define: {
    freezeTableName: true,
    timestamps: true,
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
