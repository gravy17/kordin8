import { Sequelize } from "sequelize";

const DATABASE_URL = process.env.DATABASE_URL as string;

const db = new Sequelize(DATABASE_URL, {
  logging: false
});

export default db;
