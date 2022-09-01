require('dotenv').config();

module.exports = {
  development: {
    database: process.env.DATABASE_URL,
    dialect: 'postgres'
  },
  test: {
    database: process.env.DATABASE_URL,
    dialect: 'postgres'
  },
  production: {
    database: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
}
