import { Sequelize } from "sequelize";

const DB = process.env.DATABASE as string;
const DB_USERNAME = process.env.DB_USERNAME as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;
const DB_HOST = process.env.DB_HOST as string;
const DB_PORT = process.env.DB_PORT as string;

const db = new Sequelize(DB, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: "postgres",
  dialectOptions: {
    ssl: false
  },
  logging: false
});

export default db;
