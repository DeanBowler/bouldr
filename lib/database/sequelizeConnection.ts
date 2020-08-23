import * as pg from 'pg';
import { Sequelize } from 'sequelize';

console.info(process.env.DB_USER, process.env.DB_SCHEMA, process.env.DB_PASSWORD);

const sequelizeConnection = new Sequelize(
  process.env.DB_SCHEMA || 'postgres',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: (process.env.DB_PORT ? Number.parseInt(process.env.DB_PORT) : undefined) ?? 5430,
    dialect: 'postgres',
    dialectModule: pg,
    dialectOptions: {
      ssl: process.env.DB_SSL == 'true',
    },
  }
);

export default sequelizeConnection;
